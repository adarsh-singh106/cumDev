import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useBlog();

    // Find the specific post by ID
    // Note: URL params are strings, so we convert post.id to string or parse id to Int
    const post = state.posts.find((p) => p.id.toString() === id);

    if (!post) return <div>Post not found!</div>;

    return (
        <div className="max-w-3xl mx-auto p-8">
            <button onClick={() => navigate('/blog')} className="mb-4 text-blue-500">← Back</button>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <img src={post.image} alt={post.title} className="w-full h-96 object-cover rounded-lg mb-8 shadow-md"/>
            <div className="prose lg:prose-xl text-gray-800 whitespace-pre-wrap">
                {post.content}
            </div>
        </div>
    );
};

export default PostDetails;