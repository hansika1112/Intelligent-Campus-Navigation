import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import NavigationPage from './pages/NavigationPage'
import AssistantPage from './pages/AssistantPage'
import EmergencyPage from './pages/EmergencyPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/navigation" element={<NavigationPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/emergency" element={<EmergencyPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App