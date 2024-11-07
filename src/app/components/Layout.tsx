import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Suspense } from "react";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="h-5/6 w-full">
        <Suspense fallback={"Carregando..."}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
