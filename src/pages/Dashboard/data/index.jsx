import { FolderMinusIcon, HomeIcon, CalendarDaysIcon, UserIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../../../config/firebase";
import { onSnapshot, collection, deleteDoc, doc } from "firebase/firestore";
import { DocumentChartBarIcon } from "@heroicons/react/24/solid";

export default function DashboardData() {
  const navigate = useNavigate()
  const [products, setProduks] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentDate, setCurrentDate] = useState(new Date());

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


  async function handleLogout() {
    try {
      await auth.signOut();
      navigate('/')
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  
  const handleDelete = async (id) => {
    if(window.confirm('yakin ingin menghapus data barang ini?')) {

    
    try {
        await deleteDoc(doc(db, "product", id));
        setProduks(products.filter((product) => product.id !== id))
        alert('data terhapus')
        } catch (error) {
            console.error("Error removing document: ", error);
            }
  }
}

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

    return(
        <>
                <div className="flex">
                <div className="relative w-1/5">
          <div className="fixed border-r-2 border-gray-50 text-gray-100 bg-gray-800 h-screen w-1/5  p-2">
                <header className="flex items-center justify-center mb-4">
                    <Link to={'/'}>
                    <img src="/images/logo.png" alt="" width={'50px'} />
                    </Link>
                    <h1 className="hidden lg:block font-bold sm:text-2xl text-gray-100">MD VARIASI</h1>
                </header>
                
                <div className="flex flex-col justify-center mt-10  lg:mx-5">
                    <span className="text-sm lg:text-xl font-sans font-semibold mb-3">PAGES</span>
                    <div className="flex flex-col gap-3">
                    <Link to={'/dashboard/home'} className="flex text-xs lg:text-1xl items-center gap-2  p-2 rounded-sm font-semibold">
                        <HomeIcon className="hidden lg:block w-6" />
                        Dashboard
                    </Link>
                    <Link to={'/dashboard/form'} className="flex text-xs  lg:text-1xl items-center gap-2 p-2 rounded-sm font-semibold">
                        <FolderMinusIcon className="hidden lg:block w-6" />
                        Form 
                    </Link>
                    <Link to={'/dashboard/data'} className="flex text-xs bg-gray-900 lg:text-1xl items-center gap-2 p-2 rounded-sm font-semibold">
                        <DocumentChartBarIcon className="hidden lg:block w-6" />
                        Data Produk
                    </Link>
                    <button className="flex text-xs lg:text-1xl items-center gap-2 p-2 rounded-sm font-semibold" onClick={handleLogout}>
                    <ArrowRightStartOnRectangleIcon className="hidden lg:block w-6"/>
                    Logout
                    </button>
                    </div>

                </div>

            </div>
                </div>
                <div className="bg-gray-100 h-full w-4/5">
                <header className="flex bg-white justify-between px-10 py-5 ">
                <div className="flex gap-4 px-3 py-1 rounded-sm w-max items-center border  bg-white">
                    <CalendarDaysIcon className="w-8 text-blue-700"/>
                    <p className="font-bold text-gray-800"> {currentDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p>{currentDate.toLocaleTimeString()}</p>
                </div>
                    <Link to={'/dashboard/karyawan'} className="text-gray-900 flex font-semibold" >
                        <UserIcon className="w-7"/>
                    </Link>
                </header>
                <div className="px-10 mt-5">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold">Data Barang</h1>    
                </div>     

                <div className="flex justify-end mt-10">
                    <Link 
                    className="bg-green-500 hover:bg-green-600 text-white rounded-md py-2 px-4 font-semibold"
                    to={'/dashboard/form'}> + Add Data</Link>
                </div>               

                <div className="overflow-x-auto shadow-md sm:rounded-lg mt-4 mb-20">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-900 ">
                        <thead className="text-xs w-full border-b-2 border-gray-400 text-gray-900 uppercase bg-white">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Stok
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <select className="font-sm text-xs cursor-pointer
                                    border-0 focus:border-0 focus:ring-0 text-gray-900 rounded-sm block"
                                    value={selectedCategory || ''}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value="all">KATEGORI</option>
                                        <option value="Interior">INTERIOR</option>
                                        <option value="Eksterior">EKSTERIOR</option>
                                        <option value="Lampu">LAMPU</option>
                                        
                                    </select>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                    Harga
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.filter((product) => {
                            if (!selectedCategory || selectedCategory === "all") {
                                return true;
                            }
                            return product.kategori === selectedCategory;
                            })
                            .sort((a, b) => b.timestamp - a.timestamp)
                            .map((product, index) => (
                                <>      
                                    <tr key={index} className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {index + 1} 
                                    </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {product.name} 
                                        </th>
                                        <td className="px-6 py-4">
                                            {product.stok}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.kategori}
                                        </td>
                                        <td className="px-6 py-4">
                                            Rp. {product.harga}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link to={`/dashboard/edit/${product.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link> | 
                                            <button className="font-medium ml-1 text-blue-600 dark:text-blue-500 hover:underline"
                                            onClick={() => handleDelete(product.id)}>  Delete</button>
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>

                
                </div>
                </div> 
              </div>
        </>
    )
}