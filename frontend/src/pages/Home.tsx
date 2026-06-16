import { PackagePlus, ShoppingCart, History, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


export default function Home() {

    return (
        <div className="max-w-4xl mx-auto pt-12">
            <header className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                    Welcome to <span className="text-indigo-600">Inventio</span>
                </h1>

                <p className="text-lg text-slate-600 max-w-lg mx-auto">
                    Manage your inventory, track transactions, and monitor your business performance in one place.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/inventory" className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <PackagePlus size={28} />
                        </div>

                        <ArrowRight className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Manage Inventory</h2>
                    <p className="text-slate-500">Add new products, update stock levels, and organize your warehouse.</p>
                </Link>

                <Link to="/inventory" className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <ShoppingCart size={28} />
                        </div>
                        <ArrowRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Sales & Transactions</h2>
                    <p className="text-slate-500">Record new sales, process purchases, and view recent activity.</p>
                </Link>

                <div className="md:col-span-2 p-6 bg-slate-900 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/10 rounded-xl">
                            <History size={24} className="text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Quick Tip</h3>
                            <p className="text-slate-400 text-sm">Check the Display page to see your real-time profit margins.</p>
                        </div>
                    </div>
                    <Link to="/display" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-colors whitespace-nowrap">
                        View Analytics
                    </Link>
                </div>
            </div>
        </div>
    );
}