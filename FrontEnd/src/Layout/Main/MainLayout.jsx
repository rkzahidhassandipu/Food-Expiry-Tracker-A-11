import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';
import Loading from '../../Components/Loading/Loading';

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="pt-20 min-h-[80vh]">
        {loading ? (
          <Loading />
        ) : (
          <Outlet />
        )}
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default MainLayout;
