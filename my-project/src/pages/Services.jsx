import { useState, useEffect } from "react";
import API from "../utils/api";

function Services() {

const [services,setServices] = useState([]);

const [name,setName] = useState("");
const [description,setDescription] = useState("");
const [price,setPrice] = useState("");

const [loading,setLoading] = useState(false);


/* ---------- Fetch Services ---------- */

const fetchServices = async ()=>{

try{

setLoading(true);

const res = await API.get("/services");

setServices(res.data);

}catch(error){

console.log("Fetch service error:",error.response?.data || error);

alert("Services load nahi hui");

}finally{

setLoading(false);

}

};


/* ---------- Load Data ---------- */

useEffect(()=>{

const token = localStorage.getItem("token");

if(!token){
alert("Please login first");
return;
}

fetchServices();

},[]);


/* ---------- Add Service ---------- */

const addService = async ()=>{

if(!name.trim() || !price){
alert("Service name and price required");
return;
}

try{

const res = await API.post("/services",{
name,
description,
price:Number(price)
});

console.log("Service created:",res.data);

alert("Service added successfully");

setName("");
setDescription("");
setPrice("");

fetchServices();

}catch(error){

console.log("Add service error:",error.response?.data || error);

alert(error.response?.data?.message || "Service add nahi hui");

}

};


/* ---------- Delete Service ---------- */

const deleteService = async (id)=>{

try{

await API.delete(`/services/${id}`);

fetchServices();

}catch(error){

console.log("Delete service error:",error.response?.data || error);

alert("Service delete nahi hui");

}

};


return(

<div>

<h1 className="text-3xl font-semibold mb-8">
Services
</h1>


{/* Add Service Form */}

<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl mb-8 max-w-3xl space-y-4">

<input
placeholder="Service Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

<input
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

<input
type="number"
placeholder="Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

<button
onClick={addService}
className="bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 rounded-lg hover:scale-105 transition"
>
Add Service
</button>

</div>


{/* Services List */}

{loading ? (

<p className="text-gray-400">
Loading services...
</p>

):( 

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

{services.map(service=>(

<div
key={service._id}
className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl hover:scale-105 transition"
>

<h3 className="text-xl font-semibold">
{service.name}
</h3>

<p className="text-gray-400 mt-2">
{service.description}
</p>

<p className="mt-4 text-green-400 font-semibold text-lg">
${service.price}
</p>

<button
onClick={()=>deleteService(service._id)}
className="text-red-400 mt-4 hover:text-red-300"
>
Delete
</button>

</div>

))}

</div>

)}

</div>

)}

export default Services