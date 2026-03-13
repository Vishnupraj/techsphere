import { useState,useEffect } from "react";
import API from "../utils/api";

function Subscriptions(){

const [clients,setClients] = useState([]);

const fetchClients = async()=>{

const res = await API.get("/clients");

setClients(res.data);

};

useEffect(()=>{
fetchClients();
},[]);


/* Revenue calculation */

const totalRevenue = clients.reduce(
(sum,c)=> sum + (c.subscriptionStatus==="Active" ? c.price : 0),
0
);


/* Upgrade plan */

const upgradePlan = async(id,plan,price)=>{

await API.put(`/clients/${id}`,{
plan,
price
});

fetchClients();

};


/* Cancel subscription */

const cancelPlan = async(id)=>{

await API.put(`/clients/${id}`,{
subscriptionStatus:"Cancelled"
});

fetchClients();

};

return(

<div>

<h1 className="text-3xl font-semibold mb-8">
Subscriptions
</h1>


{/* Revenue Card */}

<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl mb-8 max-w-md">

<p className="text-gray-400">
Total Monthly Revenue
</p>

<h2 className="text-4xl text-green-400 font-bold">
${totalRevenue}
</h2>

</div>


{/* Subscription Table */}

<div className="overflow-x-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl">

<table className="w-full">

<thead className="border-b border-slate-700 text-gray-400">

<tr>

<th className="p-4 text-left">Client</th>
<th>Email</th>
<th>Company</th>
<th>Plan</th>
<th>Billing</th>
<th>Status</th>

</tr>

</thead>

<tbody>

{clients.map(client=>(

<tr
key={client._id}
className="border-t border-slate-700 hover:bg-white/5 transition"
>

<td className="p-4">{client.name}</td>

<td>{client.email}</td>

<td>{client.company}</td>

<td className="text-indigo-400 font-semibold">
{client.plan}
</td>

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

</tr>

))}

</tbody>

</table>

</div>

</div>

)}

export default Subscriptions