import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 bg-black text-white/70 border-t border-white/10 px-[5%] md:px-[10%]">
      <section id="contact" className="py-32 bg-black px-[5%] text-white">
        <div className="flex flex-col gap-10">
          <div data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-center">
              Connect With Us
            </h2>
            <p className="text-white/80 text-center text-lg mb-16">
              Visit our gallery in person or contact us to arrange a private
              viewing of our collection.
            </p>
          </div>
          <div className="flex flex-col flex-wrap md:flex-row justify-center md:justify-between items-center gap-[50px]">
            {/* About Us Section on Left Side */}
            <div data-aos="flip-left" className="md:w-1/3">
              <h3 className="text-2xl font-serif mb-6 text-amber-500">
                About Us
              </h3>
              <p className="text-lg">
                David Sculptures is a premier gallery showcasing the finest
                sculptures from renowned and emerging artists. Our mission is to
                bring art to life and connect collectors with unique,
                handcrafted works of art. We believe in the power of sculpture
                to inspire and elevate spaces, creating lasting impressions and
                meaningful connections.
              </p>
            </div>

            {/* Gallery Hours Section */}
            <div data-aos="flip-left">
              <h3 className="text-2xl font-serif mb-6 text-amber-500">
                Gallery Hours
              </h3>
              <div className="space-y-4 text-lg">
                <p className="flex justify-between">
                  <span>Tuesday - Friday</span>
                  <span>10:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday</span>
                  <span>11:00 AM - 5:00 PM</span>
                </p>
                <p className="flex space-x-4">
                  <span>Sunday - Monday</span>
                  <span>By Appointment Only</span>
                </p>
              </div>
            </div>

            {/* Contact Information Section */}
            <div data-aos="flip-left" data-aos-delay="90">
              <h3 className="text-2xl font-serif mb-6 text-amber-500">
                Contact Information
              </h3>
              <div className="space-y-4 text-lg">
                <p>123 Art District Avenue</p>
                <p>New York, NY 10001</p>
                <p className="text-amber-500">info@Davidsculptures.com</p>
                <p>+1 (212) 555-7890</p>
              </div>
            </div>
          </div>
          <div className="text-center" data-aos="fade-up">
            <Link
              href="/contact"
              className="inline-block bg-amber-500 text-black px-10 py-4 text-lg font-semibold hover:bg-amber-400 transition-colors duration-300"
            >
              Schedule a Visit
            </Link>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-serif mb-6 md:mb-0 tracking-wider">
            David<span className="text-amber-500">.</span>
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} David Sculptures. All rights reserved.
          </div>
          <div className="relative">
            Developed By{" "}
            <Link
              href={"https://designtechjoy.com"}
              className="before:absolute before:bg-amber-500 before:w-full before:left-0 before:h-[3px] before:content-[' '] before:top-7 "
            >
              Design Tech Joy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
