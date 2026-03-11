import { useLocation, useNavigate } from "react-router-dom";
import { generateBlueprint } from "../api/operai";

const location = useLocation();
const navigate = useNavigate();

const { question, question_count } = location.state;

const handleAnswer = async () => {
  try {
    const combinedIdea = originalIdea + " " + userAnswer;

    const data = await generateBlueprint(combinedIdea, question_count);

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
