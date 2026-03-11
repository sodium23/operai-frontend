import { Database, Layers, ArrowRight } from "lucide-react";

interface ArchitectureSectionProps {
  data: {
    components: Array<{ name: string; description: string }>;
    dataFlow: string[];
    scaleTriggers: string[];
  };
}

export function ArchitectureSection({ data }: ArchitectureSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Architecture</h1>
        <p className="text-sm text-gray-500">System design and technical foundation</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">System Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.components.map((component, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Layers className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 mb-1">{component.name}</div>
                    <div className="text-sm text-gray-600">{component.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Data Flow</h3>
          <div className="space-y-2">
            {data.dataFlow.map((flow, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <ArrowRight className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span className="flex-1">{flow}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Scale Triggers</h3>
          <div className="space-y-2">
            {data.scaleTriggers.map((trigger, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <Database className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 flex-1">{trigger}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
