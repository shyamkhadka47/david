const AboutSection = ({data}) => {

  return (
   <>
   {data &&  <section id="about" className="py-24 bg-gray-50 text-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
        <div dangerouslySetInnerHTML={{__html:data.content}} className="rich-style"></div>

          {/* Stats */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
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
          </div> */}

          {/* Converted Button to regular Tailwind CSS */}
          <button className="bg-museum-gold mt-10 hover:bg-museum-gold/90 text-museum-dark font-medium uppercase tracking-wide py-3 px-8 rounded-lg transition-colors">
            Discover Our Story
          </button>
        </div>
      </div>
    </section>}
   </>
  );
};

export default AboutSection;
