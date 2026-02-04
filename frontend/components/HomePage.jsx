import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import HomepageGallery from "./HomepageGallery";
import {
  getaboutus,
  getcachedgallery,
  getcontentbypage,
  getmetadata,
  getslider,
} from "@/hooks/data";



export const dynamic = "force-static";

export default async function HomePage() {
  const sliderres = await getslider("home");
  const homepagegalleryres = await getcachedgallery();
  const homepageaboutres = await getaboutus();
  const homepagecontentres = await getcontentbypage("home");

  const homepagegalleryresprops =
    homepagegalleryres &&
    homepagegalleryres?.success == true &&
    homepagegalleryres?.data.length > 0
      ? homepagegalleryres.data
      : [];

  const homepageaboutresprops =
    homepageaboutres &&
    homepageaboutres?.success == true &&
    homepageaboutres?.data.length > 0
      ? homepageaboutres.data[0]
      : null;

  const sliderresprops =
    sliderres && sliderres?.success == true && sliderres?.data.length > 0
      ? sliderres?.data
      : [];

  const homepagecontentresprops =
    homepagecontentres &&
    homepagecontentres?.success == true &&
    homepagecontentres?.data
      ? homepagecontentres?.data
      : null;
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <Hero slider={sliderresprops} />

      <HomepageGallery gallery={homepagegalleryresprops} />
      {/* About Section */}
      <section id="about" className="py-32  bg-gray-100">
        <div className="container mx-auto px-[5%] md:px-[10%] ">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${homepageaboutresprops.aboutImages[0]}`}
                alt="Studio"
                fill
                className="object-cover"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-museum-gold opacity-35" />
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl capitalize  mb-8">
                {homepageaboutresprops.title}
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: homepageaboutresprops?.shortContent,
                }}
                className="mb-10 text-lg leading-relaxed"
              ></div>
              <Link
                href="/about"
                className="inline-block bg-black text-white px-10 py-4 text-lg font-semibold hover:bg-amber-500 hover:text-black transition-colors duration-300"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AboutSection data={homepagecontentresprops} />
    </main>
  );
}
