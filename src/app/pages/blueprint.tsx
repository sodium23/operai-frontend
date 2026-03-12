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

    const ensureArray = (value: any) => {
      if (!value) return [];
      if (Array.isArray(value)) return value;
      return [value];
    };

    const mappedBlueprint = {

      idea_interpretation: {
        summary: raw.idea || "Idea summary unavailable",
        coreValue: raw.problem_solved || "Core value not provided",
        targetUser: raw.target_audience || "Target user not defined",
        keyAssumptions: ensureArray(raw.key_features)
      },

      market_reality: {
        demand: raw.market_demand || "Market demand needs validation",
        competitors: ensureArray(raw.competitors),
        risks: ensureArray(raw.risks)
      },

      moat_analysis: {
        strengths: ensureArray(raw.strengths),
        weaknesses: ensureArray(raw.weaknesses),
        differentiation: raw.differentiation || "Differentiation not analyzed yet"
      },

      confidence_score: {
        score: raw.confidence_score || 5,
        reasoning: raw.reasoning || "Initial evaluation"
      },

      product_blueprint: {
        core_features: ensureArray(raw.key_features)
      },

      prd: {
        stories: ensureArray(raw.user_stories)
      },

      architecture: {
        components: ensureArray(raw.architecture_components)
      },

      security: {
        concerns: ensureArray(raw.security_risks)
      },

      edge_cases: {
        cases: ensureArray(raw.edge_cases)
      },

      validation: {
        experiments: ensureArray(raw.validation_tests)
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
