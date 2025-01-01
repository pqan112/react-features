import { Link } from "react-router-dom";
import { path } from "../constants/path.constant";

function NavBar() {
  return (
    <div className="flex justify-between">
      <Link to={path.home}>
        <h1> Chat app</h1>
      </Link>

      <span>Logged in as An Pham</span>

      <nav>
        <ul className="flex space-x-2">
          <li>
            <Link to={path.login}>Login</Link>
          </li>
          <li>
            <Link to={path.register}>Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
