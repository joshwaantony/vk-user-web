



import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
       <>


      <Header />
      {children}
      <Footer />
    </>
  );
}
