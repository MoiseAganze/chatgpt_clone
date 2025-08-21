import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatContainer from "./components/ChatContainer";
import Navbar from "./components/Navbar";
import axios from "axios";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : true;
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [writing, setwriting] = useState(false);
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "business" : "light"
    );
  }, [darkMode]);
  useEffect(() => {
    // Ouvre le sidebar seulement si largeur >= 1024px (desktop)
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, []);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNewMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // // Simulate assistant response after a delay
    // setTimeout(() => {
    //   const assistantMessage: Message = {
    //     id: (Date.now() + 1).toString(),
    //     content: getRandomResponse(),
    //     role: "assistant",
    //     timestamp: new Date(),
    //   };
    //   setMessages((prev) => [...prev, assistantMessage]);
    // }, 1000);
    const message = encodeURIComponent(content);
    setwriting(true);
    await axios
      .get(`${import.meta.env.VITE_MY_AI_HOST}/gemini?message=${message}`)
      .then((res) => {
        const { message } = res.data;
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: message,
          role: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      })
      .catch((err) => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            content: `Erreur : ${err}`,
            role: "assistant",
            timestamp: new Date(),
          },
        ]);
      })
      .finally(() => setwriting(false));
  };

  // const getRandomResponse = () => {
  //   const responses = [
  //     "Je suis une IA conçue pour vous aider. Comment puis-je vous assister aujourd'hui?",
  //     "C'est une question intéressante. Pouvez-vous me donner plus de détails?",
  //     "Je comprends votre demande. Voici ce que je peux vous dire à ce sujet...",
  //     "Malheureusement, je ne peux pas répondre à cette question pour le moment.",
  //     "Merci pour votre message. J'analyse votre demande et je reviens vers vous rapidement.",
  //   ];
  //   return responses[Math.floor(Math.random() * responses.length)];
  // };

  return (
    <div
      className={`font-sans flex flex-col h-screen overflow-hidden ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      <div className="flex flex-1 overflow-hidden bg-base-100">
        <Sidebar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          new_message={() => setMessages([])}
        />

        <ChatContainer
          messages={messages}
          onNewMessage={handleNewMessage}
          sidebarOpen={sidebarOpen}
          writing={writing}
        />
      </div>
    </div>
  );
}
