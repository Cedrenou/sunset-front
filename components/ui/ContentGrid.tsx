interface ContentItem {
  title: string;
  items: string[];
}

interface ContentGridProps {
  title?: string;
  description?: string;
  content: ContentItem[];
}

export default function ContentGrid({ title, description, content }: ContentGridProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.map((column, index) => (
            <div key={index} className="space-y-3">
              {column.title && (
                <h3 className="font-semibold text-lg mb-4 text-gray-900">
                  {column.title}
                </h3>
              )}
              <ul className="space-y-2">
                {column.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-700 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
