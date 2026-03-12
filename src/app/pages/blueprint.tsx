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
    idea_interpretation:{
  summary:"Automated tax filing SaaS",
  coreValue:"Automate compliance for Indian startups",
  targetUser:"Early-stage and growth-stage Indian startups",
  keyAssumptions:[
    "Startups prefer automation over CA-led filings",
    "Compliance APIs are reliable",
    "Startups will trust SaaS with financial data"
  ]
},

market_reality:{
  marketSize:"Large and growing Indian startup ecosystem with increasing compliance requirements",
  competitors:[
    {name:"ClearTax",strength:"Strong brand and compliance ecosystem"},
    {name:"Quicko",strength:"Automated tax workflows and integrations"}
  ],
  trends:[
    "Increasing compliance digitization",
    "Government APIs for GST and tax filings",
    "Startups adopting automation tools"
  ],
  risks:[
    {risk:"Regulatory changes impacting automation",severity:"High"},
    {risk:"Trust barriers for financial automation",severity:"Medium"},
    {risk:"Dependence on government APIs",severity:"Medium"}
  ]
},

moat_analysis:{
  differentiators:[
    "Fully automated tax filing workflows",
    "Founder-first simplified UX",
    "AI assisted compliance monitoring"
  ],
  barriers:[
    "Compliance expertise required",
    "Government API integration complexity",
    "Data security expectations"
  ],
  sustainability:"Strong if trust, compliance accuracy, and automation depth are maintained"
},

confidence_score:{
  score:70,
  factors:[
    {factor:"Large startup market",impact:"positive"},
    {factor:"High regulatory complexity",impact:"negative"}
  ]
},

product_blueprint:{
  core_features:[
    "GST automation",
    "Income tax automation",
    "Automated compliance reminders",
    "Financial document ingestion"
  ]
},

prd:{
  stories:[
    {
      id:"US1",
      title:"Upload financial documents",
      persona:"Startup Founder",
      want:"to upload financial and transaction data",
      so:"tax filings can be generated automatically",
      criteria:[
        "User can upload CSV or connect accounting software",
        "System validates uploaded data",
        "Data stored securely"
      ]
    },
    {
      id:"US2",
      title:"Generate tax filing",
      persona:"Startup Founder",
      want:"the system to automatically calculate taxes",
      so:"I can submit filings without manual calculations",
      criteria:[
        "System computes GST and income tax",
        "Shows calculation breakdown",
        "Allows download of filing documents"
      ]
    }
  ]
},

architecture:{
  components:[
    {name:"Frontend Dashboard",description:"User interface for founders to upload data and track compliance"},
    {name:"Document Ingestion Service",description:"Handles financial file uploads and validation"},
    {name:"Tax Engine",description:"Core tax calculation and rule engine"},
    {name:"Compliance API Connector",description:"Integrates with GST and tax government APIs"},
    {name:"Secure Storage",description:"Encrypted storage for financial documents"}
  ],
  dataFlow:[
    "User uploads financial data",
    "Document ingestion service validates files",
    "Tax engine calculates liabilities",
    "System generates filing documents",
    "User reviews and submits filings"
  ],
  scaleTriggers:[
    "10k startups onboarded",
    "Multi-state GST filings",
    "High concurrent filing seasons"
  ]
},

security:{
  considerations:[
    "End-to-end encryption of financial data",
    "Secure document storage",
    "Role-based access controls"
  ],
  compliance:[
    "Indian IT Act compliance",
    "Data protection requirements",
    "GST data handling guidelines"
  ],
  governance:[
    "Audit logs for financial operations",
    "Access monitoring",
    "Periodic compliance reviews"
  ]
},

edge_cases:[
  {
    id:"EC1",
    category:"GST",
    severity:"High",
    description:"Startup operates in multiple GST states with different filings",
    mitigation:"System supports multi-state GST mapping and filings"
  },
  {
    id:"EC2",
    category:"Refunds",
    severity:"Medium",
    description:"Incorrect tax credit leading to refund scenarios",
    mitigation:"Automated reconciliation and manual override option"
  },
  {
    id:"EC3",
    category:"Data Upload",
    severity:"Low",
    description:"User uploads incomplete financial data",
    mitigation:"Validation checks and guided correction prompts"
  }
],

validation:{
  experiments:[
    {
      experiment:"Pilot product with 5 startups",
      metric:"Successful automated filings",
      timeline:"4 weeks"
    },
    {
      experiment:"Integration test with GST APIs",
      metric:"API reliability and error rate",
      timeline:"2 weeks"
    }
  ],
  successCriteria:[
    "80% automated filing success rate",
    "Founders complete filings without CA assistance",
    "Positive feedback from pilot startups"
  ]
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



   <IdeaInterpretation data={blueprint.idea_interpretation} />
<MarketReality data={blueprint.market_reality} />



    </div>
  );

}
