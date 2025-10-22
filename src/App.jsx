
import { Outlet } from "react-router";
import { Navbar, Sidebar } from "./components/index.js";

function App() {
 
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
     
     <div>
      <div className="flex flex-2">
        <Sidebar />
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
     </div>

    </div>
  );
}

export default App;
