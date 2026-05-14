import CreateInventory from "../components/inventory/CreateForm";
import ManageSales from "../components/inventory/ManageTransaction";

export default function Inventory() {


    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 m-3">

            <CreateInventory />

            <div className="md:col-span-2 h-full">
            <ManageSales />
            </div>

        </div>

    )
}