import CreateInventory from "../components/CreateInventory";
import ManageSales from "../components/ManageSales";

export default function Inventory() {


    return (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <CreateInventory />

            <ManageSales />

        </div>

    )
}