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
    <div className={`flex flex-col`}>
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
          <div
            className={`p-4 rounded-2xl max-w-xs md:max-w-md lg:max-w-xl ${
              message.role === "user" ? "bg-base-300" : ""
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      </div>
      {message.role === "user" ? (
        <div className="flex gap-3 m-2 justify-end mr-3">
          <FiCopy />
          <FiEdit />
        </div>
      ) : (
        <div className="flex gap-3 m-2 justify-start ml-3">
          <FiCopy />
          <FiThumbsUp />
          <FiThumbsDown />
          <FiVolume2 />
          <FiEdit3 />
          <FiUpload />
          <FaSync />
        </div>
      )}
    </div>
  );
}
