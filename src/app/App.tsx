import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Clarification from "./pages/clarification";
import Blueprint from "./pages/blueprint";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/clarification" element={<Clarification />} />
      <Route path="/blueprint" element={<Blueprint />} />
    </Routes>
  );
}

export default App;
