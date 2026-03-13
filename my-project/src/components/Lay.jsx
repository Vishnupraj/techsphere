import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function Lay(){

const [open,setOpen] = useState(false)

return(

<div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

{/* Sidebar */}
<Sidebar open={open} setOpen={setOpen}/>

{/* Mobile Overlay */}
{open && (
<div
className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
onClick={()=>setOpen(false)}
></div>
)}

{/* Main Content */}
<div className="flex-1 flex flex-col md:ml-64">

{/* Navbar */}
<Navbar setOpen={setOpen}/>

{/* Page Content */}
<div className="p-4 md:p-6 lg:p-8 flex-1 overflow-y-auto">

<div className="max-w-7xl mx-auto">

<Outlet/>

</div>

</div>

</div>

</div>

)

}

export default Lay