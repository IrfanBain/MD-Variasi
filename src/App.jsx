import Navbar from "./component/layouts/navbar"
import Mainbar from "./component/layouts/mainbar"
import ProdukKategori from "./component/layouts/Produk/produkKategori"
import Footer from "./component/layouts/footer"
import ProdukList from "./component/layouts/Produk/produkList"
import Bottom from "./component/layouts/bottom"
function App() {


  return (
    <>
      <Navbar /> 
      <Mainbar />
      <ProdukKategori /> 
      <ProdukList />
      <Bottom />
      <Footer />
    </>
  )
}

export default App
