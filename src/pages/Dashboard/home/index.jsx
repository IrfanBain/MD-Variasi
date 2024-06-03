import { FolderMinusIcon, HomeIcon, CalendarDaysIcon, UserIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import InteriorLength from "./interiorLength";
import EksteriorLength from "./eksteriorLength";
import LampuLength from "./lampuLength";
import { DocumentChartBarIcon } from "@heroicons/react/24/solid";
export default function DashboardHome() {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if(!user) {
        navigate('/admin')
      }
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
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
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  let timeOfDay;
  if (currentTime.getHours() < 12) {
    timeOfDay = 'Pagi';
  } else if (currentTime.getHours() < 15) {
    timeOfDay = 'Siang';
  } else if (currentTime.getHours() < 18) {
    timeOfDay = 'Sore';
  } else {
    timeOfDay = 'Malam';
  }
    return(
        <>
          
            {userDetails ? (
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
                    <Link to={'/dashboard/home'} className="flex text-xs lg:text-1xl items-center gap-2 bg-gray-900 p-2 rounded-sm font-semibold">
                        <HomeIcon className="hidden lg:block w-6" />
                        Dashboard
                    </Link>
                    <Link to={'/dashboard/form'} className="flex text-xs lg:text-1xl items-center gap-2 p-2 rounded-sm font-semibold">
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
                <div className="bg-gray-100 h-screen w-4/5">
                <header className="flex bg-white justify-end px-10 py-5 ">
                    <button className="text-gray-900 flex font-semibold">
                        Admin
                        <UserIcon className="ml-2 w-7"/>
                    </button>
                </header>
                <div className=" px-2 lg:px-10">
                <div className=" flex px-5 my-6 bg-[url('/images/hider.png')] bg-cover h-24 md:h-32 rounded-sm items-center
                ">
                    <div className="flex flex-col">
                        <h1 className="text-xl lg:text-3xl font-bold">Selamat {timeOfDay}, {userDetails.name} 👋</h1>
                        <p className=" text-sm lg:text-md text-gray-700">Nikamti harimu</p>
                    </div>
                </div>
                <div className="flex gap-4 px-3 py-1 rounded-sm w-max items-center border my-10 bg-white">
                    <CalendarDaysIcon className="w-8 text-blue-700"/>
                    <p className="font-bold text-gray-800"> {currentDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p>{currentDate.toLocaleTimeString()}</p>
                </div>
                <div className="grid grid-cols-2 lg:flex lg:justify-between my-10 lg:gap-5 lg:gap-x-10">
      
                    <InteriorLength />
                    <EksteriorLength />
                    <LampuLength />

                </div>
                </div>
            </div> 
              </div>
            ) : (
                <p className="flex justify-center mt-72">Loading...</p>
            )}
              
          
        </>
    )
}