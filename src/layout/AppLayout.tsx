import { Outlet } from "react-router-dom"
import Sidebar from "../components/navigation/Sidebar"

const AppLayout = () => {
  return (
    <main>
      <section className="flex min-h-screen w-full">
        <div className="relative z-50">
          <Sidebar />
        </div>
        <div className="relative z-55 min-w-0 flex-1">
          <Outlet />
        </div>
      </section>
    </main>
  )
}

export default AppLayout