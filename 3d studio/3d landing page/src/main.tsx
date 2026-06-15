import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AdminRole from './pages/AdminRole'
import { CartProvider } from './components/CartContext'
import './index.css'

function ExploreTailorPage() {
  const tailors = [
    { name: 'Ahmed Stitch House', price: 'Rs 1,500 stitching' },
    { name: 'Royal Tailors', price: 'Rs 1,800 stitching' },
    { name: 'Premium Stitching Center', price: 'Rs 2,100 stitching' },
    { name: 'Classic Kurta Tailors', price: 'Rs 1,350 stitching' },
    { name: 'SmartFitao Partner Tailor', price: 'Rs 1,650 stitching' },
  ]

  return (
    <div className="min-h-screen bg-[#f9fafb] p-6">
      <div className="mx-auto max-w-3xl rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-[#023337]">Explore Tailor</h1>
        <p className="mt-1 text-sm text-[#6b7280]">Select your tailor for order confirmation.</p>
        <div className="mt-5 space-y-3">
          {tailors.map((t) => (
            <div key={t.name} className="flex items-center justify-between rounded-lg border border-[#e5e7eb] px-4 py-3">
              <div>
                <p className="font-semibold text-[#111827]">{t.name}</p>
                <p className="text-sm text-[#065f46]">{t.price}</p>
              </div>
              <button className="rounded-md border border-[#16a34a] bg-[#dcfce7] px-3 py-1.5 text-sm font-semibold text-[#166534]">
                Confirm tailor
              </button>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link to="/" className="text-sm font-semibold text-[#023337] hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

function LandingWithNav() {
  const navigate = useNavigate()
  return (
    <LandingPage
      onNavigateToSignUp={() => {}}
      onNavigateToLogin={() => {}}
      onNavigateToCart={() => {}}
      onNavigateToProfile={() => navigate('/profile')}
      onNavigateToDiscovery={() => {}}
      onNavigateToMeasurement={() => {}}
      onNavigateToProduct={() => {}}
    />
  )
}

function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb]">
      <div className="shrink-0 bg-[#f9fafb] px-4 py-2 border-b border-[#e5e7eb]">
        <Link to="/" className="text-[#023337] font-semibold hover:underline">← Back to Home</Link>
      </div>
      <div className="flex-1 min-h-0 flex flex-col">
        <AdminRole />
      </div>
    </div>
  )
}

const App = () => (
    <CartProvider>
        <Router>
            <Routes>
                <Route path="/" element={<LandingWithNav />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/explore-tailor" element={<ExploreTailorPage />} />
            </Routes>
        </Router>
    </CartProvider>
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
