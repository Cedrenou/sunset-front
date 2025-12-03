import Image from 'next/image';

interface HeroProps {
  title?: string;
  quote: string;
  author?: string;
  backgroundImage: string;
  backgroundAlt?: string;
  overlay?: boolean;
}

export default function Hero({
  title,
  quote,
  author,
  backgroundImage,
  backgroundAlt = '',
  overlay = true,
}: HeroProps) {
  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          className="object-cover"
          priority
        />
        {overlay && (
          <div className="absolute inset-0 bg-black/50" />
        )}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative text-center text-white">
        {title && (
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {title}
          </h1>
        )}
        <blockquote className="text-xl md:text-3xl font-light italic max-w-4xl mx-auto">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {author && (
          <p className="mt-4 text-lg md:text-xl font-medium">
            — {author}
          </p>
        )}
      </div>
    </section>
  );
}
