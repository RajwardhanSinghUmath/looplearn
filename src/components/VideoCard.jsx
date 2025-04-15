// src/components/VideoCard.jsx
import { useState, useRef, useEffect } from 'react';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';

function VideoCard({ video, isVisible = false }) {
  const [likes, setLikes] = useState(video.likes);
  const [comments, setComments] = useState(video.comments);
  const videoRef = useRef(null);
  
  const handleLike = () => {
    setLikes(likes + 1);
  };
  
  const handleAddComment = (comment) => {
    setComments([...comments, comment]);
  };
  
  useEffect(() => {
    if (isVisible) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isVisible]);

  return (
    <div className="snap-item bg-black relative">
      <video 
        ref={videoRef}
        src={video.url}
        className="absolute h-full w-full object-contain bg-black"
        loop
        autoPlay={isVisible}
        muted
        playsInline
      />
      
      <div className="video-overlay flex flex-col">
        <h2 className="text-xl font-bold mb-2">{video.title}</h2>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-4 items-center">
            <LikeButton likes={likes} onLike={handleLike} />
          </div>
        </div>
        
        <CommentSection 
          comments={comments} 
          onAddComment={handleAddComment} 
        />
      </div>
    </div>
  );
}

export default VideoCard;