import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CryptoRailsSection from './components/CryptoRailsSection'
import DetailsSection from './components/DetailsSection'
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <CryptoRailsSection />
      <DetailsSection/>
    </main>
  )
}
