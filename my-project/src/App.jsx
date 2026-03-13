import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Lay from "./components/Lay";
import ProtectedRoute from "./components/ProtectedRoute";

import AIAssistant from "./pages/AIAssistant";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Services from "./pages/Services";
import Subscriptions from "./pages/Subscriptions";
import Tickets from "./pages/Tickets";
import Analytics from "./pages/Analytics";


function App() {

const token = localStorage.getItem("token")

return (
<BrowserRouter>

<Routes>

<Route
path="/"
element={
token ? <Navigate to="/dashboard"/> : <Navigate to="/login"/>
}
/>


<Route path="/login" element={<Login />} />

<Route path="/register" element={<Register />} />

<Route
path="/dashboard"
element={
<ProtectedRoute>
<Lay/>
</ProtectedRoute>
}
>

<Route index element={<Dashboard />} />
<Route path="clients" element={<Clients />} />
<Route path="services" element={<Services />} />
<Route path="subscriptions" element={<Subscriptions />} />
<Route path="tickets" element={<Tickets />} />
<Route path="analytics" element={<Analytics />} />
<Route path="assistant" element={<AIAssistant />} />

</Route>

</Routes>

</BrowserRouter>
);

}

export default App;