import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar.tsx';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> 
    </>
  );
};
// Outlet은 children 요소가 들어갈 자리를 나타냄

export default RootLayout;
