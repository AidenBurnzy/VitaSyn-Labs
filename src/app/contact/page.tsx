import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{minHeight: '60vh', padding: '40px 20px', maxWidth: '800px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center', margin: '40px 0'}}>CONTACT US</h1>
        <p style={{textAlign: 'center', marginBottom: '40px'}}>Have questions? We&apos;re here to help.</p>
        
        <form style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div>
            <label>Name:</label>
            <input type="text" required style={{width: '100%', padding: '10px', marginTop: '5px'}} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" required style={{width: '100%', padding: '10px', marginTop: '5px'}} />
          </div>
          <div>
            <label>Subject:</label>
            <input type="text" required style={{width: '100%', padding: '10px', marginTop: '5px'}} />
          </div>
          <div>
            <label>Message:</label>
            <textarea rows={6} required style={{width: '100%', padding: '10px', marginTop: '5px'}} />
          </div>
          <button type="submit" style={{padding: '15px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer'}}>
            SEND MESSAGE
          </button>
        </form>
      </main>
      <Footer />
    </>
  )
}
