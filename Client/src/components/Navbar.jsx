import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 flex justify-between py-5 px-3 h-[70px] items-center">
      {user ? (
        <>
          <Link to="/tasks">Welcome {user.username}</Link>
        </>
      ) : (
        <>
          <Link to="/">
            <h1>Welcome</h1>
          </Link>
        </>
      )}
      <ul className="flex gap-x-3">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/add-task">Add task</Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
                className="bg-red-500 w-fit px-3 py-1 rounded-md self-center"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
