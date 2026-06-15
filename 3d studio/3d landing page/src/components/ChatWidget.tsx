import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { MessageCircle, Send, X, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id?: string;
    text: string;
    sender: string;
    receiver: string;
    senderRole: string;
    timestamp: any;
}

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const MY_ID = React.useMemo(() => {
        const stored = localStorage.getItem('chat_user_id');
        if (stored) return stored;
        const newId = 'User_' + Math.floor(Math.random() * 10000);
        localStorage.setItem('chat_user_id', newId);
        return newId;
    }, []);
    const TAILOR_ID = 'tailor';

    useEffect(() => {
        if (!isOpen) return;

        const q = query(collection(db, "Tailor_messages"), orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const allMsgs = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return { id: doc.id, ...data } as Message;
                });

                // Filter for messages between this user and the tailor/seller
                const filtered = allMsgs.filter(msg =>
                    (msg.sender === MY_ID && (msg.receiver === TAILOR_ID || msg.receiver === 'Seller' || msg.recipient === TAILOR_ID || msg.recipient === 'Seller')) ||
                    ((msg.sender === TAILOR_ID || msg.sender === 'Seller') && (msg.receiver === MY_ID || msg.recipient === MY_ID))
                );

                setMessages(filtered);
            },
            (error: any) => {
                console.error("Firebase Snapshot Error:", error.message);
                // If it's a permission error, we might be trying to read unauthorized docs
                if (error.code === 'permission-denied') {
                    console.warn("Please check your Firestore security rules for 'Tailor_messages'.");
                }
            }
        );

        return () => unsubscribe();
    }, [isOpen, MY_ID]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim()) return;

        const text = inputText;
        setInputText('');

        try {
            // Send Message to Firestore
            await addDoc(collection(db, "Tailor_messages"), {
                text,
                sender: MY_ID,
                receiver: TAILOR_ID,
                recipient: TAILOR_ID, // Added for Seller Dashboard compatibility
                senderRole: 'User',   // Explicitly mark as User
                chatType: 'tailor',    // Ensures it shows up in "Users" tab for Tailors
                timestamp: serverTimestamp()
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                                    T
                                </div>
                                <div>
                                    <h3 className="font-bold">Tailor Support</h3>
                                    <p className="text-xs text-white/80">Online | Usually replies in minutes</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded">
                                    <Minus size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.length === 0 && (
                                <div className="text-center py-10">
                                    <p className="text-gray-400 text-sm">Ask our tailor anything about measurements, fabrics, or styles!</p>
                                </div>
                            )}
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.sender === MY_ID ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-md ${msg.sender === MY_ID
                                        ? 'bg-blue-600 text-white rounded-tr-none border border-blue-700'
                                        : 'bg-white text-gray-900 shadow-lg border border-gray-200 rounded-tl-none font-medium'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-shadow"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </div>
    );
};

export default ChatWidget;
