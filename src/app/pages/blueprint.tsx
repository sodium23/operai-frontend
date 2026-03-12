import { useEffect, useState } from "react";

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

  const [blueprint, setBlueprint] = useState<any>(null);

  useEffect(() => {
  const stored = sessionStorage.getItem("blueprintData");
  if (!stored) return;

  const raw = JSON.parse(stored);

  const toArray = (v:any) => Array.isArray(v) ? v : [];

  const safeBlueprint = {
    idea_interpretation: {
      summary: raw.idea_interpretation?.summary || "",
      coreValue: raw.idea_interpretation?.coreValue || "",
      targetUser: raw.idea_interpretation?.targetUser || "",
      keyAssumptions: toArray(raw.idea_interpretation?.keyAssumptions)
    },

    market_reality: {
      demand: raw.market_reality?.demand || "",
      competitors: toArray(raw.market_reality?.competitors),
      risks: toArray(raw.market_reality?.risks)
    },

    moat_analysis: {
      strengths: toArray(raw.moat_analysis?.strengths),
      weaknesses: toArray(raw.moat_analysis?.weaknesses),
      differentiation: raw.moat_analysis?.differentiation || ""
    },

    confidence_score: {
      score: raw.confidence_score?.score || 0,
      reasoning: raw.confidence_score?.reasoning || ""
    },

    product_blueprint: {
      core_features: toArray(raw.product_blueprint?.core_features)
    },

    prd: {
      stories: toArray(raw.prd?.stories)
    },

    architecture: {
      components: toArray(raw.architecture?.components)
    },

    security: {
      concerns: toArray(raw.security?.concerns)
    },

    edge_cases: {
      cases: toArray(raw.edge_cases?.cases)
    },

    validation: {
      experiments: toArray(raw.validation?.experiments)
    }
  };

  setBlueprint(safeBlueprint);

}, []);
  if (!blueprint) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading blueprint...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10 space-y-10">

     // <IdeaInterpretation data={blueprint.idea_interpretation} />

      // <MarketReality data={blueprint.market_reality} />

      // <MoatAnalysis data={blueprint.moat_analysis} />

       //<ConfidenceScore data={blueprint.confidence_score} />

      <ProductBlueprint data={blueprint.product_blueprint} />

     // <PRDSection data={blueprint.prd} />

      <ArchitectureSection data={blueprint.architecture} />

     // <SecuritySection data={blueprint.security} />

      //<EdgeCasesSection data={blueprint.edge_cases} />

     // <ValidationSection data={blueprint.validation} />

    </div>
  );

}
