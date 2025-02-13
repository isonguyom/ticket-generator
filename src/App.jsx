import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import TicketType from "./pages/TicketType";
import AttendeeDetails from "./pages/AttendeeDetails";
import Ticket from "./pages/Ticket";

export default function App() {
  return (
    <Router>
      <div className="w-full py-3 px-4">
       <TopNav />
      <Routes>
        <Route path="/" element={<TicketType />} />
        <Route path="/attendee-details" element={<AttendeeDetails />} />
        <Route path="/ticket" element={<Ticket />} /> 
      </Routes>
      </div>
    </Router>
  );
}
