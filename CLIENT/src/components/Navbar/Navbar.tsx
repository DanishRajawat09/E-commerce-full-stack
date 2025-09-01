import { NavLink } from "react-router";



function Navbar() {
  
    return (
        <header>
            <div className="max-w-[var(--containers-max)] md:m-auto px-4 py-6">
                <div className="flex justify-between items-center gap-10">
                    {/* Logo + Menu */}
                    <div className="flex justify-between items-center">
                        <img
                            className="w-[34px] h-[34px]  mr-4  md:hidden"
                            src="burger.png"
                            alt="menuBar"
                            // onClick={handleSideNav}
                             />
                        <h1 className="text-[32px] font-bold font-primary">shop.co</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex justify-center items-center gap-6">
                            <li className="font-secondary font-normal text-base">
                                <NavLink
                                    to={"/"}
                                    className={({ isActive }) => `text-black no-underline ${isActive ? "font-extrabold" : ""}`}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="font-secondary font-normal text-base">
                                <NavLink
                                    to={"/shop"}
                                    className={({ isActive }) => `text-black no-underline ${isActive ? "font-extrabold" : ""}`}
                                >
                                    Products
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    {/* Search */}
                    <div className="flex-1 hidden md:block">
                        <div className="flex gap-3 bg-searchBar py-3 px-4 rounded-[62px]">
                            <img src="Search.png" alt="searchIcon" />
                            <input
                                type="text"
                                placeholder="Search for Products..."
                                className="bg-transparent border-none flex-1 focus:outline-none placeholder:text-[#00000067] placeholder:font-normal" />
                        </div>
                    </div>

                    {/* Cart + Icons */}
                    <div className="flex items-center gap-[14px]">
                        <img
                            className="hidden md:inline-block"
                            src="search2.png"
                            alt="searchIcon" />
                        <NavLink to={"/cart"}>
                            <img src="cart.png" alt="CartIcon" />
                        </NavLink>
                        <img src="id.png" alt="IdIcon" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
