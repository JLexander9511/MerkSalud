
import WithState from "@/app/validators/WithState";
import NavBar from "./components/NavBar";

 function AdminDashboard() {
  
  return (
    <WithState>
      <main>
        <NavBar/>
      </main>
    </WithState>
  )
}

export default AdminDashboard