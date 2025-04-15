// src/components/CommentSection.jsx
import { useState } from 'react';

function CommentSection({ comments, onAddComment }) {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };
  
  return (
    <div className="mt-2">
      <button 
        onClick={() => setShowComments(!showComments)}
        className="text-sm text-gray-300"
      >
        {showComments ? 'Hide comments' : `Show comments (${comments.length})`}
      </button>
      
      {showComments && (
        <div className="mt-2">
          <div className="mb-2 max-h-24 overflow-y-auto">
            {comments.map((comment, index) => (
              <div key={index} className="mb-1 text-sm">
                <span className="font-bold text-gray-400">User{index + 1}:</span> {comment}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-grow bg-transparent border-b border-gray-600 focus:border-purple-400 outline-none text-sm py-1"
            />
            <button 
              type="submit"
              className="ml-2 px-2 py-1 bg-purple-500 text-white rounded text-sm"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CommentSection;