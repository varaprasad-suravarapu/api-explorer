import {
  File,
  Flag,
  // LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"
import {useEffect, useState} from "react"
import {NavLink, useLocation} from "react-router-dom"

const Sidebar = () => {
  const location = useLocation()

  const isResumeGeneratorActive =
  location.pathname.startsWith("/resume-generator") ||
  location.pathname.startsWith("/resume-editor")

  const [isCollapse, setIsCollapse] = useState<boolean>(window.innerWidth < 1048)

useEffect(() => {
  const handleResize = () => {
    setIsCollapse(window.innerWidth < 1048)
  }

  window.addEventListener("resize", handleResize)

  return () => {
    window.removeEventListener("resize", handleResize)
  }
}, [])

const handleCollapse = () => {
  setIsCollapse((prev) => !prev)
}


  return (
    <div
      className={`sticky top-0 h-screen bg-slate-900 text-white p-4 transition-all duration-300 ease-in-out ${
        isCollapse ? "w-20" : "w-64"
      }`}
    >
      <div className="border-b border-slate-50/10 flex gap-2 items-center justify-end p-3">
        <div className="flex w-full items-center justify-between relative group">
          {!isCollapse && <span className="text-slate-100/40">Collapse</span>}
          <button
            type="button"
            onClick={handleCollapse}
            aria-label={isCollapse ? "Expand sidebar" : "Collapse sidebar"}
            className="cursor-pointer"
          >
            {isCollapse ? (
              <PanelLeftOpen
                size={20}
                className="cursor-pointer transition-transform duration-300 hover:scale-110"
              />
            ) : (
              <div>
                <PanelLeftClose
                  size={20}
                  className="cursor-pointer transition-transform duration-300 hover:scale-110"
                />
              </div>
            )}
          </button>
            {isCollapse && (
    <span className="absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-slate-800 px-3 py-2 text-sm text-white shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
      Expand
    </span>
  )}

        </div>
      </div>
      <ul className="space-y-4 mt-6">
        {/* <li className="relative group">
          <NavLink
            to="/"
            className={({isActive}) =>
              `flex items-center rounded-lg p-3 cursor-pointer ${
                isCollapse ? "justify-center" : "gap-2"
              } ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`
            }
          >
            <LayoutDashboard size={20} />
            {!isCollapse && <span>Dashboard</span>}
          </NavLink>

          {isCollapse && (
            <span className="absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-slate-800 px-3 py-2 text-sm text-white shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
              Dashboard
            </span>
          )}
        </li> */}

        <li className="relative group">
          <NavLink
            className={() =>
              `flex items-center rounded-lg p-3 cursor-pointer  ${
                isCollapse ? "justify-center" : "gap-2"
              } ${
                isResumeGeneratorActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`
            }
            to="/resume-generator"
          >
            <File size={20} />
            {!isCollapse && <span>Resume Generator</span>}
          </NavLink>
          {isCollapse && (
    <span className="absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-slate-800 px-3 py-2 text-sm text-white shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
      Resume Generator
    </span>
  )}
        </li>
        <li className="relative group">
          <NavLink
            className={({isActive}) =>
              `flex items-center rounded-lg p-3 cursor-pointer  ${
                isCollapse ? "justify-center" : "gap-2"
              } ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`
            }
            to="/country-flags"
          >
            <Flag size={20} />
            {!isCollapse && <span>Country Flags</span>}
          </NavLink>
          {isCollapse && (
    <span className="absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-slate-800 px-3 py-2 text-sm text-white shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
      Country Flags
    </span>
  )}
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
