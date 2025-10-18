import { Outlet } from "react-router";
import { Header, Footer } from "./index.js";

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
