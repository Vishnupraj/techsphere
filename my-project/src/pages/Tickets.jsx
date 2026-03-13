import { useState, useEffect } from "react";
import API from "../utils/api";

function Tickets() {

const [tickets,setTickets] = useState([]);
const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [loading,setLoading] = useState(false);


// Fetch Tickets
const fetchTickets = async ()=>{

try{

setLoading(true);

const res = await API.get("/tickets");

setTickets(res.data);

}catch(error){

console.log("Error fetching tickets:",error);

}finally{

setLoading(false);

}

};


useEffect(()=>{
fetchTickets();
},[]);


// Submit Ticket
const submitTicket = async ()=>{

if(!title.trim()){
return alert("Title is required");
}

try{

await API.post("/tickets",{
title,
description
});

setTitle("");
setDescription("");

fetchTickets();

}catch(error){

console.log("Error creating ticket:",error);

}

};


// Update Ticket Status
const updateStatus = async (id,status)=>{

try{

const res = await API.put(`/tickets/${id}`,{
status
});

setTickets(prev =>
prev.map(ticket =>
ticket._id === id ? res.data : ticket
)
);

}catch(error){

console.log("Error updating status:",error);

}

};


return(

<div>

<h1 className="text-3xl font-semibold mb-8">
Support Tickets
</h1>


{/* Ticket Form */}

<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl mb-8 max-w-3xl space-y-4">

<input
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

<textarea
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

<button
onClick={submitTicket}
className="bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 rounded-lg hover:scale-105 transition"
>
Submit Ticket
</button>

</div>


{/* Ticket List */}

{loading ? (

<p className="text-gray-400">
Loading tickets...
</p>

) : (

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{tickets.map(ticket=>(

<div
key={ticket._id}
className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-xl hover:scale-105 transition"
>

<h3 className="font-semibold text-lg">
{ticket.title}
</h3>

<p className="text-gray-400 mt-2">
{ticket.description}
</p>

<p className="text-sm mt-3">
Status:
<span className={`ml-2 px-2 py-1 rounded-full text-xs ${
ticket.status === "Resolved"
? "bg-green-500/20 text-green-400"
: ticket.status === "In Progress"
? "bg-blue-500/20 text-blue-400"
: "bg-yellow-500/20 text-yellow-400"
}`}>
{ticket.status}
</span>
</p>

<div className="mt-4 flex gap-3">

<button
onClick={()=>updateStatus(ticket._id,"In Progress")}
className="text-blue-400 hover:text-blue-300"
>
In Progress
</button>

<button
onClick={()=>updateStatus(ticket._id,"Resolved")}
className="text-green-400 hover:text-green-300"
>
Resolve
</button>

</div>

</div>

))}

</div>

)}

</div>

)
}

export default Tickets