import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, Trash2, Pencil, Download } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ImageData {
  id: string;
  title: string;
  category: "Nature" | "Architecture" | "Food";
  src: string;
}

interface Group {
  id: string;
  name: string;
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  badgeBg: string;
}

const GROUPS: Group[] = [
  {
    id: "g1",
    name: "Group A",
    color: "#2d6a4f",
    bgClass: "bg-[#2d6a4f]",
    borderClass: "border-[#2d6a4f]",
    textClass: "text-[#2d6a4f]",
    badgeBg: "bg-[#2d6a4f]",
  },
  {
    id: "g2",
    name: "Group B",
    color: "#b5451b",
    bgClass: "bg-[#b5451b]",
    borderClass: "border-[#b5451b]",
    textClass: "text-[#b5451b]",
    badgeBg: "bg-[#b5451b]",
  },
  {
    id: "g3",
    name: "Group C",
    color: "#4a3f8f",
    bgClass: "bg-[#4a3f8f]",
    borderClass: "border-[#4a3f8f]",
    textClass: "text-[#4a3f8f]",
    badgeBg: "bg-[#4a3f8f]",
  },
];

const IMAGES: ImageData[] = [
  { id: "n1", title: "Mountain Sunrise", category: "Nature", src: "/images/nature-1.png" },
  { id: "n2", title: "Deep Forest", category: "Nature", src: "/images/nature-2.png" },
  { id: "n3", title: "Ocean Waves", category: "Nature", src: "/images/nature-3.png" },
  { id: "n4", title: "Desert Dunes", category: "Nature", src: "/images/nature-4.png" },
  { id: "a1", title: "Glass Tower", category: "Architecture", src: "/images/arch-1.png" },
  { id: "a2", title: "Brutalist Concrete", category: "Architecture", src: "/images/arch-2.png" },
  { id: "a3", title: "Gothic Arches", category: "Architecture", src: "/images/arch-3.png" },
  { id: "a4", title: "Modern Home", category: "Architecture", src: "/images/arch-4.png" },
  { id: "f1", title: "Fresh Pasta", category: "Food", src: "/images/food-1.png" },
  { id: "f2", title: "Sushi Roll", category: "Food", src: "/images/food-2.png" },
  { id: "f3", title: "Artisan Bread", category: "Food", src: "/images/food-3.jpg" },
  { id: "f4", title: "Pour Over Coffee", category: "Food", src: "/images/food-4.jpg" },
];

type SelectionState = Record<string, Set<string>>;

const initialSelection = (): SelectionState =>
  Object.fromEntries(GROUPS.map((g) => [g.id, new Set<string>()]));

export default function Home() {
  const [selections, setSelections] = useState<SelectionState>(initialSelection);
  const [activeGroupId, setActiveGroupId] = useState<string>(GROUPS[0].id);
  const [groupNames, setGroupNames] = useState<Record<string, string>>(
    Object.fromEntries(GROUPS.map((g) => [g.id, g.name]))
  );
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  const activeGroup = GROUPS.find((g) => g.id === activeGroupId)!;
  const activeGroupName = groupNames[activeGroupId];

  const startEditing = (groupId: string) => {
    setEditingGroupId(groupId);
    setEditDraft(groupNames[groupId]);
    setTimeout(() => editInputRef.current?.select(), 0);
  };

  const commitEdit = () => {
    if (editingGroupId) {
      const trimmed = editDraft.trim();
      if (trimmed) {
        setGroupNames((prev) => ({ ...prev, [editingGroupId]: trimmed }));
      }
      setEditingGroupId(null);
    }
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") setEditingGroupId(null);
  };

  const toggleImage = (imageId: string) => {
    setSelections((prev) => {
      const groupSet = new Set(prev[activeGroupId]);
      if (groupSet.has(imageId)) {
        groupSet.delete(imageId);
      } else {
        groupSet.add(imageId);
      }
      return { ...prev, [activeGroupId]: groupSet };
    });
  };

  const clearGroup = (groupId: string) => {
    setSelections((prev) => ({ ...prev, [groupId]: new Set() }));
  };

  const clearAll = () => setSelections(initialSelection());

  const exportSelections = () => {
    const lines: string[] = [];
    GROUPS.forEach((g) => {
      const selected = IMAGES.filter((img) => selections[g.id].has(img.id));
      if (selected.length === 0) return;
      lines.push(groupNames[g.id].toUpperCase());
      lines.push("─".repeat(groupNames[g.id].length));
      selected.forEach((img, i) => {
        lines.push(`${String(i + 1).padStart(2, "0")}. ${img.title}`);
      });
      lines.push("");
    });
    if (lines.length === 0) return;
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mood-board-selections.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getImageGroups = (imageId: string): Group[] =>
    GROUPS.filter((g) => selections[g.id].has(imageId));

  const totalSelected = GROUPS.reduce((sum, g) => sum + selections[g.id].size, 0);

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-border bg-card flex flex-col z-10 shrink-0 shadow-sm md:shadow-none">
        <div className="p-6 md:p-8 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground" data-testid="text-title">
            Mood Board
          </h1>
          <p className="text-sm text-muted-foreground">Assign images to groups, then see each group's list.</p>
        </div>

        <Separator />

        {/* Active group switcher */}
        <div className="px-6 md:px-8 pt-5 pb-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Active Group
            </span>
            {totalSelected > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={exportSelections}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="button-export"
                  title="Download selections as .txt"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
                <button
                  onClick={clearAll}
                  className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                  data-testid="button-clear-all"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {GROUPS.map((g) => {
              const isActive = g.id === activeGroupId;
              const count = selections[g.id].size;
              return (
                <button
                  key={g.id}
                  onClick={() => setActiveGroupId(g.id)}
                  data-testid={`button-group-${g.id}`}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 border-2 flex flex-col items-center gap-0.5
                    ${isActive
                      ? `${g.borderClass} text-white`
                      : "border-transparent bg-muted/60 text-muted-foreground hover:bg-muted"
                    }`}
                  style={isActive ? { backgroundColor: g.color } : {}}
                >
                  <span className="truncate max-w-full">{groupNames[g.id]}</span>
                  <span className={`font-mono text-[10px] ${isActive ? "opacity-80" : ""}`}>
                    {count} item{count !== 1 ? "s" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Per-group selection output */}
        <ScrollArea className="flex-1 pb-8">
          <div className="px-6 md:px-8 pt-4 flex flex-col gap-6">
            {GROUPS.map((g) => {
              const selectedImages = IMAGES.filter((img) => selections[g.id].has(img.id));
              return (
                <div key={g.id} data-testid={`section-group-${g.id}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: g.color }}
                      />
                      {editingGroupId === g.id ? (
                        <input
                          ref={editInputRef}
                          value={editDraft}
                          onChange={(e) => setEditDraft(e.target.value)}
                          onBlur={commitEdit}
                          onKeyDown={handleEditKeyDown}
                          className="text-xs font-semibold uppercase tracking-wider bg-transparent border-b outline-none flex-1 min-w-0"
                          style={{ color: g.color, borderColor: g.color }}
                          maxLength={24}
                          data-testid={`input-rename-${g.id}`}
                        />
                      ) : (
                        <button
                          className="flex items-center gap-1.5 group/rename min-w-0"
                          onClick={() => startEditing(g.id)}
                          data-testid={`button-rename-${g.id}`}
                          title="Click to rename"
                        >
                          <span className="text-xs font-semibold uppercase tracking-wider truncate" style={{ color: g.color }}>
                            {groupNames[g.id]}
                          </span>
                          <Pencil
                            className="w-3 h-3 shrink-0 opacity-0 group-hover/rename:opacity-60 transition-opacity"
                            style={{ color: g.color }}
                          />
                        </button>
                      )}
                    </div>
                    {selectedImages.length > 0 && (
                      <button
                        onClick={() => clearGroup(g.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        data-testid={`button-clear-group-${g.id}`}
                        aria-label={`Clear ${groupNames[g.id]}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <AnimatePresence mode="popLayout">
                    {selectedImages.length === 0 ? (
                      <motion.p
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-muted-foreground/60 italic pl-4"
                        data-testid={`text-empty-${g.id}`}
                      >
                        No images yet
                      </motion.p>
                    ) : (
                      <ul className="space-y-0.5 pl-4">
                        {selectedImages.map((img, i) => (
                          <motion.li
                            key={img.id}
                            layout
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8, transition: { duration: 0.15 } }}
                            className="flex items-center gap-2 py-1 group"
                            data-testid={`list-item-${g.id}-${img.id}`}
                          >
                            <span className="text-[10px] font-mono text-muted-foreground/40 w-4 shrink-0">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm text-foreground font-medium flex-1 leading-tight">
                              {img.title}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </aside>

      {/* Main image grid */}
      <main className="flex-1 h-full overflow-y-auto bg-background/50">
        <div className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto">
          {/* Active group indicator bar */}
          <div
            className="mb-8 flex items-center gap-3 px-4 py-3 rounded-xl text-white text-sm font-semibold transition-colors duration-300"
            style={{ backgroundColor: activeGroup.color }}
            data-testid="text-active-group-bar"
          >
            <Plus className="w-4 h-4 opacity-80" />
            <span>Clicking images will add them to <strong>{activeGroupName}</strong></span>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
          >
            {IMAGES.map((img) => {
              const imageGroups = getImageGroups(img.id);
              const isInActiveGroup = selections[activeGroupId].has(img.id);

              return (
                <motion.button
                  key={img.id}
                  onClick={() => toggleImage(img.id)}
                  className="group relative flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl rounded-b-none"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 300, damping: 24 },
                    },
                  }}
                  data-testid={`card-image-${img.id}`}
                  aria-pressed={isInActiveGroup}
                >
                  <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-muted shadow-sm transition-all duration-300 ease-out">
                    <img
                      src={img.src}
                      alt={img.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isInActiveGroup ? "scale-105" : "group-hover:scale-105"
                      }`}
                      loading="lazy"
                    />

                    {/* Active-group tint overlay */}
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        backgroundColor: activeGroup.color,
                        opacity: isInActiveGroup ? 0.18 : 0,
                      }}
                    />

                    {/* Active-group border */}
                    <div
                      className={`absolute inset-0 border-4 rounded-xl transition-all duration-300 z-10 ${
                        isInActiveGroup ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                      }`}
                      style={{ borderColor: activeGroup.color }}
                    />

                    {/* Checkmark for active group */}
                    <AnimatePresence>
                      {isInActiveGroup && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className="absolute top-3 right-3 z-20 text-white p-1.5 rounded-full shadow-md"
                          style={{ backgroundColor: activeGroup.color }}
                        >
                          <Check className="w-4 h-4" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Group membership dots (all groups) */}
                    {imageGroups.length > 0 && (
                      <div className="absolute bottom-3 left-3 z-20 flex gap-1.5">
                        {imageGroups.map((g) => (
                          <motion.span
                            key={g.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="inline-block w-2.5 h-2.5 rounded-full shadow ring-2 ring-white/60"
                            style={{ backgroundColor: g.color }}
                            title={g.name}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Title & category */}
                  <div className="mt-3 flex flex-col">
                    <span
                      className="text-sm font-semibold transition-colors duration-300"
                      style={{ color: isInActiveGroup ? activeGroup.color : undefined }}
                    >
                      {img.title}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono tracking-wide mt-0.5">
                      {img.category}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
