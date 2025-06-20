import React from "react";
import { Briefcase, ShoppingBag, Hammer, Plane, School, Banknote, Truck, Leaf } from "lucide-react"; // You can customize icons

const categories = [
  { name: "Agriculture", jobs: 1254, icon: <Leaf className="h-8 w-8 text-green-500" /> },
  { name: "Metal Production", jobs: 816, icon: <Hammer className="h-8 w-8 text-gray-600" /> },
  { name: "Commerce", jobs: 2082, icon: <ShoppingBag className="h-8 w-8 text-blue-500" /> },
  { name: "Construction", jobs: 1520, icon: <Briefcase className="h-8 w-8 text-yellow-600" /> },
  { name: "Hotels & Tourism", jobs: 1022, icon: <Plane className="h-8 w-8 text-purple-500" /> },
  { name: "Education", jobs: 1496, icon: <School className="h-8 w-8 text-indigo-500" /> },
  { name: "Financial Services", jobs: 1529, icon: <Banknote className="h-8 w-8 text-teal-500" /> },
  { name: "Transport", jobs: 1244, icon: <Truck className="h-8 w-8 text-red-500" /> },
];

const Category = () => {
  return (
    <section className="bg-[#eaf6f6] py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Browse by Category</h2>
        <p className="text-gray-600 mb-10 max-w-xl mx-auto">
          At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id scel...
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-center mb-4">{cat.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
              <p className="mt-2 text-sm text-cyan-600 font-medium">
                {cat.jobs.toLocaleString()} jobs
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
