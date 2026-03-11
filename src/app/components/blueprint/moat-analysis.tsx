interface MoatAnalysisProps {
  data: {
    differentiators: string[];
    barriers: string[];
    sustainability: string;
  };
}

export function MoatAnalysis({ data }: MoatAnalysisProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Moat Analysis</h1>
        <p className="text-sm text-gray-500">Competitive advantages and defensibility</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Key Differentiators</h3>
          <ul className="space-y-2">
            {data.differentiators.map((diff, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1.5">•</span>
                <span className="text-gray-900 flex-1">{diff}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Entry Barriers</h3>
          <ul className="space-y-2">
            {data.barriers.map((barrier, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1.5">•</span>
                <span className="text-gray-900 flex-1">{barrier}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Sustainability Assessment</h3>
          <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-r">
            <p className="text-gray-900">{data.sustainability}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
