import MainDashboard from "../components/dashboard/MainDashboard";
import SideDashboard from "../components/dashboard/SideDashboard";


export default function Dashboard() {

  return (
    <div className='mt-20 grid grid-cols-12 min-h-screen'>
        <SideDashboard />
        <MainDashboard />
    </div>
  )
}
