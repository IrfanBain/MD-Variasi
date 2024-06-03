import Navbar from "./component/layouts/navbar"
import Mainbar from "./component/layouts/mainbar"
import Benefit from "./component/layouts/Produk/Benefit"
import Footer from "./component/layouts/footer"
import ProdukList from "./component/layouts/Produk/produkList"
import Bottom from "./component/layouts/bottom"
export default function App() {

  return (
    <>
      <Navbar /> 
      <Mainbar />
      <Benefit /> 
      <ProdukList />
      <Bottom />
      <Footer />
    </>
  )
}

