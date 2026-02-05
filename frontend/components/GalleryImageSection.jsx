"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const GalleryImageSection = () => {
  const [page, setPage] = useState(1);
  const [sculptures, setSculptures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [textLoading, setTextLoading] = useState(true);
  const [totalpages, setTotalPages] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const getgallery = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getallgallery?page=${page}&limit=9`
      );

      const result = await res.json();

      setSculptures((prev) =>
        page == 1 ? [...result.data] : [...prev, ...result.data]
      );
      setTotalPages(result.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setTextLoading(false);
    }
  };
  useEffect(() => {
    getgallery();
  }, [page]);

  // INFINITE SCROLL

  useEffect(() => {
    const threshold = window.innerWidth >= 640 ? 500 : 800;
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - threshold &&
        page !== totalpages &&
        !loading
      ) {
        setPage((p) => p + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, totalpages]);

  return (
    <div>
      {" "}
      <section className="pt-16 pb-16 bg-white  ">
        <div className="container mx-auto px-[5%] md:px-[10%]">
          {textLoading ? (
            <div className="text-center animate-pulse">
              <div className="h-10 md:h-12 bg-gray-300 w-72 mx-auto mb-6 rounded" />
              <div className="h-5 bg-gray-200 w-4/5 mx-auto mb-3 rounded" />
              <div className="h-5 bg-gray-200 w-3/4 mx-auto mb-3 rounded" />
              <div className="h-5 bg-gray-200 w-2/3 mx-auto rounded" />
            </div>
          ) : (
            <div>
              <h1 className="text-4xl md:text-5xl  mb-8 text-center">
                About Our Gallery
              </h1>
              <p className="text-center text-xl  ">
                Each piece in the my gallery holds a unique message and style to
                be considered by the viewer, offering a historical reference to
                the diversity of art within the present time.This is truly a
                growing tribute to the talent and creativity we find in our mids
              </p>{" "}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12  my-20">
            {loading
              ? Array.from({ length: 6 }).map((el, i) => (
                  <div key={i}>
                    {" "}
                    <div className="animate-pulse">
                      <div className="aspect-[3/4] bg-gray-300 mb-6" />{" "}
                      <div className="mb-3 bg-slate-300 h-6 w-[3/4]" />
                      <div className="mb-3 bg-slate-300 h-4 w-full" />
                      <div className="mb-3 bg-slate-300 h-4 w-[150px]" />
                    </div>
                  </div>
                ))
              : sculptures?.map((sculpture, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div
                      className="relative aspect-[3/4] overflow-hidden mb-6"
                      onClick={() => {
                        setActiveIndex(index);
                        setIsOpen(true);
                      }}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${sculpture.galleryImage}`}
                        alt={sculpture.caption}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex(index);
                            setIsOpen(true);
                          }}
                          className="text-white border border-white px-6 py-2 hover:bg-white/20 transition-colors duration-300"
                        >
                          View Details
                        </span>
                      </div>
                    </div>
                    <h3 className="text-2xl  mb-2">{sculpture.caption}</h3>
                    <p className="text-gray-600">{sculpture.description}</p>
                    <p className="text-orange-500">
                      {sculpture.Category.name}, {sculpture.year}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </section>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/90 w-screen h-[100dvh]">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-10 right-20 text-white text-3xl z-50"
          >
            ✕
          </button>

          <Swiper
            modules={[Navigation]}
            initialSlide={activeIndex}
            className="w-full h-full"
          >
            {sculptures.map((sculpture, i) => (
              <SwiperSlide key={i} className="flex items-center justify-center">
                <div className="relative w-full h-[85dvh] mt-5">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${sculpture.galleryImage}`}
                    alt={sculpture.caption}
                    fill
                    className="object-contain bg-black"
                  />
                </div>

                {/* Caption overlay */}
                <div className="absolute bottom-6 left-0 right-0 text-center text-white px-6">
                  <h3 className="text-2xl">{sculpture.caption}</h3>
                  <p className="opacity-80">{sculpture.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default GalleryImageSection;
