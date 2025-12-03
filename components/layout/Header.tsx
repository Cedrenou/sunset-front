import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Sunset Rider Shop
          </Link>

          {/* Menu principal */}
          <ul className="hidden md:flex space-x-8">
            <li>
              <Link href="/" className="text-gray-700 hover:text-gray-900 transition">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/shop" className="text-gray-700 hover:text-gray-900 transition">
                Boutique
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-700 hover:text-gray-900 transition">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 transition">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition">
                Contact
              </Link>
            </li>
          </ul>

          {/* Actions (Panier, Compte) */}
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="text-gray-700 hover:text-gray-900 transition"
              aria-label="Panier"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </Link>
            <Link
              href="/account"
              className="text-gray-700 hover:text-gray-900 transition"
              aria-label="Compte"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
