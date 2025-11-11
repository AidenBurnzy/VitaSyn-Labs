import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function PeptideReconstructionPage() {
  return (
    <>
      <Navbar />
      <main style={{minHeight: '60vh', padding: '40px 20px', maxWidth: '900px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center', margin: '40px 0'}}>PEPTIDE RECONSTRUCTION GUIDE</h1>
        
        <div style={{marginTop: '40px', lineHeight: '1.8'}}>
          <h2>How to Reconstitute Research Peptides</h2>
          <p>Follow these steps carefully for proper peptide reconstitution.</p>
          
          <h3 style={{marginTop: '30px'}}>Materials Needed</h3>
          <ul>
            <li>Bacteriostatic water or sterile water</li>
            <li>Syringe (appropriate size)</li>
            <li>Alcohol swabs</li>
            <li>Vial of lyophilized peptide</li>
          </ul>
          
          <h3 style={{marginTop: '30px'}}>Reconstitution Steps</h3>
          <ol>
            <li>Clean the vial top with an alcohol swab</li>
            <li>Draw appropriate amount of bacteriostatic water into syringe</li>
            <li>Slowly inject water along the inside wall of the vial (not directly onto powder)</li>
            <li>Gently swirl (do not shake) until powder is fully dissolved</li>
            <li>Store properly according to storage guidelines</li>
          </ol>
          
          <div style={{background: '#fff3cd', padding: '20px', marginTop: '30px', borderLeft: '4px solid #ffc107'}}>
            <strong>Important:</strong> For research use only. Handle with appropriate safety equipment in a laboratory setting.
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
