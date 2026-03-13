import { useState, useEffect } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

function Dashboard(){
const navigate = useNavigate();


useEffect(()=>{
const token = localStorage.getItem("token");

if(!token){
navigate("/login");
}
},[]);

const [clients,setClients] = useState([]);
const [services,setServices] = useState([]);
const [tickets,setTickets] = useState([]);

useEffect(()=>{

const fetchData = async ()=>{

const token = localStorage.getItem("token");

if(!token){
return;
}

try{

const clientsRes = await API.get("/clients");
const servicesRes = await API.get("/services");
const ticketsRes = await API.get("/tickets");

setClients(clientsRes.data);
setServices(servicesRes.data);
setTickets(ticketsRes.data);

}catch(error){
console.log(error);
}

};

fetchData();

},[]);

return(

<div>

<h1 className="text-3xl font-semibold mb-8">
Dashboard Overview
</h1>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

{/* Clients Card */}
<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl hover:scale-105 transition duration-300">

<p className="text-gray-400 mb-2">
Total Clients
</p>

<h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
{clients.length}
</h2>

</div>

{/* Services Card */}
<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl hover:scale-105 transition duration-300">

<p className="text-gray-400 mb-2">
Services
</p>

<h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
{services.length}
</h2>

</div>

{/* Tickets Card */}
<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl hover:scale-105 transition duration-300">

<p className="text-gray-400 mb-2">
Open Tickets
</p>

<h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
{tickets.length}
</h2>

</div>

{/* Status Card */}
<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl hover:scale-105 transition duration-300">

<p className="text-gray-400 mb-2">
Platform Status
</p>

<h2 className="text-4xl font-bold text-green-400">
Active
</h2>

</div>

</div>

</div>

)}

export default Dashboard