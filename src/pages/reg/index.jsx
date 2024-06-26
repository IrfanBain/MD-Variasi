import { useState } from "react"
import { auth, db } from "../../config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { Link, useNavigate } from "react-router-dom"

export default function RegisPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // eslint-disable-next-line no-unused-vars
    const [nama, setNama] = useState("")
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser
            console.log(user)
            if(user){
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    name: nama,
                })
            }
            alert('Succes!')
            navigate('/admin')
        } catch(error){
            console.log(error.message)
        }
    }
    return(
        <>
            <section className="hidden lg:block bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link to={'/'} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="/images/logo.png" alt="logo" />
          MD VARIASI   
      </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Register Admin
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                  <div>
                      <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">nama</label>
                      <input type="nama" name="nama" id="nama" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required="" 
                      onChange={(e) => setNama(e.target.value)}/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required="" 
                      onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" 
                      onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Daftar</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      sudah punya akun? <Link to={'/admin'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Masuk</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
            </section>
        </>
    )
}