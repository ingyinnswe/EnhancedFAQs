import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import './chat.css';

const Chat = () => {
  const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  const handleSendMessage = async (message) => {
    setValue("");
    setMessages([...messages, message]);
   
  };

  return (
    <div className=" mx-auto  pt-8 sm:px-6 lg:px-8">
      <Toaster />
      <div className="relative isolate overflow-hidden customWidth bg-gray-900 px-6 py-6 text-center shadow-2xl sm:rounded-3xl sm:px-16">
        <img
          className="mx-auto h-56 w-auto"
          src="/public/ric-logo.png"
          alt="RIC LOGO"
          // srcset=""
        />
        <div className="infoText ">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Enhanced FAQs
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm  text-gray-300">
            Here, you can check frequently asked questions and find answers to
            your queries. If you cannot find the questions you are looking for,
            please kindly contact us, <a href="mailto:rsuip@rsu.ac.th"><i class="fa fa-anchor" aria-hidden="true">rsuip@rsu.ac.th</i> </a>.
          </p>
        </div>
        <div className="chat-box mt-10 ">
          <div className="messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message py-2.5 text-black ${
                  index % 2 === 0 ? "text-right" : "text-left"
                }`}
              >
                <span className="inline-block bg-slate-100 p-2 rounded">
                  {message}
                </span>
              </div>
            ))}
          </div>
          <input
            className="block w-full rounded-md border-0 px-3.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset bg-slate-200 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
            type="text"
            defaultValue={""}
            rows={1}
            value={value}
            placeholder="Type your message..."
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(e.target.value);
                // e.target.value = "";
              }
            }}
          />
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Chat;
