import { useInventory } from "../../context/InventoryContext";
import type { ProductCardProps } from "../../types/types";
import { Trash2, Plus, Minus, X, ArrowRightLeft, DollarSign, Package } from "lucide-react";

export default function ProductCard({ product, selected, changeSelected, quantity, changeQuantity, handleBuy, handleSell }: ProductCardProps) {
    const isSelected = selected === product.id;

    const { removeProduct } = useInventory()

    return (
        <div className={`flex flex-col p-5 rounded-2xl m-2 md:m-1 border transition-all duration-300 ${
            isSelected 
            ? 'border-indigo-500 shadow-xl ring-1 ring-indigo-500 bg-white scale-[1.02]' 
            : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm hover:shadow-md'}`}>
            
            <div className="flex justify-between items-start mb-4 gap-3">
                <h3 className="font-bold text-slate-800 text-lg leading-tight break-words min-w-0 flex-1">
                    {product.name}
                </h3>
                <button className="text-slate-300 hover:text-red-500 transition-colors p-1 flex-shrink-0"
                    onClick={() => removeProduct(product.id)}
                    title="Delete product">
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="space-y-3 mb-6 flex-1">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 flex items-center gap-1.5">
                        <Package size={14} /> Stock
                    </span>
                    <span className={`font-bold px-2 py-0.5 rounded-md 
                    ${product.stock < 5 ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-700'}`}>
                        {product.stock}
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 flex items-center gap-1.5">
                        <DollarSign size={14} /> Cost
                    </span>
                    <span className="text-slate-700 font-medium">${product.costPrice}</span>
                </div>

                <div className="flex justify-between items-center text-sm border-t border-slate-50 pt-2">
                    <span className="text-slate-500">Sell Price</span>
                    <span className="text-indigo-600 font-bold text-base">${product.sellPrice}</span>
                </div>
            </div>

            <div className="mt-auto pt-2">
                {isSelected ? (
                    <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-2">
                            <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-center font-semibold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                                type="number"
                                value={quantity || ''} 
                                placeholder="Quantity"
                                onChange={(e) => changeQuantity(Number(e.target.value))}
                                autoFocus/>
                            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors"
                                onClick={() => {
                                    changeSelected(null);
                                    changeQuantity(0);
                                }}>
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                            <button className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all active:scale-95 shadow-sm shadow-emerald-100"
                                onClick={() => handleBuy(product.id, quantity)}>
                                <Plus size={14} /> Buy
                            </button>
                            <button className="flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-2.5 rounded-xl transition-all active:scale-95 shadow-sm shadow-amber-100"
                                onClick={() => handleSell(product.id, quantity)}>
                                <Minus size={14} /> Sell
                            </button>
                        </div>
                    </div>
                ) : (
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 font-bold rounded-xl border border-slate-100 hover:border-indigo-100 transition-all text-sm group"
                        onClick={() => changeSelected(product.id)}>
                        <ArrowRightLeft size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                        Make Transaction
                    </button>
                )}
            </div>
        </div>
    );
}