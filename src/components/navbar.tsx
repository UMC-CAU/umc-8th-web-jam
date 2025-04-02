import { NavLink } from 'react-router-dom'; // NavLink는 isActive 값을 자동으로 넘겨준다

const Navbar = () => {
  return (
    <nav className="flex space-x-6 p-4 bg-gray-100 rounded-xl">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 font-semibold hover:text-blue-500')}>
        🎬 Home
      </NavLink>
      <NavLink
        to="/popular"
        className={({ isActive }) => (isActive ? 'text-blue-600 font-semisemibold' : 'text-gray-600 font-semibold hover:text-blue-500')}
      >
        ❤️ Popular
      </NavLink>
      <NavLink
        to="/upcoming"
        className={({ isActive }) => (isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 font-semibold hover:text-blue-500')}
      >
        📆 Upcoming
      </NavLink>
      <NavLink
        to="/top_rated"
        className={({ isActive }) => (isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 font-semibold hover:text-blue-500')}
      >
        💯 Top Rated
      </NavLink>
      <NavLink
        to="/now_playing"
        className={({ isActive }) => (isActive ? 'text-blue-600 font-semibold' : 'text-gray-600 font-semibold hover:text-blue-500')}
      >
        🍿 On Screen
      </NavLink>
    </nav>
  );
};

export default Navbar;
