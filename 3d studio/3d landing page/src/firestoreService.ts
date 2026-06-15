/**
 * Firestore writes for dashboard integration (same collections as dashboard).
 */
import { db } from "./firebase";
import { collection, addDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";

const COLLECTION_USERS = "users";
const COLLECTION_ORDERS = "orders";

export async function saveUserToFirestore(data: {
  uid: string;
  email: string | null;
  displayName: string | null;
  role?: string;
}): Promise<void> {
  const now = serverTimestamp();
  await setDoc(
    doc(db, COLLECTION_USERS, data.uid),
    {
      uid: data.uid,
      email: data.email ?? "",
      displayName: data.displayName ?? "",
      role: data.role ?? "user",
      updatedAt: now,
    },
    { merge: true }
  );
}

export async function createOrderFirestore(orderData: {
  orderId?: string;
  productId?: string;
  productTitle?: string;
  price?: number | string;
  userId?: string;
  userEmail?: string;
  source?: string;
  cartItems?: { id: string; name: string; price: number; quantity: number; [key: string]: unknown }[];
  subtotal?: number;
  deliveryFee?: number;
  total?: number;
  [key: string]: unknown;
}): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_ORDERS), {
      ...orderData,
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  } catch (e) {
    console.error("createOrderFirestore error:", e);
    return null;
  }
}
