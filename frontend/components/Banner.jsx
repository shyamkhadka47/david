"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Banner({ title, backgroundImage, banner }) {
  const pathname = usePathname();
 

  return (
    <div className="relative h-[70vh] mt-20 flex items-center justify-center">
     {banner.length>0 ? banner?.map((el, i)=>(<> <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${el.sliderImage}`}
        alt="Page banner background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-white container mx-auto px-[5%] md:px-[10%]">
      <nav className="text-sm md:text-base mb-5">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center text-2xl">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center text-2xl">
              <span className="text-amber-500 capitalize">
                {pathname.slice(1)}
              </span>
            </li>
          </ol>
        </nav>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 capitalize">
          {el.title}
        </h1>
        
      </div></>)) : ""}
    </div>
  );
}
