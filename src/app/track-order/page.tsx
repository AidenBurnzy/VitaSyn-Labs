import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TrackOrderPage() {
  return (
    <>
      <Navbar />
      <main style={{minHeight: '60vh', padding: '40px 20px', maxWidth: '800px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center', margin: '40px 0'}}>TRACK YOUR ORDER</h1>
        <p style={{textAlign: 'center', marginBottom: '40px'}}>Enter your order number to track your shipment.</p>
        
        <form style={{display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px', margin: '0 auto'}}>
          <div>
            <label>Order Number:</label>
            <input type="text" required style={{width: '100%', padding: '10px', marginTop: '5px'}} />
          </div>
          <button type="submit" style={{padding: '15px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer'}}>
            TRACK ORDER
          </button>
        </form>
      </main>
      <Footer />
    </>
  )
}
