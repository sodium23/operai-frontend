import { Badge } from "../ui/badge";

interface MarketRealityProps {
  data: {
    marketSize: string;
    competitors: Array<{ name: string; strength: string }>;
    trends: string[];
    risks: Array<{ risk: string; severity: "High" | "Medium" | "Low" }>;
  };
}

function MarketReality({ data }: MarketRealityProps) {

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Market Reality</h1>
        <p className="text-sm text-gray-500">Competitive landscape and market dynamics</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Market Size</h3>
          <p className="text-gray-900">{data.marketSize}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Key Competitors</h3>
          <div className="space-y-3">
            {data.competitors.map((competitor, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <div className="font-medium text-gray-900 mb-1">{competitor.name}</div>
                <div className="text-sm text-gray-600">{competitor.strength}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Market Trends</h3>
          <ul className="space-y-2">
            {data.trends.map((trend, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1.5">•</span>
                <span className="text-gray-900 flex-1">{trend}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Key Risks</h3>
          <div className="space-y-3">

            {data.risks.map((risk, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-gray-900 flex-1">{risk.risk}</span>
                  <Badge variant="outline" className={getSeverityColor(risk.severity)}>
                    {risk.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default MarketReality;
