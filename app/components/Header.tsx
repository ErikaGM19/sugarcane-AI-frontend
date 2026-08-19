"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, User, LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStore";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  return (
    <header className="h-16 bg-sidebar/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Placeholder for Breadcrumbs or Page Title if needed */}
      </div>
      <div className="flex items-center gap-4 relative">
        <button
          className="relative p-2 rounded-full transition-colors"
          style={{ color: "var(--accent-mid)" }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--accent-light)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="pl-4 border-l border-border relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none"
          >
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-foreground truncate max-w-[150px]">
                {user?.email || "Usuario"}
              </span>
              <span className="text-xs" style={{ color: "var(--accent-mid)" }}>Admin</span>
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "var(--accent-light)", color: "var(--accent)" }}
            >
              <User size={18} />
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-card border border-border rounded-xl shadow-lg py-1 z-50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={16} />
                <span>Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
