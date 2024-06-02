import { useParams } from "react-router-dom";
import Footer from "../../../component/layouts/footer";
import Navbar from "../../../component/layouts/navbar";
import { IoLogoWhatsapp } from "react-icons/io"
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";


export default function ProdukView() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const docRef = doc(db, "product", id);
        const getProduct = async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setProduct(docSnap.data());
        } else {
            console.log("No such document!");
        }
        setLoading(false);
        };
        getProduct();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (!product) {
        return <div>Product not found</div>;
      }

    return(
        <>
        <Navbar />
            <div className="bg-gray-100 dark:bg-gray-800 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                <img className="w-full h-full object-cover" src={product.img} alt="Product Image" />
                            </div>
                            <div className="flex -mx-2 mb-4">
                                <div className="w-1/2 px-2">
                                    <button className="flex gap-2 justify-center w-full items-center bg-green-700 dark:bg-green-700 text-white py-2 px-4 rounded-full font-bold hover:bg-green-800 dark:hover:bg-green-800">
                                    <IoLogoWhatsapp  />
                                        Beli Sekarang</button>
                                </div>
                            </div>
                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h2>
                            <div className="flex mb-4">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Harga :</span>
                                    <span className="text-gray-600 dark:text-gray-300"> Rp. {product.harga}</span>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Stok :</span>
                                    <span className="text-gray-600 dark:text-gray-300"> Tersedia</span>
                                </div>
                            </div>
                                <div>
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Kategori :</span>
                                    <span className="text-gray-600 dark:text-gray-300"> {product.kategori}</span>
                                </div>
                            {product.kategori == 'lamp' ? 
                            <div className="mb-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Pilihan warna :</span>
                                <div className="flex items-center mt-2">
                                    <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                                    <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                                    <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                                    <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                                </div>
                            </div>
                            : null
                            } 
                            <div className="mb-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Jenis   Mobil :</span>
                                <div className="flex items-center mt-2">
                                    <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">Semua jenis</button>
                                </div>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Deskripsi :</span>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                {product.deskripsi}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <Footer />

        </>
    )
}