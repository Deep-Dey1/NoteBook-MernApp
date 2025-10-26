import { Link } from "react-router";
import { LogOut, PlusIcon, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show navbar at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="bg-base-300 backdrop-blur-lg bg-opacity-90 rounded-full shadow-2xl border border-base-content/20 px-6 py-3">
        <div className="flex items-center justify-between gap-8">
          <Link to="/dashboard">
            <h1 className="text-2xl font-bold text-primary font-mono tracking-tight">
              NoteBook
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            {user && (
              <>
                <div className="flex items-center gap-2">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <User className="size-6" />
                  )}
                  <span className="hidden md:inline">{user.name}</span>
                </div>

                <Link to={"/create"} className="btn btn-primary btn-sm rounded-full">
                  <PlusIcon className="size-4" />
                  <span className="hidden md:inline">New Note</span>
                </Link>

                <button onClick={logout} className="btn btn-ghost btn-circle btn-sm" title="Logout">
                  <LogOut className="size-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
