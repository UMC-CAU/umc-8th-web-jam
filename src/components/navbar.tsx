import { NavLink } from 'react-router-dom'; // NavLink는 isActive 값을 자동으로 넘겨준다

const Navbar = () => {
  return (
    <nav className="flex space-x-6 p-4 bg-gray-100">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'text-blue-600' : 'text-gray-600'
        }
      >
        홈
      </NavLink>
      <NavLink
        to="/popular"
        className={({ isActive }) =>
          isActive ? 'text-blue-600' : 'text-gray-600'
        }
      >
        인기 영화
      </NavLink>
      <NavLink
        to="/upcoming"
        className={({ isActive }) =>
          isActive ? 'text-blue-600' : 'text-gray-600'
        }
      >
        개봉 예정 영화
      </NavLink>
      <NavLink
        to="/top_rated"
        className={({ isActive }) =>
          isActive ? 'text-blue-600' : 'text-gray-600'
        }
      >
        좋은 평점 영화
      </NavLink>
      <NavLink
        to="/now_playing"
        className={({ isActive }) =>
          isActive ? 'text-blue-600' : 'text-gray-600'
        }
      >
        현재 상영 영화
      </NavLink>
    </nav>
  );
};

export default Navbar;