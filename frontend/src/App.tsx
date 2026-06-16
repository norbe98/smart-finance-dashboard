import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Display from "./pages/Display";
import Inventory from "./pages/Inventory";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import GuestOnly from "./components/GuestOnly";
import ProtectedUser from "./components/ProtectedUser";

export default function App() {

 
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-400 via-gray-300 to-gray-400">

      <Toaster richColors duration={2000} expand position="bottom-right"/>

      <Navbar />

      <main className="max-w-screen-2xl mx-auto p-4 md:p-12 animate-in fade-in duration-500">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<GuestOnly><SignUpPage /></GuestOnly>} />
          <Route path="/signin" element={<GuestOnly><SignInPage /></GuestOnly>} />
          <Route path="/display" element={<ProtectedUser><Display /></ProtectedUser>} />
          <Route path="/inventory" element={<ProtectedUser><Inventory /></ProtectedUser>} />
        </Routes>
      </main>

    </div>
  )
}