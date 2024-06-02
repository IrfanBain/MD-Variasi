import Footer from "../../component/layouts/footer"
import Navbar from "../../component/layouts/navbar"

const people = [
  {
    name: 'Leslie Alexander',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Leslie Alexander',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]

export default function TeamPage() {
  return (
    <>
    <Navbar />
    <div className="py-10">
      <div className="flex flex-col justify-center px-5 sm:px-96 gap-y-4 mb-20">
        <h1 className="font-bold text-4xl sm:text-5xl text-center">Tentang Kami</h1>
        <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestias officiis neque quia velit perferendis ullam mollitia a, nulla placeat illum quis nisi vitae praesentium quam expedita labore distinctio fugiat.</p>
      </div>
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">Team Kami</h2>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            Kami memiliki beberapa team dalam pengerjaan usaha kami 
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-800">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Footer />
    </>
  )
}
