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

    // Transform backend response → UI structure
    const mappedBlueprint = {

      idea_interpretation: {
        summary: raw.idea || "Idea summary unavailable",
        coreValue: raw.problem_solved || "Core value not provided",
        targetUser: raw.target_audience || "Target user not defined",
        keyAssumptions: raw.key_features || []
      },

      market_reality: {
        demand: "Market demand needs validation",
        competitors: [],
        risks: []
      },

      moat_analysis: {
        strengths: [],
        weaknesses: [],
        differentiation: "Differentiation needs further validation"
      },

      confidence_score: {
        score: 6,
        reasoning: "Initial idea analysis without deeper validation"
      },

      product_blueprint: {
        core_features: raw.key_features || []
      },

      prd: {
        stories: []
      },

      architecture: {
        components: []
      },

      security: {
        concerns: []
      },

      edge_cases: {
        cases: []
      },

      validation: {
        experiments: []
      }

    };

    setBlueprint(mappedBlueprint);

  }, []);

  if (!blueprint) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Generating blueprint...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10 space-y-10">

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
