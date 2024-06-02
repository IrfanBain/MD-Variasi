import Navbar from "../../../component/layouts/navbar"
import { GoChevronRight } from "react-icons/go"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Footer from "../../../component/layouts/footer"
import { db } from "../../../config/firebase"
import { collection, onSnapshot } from "firebase/firestore"


export default function ProdukShop() {
  // const [selected, setSelected] = useState(kategori[0])
  const [products, setProduks] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const unsub = onSnapshot(
      collection(db, "product"),
      (snapshot) => {
        let list = []
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() })
        })
        setProduks(list)
        setLoading(false)
      },
      (error) => {
        console.log(error)
      }
    )
    return () => {
      unsub()
    }
  }, [])

  const categoryText = {
    "all" : "Semua Produk",
    "interior": "Interior Mobil",
    "eksterior": "Eksterior Mobil",
    "lampu": "Lampu Variasi",
  };

  return (
    <>
      <Navbar />  
      <div className="flex gap-4 relative">
        <div className="hidden sm:flex sm:flex-col sm:pt-7 sm:gap-3 sm:border-r-2 sm:text-sm sm:w-1/4 lg:1/5 lg:text-lg h-screen sticky top-16">
          <button
            className={`flex px-4 sm:px-6 lg:px-8 justify-between items-center ${selectedCategory === "all"? "text-blue-500" : "text-gray-700"}`}
            onClick={() => setSelectedCategory("all")}
          >
            Semua produk <GoChevronRight />
          </button>
          <button
            className={`flex px-4 sm:px-6 lg:px-8 justify-between items-center ${selectedCategory === "interior"? "text-blue-500" : "text-gray-700"}`}
            onClick={() => setSelectedCategory("interior")}
          >
            Interior mobil <GoChevronRight />
          </button>
          <button
            className={`flex px-4 sm:px-6 lg:px-8 justify-between items-center ${selectedCategory === "eksterior"? "text-blue-500" : "text-gray-700"}`}
            onClick={() => setSelectedCategory("eksterior")}
          >
            Ekterior Mobil <GoChevronRight />
          </button>
          <button
            className={`flex px-4 sm:px-6 lg:px-8 justify-between items-center ${selectedCategory === "lampu"? "text-blue-500" : "text-gray-700"}`}
            onClick={() => setSelectedCategory("lampu")}
          >
            Lampu variasi <GoChevronRight />
          </button>
        </div>
        <div className="w-full mt-5 mx-4 mb-10 sm:w-3/4 lg:w-4/5">
          <div className="flex w-full  py-4 justify-center mb-4 sticky top-16 z-10 bg-gray-50 sm:hidden">
          <button
            className={`flex px-4 sm:px-6 lg:px-8 justify-between items-center ${selectedCategory === "all"? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700"}`}
            onClick={() => setSelectedCategory("all")}
          >
            Semua
          </button>
          <button
            className={`flex px-4 sm:px-6 lg:px-8 justify-between items-center ${selectedCategory === "inter"? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700"}`}
            onClick={() => setSelectedCategory("interior")}
          >
            Interior
          </button>
          <button
            className={`flex px-4 sm:px-6 lg:px-8 justify-between items-center ${selectedCategory === "ekster"? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700"}`}
            onClick={() => setSelectedCategory("eksterior")}
          >
            Ekterior
          </button>
          <button
            className={`flex px-4 sm:px-6 lg:px-8 justify-between items-center ${selectedCategory === "lamp"? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700"}`}
            onClick={() => setSelectedCategory("lampu")}
          >
            Lampu
          </button>
          </div>
          <h2 className="text-1xl border-b-4 w-fit border-gray-300 sm:border-0 sm:text-xl font-bold">{!selectedCategory ? "Semua Produk" : categoryText[selectedCategory]}</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-6">
            {products.filter((product) => {
              if (!selectedCategory) {
                return true
              }
              else if (selectedCategory === "all") {
                return true
              }
              return product.kategori === selectedCategory;
            }).map((product) => (
              <>
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200  sm:aspect-h-1 sm:aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-40">
                  <img
                    src={product.img}
                    alt={'foto bermasalah!'}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <button onClick={() => navigate(`/produkView/${product.id}`)} >
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </button>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.kategori}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Rp. {product.harga}</p>
                </div>
              </div>
              </>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}