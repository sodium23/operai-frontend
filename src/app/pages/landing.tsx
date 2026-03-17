import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Plus, Trash2, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface SavedIdea {
  id: string;
  description: string;
  createdAt: string;
  mode: "standard" | "advanced";
  blueprint?: any;
}

const EXAMPLE_IDEAS = [
  {
    title: "AI-Powered Freelance Marketplace",
    description: "A platform that connects freelance designers with startups needing on-demand brand work.",
  },
  {
    title: "B2B Sales Intelligence Tool",
    description: "A Chrome extension that analyzes LinkedIn profiles and provides sales insights.",
  }
];

export default function Landing() {
  console.log("REAL LANDING RUNNING");

  const navigate = useNavigate();
  const [idea, setIdea] = useState("");
  const [mode, setMode] = useState<"standard" | "advanced">("standard");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("write");

  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>(() => {
    const stored = localStorage.getItem("savedIdeas");
    return stored ? JSON.parse(stored) : [];
  });

  const handleGenerate = async () => {
    if (!idea.trim()) return;

    setLoading(true);

    try {
      // ✅ MOCK DATA (no API call)
      const data = {
        machine_schema: {
          idea_interpretation: {
            summary: "Mock idea summary",
            coreValue: "Mock value",
            targetUser: "Users",
            keyAssumptions: []
          },
          market_reality: {
            marketSize: "Large",
            competitors: [],
            trends: [],
            risks: []
          }
        }
      };

      console.log("MOCK RESPONSE:", data.machine_schema);

      // Save for blueprint page
      sessionStorage.setItem(
        "blueprintData",
        JSON.stringify(data.machine_schema)
      );

      // Save idea locally
      const newIdea = {
        id: Date.now().toString(),
        description: idea,
        createdAt: new Date().toISOString(),
        mode,
        blueprint: data.machine_schema
      };

      const updatedIdeas = [newIdea, ...savedIdeas];
      setSavedIdeas(updatedIdeas);
      localStorage.setItem("savedIdeas", JSON.stringify(updatedIdeas));

      navigate("/blueprint");

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const viewIdea = (savedIdea: SavedIdea) => {
    if (savedIdea.blueprint) {
      sessionStorage.setItem(
        "blueprintData",
        JSON.stringify(savedIdea.blueprint)
      );
    }
    window.location.href = "/blueprint";
  };

  const deleteIdea = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedIdeas.filter((i) => i.id !== id);
    setSavedIdeas(updated);
    localStorage.setItem("savedIdeas", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b px-6 py-4 flex justify-between">
        <h1 className="text-xl font-semibold">OperAIExecutionOS</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Idea
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Execution Blueprint</DialogTitle>
            </DialogHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="write">Write</TabsTrigger>
                <TabsTrigger value="examples">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Examples
                </TabsTrigger>
              </TabsList>

              <TabsContent value="write">
                <Textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Describe your idea..."
                />

                <Button
                  onClick={handleGenerate}
                  disabled={!idea.trim() || loading}
                  className="mt-4 w-full"
                >
                  {loading ? "Generating..." : "Generate Blueprint"}
                </Button>
              </TabsContent>

              <TabsContent value="examples">
                {EXAMPLE_IDEAS.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => setIdea(ex.description)}
                    className="block w-full text-left p-2 border mb-2"
                  >
                    {ex.title}
                  </button>
                ))}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </header>

      <main className="p-6">
        {savedIdeas.length === 0 ? (
          <p>No ideas yet</p>
        ) : (
          <div className="grid gap-4">
            {savedIdeas.map((item) => (
              <div
                key={item.id}
                onClick={() => viewIdea(item)}
                className="border p-4 cursor-pointer flex justify-between"
              >
                <div>
                  <p>{item.description}</p>
                </div>

                <button onClick={(e) => deleteIdea(item.id, e)}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
