export function ProductBlueprint() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Product Blueprint</h1>
        <p className="text-sm text-gray-500">High-level product overview and phases</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Build Phases</h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Phase 1: MVP</span>
                <span className="text-sm text-gray-500">Weeks 1-8</span>
              </div>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Core matching algorithm (v1)</li>
                <li>• Basic project posting and proposal flow</li>
                <li>• Manual onboarding for first 50 users</li>
                <li>• Stripe integration for payments</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Phase 2: Scale Foundation</span>
                <span className="text-sm text-gray-500">Weeks 9-16</span>
              </div>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Self-serve onboarding</li>
                <li>• Enhanced matching with portfolio analysis</li>
                <li>• Notification system</li>
                <li>• Basic analytics dashboard</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Phase 3: Market Fit</span>
                <span className="text-sm text-gray-500">Weeks 17-24</span>
              </div>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Advanced search and filters</li>
                <li>• Reputation system</li>
                <li>• Milestone-based payments</li>
                <li>• Mobile responsive optimization</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Success Metrics</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <ul className="space-y-2 text-sm text-gray-900">
              <li>• <strong>North Star:</strong> Projects successfully completed</li>
              <li>• <strong>Acquisition:</strong> Cost per qualified lead &lt; $50</li>
              <li>• <strong>Activation:</strong> 60%+ of signups post a project or proposal within 7 days</li>
              <li>• <strong>Retention:</strong> 40%+ monthly active users return within 30 days</li>
              <li>• <strong>Revenue:</strong> $50k MRR by month 6</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
