import { HashRouter, Route, Routes } from "react-router-dom"
import SideBar from "./Pages/SideBar"
import Dashboard from "./Pages/Dashboard"
import CalendarPage from "./Pages/CalendarPage"
import ProjectsPage from "./Pages/ProjectsPage"
import ProposalsPage from "./Pages/ProposalsPage"
import TeamPage from "./Pages/TeamPage"
import ReportPage from "./Pages/ReportPage"
import ClientsPage from "./Pages/ClientsPage"
import DemoSticker from "./Pages/DemoSticker"
function App() {

  return (
    <>
     <DemoSticker />
    <div className="d-flex">
    <HashRouter>
    <SideBar />  
      <Routes> 
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/Dashboard" index element={<Dashboard />} />
        <Route path="/Calendar" element={<CalendarPage />} />
        <Route path="/Projects" element={<ProjectsPage />} />
        <Route path="/Proposals" element={<ProposalsPage />} />
        <Route path="/Team" element={<TeamPage />} />
        <Route path="/Report" element={<ReportPage />} />
        <Route path="/clients" element={<ClientsPage />} />

      </Routes>
    </HashRouter>
    </div>
    </>
  )
}

export default App
