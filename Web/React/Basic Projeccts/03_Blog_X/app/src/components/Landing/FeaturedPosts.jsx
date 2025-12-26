import React from "react";

const posts = [
  {
    id: 1,
    category: "Technology",
    title: "The Rise of AI in Creative Writing",
    author: "Alex Morgan",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    category: "Lifestyle",
    title: "Minimalism: Finding Peace in Less",
    author: "Sarah Jenkins",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    category: "Development",
    title: "React Hooks: A Complete Guide",
    author: "David Chen",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
  },
];

const FeaturedPosts = () => {
  return (
    <section className="bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Trending on <span className="text-orange-500">Blog-X</span>
          </h2>
          <a
            href="/explore"
            className="text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-white"
          >
            View all
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-orange-400 text-xs font-bold uppercase tracking-wide">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-orange-400 transition-colors">
                  {post.title}
                </h3>
                <div className="flex justify-between items-center text-gray-500 text-sm">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
