import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, Trash2, Pencil, Download, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import animalExtract from "@assets/Animal_extract_1778984933920.jpeg";
import cardboard from "@assets/Cardboard_1778988783970.jpeg";
import paper from "@assets/Paper_1778988783970.jpeg";
import shreddedPaper from "@assets/Shredded_paper_1778988783970.jpeg";
import wrappingPaper from "@assets/wrapping_paper_1778988783970.webp";
import asapMirror from "@assets/ASAP_Mirror_1778982473519.jpeg";
import bamboo from "@assets/Bamboo_1778984933920.jpeg";
import browse from "@assets/Browse_1778984933921.jpeg";
import coconutHusk from "@assets/Coconut_husk_1778984933921.jpeg";
import feather from "@assets/feather_1778984933921.jpeg";
import finePine from "@assets/Fine_pine_1778984933921.jpeg";
import fur from "@assets/Fur_1778984933921.jpeg";
import mulch from "@assets/Mulch_1778984933921.webp";
import orchardGrass from "@assets/Orchard_grass_1778984933922.jpeg";
import sand from "@assets/Sand_1778984933922.jpeg";
import seasoning from "@assets/seasoning_1778984933922.jpeg";
import stone from "@assets/Stone_1778984933922.jpeg";
import straw from "@assets/Straw_1778984933922.jpeg";
import bubbleBlower from "@assets/Bubble_blower_1778984271023.jpeg";
import bubbles from "@assets/Bubbles_1778984271023.webp";
import chalk from "@assets/Chalk_1778984271023.jpeg";
import laserProjector from "@assets/Laser_projector_1778984271023.avif";
import oilScent from "@assets/Oil_scent_1778984271024.webp";
import paint from "@assets/Paint_1778984271024.jpeg";
import perfume from "@assets/Perfume_1778984271024.webp";
import radio from "@assets/Radio_1778984271024.jpeg";
import babyToy from "@assets/Baby_toy_1778981977996.jpeg";
import bell from "@assets/Bell_1778982473519.jpeg";
import bingoBall from "@assets/Bingo_Ball_1778982473519.png";
import caitecBaffleCage from "@assets/Caitec_Baffle_Cage_1778982473519.jpeg";
import caitecKabob from "@assets/Caitec_Stainless_Steel_Kabob_1778982473520.jpeg";
import greensFeeder from "@assets/Greens_Feeder_1778982473520.jpeg";
import key from "@assets/Key_1778982473520.jpeg";
import reflectiveSensoryBalls from "@assets/Reflective_Sensory_Balls_1778982473520.webp";
import spool from "@assets/Spool_1778982473520.jpeg";
import ssForagingTray from "@assets/Stainless_Steel_Foraging_Tray_1778982473521.jpeg";
import ssPrimateSpinner from "@assets/Stainless_Steel_Primate_Spinner_1778982473521.png";
import ssRoundRattle from "@assets/Stainless_Steel_Round_Rattle_1778982473521.jpeg";
import suetCage from "@assets/Suet_cage_bird_feeder_1778982473521.webp";
import treeFeeder from "@assets/Tree_Feeder_1778982473521.jpeg";
import windSpinner from "@assets/Wind_Spinner_1778982473521.jpeg";
import burlap from "@assets/Burlap_1778980494279.jpeg";
import elevatedDogBed from "@assets/Elevated_Dog_Bed_1778980494279.webp";
import firehose from "@assets/Firehose_1778980494279.jpeg";
import gorillaBusterBungee from "@assets/Gorilla_Buster_Bungee_1778980494280.jpeg";
import hammock from "@assets/Hammock_1778980494280.jpeg";
import nibblenet from "@assets/Nibblenet_1778980494280.webp";
import cottonPyramidSwing from "@assets/Cotton_pyramid_swing_1778978075047.webp";
import cottonRopeBoing from "@assets/Cotton_rope_boing_toy_1778978075047.webp";
import fabricHammock from "@assets/Fabric_hammock_1778978075047.jpeg";
import fabricTunnel from "@assets/Fabric_tunnel_1778978075048.jpeg";
import gibbonSwing from "@assets/Gibbon_Swing_1778978075048.jpeg";
import jollyPetsRomp from "@assets/Jolly_Pets_Romp-N-Roll_1778978075048.webp";
import ropeImg from "@assets/Rope_1778978075048.jpeg";
import stuffedAnimal from "@assets/Stuffed_animal_1778978075048.jpeg";

const IMAGE_SRCS: Record<string, string> = {
  "Animal extract": animalExtract,
  "Cardboard": cardboard,
  "Paper": paper,
  "Shredded paper": shreddedPaper,
  "Wrapping paper": wrappingPaper,
  "ASAP Mirror": asapMirror,
  "Bamboo": bamboo,
  "Browse": browse,
  "Coconut husk": coconutHusk,
  "Feather": feather,
  "Fine pine": finePine,
  "Fur": fur,
  "Mulch": mulch,
  "Orchard grass": orchardGrass,
  "Sand": sand,
  "Seasoning": seasoning,
  "Stone": stone,
  "Straw": straw,
  "Bubble blower": bubbleBlower,
  "Bubbles": bubbles,
  "Chalk": chalk,
  "Laser projector": laserProjector,
  "Oil scent": oilScent,
  "Paint": paint,
  "Perfume": perfume,
  "Radio": radio,
  "Baby toy": babyToy,
  "Bell": bell,
  "Bingo Ball": bingoBall,
  "Caitec Baffle Cage": caitecBaffleCage,
  "Caitec Stainless Steel Kabob": caitecKabob,
  "Greens Feeder": greensFeeder,
  "Key": key,
  "Reflective Sensory Balls": reflectiveSensoryBalls,
  "Spool": spool,
  "Stainless Steel Foraging Tray": ssForagingTray,
  "Stainless Steel Primate Spinner": ssPrimateSpinner,
  "Stainless Steel Round Rattle": ssRoundRattle,
  "Suet cage bird feeder": suetCage,
  "Tree Feeder": treeFeeder,
  "Wind Spinner": windSpinner,
  "Burlap": burlap,
  "Elevated Dog Bed": elevatedDogBed,
  "Firehose": firehose,
  "Gorilla Buster Bungee": gorillaBusterBungee,
  "Hammock": hammock,
  "Nibblenet": nibblenet,
  "Cotton pyramid swing": cottonPyramidSwing,
  "Cotton rope boing toy": cottonRopeBoing,
  "Fabric hammock": fabricHammock,
  "Fabric tunnel": fabricTunnel,
  "Gibbon Swing": gibbonSwing,
  "Jolly Pets Romp-N-Roll": jollyPetsRomp,
  "Rope": ropeImg,
  "Stuffed animal": stuffedAnimal,
};

interface ImageData {
  id: string;
  title: string;
  category: string;
  src: string;
}

interface Group {
  id: string;
  name: string;
  color: string;
}

const COLOR_PALETTE = [
  "#2d6a4f", "#b5451b", "#4a3f8f", "#9b2335", "#1a6b7c",
  "#7b5ea7", "#c47c1b", "#2e6b8a", "#5c6b1a", "#8b3a62",
  "#3a5f8a", "#6b4f1a",
];

const CATEGORY_COLORS: Record<string, string> = {
  "Fabric":          "#7c5c3a",
  "Rope":            "#5a7a3a",
  "Strong Fabric":   "#3a5a7a",
  "Soft Fabric":     "#7a3a5a",
  "Metal":           "#4a5a6a",
  "Miscellaneous":   "#6a4a7a",
  "Natural Material":"#3a6a4a",
  "Paper":           "#5a4a3a",
  "Plastic":         "#3a6a7a",
  "Hard Plastic":    "#2a4a6a",
  "Soft Plastic":    "#4a6a5a",
  "Rubber":          "#6a3a3a",
  "Hard Rubber":     "#5a3a2a",
  "Soft Rubber":     "#3a5a4a",
  "Wood":            "#6a5a2a",
};

const DEFAULT_GROUPS: Group[] = [
  { id: "g1", name: "Group A", color: COLOR_PALETTE[0] },
  { id: "g2", name: "Group B", color: COLOR_PALETTE[1] },
  { id: "g3", name: "Group C", color: COLOR_PALETTE[2] },
];

function makeItems(category: string, names: string[]): ImageData[] {
  const prefix = category.toLowerCase().replace(/\s+/g, "-").slice(0, 6);
  return names.map((title, i) => ({
    id: `${prefix}-${i}`,
    title,
    category,
    src: IMAGE_SRCS[title] ?? "",
  }));
}

const IMAGES: ImageData[] = [
  ...makeItems("Fabric", [
    "Cotton pyramid swing", "Cotton rope boing toy", "Fabric tunnel", "Fabric hammock",
    "Stuffed animal", "Gibbon Swing", "Jolly Pets Romp-N-Roll", "Rope",
  ]),
  ...makeItems("Rope", []),
  ...makeItems("Strong Fabric", [
    "Hammock", "Nibblenet", "Gorilla Buster Bungee", "Elevated Dog Bed", "Firehose", "Burlap",
  ]),
  ...makeItems("Burlap", []),
  ...makeItems("Soft Fabric", [
    "Baby toy",
  ]),
  ...makeItems("Metal", [
    "ASAP Mirror", "Bell", "Bingo Ball", "Caitec Baffle Cage", "Caitec Stainless Steel Kabob",
    "Greens Feeder", "Key", "Reflective Sensory Balls", "Stainless Steel Foraging Tray",
    "Stainless Steel Primate Spinner", "Stainless Steel Round Rattle", "Suet cage bird feeder",
    "Spool", "Tree Feeder", "Wind Spinner",
  ]),
  ...makeItems("Miscellaneous", [
    "Oil scent", "Perfume", "Laser projector", "Radio", "Bubble blower",
    "Paint", "Bubbles", "Chalk",
  ]),
  ...makeItems("Natural Material", [
    "Seasoning", "Feather", "Fur", "Stone", "Browse", "Coconut husk",
    "Fine pine", "Mulch", "Orchard grass", "Straw", "Sand", "Animal extract", "Bamboo",
  ]),
  ...makeItems("Paper", [
    "Cardboard", "Paper", "Shredded paper", "Wrapping paper",
  ]),
  ...makeItems("Plastic", [
    "Foraging cups", "Astroturf", "Bird feeder", "Featherland Paradise Push and Pull",
    "Foraging Wheel Bird Toy", "Grass Drying Rack", "Hayball Enrichment Feeder",
    "Heart to Tail Pet Feeder", "Kiddie pool", "Lickin' layers dog puzzle", "Lixit",
    "No spill kennel cup", "Pet Gravity Waterer", "Plastic bird toy", "Post Scratcher",
    "Table top stand", "Trixie turn around", "Crate", "Lawn sprinkler", "Animal Decoys", "Astro Tube",
  ]),
  ...makeItems("Hard Plastic", [
    "Animal Cap Feeder", "Collapsible Ladder", "4 Tube Feeder", "Amazing Graze",
    "Boomer Ball Bobbin", "Bullet Feeder", "Caitec Fillable Bird Ball", "Cat Toy",
    "Catch Interactive Feeder", "Crumble Disk Holder", "Foraging Ball", "Foraging Feeder",
    "Hanging Foraging Ball", "Hanging Snack Ball", "Hay Play Feeder", "Holey Moley",
    "Honeycomb", "Jolly Pets Teaser Ball", "Kong Wobblers", "Likit Snak A Ball",
    "Milkcrate", "Mini plastic feeder", "Naturalistic Log Feeder", "Otto Bullet Feeder",
    "Plastic Tub", "Plastic Tunnel", "Prima-forager", "Primate foraging unit",
    "Puzzle feeder", "PVC", "Rocky Lou Feeder", "Saurus Egg", "Scent Ball",
    "Shake-A-Treat", "Shroom Room", "Slide", "Slow feeder", "Snack Shack",
    "Target", "Test tube rack", "Trough", "Water jug", "Water pan",
    "Wobble Ball", "Zoo Hanging Food Ball", "Bucket",
  ]),
  ...makeItems("Soft Plastic", [
    "Plastic egg", "Foam",
  ]),
  ...makeItems("Rubber", [
    "Hol-ee Roller", "Jolly Pets Tug-n-Toss", "Otto Pinecone Forager", "TireBiter with Chain",
  ]),
  ...makeItems("Hard Rubber", [
    "Busy Buddy Twist-N-Treat", "Kong", "Quest forager flower", "Rubber Water Tub",
  ]),
  ...makeItems("Soft Rubber", [
    "Silicone slow feeder",
  ]),
  ...makeItems("Wood", [
    "Basket", "Ladder", "Nest Box", "Perch", "Latchboard", "Paintbrush", "Xylophone",
  ]),
];

const ALL_CATEGORIES = Array.from(new Set(IMAGES.map((img) => img.category)));

type SelectionState = Record<string, Set<string>>;

let groupCounter = DEFAULT_GROUPS.length;

function ItemCard({ img, isInActiveGroup, activeGroup, imageGroups }: {
  img: ImageData;
  isInActiveGroup: boolean;
  activeGroup: Group;
  imageGroups: Group[];
}) {
  const bgColor = CATEGORY_COLORS[img.category] ?? "#4a5a6a";
  const initials = img.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-muted shadow-sm transition-all duration-300 ease-out"
      style={{ backgroundColor: bgColor }}>
      {img.src ? (
        <img
          src={img.src}
          alt={img.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isInActiveGroup ? "scale-105" : "group-hover:scale-105"
          }`}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center px-3 gap-1">
          <span className="text-white/30 text-3xl font-bold font-mono select-none">{initials}</span>
        </div>
      )}

      {/* Active-group tint overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ backgroundColor: activeGroup.color, opacity: isInActiveGroup ? 0.28 : 0 }}
      />

      {/* Active-group border */}
      <div
        className={`absolute inset-0 border-4 rounded-xl transition-all duration-300 z-10 ${
          isInActiveGroup ? "opacity-100" : "opacity-0 group-hover:opacity-40"
        }`}
        style={{ borderColor: activeGroup.color }}
      />

      {/* Checkmark */}
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

      {/* Group membership dots */}
      {imageGroups.length > 0 && (
        <div className="absolute bottom-3 left-3 z-20 flex gap-1.5">
          {imageGroups.map((g) => (
            <span
              key={g.id}
              className="inline-block w-2.5 h-2.5 rounded-full shadow ring-2 ring-white/40"
              style={{ backgroundColor: g.color }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [groups, setGroups] = useState<Group[]>(DEFAULT_GROUPS);
  const [selections, setSelections] = useState<SelectionState>(
    Object.fromEntries(DEFAULT_GROUPS.map((g) => [g.id, new Set<string>()]))
  );
  const [activeGroupId, setActiveGroupId] = useState<string>(DEFAULT_GROUPS[0].id);
  const [groupNames, setGroupNames] = useState<Record<string, string>>(
    Object.fromEntries(DEFAULT_GROUPS.map((g) => [g.id, g.name]))
  );
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  const activeGroup = groups.find((g) => g.id === activeGroupId) ?? groups[0];
  const activeGroupName = groupNames[activeGroup.id] ?? activeGroup.name;

  const [filterCategory, setFilterCategory] = useState<string>("All");
  const filteredImages =
    filterCategory === "All"
      ? IMAGES
      : IMAGES.filter((img) => img.category === filterCategory);

  const addGroup = () => {
    groupCounter += 1;
    const newId = `g${Date.now()}`;
    const colorIndex = groupCounter % COLOR_PALETTE.length;
    const label = String.fromCharCode(64 + groupCounter);
    const newGroup: Group = { id: newId, name: `Group ${label}`, color: COLOR_PALETTE[colorIndex] };
    setGroups((prev) => [...prev, newGroup]);
    setSelections((prev) => ({ ...prev, [newId]: new Set() }));
    setGroupNames((prev) => ({ ...prev, [newId]: newGroup.name }));
    setActiveGroupId(newId);
  };

  const deleteGroup = (groupId: string) => {
    if (groups.length <= 1) return;
    const remaining = groups.filter((g) => g.id !== groupId);
    setGroups(remaining);
    setSelections((prev) => { const n = { ...prev }; delete n[groupId]; return n; });
    setGroupNames((prev) => { const n = { ...prev }; delete n[groupId]; return n; });
    if (activeGroupId === groupId) setActiveGroupId(remaining[0]?.id ?? "");
  };

  const startEditing = (groupId: string) => {
    setEditingGroupId(groupId);
    setEditDraft(groupNames[groupId] ?? "");
    setTimeout(() => editInputRef.current?.select(), 0);
  };

  const commitEdit = () => {
    if (editingGroupId) {
      const trimmed = editDraft.trim();
      if (trimmed) setGroupNames((prev) => ({ ...prev, [editingGroupId]: trimmed }));
      setEditingGroupId(null);
    }
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") setEditingGroupId(null);
  };

  const toggleImage = (imageId: string) => {
    setSelections((prev) => {
      const s = new Set(prev[activeGroupId]);
      if (s.has(imageId)) s.delete(imageId); else s.add(imageId);
      return { ...prev, [activeGroupId]: s };
    });
  };

  const clearGroup = (groupId: string) => setSelections((prev) => ({ ...prev, [groupId]: new Set() }));
  const clearAll = () => setSelections(Object.fromEntries(groups.map((g) => [g.id, new Set<string>()])));

  const exportSelections = () => {
    const lines: string[] = [];
    groups.forEach((g) => {
      const name = groupNames[g.id] ?? g.name;
      const selected = IMAGES.filter((img) => selections[g.id]?.has(img.id));
      if (selected.length === 0) return;
      lines.push(name.toUpperCase());
      lines.push("─".repeat(name.length));
      lines.push(selected.map((img) => img.title).join(", "));
      lines.push("");
    });
    if (lines.length === 0) return;
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "enrichment-selections.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getImageGroups = (imageId: string): Group[] =>
    groups.filter((g) => selections[g.id]?.has(imageId));

  const totalSelected = groups.reduce((sum, g) => sum + (selections[g.id]?.size ?? 0), 0);

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-border bg-card flex flex-col z-10 shrink-0 shadow-sm md:shadow-none">
        <div className="p-6 md:p-8 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground" data-testid="text-title">
            Enrichment Picker
          </h1>
          <p className="text-sm text-muted-foreground">Select items and assign them to groups.</p>
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

          <div className="flex gap-2 flex-wrap">
            {groups.map((g) => {
              const isActive = g.id === activeGroupId;
              const count = selections[g.id]?.size ?? 0;
              return (
                <button
                  key={g.id}
                  onClick={() => setActiveGroupId(g.id)}
                  data-testid={`button-group-${g.id}`}
                  className="py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 border-2 flex flex-col items-center gap-0.5 min-w-[72px]"
                  style={isActive
                    ? { backgroundColor: g.color, borderColor: g.color, color: "#fff" }
                    : { backgroundColor: "transparent", borderColor: "transparent", color: "var(--color-muted-foreground)" }}
                >
                  <span className="truncate max-w-full">{groupNames[g.id] ?? g.name}</span>
                  <span className="font-mono text-[10px] opacity-70">{count} item{count !== 1 ? "s" : ""}</span>
                </button>
              );
            })}
            <button
              onClick={addGroup}
              data-testid="button-add-group"
              title="Add a new group"
              className="py-2 px-3 rounded-lg text-xs font-semibold border-2 border-dashed border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-all duration-200 flex items-center justify-center min-w-[40px]"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <Separator />

        <ScrollArea className="flex-1 pb-8">
          <div className="px-6 md:px-8 pt-4 flex flex-col gap-6">
            <AnimatePresence initial={false}>
              {groups.map((g) => {
                const selectedImages = IMAGES.filter((img) => selections[g.id]?.has(img.id));
                return (
                  <motion.div
                    key={g.id}
                    layout
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                    data-testid={`section-group-${g.id}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: g.color }} />
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
                              {groupNames[g.id] ?? g.name}
                            </span>
                            <Pencil className="w-3 h-3 shrink-0 opacity-0 group-hover/rename:opacity-60 transition-opacity" style={{ color: g.color }} />
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {selectedImages.length > 0 && (
                          <button onClick={() => clearGroup(g.id)} className="text-muted-foreground hover:text-destructive transition-colors" data-testid={`button-clear-group-${g.id}`}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {groups.length > 1 && (
                          <button onClick={() => deleteGroup(g.id)} className="text-muted-foreground/40 hover:text-destructive transition-colors" data-testid={`button-delete-group-${g.id}`} title="Delete group">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <AnimatePresence mode="popLayout">
                      {selectedImages.length === 0 ? (
                        <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-muted-foreground/60 italic pl-4" data-testid={`text-empty-${g.id}`}>
                          No items yet
                        </motion.p>
                      ) : (
                        <ul className="space-y-0.5 pl-4">
                          {selectedImages.map((img, i) => (
                            <motion.li key={img.id} layout initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8, transition: { duration: 0.15 } }} className="flex items-center gap-2 py-1" data-testid={`list-item-${g.id}-${img.id}`}>
                              <span className="text-[10px] font-mono text-muted-foreground/40 w-4 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                              <span className="text-sm text-foreground font-medium flex-1 leading-tight">{img.title}</span>
                            </motion.li>
                          ))}
                        </ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </aside>

      {/* Main content */}
      <main className="flex-1 h-full overflow-y-auto bg-background/50">
        <div className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto">
          {/* Active group bar */}
          <div
            className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl text-white text-sm font-semibold transition-colors duration-300"
            style={{ backgroundColor: activeGroup.color }}
            data-testid="text-active-group-bar"
          >
            <Plus className="w-4 h-4 opacity-80" />
            <span>Clicking items will add them to <strong>{activeGroupName}</strong></span>
          </div>

          {/* Category filter bar */}
          <div className="flex gap-2 mb-8 flex-wrap" data-testid="filter-bar">
            {["All", ...ALL_CATEGORIES].map((cat) => {
              const isActive = filterCategory === cat;
              const count = cat === "All" ? IMAGES.length : IMAGES.filter((img) => img.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
                    ${isActive
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                    }`}
                >
                  {cat}
                  <span className={`ml-1.5 font-mono text-[10px] ${isActive ? "opacity-60" : "opacity-40"}`}>{count}</span>
                </button>
              );
            })}
          </div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5"
            initial="hidden"
            animate="show"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.025 } } }}
          >
            {filteredImages.map((img) => {
              const imageGroups = getImageGroups(img.id);
              const isInActiveGroup = selections[activeGroupId]?.has(img.id) ?? false;
              return (
                <motion.button
                  key={img.id}
                  onClick={() => toggleImage(img.id)}
                  className="group relative flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl rounded-b-none"
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }}
                  data-testid={`card-image-${img.id}`}
                  aria-pressed={isInActiveGroup}
                >
                  <ItemCard img={img} isInActiveGroup={isInActiveGroup} activeGroup={activeGroup} imageGroups={imageGroups} />
                  <div className="mt-2 flex flex-col">
                    <span className="text-xs font-semibold leading-snug transition-colors duration-300" style={{ color: isInActiveGroup ? activeGroup.color : undefined }}>
                      {img.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono tracking-wide mt-0.5 truncate">
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
