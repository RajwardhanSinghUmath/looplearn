import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Import the same video data from Feed.jsx
const videos = [
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

export default function Profile() {
  const { logout, user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('videos');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedUsername, setEditedUsername] = useState(user?.username || '');
  const [editedBio, setEditedBio] = useState(user?.bio || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [userVideos] = useState(videos);
  const [savedVideos] = useState(videos);
  
  // Set initial form values when user data changes
  useEffect(() => {
    if (user) {
      setEditedName(user.name || '');
      setEditedUsername(user.username || '');
      setEditedBio(user.bio || '');
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    
    // Create updated user object
    const updatedUser = {
      ...user,
      name: editedName,
      username: editedUsername,
      bio: editedBio
    };
    
    // Save to localStorage and update context
    localStorage.setItem('user', JSON.stringify(updatedUser));
    updateUser(updatedUser);
    
    // Clean up UI state
    setIsSaving(false);
    setIsEditing(false);
    setSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCancelEdit = () => {
    // Reset form fields to current user values
    setEditedName(user?.name || '');
    setEditedUsername(user?.username || '');
    setEditedBio(user?.bio || '');
    setIsEditing(false);
  };

  const handleVideoClick = (videoId) => {
    // Find the index of the clicked video
    const videoIndex = videos.findIndex(v => v.id === videoId);
    if (videoIndex !== -1) {
      // Navigate to feed with the video index
      navigate('/feed', { state: { initialVideoIndex: videoIndex } });
    }
  };

  const getRandomVideo = () => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            {/* Profile Picture */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl md:text-4xl font-bold mb-4 md:mb-0 md:mr-8 transition-transform hover:scale-105">
              {user?.name?.charAt(0) || 'U'}
            </div>
            
            {/* Profile Info */}
            <div className="flex-grow text-center md:text-left">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full bg-gray-800 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                    className="w-full bg-gray-800 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="Username"
                  />
                  <textarea
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                    className="w-full bg-gray-800 text-white p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    rows={3}
                    placeholder="Write something about yourself..."
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{user?.name || 'User'}</h1>
                  <p className="text-gray-400">@{user?.username || 'username'}</p>
                  <p className="text-sm text-gray-300 max-w-lg">{user?.bio || 'No bio yet'}</p>
                </div>
              )}
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6 my-4">
                <div className="flex items-center">
                  <span className="font-semibold">{user?.followers || 0}</span>
                  <span className="text-gray-400 ml-1">Followers</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold">{user?.following || 0}</span>
                  <span className="text-gray-400 ml-1">Following</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400">Joined {user?.joinedDate || 'Recently'}</span>
                </div>
              </div>
              
              <div className="flex justify-center md:justify-start gap-3">
                {isEditing ? (
                  <>
                    <button 
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        isSaving 
                          ? 'bg-gray-600 cursor-not-allowed' 
                          : 'bg-purple-600 hover:bg-purple-700'
                      }`}
                    >
                      {isSaving ? 'Saving...' : 'Save Profile'}
                    </button>
                    <button 
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-transparent border border-gray-600 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={toggleEditMode}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all bg-purple-600 hover:bg-purple-700"
                    >
                      Edit Profile
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="px-4 py-2 bg-transparent border border-gray-600 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
              
              {saveSuccess && (
                <div className="mt-4 text-green-400 text-sm animate-fade-in">
                  Profile updated successfully!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Tabs */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="border-b border-gray-800 mb-6">
          <div className="flex overflow-x-auto">
            {['videos', 'saved', 'stats'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? 'text-white border-b-2 border-purple-500' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === 'videos' && (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1">
              {userVideos.map(video => (
                <div 
                  key={video.id} 
                  onClick={() => handleVideoClick(video.id)}
                  className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
                >
                  <img 
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'saved' && (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1">
              {savedVideos.map(video => (
                <div 
                  key={video.id} 
                  onClick={() => handleVideoClick(video.id)}
                  className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
                >
                  <img 
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'stats' && (
            <div className="bg-gray-800 rounded-lg p-6 transform transition-all hover:scale-[1.02]">
              <h3 className="text-xl font-bold mb-6">Activity Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 rounded-lg p-4 transform transition-all hover:scale-105">
                  <p className="text-gray-400 text-sm mb-1">Total Views</p>
                  <p className="text-2xl font-bold">3,888</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 transform transition-all hover:scale-105">
                  <p className="text-gray-400 text-sm mb-1">Total Likes</p>
                  <p className="text-2xl font-bold">258</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 transform transition-all hover:scale-105">
                  <p className="text-gray-400 text-sm mb-1">Total Videos</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-center text-gray-400">More detailed analytics coming soon!</p>
              </div>
            </div>
          )}
        </div>

        {/* Random Video Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              const randomVideo = getRandomVideo();
              handleVideoClick(randomVideo.id);
            }}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
          >
            Watch Random Video
          </button>
        </div>
      </div>
    </div>
  );
}