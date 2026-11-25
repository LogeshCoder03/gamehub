import { Outlet, useLocation } from "react-router";
import { Toaster } from "@/components/ui/toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const { pathname } = useLocation();
  return (
    <div className="mx-auto relative">
      {!pathname.includes("docs") && !pathname.includes("admin") && <Navbar />}
      <main>
        <Outlet />
      </main>
      <Toaster />
      {!pathname.includes("docs") && !pathname.includes("admin") && <Footer />}
    </div>
  );
};

export default App;
