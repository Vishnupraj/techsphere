import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function Login() {

const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [error,setError] = useState("")

const handleLogin = async () => {

try{

const res = await API.post("/auth/login",{
email,
password
})

localStorage.setItem("token",res.data.token)

navigate("/dashboard")

}catch(error){

setError(error.response?.data?.message || "Login Failed")

}

}

return(

<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">

<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-xl w-full max-w-sm text-white shadow-lg">

<h1 className="text-3xl font-semibold mb-6 text-center">
TechSphere Login
</h1>

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
onClick={handleLogin}
className="bg-gradient-to-r from-indigo-500 to-purple-500 w-full py-3 rounded-lg hover:scale-105 transition"
>
Login
</button>

{error && (
<p className="text-red-400 mt-3 text-sm text-center">
{error}
</p>
)}

<p className="mt-5 text-center text-sm text-gray-400">
Don't have an account?
<span
className="text-indigo-400 ml-2 cursor-pointer hover:underline"
onClick={()=>navigate("/register")}
>
Register
</span>
</p>

</div>

</div>

)
}

export default Login