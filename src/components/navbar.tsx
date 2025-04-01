// navbar.tsx
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex space-x-6 p-4 bg-gray-100">
            <Link to="/">홈</Link>
            <Link to="/movies">인기 영화</Link>
        </nav>
    );
};

export default Navbar;
