import { useState, useEffect } from "react";
import API from "../utils/api";

function Clients(){

const [clients,setClients] = useState([]);
const [services,setServices] = useState([]);

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [company,setCompany] = useState("");
const [service,setService] = useState("");

const [plan,setPlan] = useState("Basic");
const [billingCycle,setBillingCycle] = useState("Monthly");
const [price,setPrice] = useState(0);


/* ---------------- Fetch Clients ---------------- */

const fetchClients = async ()=>{

try{

const res = await API.get("/clients");

setClients(res.data);

}catch(error){

console.log(error);

}

};


/* ---------------- Fetch Services ---------------- */

const fetchServices = async ()=>{

try{

const res = await API.get("/services");

setServices(res.data);

}catch(error){

console.log(error);

}

};


useEffect(()=>{

const token = localStorage.getItem("token");

if(token){
fetchClients();
fetchServices();
}

},[]);


/* ---------------- Plan Multipliers ---------------- */

const planMultiplier = {
Basic:1,
Pro:1.5,
Enterprise:2
};


/* ---------------- Calculate Price ---------------- */

const calculatePrice = (serviceId, selectedPlan)=>{

const selectedService = services.find(s => s._id === serviceId);

if(!selectedService) return;

const basePrice = selectedService.price;

const multiplier = planMultiplier[selectedPlan];

setPrice(Math.round(basePrice * multiplier));

};


/* ---------------- Change Service ---------------- */

const handleServiceChange = (value)=>{

setService(value);

calculatePrice(value,plan);

};


/* ---------------- Change Plan ---------------- */

const handlePlanChange = (value)=>{

setPlan(value);

if(service){
calculatePrice(service,value);
}

};


/* ---------------- Add Client ---------------- */

const addClient = async ()=>{

if(!name || !email || !company || !service){
return alert("All fields required");
}

await API.post("/clients",{
name,
email,
company,
service,
plan,
billingCycle,
price,
subscriptionStatus:"Active"
});

setName("");
setEmail("");
setCompany("");
setService("");

setPlan("Basic");
setBillingCycle("Monthly");
setPrice(0);

fetchClients();

};


/* ---------------- Delete Client ---------------- */

const deleteClient = async (id)=>{

await API.delete(`/clients/${id}`);

fetchClients();

};


/* ---------------- Revenue ---------------- */

const totalRevenue = clients.reduce(
(sum,c)=> sum + (c.subscriptionStatus==="Active" ? c.price : 0),
0
);


return(

<div>

<h1 className="text-3xl font-semibold mb-8">
Clients
</h1>

{/* Revenue Card */}

<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl mb-8 max-w-3xl">

<p className="text-gray-400">
Total Revenue
</p>

<h2 className="text-4xl text-green-400 font-bold">
${totalRevenue}
</h2>

</div>


{/* Add Client Form */}

<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl mb-10 max-w-3xl space-y-4">

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

<input
placeholder="Company"
value={company}
onChange={(e)=>setCompany(e.target.value)}
className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>


{/* Service Dropdown */}

<select
value={service}
onChange={(e)=>handleServiceChange(e.target.value)}
className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
>

<option value="">Select Service</option>

{services.map(s=>(
<option key={s._id} value={s._id}>
{s.name}
</option>
))}

</select>


{/* Plan */}

<select
value={plan}
onChange={(e)=>handlePlanChange(e.target.value)}
className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
>

<option>Basic</option>
<option>Pro</option>
<option>Enterprise</option>

</select>


{/* Billing */}

<select
value={billingCycle}
onChange={(e)=>setBillingCycle(e.target.value)}
className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
>

<option>Monthly</option>
<option>Yearly</option>

</select>


<p className="text-gray-400">
Price: <span className="text-indigo-400 font-semibold">${price}</span>
</p>


<button
onClick={addClient}
className="bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 rounded-lg hover:scale-105 transition"
>
Add Client
</button>

</div>


{/* Clients Table */}

<div className="overflow-x-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl">

<table className="w-full">

<thead className="border-b border-slate-700 text-gray-400">

<tr>

<th className="p-4 text-left">Name</th>
<th>Email</th>
<th>Company</th>
<th>Service</th>
<th>Plan</th>
<th>Billing</th>
<th>Status</th>
<th>Price</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{clients.map(client=>(

<tr key={client._id} className="border-t border-slate-700 hover:bg-white/5 transition">

<td className="p-4">{client.name}</td>
<td>{client.email}</td>
<td>{client.company}</td>

<td>{client.service?.name || "N/A"}</td>

<td>{client.plan}</td>

<td>{client.billingCycle}</td>

<td>

<span className={`px-3 py-1 rounded-full text-sm ${
client.subscriptionStatus==="Active"
?"bg-green-500/20 text-green-400"
:"bg-red-500/20 text-red-400"
}`}>

{client.subscriptionStatus}

</span>

</td>

<td className="text-indigo-400 font-semibold">
${client.price}
</td>

<td>

<button
onClick={()=>deleteClient(client._id)}
className="text-red-400 hover:text-red-300"
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)
}

export default Clients