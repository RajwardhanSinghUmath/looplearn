import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const dummyVideos = [
  {
    id: 1,
    title: "Coding Short #1",
    youtubeId: "IFxPnQ4GDGE",
    likes: 23,
    comments: ["Wow!", "Cool trick."],
    author: "devslops",
    description: "Coding Short #programming #comedy #coding"
  },
  {
    id: 2,
    title: "Coding Short #2",
    youtubeId: "qn8tEMC04rQ",
    likes: 10,
    comments: ["Interesting", "Good one"],
    author: "codingknowledge",
    description: "Coding Short #python #programming #coding"
  },
  {
    id: 3,
    title: "Coding Short #3",
    youtubeId: "a0me2X_Mi0M",
    likes: 42,
    comments: ["Mind blown!", "This explained everything"],
    author: "RajGupta",
    description: "Coding Short #python #programming #coding"
  },
  {
    id: 4,
    title: "Coding Short #4",
    youtubeId: "abaDp4WQgwI",
    likes: 35,
    comments: ["Great content!", "Thanks for sharing"],
    author: "devslops",
    description: "Coding Short #programming #comedy #coding"
  },
  {
    id: 5,
    title: "Coding Short #5",
    youtubeId: "TZt6thN7AU8",
    likes: 28,
    comments: ["Very helpful!", "Keep it up"],
    author: "codingknowledge",
    description: "Coding Short #python #programming #coding"
  },
  {
    id: 6,
    title: "Coding Short #6",
    youtubeId: "4gYZLNcSpQw",
    likes: 31,
    comments: ["Awesome!", "Learned something new"],
    author: "RajGupta",
    description: "Coding Short #python #programming #coding"
  },
  {
    id: 7,
    title: "Coding Short #7",
    youtubeId: "St9pE2bv0zQ",
    likes: 45,
    comments: ["Brilliant!", "Short and sweet"],
    author: "devslops",
    description: "Coding Short #programming #comedy #coding"
  },
  {
    id: 8,
    title: "Coding Short #8",
    youtubeId: "VWVqeFhvAH8",
    likes: 19,
    comments: ["Nice one!", "Good explanation"],
    author: "codingknowledge",
    description: "Coding Short #python #programming #coding"
  },
  {
    id: 9,
    title: "Coding Short #9",
    youtubeId: "6q2MBLkB2pI",
    likes: 37,
    comments: ["Perfect!", "Very clear"],
    author: "RajGupta",
    description: "Coding Short #python #programming #coding"
  },
  {
    id: 10,
    title: "Coding Short #10",
    youtubeId: "Mf9GCn_LsUI",
    likes: 29,
    comments: ["Great job!", "Keep creating"],
    author: "devslops",
    description: "Coding Short #programming #comedy #coding"
  },
  {
    id: 11,
    title: "Coding Short #11",
    youtubeId: "RE-zjvoONr4",
    likes: 33,
    comments: ["Amazing!", "Very informative"],
    author: "codingknowledge",
    description: "Coding Short #python #programming #coding"
  },
  {
    id: 12,
    title: "Coding Short #12",
    youtubeId: "LzeIwk26nNU",
    likes: 41,
    comments: ["Excellent!", "Well explained"],
    author: "RajGupta",
    description: "Coding Short #python #programming #coding"
  },
  {
    id: 13,
    title: "Coding Short #13",
    youtubeId: "u94HY6hhXls",
    likes: 26,
    comments: ["Superb!", "Very useful"],
    author: "devslops",
    description: "Coding Short #programming #comedy #coding"
  },
  {
    id: 14,
    title: "Coding Short #14",
    youtubeId: "nh2MNbyo3V4",
    likes: 38,
    comments: ["Fantastic!", "Great content"],
    author: "codingknowledge",
    description: "Coding Short #python #programming #coding"
  }
];



export default function Feed() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Fix: Use a useRef for initialRandomIndex to ensure it doesn't change on re-renders
  const initialRandomIndex = useRef(Math.floor(Math.random() * dummyVideos.length));
  
  const [videos, setVideos] = useState(() => {
    // Load comments from localStorage
    const savedComments = JSON.parse(localStorage.getItem('videoComments') || '{}');
    return dummyVideos.map(video => ({
      ...video,
      comments: savedComments[video.id] || video.comments
    }));
  });
  const [activeTab, setActiveTab] = useState("forYou");
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [likedVideos, setLikedVideos] = useState(() => 
    JSON.parse(localStorage.getItem('likedVideos') || '{}')
  );
  const [followedUsers, setFollowedUsers] = useState(() => 
    JSON.parse(localStorage.getItem('followedUsers') || '{}')
  );
  const [showComments, setShowComments] = useState({});
  const [showShareModal, setShowShareModal] = useState({});
  const [newComment, setNewComment] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef([]);
  const iframeRefs = useRef([]);
  const commentInputRef = useRef(null);
  const feedRef = useRef(null);
  const commentsContainerRefs = useRef({});
  const [isLoading, setIsLoading] = useState(false);

  // Set random video index on mount
  useEffect(() => {
    if (location.state?.initialVideoIndex === undefined) {
      setActiveVideoIndex(Math.floor(Math.random() * dummyVideos.length));
    }
  }, []);

  // Save comments to localStorage
  const saveComments = (videoId, comments) => {
    const savedComments = JSON.parse(localStorage.getItem('videoComments') || '{}');
    savedComments[videoId] = comments;
    localStorage.setItem('videoComments', JSON.stringify(savedComments));
  };

  // Save liked videos to localStorage
  const saveLikedVideos = (likedVideos) => {
    localStorage.setItem('likedVideos', JSON.stringify(likedVideos));
  };

  // Save followed users to localStorage
  const saveFollowedUsers = (followedUsers) => {
    localStorage.setItem('followedUsers', JSON.stringify(followedUsers));
  };

  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
    iframeRefs.current = iframeRefs.current.slice(0, videos.length);
  }, [videos]);

  // Handle intersection observer to manage which video is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = videoRefs.current.findIndex(ref => ref === entry.target);
          if (entry.isIntersecting) {
            setActiveVideoIndex(index);
            // Pause all videos
            iframeRefs.current.forEach((iframe, i) => {
              if (iframe && i !== index) {
                iframe.contentWindow.postMessage(JSON.stringify({
                  event: 'command',
                  func: 'pauseVideo',
                  args: []
                }), '*');
              }
            });
            // Play the visible video
            if (iframeRefs.current[index]) {
              iframeRefs.current[index].contentWindow.postMessage(JSON.stringify({
                event: 'command',
                func: 'playVideo',
                args: []
              }), '*');
            }
          }
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach(container => {
      if (container) observer.observe(container);
    });

    return () => {
      videoRefs.current.forEach(container => {
        if (container) observer.unobserve(container);
      });
    };
  }, [videos]);

  // Handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (feedRef.current && !isLoading) {
        const { scrollTop, scrollHeight, clientHeight } = feedRef.current;
        if (scrollHeight - scrollTop <= clientHeight + 100) {
          setIsLoading(true);
          // Add more videos
          setVideos(prev => {
            const newVideos = [...prev, ...videos.map(video => ({
              ...video,
              id: prev.length + video.id,
              comments: JSON.parse(localStorage.getItem('videoComments') || '{}')[prev.length + video.id] || video.comments
            }))];
            setIsLoading(false);
            return newVideos;
          });
        }
      }
    };

    if (feedRef.current) {
      feedRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (feedRef.current) {
        feedRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLoading]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    iframeRefs.current.forEach(iframe => {
      if (iframe) {
        iframe.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: isMuted ? 'unMute' : 'mute',
          args: []
        }), '*');
      }
    });
  };

  const handleAddComment = (videoId) => {
    if (newComment.trim()) {
      const updatedVideos = videos.map(video => {
        if (video.id === videoId) {
          const updatedComments = [...video.comments, newComment];
          saveComments(videoId, updatedComments);
          return { ...video, comments: updatedComments };
        }
        return video;
      });
      setVideos(updatedVideos);
      setNewComment("");
      
      // Auto-scroll to bottom of comments
      const commentsContainer = commentsContainerRefs.current[videoId];
      if (commentsContainer) {
        setTimeout(() => {
          commentsContainer.scrollTop = commentsContainer.scrollHeight;
        }, 0);
      }
    }
  };

  const toggleLike = (videoId) => {
    setLikedVideos(prev => {
      const newLikedVideos = {
        ...prev,
        [videoId]: !prev[videoId]
      };
      saveLikedVideos(newLikedVideos);
      return newLikedVideos;
    });
  };

  const toggleComments = (videoId) => {
    setShowComments(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  const toggleFollow = (username) => {
    setFollowedUsers(prev => {
      const newFollowedUsers = {
        ...prev,
        [username]: !prev[username]
      };
      saveFollowedUsers(newFollowedUsers);
      return newFollowedUsers;
    });
  };

  const toggleShareModal = (videoId) => {
    setShowShareModal(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">
      {/* Video Feed */}
      <div 
        ref={feedRef}
        className="flex-1 overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::WebkitScrollbar': {
            display: 'none'
          }
        }}
      >
        {videos.map((video, index) => (
          <div 
            key={`${video.id}-${index}`}
            ref={el => videoRefs.current[index] = el}
            className="h-screen w-full snap-start flex items-center justify-center bg-black relative"
          >
            {/* YouTube Shorts Container */}
            <div className="w-full h-full max-w-[56.25vh] mx-auto relative">
              <div className="w-full h-full">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <iframe
                    ref={el => iframeRefs.current[index] = el}
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=${index === activeVideoIndex ? 1 : 0}&controls=0&showinfo=0&rel=0&loop=1&playlist=${video.youtubeId}&modestbranding=1&playsinline=1&mute=${isMuted ? 1 : 0}`}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                    frameBorder="0"
                  ></iframe>
                </div>
              </div>
              
              {/* Video Controls Overlay */}
              <div className="absolute inset-0 flex flex-col">
                {/* Top Navigation Bar */}
                <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
                  <div className="flex items-center space-x-4">
                    {isLoggedIn && (
                      <button 
                        onClick={() => navigate("/profile")}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-6 w-6 text-white"
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={toggleMute}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-6 w-6 ${isMuted ? 'text-white' : 'text-purple-400'}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        {isMuted ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Like, Comment, Share Buttons */}
                <div className="absolute bottom-24 right-4 flex flex-col items-center space-y-6">
                  <button 
                    onClick={() => toggleLike(video.id)}
                    className="group"
                  >
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${likedVideos[video.id] ? 'bg-red-500/20' : 'bg-black/40'} hover:bg-black/60 transition-colors`}>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-6 w-6 ${likedVideos[video.id] ? 'text-red-500' : 'text-white group-hover:text-red-500'}`}
                        fill={likedVideos[video.id] ? "currentColor" : "none"}
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <span className="block text-center text-xs mt-1">{video.likes}</span>
                  </button>
                  
                  <button 
                    className="group"
                    onClick={() => toggleComments(video.id)}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${showComments[video.id] ? 'bg-blue-500/20' : 'bg-black/40'} hover:bg-black/60 transition-colors`}>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-6 w-6 ${showComments[video.id] ? 'text-blue-400' : 'text-white group-hover:text-blue-400'}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <span className="block text-center text-xs mt-1">{video.comments.length}</span>
                  </button>
                  
                  <button 
                    className="group"
                    onClick={() => toggleShareModal(video.id)}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${showShareModal[video.id] ? 'bg-green-500/20' : 'bg-black/40'} hover:bg-black/60 transition-colors`}>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-6 w-6 ${showShareModal[video.id] ? 'text-green-400' : 'text-white group-hover:text-green-400'}`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </div>
                    <span className="block text-center text-xs mt-1">Share</span>
                  </button>
                </div>
                
                {/* Video Info Overlay */}
                <div className="mt-auto p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-3">
                      {video.author.charAt(0)}
                    </div>
                    <span className="font-semibold">@{video.author}</span>
                    <button 
                      className={`ml-3 px-3 py-1 text-xs rounded-full transition-all ${
                        followedUsers[video.author] 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-transparent border border-white hover:bg-white hover:text-black'
                      }`}
                      onClick={() => toggleFollow(video.author)}
                    >
                      {followedUsers[video.author] ? 'Following' : 'Follow'}
                    </button>
                  </div>
                  <h3 className="font-medium mb-1">{video.title}</h3>
                  <p className="text-sm text-gray-300 mb-3">{video.description}</p>
                </div>
              </div>
              
              {/* Share Modal */}
              {showShareModal[video.id] && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
                  <div className="bg-gray-800 rounded-xl w-4/5 max-w-md p-5">
                    <h3 className="text-lg font-bold mb-4">Share this video</h3>
                    <div className="flex items-center bg-gray-700 rounded-lg p-2 mb-4">
                      <span className="text-gray-300 text-sm truncate flex-1">
                        {`https://www.youtube.com/shorts/${video.youtubeId}`}
                      </span>
                      <button 
                        onClick={() => copyShareLink(video.id, video.youtubeId)}
                        className="ml-2 px-3 py-1 bg-purple-600 rounded-md text-xs font-medium"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="flex justify-end">
                      <button 
                        onClick={() => toggleShareModal(video.id)}
                        className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Comments Section */}
              {showComments[video.id] && (
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/90 p-4 rounded-t-xl z-10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-bold">Comments ({video.comments.length})</h3>
                    <button 
                      onClick={() => toggleComments(video.id)}
                      className="text-white p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  <div 
                    ref={el => commentsContainerRefs.current[video.id] = el}
                    className="overflow-y-auto h-[calc(100%-100px)] mb-4 scrollbar-hide"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      '&::-webkit-scrollbar': {
                        display: 'none'
                      }
                    }}
                  >
                    {video.comments.length > 0 ? (
                      video.comments.map((comment, i) => (
                        <div key={i} className="text-white mb-3 bg-gray-800 rounded-lg p-3">
                          <div className="flex items-center mb-2">
                            <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs mr-2">
                              U
                            </div>
                            <span className="text-xs text-gray-400">User{i + 1}</span>
                          </div>
                          <p className="text-sm">{comment}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-6">
                        No comments yet. Be the first to comment!
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      ref={commentInputRef}
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full bg-gray-800 text-white p-3 rounded-l-full focus:outline-none focus:ring-1 focus:ring-purple-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddComment(video.id);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleAddComment(video.id)}
                      className="bg-purple-600 text-white px-4 py-3 rounded-r-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}