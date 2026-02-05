"use client";
import { Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const getYouTubeID = (url) => {
  const regExp =
    /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  const match = url?.match(regExp);
  return match && match[1].length === 11 ? match[1] : null;
};

const YouTubePlayer = ({ url, title, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYouTubeID(url);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (!videoId) return <p>Invalid YouTube URL</p>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full aspect-video cursor-pointer">
        {isPlaying ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className="w-full h-full bg-center bg-cover flex items-center justify-center"
            style={{ backgroundImage: `url(${thumbnail})` }}
            onClick={() => setIsPlaying(true)}
          >
            <div className="bg-green-800/80 p-3 rounded-full shadow-xl text-xl">
              <Play color="white" size={30} />
            </div>
          </div>
        )}
      </div>
      <Link href={url} target="_blank">
        <h2 className="text-lg font-semibold mb-1 px-4 pt-4">{title}</h2>
        <p className="text-gray-600 text-md px-4 py-2">
          {description.slice(0, 100)}...
        </p>
      </Link>
    </div>
  );
};

export default function VideoGallery({ videos }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  px-[5%] md:px-[10%]">
      {videos &&
        videos?.data?.map((video, index) => (
          <YouTubePlayer
            key={index}
            url={video.videolink}
            title={video.title}
            description={video.description}
          />
        ))}
    </div>
  );
}
