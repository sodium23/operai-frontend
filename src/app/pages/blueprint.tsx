import { useLocation } from "react-router-dom";
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

    if (stored) {
      setBlueprint(JSON.parse(stored));
    }
  }, []);

