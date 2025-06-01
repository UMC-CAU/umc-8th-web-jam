import { Outlet } from 'react-router-dom';

const MovieLayout = () => {
  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default MovieLayout;