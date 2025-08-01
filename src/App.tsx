import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatContainer from "./components/ChatContainer";
import Navbar from "./components/Navbar";

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

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "business" : "light"
    );
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNewMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate assistant response after a delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getRandomResponse(),
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const getRandomResponse = () => {
    const responses = [
      "Je suis une IA conçue pour vous aider. Comment puis-je vous assister aujourd'hui?",
      "C'est une question intéressante. Pouvez-vous me donner plus de détails?",
      "Je comprends votre demande. Voici ce que je peux vous dire à ce sujet...",
      "Malheureusement, je ne peux pas répondre à cette question pour le moment.",
      "Merci pour votre message. J'analyse votre demande et je reviens vers vous rapidement.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div
      className={`font-sans flex flex-col h-screen ${
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
        />
      </div>
    </div>
  );
}
