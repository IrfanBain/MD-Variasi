import { FolderMinusIcon, HomeIcon, CalendarDaysIcon, PhotoIcon, UserIcon, ArrowRightStarOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../../../config/firebase";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { storage } from "../../../config/firebase"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Loading from "./loading";

const initialState = {
  name: "",
  harga: "",
  kategori: "",
  deskripsi: "",
}

export default function DashboardForm() {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if(!user) {
        navigate('/admin')
      }
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate('/')
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);



  const [data, setData] = useState(initialState)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(null)
  const [isSubmit, setIsSubmit] = useState(false)
  const [errors, setErrors] = useState({})
  

  useEffect(() => {
    const uploadFile = () =>{
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

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
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
    if (isSubmit == true) {
      navigate('/dashboard/home')
    }
    await addDoc(collection(db, "product"), {
      ...data,
      timestamp: serverTimestamp()
    })
  }


    return(
        <>
        {userDetails ? (
          <div className="flex">
            <div className="relative w-1/5">
            <div className=" fixed border-r-2 border-gray-50 text-gray-100 bg-gray-800 h-screen w-1/5  p-2">
                <header className="flex items-center justify-center mb-4">
                    <Link to={'/'}>
                    <img src="/images/logo.png" alt="" width={'50px'} />
                    </Link>
                    <h1 className="font-bold sm:text-2xl text-gray-100">MD VARIASI</h1>
                </header>
                
                <div className="flex flex-col justify-center mt-10 mx-5">
                    <span className=" font-sans font-semibold mb-3">PAGES</span>
                    <div className="flex flex-col gap-3">
                    <Link to={'/dashboard/home'} className="flex items-center gap-2 p-2 rounded-sm font-semibold">
                        <HomeIcon className="w-6" />
                        Dashboard
                    </Link>
                    <Link to={'/dashboard/form'} className="flex items-center gap-2 bg-gray-900 p-2 rounded-sm font-semibold0">
                        <FolderMinusIcon className="w-6" />
                        Form 
                    </Link>
                    <button className="flex items-center gap-2 p-2 rounded-sm font-semibold" onClick={handleLogout}>
                     <ArrowRightStarOnRectangleIcon />
                    Logout
                    </button>                           
                    </div>

                </div>

            </div>
            </div>

            {isSubmit ? (
                <Loading />
            ) : (
            <div className="bg-gray-50 h-full w-4/5">
            <header className="flex bg-white justify-between px-10 py-5 ">
            <div className="flex gap-4 px-3 py-1 rounded-sm w-max items-center">
                <CalendarDaysIcon className="w-8 text-blue-700"/>
                <p className="font-bold text-gray-800"> {currentDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p>{currentDate.toLocaleTimeString()}</p>
            </div>
                <button className="text-gray-900">
                    <UserIcon className="w-7"/>
                </button>
            </header>
            <div className="px-28 py-10">
            <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Form Upload Barang</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Pastikan kamu sudah mematuhi SOP sebelum menguplod data!
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
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Kategori</label>
          <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
          name="kategori"
          onChange={handleChange}
          value={data.kategori}
          >
            <option selected>Pilih Kategori</option>
            <option value="interior">Interior </option>
            <option value="eksterior">Eksterior</option>
            <option value="lampu">Lampu</option>
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
                      required />
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
        ) : (
          <p className="flex justify-center mt-72">Loading...</p>
        )}
        </>
    )
}