import { Outlet, NavLink } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen relative mb-36">
      <main>
      <Outlet />
      </main>
      <nav className="fixed bottom-0 right-0 left-0 p-4 py-5 bg-white/20 backdrop-blur-xl border-t">
        <ul className="flex justify-between items-center font-semibold text-white">
          <li>
            <NavLink to="/" className='px-4 py-2 rounded-md bg-blue-500'>Data</NavLink>
          </li>
          <li>
            <NavLink to="/absen" className='px-4 py-2 rounded-md bg-red-500'>Absen</NavLink>
          </li>
          <li>
            <NavLink to="/hasil" className='px-4 py-2 rounded-md bg-indigo-500'>C.HASIL</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Layout;
