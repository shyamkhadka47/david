const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gray-50 text-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <p className="text-sm uppercase tracking-widest mb-4 text-museum-gold font-sans">
            About Artisan Museum
          </p>
          <h2 className=" text-4xl md:text-5xl font-bold mb-8">
            A Legacy of Artistic Excellence
          </h2>
          <div className="space-y-6 text-lg text-black/90 mb-12">
            <p>
              For over half a century, Artisan Museum has been a beacon of
              cultural enrichment, showcasing the finest examples of human
              creativity from ancient civilizations to contemporary innovators.
            </p>
            <p>
              Our mission transcends mere preservation—we actively engage with
              communities, foster dialogue, and inspire the next generation of
              artists and art enthusiasts through educational programs,
              interactive exhibitions, and collaborative partnerships.
            </p>
            <p>
              With a collection spanning 10,000+ works across diverse mediums
              and periods, we invite you to explore, question, and be
              transformed by the power of art.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="border-t-2 border-museum-gold pt-4">
              <p className=" text-4xl font-bold mb-2">10k+</p>
              <p className="text-sm text-white/70 uppercase tracking-wide">
                Artworks
              </p>
            </div>
            <div className="border-t-2 border-museum-gold pt-4">
              <p className=" text-4xl font-bold mb-2">50+</p>
              <p className="text-sm text-white/70 uppercase tracking-wide">
                Years
              </p>
            </div>
            <div className="border-t-2 border-museum-gold pt-4">
              <p className=" text-4xl font-bold mb-2">200k+</p>
              <p className="text-sm text-white/70 uppercase tracking-wide">
                Visitors
              </p>
            </div>
            <div className="border-t-2 border-museum-gold pt-4">
              <p className=" text-4xl font-bold mb-2">30+</p>
              <p className="text-sm text-white/70 uppercase tracking-wide">
                Exhibitions
              </p>
            </div>
          </div>

          {/* Converted Button to regular Tailwind CSS */}
          <button className="bg-museum-gold hover:bg-museum-gold/90 text-museum-dark font-medium uppercase tracking-wide py-3 px-8 rounded-lg transition-colors">
            Discover Our Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
