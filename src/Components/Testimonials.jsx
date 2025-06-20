import React from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Gita Nepal",
    role: "Happy Client",
    image: "https://www.logoai.com/uploads/resources/2023/06/19/fa7fe9edacbfae0e5ad69f061d0153b8.jpeg", // Replace with actual image path or use placeholder
    title: "Amazing services",
    review:
      "I was truly impressed by the quality and speed of service. The process was smooth, and I found exactly what I was looking for. Highly recommended!",
  },
  {
    name: "Ramesh Bhattarai",
    role: "Happy Client",
    image: "https://img.freepik.com/free-photo/stylish-young-handsome-traveler-man-standing-looking-camera_23-2148187261.jpg",
    title: "Everything simple",
    review:
      "From browsing to applying, everything was straightforward and user-friendly. Awasar makes job searching feel effortless.",
  },
  {
    name: "Bikash Shrestha",
    role: "Happy Client",
    image: "https://live.staticflickr.com/3835/15365653875_03597520c0_n.jpg",
    title: "Awesome, thank you!",
    review:
      "I landed a great job within days! The platform is intuitive, and the listings are up-to-date. Thank you for this wonderful experience.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#eaf6f6] py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Testimonials from Our Customers</h2>
        <p className="text-gray-600 mb-10 max-w-xl mx-auto">
          At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id...
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all relative"
            >
              {/* Stars */}
              <div className="flex justify-start mb-3">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
              </div>
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.title}</h3>
              {/* Review */}
              <p className="text-gray-600 text-sm mb-6">{t.review}</p>
              {/* User */}
              <div className="flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-medium text-gray-800">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
                <Quote className="ml-auto text-cyan-600 opacity-30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
