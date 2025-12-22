import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost'; // Import the Modal component

const Home = () => {
    // 1. Get posts from Context
    // (Assuming your context returns { state: { posts: [] }, dispatch })
    const { state } = useBlog(); 
    
    // 2. State to handle the visibility of CreatePost Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 p-8 relative">
            
            {/* Header Section */}
            <div className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-800">My Blog</h1>
                
                {/* Button to Open Modal */}
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition shadow-lg flex items-center gap-2"
                >
                    <span>+</span> Create Post
                </button>
            </div>

            {/* Empty State Check */}
            {state.posts.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                    <p className="text-xl">No posts yet. Be the first to write something!</p>
                </div>
            ) : (
                /* Blog Grid Section */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {state.posts.map((post) => (
                        <div 
                            key={post.id} 
                            onClick={() => navigate(`/post/${post.id}`)} // Navigate to details page
                            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300 hover:shadow-xl"
                        >
                            {/* Image Section */}
                            <div className="h-48 w-full bg-gray-200 overflow-hidden">
                                <img 
                                    src={post.image} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Text Content Section */}
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-3">
                                    {post.content}
                                </p>
                                <div className="mt-4 text-blue-500 text-sm font-semibold">
                                    Read more →
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* The Modal Component - It sits here but is hidden unless isOpen=true */}
            <CreatePost 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
};

export default Home;