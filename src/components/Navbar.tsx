import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="flex justify-between">

            <Link to="/">Home</Link>

            <div className="flex gap-3">
                <Link to="/display">Display</Link>
                <Link to="/inventory">Inventory</Link>
            </div>

        </div>
    )
}