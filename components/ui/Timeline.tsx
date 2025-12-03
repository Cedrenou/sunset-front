interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  title: string;
  content?: string;
  timeline: TimelineItem[];
}

export default function Timeline({ title, content, timeline }: TimelineProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {title}
          </h2>
          {content && (
            <div
              className="text-lg text-gray-700 max-w-4xl mx-auto prose prose-lg"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6 group">
                {/* Year Badge */}
                <div className="flex-shrink-0 w-20 md:w-24">
                  <div className="bg-blue-600 text-white font-bold text-lg md:text-xl px-4 py-2 rounded-lg text-center">
                    {item.year}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow pb-8 border-l-2 border-gray-300 pl-6 relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full -ml-[9px]" />

                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
