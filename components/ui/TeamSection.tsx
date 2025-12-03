import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  image: {
    sourceUrl: string;
    altText: string;
  };
}

interface TeamSectionProps {
  title: string;
  description?: string;
  members: TeamMember[];
  darkMode?: boolean;
}

export default function TeamSection({
  title,
  description,
  members,
  darkMode = false,
}: TeamSectionProps) {
  const bgClass = darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          {description && (
            <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div
              key={index}
              className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${
                darkMode ? 'bg-gray-800' : 'bg-gray-50'
              }`}
            >
              <div className="relative aspect-square">
                <Image
                  src={member.image.sourceUrl}
                  alt={member.image.altText || member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">
                  {member.name}
                </h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
