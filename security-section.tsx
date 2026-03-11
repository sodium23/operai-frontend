import { Shield, FileCheck, Scale } from "lucide-react";

interface SecuritySectionProps {
  data: {
    considerations: string[];
    compliance: string[];
    governance: string[];
  };
}

export function SecuritySection({ data }: SecuritySectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Security & Governance</h1>
        <p className="text-sm text-gray-500">Security, compliance, and operational controls</p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-medium text-gray-700">Security Considerations</h3>
          </div>
          <ul className="space-y-2">
            {data.considerations.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1.5">•</span>
                <span className="text-gray-900 flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileCheck className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-medium text-gray-700">Compliance Requirements</h3>
          </div>
          <ul className="space-y-2">
            {data.compliance.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1.5">•</span>
                <span className="text-gray-900 flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Scale className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-medium text-gray-700">Governance</h3>
          </div>
          <ul className="space-y-2">
            {data.governance.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1.5">•</span>
                <span className="text-gray-900 flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
