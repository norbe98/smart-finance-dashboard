import { PackagePlus, ClipboardList } from "lucide-react";
import CreateForm from "../components/inventory/CreateForm";
import ManageSales from "../components/inventory/ManageSales";

export default function Inventory() {

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <ClipboardList className="text-indigo-600" size={28} />
                    Inventory Management
                </h1>
                <p className="text-slate-500">Add new products and manage your current stock levels.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <aside className="lg:col-span-1">
                    <div className="sticky top-24">
                        <div className="flex items-center gap-2 mb-4 px-1">
                            <PackagePlus size={20} className="text-indigo-500" />
                            <h2 className="font-semibold text-slate-700">Add New Product</h2>
                        </div>
                        <CreateForm />
                    </div>
                </aside>

                <main className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <ManageSales />
                    </div>
                </main>
            </div>
        </div>
    );
}