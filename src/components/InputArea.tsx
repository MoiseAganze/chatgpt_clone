import { useState, useRef, useEffect } from "react";
import { FiPlus, FiFilter, FiMic, FiArrowUpCircle } from "react-icons/fi";

type InputAreaProps = {
  onSend: (content: string) => void;
};

export default function InputArea({ onSend }: InputAreaProps) {
  const [input, setInput] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // auto expand textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Max 200px
    }
  }, [input]);

  return (
    <div className="relative w-full px-4 py-4 max-w-2xl">
      <div className="flex items-end rounded-3xl bg-base-200 px-4 py-3 shadow-md relative">
        {/* Left icons */}
        <div className="flex items-center space-x-1 pr-3 absolute left-2 bottom-2">
          <button className="btn btn-ghost btn-circle text-xl">
            <FiPlus />
          </button>
          <button className="btn btn-ghost  text-sm rounded-lg flex">
            <FiFilter />
            Outils
          </button>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          className="flex-1 resize-none bg-transparent outline-none text-sm max-h-[200px] min-h-[100px] p-2"
          placeholder="Envoyez un message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Right icons */}
        <div className="flex items-center space-x-3 pl-3 absolute right-2 bottom-2">
          <button className="btn btn-ghost btn-circle text-xl">
            <FiMic />
          </button>
          <button
            className="btn btn-ghost btn-circle text-3xl"
            onClick={handleSubmit}
          >
            <FiArrowUpCircle />
          </button>
        </div>
      </div>
    </div>
  );
}
