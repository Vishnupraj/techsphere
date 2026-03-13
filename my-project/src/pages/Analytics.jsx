import { useState, useEffect } from "react";
import API from "../utils/api";

import {
ResponsiveContainer,
LineChart,
Line,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
PieChart,
Pie,
Cell,
Legend
} from "recharts";

function Analytics(){

const [clients,setClients] = useState([]);
const [tickets,setTickets] = useState([]);

useEffect(()=>{

const fetchData = async ()=>{

try{

const clientsRes = await API.get("/clients");
const ticketsRes = await API.get("/tickets");

setClients(clientsRes.data);
setTickets(ticketsRes.data);

}catch(error){
console.log(error);
}

};

fetchData();

},[]);


/* ---------- Revenue by Plan ---------- */

let basicRevenue = 0;
let proRevenue = 0;
let enterpriseRevenue = 0;

clients.forEach(client=>{

if(client.subscriptionStatus === "Active"){

if(client.plan === "Basic") basicRevenue += client.price;
if(client.plan === "Pro") proRevenue += client.price;
if(client.plan === "Enterprise") enterpriseRevenue += client.price;

}

});

const revenuePlanData = [
{name:"Basic",value:basicRevenue},
{name:"Pro",value:proRevenue},
{name:"Enterprise",value:enterpriseRevenue}
];

const COLORS = ["#22c55e","#3b82f6","#a855f7"];


/* ---------- MRR & ARR ---------- */

const MRR = basicRevenue + proRevenue + enterpriseRevenue;
const ARR = MRR * 12;


/* ---------- Monthly Growth ---------- */

const monthlyGrowth = [
{month:"Jan",revenue:MRR * 0.5},
{month:"Feb",revenue:MRR * 0.6},
{month:"Mar",revenue:MRR * 0.7},
{month:"Apr",revenue:MRR * 0.8},
{month:"May",revenue:MRR * 0.9},
{month:"Jun",revenue:MRR},
];


/* ---------- Ticket Trend ---------- */

const open = tickets.filter(t=>t.status==="Open").length;
const progress = tickets.filter(t=>t.status==="In Progress").length;
const resolved = tickets.filter(t=>t.status==="Resolved").length;

const ticketTrend = [
{name:"Open",tickets:open},
{name:"In Progress",tickets:progress},
{name:"Resolved",tickets:resolved}
];


return(

<div>

<h1 className="text-3xl font-semibold mb-8">
Analytics Dashboard
</h1>


{/* SaaS Metrics */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl hover:scale-105 transition">
<p className="text-gray-400">MRR</p>
<h2 className="text-4xl font-bold text-green-400">${MRR}</h2>
</div>

<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl hover:scale-105 transition">
<p className="text-gray-400">ARR</p>
<h2 className="text-4xl font-bold text-indigo-400">${ARR}</h2>
</div>

<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl hover:scale-105 transition">
<p className="text-gray-400">Active Clients</p>
<h2 className="text-4xl font-bold">{clients.length}</h2>
</div>

<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl hover:scale-105 transition">
<p className="text-gray-400">Tickets</p>
<h2 className="text-4xl font-bold">{tickets.length}</h2>
</div>

</div>


<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


{/* Revenue by Plan */}

<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl">

<h2 className="mb-4 font-semibold">
Revenue by Plan
</h2>

<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie
data={revenuePlanData}
dataKey="value"
nameKey="name"
outerRadius={100}
label
>

{revenuePlanData.map((entry,index)=>(
<Cell key={index} fill={COLORS[index]}/>
))}

</Pie>

<Tooltip/>
<Legend/>

</PieChart>

</ResponsiveContainer>

</div>


{/* Monthly Growth */}

<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl">

<h2 className="mb-4 font-semibold">
Monthly Growth
</h2>

<ResponsiveContainer width="100%" height={300}>

<LineChart data={monthlyGrowth}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Line type="monotone" dataKey="revenue" stroke="#22c55e"/>

</LineChart>

</ResponsiveContainer>

</div>


{/* Ticket Trend */}

<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl">

<h2 className="mb-4 font-semibold">
Ticket Status
</h2>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={ticketTrend}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="tickets" fill="#3b82f6"/>

</BarChart>

</ResponsiveContainer>

</div>


</div>

</div>

)
}

export default Analytics