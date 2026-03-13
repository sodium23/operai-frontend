import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { ArrowRight, Plus, Trash2, ChevronRight, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface SavedIdea {
  id: string;
  description: string;
  createdAt: string;
  mode: "standard" | "advanced";
  blueprint: any;
}

export default function Landing() {

  const navigate = useNavigate();
  const [idea, setIdea] = useState("");
  const [mode, setMode] = useState<"standard" | "advanced">("standard");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>(() => {
    try {
      const stored = localStorage.getItem("savedIdeas");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleGenerate = async () => {

    if (!idea.trim()) return;

    setLoading(true);

    try {

      const response = await fetch("https://operai.onrender.com/operai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idea: idea
        })
      });

      const data = await response.json();

      if (data.mode === "insufficient_clarity") {
        alert(data.next_question);
        setLoading(false);
        return;
      }

      sessionStorage.setItem(
        "blueprintData",
        JSON.stringify(data.machine_schema)
      );

      // important: new idea should not behave as saved
      sessionStorage.removeItem("currentIdeaId");

      navigate("/blueprint");

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const viewIdea = (savedIdea: SavedIdea) => {

    if (!savedIdea.blueprint) return;

    sessionStorage.setItem(
      "blueprintData",
      JSON.stringify(savedIdea.blueprint)
    );

    sessionStorage.setItem(
      "currentIdeaId",
      savedIdea.id
    );

    navigate("/blueprint");
  };

  const deleteIdea = (id: string, e: React.MouseEvent) => {

    e.stopPropagation();

    const updatedIdeas = savedIdeas.filter((idea) => idea.id !== id);

    setSavedIdeas(updatedIdeas);

    localStorage.setItem(
      "savedIdeas",
      JSON.stringify(updatedIdeas)
    );
  };

  const getIdeaTitle = (description: string) => {
    return description.substring(0, 80) + (description.length > 80 ? "..." : "");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <header className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">OperAIExecutionOS</h1>

          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Idea
          </Button>
        </div>
      </header>

      <main className="flex-1 px-6 py-12">
        <div className="max-w-7xl mx-auto">

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              My Ideas
            </h2>
          </div>

          {savedIdeas.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">
                Start by creating your first execution blueprint
              </p>
            </div>
          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              {savedIdeas.map((savedIdea) => (

                <div
                  key={savedIdea.id}
                  onClick={() => viewIdea(savedIdea)}
                  className="border border-gray-200 rounded-lg p-5 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer group"
                >

                  <div className="flex items-start justify-between gap-3 mb-3">

                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 font-medium mb-1">
                        {getIdeaTitle(savedIdea.description)}
                      </p>

                      <p className="text-xs text-gray-500">
                        {formatDate(savedIdea.createdAt)}
                      </p>
                    </div>

                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {savedIdea.mode}
                    </span>

                    <button
                      onClick={(e) => deleteIdea(savedIdea.id, e)}
                      className="p-1.5 hover:bg-red-50 rounded"
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
