import { useState } from "react";
import {
  LayoutDashboard,
  Mail,
  PiggyBank,
  Users,
  Calendar,
  CloudSun,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Mail", icon: Mail, path: "/mail" },
  { label: "Finanzen", icon: PiggyBank, path: "/finanzen" },
  { label: "Verein", icon: Users, path: "/verein" },
  { label: "Kalender", icon: Calendar, path: "/kalender" },
  { label: "Wetter", icon: CloudSun, path: "/wetter" },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <aside
      className={`
        h-screen bg-neutral-900 shadow-lg flex flex-col justify-between py-4 transition-all duration-200 fixed left-0 top-0 z-30
        ${expanded ? "w-56" : "w-16"}
      `}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{ willChange: "width" }}
    >
      {/* Haupt-Icons */}
      <nav className="flex flex-col gap-2 mt-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition w-full group
                ${active ? "bg-neutral-800 text-neutral-100" : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"}
              `}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
            >
              <span className="flex items-center justify-center w-8 h-8">
                <Icon size={22} />
              </span>
              <span
                className={`
                  transition-all ml-1 text-base font-medium duration-200 select-none
                  ${expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}
                `}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Unten: Einstellungen + Logout */}
      <div className="flex flex-col gap-1 mb-1">
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100 transition w-full group"
        >
          <span className="flex items-center justify-center w-8 h-8">
            <Settings size={22} />
          </span>
          <span
            className={`
              transition-all ml-1 text-base font-medium duration-200 select-none
              ${expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}
            `}
          >
            Einstellungen
          </span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-neutral-400 hover:bg-neutral-800 hover:text-red-400 transition w-full group"
        >
          <span className="flex items-center justify-center w-8 h-8">
            <LogOut size={22} />
          </span>
          <span
            className={`
              transition-all ml-1 text-base font-medium duration-200 select-none
              ${expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}
            `}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
