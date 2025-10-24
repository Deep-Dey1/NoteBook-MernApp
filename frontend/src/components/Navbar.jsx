import { Link } from "react-router";
import { LogOut, PlusIcon, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
              NoteBook
            </h1>
          </Link>
          <div className="flex items-center gap-4">
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

                <Link to={"/create"} className="btn btn-primary">
                  <PlusIcon className="size-5" />
                  <span className="hidden md:inline">New Note</span>
                </Link>

                <button onClick={logout} className="btn btn-ghost btn-circle" title="Logout">
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
