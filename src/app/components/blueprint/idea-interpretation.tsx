interface IdeaInterpretationProps {
  data: {
    summary: string;
    coreValue: string;
    targetUser: string;
    keyAssumptions: string[];
  };
}

function IdeaInterpretation({ data }: IdeaInterpretationProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Idea Interpretation</h1>
        <p className="text-sm text-gray-500">Structured analysis of your product concept</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Summary</h3>
          <p className="text-gray-900">{data.summary}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Core Value Proposition</h3>
          <p className="text-gray-900">{data.coreValue}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Target User</h3>
          <p className="text-gray-900">{data.targetUser}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Key Assumptions</h3>
          <ul className="space-y-2">
            {data.keyAssumptions.map((assumption, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1.5">•</span>
                <span className="text-gray-900 flex-1">{assumption}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default IdeaInterpretation;
