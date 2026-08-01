import AppRoutes from "./routes/AppRoutes";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import PWAUpdate from "./components/PWAUpdate/PWAUpdate";

export default function App() {

  return (

    <>

      <AppRoutes />
     <PWAUpdate />
     
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

    </>

  );

}