import { useEffect, useState } from "react";

export default function Blueprint() {

  const [blueprint, setBlueprint] = useState(null);

  useEffect(() => {
    console.log("Blueprint mounted");

    const stored = sessionStorage.getItem("blueprintData");
    console.log("Raw storage:", stored);

    if (!stored) {
      console.error("No blueprintData found");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      console.log("Parsed:", parsed);

      // since you're already storing machine_schema
      const raw = parsed;

      const arr = (v) => Array.isArray(v) ? v : [];

      const normalized = {

        idea_interpretation:{
          summary: raw?.idea_interpretation?.summary || "",
          coreValue: raw?.idea_interpretation?.coreValue || "",
          targetUser: raw?.idea_interpretation?.targetUser || "",
          keyAssumptions: arr(raw?.idea_interpretation?.keyAssumptions)
        },

        market_reality:{
          marketSize: raw?.market_reality?.marketSize || "",
          competitors: arr(raw?.market_reality?.competitors),
          trends: arr(raw?.market_reality?.trends),
          risks: arr(raw?.market_reality?.risks)
        },

        moat_analysis:{
          differentiators: arr(raw?.moat_analysis?.differentiators),
          barriers: arr(raw?.moat_analysis?.barriers),
          sustainability: raw?.moat_analysis?.sustainability || ""
        },

        confidence_score:{
          score: raw?.confidence_score?.score || 0,
          factors: arr(raw?.confidence_score?.factors)
        },

        product_blueprint:{
          core_features: arr(raw?.product_blueprint?.core_features)
        },

        prd:{
          stories: arr(raw?.prd?.stories)
        },

        architecture:{
          components: arr(raw?.architecture?.components),
          dataFlow: arr(raw?.architecture?.dataFlow),
          scaleTriggers: arr(raw?.architecture?.scaleTriggers)
        },

        security:{
          considerations: arr(raw?.security?.considerations),
          compliance: arr(raw?.security?.compliance),
          governance: arr(raw?.security?.governance)
        },

        edge_cases: arr(raw?.edge_cases),

        validation:{
          experiments: arr(raw?.validation?.experiments),
          successCriteria: arr(raw?.validation?.successCriteria)
        }

      };

      console.log("NORMALIZED BLUEPRINT:", normalized);

      setBlueprint(normalized);

    } catch (err) {
      console.error("Error parsing/normalizing:", err);
    }

  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Check console → normalized blueprint</h1>
    </div>
  );
}
