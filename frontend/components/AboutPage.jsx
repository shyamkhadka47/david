import Image from "next/image";

import { getaboutus, getcontentbypage, getslider } from "@/hooks/data";
import Hero from "./Hero";
import AboutSection from "./AboutSection";

export default async function AboutPage() {
  const sliderres = await getslider("about");
  const aboutusres = await getaboutus();
  const aboutpagecontentres = await getcontentbypage("about");

  const sliderresprops =
    sliderres && sliderres?.success == true && sliderres?.data.length > 0
      ? sliderres?.data
      : [];
  const aboutusresprops =
    aboutusres && aboutusres.success == true && aboutusres?.data.length > 0
      ? aboutusres?.data[0]
      : null;

      const aboutpagecontentresprops =
      aboutpagecontentres &&
      aboutpagecontentres?.success == true &&
      aboutpagecontentres?.data
        ? aboutpagecontentres?.data
        : null;

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Hero slider={sliderresprops} />
      {aboutusresprops && (
        <section className="pt-16 pb-16 bg-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl  mb-8 text-center">About Me</h1>

            <div className="grid md:grid-cols-2 gap-16 items-center px-[5%] md:px-[10%]">
              <div className="relative aspect-square">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${aboutusresprops.aboutImages[1]}`}
                  alt="Studio Image"
                  fill
                  className="object-cover"
                />
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-museum-gold/65 opacity-95" />
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl  mb-6">
                  {aboutusresprops.title}
                </h2>
                <div
                  dangerouslySetInnerHTML={{ __html: aboutusresprops.content }} className="rich-style"
                ></div>
              </div>

            </div>
          </div>
        </section>
      )}
      <AboutSection data={aboutpagecontentresprops}/>
    </main>
  );
}
