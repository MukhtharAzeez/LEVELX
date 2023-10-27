/* eslint-disable react/prop-types */
import Header from "../components/Header";
import Footer from '../components/Footer';
import{ useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

const Layout = ({ children }) => {

  const { loading, error } = useContext(LoadingContext)

  return (
    <div className="relative min-h-[100vh]">
      <Header />
      <main className="pt-[7rem] p-[1rem]">{children}</main>
      <Footer />
      {loading && (
        <div className="flex justify-center items-center h-screen absolute bg-gray-400 bg-opacity-50 w-full top-0">
          <div className="animate-spin rounded-full h-16 w-16 border-blue-500 border-t-4"></div>
        </div>
      )}
      {error.length > 0 && (
        <div className="flex justify-center items-center absolute bg-red-400 px-4 py-2 rounded-md top-10 right-10 z-20">
          <div className="">{error}</div>
        </div>
      )}
    </div>
  );
};

export default Layout;
