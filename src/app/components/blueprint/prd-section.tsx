import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface PRDSectionProps {
  data: {
    stories: Array<{
      id: string;
      title: string;
      persona: string;
      want: string;
      so: string;
      criteria: string[];
    }>;
  };
}

function PRDSection({ data }: PRDSectionProps) {
  const [expandedStories, setExpandedStories] = useState<Set<string>>(new Set());

  const toggleStory = (id: string) => {
    const newExpanded = new Set(expandedStories);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedStories(newExpanded);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Product Requirements (PRD)</h1>
        <p className="text-sm text-gray-500">User stories and acceptance criteria</p>
      </div>

      <div className="space-y-3">
        {data.stories.map((story) => {
          const isExpanded = expandedStories.has(story.id);
          return (
            <div key={story.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleStory(story.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3 text-left flex-1">
                  <span className="text-xs font-mono text-gray-500 mt-0.5">{story.id}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">{story.title}</div>
                    <div className="text-sm text-gray-600">
                      As a <strong>{story.persona}</strong>, I want to {story.want}, so that {story.so}
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Acceptance Criteria</h4>
                  <ul className="space-y-1.5">
                    {story.criteria.map((criterion, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-indigo-600 mt-1">✓</span>
                        <span className="flex-1">{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default IdeaInterpretation;
