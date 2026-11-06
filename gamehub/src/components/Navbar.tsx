import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/use-auth";
import { AlertTriangleIcon } from "lucide-react";

interface NavLink {
  id: number;
  title: string;
  path: string;
}

const NavItem = ({ link }: { link: NavLink }) => {
  return (
    <Link
      to={link.path}
      className="font-semibold hover:bg-gray-200 px-4 py-2 rounded-2xl"
    >
      {link.title}
    </Link>
  );
};

const Navbar = () => {
  const navLinks: NavLink[] = [
    {
      id: 1,
      title: "Home",
      path: "/",
    },
    {
      id: 2,
      title: "Documentation",
      path: "/docs/overview",
    },
    {
      id: 3,
      title: "Games",
      path: "/games",
    },
  ];
  const navigate = useNavigate();
  const { isLoading, isSuccess, isSuperUser,isError,error } = useAuth();

  return (
    <div className="w-full h-18 fixed top-0 flex items-center z-50">
      <div className="px-4 flex-4">
        <h1 className="font-bold text-xl">GameHub</h1>
      </div>
      <div className="flex flex-4 gap-x-1">
            {navLinks.map((link) => (
            <NavItem key={link.id} link={link} />
            ))}
        </div>
        {isLoading ? (
            <div className="w-32 h-10 m-5 rounded bg-gray-300 animate-pulse" />
        ) :isError?(isError&&
        <div className="flex items-center justify-center gap-4 border shadow-md rounded bg-red-50 px-4 py-2 mr-4">
            <AlertTriangleIcon className="text-red-500"/>
            <p className="font-semibold">{error?.message}</p>
        </div>): isSuccess ? (
            <div className="flex gap-2 flex-2 pr-2">
            <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
            {isSuperUser && (
                <Button onClick={() => navigate("/admin/users")}>Admin</Button>
            )}
            <Button variant="outline" onClick={() => navigate("/logout")}>
                Logout
            </Button>
            </div>
        ) : (
            <div className="flex gap-2 flex-2">
            <Button onClick={() => navigate("/signup")}>Signup</Button>
            <Button variant="outline" onClick={() => navigate("/login")}>
                Login
            </Button>
            </div>
        )}
    </div>
  );
};

export default Navbar;
