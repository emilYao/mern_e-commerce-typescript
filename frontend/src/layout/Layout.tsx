import Header from "@/components/layout/Header";
import Register from "@/components/forms/user/Register";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  

  return (
    <div className="relative  min-h-screen">
      <div className="hero-bg clip-path h-[10rem] 3xl:h-[25rem] md:h-[18rem]">
        <Header />
      <ToastContainer position="top-center"/>

      </div>
      <Register />

      {children}
    </div>
  );
}
