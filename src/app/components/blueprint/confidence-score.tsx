import { TrendingUp, TrendingDown } from "lucide-react";

interface ConfidenceScoreProps {
  data: {
    score: number;
    factors: Array<{ factor: string; impact: "positive" | "negative" }>;
  };
}

function ConfidenceScore({ data }: ConfidenceScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 75) return "bg-green-600";
    if (score >= 50) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Confidence Score</h1>
        <p className="text-sm text-gray-500">Overall execution confidence assessment</p>
      </div>

      <div className="space-y-6">
        {/* Score Visualization */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-6">
            {/* Circular Progress */}
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - data.score / 100)}`}
                  className={getScoreColor(data.score)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-3xl font-semibold ${getScoreColor(data.score)}`}>
                  {data.score}%
                </span>
              </div>
            </div>

            {/* Score Bar (alternative visualization) */}
            <div className="flex-1">
              <div className="mb-2 text-sm font-medium text-gray-700">Execution Confidence</div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${getScoreBgColor(data.score)}`}
                  style={{ width: `${data.score}%` }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {data.score >= 75 && "High confidence - Strong execution potential"}
                {data.score >= 50 && data.score < 75 && "Moderate confidence - Significant execution risk"}
                {data.score < 50 && "Low confidence - Critical risks identified"}
              </div>
            </div>
          </div>
        </div>

        {/* Contributing Factors */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Contributing Factors</h3>
          <div className="space-y-2">
            {data.factors.map((factor, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  factor.impact === "positive"
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                {factor.impact === "positive" ? (
                  <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <span className="text-gray-900 flex-1">{factor.factor}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default IdeaInterpretation;
