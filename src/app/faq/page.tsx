import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main style={{minHeight: '60vh', padding: '40px 20px', maxWidth: '900px', margin: '0 auto'}}>
        <h1 style={{textAlign: 'center', margin: '40px 0'}}>FREQUENTLY ASKED QUESTIONS</h1>
        
        <div style={{marginTop: '40px'}}>
          <h3>What are research peptides?</h3>
          <p>Research peptides are amino acid chains used exclusively for laboratory research and scientific study.</p>
          
          <h3 style={{marginTop: '30px'}}>Are these products for human consumption?</h3>
          <p>No. All products are strictly for in vitro testing and laboratory research only.</p>
          
          <h3 style={{marginTop: '30px'}}>What is your shipping policy?</h3>
          <p>We offer free shipping on orders over $200. Standard orders typically ship within 1-2 business days.</p>
          
          <h3 style={{marginTop: '30px'}}>How do I store peptides?</h3>
          <p>Please refer to our Peptide Storage guide for detailed storage instructions.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
