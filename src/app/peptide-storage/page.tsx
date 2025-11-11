import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PeptideStoragePage() {
  return (
    <>
      <Navbar />
      <main style={{minHeight: '60vh', padding: '40px 20px', maxWidth: '900px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center', margin: '40px 0'}}>PEPTIDE STORAGE GUIDE</h1>
        
        <div style={{marginTop: '40px', lineHeight: '1.8'}}>
          <h2>Proper Storage of Research Peptides</h2>
          <p>Proper storage is crucial for maintaining peptide stability and integrity.</p>
          
          <h3 style={{marginTop: '30px'}}>Lyophilized (Powder) Form</h3>
          <ul>
            <li>Store at -20°C (freezer) for long-term storage</li>
            <li>Keep sealed in original packaging</li>
            <li>Protect from light and moisture</li>
            <li>Shelf life: Up to 2-3 years when stored properly</li>
          </ul>
          
          <h3 style={{marginTop: '30px'}}>Reconstituted Form</h3>
          <ul>
            <li>Store at 2-8°C (refrigerator)</li>
            <li>Use within 30 days</li>
            <li>Avoid freeze-thaw cycles</li>
            <li>Keep sealed and protected from light</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}
