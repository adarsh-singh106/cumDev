import React, { useEffect, useRef, useState } from 'react';
import { useBlog } from '../context/BlogContext';

// We pass isOpen and onClose props to control the modal visibility
const CreatePost = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); 

    const titleInputRef = useRef(null);
    const { dispatch } = useBlog();

    useEffect(() => {
        // Only focus if the modal is OPEN
        if(isOpen && titleInputRef.current){
            titleInputRef.current.focus();
        }
    }, [isOpen]); 

    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        const imageUrl = image ? URL.createObjectURL(image) : 'https://via.placeholder.com/300';

        const newPost = {
            id: Date.now(),
            title: title,
            image: imageUrl, 
            content: content,
        };

        dispatch({ type: 'ADD_POST', payload: newPost });

        // Reset form
        setTitle('');
        setContent('');
        setImage(null);

        // Close the modal instead of navigating
        onClose();
    };

    // If modal is not open, return null (don't render anything)
    if (!isOpen) return null;

    return (
        // Overlay (Dark background)
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            
            {/* Modal Content Box */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative animate-fade-in-up">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 font-bold"
                >
                    ✕
                </button>

                <div className='p-6 flex flex-col items-center gap-5'>
                    <h2 className='text-2xl font-bold mb-2'>Create New Post</h2>
                    
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
                        <input
                            ref={titleInputRef} 
                            type="text"
                            className='border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
                            placeholder='Post Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required 
                        />

                        <input 
                            type="file" 
                            className='border p-2 rounded text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100' 
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />

                        <textarea
                            value={content}
                            placeholder='Write your amazing content...'
                            className='border p-2 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400'
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />

                        <button type="submit" className='bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition'>
                            Publish Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;