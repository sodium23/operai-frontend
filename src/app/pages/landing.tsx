import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Lock, ArrowRight, Plus, Trash2, ChevronRight, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const EXAMPLE_IDEAS = [
  {
    title: "AI-Powered Freelance Marketplace",
    description: "A platform that connects freelance designers with startups needing on-demand brand work, with AI-powered matching based on portfolio style and project requirements.",
  },
  {
    title: "B2B Sales Intelligence Tool",
    description: "A Chrome extension that analyzes LinkedIn profiles and company data in real-time, providing sales reps with personalized talking points and warm intro paths before cold outreach.",
  },
  {
    title: "Developer Documentation Assistant",
    description: "An AI tool that auto-generates and maintains technical documentation by analyzing code repositories, API endpoints, and commit messages, keeping docs always in sync with codebase changes.",
  },
  {
    title: "Healthcare Shift Exchange Platform",
    description: "A mobile-first marketplace for nurses and healthcare workers to swap shifts, with intelligent matching based on credentials, location, and hospital policies, reducing staffing gaps.",
  },
  {
    title: "Carbon Footprint Tracker for E-commerce",
    description: "A Shopify plugin that calculates and displays the carbon footprint of products and shipping options at checkout, allowing brands to offer carbon offset purchases and sustainability badges.",
  },
  {
    title: "Micro-SaaS Analytics Dashboard",
    description: "A unified dashboard that aggregates metrics from Stripe, Google Analytics, and customer support tools to give indie founders a single view of their business health and churn signals.",
  },
  {
    title: "Interview Practice Platform",
    description: "An AI-powered mock interview system for technical roles that adapts question difficulty based on performance, provides real-time feedback, and generates detailed performance reports for job seekers.",
  },
  {
    title: "Restaurant Inventory Optimizer",
    description: "A computer vision system that tracks ingredient usage and waste in restaurant kitchens, predicting optimal ordering quantities and flagging expiring items to reduce food waste by 30%.",
  },
];

interface SavedIdea {
  id: string;
  description: string;
  createdAt: string;
  mode: "standard" | "advanced";
}
export default function Landing() {
  const navigate = useNavigate();
  const [idea, setIdea] = useState("");
  const [mode, setMode] = useState<"standard" | "advanced">("standard");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("write");
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>(() => {
    const stored = localStorage.getItem("savedIdeas");
    return stored ? JSON.parse(stored) : [];
  });

  const handleGenerate = () => {
    if (idea.trim()) {
      // Create new saved idea
      const newIdea: SavedIdea = {
        id: Date.now().toString(),
        description: idea,
        createdAt: new Date().toISOString(),
        mode,
      };

      const updatedIdeas = [newIdea, ...savedIdeas];
      setSavedIdeas(updatedIdeas);
      localStorage.setItem("savedIdeas", JSON.stringify(updatedIdeas));

      // Store the idea in sessionStorage for blueprint generation
      sessionStorage.setItem("productIdea", idea);
      sessionStorage.setItem("mode", mode);
      sessionStorage.setItem("currentIdeaId", newIdea.id);

      // Close dialog and navigate
      setIsDialogOpen(false);
      setIdea("");
      navigate("/blueprint");
    }
  };

  const selectExample = (description: string) => {
    setIdea(description);
    setActiveTab("write");
  };

  const viewIdea = (savedIdea: SavedIdea) => {
    sessionStorage.setItem("productIdea", savedIdea.description);
    sessionStorage.setItem("mode", savedIdea.mode);
    sessionStorage.setItem("currentIdeaId", savedIdea.id);
    navigate("/blueprint");
  };

  const deleteIdea = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedIdeas = savedIdeas.filter((idea) => idea.id !== id);
    setSavedIdeas(updatedIdeas);
    localStorage.setItem("savedIdeas", JSON.stringify(updatedIdeas));
  };

  const getIdeaTitle = (description: string) => {
    return description.substring(0, 80) + (description.length > 80 ? "..." : "");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">OperAIExecutionOS</h1>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Idea
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
              <div className="p-6 border-b border-gray-200">
                <DialogHeader>
                  <DialogTitle className="text-xl">Create Execution Blueprint</DialogTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Describe your product idea to generate a structured execution plan
                  </p>
                </DialogHeader>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
                <TabsList className="w-full justify-start border-b border-gray-200 rounded-none h-auto p-0 bg-transparent">
                  <TabsTrigger
                    value="write"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                  >
                    Write Idea
                  </TabsTrigger>
                  <TabsTrigger
                    value="examples"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Examples
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="write" className="p-6 mt-0 space-y-6 max-h-[calc(90vh-200px)] overflow-y-auto">
                  <div className="space-y-3">
                    <label htmlFor="idea-input" className="block text-sm font-medium text-gray-700">
                      Your Product Idea
                    </label>
                    <Textarea
                      id="idea-input"
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder="Describe your product in 1–3 sentences. Be specific about what it does, who it's for, and what makes it different."
                      className="min-h-[140px] text-base resize-none"
                      autoFocus
                    />
                    <p className="text-xs text-gray-500">
                      Tip: Include your target user, core problem, and key differentiator
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Analysis Mode</label>
                    <div className="space-y-2">
                      <div
                        onClick={() => setMode("standard")}
                        className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                          mode === "standard"
                            ? "border-indigo-600 bg-indigo-50 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                            mode === "standard"
                              ? "border-indigo-600"
                              : "border-gray-300"
                          }`}
                        >
                          {mode === "standard" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 mb-1">Standard Mode</div>
                          <p className="text-sm text-gray-600">
                            Core analysis with market reality, moat assessment, and execution blueprint
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg opacity-60 cursor-not-allowed">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">Advanced Stress Test</span>
                            <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded font-medium">
                              Premium
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Deep risk analysis, economic sensitivity, and "what could kill this" scenarios
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={handleGenerate}
                      disabled={!idea.trim()}
                      className="w-full h-12 text-base bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
                    >
                      Generate Blueprint
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="examples" className="p-6 mt-0 max-h-[calc(90vh-200px)] overflow-y-auto">
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 mb-4">
                      Click any example to use it as a starting point
                    </p>
                    {EXAMPLE_IDEAS.map((example, idx) => (
                      <button
                        key={idx}
                        onClick={() => selectExample(example.description)}
                        className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all group"
                      >
                        <div className="font-medium text-gray-900 mb-2 group-hover:text-indigo-700 flex items-center justify-between">
                          {example.title}
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                        </div>
                        <p className="text-sm text-gray-600">{example.description}</p>
                      </button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">My Ideas</h2>
            <p className="text-gray-600">
              Execution blueprints for your product concepts
            </p>
          </div>

          {savedIdeas.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No ideas yet</h3>
                <p className="text-gray-600 mb-6">
                  Start by creating your first execution blueprint
                </p>
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Idea
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedIdeas.map((savedIdea) => (
                <div
                  key={savedIdea.id}
                  onClick={() => viewIdea(savedIdea)}
                  className="border border-gray-200 rounded-lg p-5 hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 font-medium mb-1 line-clamp-2">
                        {getIdeaTitle(savedIdea.description)}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(savedIdea.createdAt)}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 flex-shrink-0" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {savedIdea.mode === "standard" ? "Standard" : "Advanced"}
                    </span>
                    <button
                      onClick={(e) => deleteIdea(savedIdea.id, e)}
                      className="p-1.5 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
