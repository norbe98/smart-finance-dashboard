import { SquareMenu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <nav className="p-2 bg-slate-400">

            <div className="flex justify-between">

                <Link to="/">Home</Link>

                <div className="hidden md:flex gap-3 px-3">
                    <Link to="/display">Display</Link>
                    <Link to="/inventory">Inventory</Link>
                </div>

                <button onClick={() => setIsOpen(prev => !prev)} className="flex md:hidden">
                    <SquareMenu />
                </button>

            </div>

                {isOpen && 
                <div className="md:hidden flex flex-col">
                    <Link to="/display" className="text-center">Display</Link>
                    <Link to="/inventory" className="text-center">Inventory</Link>
                </div>
                }

        </nav>
    )
}