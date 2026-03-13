import { useState, useRef, useEffect } from "react";

function AIAssistant(){

const [messages,setMessages] = useState([]);
const [input,setInput] = useState("");
const [loading,setLoading] = useState(false);

const chatRef = useRef(null);


/* Auto scroll */
useEffect(()=>{
if(chatRef.current){
chatRef.current.scrollTop = chatRef.current.scrollHeight;
}
},[messages]);


/* Send Message */
const sendMessage = async ()=>{

if(!input.trim()) return;

const userMessage = { role:"user", text:input };

setMessages(prev=>[...prev,userMessage]);

setLoading(true);

try{

const res = await fetch("http://localhost:5000/api/gemini",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({ message: input })
});

const data = await res.json();

const botMessage = {
role:"bot",
text:data.reply
};

setMessages(prev=>[...prev,botMessage]);

}catch(error){

setMessages(prev=>[
...prev,
{
role:"bot",
text:"⚠️ AI connection failed"
}
]);

}

setInput("");
setLoading(false);

};


return(

<div className="max-w-4xl mx-auto">

<h1 className="text-3xl font-semibold mb-6">
AI Assistant
</h1>


{/* Chat Window */}

<div
ref={chatRef}
className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-xl h-[420px] overflow-y-auto space-y-4"
>

{messages.map((msg,i)=>(

<div
key={i}
className={`flex ${msg.role==="user"?"justify-end":"justify-start"}`}
>

<div
className={`px-4 py-2 rounded-xl max-w-[70%]
${msg.role==="user"
?"bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
:"bg-slate-800 text-gray-200"}
`}
>

{msg.text}

</div>

</div>

))}


{loading && (
<p className="text-gray-400 text-sm">
AI is typing...
</p>
)}

</div>


{/* Input */}

<div className="flex gap-3 mt-5">

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
placeholder="Ask the AI anything..."
className="flex-1 bg-slate-800 border border-slate-700 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

<button
onClick={sendMessage}
className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2 rounded-lg hover:scale-105 transition"
>
Send
</button>

</div>

</div>

)
}

export default AIAssistant;