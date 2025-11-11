import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AccountPage() {
  return (
    <>
      <Navbar />
      <main style={{minHeight: '60vh', padding: '40px 20px', maxWidth: '800px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center', margin: '40px 0'}}>MY ACCOUNT</h1>
        <p style={{textAlign: 'center'}}>Account management coming soon.</p>
      </main>
      <Footer />
    </>
  )
}
