import React from "react";

const AboutUs = () => {
  return (
    <>
      <div className="max-w-full  dark:bg-black ">
        <div className="max-w-7xl p-6 py-16 mx-auto dark:bg-black">
          <section className="px-6 md:px-16 ">
            {/* Heading & Description */}
            <div className="text-center mb-12">
              <h2 className="text-5xl font-extrabold text-gray-900 dark:text-gray-300">
                About <span className="text-[#1E90FF]">Us</span>
              </h2>
              <p className="text-gray-700 mt-4 max-w-2xl mx-auto dark:text-gray-400">
                At Brain Boosters, we believe in revolutionizing education
                through AI-driven learning experiences. Our platform empowers
                both learners and educators with innovative tools to achieve
                their goals.
              </p>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Left: Image */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="/about.jpg"
                  alt="About Us"
                  className="w-full max-w-sm md:max-w-md dark:rounded-xl"
                />
              </div>

              <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 md:mt-0">
                {[
                  {
                    title: "Innovative Learning",
                    text: "We integrate AI to enhance the learning experience.",
                  },
                  {
                    title: "Smart Analytics",
                    text: "Track progress and optimize learning with real data.",
                  },
                  {
                    title: "Expert-Led Courses",
                    text: "Learn from industry experts and experienced educators.",
                  },
                  {
                    title: "Flexible Learning",
                    text: "Access courses anytime, anywhere, on any device.",
                  },
                  {
                    title: "Interactive AI",
                    text: "AI-powered assistants and code reviewers for a smarter approach.",
                  },
                  {
                    title: "Seamless Communication",
                    text: "Engage in live sessions with integrated video calls.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white shadow-md rounded-lg text-center hover:scale-105 duration-300 "
                  >
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
