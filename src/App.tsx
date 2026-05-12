import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Display from "./pages/Display";
import Inventory from "./pages/Inventory";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";

export default function App() {

 
  return (
    <div className="min-h-screen">
      
      <Toaster />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/display" element={<Display />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>

    </div>
  )
}