

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

    const sampleBlueprint = {

      idea_interpretation: {
        summary: "Automated tax filing SaaS for Indian startups.",
        coreValue: "Reduce dependency on CAs and automate compliance.",
        targetUser: "Indian startups",
        keyAssumptions: [
          "Startups want automation",
          "Accounting data already exists in tools",
          "Compliance rules can be automated"
        ]
      },

      market_reality: {
        demand: "High demand among early stage startups.",
        competitors: ["ClearTax", "Quicko"],
        risks: ["Regulatory changes", "Trust barrier"]
      },

      moat_analysis: {
        strengths: ["Automation", "Startup focus"],
        weaknesses: ["Regulatory complexity"],
        differentiation: "Automated filings vs manual CA workflow"
      },

      confidence_score: {
        score: 7,
        reasoning: "Large market but regulatory complexity"
      },

      product_blueprint: {
        core_features: [
          "GST automation",
          "Income tax filing",
          "Accounting integrations"
        ]
      },

      prd: {
        stories: [
          "Founder uploads accounting data",
          "System calculates taxes automatically",
          "System generates filings"
        ]
      },

      architecture: {
        components: [
          "Frontend dashboard",
          "Tax rules engine",
          "Filing API integration"
        ]
      },

      security: {
        concerns: [
          "Financial data encryption",
          "Secure document storage"
        ]
      },

      edge_cases: {
        cases: [
          "Multiple GST states",
          "Foreign income",
          "Refund scenarios"
        ]
      },

      validation: {
        experiments: [
          "Pilot with 5 startups",
          "Compare time saved vs CA workflow"
        ]
      }

    };

    setBlueprint(sampleBlueprint);

  }, []);

  if (!blueprint) return <div>Loading...</div>;

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
