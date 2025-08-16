import { FaSync } from "react-icons/fa";
import {
  FiCopy,
  FiEdit,
  FiThumbsUp,
  FiThumbsDown,
  FiVolume2,
  FiEdit3,
  FiUpload,
} from "react-icons/fi";

// Imports nécessaires pour le Markdown et la coloration syntaxique
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Pour supporter les tableaux, etc. (GitHub Flavored Markdown)
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // Choisissez le thème que vous préférez

type MessageProps = {
  message: {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
  };
};

export default function Message({ message }: MessageProps) {
  return (
    <div className={`flex flex-col py-2`}>
      <div
        className={`flex ${
          message.role === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`flex items-start gap-3 max-w-full ${
            message.role === "user" ? "flex-row-reverse" : ""
          }`}
        >
          {/* Le conteneur du message avec les styles pour le Markdown */}
          <div
            className={`p-4 rounded-2xl max-w-xs md:max-w-md lg:max-w-2xl ${
              message.role === "user" ? "bg-base-300" : "bg-base-200" // Légère différence de fond pour l'assistant
            }`}
          >
            {/* On utilise ReactMarkdown ici */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({
                    node,
                    inline,
                    className,
                    children,
                    ...props
                  }: {
                    node?: any;
                    inline?: boolean;
                    className?: string;
                    children?: React.ReactNode;
                    [key: string]: any;
                  }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>

      {/* Les icônes d'action restent les mêmes */}
      {message.role === "user" ? (
        <div className="flex gap-3 m-2 justify-end mr-3">
          <FiCopy className="cursor-pointer hover:text-primary" />
          <FiEdit className="cursor-pointer hover:text-primary" />
        </div>
      ) : (
        <div className="flex gap-3 m-2 justify-start ml-3">
          <FiCopy className="cursor-pointer hover:text-primary" />
          <FiThumbsUp className="cursor-pointer hover:text-success" />
          <FiThumbsDown className="cursor-pointer hover:text-error" />
          <FiVolume2 className="cursor-pointer hover:text-primary" />
          <FiEdit3 className="cursor-pointer hover:text-primary" />
          <FiUpload className="cursor-pointer hover:text-primary" />
          <FaSync className="cursor-pointer hover:text-primary" />
        </div>
      )}
    </div>
  );
}
