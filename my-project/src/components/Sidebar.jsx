import { Link, useLocation } from "react-router-dom";

function Sidebar({ open }) {

const location = useLocation();

const menu = [
{ name:"Dashboard", path:"/dashboard" },
{ name:"Clients", path:"/dashboard/clients" },
{ name:"Services", path:"/dashboard/services" },
{ name:"Subscriptions", path:"/dashboard/subscriptions" },
{ name:"Tickets", path:"/dashboard/tickets" },
{ name:"Analytics", path:"/dashboard/analytics" },
{ name:"AI Assistant", path:"/dashboard/assistant" }
];

return(

<div
className={`
fixed md:fixed z-40
top-0 left-0
h-screen
w-64
bg-slate-900
p-6
border-r border-white/10
transform transition-transform duration-300
${open ? "translate-x-0" : "-translate-x-full"}
md:translate-x-0
`}
>

<h2 className="text-2xl font-bold mb-10 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
TechSphere
</h2>

<ul className="space-y-3">

{menu.map((item)=>(

<li key={item.path}>

<Link
to={item.path}
className={`
block px-4 py-2 rounded-lg
transition-all duration-200
hover:bg-indigo-500/20 hover:translate-x-1
${location.pathname === item.path ? "bg-indigo-500/30" : ""}
`}
>

{item.name}

</Link>

</li>

))}

</ul>

</div>

);

}

export default Sidebar;