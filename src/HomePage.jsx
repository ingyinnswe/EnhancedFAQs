import { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./homepage.css";
import toast from "react-hot-toast";

export default function HomePage() {
  const messageContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");

  const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const handleSendMessage = async (message) => {
    try {
      if (!message) {
        toast.error("Please enter a message", {
          position: "top-right",
        });
      } else {
        const temp = [...messages, { message, sender: "user" }];
        setMessages(temp);

        // setMessages([...messages, message]);
        const response = await instance.post("/submit-question", {
          question: message,
        });
        console.log({ response });
        const tempArr = [
          ...messages,
          { message: response?.data?.msg, sender: "model" },
        ];
        setMessages(tempArr);
      }
    } catch (error) {
      console.error(error);
      console.error("Something went wrong");
    }
    setShowChat(true);
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleButtonClick = (buttonText) => {
    setSelectedButton(buttonText);
  };

  const handleFaqsClick = (buttonText) => {
    setShowChat(true);
    setSelectedButton(buttonText);
    setValue(buttonText);

    if (!String(value).trim()) {
      // Only set the input value if it's not already set
      setValue(buttonText);
    }
    if (String(value).trim() !== "") {
      setMessages([{ message: String(value).trim(), sender: "user" }]);
    }
  };
  return (
    <div className="">
      <div className="max-w-xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12  shadow-2xl rounded-3xl sm:px-16">
          {showChat ? null : (
            <div className={`infoText mx-auto `}>
              <img
                className=" h-56 w-auto mx-auto"
                src="/ric-logo.png"
                alt="RIC LOGO"
                srcSet=""
              />
              <h2 className=" max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Enhanced FAQs
              </h2>
              <p className="mt-6 max-w-xl text-sm  text-gray-300">
                Here, you can check frequently asked questions and find answers
                to your queries. If you cannot find the questions you are
                looking for, please kindly contact us,{" "}
                <a href="mailto:rsuip@rsu.ac.th">
                  <i className="fa fa-anchor" aria-hidden="true">
                    rsuip@rsu.ac.th
                  </i>{" "}
                </a>
                .
              </p>
            </div>
          )}

          <div id="faqs" className="py-4 flex flex-row">
            <button
              type="button"
              onClick={() => handleFaqsClick("admission requirements")}
              className="px-3 py-2 mx-1 text-xs font-medium text-center text-slate-100 bg-purple-600 rounded-lg hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Admission
            </button>
            <button
              type="button"
              onClick={() => handleFaqsClick("Academic Calendar")}
              className="px-3 py-2 mx-1 text-xs font-medium text-center text-slate-100 bg-purple-600 rounded-lg hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Academic Calendar
            </button>
            <button
              type="button"
              onClick={() => handleFaqsClick("Term Break")}
              className="px-3 py-2 mx-1 text-xs font-medium text-center text-slate-100 bg-purple-600 rounded-lg hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Term Break
            </button>
            <button
              type="button"
              onClick={() => handleFaqsClick("Songkran Holidays")}
              className="px-3 py-2 mx-1 text-xs font-medium text-center text-slate-100 bg-purple-600 rounded-lg hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Holidays
            </button>
          </div>
          <div
            ref={messageContainerRef}
            className={`messages px-4 overflow-y-scroll flex flex-col ${
              showChat ? "h-96" : ""
            }`}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message py-2 text-black ${
                  index % 2 === 0 ? "text-right" : "text-left "
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 text-sm rounded-lg  ${
                    index % 2 === 0 ? "bg-slate-100" : "bg-purple-200"
                  }`}
                >
                  {message.message}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-x-2">
            {/* <a
              href="/chat"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Chat here
            </a> */}
            <input
              className="block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset bg-slate-200 ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-purple-600 sm:text-sm "
              type="text"
              rows={1}
              value={selectedButton}
              placeholder="Type your quesitons or click the FAQs buttons"
              onChange={(e) => setSelectedButton(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && selectedButton.trim() !== "") {
                  handleSendMessage(selectedButton);
                  setSelectedButton("");
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (selectedButton.trim() !== "") {
                  handleSendMessage(selectedButton);
                  setSelectedButton("");
                }
              }}
              className="p-2 rounded-md  text-slate-100 hover:text-indigo-500 hover:bg-slate-100"
            >
              <svg
                className="w-6 h-6 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

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
}
