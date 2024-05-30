
import {Link} from 'react-router-dom'

const callouts = [
    {
      name: 'Interior Mobil',
      description: 'Perbaharui interior mobilmu di MD Variasi',
      imageSrc: '/images/interior.jpeg',
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: '#',
    },
    {
      name: 'Eksterior Mobil',
      description: 'Jadikan mobilmu menjadi keren!',
      imageSrc: '/images/eksterior.jpeg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: '#',
    },
    {
      name: 'Cat mobil',
      description: 'Ubah warna mobilmu sesukamu!',
      imageSrc: '/images/catmobil.jpeg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
    },
  ]
  
  export default function ProdukKategori() {
    return (
      <div className="">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-9 sm:py-24 lg:max-w-none lg:py-32">
            <div className="flex gap-3 items-center">
            <div className="flex w-3 h-6 bg-orange-500"></div>
            <h2 className="text-2xl font-bold text-gray-900">Keunggulan</h2>
            </div>
  
            <div className=" mt-6 grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-3  xl:gap-x-8">
            {callouts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">
                      <Link to={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    )
  }
  