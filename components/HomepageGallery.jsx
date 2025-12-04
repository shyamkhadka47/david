import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    id: 1,
    title: "Geometric Harmony",
    artist: "Marina Delacroix",
    category: "Sculpture",
    image: "/IMG 3172.png",
    year: "2024",
  },
  {
    id: 2,
    title: "Classical Revival",
    artist: "Historical Collection",
    category: "Sculpture",
    image: "/Hugs and Kisses.png",
    year: "2023",
  },
  {
    id: 3,
    title: "Minimalist Forms",
    artist: "Chen Wei",
    category: "Sculpture",
    image: "/IMG_3592.webp",
    year: "2024",
  },
  {
    id: 4,
    title: "Abstract Narratives",
    artist: "Sofia Torres",
    category: "Sculpture",
    image: "/Seer.webp",
    year: "2024",
  },
  {
    id: 5,
    title: "Elegant Figures",
    artist: "Alexandre Rousseau",
    category: "Scupture",
    image: "/IMG_3600.webp",
    year: "2023",
  },
  {
    id: 6,
    title: "Ethereal Dreams",
    artist: "David Stuchicacho",
    category: "Sculpture",
    image: "/mementoVita.webp",
    year: "2024",
  },
];

const HomepageGallery = () => {
  return (
    <section id="collections" className="py-24 bg-white">
      <div className="container mx-auto px-[5%] md:px-[10%]">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-sm uppercase tracking-widest mb-4 text-museum-gold font-sans">
            Our Collections
          </p>
          <h2 className=" text-4xl md:text-5xl font-bold mb-6">
            Curated Masterpieces
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover an extraordinary selection of artworks spanning centuries
            and styles, each piece carefully chosen to inspire and provoke
            thought.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {collections.map((item, index) => (
            <div
              key={item.id}
              className="group overflow-hidden border-0 bg-card hover:shadow-2xl transition-all duration-500"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  fill
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-museum-dark/80 via-museum-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Hover Content */}
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button className="border-2 border-white text-white hover:bg-white hover:text-museum-dark uppercase tracking-wide text-xs py-2 px-4 rounded-md transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-museum-gold mb-2 font-sans">
                  {item.category}
                </p>
                <h3 className=" text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {item.artist}
                </p>
                <p className="text-xs text-muted-foreground">{item.year}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href={"/gallery"}
            className="border-2 border-museum-gold bg-museum-gold text-museum-dark hover:bg-museum-gold/90 font-medium uppercase tracking-wide py-3 px-8 rounded-lg transition-all duration-300"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomepageGallery;
