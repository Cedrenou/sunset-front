import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';
import { getProducts } from '@/lib/woocommerce/api';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Qui sommes nous - Sunset Rider Shop',
  description: 'Découvrez l\'histoire et les valeurs de Sunset Rider',
};

export default async function QuiSommesNousPage() {
  // Récupérer les produits pour la section dynamique
  let products = [];
  try {
    const productsData = await getProducts(6);
    products = productsData.nodes || [];
  } catch (err) {
    console.error('Error fetching products:', err);
  }

  return (
    <Layout>

      {/* Section Introduction - STATIQUE - Reproduction pixel perfect */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Colonne gauche - Image composite */}
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070"
                  alt="Sunset Riders - Motards en action"
                  fill
                  className="object-cover"
                />
                {/* Overlay avec logo/texte Sunset Riders */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <h2 className="text-white text-5xl md:text-6xl font-script italic">
                    Sunset Riders
                  </h2>
                </div>
              </div>
            </div>

            {/* Colonne droite - Contenu texte */}
            <div className="space-y-8">
              {/* Citation principale */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                &ldquo;S&apos;equiper et rouler en securité ne doit plus être un luxe.&rdquo;
              </h1>

              {/* Sous-titre en italique */}
              <p className="text-xl md:text-2xl text-gray-700 italic font-light">
                On vous raconte notre histoire, le concept et notre processus de reconditionnement
              </p>

              {/* Petite citation */}
              <p className="text-sm text-gray-600">
                &ldquo;Sécurité, accessibilité, eco-responsabilité&rdquo;
              </p>

              {/* Boutons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#reconditionnement"
                  className="px-8 py-3 bg-black text-white font-semibold uppercase text-sm tracking-wider hover:bg-gray-800 transition-colors"
                >
                  Reconditionnement
                </Link>
                <Link
                  href="/shop"
                  className="px-8 py-3 border-2 border-black text-black font-semibold uppercase text-sm tracking-wider hover:bg-black hover:text-white transition-colors"
                >
                  Le Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - STATIQUE */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Quelques chiffres
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">0</div>
              <div className="text-sm md:text-base text-gray-300">
                Équipement neuf vendu
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">0</div>
              <div className="text-sm md:text-base text-gray-300">
                Impact carbone
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-sm md:text-base text-gray-300">
                Collecte en Europe
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-sm md:text-base text-gray-300">
                Items reconditionnés
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
              <div className="text-sm md:text-base text-gray-300">
                Clients satisfaits
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">4.8/5</div>
              <div className="text-sm md:text-base text-gray-300">
                Note moyenne
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Histoire Section - STATIQUE */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              L&apos;histoire de Sunset Rider
            </h2>
            <div className="prose prose-lg max-w-4xl mx-auto text-gray-700">
              <p>
                Sunset Rider est né d&apos;une passion commune pour la moto et d&apos;un constat simple :
                l&apos;équipement de sécurité de qualité ne devrait pas être un luxe réservé à quelques-uns.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Timeline items */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-20 md:w-24">
                <div className="bg-blue-600 text-white font-bold text-lg md:text-xl px-4 py-2 rounded-lg text-center">
                  2020
                </div>
              </div>
              <div className="flex-grow pb-8 border-l-2 border-gray-300 pl-6 relative">
                <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full -ml-[9px]" />
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">
                  Le début de l&apos;aventure
                </h3>
                <p className="text-gray-700">
                  Création de Sunset Rider avec une vision claire : rendre l&apos;équipement moto accessible à tous.
                </p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-20 md:w-24">
                <div className="bg-blue-600 text-white font-bold text-lg md:text-xl px-4 py-2 rounded-lg text-center">
                  2021
                </div>
              </div>
              <div className="flex-grow pb-8 border-l-2 border-gray-300 pl-6 relative">
                <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full -ml-[9px]" />
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">
                  Expansion du catalogue
                </h3>
                <p className="text-gray-700">
                  Élargissement de notre gamme de produits reconditionnés et partenariats européens.
                </p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-20 md:w-24">
                <div className="bg-blue-600 text-white font-bold text-lg md:text-xl px-4 py-2 rounded-lg text-center">
                  2023
                </div>
              </div>
              <div className="flex-grow pb-8 border-l-2 border-gray-300 pl-6 relative">
                <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full -ml-[9px]" />
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">
                  Nouvelle boutique en ligne
                </h3>
                <p className="text-gray-700">
                  Lancement de notre nouveau site pour une expérience d&apos;achat optimale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos derniers produits - DYNAMIQUE (API WooCommerce) */}
      {products.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nos derniers produits
              </h2>
              <p className="text-lg text-gray-600">
                Découvrez notre sélection de produits reconditionnés
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/shop"
                className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Voir tous les produits
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Catégories d'équipement - STATIQUE (peut être rendu dynamique avec API) */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            S&apos;équiper c&apos;est plus qu&apos;un luxe
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/shop?category=veste-homme"
              className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-8 text-center group"
            >
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-blue-500 group-hover:text-blue-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Veste moto</h3>
              <p className="text-gray-400 mt-2">Homme & Femme</p>
            </Link>

            <Link
              href="/shop?category=pantalon"
              className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-8 text-center group"
            >
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-blue-500 group-hover:text-blue-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Pantalon</h3>
              <p className="text-gray-400 mt-2">Tous styles</p>
            </Link>

            <Link
              href="/shop?category=protections"
              className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-8 text-center group"
            >
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-blue-500 group-hover:text-blue-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Protections</h3>
              <p className="text-gray-400 mt-2">Sécurité optimale</p>
            </Link>

            <Link
              href="/shop?category=chaussures"
              className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-8 text-center group"
            >
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-blue-500 group-hover:text-blue-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Chaussures & Bottes</h3>
              <p className="text-gray-400 mt-2">Confort et protection</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Engagement Section - STATIQUE */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Notre engagement
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700">
              <p>
                Chez Sunset Rider, nous nous engageons à fournir des équipements de qualité,
                contrôlés et reconditionnés selon les normes les plus strictes.
              </p>
              <p className="mt-4">
                Chaque produit est inspecté, nettoyé et testé avant d&apos;être mis en vente.
                Nous croyons que la sécurité des motards ne devrait jamais être compromise,
                quel que soit le budget.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
