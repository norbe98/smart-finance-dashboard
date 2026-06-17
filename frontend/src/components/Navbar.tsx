import { SquareMenu, LayoutDashboard, Package, Home, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const location = useLocation();

    const { user, logOut } = useAuth()

    function isActive(path: string) {
        return location.pathname === path
    }

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-12">
                <div className="flex justify-between items-center h-16">

                    <div className="md:flex items-center gap-1">
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-800">
                            <div className="bg-indigo-600 p-1.5 rounded-lg">
                                <Home size={20} className="text-white" />
                            </div>
                            <span>Inventio</span>
                        </Link>
                        <Link 
                            to="/display" 
                            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive('/display') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                            <LayoutDashboard size={18} />
                            <span className="font-medium">Display</span>
                        </Link>
                        <Link 
                            to="/inventory" 
                            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive('/inventory') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                            <Package size={18} />
                            <span className="font-medium">Inventory</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-1">
                        {user ? 
                        <>
                        <div
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors`}>
                            <span className="font-medium">{user.email}</span>
                        </div>

                        <div 
                            onClick={logOut}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer`}>
                            <span className="font-medium">Logout</span>
                        </div>
                        </>
                        : 
                        <>
                        <Link 
                            to="/signup" 
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive('/signup') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                            <span className="font-medium">Sign Up</span>
                        </Link>
                        <Link 
                            to="/signin" 
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive('/signin') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                            <span className="font-medium">Sign In</span>
                        </Link>
                        </>
                        }
                    </div>

                    <button 
                        onClick={() => setIsOpen(prev => !prev)} 
                        className="p-2 rounded-lg md:hidden text-slate-600 hover:bg-slate-100 transition-colors">
                        {isOpen ? <X size={24} /> : <SquareMenu size={24} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white p-4 space-y-2 animate-in slide-in-from-top duration-300">
                    {user ? 
                    <>
                    <div
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors`}>
                        <span className="font-medium">{user.email}</span>
                    </div>

                    <div 
                        onClick={logOut}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer`}>
                        <span className="font-medium">Logout</span>
                    </div>
                    </>
                    : 
                    <>
                    <Link 
                        to="/signup" 
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive('/signup') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                        <span className="font-medium">Sign Up</span>
                    </Link>
                    <Link 
                        to="/signin" 
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive('/signin') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                        <span className="font-medium">Sign In</span>
                    </Link>
                    </>
                    }
                    
                    <Link 
                        onClick={() => setIsOpen(false)}
                        to="/display" 
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700">
                        <LayoutDashboard size={20} />
                        Display
                    </Link>
                    <Link 
                        onClick={() => setIsOpen(false)}
                        to="/inventory" 
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700">
                        <Package size={20} />
                        Inventory
                    </Link>
                </div>
            )}
        </nav>
    );
}