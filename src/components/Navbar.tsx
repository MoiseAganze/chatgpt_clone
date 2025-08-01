import { FiSun, FiMoon } from "react-icons/fi";

type NavbarProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  sidebarOpen: boolean;
};

const Navbar = ({
  darkMode,
  toggleDarkMode,
  toggleSidebar,
  sidebarOpen,
}: NavbarProps) => {
  return (
    <nav
      className={`navbar bg-base-100  border-base-300 absolute top-0  ${
        sidebarOpen ? "left-64 w-auto" : "w-full"
      } right-0 z-10 `}
    >
      <div className="navbar-start">
        {!sidebarOpen && (
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
        )}
      </div>
      <div className="navbar-center">
        <h1 className="text-xl font-semibold">ChatGPT</h1>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost" onClick={toggleDarkMode}>
          {darkMode ? (
            <FiSun className="text-xl" />
          ) : (
            <FiMoon className="text-xl" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
