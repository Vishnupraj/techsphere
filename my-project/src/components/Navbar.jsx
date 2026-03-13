import { Menu } from "lucide-react";

function Navbar({ setOpen }) {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (

    <div className="backdrop-blur-lg bg-white/5 border-b border-white/10 p-4 flex justify-between items-center sticky top-0 z-30">

      <div className="flex items-center gap-3">

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(prev => !prev)}
        >
          <Menu />
        </button>

        <input
          placeholder="Search..."
          className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg w-40 md:w-72 outline-none focus:ring-2 focus:ring-indigo-500"
        />

      </div>

      <div className="flex items-center gap-4">

        <button className="text-xl">🔔</button>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-9 h-9 rounded-full flex items-center justify-center font-semibold">
          V
        </div>

        <button
          onClick={logout}
          className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-1 rounded-lg text-sm hover:scale-105 transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;