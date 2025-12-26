import React from "react";

const Features = () => {
  const features = [
    {
      title: "Markdown Support",
      desc: "Write cleanly and efficiently with full markdown integration.",
      icon: "📝",
    },
    {
      title: "Global Audience",
      desc: "Connect with readers from over 100+ countries instantly.",
      icon: "🌍",
    },
    {
      title: "Analytics",
      desc: "Track views, likes, and engagement on your personal dashboard.",
      icon: "Ahh",
    }, // Placeholder icon
  ];

  return (
    <section className="bg-linear-to-b from-black to-gray-900 py-24 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-16">
          Why Write With Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-gray-950 border border-gray-800 hover:bg-gray-900 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-4xl mb-4 bg-gray-800 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
