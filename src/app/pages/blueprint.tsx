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

export default function Blueprint() {
  const location = useLocation();
  const blueprint = location.state;

  if (!blueprint) {
    return <div>No blueprint data available</div>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Blueprint</h1>
      <pre>{JSON.stringify(blueprint, null, 2)}</pre>
    </div>
  );
}
