import { FolderMinusIcon, HomeIcon, CalendarDaysIcon, PhotoIcon, UserIcon, ArrowRightStartOnRectangleIcon} from "@heroicons/react/24/solid";
import { Link,useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../../../config/firebase";
import { addDoc, updateDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { storage } from "../../../config/firebase"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { DocumentChartBarIcon } from "@heroicons/react/24/solid";


const initialState = {
  name: "",
  harga: "",
  stok: "",
  kategori: "",
  deskripsi: "",
}

export default function DashboardForm() {
  const navigate = useNavigate()
  const [data, setData] = useState(initialState)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(null)
  const [isSubmit, setIsSubmit] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({})
  const [currentDate, setCurrentDate] = useState(new Date());
  const {id} = useParams()
  
  useEffect(() => {
    id && getSingleProduct()
  }, [id])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const uploadFile = () =>{
      // eslint-disable-next-line no-unused-vars
      const name = new Date().getTime() + file.name
      const storageRef = ref(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)

        switch (snapshot.state) {
          case "paused":
            console.log('upload is pause')
            break;
          case "running":
            console.log('upload is running')
            break;
          default:
            break;
        }
      }, (error) => {
        console.log(error)
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setData((prev) => ({ ...prev, img: downloadURL}))
        })
      }
    )
    }
      file && uploadFile()
  }, [file])

  const getSingleProduct = async () => {
    const docRef = doc(db, 'product', id)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      setData({ ...snapshot.data() })
    }
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate('/')
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  const validate = () => {
    let errors = {}

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let errors = validate()
    if (Object.keys(errors).length) return setErrors(errors)
    setIsSubmit(true)
  if(!id) {
    try{
      await addDoc(collection(db, "product"), {
        ...data,
        timestamp: serverTimestamp()
      })
    } catch(error) {
      console.log(error)
    }
  } else {
    await updateDoc(doc(db, "product", id), {
      ...data,
      timestamp: serverTimestamp()
      })

  }
    navigate('/dashboard/data')
  }


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
                    <Link to={'/dashboard/form'} className="flex text-xs bg-gray-900 lg:text-1xl items-center gap-2 p-2 rounded-sm font-semibold">
                        <FolderMinusIcon className="hidden lg:block w-6" />
                        Form 
                    </Link>
                    <Link to={'/dashboard/data'} className="flex text-xs lg:text-1xl items-center gap-2 p-2 rounded-sm font-semibold">
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

            {isSubmit ? (
                <div className="flex justify-center mt-20"><p>Loading...</p></div>
            ) : (
            <div className="bg-gray-50 h-full w-4/5">
            <header className="flex bg-white justify-between px-10 py-5 ">
            <div className="flex gap-4 px-3 py-1 rounded-sm w-max items-center">
                <CalendarDaysIcon className="w-8 text-blue-700"/>
                <p className="font-bold text-gray-800"> {currentDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p>{currentDate.toLocaleTimeString()}</p>
            </div>
                <button className="text-gray-900 flex font-semibold">
                    <UserIcon className="w-7"/>
                </button>
            </header>
            <div className="px-4 lg:px-28 py-10">
            <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Form { id ? 'edit' : 'upload' } Barang</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Pastikan kamu sudah mematuhi SOP sebelum { id ? 'edit' : 'upload' } data!
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="namabarang" className="block text-sm font-medium leading-6 text-gray-900">
                Nama Barang
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="namabarang"
                    autoComplete="namabarang"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Nama barang"
                    required
                    onChange={handleChange}
                    value={data.name}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="namabarang" className="block text-sm font-medium leading-6 text-gray-900">
                Harga Barang
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="harga"
                    id="hargabarang"
                    autoComplete="hargabarang"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="harga barang"
                    required
                    onChange={handleChange}
                    value={data.harga}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="namabarang" className="block text-sm font-medium leading-6 text-gray-900">
                Stok Barang
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="stok"
                    id="stokbarang"
                    autoComplete="stokbarang"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="stok barang"
                    required
                    onChange={handleChange}
                    value={data.stok}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Kategori</label>
          <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
          name="kategori"
          onChange={handleChange}
          value={data.kategori}
          >
            <option selected>Pilih Kategori</option>
            <option value="Interior">Interior </option>
            <option value="Eksterior">Eksterior</option>
            <option value="Lampu">Lampu</option>
          </select>
            </div>
            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Deskripsi Barang
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="deskripsi"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                  required
                  onChange={handleChange}
                    value={data.deskripsi}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Tuliskan beberapa kata tentang deskripsi barang</p>
            </div>

            

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Foto Barang
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only"
                      onChange={(e) => setFile(e.target.files[0])}
                      required
                      {...(id ? { readOnly: true } : {})}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        <div className="flex justify-end mt-4">
              <button className="px-5 py-2 rounded-md bg-green-600 text-white" type="submit" disabled={progress !== null && progress < 100}>Submit</button>
        </div>
        </div>

        
      </div>
      
    </form>
            </div>
            </div>   
            )}


          </div>
        
        </>
    )
}