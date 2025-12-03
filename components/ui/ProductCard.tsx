import Link from 'next/link';
import Image from 'next/image';
import type { WCProduct } from '@/types/woocommerce';

interface ProductCardProps {
  product: WCProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image?.sourceUrl || '/placeholder-product.jpg';

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={product.image?.altText || product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.onSale && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            PROMO
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.onSale && product.salePrice ? (
              <>
                <span className="text-lg font-bold text-red-600">
                  {product.salePrice}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {product.regularPrice}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {product.price}
              </span>
            )}
          </div>

          <span className={`text-xs px-2 py-1 rounded ${
            product.stockStatus === 'IN_STOCK'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {product.stockStatus === 'IN_STOCK' ? 'En stock' : 'Rupture'}
          </span>
        </div>
      </div>
    </Link>
  );
}
