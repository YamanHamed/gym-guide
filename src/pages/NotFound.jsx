import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button";

const NotFound = ({ role = "user" }) => {
  const location = useLocation();

  const dir =
    role === "admin" || location.state?.role === "admin" ? "/dashboard" : "/";
  return (
    <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-black text-[#0070FF] mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-zinc-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to={dir}>
          <Button type="filled" text="Go Back Home" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
