import Navbar from "../../../component/layouts/navbar"
import { GoChevronRight } from "react-icons/go"
import { Link } from 'react-router-dom'
import DropdownProduk from "../../../component/element/dropdownProduk"
import Footer from "../../../component/layouts/footer"

const products = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Basic Tee',
      href: '/produkView',
      imageSrc: 'images/eksterior.jpeg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
  ]
export default function ProdukShop() {
    return(
        <>
            <Navbar />  
            <div className="flex gap-4 relative">
                <div className="hidden sm:flex sm:flex-col sm:pt-7 sm:gap-3 sm:border-r-2 sm:text-sm sm:w-1/4 lg:1/5 lg:text-lg h-screen sticky top-16">
                    <button className="flex px-4 sm:px-6 lg:px-8 justify-between items-center text-blue-500">Semua produk <GoChevronRight /></button>
                    <button className="flex px-4 sm:px-6 lg:px-8 justify-between items-center">Produk terbaru <GoChevronRight /></button>
                    <button className="flex px-4 sm:px-6 lg:px-8 justify-between items-center">Interior mobil <GoChevronRight /></button>
                    <button className="flex px-4 sm:px-6 lg:px-8 justify-between items-center">Ekterior Mobil <GoChevronRight /></button>
                    <button className="flex px-4 sm:px-6 lg:px-8 justify-between items-center">Lampu variasi <GoChevronRight /></button>
                </div>
                <div className="w-full mt-5 mx-4 mb-10 sm:w-3/4 lg:w-4/5">
                    <div className="flex justify-center mb-4 sm:hidden">
                        <DropdownProduk />
                    </div>
                   <h2 className="text-xl font-bold">Semua Produk</h2>
                   <div className="mt-6 grid grid-cols-3 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-6">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200  sm:aspect-none lg:aspect-none group-hover:opacity-75 lg:h-40">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
                </div>
            </div>

            <Footer />
        </>
        
    )
}