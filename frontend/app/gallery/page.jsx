import GalleryImageSection from "@/components/GalleryImageSection";
import Hero from "@/components/Hero";

import { getmetadata, getslider } from "@/hooks/data";

// META DATA
export async function generateMetadata() {
  const res = await getmetadata();
  const data =
    res &&
    res?.data.length > 0 &&
    res?.data?.filter((el) => el.page === "gallery");

  if (data && data.length > 0) {
    const [{ title, description }] = data;

    return {
      title,
      description,
    };
  }

  return {
    title: "Gallery | Explore Contemporary Sculptures",
    description:
      "Explore our curated gallery of contemporary sculptures and artworks, each piece expressing creativity, emotion, and artistic excellence.",
  };
}

export const dynamic = "force-static";

export default async function Gallery() {
  const sliderres = await getslider("gallery");
  const sliderresprops =
    sliderres && sliderres?.success == true && sliderres?.data.length > 0
      ? sliderres?.data
      : [];
  return (
    <>
      {" "}
      <main className="min-h-screen bg-white overflow-x-hidden">
        <Hero slider={sliderresprops} />
        <GalleryImageSection />
      </main>
    </>
  );
}
