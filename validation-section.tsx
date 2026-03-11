import { Target, CheckCircle2 } from "lucide-react";

interface ValidationSectionProps {
  data: {
    experiments: Array<{
      experiment: string;
      metric: string;
      timeline: string;
    }>;
    successCriteria: string[];
  };
}

export function ValidationSection({ data }: ValidationSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Validation Plan</h1>
        <p className="text-sm text-gray-500">Experiments and success criteria</p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-medium text-gray-700">Validation Experiments</h3>
          </div>
          <div className="space-y-3">
            {data.experiments.map((experiment, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="font-medium text-gray-900 flex-1">{experiment.experiment}</div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">{experiment.timeline}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Target:</strong> {experiment.metric}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-medium text-gray-700">Success Criteria</h3>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <ul className="space-y-2">
              {data.successCriteria.map((criterion, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-1">✓</span>
                  <span className="text-gray-900 flex-1">{criterion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
