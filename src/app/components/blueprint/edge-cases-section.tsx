import { Badge } from "../ui/badge";
import { AlertTriangle } from "lucide-react";

interface EdgeCasesSectionProps {
  data: Array<{
    id: string;
    category: string;
    severity: "High" | "Medium" | "Low";
    description: string;
    mitigation: string;
  }>;
}

function EdgeCasesSection({ data }: EdgeCasesSectionProps) {
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
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Critical Edge Cases</h1>
        <p className="text-sm text-gray-500">Potential failure modes and mitigations</p>
      </div>

      <div className="space-y-4">
        {data.map((edgeCase) => (
          <div key={edgeCase.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-2 flex-1">
                  <AlertTriangle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-500">{edgeCase.id}</span>
                      <span className="text-sm font-medium text-gray-700">{edgeCase.category}</span>
                    </div>
                    <p className="text-gray-900">{edgeCase.description}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getSeverityColor(edgeCase.severity)}>
                  {edgeCase.severity}
                </Badge>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded p-3 mt-3">
                <div className="text-xs font-medium text-gray-700 mb-1">Mitigation</div>
                <p className="text-sm text-gray-700">{edgeCase.mitigation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default EdgeCasesSection;
