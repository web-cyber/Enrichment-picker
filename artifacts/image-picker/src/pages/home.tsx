import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ImageData {
  id: string;
  title: string;
  category: "Nature" | "Architecture" | "Food";
  src: string;
}

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

export default function Home() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const clearAll = () => setSelectedIds(new Set());

  const selectedImages = IMAGES.filter((img) => selectedIds.has(img.id));

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Sidebar: Selection Output */}
      <aside className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-border bg-card flex flex-col z-10 shrink-0 shadow-sm md:shadow-none">
        <div className="p-6 md:p-8 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground" data-testid="text-title">Mood Board</h1>
          <p className="text-sm text-muted-foreground">Select images to build your collection.</p>
        </div>

        <Separator />

        <div className="px-6 md:px-8 py-4 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {selectedIds.size} Selected
          </span>
          {selectedIds.size > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
              data-testid="button-clear-all"
            >
              Clear all
            </Button>
          )}
        </div>

        <ScrollArea className="flex-1 px-6 md:px-8 pb-8">
          <AnimatePresence mode="popLayout">
            {selectedImages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted/50 text-muted-foreground mb-4">
                  <span className="text-xl font-serif italic">?</span>
                </div>
                <p className="text-sm text-muted-foreground" data-testid="text-empty-state">No images selected yet.</p>
              </motion.div>
            ) : (
              <ul className="space-y-1 font-mono text-sm">
                {selectedImages.map((img, i) => (
                  <motion.li
                    key={img.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10, transition: { duration: 0.2 } }}
                    className="flex items-start py-2 group cursor-pointer"
                    onClick={() => toggleSelection(img.id)}
                    data-testid={`list-item-${img.id}`}
                  >
                    <span className="text-muted-foreground/50 w-6 shrink-0 mt-0.5 select-none">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-foreground font-medium group-hover:line-through decoration-muted-foreground/40 transition-all">{img.title}</span>
                    <button className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity" data-testid={`button-remove-${img.id}`}>
                      <X className="w-4 h-4" />
                    </button>
                  </motion.li>
                ))}
              </ul>
            )}
          </AnimatePresence>
        </ScrollArea>
      </aside>

      {/* Main Content: Image Grid */}
      <main className="flex-1 h-full overflow-y-auto bg-background/50">
        <div className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            {IMAGES.map((img) => {
              const isSelected = selectedIds.has(img.id);
              return (
                <motion.button
                  key={img.id}
                  onClick={() => toggleSelection(img.id)}
                  className="group relative flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl rounded-b-none"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                  }}
                  data-testid={`card-image-${img.id}`}
                  aria-pressed={isSelected}
                >
                  <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-muted shadow-sm transition-all duration-300 ease-out">
                    {/* Image */}
                    <img
                      src={img.src}
                      alt={img.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${isSelected ? "scale-105" : "group-hover:scale-105"}`}
                      loading="lazy"
                    />
                    
                    {/* Dark Overlay when not selected, to make the checkmark pop on selection, or vice versa? Let's do a white semi-transparent overlay when selected for a "dimmed out / picked" look, or a subtle dark gradient. */}
                    <div className={`absolute inset-0 transition-colors duration-300 ${isSelected ? "bg-primary/20" : "bg-black/0 group-hover:bg-black/5"}`} />

                    {/* Border highlight */}
                    <div className={`absolute inset-0 border-4 rounded-xl transition-colors duration-300 z-10 ${isSelected ? "border-primary" : "border-transparent"}`} />
                    
                    {/* Checkmark Badge */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className="absolute top-4 right-4 z-20 bg-primary text-primary-foreground p-1.5 rounded-full shadow-md"
                        >
                          <Check className="w-5 h-5" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Title & Category below */}
                  <div className="mt-3 flex flex-col">
                    <span className={`text-sm font-semibold transition-colors duration-300 ${isSelected ? "text-primary" : "text-foreground"}`}>
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
