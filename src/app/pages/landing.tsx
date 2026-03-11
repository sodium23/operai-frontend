import { useNavigate } from "react-router-dom";
import { generateBlueprint } from "../api/operai";

const navigate = useNavigate();

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
