const stats = [
    { id: 1, name: 'Pelayanan Baik', value: '100 %' },
    { id: 2, name: 'Garansi', value: '1 Bulan' },
    { id: 3, name: 'Harga Terjangkau', value: 'Mulai 20k' },
  ]
  
  export default function Bottom() {
    return (
      <div className="bg-white py-18 sm:py-32 mb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-3 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    )
  }
  