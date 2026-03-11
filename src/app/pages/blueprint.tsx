import { useLocation } from "react-router-dom";

const location = useLocation();
const blueprint = location.state;


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
