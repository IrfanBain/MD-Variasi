import { Link, useNavigate } from "react-router-dom"
import { GoArrowRight } from "react-icons/go";
import { useState, useEffect } from 'react'
import { db } from "../../../../config/firebase"
import { collection, onSnapshot, where, query, limit } from "firebase/firestore"

export default function ExteriorList() {
  const [products, setProducts] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
useEffect(() => {
    setLoading(true);
    const productsRef = collection(db, "product");
    const q = query(productsRef, where("kategori", "==", "Eksterior"), limit(2));
    const unsub = onSnapshot(q, (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id,...doc.data() });
      });
      setProducts(list);
      setLoading(false);
    }, (error) => {
      console.log(error);
    });
    return () => {
      unsub();
    };
  }, []);
    return (
        <>
          <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-18 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Eksterior Mobil</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.img}
                    alt={product.img}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link onClick={() => navigate(`/produkView/${product.id}`)}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Stok : {product.stok.length > 0 ? 'Tersedia' : 'Habis'}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Rp.{product.harga}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex my-5">
            <Link className="flex justify-between gap-2 items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700" to={'/shop'}>Selengkapnya   <GoArrowRight /> </Link>
          </div>
        </div>
          </div>
        </>
    )
}