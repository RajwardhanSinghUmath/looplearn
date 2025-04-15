import { useState, useRef, useEffect } from "react";

const playlistVideos = [
  {
    id: 1,
    title: "Math Trick #1",
    url: "https://res.cloudinary.com/demo/video/upload/v1610033113/math-trick.mp4",
    author: "MathWizard",
    duration: "1:24",
    progress: 75
  },
  {
    id: 2,
    title: "Quick History Fact",
    url: "https://res.cloudinary.com/demo/video/upload/v1610033113/history-fact.mp4",
    author: "HistoryBuff",
    duration: "0:58",
    progress: 30
  },
  {
    id: 3,
    title: "Physics Explained",
    url: "https://res.cloudinary.com/demo/video/upload/v1610033113/math-trick.mp4",
    author: "ScienceGeek",
    duration: "2:15",
    progress: 0
  }
];

export default function Playlist() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentVideo]);

  const playNext = () => {
    setCurrentVideo((prev) => (prev + 1) % playlistVideos.length);
  };

  const playPrevious = () => {
    setCurrentVideo((prev) => (prev - 1 + playlistVideos.length) % playlistVideos.length);
  };

  const handleVideoEnd = () => {
    playNext();
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <h1 className="text-xl font-bold">My Learning Playlist</h1>
        <button className="px-3 py-1 bg-purple-600 rounded-full text-sm">Edit</button>
      </div>

      {/* Main content */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Current video section */}
        <div className="col-span-1 md:col-span-2 flex flex-col">
          <div className="relative w-full pt-[56.25%] bg-black">
            <video
              ref={videoRef}
              src={playlistVideos[currentVideo].url}
              className="absolute top-0 left-0 w-full h-full object-contain"
              onEnded={handleVideoEnd}
              controls={false}
              loop={false}
              autoPlay
            />

            {/* Video controls overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={playPrevious}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-black"
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </button>
                
                <button 
                  onClick={playNext}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-900">
            <h2 className="text-xl font-bold mb-1">{playlistVideos[currentVideo].title}</h2>
            <p className="text-gray-400">by {playlistVideos[currentVideo].author}</p>
          </div>
        </div>

        {/* Playlist queue */}
        <div className="bg-gray-900 border-l border-gray-800 overflow-y-auto">
          <h3 className="p-4 text-lg font-medium sticky top-0 bg-gray-900 border-b border-gray-800">Up Next</h3>
          <div className="divide-y divide-gray-800">
            {playlistVideos.map((video, index) => (
              <div 
                key={video.id}
                className={`p-4 flex items-center cursor-pointer hover:bg-gray-800 transition-colors ${
                  index === currentVideo ? "bg-gray-800" : ""
                }`}
                onClick={() => setCurrentVideo(index)}
              >
                <div className="relative flex-shrink-0 w-24 h-16 bg-gray-700 mr-3">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {index === currentVideo && isPlaying ? (
                      <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                    )}
                  </div>
                  {/* Progress bar */}
                  {video.progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                      <div 
                        className="h-full bg-purple-600" 
                        style={{ width: `${video.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium leading-tight">{video.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">{video.author} • {video.duration}</p>
                </div>
                {index === currentVideo && (
                  <div className="ml-2 w-2 h-2 rounded-full bg-purple-600"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 