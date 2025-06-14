import React, { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
// import "./Code.css";
const CodeReview = () => {
  const [code, setcode] = useState(`
        function sum(a) {
          return a + b;
        }
        sum(4,5);
        `);

  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post("http://localhost:4000/ai/get-review", {
      code,
    });
    setReview(response.data);
  }

  return (
    <>
      <main className="min-h-screen w-full p-6 flex gap-4">
        <div className="relative h-full flex-1 rounded-lg bg-black">
          <div className="h-[800px] w-full m-0 rounded-lg bg-[#0c0c0c]">
            <Editor
              value={code}
              onValueChange={(code) => setcode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div
            className="absolute bottom-4 right-4 bg-indigo-100 text-black px-8 py-2 font-medium cursor-pointer select-none rounded-lg"
            onClick={reviewCode}
          >
            Review
          </div>
        </div>
        <div className="h-[800px]  flex-1 rounded-lg bg-[#343434] p-4 text-2xl overflow-x-hidden">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
};

export default CodeReview;
