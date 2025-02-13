import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-[#05252C] border border-[#197686] rounded-[12px] md:rounded-[24px] text-[#B3B3B3] p-3 md:px-4 relative">
      <div className="container mx-auto flex justify-between items-center gap-x-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#24A0B5]">
          <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-4 font-jeju">
          {["Events", "My Tickets", "About", "Project"].map((item, index) => (
            <li key={index}>
              <Link
                to={item === "Events" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "")}`}
                className={`hover:text-white text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#24A0B5] px-3 py-2 rounded-md ${
                    item === "Events" ? "text-white" : "text-[#B3B3B3] hover:text-white"
                  }`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Ticket Button */}
        <button
          className="group font-jeju text-sm md:text-base text-[#0A0C11] p-3 md:px-4 bg-white border border-[#D5EA00] border-opacity-10 rounded-[12px] flex items-center justify-center gap-x-2 
          hover:bg-[#24A0B5] hover:border-[#D9D9D9] hover:text-[#D9D9D9] transition-all duration-300 focus:ring-2 focus:ring-[#24A0B5] cursor-pointer"
        >
          My Tickets
          <svg
            width="18"
            height="8"
            viewBox="0 0 18 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 transform group-hover:-rotate-45"
          >
            <path
              d="M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5V3.5ZM17.3536 4.35355C17.5488 4.15829 17.5488 3.84171 17.3536 3.64645L14.1716 0.464466C13.9763 0.269204 13.6597 0.269204 13.4645 0.464466C13.2692 0.659728 13.2692 0.976311 13.4645 1.17157L16.2929 4L13.4645 6.82843C13.2692 7.02369 13.2692 7.34027 13.4645 7.53553C13.6597 7.7308 13.9763 7.7308 14.1716 7.53553L17.3536 4.35355ZM1 4.5L17 4.5V3.5L1 3.5V4.5Z"
              fill="currentColor"
            />
          </svg>
        </button>

      </div>
    </nav>
  );
}
