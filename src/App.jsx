import Navbar from "./component/layouts/navbar"
import Mainbar from "./component/layouts/mainbar"
import ProdukKategori from "./component/layouts/Produk/produkKategori"
import Footer from "./component/layouts/footer"
import ProdukList from "./component/layouts/Produk/produkList"
function App() {


  return (
    <div>
      <Navbar /> 
      <Mainbar />
      <ProdukKategori /> 
      <ProdukList />
      <Footer />
    </div>
  )
}

export default App
