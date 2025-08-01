import {
  FiSearch,
  FiSidebar,
  FiUser,
  FiTrendingUp,
  FiEdit,
  FiPlayCircle,
} from "react-icons/fi";
import { MdPhotoLibrary } from "react-icons/md";
import { TbGridDots } from "react-icons/tb";

export default function Sidebar({
  toggleSidebar,
  sidebarOpen,
  new_message,
}: {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
  new_message: () => void;
}) {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-base-200 border-r border-base-300 flex flex-col z-20 transition-all duration-300 ${
        sidebarOpen ? "w-64 min-w-64" : "w-0 min-w-0 "
      }overflow-hidden`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-2">
        <button className="btn btn-ghost btn-circle" onClick={toggleSidebar}>
          <img src="/chatgpt.png" alt="logo" className="w-6 h-6" />
        </button>
        <button className="btn btn-ghost" onClick={toggleSidebar}>
          <FiSidebar className="text-lg" />
        </button>
      </div>

      {/* Menu principal */}
      <div className="menu p-2 text-[14px] w-full">
        <li onClick={new_message}>
          <a>
            <FiEdit className="mr-0" />
            Nouveau chat
          </a>
        </li>
        <li>
          <a>
            <FiSearch className="mr-0" />
            Rechercher des chats
          </a>
        </li>
        <li>
          <a>
            <MdPhotoLibrary className="mr-0" />
            Bibliothèques
          </a>
        </li>
      </div>

      {/* Modules (comme Sora, GPT...) */}
      <div className="menu px-2 pt-4 text-[14px] border-t border-base-300 w-full">
        <li>
          <a>
            <FiPlayCircle className="mr-0" />
            Sora
          </a>
        </li>
        <li>
          <a>
            <TbGridDots className="mr-0" />
            GPT
          </a>
        </li>
        <li>
          <a>
            <FiTrendingUp className="mr-0" />
            Hot Mods
          </a>
        </li>
      </div>

      {/* Historique des chats */}

      <div className="flex-1 overflow-y-auto menu px-2 pt-4 text-[14px] border-t border-base-300 w-full">
        <li>
          <a className="opacity-50">Chats</a>
        </li>
        <li>
          <a className="active">Chat du 1 août</a>
        </li>
        <li>
          <a>Projet cognitif</a>
        </li>
        <li>
          <a>TekaSmart AI</a>
        </li>
        <li>
          <a>Analyse Data Quiz</a>
        </li>
      </div>

      {/* Profil utilisateur en bas */}
      <div className="p-4 border-t border-base-300">
        <button className="btn btn-ghost w-full justify-start">
          <FiUser className="mr-2" />
          Aganze Dev
        </button>
      </div>
    </div>
  );
}
