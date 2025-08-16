import { useEffect, useRef } from "react";
import Message from "./Message";
import InputArea from "./InputArea";

type MessageType = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

type ChatContainerProps = {
  messages: MessageType[];
  onNewMessage: (content: string) => void;
  sidebarOpen: boolean;
  writing: boolean;
};

export default function ChatContainer({
  messages,
  onNewMessage,
  sidebarOpen,
  writing,
}: ChatContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`flex-1 flex flex-col justify-center ${
        sidebarOpen ? "lg:ml-64" : ""
      }`}
    >
      <div className="flex-1 overflow-y-auto p-4 pb-48">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              Comment puis-je vous aider aujourd'hui?
            </h2>
          </div>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto pt-20">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        {writing && (
          <div className="space-y-6 max-w-3xl mx-auto pt-20">
            <Message
              message={{
                content: "patientez...",
                id: Date.now().toString(),
                role: "assistant",
                timestamp: new Date(),
              }}
            />
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <div className="p-4  border-base-300 w-full flex justify-center relative">
        <div className="w-full max-w-2xl flex justify-center absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <InputArea onSend={onNewMessage} />
        </div>
      </div>
    </div>
  );
}
