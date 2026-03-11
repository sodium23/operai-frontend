import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { generateBlueprint } from "../api/operai";

function Clarification() {
  const location = useLocation();
  const navigate = useNavigate();

  const { question, question_count } = location.state || {};

  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnswer = async () => {
    if (!userAnswer) return;

    try {
      setLoading(true);

      const combinedIdea = userAnswer; // ideally also include original idea

      const data = await generateBlueprint(combinedIdea, question_count);

      if (data.mode === "clarification") {
        navigate("/clarification", { state: data });
      }

      if (data.mode === "execution") {
        navigate("/blueprint", { state: data.human_readable });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!question) {
    return <div>No clarification question available</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-xl font-semibold">{question}</h2>

      <textarea
        className="w-full border rounded-lg p-3"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />

      <button
        onClick={handleAnswer}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
      >
        {loading ? "Processing..." : "Continue"}
      </button>
    </div>
  );
}

export default Clarification;
