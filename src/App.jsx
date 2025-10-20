
import { TestYouTube } from "./components";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Welcome to My App
      </h1>
      <TestYouTube /> 
    </div>
  );
}

export default App;


// import React, { useEffect } from "react";

// import { Outlet } from "react-router";
// import { Navbar, Sidebar, TestYouTube } from "./components/index.js";

// function App() {
//   useEffect(() => {
//     // You can use the TestYouTube component here if needed
//     // For example, you might want to render it conditionally or use its functionality
//     <TestYouTube />;
//   }, []);

//   return (
//     <div>
//       <Navbar />

//       <Outlet />
//       <Sidebar />
//     </div>
//   );
// }

// export default App;
