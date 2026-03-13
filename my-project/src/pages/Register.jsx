import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function Register() {

const navigate = useNavigate()

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [message,setMessage] = useState("")

const handleRegister = async ()=>{

try{

await API.post("/auth/register",{
name,
email,
password
})

setMessage("User Registered Successfully")

setTimeout(()=>{
navigate("/login")
},1500)

}catch(error){

setMessage("Registration Failed")

}

}

return(

<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">

<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-xl w-full max-w-sm text-white shadow-lg">

<h2 className="text-3xl font-semibold mb-6 text-center">
Create Account
</h2>

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

<button
onClick={handleRegister}
className="bg-gradient-to-r from-indigo-500 to-purple-500 w-full py-3 rounded-lg hover:scale-105 transition"
>
Register
</button>

{message && (
<p className="mt-4 text-center text-green-400 text-sm">
{message}
</p>
)}

<p className="mt-5 text-center text-sm text-gray-400">
Already have an account?
<span
className="text-indigo-400 ml-2 cursor-pointer hover:underline"
onClick={()=>navigate("/login")}
>
Login
</span>
</p>

</div>

</div>

)
}

export default Register