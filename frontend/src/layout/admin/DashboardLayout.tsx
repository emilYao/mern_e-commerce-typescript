import AddProduct from "@/components/pages/admin/AddProduct";
import Main from "./Main";
import SideBar from "./SideBar";
import { ToastContainer, toast } from "react-toastify";

type props = {
  children: React.ReactNode;
};
export default function DashboardLayout() {
  return (
    <div className="relative  min-h-screen grid md:grid-cols-12 ">
      <div className="md:col-span-2 hero-bg">
      <SideBar />

      </div>
      <div className="md:col-span-10 md:mx-[5rem] md:my-[2rem] ">
      <Main>
      <ToastContainer position="top-center" className="z-100" />

            <AddProduct/>
      </Main>
      </div>

    </div>
  );
}
