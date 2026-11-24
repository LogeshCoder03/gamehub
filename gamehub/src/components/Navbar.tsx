import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/use-auth";
import { AlertTriangleIcon } from "lucide-react";
import { motion } from "motion/react";
import { Skeleton } from "./ui/skeleton";

interface NavLink {
  id: number;
  title: string;
  path: string;
}

const NavItem = ({ link }: { link: NavLink }) => {
  return (
    <Link to={link.path} className="font-medium text-muted-foreground text-sm">
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
  const { pathname } = useLocation();
  const { isLoading, isSuccess, isSuperUser, isError, error } = useAuth();
  return (
    <nav className="sticky top-0 flex items-center z-50 justify-between px-6 py-4">
      <div className="flex items-center gap-24">
        <h1 className="font-bold text-2xl">GameHub</h1>
        <div className="flex gap-8 items-center">
          {navLinks.map((link,index) => (
            <motion.div key={index}>
              <NavItem key={link.id} link={link} />
              {pathname == link.path && (
                <motion.div
                  className="h-0.5 bg-gray-400"
                  layoutId="underline"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="">
        {isLoading ? (
            <Skeleton className="w-30 h-10"/>
        ) : isError ? (
            <div className="inline-flex gap-2 items-center text-destructive">
              <AlertTriangleIcon size={22}/>
              <p className="font-medium text-md">{error?.message}</p>
            </div>
          )
        : isSuccess ? (
          <div className="flex gap-2">
            <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
            {isSuperUser && (
              <Button onClick={() => navigate("/admin/users")}>Admin</Button>
            )}
            <Button variant="secondary" onClick={() => navigate("/logout")}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button onClick={() => navigate("/signup")}>Signup</Button>
            <Button variant="secondary" onClick={() => navigate("/login")}>
              Login
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
