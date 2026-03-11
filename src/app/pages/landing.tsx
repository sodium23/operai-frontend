import { useNavigate } from "react-router-dom";
import { generateBlueprint } from "../api/operai";
import { useState } from "react";

function Landing() {
  const navigate = useNavigate();
  const [idea, setIdea] = useState("");

  const handleSubmit = async () => {
    try {
      const data = await generateBlueprint(idea, 0);

      if (data.mode === "clarification") {
        navigate("/clarification", { state: data });
      }

      if (data.mode === "execution") {
        navigate("/blueprint", { state: data.human_readable });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* your UI */}
      <button onClick={handleSubmit}>Generate</button>
    </div>
  );
}

export default Landing;
