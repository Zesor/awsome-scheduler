"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Code2, Database, Sparkles, Copy, Check } from "lucide-react";

interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
  highlightedCode?: string;
}

type TabType = "basic" | "pro" | "backend";

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="absolute top-3 right-3 p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white z-10"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

interface SchedulerExamplesClientProps {
  basicHighlighted: CodeExample[];
  proHighlighted: CodeExample[];
  backendHighlighted: CodeExample[];
}

export function SchedulerExamplesClient({
  basicHighlighted,
  proHighlighted,
  backendHighlighted,
}: SchedulerExamplesClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("basic");
  const [selectedExample, setSelectedExample] = useState(0);

  const tabs = [
    { id: "basic" as TabType, label: "Basic", icon: Code2 },
    { id: "pro" as TabType, label: "Pro", icon: Sparkles },
    { id: "backend" as TabType, label: "Backend", icon: Database },
  ];

  const examples =
    activeTab === "basic"
      ? basicHighlighted
      : activeTab === "pro"
      ? proHighlighted
      : backendHighlighted;

  // Reset selection when tab changes
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedExample(0);
  };

  return (
    <div className="border border-b-0">
      {/* Header */}
      <div className="p-6 md:p-10 text-center border-b">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-balance">
          Easy to Integrate
        </h2>
        <p className="mt-4 text-muted-foreground text-balance max-w-2xl mx-auto">
          Copy-paste ready code examples. Works with any React framework and
          backend.
        </p>

        {/* Tab Selector */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center rounded-full border p-1.5 bg-muted/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "relative px-4 md:px-6 py-2.5 text-sm font-medium transition-colors rounded-full flex items-center gap-2",
                  activeTab === tab.id
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-3">
        {/* Sidebar - Example List */}
        <div className="md:col-span-1 border-b md:border-b-0 md:border-r bg-muted/30">
          <div className="p-4 space-y-2">
            {examples.map((example, index) => (
              <button
                key={example.id}
                onClick={() => setSelectedExample(index)}
                className={cn(
                  "w-full text-left p-4 rounded-lg border transition-all",
                  selectedExample === index
                    ? "bg-background border-primary/50 shadow-sm"
                    : "border-transparent hover:bg-background/50"
                )}
              >
                <h3 className="font-medium text-sm">{example.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {example.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Code Display */}
        <div className="md:col-span-2 relative">
          <CopyButton code={examples[selectedExample]?.code || ""} />
          <div
            className="bg-[#0d1117] font-mono text-sm [&>pre]:!bg-transparent [&>pre]:p-4 [&_code]:break-all overflow-auto max-h-[500px]"
            dangerouslySetInnerHTML={{
              __html: examples[selectedExample]?.highlightedCode || "",
            }}
          />
        </div>
      </div>
    </div>
  );
}
