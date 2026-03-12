import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateBlueprint } from "../api/operai";

function Landing() {
  const navigate = useNavigate();

  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!idea.trim()) {
      setError("Please enter your idea");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await generateBlueprint(idea, 0);

      if (data.mode === "clarification") {
        navigate("/clarification", { state: data });
      }

      if (data.mode === "execution") {
        navigate("/blueprint", { state: data.human_readable });
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while generating the blueprint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-10 space-y-6">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900">
            OperAI
          </h1>
          <p className="text-gray-500">
            Turn a raw idea into a full execution blueprint.
          </p>
        </div>

        {/* Input */}
        <textarea
          className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
          placeholder="Describe your startup or product idea..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />

        {/* Error */}
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
        >
          {loading ? "Generating execution plan..." : "Generate Execution Plan"}
        </button>

        {/* Footer note */}
        <p className="text-xs text-gray-400 text-center">
          OperAI analyzes your idea and produces PRDs, architecture,
          edge cases, risks, and execution strategy.
        </p>

      </div>
    </div>
  );
}

export default Landing;
