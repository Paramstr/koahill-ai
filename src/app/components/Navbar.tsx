import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 relative">
        <div className="flex h-16 items-center">
          {/* Logo - Centered using absolute positioning */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="flex items-center">
              <span className="font-bold text-xl text-gray-900">Granthill</span>
            </Link>
          </div>

          {/* Navigation Links - Right */}
          <div className="hidden md:flex md:items-center ml-auto">
            <Link href="#" className="flex items-center text-gray-600 hover:text-gray-900 font-light px-4">
              Product
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            <Link href="#" className="text-gray-600 hover:text-gray-900 font-light px-4">
              Pricing
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 font-light px-4">
              About
            </Link>
          </div>          
        </div>
      </div>
    </nav>
  )
}

export default Navbar 