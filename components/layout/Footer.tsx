import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Sunset Rider Shop
            </h3>
            <p className="text-sm">
              Votre boutique en ligne de confiance pour des produits de qualité.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Liens rapides
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-sm hover:text-white transition">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-white transition">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Informations
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/legal" className="text-sm hover:text-white transition">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-white transition">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-white transition">
                  CGV
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Newsletter
            </h4>
            <p className="text-sm mb-4">
              Inscrivez-vous pour recevoir nos offres exclusives
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-l text-gray-900 text-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r text-white text-sm transition"
              >
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Sunset Rider Shop. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
