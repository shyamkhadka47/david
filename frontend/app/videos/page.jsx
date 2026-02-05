import Hero from "@/components/Hero";
import HeroSection from "@/components/Hero";
import VideoGallery from "@/components/VideoGallery";
import {
  getbannervideos,
  getmetadata,
  getslider,
  getvideos,
} from "@/hooks/data";
import React from "react";

export const dynamic = "force-static";
export async function generateMetadata() {
  const res = await getmetadata();
  const data =
    res &&
    res?.data.length > 0 &&
    res?.data?.filter((el) => el.page === "videos");

  if (data && data.length > 0) {
    const [{ title, description }] = data;

    return {
      title,
      description,
    };
  }
  return {
    title: "Sculpting Video by David | Professional Sculpture Techniques",
    description:
      "Watch a sculpting video by artist David showcasing professional techniques, creative process, and artistic craftsmanship in sculpture.",
  };
}

const page = async () => {
  const data = await getvideos();
  const sliderres = await getslider("videos");
  const sliderresprops =
    sliderres && sliderres?.success == true && sliderres?.data.length > 0
      ? sliderres?.data
      : [];

  return (
    <div>
      <Hero slider={sliderresprops} />
      <div className="pb-20">
        <h1 className="text-3xl font-bold text-center py-8">
          Learn Sculpting Through Video Tutorials
        </h1>
        <VideoGallery videos={data} />
      </div>
    </div>
  );
};

export default page;
