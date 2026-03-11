import { useLocation } from "react-router-dom";
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

function Blueprint() {
  const location = useLocation();
  const blueprint = location.state;

  if (!blueprint) {
    return <div>No blueprint data available</div>;
  }

  return (
    <div className="p-8 space-y-8">
      <IdeaInterpretation data={blueprint.idea_interpretation} />
      <MarketReality data={blueprint.market_reality} />
      <MoatAnalysis data={blueprint.moat_analysis} />
      <ConfidenceScore data={blueprint.confidence_score} />
      <ProductBlueprint data={blueprint.product_blueprint} />
      <PRDSection data={blueprint.prd} />
      <ArchitectureSection data={blueprint.architecture} />
      <SecuritySection data={blueprint.security_governance} />
      <EdgeCasesSection data={blueprint.critical_edge_cases} />
      <ValidationSection data={blueprint.validation_plan} />
    </div>
  );
}

export default Blueprint;
