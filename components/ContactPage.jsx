import Banner from "@/components/Banner";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <Banner />
      <main className="py-12 md:py-16">
        <div className="container mx-auto px-[5%] md:px-[10%]">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Contact Us
          </h1>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="lg:w-1/2 bg-amber-50 p-6 rounded-lg ">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-amber-500 mr-2 mt-1" />
                  <p>123 Garden Street, Greenville, GR 12345</p>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-amber-500 mr-2" />
                  <p>Phone: (555) 123-4567</p>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-amber-500 mr-2" />
                  <p>Email: info@greenhorizons.com</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Working Hours</h3>
                  <div className="flex items-center mb-2">
                    <Clock className="w-6 h-6 text-amber-500 mr-2" />
                    <span>Monday - Friday: 8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-6 h-6 text-amber-500 mr-2" />
                    <span>Saturday: 9:00 AM - 4:00 PM</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
                  <div className="flex space-x-4">
                    <Link
                      href="#"
                      className="text-amber-500 hover:text-green-700"
                    >
                      <Facebook className="w-6 h-6" />
                      <span className="sr-only">Facebook</span>
                    </Link>
                    <Link
                      href="#"
                      className="text-amber-500 hover:text-green-700"
                    >
                      <Twitter className="w-6 h-6" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <Link
                      href="#"
                      className="text-amber-500 hover:text-green-700"
                    >
                      <Instagram className="w-6 h-6" />
                      <span className="sr-only">Instagram</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
