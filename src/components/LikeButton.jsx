// src/components/LikeButton.jsx
import { useState } from 'react';

function LikeButton({ likes, onLike }) {
  const [hasLiked, setHasLiked] = useState(false);
  
  const handleClick = () => {
    if (!hasLiked) {
      setHasLiked(true);
      onLike();
    }
  };
  
  return (
    <button 
      onClick={handleClick}
      className={`flex items-center space-x-1 ${hasLiked ? 'text-pink-500' : 'text-white'} transition-colors duration-300`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill={hasLiked ? "currentColor" : "none"} 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
      <span>{likes}</span>
    </button>
  );
}

export default LikeButton;