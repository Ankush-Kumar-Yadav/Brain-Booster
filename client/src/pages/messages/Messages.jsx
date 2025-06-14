import React, { useState, useRef, useEffect } from "react";

const Messages = () => {
  const user = { profileImg: "/man1.jpg", name: "User" }; // Static user
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const fetchAIResponse = async (userQuestion) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_API_KEY
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: userQuestion }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error generating answer:", error);
      return "Sorry, I couldn't generate a response.";
    }
  };

  const handleGenerateAnswer = async (e) => {
    e.preventDefault();
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: question, type: "user" },
      { text: "Typing...", type: "ai" },
    ]);
    setQuestion("");

    const aiResponse = await fetchAIResponse(question);
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[updatedMessages.length - 1].text = aiResponse;
      return updatedMessages;
    });
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-[93vh] bg-[url('/aiImg.jpg')] bg-cover bg-center flex flex-col">
      {/* Header */}
      {/*  <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900">
        <p className="font-bold text-white">Chat with AI</p>
      </div> */}

      {/* Messages List */}
      <div className="flex flex-col flex-grow p-4 overflow-auto space-y-4 bg-black bg-opacity-50 ">
        {messages.length === 0 && (
          <div className="text-center p-4 mx-auto font-bold text-gray-400">
            <img src="/robot.gif" alt="Start a conversation..." />
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.type === "user"
                ? "flex-row-reverse justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center  ${
                msg.type === "ai" ? "bg-green-600" : "bg-blue-600"
              }`}
            >
              {msg.type === "ai" ? (
                <img
                  src="/chat.png"
                  alt="AI"
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <img
                  src={user.profileImg}
                  alt="User"
                  className="object-cover w-full h-full rounded-full"
                />
              )}
            </div>
            {/* Message Bubble */}
            <div
              className={`flex ${
                msg.type === "ai" ? "ml-3 justify-start" : "mr-3 justify-end"
              } w-full`}
            >
              <div
                className={`p-3 rounded-lg ${
                  msg.type === "ai"
                    ? "bg-gray-700 border border-gray-600 text-white"
                    : "bg-blue-600 text-white"
                } 
          ${msg.type === "ai" ? "max-w-[60%]" : "max-w-[40%]"} `}
              >
                <pre
                  className={`whitespace-pre-wrap ${
                    msg.type === "ai" ? "" : "text-right"
                  }`}
                >
                  {msg.text}
                </pre>
              </div>
            </div>
            {/* <div className={`flex-grow ${msg.type === "ai" ? "ml-3" : "mr-3"}`}>
              <div
                className={`p-3 rounded-md ${
                  msg.type === "ai"
                    ? "bg-gray-700 border border-gray-600 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                <pre
                  className={`whitespace-pre-wrap 
                ${msg.type === "ai" ? "" : "text-right"} `}
                >
                  {msg.text}
                </pre>
              </div>
            </div> */}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-[#071524] p-4 border-t border-gray-700">
        <form
          onSubmit={handleGenerateAnswer}
          className="flex items-center justify-center "
        >
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            className="w-1/2 rounded-lg p-2 border border-gray-600 bg-gray-800 text-white"
            placeholder="Type your message…"
          />
          <button className="mt-2 ml-5 px-6 py-8 bg-[#1E90FF] text-white hover:bg-[#006ad4] rounded-lg transition duration-200">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
