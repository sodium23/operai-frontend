import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import IdeaInterpretation from "../components/blueprint/idea-interpretation";
import MarketReality from "../components/blueprint/market-reality";
import MoatAnalysis from "../components/blueprint/moat-analysis";
import ConfidenceScore from "../components/blueprint/confidence-score";
import ProductBlueprint from "../components/blueprint/product-blueprint";
import PRDSection from "../components/blueprint/prd-section";
import ArchitectureSection from "../components/blueprint/architecture-section";
import SecuritySection from "../components/blueprint/security-section";
import EdgeCasesSection from "../components/blueprint/edge-cases-section";
import ValidationSection from "../components/blueprint/validation-section";

export default function Blueprint() {

  const navigate = useNavigate();

  const [blueprint, setBlueprint] = useState<any>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {

    const stored = sessionStorage.getItem("blueprintData");

    if (!stored) {
      console.error("No blueprintData found in sessionStorage");
      return;
    }

    const raw = JSON.parse(stored);

    const arr = (v:any) => Array.isArray(v) ? v : [];

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

    setBlueprint(normalized);

  }, []);

  // -----------------------------
  // SAVE IDEA FUNCTION
  // -----------------------------

  const handleSave = () => {

    const savedIdeas = JSON.parse(localStorage.getItem("savedIdeas") || "[]");

    const newIdea = {
      id: Date.now().toString(),
      description: blueprint?.idea_interpretation?.summary || "Untitled Idea",
      createdAt: new Date().toISOString(),
      mode: "standard",
      blueprint
    };

    savedIdeas.push(newIdea);

    localStorage.setItem("savedIdeas", JSON.stringify(savedIdeas));

    setSaved(true);

    // redirect after short delay
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  if (!blueprint) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading blueprint...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10 space-y-10">

      {/* Save success banner */}
      {saved && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded">
          Idea saved successfully! Redirecting...
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Save Idea
        </button>
      </div>

      <IdeaInterpretation data={blueprint.idea_interpretation} />

      <MarketReality data={blueprint.market_reality} />

      <MoatAnalysis data={blueprint.moat_analysis} />

      <ConfidenceScore data={blueprint.confidence_score} />

      <ProductBlueprint data={blueprint.product_blueprint} />

      <PRDSection data={blueprint.prd} />

      <ArchitectureSection data={blueprint.architecture} />

      <SecuritySection data={blueprint.security} />

      <EdgeCasesSection data={blueprint.edge_cases} />

      <ValidationSection data={blueprint.validation} />

    </div>
  );
}
