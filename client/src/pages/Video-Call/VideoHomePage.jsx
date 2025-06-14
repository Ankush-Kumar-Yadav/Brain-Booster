import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoHomePage = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const submitHandler = () => {
    console.log("click");

    navigate(`/room/${input}`);
  };
  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              🚀 Join Live Classes in Real-Time
            </h1>
            <p className="text-gray-300 text-lg">
              Experience the classroom vibe from anywhere! Our Live Classes
              feature lets you connect with instructors and fellow learners in
              real-time. Ask questions, get instant feedback, and interact
              during live coding sessions, discussions, or workshops — all from
              the comfort of your device.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              {/* New Meeting */}
              <p className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition font-semibold w-full sm:w-auto">
              Start / Join Live Class
              </p>

              {/* Join Input */}
              <div className="flex flex-1 border border-gray-600 rounded-xl overflow-hidden bg-gray-900 shadow-sm flex-col md:flex-row">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  placeholder="Enter a code or link"
                  className="flex-1 px-4 py-3 text-white bg-transparent placeholder-gray-400 focus:outline-none"
                />
                <button
                  onClick={submitHandler}
                  className="bg-blue-600 hover:bg-blue-700 text-gray-200 px-6  py-2  transition font-medium"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* 👉 Right Section (Illustration) */}
          <div className="flex justify-center">
            <img
              src="/meet.png"
              alt="Video meeting"
              className="w-full max-w-md rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoHomePage;
