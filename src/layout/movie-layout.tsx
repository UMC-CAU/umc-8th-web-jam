// src/layout/movie-layout.tsx
import { Outlet } from 'react-router-dom';

export default function MovieLayout() {
  return (
    <div className="p-6">
      <Outlet />
    </div>
  );
}
