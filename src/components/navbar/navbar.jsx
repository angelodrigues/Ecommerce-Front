import { Armchair, Check, Heart, Info, Menu, Search, ShoppingCart, User } from "lucide-react";
import { Link, NavLink, useNavigate, useLocation } from "react-router";
import { useAuth } from '../../authCheck/AuthContext';
import { useCart } from '../../service/CartContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
      logout();
      if (location.pathname === '/auth/user') {
        navigate('/auth/login');
      }
    };

    return (
        <div className="bg-[#302c2c]">
            {/* nabvar top  */}
            {/* <div className="navbar_top flex items-center justify-center bg-[#272343] h-[45px] w-full">

                <div className="lg:container flex justify-between items-center">

                    <p className="flex items-center gap-2 text-sm font-inter font-normal text-white capitalize"><Check /> Free on all orders over $50</p>

                    <div className="navbar_top_right flex items-center gap-6">
                        <select defaultValue="Server location" className="bg-none h-[30px] w-[70px] text-sm font-inter font-normal capitalize text-white ">
                            <option>eng</option>
                            <option>bangla</option>
                        </select>

                        <button><Link className="text-sm text-white font-inter font-normal capitalize">Faqs</Link></button>
                        <button><Link className="flex items-center text-sm text-white font-inter font-normal capitalize"><Info /> need help</Link></button>
                    </div>

                </div>
            </div> */}

           {/* navbar middle  */}
           <div className="navbar_middle flex items-center justify-center bg-[#3a3636] w-full h-[84px]">
                <div className="lg:container grid grid-cols-3 items-center">

                    <div className="logo_wrapper">
                        <Link to='/' className="text-3xl text-white font-inter font-medium capitalize flex items-center gap-2"><Armchair size='2rem' color="#dc7e27" /> Maganinha</Link>
                    </div>

                    <div className="search_box">
                        <form action="#" className="max-w-[443px] h-[44px] relative">
                            <input type="text" placeholder="Search here..." className="max-w-[443px] w-full h-full bg-[#302c2c] text-white rounded-lg pl-4" />

                            <button className="absolute to-50% right-4 translate-y-1/2"><Search size='22px' color="#dc7e27" /></button>
                        </form>
                    </div>

                    {/* navbar middle right  */}
                    <div className="navbar_middle_right flex items-center gap-4">

                        <button className="btn capitalize text-white" onClick={() => navigate('/cart')}>
                            <ShoppingCart color="#dc7e27" /> cart <div className="badge badge-sm bg-[#dc7e27]">{cartCount}</div>
                        </button>
                        <button className="btn capitalize text-white">
                            <Heart color="#dc7e27" />
                        </button>

                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn m-1"><User color="#dc7e27" /></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-[#3a3636] text-white rounded-box z-1 w-52 p-2 shadow-sm">
                                {user && (
                                  <li className="pointer-events-none select-none text-center text-xs text-[#dc7e27] font-bold mb-1">{user.name}</li>
                                )}
                                {user && (
                                  <li><button onClick={() => navigate('/auth/user')}>Perfil</button></li>
                                )}
                                {!user && (
                                  <li><a><Link to="/auth/login">Login</Link></a></li>
                                )}
                                {user && (
                                  <li><button onClick={handleLogout}>Logout</button></li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* navbar bottom  */}
            <div className="navbar_bottom flex items-center justify-center w-full h-[75px] bg-[#302c2c] border-b-[1px] border-[#3a3636]">
                <div className="lg:container flex items-center justify-between">

                    <div className="navbar_bottom_left flex items-center gap-8">
                        <div className="dropdown dropdown-start">
                            <div tabIndex={0} role="button" className="btn m-1 flex items-center gap-5 capitalize text-white"> <Menu color="#dc7e27" /> all categories</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-[#3a3636] text-white rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><a>Chair</a></li>
                            </ul>
                        </div>

                        <nav className="flex items-center gap-8">
                            <NavLink 
                                to='/' 
                                className={({ isActive }) => 
                                    `text-sm font-inter font-medium capitalize ${isActive ? 'text-[#dc7e27]' : 'text-white hover:text-[#dc7e27]'}`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                to='/shop' 
                                className={({ isActive }) => 
                                    `text-sm font-inter font-medium capitalize ${isActive ? 'text-[#dc7e27]' : 'text-white hover:text-[#dc7e27]'}`
                                }
                            >
                                shop
                            </NavLink>
                            <NavLink 
                                to='/product' 
                                className={({ isActive }) => 
                                    `text-sm font-inter font-medium capitalize ${isActive ? 'text-[#dc7e27]' : 'text-white hover:text-[#dc7e27]'}`
                                }
                            >
                                product
                            </NavLink>
                            {/* <NavLink 
                                to='/pages' 
                                className={({ isActive }) => 
                                    `text-sm font-inter font-medium capitalize ${isActive ? 'text-[#dc7e27]' : 'text-white hover:text-[#dc7e27]'}`
                                }
                            >
                                pages
                            </NavLink> */}
                            <NavLink 
                                to='/about' 
                                className={({ isActive }) => 
                                    `text-sm font-inter font-medium capitalize ${isActive ? 'text-[#dc7e27]' : 'text-white hover:text-[#dc7e27]'}`
                                }
                            >
                                about
                            </NavLink>
                        </nav>
                    </div>

                    <div className="navbar_bottom_right">
                        <p className="text-sm text-white font-inter font-normal capitalize">contact: <span className="text-[#dc7e27]">(85) 9 9999-0111</span></p>
                    </div>

                </div>
            </div>
        </div>
    );
}