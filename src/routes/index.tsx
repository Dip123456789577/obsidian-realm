import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Play, Volume2, VolumeX, ChevronDown, Menu, X, ArrowRight,
  Crown, Flame, Snowflake, Sword, Skull, Shield,
  Star, ChevronLeft, ChevronRight, Plus, Minus, Award,
  Instagram, Twitter, Youtube, Mail, MapPin, Music, Pause,
  Volume1, Sparkles, Clock,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import charKing from "@/assets/char-king.jpg";
import charWarrior from "@/assets/char-warrior.jpg";
import charMage from "@/assets/char-mage.jpg";
import charLady from "@/assets/char-lady.jpg";
import charKnight from "@/assets/char-knight.jpg";
import charRose from "@/assets/char-rose.jpg";
import galCastle from "@/assets/gal-castle.jpg";
import galBattle from "@/assets/gal-battle.jpg";
import galDragon from "@/assets/gal-dragon.jpg";
import galWall from "@/assets/gal-wall.jpg";
import galThrone from "@/assets/gal-throne.jpg";
import galLibrary from "@/assets/gal-library.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chronicles of the Realm — Legends of the Realm" },
      { name: "description", content: "Enter the cinematic epic fantasy saga of Chronicles of the Realm — dragons, dynasties, and a shattered crown." },
      { property: "og:image", content: hero },
      { property: "twitter:image", content: hero },
    ],
  }),
  component: Landing,
});

/* ------------------------ Cinematic Canvas Particles ------------------------ */
function CinematicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    class Ember {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      life: number;
      maxLife: number;
      hue: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 3 + 1;
        this.speedY = -(Math.random() * 1.5 + 0.5);
        this.speedX = (Math.random() - 0.5) * 1;
        this.maxLife = Math.random() * 300 + 200;
        this.life = this.maxLife;
        this.opacity = Math.random() * 0.8 + 0.3;
        this.hue = Math.random() * 30 + 15;
      }

      update() {
        this.y += this.speedY;
        
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += (dx / dist) * force * 4;
        } else {
          this.x += this.speedX + Math.sin(this.life * 0.05) * 0.3;
        }

        this.life--;
        this.opacity = (this.life / this.maxLife) * (Math.random() * 0.4 + 0.6);
        this.hue = 15 + Math.sin(this.life * 0.02) * 15;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.opacity})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 50%, ${this.opacity * 0.5})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class SnowParticle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      wobble: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 1 + 0.3;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.wobble = Math.random() * Math.PI * 2;
      }

      update() {
        this.y += this.speedY;
        this.wobble += 0.02;
        this.x += this.speedX + Math.sin(this.wobble) * 0.3;

        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          const force = (80 - dist) / 80;
          this.x += (dx / dist) * force * 2;
        }

        if (this.y > height) {
          this.y = -10;
          this.x = Math.random() * width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 245, 255, ${this.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(200, 220, 255, ${this.opacity * 0.3})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class MagicSparkle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      life: number;
      maxLife: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.maxLife = Math.random() * 200 + 100;
        this.life = this.maxLife;
        this.opacity = Math.random() * 0.6 + 0.4;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.opacity = (this.life / this.maxLife) * 0.8;

        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          this.x += (dx / dist) * force * 2;
          this.y += (dy / dist) * force * 2;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(212, 175, 55, ${this.opacity * 0.6})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const embers: Ember[] = Array.from({ length: 60 }, () => new Ember());
    const snow: SnowParticle[] = Array.from({ length: 70 }, () => new SnowParticle());
    const sparkles: MagicSparkle[] = Array.from({ length: 40 }, () => new MagicSparkle());

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      for (const s of snow) {
        s.update();
        s.draw();
      }

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.update();
        e.draw();
        if (e.life <= 0 || e.x < 0 || e.x > width || e.y < -10) {
          embers[i] = new Ember();
        }
      }

      for (let i = 0; i < sparkles.length; i++) {
        const sp = sparkles[i];
        sp.update();
        sp.draw();
        if (sp.life <= 0) {
          sparkles[i] = new MagicSparkle();
        }
      }

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" style={{ mixBlendMode: "screen" }} />;
}

/* ------------------------ Custom Cursor Follower & Glow ------------------------ */
function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [trail, setTrail] = useState<{ id: number; x: number; y: number; opacity: number }[]>([]);
  const trailId = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      if (Math.random() < 0.25) {
        const id = trailId.current++;
        setTrail((t) => [
          ...t.slice(-10),
          { id, x: e.clientX, y: e.clientY, opacity: 0.9 },
        ]);
      }
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleHoverStart);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleHoverStart);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((t) =>
        t
          .map((item) => ({ ...item, opacity: item.opacity - 0.12 }))
          .filter((item) => item.opacity > 0)
      );
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className={`pointer-events-none fixed z-[999] hidden lg:block -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
          hovered
            ? "h-14 w-14 border border-gold bg-gold/10 mix-blend-screen scale-110"
            : "h-6 w-6 border border-gold/30 bg-gold/5"
        }`}
        style={{
          left: position.x,
          top: position.y,
          boxShadow: hovered
            ? "0 0 25px oklch(0.82 0.14 82 / 0.5)"
            : "0 0 8px oklch(0.82 0.14 82 / 0.15)",
        }}
      />
      {trail.map((item) => (
        <div
          key={item.id}
          className="pointer-events-none fixed z-[998] hidden lg:block -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-gold"
          style={{
            left: item.x + (Math.random() - 0.5) * 6,
            top: item.y + (Math.random() - 0.5) * 6,
            opacity: item.opacity,
            boxShadow: "0 0 6px oklch(0.75 0.22 45)",
          }}
        />
      ))}
    </>
  );
}

/* --------------------------- Reveal on scroll -------------------------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0) blur(0)" : "translateY(30px)",
        filter: shown ? "blur(0)" : "blur(6px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.2,0.9,0.3,1) ${delay}ms, filter 0.9s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* --------------------------------- Data -------------------------------- */
const NAV = [
  ["home", "Home"], ["story", "Story"], ["houses", "Great Houses"],
  ["characters", "Characters"], ["seasons", "Seasons"], ["trailer", "Trailer"],
  ["gallery", "Gallery"], ["reviews", "Reviews"], ["awards", "Awards"],
  ["timeline", "Timeline"], ["faq", "FAQ"], ["contact", "Contact"],
] as const;

const HOUSES = [
  {
    name: "House Aurelius",
    sigil: Crown,
    motto: "Gold Never Sleeps",
    territory: "The Solar Valleys",
    desc: "An ancient bloodline of sun-crowned kings whose gilded banners have flown over every throne of the realm for three centuries.",
    members: ["King Alaric Elden", "Prince Corvin", "Lady Isolde"],
    crestColor: "from-amber-500/10 to-yellow-600/30",
    lore: "House Aurelius rules from the Sunspire, a citadel carved directly into the highest peak of the Solar Valleys. Their wealth is legendary, backed by deep gold mines and centuries of trade monopoly. However, with King Alaric aging and no direct successor, their golden peace hangs by a thread."
  },
  {
    name: "House Draconis",
    sigil: Flame,
    motto: "Breath of the Storm",
    territory: "The Obsidian Peaks",
    desc: "Dragon-kin exiles who returned from across the Ashen Sea with wing and fire, laying claim to the ruined heartland of the old empire.",
    members: ["Lyra Thorne", "Kaelen Voss", "The Ashen Twins"],
    crestColor: "from-red-600/10 to-orange-600/30",
    lore: "Tempered in the volcanic fumes of the Obsidian Peaks, House Draconis wields the power of the remaining great dragons. They respect only strength and seek to reclaim the throne that was burned during the first empire's fall. Lyra Thorne leads their host with a silver blade."
  },
  {
    name: "House Umbra",
    sigil: Skull,
    motto: "Silent as Grave",
    territory: "The Shadow Wetlands",
    desc: "Whispered assassins and keepers of forgotten oaths, cloaked in mist and moving only when the moons hide their faces.",
    members: ["Elowen Sovereign", "The Veiled Prior"],
    crestColor: "from-purple-900/10 to-slate-900/30",
    lore: "None know when House Umbra was founded, but their spies occupy every court. Operating from the Sunken Keep deep within the mist-bound Shadow Wetlands, they trade in secrets, poison, and whispered contracts. Elowen Sovereign plays a game of chess with the lives of kings."
  },
  {
    name: "House Veridian",
    sigil: Shield,
    motto: "Rooted in Steel",
    territory: "Ancient Evergrowth",
    desc: "Stone-hearted mountain lords whose fortresses grow from the living rock, unbroken by siege for a thousand winters.",
    members: ["Sir Kaelen Voss", "Lord Rhaen"],
    crestColor: "from-emerald-600/10 to-teal-600/30",
    lore: "Bound to the ancient forests of the Evergrowth, the giants of House Veridian are the defenders of the realm's southern borders. Their armor is forged from darkwood and steel, and they have never yielded a single league of ground to invader or dragon."
  },
  {
    name: "House Thalassa",
    sigil: Snowflake,
    motto: "Master the Tide",
    territory: "The Tide-Locked Isles",
    desc: "Sea-witches and iron-hulled raiders who bargain with the drowned gods and call storms to answer their command.",
    members: ["Serafina Kaal", "Admiral Vex"],
    crestColor: "from-blue-600/10 to-indigo-900/30",
    lore: "From the storm-beaten Tide-Locked Isles, House Thalassa controls the shipping lanes and commands the largest fleet in the world. Their sea-witches hum songs that command the currents, and their warriors believe that those who drown are reborn as tides."
  },
];

const CHARACTERS = [
  {
    name: "King Alaric Elden",
    role: "The Iron Crown",
    actor: "Portrayed by Mark Strong",
    img: charKing,
    bio: "The last of the Aurelius line, Alaric wears an iron circlet forged from the swords of the kings he unmade. His silence is louder than any decree. Having lost his sons in the Great Siege, he lives only to protect the crown, knowing his death will ignite a wildfire that will consume the world.",
    house: "House Aurelius",
    relations: ["Father of Prince Corvin (Deceased)", "Sworn enemy of Lyra Thorne", "Advised by Valerius Malleon"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0",
    videoType: "youtube" as const
  },
  {
    name: "Lyra Thorne",
    role: "The Silver Wolf",
    actor: "Portrayed by Florence Pugh",
    img: charWarrior,
    bio: "Battle-scarred and untamed, Lyra rides at the head of the Draconis riders. She has slain seven kings and remembers each name. With silver hair and amber eyes, she commands the fire-drakes of the Obsidian Peaks and holds a deep grudge against the Iron Crown that broke her lineage.",
    house: "House Draconis",
    relations: ["Niece of the Ashen Twins", "Sworn rival of King Alaric", "Secret ally of Serafina Kaal"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0",
    videoType: "youtube" as const
  },
  {
    name: "Valerius Malleon",
    role: "The Arch-Scholar",
    actor: "Portrayed by Bill Nighy",
    img: charMage,
    bio: "Keeper of the Crystal Codex and last living speaker of the elder tongue. He counsels every throne, and outlives each of them. He has spent eighty years in the library towers, cataloging the stars and the movement of dragons, knowing that the longest winters are announced by the birds of dawn.",
    house: "The Vault",
    relations: ["Counselor to King Alaric", "Mentor to Elowen Sovereign"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0",
    videoType: "youtube" as const
  },
  {
    name: "Elowen Sovereign",
    role: "The Velvet Shadow",
    actor: "Portrayed by Anya Taylor-Joy",
    img: charLady,
    bio: "Court-born and knife-quiet, Elowen weaves alliances the way spiders weave silk — with patience, symmetry, and the intent to bind. She commands the whisperers of House Umbra, pulling the strings of politics from the alcoves of the Solar Palace while maintaining a flawless mask of loyalty.",
    house: "House Umbra",
    relations: ["Sworn to House Umbra", "Protege of Valerius Malleon", "Manipulator of Prince Corvin"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0",
    videoType: "youtube" as const
  },
  {
    name: "Sir Kaelen Voss",
    role: "The Unbroken",
    actor: "Portrayed by Henry Cavill",
    img: charKnight,
    bio: "Sworn sword of the North Passes. His shield has cracked but never fallen. Winter follows in his footsteps. Formerly of House Draconis, he took the shield vow of House Veridian to guard the pass against the nameless horrors that crawl from the Frozen Sea when the moon turns red.",
    house: "House Veridian",
    relations: ["Sworn protector of the Evergrowth", "Former commander of the Draconis vanguard"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0",
    videoType: "youtube" as const
  },
  {
    name: "Serafina Kaal",
    role: "The Black Rose",
    actor: "Portrayed by Gemma Chan",
    img: charRose,
    bio: "Poisoner, poet and heir to the Tide-Locked Isles. She sings in six dead languages and has forgiven no one. Controlling the sea-witches, she has poisoned three heirs to the Sunspire and holds a fleet of ironclads ready to close the trade gates the moment the king draws his last breath.",
    house: "House Thalassa",
    relations: ["Heir to the Tide-Locked Isles", "Secret co-conspirator of Lyra Thorne"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0",
    videoType: "youtube" as const
  },
];

const SEASONS = [
  {
    n: 1,
    year: 2021,
    title: "The Awakening",
    episodes: 10,
    summary: "The realm stirs as King Alaric declares the Unification Accords, sparking tensions among the northern houses.",
    episodeList: [
      { num: 1, title: "The Iron King's Decree", runtime: "62 mins", desc: "King Alaric calls the Great Houses to the Sunspire to sign the Accords, but House Draconis refuses to bow, setting off a sequence of political defiance." },
      { num: 2, title: "Ashes and Embers", runtime: "58 mins", desc: "Lyra Thorne returns to the Obsidian Peaks to rally her lords, while Elowen Sovereign whispers her first betrayal in the court." },
      { num: 3, title: "The Shadow's Reach", runtime: "55 mins", desc: "An assassin from the Shadow Wetlands breaches the royal chambers, leaving a blood-drenched warning on the throne." },
      { num: 4, title: "The Frozen Shield", runtime: "59 mins", desc: "Sir Kaelen Voss defends the Evergrowth border against an unexpected raid, establishing his legend as the Unbroken." },
      { num: 5, title: "Storm on the Horizon", runtime: "61 mins", desc: "House Thalassa blocks the eastern harbor, demanding tax exemptions that threaten to bankrupt the Crown." },
      { num: 6, title: "The Arch-Scholar's Warning", runtime: "54 mins", desc: "Valerius Malleon discovers an ancient prophecy in the library towers pointing to the return of the dragons." }
    ]
  },
  {
    n: 2,
    year: 2022,
    title: "Shattered Oaths",
    episodes: 12,
    summary: "Trust becomes a luxury. The first great betrayals cascade across the Frozen Plains.",
    episodeList: [
      { num: 1, title: "The Crimson Feast", runtime: "65 mins", desc: "A wedding at the Evergrowth turns into a bloodbath as House Draconis spring a deadly trap." },
      { num: 2, title: "The Sunspire in Mourning", runtime: "57 mins", desc: "Following the betrayal, Alaric gathers his banners for war, declaring all Draconis loyalists outlaws." },
      { num: 3, title: "Secrets of the Codex", runtime: "60 mins", desc: "Valerius escapes the capital with the Crystal Codex as the Solar Palace falls into chaos." },
      { num: 4, title: "The Drowned Vanguard", runtime: "62 mins", desc: "Serafina Kaal commands the sea-witches to summon a massive storm, devouring the royal fleet." }
    ]
  },
  {
    n: 3,
    year: 2023,
    title: "The Crimson Winter",
    episodes: 8,
    summary: "A brutal winter falls, bringing out the best in warriors and the worst in men. Dragons return.",
    episodeList: [
      { num: 1, title: "The First Snowflake", runtime: "70 mins", desc: "A winter that prophecies say will last a hundred years begins. The passes are blocked by ice." },
      { num: 2, title: "Wings of Fire", runtime: "64 mins", desc: "Lyra Thorne awakens the ancient fire-drakes of the Peaks, burning the southern garrisons." },
      { num: 3, title: "The Battle of the Red Pass", runtime: "72 mins", desc: "Kaelen Voss stands alone with a hundred guards against the entire Draconis vanguard." }
    ]
  },
  {
    n: 4,
    year: 2024,
    title: "Fire of the North",
    episodes: 10,
    summary: "Rebellion, coronations, and a prophecy that refuses to die. The crown breaks; a new age begins.",
    episodeList: [
      { num: 1, title: "The Broken Crown", runtime: "68 mins", desc: "The Iron Crown is shattered during a siege of the Sunspire, with each house securing a fragment." },
      { num: 2, title: "Ascension of the Shadow", runtime: "61 mins", desc: "Elowen Sovereign takes control of the wetlands, crowned as the Queen of Shadows." },
      { num: 3, title: "The Ashen Accord", runtime: "75 mins", desc: "The remaining houses meet on the neutral territory of the Tide-Locked Isles to negotiate a truce." }
    ]
  },
];

const RATINGS = [
  { label: "IMDb Rating", value: 9.4, max: 10, note: "Highest rated fantasy series of the decade" },
  { label: "Rotten Tomatoes", value: 90, max: 100, note: "Certified Fresh by global critics" },
  { label: "Audience Score", value: 88, max: 100, note: "Over 500,000 verified viewers" },
];

const REVIEWS = [
  { source: "Variety", role: "Marketplace Review", quote: "A cinematic triumph that redefines what television can achieve. The scale is unprecedented, the drama intimate." },
  { source: "The Hollywood Reporter", role: "Season 1 Deep Dive", quote: "The world-building is so dense and beautiful it feels like stepping into a real historical epic of a forgotten time." },
  { source: "IGN", role: "Editor's Choice", quote: "Rarely does a series balance sweeping political intrigue with human tenderness so flawlessly. A masterwork." },
  { source: "Empire", role: "Cover Feature", quote: "Elden Sovereign is a spellbinding descent into a realm you never want to leave. Every frame belongs in a gallery." },
];

const TIMELINE = [
  { season: "Fall 2023", title: "The First Coronation", body: "Premiere episode shatters viewership records with 15.6 million concurrent viewers globally.", badge: "Record Breaker Award" },
  { season: "Winter 2023", title: "Golden Globe Sweep", body: "Awarded Best Drama Series and Best Actor for the portrayal of King Alaric the Vain.", badge: "4 Categories Won" },
  { season: "Spring 2024", title: "Emmy Recognition", body: "Dominating technical categories with 12 nominations including Outstanding Visual Effects and Costume Design.", badge: "12 Nominations" },
  { season: "Summer 2024", title: "BAFTA Ceremony", body: "Named International Series of the Year, cementing its place among the greatest fantasy adaptations.", badge: "International Winner" },
];

const FAQS = [
  { q: "How many seasons are planned for Elden Sovereign?", a: "The saga is planned as a seven-season arc, with two prequel spin-offs currently in development." },
  { q: "Where was the series primarily filmed?", a: "Principal photography took place across Iceland, Northern Ireland, Croatia, and custom sound stages in Belfast and Reykjavik." },
  { q: "Is there a physical edition release planned?", a: "Yes — a 4K Ultra HD collector's edition ships each winter, featuring bonus lore, cast interviews, and unreleased scores." },
  { q: "Will there be a companion novel?", a: "A canonical prequel novel, 'Ashes of the First Kings,' arrives autumn of next year from Sovereign Press." },
  { q: "How can I audition or apply for background roles?", a: "Casting notices are posted through official partners. Watch the Contact section for the current call windows." },
];

const GALLERY = [
  { src: galCastle, alt: "Dragonstone castle at crimson sunset", h: "row-span-2" },
  { src: galBattle, alt: "Torchlit army marching through snow" },
  { src: galDragon, alt: "Dragon breathing fire over a burning city" },
  { src: galWall, alt: "Ancient stone wall in the snowy mountains", h: "row-span-2" },
  { src: galThrone, alt: "The Iron Throne in shadow" },
  { src: galLibrary, alt: "Gothic royal library with candlelight" },
];

/* --------------------------------- Page --------------------------------- */
function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [active, setActive] = useState("home");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Initialize and handle soundtrack fade in/out
  useEffect(() => {
    if (!audioRef.current) {
      // Use a fallback or just don't load, but let's handle errors
      audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0;
      audioRef.current.onerror = (e) => {
        console.warn("Audio failed to load, disabling soundtrack", e);
        // If audio fails, just keep it muted
        setMuted(true);
      };
    }

    let fadeTimer: any = null;
    const duration = 1200; // 1.2 seconds fade
    const steps = 24;
    const interval = duration / steps;

    if (!muted) {
      audioRef.current.play().catch((err) => {
        console.log("Audio play deferred until user gesture or failed", err);
      });
      let currentVol = audioRef.current.volume;
      fadeTimer = setInterval(() => {
        if (!audioRef.current) return;
        currentVol = Math.min(0.35, currentVol + 0.35 / steps);
        audioRef.current.volume = currentVol;
        if (currentVol >= 0.35) clearInterval(fadeTimer);
      }, interval);
    } else {
      let currentVol = audioRef.current.volume;
      fadeTimer = setInterval(() => {
        if (!audioRef.current) return;
        currentVol = Math.max(0, currentVol - 0.35 / steps);
        audioRef.current.volume = currentVol;
        if (currentVol <= 0) {
          audioRef.current.pause();
          clearInterval(fadeTimer);
        }
      }, interval);
    }

    return () => {
      if (fadeTimer) clearInterval(fadeTimer);
    };
  }, [muted]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const ids = NAV.map(([id]) => id);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? 0 : (i + 1) % GALLERY.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? 0 : (i - 1 + GALLERY.length) % GALLERY.length));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden select-none">
      {/* Cinematic follow-cursor and background particles */}
      <CursorGlow />
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <CinematicCanvas />
      </div>

      {/* ============================ NAV ============================ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl bg-obsidian/75 border-b border-gold/15 shadow-2xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="#home" className="flex items-center gap-3 group">
            <span className="grid h-9 w-9 place-items-center border border-gold/60 group-hover:border-gold transition-colors duration-500">
              <Crown className="h-4 w-4 text-gold group-hover:scale-110 transition-transform" />
            </span>
            <span className="font-display text-sm tracking-[0.4em] text-gold group-hover:text-parchment transition-colors duration-500">
              CHRONICLES <span className="text-foreground/80 font-normal">OF THE REALM</span>
            </span>
          </a>
          
          <nav className="hidden xl:flex items-center gap-7 text-[11px] font-semibold tracking-[0.28em] uppercase">
            {NAV.slice(1, 9).map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative transition-colors py-2 ${
                  active === id ? "text-gold" : "text-foreground/75 hover:text-gold"
                }`}
              >
                {label}
                {active === id && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gold" />
                )}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            {/* Equalizer and Sound button */}
            <div className="flex items-center gap-2">
              {!muted && (
                <div className="flex items-end gap-[2px] h-3 w-4">
                  <span className="w-[2px] bg-gold rounded-full transition-all" style={{ height: "100%", transformOrigin: "bottom", animation: "bounce-bar-1 0.8s ease-in-out infinite alternate" }} />
                  <span className="w-[2px] bg-gold rounded-full transition-all" style={{ height: "100%", transformOrigin: "bottom", animation: "bounce-bar-2 0.5s ease-in-out infinite alternate" }} />
                  <span className="w-[2px] bg-gold rounded-full transition-all" style={{ height: "100%", transformOrigin: "bottom", animation: "bounce-bar-3 0.6s ease-in-out infinite alternate" }} />
                </div>
              )}
              <button
                onClick={() => setMuted((m) => !m)}
                className="grid h-10 w-10 place-items-center border border-gold/40 text-gold hover:bg-gold/10 transition-colors rounded-[2px]"
                aria-label={muted ? "Unmute atmospheric score" : "Mute score"}
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>

            <a href="#contact" className="hidden md:inline-flex btn-royal !py-2.5 !px-5 !text-[10px]">
              Vow Allegiance
            </a>
            
            <button
              onClick={() => setMenuOpen(true)}
              className="xl:hidden grid h-10 w-10 place-items-center border border-gold/40 text-gold"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-obsidian/98 backdrop-blur-2xl" onClick={() => setMenuOpen(false)} />
        <div className="relative flex h-full flex-col p-8 justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-display text-sm tracking-[0.4em] text-gold">CHRONICLES OF THE REALM</span>
              <button onClick={() => setMenuOpen(false)} className="grid h-10 w-10 place-items-center border border-gold/40 text-gold" aria-label="Close menu">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-4">
              {NAV.map(([id, label], i) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`font-serif text-2xl transition-colors ${active === id ? "text-gold" : "text-foreground/80 hover:text-gold"}`}
                  style={{ 
                    opacity: menuOpen ? 1 : 0, 
                    transform: menuOpen ? "translateX(0)" : "translateX(-20px)", 
                    transition: `all 0.5s ease ${i * 35 + 80}ms` 
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div className="border-t border-gold/15 pt-6 flex flex-col gap-2">
            <p className="text-[10px] tracking-widest text-gold/60 uppercase">Sworn to the Chronicles</p>
            <p className="text-xs text-foreground/50">Experience the world of dynasty and dragons.</p>
          </div>
        </div>
      </div>

      {/* ============================ HERO ============================ */}
      <section id="home" className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={hero}
            alt="A hooded figure standing before the Iron Throne, dragonfire above"
            className="h-full w-full object-cover kenburns"
            width={1920}
            height={1200}
          />
          <div className="absolute inset-0" style={{ background: "var(--grad-hero-veil)" }} />
          <div className="absolute inset-0" style={{ background: "var(--grad-ember)" }} />
        </div>

        <div className="relative z-10 mx-auto flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center lg:px-10 max-w-5xl">
          <p className="eyebrow text-reveal tracking-[0.45em]">Legends of the Realm</p>
          <h1
            className="mt-6 font-display text-[clamp(2.8rem,9vw,8.5rem)] leading-[0.9] text-reveal"
            style={{ animationDelay: "150ms" }}
          >
            <span className="block text-gold-gradient tracking-wide">CHRONICLES</span>
            <span className="block text-foreground/95 tracking-normal">OF THE REALM</span>
          </h1>
          <div className="mt-8 flex items-center gap-4 justify-center text-reveal" style={{ animationDelay: "300ms" }}>
            <span className="h-[1px] w-12 bg-gold/50" />
            <span className="font-serif italic text-lg md:text-xl text-parchment/85">
              "A realm forged in blood. A crown claimed in fire."
            </span>
            <span className="h-[1px] w-12 bg-gold/50" />
          </div>
          <p
            className="mt-8 max-w-2xl font-serif text-lg md:text-xl leading-relaxed text-foreground/75 text-reveal"
            style={{ animationDelay: "450ms" }}
          >
            When the last Sovereign vanishes without heir, five great houses tear the realm apart in pursuit of a
            fragmented crown. Dragons wake. Winters lengthen. The old gods listen again.
          </p>
          <div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-reveal"
            style={{ animationDelay: "600ms" }}
          >
            <a href="#trailer" className="btn-royal">
              <Play className="h-3.5 w-3.5 fill-current" /> Watch Trailer
            </a>
            <a href="#story" className="btn-ghost-royal">
              Explore the Realm <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Ambient controls & scroll cue */}
        <div className="absolute right-6 bottom-10 z-10 flex items-center gap-3">
          <button
            onClick={() => setMuted((m) => !m)}
            className="grid h-11 w-11 place-items-center border border-gold/40 text-gold hover:bg-gold/10 transition"
            aria-label={muted ? "Unmute soundtrack" : "Mute"}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
        <a href="#story" className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-gold">
          <span className="text-[9px] tracking-[0.45em] uppercase font-semibold text-gold/75">Scroll to Begin</span>
          <span className="h-6 w-px bg-gold/40 animate-pulse" />
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </section>

      {/* ============================ STORY ============================ */}
      <section id="story" className="relative py-32 overflow-hidden border-t border-gold/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow">Volume I — The Awakening</p>
          </Reveal>
          <div className="mt-6 grid lg:grid-cols-[1.15fr_1fr] gap-16 items-start">
            <div>
              <Reveal delay={100}>
                <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02]">
                  The Story of the <br />
                  <span className="italic text-gold-gradient">Shattered Crown</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-10 font-serif text-xl leading-relaxed text-foreground/85">
                  <span className="float-left mr-3 font-display text-6xl leading-none text-gold">I</span>
                  n the age before the clouds bled gold, the Elden Sovereign ruled with an iron scepter forged
                  from the core of a dying star. For three centuries, peace was bought with blood and maintained
                  through the divine mandate of the Great Houses.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p className="mt-6 italic font-serif text-lg text-gold/85 border-l-2 border-gold/30 pl-4">
                  "When the crown breaks, the shadows feast," whispered the last oracle.
                </p>
              </Reveal>
              <Reveal delay={400}>
                <p className="mt-6 font-serif text-lg leading-relaxed text-foreground/70">
                  Now, the realms of man, dragon-kin, and shadow-lords collide in desperate pursuit of the
                  fragmented gems of authority. Kingdoms rise on the morning mist only to be scorched by
                  dragon-fire before dusk. You enter this chronicle not as witness — but as architect of the
                  new world's destiny.
                </p>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <div className="relative aspect-[4/5] overflow-hidden bg-panel border border-gold/15">
                <img src={galThrone} alt="The shattered iron throne" className="h-full w-full object-cover kenburns" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="eyebrow">Relic of the First Kings</p>
                  <p className="mt-2 font-serif text-xl text-parchment/90">The Sovereign Seat</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ HOUSES ============================ */}
      <section id="houses" className="relative py-32 border-t border-gold/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <div>
                <p className="eyebrow">Five Dynasties</p>
                <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)]">The Great Houses</h2>
                <p className="mt-3 max-w-xl text-foreground/60">
                  Five bloodlines. One throne to bind them — or break them.
                </p>
              </div>
              <a href="#characters" className="eyebrow flex items-center gap-2 hover:text-parchment transition">
                View Hierarchy <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <HousesShowcase />
          </Reveal>
        </div>
      </section>

      {/* ========================== CHARACTERS ========================== */}
      <section id="characters" className="relative py-32 overflow-hidden border-t border-gold/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow">Chronicles of the Realm</p>
              <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-gold-gradient">Legends of the Realm</h2>
              <p className="mt-4 mx-auto max-w-2xl text-foreground/60">
                Discover the champions and conquerors who shaped — and shattered — the history of the Sovereign lands.
              </p>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CHARACTERS.map((c, i) => (
              <Reveal key={c.name} delay={i * 60}>
                <CharacterCard {...c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ SEASONS ============================ */}
      <section id="seasons" className="relative py-32 bg-obsidian/40 border-t border-gold/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow">The Cycles</p>
            <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)]">Seasons & Episodes</h2>
          </Reveal>
          <div className="mt-14 grid gap-5">
            {SEASONS.map((s, i) => (
              <Reveal key={s.n} delay={i * 60}>
                <SeasonRow {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ TRAILER ============================ */}
      <section id="trailer" className="relative py-32 overflow-hidden border-t border-gold/10">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow">Cinematic Teaser · 4K UHD</p>
              <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)]">Behold the Realm</h2>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-12 relative bg-panel p-2 md:p-3 border border-gold/25 shadow-2xl">
              <div className="absolute -inset-px -z-10 opacity-30" style={{ background: "var(--grad-gold)", filter: "blur(25px)" }} />
              <div className="relative aspect-video overflow-hidden">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/BpJYNVhGf1s?rel=0"
                  title="Chronicles of the Realm — Official Cinematic Trailer"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center justify-between px-4 py-3.5 text-[10px] tracking-[0.32em] uppercase text-gold/80">
                <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" /> Live Broadcast</span>
                <span>Runtime · 2:41</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ GALLERY ============================ */}
      <section id="gallery" className="relative py-32 border-t border-gold/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <div>
                <p className="eyebrow">Visual Chronicle</p>
                <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)]">Gallery of the Realm</h2>
              </div>
              <p className="max-w-sm text-foreground/60">Landscapes, banners, battles and the quiet moments between the storms.</p>
            </div>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 auto-rows-[220px] md:auto-rows-[260px] gap-4">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={i * 40} className={g.h ?? ""}>
                <button
                  onClick={() => setLightbox(i)}
                  className="group relative h-full w-full overflow-hidden bg-panel border border-gold/10 hover:border-gold/30 transition-all duration-300"
                >
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition" />
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition duration-500 translate-y-2 group-hover:translate-y-0">
                    <p className="eyebrow">Plate {String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-1 font-serif text-parchment/90 text-sm">{g.alt}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {lightbox !== null && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-obsidian/95 backdrop-blur-xl p-6" onClick={() => setLightbox(null)}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 grid h-11 w-11 place-items-center border border-gold/40 text-gold hover:bg-gold/10 z-[80]"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? 0 : (i - 1 + GALLERY.length) % GALLERY.length)); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center border border-gold/40 text-gold hover:bg-gold/10 z-[80]"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i === null ? 0 : (i + 1) % GALLERY.length)); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center border border-gold/40 text-gold hover:bg-gold/10 z-[80]"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="relative max-h-[85vh] max-w-6xl z-[75]" onClick={(e) => e.stopPropagation()}>
              <img src={GALLERY[lightbox].src} alt={GALLERY[lightbox].alt} className="max-h-[80vh] w-auto object-contain border border-gold/10 shadow-2xl" />
              <p className="mt-4 text-center eyebrow text-gold/80">{GALLERY[lightbox].alt}</p>
            </div>
          </div>
        )}
      </section>

      {/* ============================ REVIEWS ============================ */}
      <section id="reviews" className="relative py-32 bg-obsidian/40 border-t border-gold/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow">Critical Acclaim</p>
              <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4.5rem)]">The Sovereign Legacy</h2>
              <p className="mt-3 mx-auto max-w-xl text-foreground/60">
                Refining the standards of epic narrative through critical acclaim and historical milestones.
              </p>
            </div>
          </Reveal>
          
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {RATINGS.map((r, i) => (
              <Reveal key={r.label} delay={i * 100}>
                <RatingCircle {...r} />
              </Reveal>
            ))}
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <Reveal delay={150}>
              <ReviewsCarousel />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ AWARDS / TIMELINE ============================ */}
      <section id="awards" className="relative py-32 border-t border-gold/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow">The Chronicles</p>
              <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)]">Awards & Legacy Journey</h2>
            </div>
          </Reveal>
          <div id="timeline" className="mt-20 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden md:block" />
            <div className="grid gap-10">
              {TIMELINE.map((t, i) => (
                <Reveal key={t.title} delay={i * 100}>
                  <div className={`md:grid md:grid-cols-2 md:gap-16 items-center ${i % 2 ? "" : ""}`}>
                    <div className={`${i % 2 ? "md:order-2" : "md:text-right"}`}>
                      <div className="bg-panel p-8 bg-panel-hover border border-gold/10">
                        <p className="eyebrow">{t.season}</p>
                        <h3 className="mt-3 font-serif text-2xl">{t.title}</h3>
                        <p className="mt-3 text-foreground/70 leading-relaxed">{t.body}</p>
                        <div className={`mt-5 inline-flex items-center gap-2 border border-gold/45 px-3 py-1.5 bg-gold/5 ${i % 2 ? "" : "md:ml-auto"}`}>
                          <Award className="h-3.5 w-3.5 text-gold" />
                          <span className="text-[10px] tracking-[0.28em] uppercase text-gold">{t.badge}</span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex justify-center relative">
                      <span className="grid h-12 w-12 place-items-center border border-gold bg-obsidian pulse-glow">
                        <Star className="h-4 w-4 text-gold fill-current" />
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ FAQ ============================ */}
      <section id="faq" className="relative py-32 bg-obsidian/40 border-t border-gold/10">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow">The Whispered Questions</p>
              <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)]">Mysteries of the Realm</h2>
            </div>
          </Reveal>
          <div className="mt-14 divide-y divide-gold/15 border-y border-gold/15">
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================ NEWSLETTER / CONTACT ============================ */}
      <section id="contact" className="relative py-32 overflow-hidden border-t border-gold/10">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <div className="bg-panel p-10 md:p-16 text-center relative border border-gold/15 shadow-2xl">
              <div className="absolute -inset-px -z-10 opacity-20" style={{ background: "var(--grad-gold)", filter: "blur(35px)" }} />
              <p className="eyebrow">Sworn to the Chronicle</p>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)]">Enlist in the Chronicles</h2>
              <p className="mt-4 mx-auto max-w-lg text-foreground/75 leading-relaxed">
                Receive dispatches from the writers' hall, unreleased concept art, and first word on new seasons.
              </p>
              <NewsletterForm onSuccess={() => setSubscribed(true)} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Wax Seal Subscribed Success Modal Overlay */}
      {subscribed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/95 backdrop-blur-2xl p-6" onClick={() => setSubscribed(false)}>
          <div className="relative max-w-md w-full bg-panel border border-gold/30 p-8 md:p-10 text-center shadow-2xl flex flex-col items-center animate-[zoomIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]" onClick={(e) => e.stopPropagation()}>
            {/* Animated Wax Seal Stamp */}
            <div className="relative h-28 w-28 flex items-center justify-center mb-6">
              {/* Red hot wax pooling */}
              <div className="absolute inset-2 bg-crimson/95 rounded-full blur-[1px] animate-ping scale-105" />
              <div className="absolute inset-3 bg-crimson rounded-full shadow-[0_0_25px_oklch(0.42_0.16_24)] border border-red-700" />
              {/* Gilded Seal imprint */}
              <div className="absolute inset-5 bg-gold border border-amber-900 rounded-full flex items-center justify-center shadow-inner animate-[pulse_2s_infinite]">
                <Crown className="h-8 w-8 text-amber-950 stroke-[2.5px]" />
              </div>
            </div>

            <p className="eyebrow text-crimson font-bold tracking-[0.3em] uppercase">Vow Sworn</p>
            <h3 className="mt-4 font-serif text-3xl text-gold-gradient">Oath Confirmed</h3>
            <p className="mt-4 font-serif text-base leading-relaxed text-foreground/80">
              You have signed the scroll in blood. The ravens will fly to your castle with royal updates, maps, and script leaks.
            </p>
            
            <button 
              onClick={() => setSubscribed(false)}
              className="mt-8 btn-royal w-full"
            >
              Enter the Keep
            </button>
          </div>
        </div>
      )}

      {/* ============================ FOOTER ============================ */}
      <footer className="relative border-t border-gold/15 py-16 bg-obsidian/25">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center border border-gold/60">
                  <Crown className="h-4 w-4 text-gold" />
                </span>
                <span className="font-display text-lg tracking-[0.4em] text-gold">CHRONICLES OF THE REALM</span>
              </div>
              <p className="mt-6 max-w-md font-serif text-foreground/75 leading-relaxed">
                An original epic fantasy entertainment franchise. Every character, house, and image is invented for
                this showcase. Enter the world of Chronicles of the Realm.
              </p>
              <div className="mt-6 flex gap-3">
                {[Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-10 w-10 place-items-center border border-gold/30 text-gold/80 hover:border-gold hover:text-gold transition">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow">The Realm</p>
              <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                {NAV.slice(1, 8).map(([id, l]) => (
                  <li key={id}><a href={`#${id}`} className="hover:text-gold transition">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Contact</p>
              <ul className="mt-4 space-y-3 text-sm text-foreground/70">
                <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gold" /> chronicles@therealm.com</li>
                <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-gold" /> The Grand Archive, Old City</li>
                <li className="flex items-center gap-2"><Sword className="h-3.5 w-3.5 text-gold" /> Press Kit · Legal · Terms</li>
              </ul>
            </div>
          </div>
          <div className="divider-gold mt-14" />
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/50">
            <p>© {new Date().getFullYear()} Chronicles of the Realm Studios. All rights reserved. Pursue the Crown.</p>
            <p className="flex items-center gap-4">
              <a href="#" className="hover:text-gold transition">Privacy</a>
              <a href="#" className="hover:text-gold transition">Terms</a>
              <a href="#" className="hover:text-gold transition">Press Kit</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* -------------------------- Sub-components ---------------------------- */
function HousesShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeHouse = HOUSES[activeIdx];
  const Icon = activeHouse.sigil;

  return (
    <div className="mt-14 grid lg:grid-cols-[1fr_2.2fr] gap-8 items-stretch">
      {/* Sidebar Navigation */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-none">
        {HOUSES.map((h, idx) => {
          const HouseIcon = h.sigil;
          const isActive = idx === activeIdx;
          return (
            <button
              key={h.name}
              onClick={() => setActiveIdx(idx)}
              className={`flex-1 min-w-[210px] lg:min-w-0 flex items-center gap-4 p-5 text-left border transition-all duration-500 relative rounded-[2px] ${
                isActive 
                  ? "bg-panel border-gold/60 text-gold shadow-[0_0_20px_oklch(0.82_0.14_82_/_0.15)] translate-x-0 lg:translate-x-2" 
                  : "bg-obsidian/30 border-gold/10 hover:border-gold/30 text-foreground/75 hover:text-parchment"
              }`}
            >
              <span className={`grid h-10 w-10 place-items-center border transition-colors ${isActive ? "border-gold text-gold" : "border-gold/30 text-gold/50"}`}>
                <HouseIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[10px] tracking-widest font-semibold uppercase text-foreground/40">House</p>
                <h3 className="font-display text-base tracking-widest font-normal">{h.name.split(" ")[1]}</h3>
              </div>
              {isActive && (
                <span className="absolute right-4 h-1.5 w-1.5 rounded-full bg-gold animate-pulse hidden lg:block" />
              )}
            </button>
          );
        })}
      </div>

      {/* Cinematic Banner Display */}
      <div className="relative overflow-hidden border border-gold/15 bg-panel p-8 md:p-12 flex flex-col justify-between min-h-[460px] rounded-[2px] shadow-xl">
        {/* Huge faint sigil background */}
        <div className="absolute right-0 bottom-0 translate-x-16 translate-y-16 opacity-[0.035] pointer-events-none select-none">
          <Icon className="h-[340px] w-[340px] text-gold" />
        </div>

        <div className="relative z-10 w-full">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center border border-gold/45 text-gold bg-gold/5">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="eyebrow text-[10px] tracking-widest">Great Dynasty</p>
                <h2 className="font-serif text-3xl md:text-4xl text-parchment font-semibold">{activeHouse.name}</h2>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-[10px] tracking-widest font-semibold uppercase text-gold/60">Territory</p>
              <p className="font-serif text-lg text-parchment font-medium">{activeHouse.territory}</p>
            </div>
          </div>

          <div className="divider-gold mt-6" />

          <div className="mt-8 grid md:grid-cols-[1.8fr_1fr] gap-10 items-start">
            <div>
              <p className="eyebrow text-xs text-gold/85 mb-2 flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> House Chronicles</p>
              <p className="font-serif text-lg leading-relaxed text-foreground/80">
                {activeHouse.lore}
              </p>
              <p className="mt-5 text-sm text-foreground/50 italic leading-relaxed border-l-2 border-gold/25 pl-4">
                "{activeHouse.desc}"
              </p>
            </div>

            <div className="bg-obsidian/40 border border-gold/10 p-6 rounded-[2px]">
              <p className="eyebrow text-xs text-gold/85 mb-4">Sworn Members</p>
              <ul className="space-y-2.5">
                {activeHouse.members.map((m) => (
                  <li key={m} className="flex items-center gap-3 text-sm text-foreground/80 border-b border-gold/5 pb-2 last:border-b-0 last:pb-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                    <span className="font-serif text-base">{m}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 italic text-[11px] text-gold tracking-widest uppercase text-center border-t border-gold/10 pt-4">
                "{activeHouse.motto}"
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between items-center z-10 border-t border-gold/10 pt-6">
          <a href="#characters" className="eyebrow text-[10px] flex items-center gap-2 hover:text-parchment transition">
            Explore Sworn Legends <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <span className="text-[10px] tracking-widest text-foreground/35 font-semibold uppercase">Claim the Crown</span>
        </div>
      </div>
    </div>
  );
}

function CharacterCard({ name, role, actor, img, bio, house, relations, videoUrl, videoType }: {
  name: string; role: string; actor: string; img: string; bio: string; house: string; relations?: string[];
  videoUrl?: string; videoType?: "youtube" | "vimeo" | "self";
}) {
  const [open, setOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
    setTilt({ x, y });

    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    setSpotlight({ x: px, y: py });
  };

  return (
    <>
      <div
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        onClick={() => setOpen(true)}
        className="group relative aspect-[3/4] overflow-hidden bg-panel cursor-pointer border border-gold/15 hover:border-gold/60 shadow-xl transition-all duration-300"
        style={{ transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
      >
        <img src={img} alt={`Portrait of ${name}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        
        {/* Cursor spotlight glow */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(180px circle at ${spotlight.x}px ${spotlight.y}px, oklch(0.82 0.14 82 / 0.12), transparent 80%)`
          }}
        />

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" style={{ boxShadow: "inset 0 0 60px oklch(0.82 0.14 82 / 0.2)" }} />
        
        <div className="absolute inset-x-0 bottom-0 p-6 z-20">
          <p className="eyebrow text-gold/85">{role}</p>
          <h3 className="mt-2 font-serif text-2xl text-parchment group-hover:text-gold transition-colors">{name}</h3>
          <p className="mt-1 italic text-xs text-foreground/50">{actor}</p>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-obsidian/95 backdrop-blur-xl p-4 md:p-6" onClick={() => setOpen(false)}>
          <div className="relative max-w-4xl w-full bg-panel grid md:grid-cols-[1fr_1.3fr] border border-gold/25 shadow-2xl animate-[fadeIn_0.35s_ease-out] rounded-[2px]" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[250px] md:h-full min-h-[350px]">
              <img src={img} alt={name} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-obsidian md:to-transparent" />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
              <div>
                <div className="flex items-center justify-between">
                  <p className="eyebrow">{house}</p>
                  <span className="text-[10px] text-foreground/40 font-semibold tracking-widest uppercase">{role}</span>
                </div>
                <h3 className="mt-2 font-serif text-3xl md:text-4xl text-gold-gradient font-semibold">{name}</h3>
                <p className="mt-1 italic text-sm text-foreground/60">{actor}</p>
                
                <div className="divider-gold mt-6 mb-6" />
                
                <p className="font-serif text-lg leading-relaxed text-foreground/80">{bio}</p>
                
                {videoUrl && (
                  <div className="mt-8">
                    <h4 className="eyebrow text-xs text-gold/85 mb-3 flex items-center gap-1.5"><Play className="h-3.5 w-3.5" /> Character Reel</h4>
                    <div className="relative aspect-video overflow-hidden border border-gold/20 bg-obsidian/50 rounded-[2px]">
                      <iframe
                        src={videoUrl}
                        title={`${name} - Character Reel`}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
                
                {relations && relations.length > 0 && (
                  <div className="mt-8">
                    <h4 className="eyebrow text-xs text-gold/85 mb-3 flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Affiliations & Ties</h4>
                    <ul className="grid sm:grid-cols-2 gap-2 text-sm text-foreground/60">
                      {relations.map((rel, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 bg-obsidian/40 border border-gold/5 px-3 py-2 rounded-[2px]">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                          <span>{rel}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <button onClick={() => setOpen(false)} className="mt-8 btn-ghost-royal self-start">Close Chronicle</button>
            </div>
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 grid h-10 w-10 place-items-center border border-gold/30 text-gold hover:border-gold hover:bg-gold/10 transition z-50 rounded-[2px]" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function SeasonRow({ n, year, title, episodes, summary, episodeList }: { 
  n: number; year: number; title: string; episodes: number; summary: string;
  episodeList?: { num: number; title: string; runtime: string; desc: string }[] 
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-panel border border-gold/10 hover:border-gold/30 transition-colors duration-500 rounded-[2px]">
      <button onClick={() => setOpen((o) => !o)} className="w-full grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto_auto_auto] gap-6 items-center p-6 text-left group">
        <span className="font-display text-4xl text-gold/50 group-hover:text-gold transition-colors w-16">{String(n).padStart(2, "0")}</span>
        <div>
          <p className="eyebrow">Volume {n} · {year}</p>
          <h3 className="mt-2 font-serif text-2xl group-hover:text-gold transition-colors">{title}</h3>
        </div>
        <span className="hidden md:block text-sm text-foreground/50 font-semibold tracking-wider">{episodes} Chapters</span>
        <span className="hidden md:block text-sm text-foreground/50 font-semibold tracking-wider">{year} Release</span>
        <span className="grid h-10 w-10 place-items-center border border-gold/30 text-gold group-hover:border-gold transition-colors rounded-[2px]">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <div className="grid transition-[grid-template-rows] duration-500 ease-in-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <div className="px-6 pb-8 md:pl-28 max-w-5xl">
            <p className="font-serif text-lg leading-relaxed text-foreground/80 border-l-2 border-gold/25 pl-4 py-1">{summary}</p>
            
            {episodeList && (
              <div className="mt-8">
                <p className="eyebrow text-xs mb-4 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Episode Index</p>
                <div className="grid gap-4">
                  {episodeList.map((ep) => (
                    <div key={ep.num} className="bg-obsidian/30 border border-gold/10 p-5 group/ep hover:border-gold/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-[2px]">
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-semibold tracking-widest text-gold bg-gold/5 border border-gold/20 px-2 py-0.5 uppercase">EP {ep.num}</span>
                          <h4 className="font-serif text-lg text-parchment group-hover/ep:text-gold transition-colors">{ep.title}</h4>
                        </div>
                        <p className="mt-2 text-sm text-foreground/60 leading-relaxed">{ep.desc}</p>
                      </div>
                      <div className="flex items-center justify-between md:flex-col md:items-end shrink-0 gap-2">
                        <span className="text-xs text-foreground/45 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {ep.runtime}</span>
                        <button className="text-[10px] tracking-[0.2em] font-semibold text-gold/80 hover:text-gold flex items-center gap-1 uppercase transition-colors">
                          Play Teaser <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RatingCircle({ label, value, max, note }: { label: string; value: number; max: number; note: string }) {
  const [progress, setProgress] = useState(0);
  const { ref, shown } = useReveal<HTMLDivElement>();
  
  useEffect(() => {
    if (!shown) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setProgress(p * value);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, value]);

  const pct = progress / max;
  const R = 54;
  const C = 2 * Math.PI * R;
  const display = max === 10 ? progress.toFixed(1) : `${Math.round(progress)}%`;

  return (
    <div ref={ref} className="bg-panel p-8 text-center bg-panel-hover border border-gold/10 rounded-[2px] shadow-lg">
      <div className="relative mx-auto h-40 w-40">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={R} stroke="oklch(0.28 0.02 60 / 0.4)" strokeWidth="4" fill="none" />
          <circle
            cx="60" cy="60" r={R}
            stroke="url(#g)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - pct)}
            style={{ transition: "stroke-dashoffset 0.2s linear" }}
          />
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.88 0.14 88)" />
              <stop offset="100%" stopColor="oklch(0.62 0.12 70)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-3xl text-gold-gradient font-bold">{display}</span>
        </div>
      </div>
      <p className="mt-6 eyebrow">{label}</p>
      <p className="mt-2 text-sm text-foreground/60">{note}</p>
    </div>
  );
}

function ReviewsCarousel() {
  const [idx, setIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % REVIEWS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [autoplay]);

  return (
    <div 
      className="relative bg-panel border border-gold/15 p-8 md:p-12 rounded-[2px] shadow-xl"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <span className="absolute top-4 right-8 font-display text-8xl text-gold/10 leading-none pointer-events-none select-none">"</span>
      
      <div className="min-h-[140px] flex flex-col justify-center animate-[fadeIn_0.5s_ease-out]">
        <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/90 italic">
          "{REVIEWS[idx].quote}"
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gold/10 pt-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center border border-gold/30 text-gold text-sm font-semibold bg-gold/5">
            {REVIEWS[idx].source[0]}
          </span>
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-parchment">{REVIEWS[idx].source}</p>
            <p className="text-xs text-foreground/50">{REVIEWS[idx].role}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)}
            className="grid h-9 w-9 place-items-center border border-gold/30 text-gold hover:border-gold hover:bg-gold/10 transition rounded-[2px]"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <div className="flex gap-1.5">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 transition-all duration-300 ${i === idx ? "w-6 bg-gold" : "w-1.5 bg-gold/30"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={() => setIdx((i) => (i + 1) % REVIEWS.length)}
            className="grid h-9 w-9 place-items-center border border-gold/30 text-gold hover:border-gold hover:bg-gold/10 transition rounded-[2px]"
            aria-label="Next review"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gold/10 last:border-b-0">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between gap-6 py-6 text-left group">
        <span className="font-serif text-lg md:text-xl group-hover:text-gold transition-colors duration-300">{q}</span>
        <span className="grid h-9 w-9 shrink-0 place-items-center border border-gold/35 text-gold group-hover:border-gold transition-colors duration-300 rounded-[2px]">
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
      </button>
      <div className="grid transition-[grid-template-rows] duration-500 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <p className="pb-6 pr-16 text-foreground/70 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

function NewsletterForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "err">("idle");
  
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setState("err");
    setState("idle");
    setEmail("");
    onSuccess();
  };

  return (
    <form onSubmit={onSubmit} className="mt-8 mx-auto flex flex-col sm:flex-row gap-3 max-w-lg">
      <input
        value={email}
        onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
        type="email"
        required
        placeholder="Your raven's address"
        className="flex-1 bg-obsidian/60 border border-gold/30 px-5 py-4 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-gold transition rounded-[2px]"
      />
      <button type="submit" className="btn-royal shrink-0">
        Enlist Now
      </button>
      {state === "err" && <p className="text-xs text-crimson mt-2 sm:absolute">Enter a valid raven address.</p>}
    </form>
  );
}
