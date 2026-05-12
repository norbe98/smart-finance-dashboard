import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Display from "./pages/Display";
import Inventory from "./pages/Inventory";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";

export default function App() {

 
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-400 via-gray-300 to-gray-400">

      <Toaster richColors duration={2000} expand position="bottom-right"/>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/display" element={<Display />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>

    </div>
  )
}