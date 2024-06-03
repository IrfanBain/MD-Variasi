import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { db } from "../../../config/firebase"
import { collection, onSnapshot, where, query } from "firebase/firestore"
export default function LampuLength() {
    const [products, setProducts] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false)
  
useEffect(() => {
    setLoading(true);
    const productsRef = collection(db, "product");
    const q = query(productsRef, where("kategori", "==", "Lampu"));
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

  return(
    <div className="flex flex-col bg-orange-600 w-32 lg:w-72  pt-2 lg:pt-5 rounded-md text-white">
                        <div className="flex justify-between mx-2 lg:mx-4">
                            <div className="flex flex-col gap-y-2">
                            <h1 className="font-bold text-1xl lg:text-2xl">{products.length > 0 ? products[0].kategori : 'x'} Mobil</h1>
                            <h3 className="font-semibold text:sm lg:text-xl">{products.length} Barang</h3>
                            </div>
                            <div className="flex">
                            <img src="/images/logo.png" alt="" className="hidden lg:w-20 lg:block" />
                            </div>
                        </div>
                        <div className="flex justify-end items-center mt-6 py-2 px-2 bg-orange-700 rounded-b-md">
                            <Link 
                            to={'/dashboard/data'}
                            className="text-end">
                            <ChevronRightIcon className="w-5" />
                            </Link>
                        </div>
        </div>
  )
}