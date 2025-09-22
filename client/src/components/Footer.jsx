// Footer.jsx

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Funiro.</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            400 University Drive Suite 200 Coral Gables,
            <br />
            FL 33134 USA
          </p>
        </div>

        {/* Links + Help grouped together */}
        <div className="flex flex-col sm:flex-row gap-12">
          {/* Links */}
          <div>
            <h4 className="text-sm text-gray-400 font-semibold mb-4">Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm text-gray-400 font-semibold mb-4">Help</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="#" className="hover:underline">
                  Payment Options
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-sm text-gray-400 font-semibold mb-4">
            Newsletter
          </h4>
          <form className="flex flex-col sm:flex-row items-start sm:items-center border-b border-black max-w-xs">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="w-full sm:flex-1 py-2 text-sm text-gray-700 outline-none bg-transparent"
            />
            <button
              type="submit"
              className="text-sm font-bold underline mt-2 sm:mt-0 sm:ml-2 text-black"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-600 text-center sm:text-left">
          2023 funiro. All rights revered
        </div>
      </div>
    </footer>
  );
}
