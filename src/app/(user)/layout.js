// import Footer from "@/components/layout/Footer";
// import Header from "@/components/layout/Header";
// import { Toaster } from "react-hot-toast";

// export default function Layout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         >
//          <Toaster
//           position="top-center"
//           toastOptions={{
//             duration: 3000,
//           }}
//         />
//         <Header/>
//         {children}
//         <Footer/>
//       </body>
//     </html>
//   );
// }



import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Toaster
          position="top-center"
          toastOptions={{ duration: 3000 }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
