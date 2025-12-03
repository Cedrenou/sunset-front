import Image from 'next/image';

interface GalleryImage {
  image: {
    sourceUrl: string;
    altText: string;
  };
  caption?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  title?: string;
}

export default function Gallery({ images, title }: GalleryProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((item, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer hover:shadow-xl transition-shadow"
            >
              <Image
                src={item.image.sourceUrl}
                alt={item.image.altText || `Gallery image ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {item.caption && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <p className="text-white text-center text-sm">
                    {item.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
