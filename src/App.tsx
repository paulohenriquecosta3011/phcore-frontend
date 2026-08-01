import AppRoutes from "./routes/AppRoutes";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import PWAUpdate from "./components/PWAUpdate/PWAUpdate";

import PWAInstall from "./components/PWAInstall/PWAInstall";


export default function App() {

  return (

    <>

      <AppRoutes />
      <PWAInstall />
      <PWAUpdate />
     
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

    </>

  );

}