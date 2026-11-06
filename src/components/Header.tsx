
import { NavLink } from "react-router-dom";
import { Flag, Layers } from "lucide-react";

const modules = [
    {
        name: "Country Flags",
        path: "/countries",
        icon: Flag,
    },
    // {
    //     name: "Weather",
    //     path: "/weather",
    //     icon: CloudSun,
    // },
    // {
    //     name: "Currency",
    //     path: "/currency",
    //     icon: Wallet,
    // },
];

const Header = () => {
    return (
        <header className="sticky top-0 z-40 border-b border-slate-700 bg-slate-900 text-white shadow-md">

            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">

                {/* Application Logo */}
                <NavLink to="/" className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-600 p-2">
                        <Layers size={24} />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold">
                            API Explorer
                        </h1>
                        <p className="text-xs text-slate-400">
                            Explore. Discover. Learn.
                        </p>
                    </div>
                </NavLink>

                {/* Module Navigation */}
                <nav className="flex flex-wrap items-center gap-2">
                    {modules.map((module) => {
                        const Icon = module.icon;

                        return (
                            <NavLink
                                key={module.path}
                                to={module.path}
                                className={({ isActive }) =>
                                    `flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-blue-600 text-white"
                                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }`
                                }
                            >
                                <Icon size={18} />
                                {module.name}
                            </NavLink>
                        );
                    })}
                </nav>

            </div>
        </header>
    );
};

export default Header;
