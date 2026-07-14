import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Play, Volume2, VolumeX, ChevronDown, Menu, X, ArrowRight,
  Crown, Flame, Snowflake, Sword, Skull, Shield,
  Star, ChevronLeft, ChevronRight, Plus, Minus, Award,
  Instagram, Twitter, Youtube, Mail, MapPin,
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
      { title: "Elden Sovereign — A Realm Forged in Blood, A Crown Claimed in Fire" },
      { name: "description", content: "Enter the cinematic epic fantasy saga of Elden Sovereign — dragons, dynasties, and a shattered crown." },
      { property: "og:image", content: hero },
      { property: "twitter:image", content: hero },
    ],
  }),
  component: Landing,
});

/* ----------------------------- Particles ------------------------------ */
function Embers({ count = 30 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 12}s`,
        duration: `${8 + Math.random() * 10}s`,
        drift: `${(Math.random() - 0.5) * 200}px`,
        size: `${2 + Math.random() * 3}px`,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((e) => (
        <span
          key={e.id}
          className="ember"
          style={{
            left: e.left,
            animationDelay: e.delay,
            animationDuration: e.duration,
            width: e.size,
            height: e.size,
            ["--drift" as string]: e.drift,
          }}
        />
      ))}
    </div>
  );
}
function Snow({ count = 40 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 20}s`,
        duration: `${14 + Math.random() * 20}s`,
        drift: `${(Math.random() - 0.5) * 200}px`,
        size: `${2 + Math.random() * 3}px`,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((s) => (
        <span
          key={s.id}
          className="snow"
          style={{
            left: s.left,
            animationDelay: s.delay,
            animationDuration: s.duration,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            ["--drift" as string]: s.drift,
          }}
        />
      ))}
    </div>
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
  { name: "House Aurelius", sigil: Crown, motto: "Gold Never Sleeps", territory: "The Solar Valleys", desc: "An ancient bloodline of sun-crowned kings whose gilded banners have flown over every throne of the realm for three centuries.", members: ["King Alaric Elden", "Prince Corvin", "Lady Isolde"] },
  { name: "House Draconis", sigil: Flame, motto: "Breath of the Storm", territory: "The Obsidian Peaks", desc: "Dragon-kin exiles who returned from across the Ashen Sea with wing and fire, laying claim to the ruined heartland of the old empire.", members: ["Lyra Thorne", "Kaelen Voss", "The Ashen Twins"] },
  { name: "House Umbra", sigil: Skull, motto: "Silent as Grave", territory: "The Shadow Wetlands", desc: "Whispered assassins and keepers of forgotten oaths, cloaked in mist and moving only when the moons hide their faces.", members: ["Elowen Sovereign", "The Veiled Prior"] },
  { name: "House Veridian", sigil: Shield, motto: "Rooted in Steel", territory: "Ancient Evergrowth", desc: "Stone-hearted mountain lords whose fortresses grow from the living rock, unbroken by siege for a thousand winters.", members: ["Sir Kaelen Voss", "Lord Rhaen"] },
  { name: "House Thalassa", sigil: Snowflake, motto: "Master the Tide", territory: "The Tide-Locked Isles", desc: "Sea-witches and iron-hulled raiders who bargain with the drowned gods and call storms to answer their command.", members: ["Serafina Kaal", "Admiral Vex"] },
];

const CHARACTERS = [
  { name: "King Alaric Elden", role: "The Iron Crown", actor: "Portrayed by Mark Strong", img: charKing, bio: "The last of the Aurelius line, Alaric wears an iron circlet forged from the swords of the kings he unmade. His silence is louder than any decree.", house: "House Aurelius" },
  { name: "Lyra Thorne", role: "The Silver Wolf", actor: "Portrayed by Florence Pugh", img: charWarrior, bio: "Battle-scarred and untamed, Lyra rides at the head of the Draconis riders. She has slain seven kings and remembers each name.", house: "House Draconis" },
  { name: "Valerius Malleon", role: "The Arch-Scholar", actor: "Portrayed by Bill Nighy", img: charMage, bio: "Keeper of the Crystal Codex and last living speaker of the elder tongue. He counsels every throne, and outlives each of them.", house: "The Vault" },
  { name: "Elowen Sovereign", role: "The Velvet Shadow", actor: "Portrayed by Anya Taylor-Joy", img: charLady, bio: "Court-born and knife-quiet, Elowen weaves alliances the way spiders weave silk — with patience, symmetry, and the intent to bind.", house: "House Umbra" },
  { name: "Sir Kaelen Voss", role: "The Unbroken", actor: "Portrayed by Henry Cavill", img: charKnight, bio: "Sworn sword of the North Passes. His shield has cracked but never fallen. Winter follows in his footsteps.", house: "House Veridian" },
  { name: "Serafina Kaal", role: "The Black Rose", actor: "Portrayed by Gemma Chan", img: charRose, bio: "Poisoner, poet and heir to the Tide-Locked Isles. She sings in six dead languages and has forgiven no one.", house: "House Thalassa" },
];

const SEASONS = [
  { n: 1, year: 2021, title: "The Awakening", episodes: 10, summary: "The realm stirs as King Alaric declares the Unification Accords, sparking tensions among the northern houses." },
  { n: 2, year: 2022, title: "Shattered Oaths", episodes: 12, summary: "Trust becomes a luxury. The first great betrayals cascade across the Frozen Plains." },
  { n: 3, year: 2023, title: "The Crimson Winter", episodes: 8, summary: "A brutal winter falls, bringing out the best in warriors and the worst in men. Dragons return." },
  { n: 4, year: 2024, title: "Fire of the North", episodes: 10, summary: "Rebellion, coronations, and a prophecy that refuses to die. The crown breaks; a new age begins." },
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

/* --------------------------------- Page -------------------------------- */
function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [active, setActive] = useState("home");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <div className="relative min-h-screen bg-background text-foreground">
      {/* ============================ NAV ============================ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl bg-obsidian/70 border-b border-gold/10" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="#home" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center border border-gold/60">
              <Crown className="h-4 w-4 text-gold" />
            </span>
            <span className="font-display text-sm tracking-[0.4em] text-gold">
              ELDEN <span className="text-foreground/80">SOVEREIGN</span>
            </span>
          </a>
          <nav className="hidden xl:flex items-center gap-7 text-[11px] font-semibold tracking-[0.28em] uppercase">
            {NAV.slice(1, 8).map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative transition-colors ${
                  active === id ? "text-gold" : "text-foreground/70 hover:text-gold"
                }`}
              >
                {label}
                {active === id && (
                  <span className="absolute -bottom-2 left-0 h-px w-full bg-gold" />
                )}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#trailer" className="hidden md:inline-flex btn-royal !py-3 !px-5 !text-[10px]">
              Join the Conquest
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
        <div className="absolute inset-0 bg-obsidian/95 backdrop-blur-2xl" onClick={() => setMenuOpen(false)} />
        <div className="relative flex h-full flex-col p-8">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm tracking-[0.4em] text-gold">ELDEN SOVEREIGN</span>
            <button onClick={() => setMenuOpen(false)} className="grid h-10 w-10 place-items-center border border-gold/40 text-gold" aria-label="Close menu">
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-5">
            {NAV.map(([id, label], i) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-3xl text-foreground hover:text-gold transition-colors"
                style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateX(0)" : "translateX(-30px)", transition: `all 0.5s ease ${i * 40 + 100}ms` }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ============================ HERO ============================ */}
      <section id="home" className="relative min-h-screen overflow-hidden">
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
        <Embers count={35} />
        <Snow count={25} />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-32 pb-24 text-center lg:px-10">
          <p className="eyebrow text-reveal">The Prophecy Unfolds</p>
          <h1
            className="mt-6 font-display text-[clamp(3rem,10vw,9rem)] leading-[0.9] text-reveal"
            style={{ animationDelay: "150ms" }}
          >
            <span className="block text-gold-gradient">ELDEN</span>
            <span className="block text-foreground/90">SOVEREIGN</span>
          </h1>
          <div className="mt-8 flex items-center gap-4 text-reveal" style={{ animationDelay: "300ms" }}>
            <span className="h-px w-16 bg-gold/60" />
            <span className="font-serif italic text-lg md:text-xl text-parchment/80">
              "A realm forged in blood. A crown claimed in fire."
            </span>
            <span className="h-px w-16 bg-gold/60" />
          </div>
          <p
            className="mt-8 max-w-2xl font-serif text-lg md:text-xl leading-relaxed text-foreground/70 text-reveal"
            style={{ animationDelay: "450ms" }}
          >
            When the last Sovereign vanishes without heir, five great houses tear the realm apart in pursuit of a
            fragmented crown. Dragons wake. Winters lengthen. The old gods listen again.
          </p>
          <div
            className="mt-12 flex flex-col sm:flex-row items-center gap-4 text-reveal"
            style={{ animationDelay: "600ms" }}
          >
            <a href="#trailer" className="btn-royal">
              <Play className="h-3.5 w-3.5 fill-current" /> Watch the Trailer
            </a>
            <a href="#story" className="btn-ghost-royal">
              Explore the Realm <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Ambient controls & scroll cue */}
        <div className="absolute right-6 top-1/2 z-10 -translate-y-1/2 flex flex-col gap-3">
          <button
            onClick={() => setMuted((m) => !m)}
            className="grid h-11 w-11 place-items-center border border-gold/40 text-gold hover:bg-gold/10 transition"
            aria-label={muted ? "Enable ambient sound" : "Mute"}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
        <a href="#story" className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-gold">
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll to Begin</span>
          <span className="h-8 w-px bg-gold/60 animate-pulse" />
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </section>

      {/* ============================ STORY ============================ */}
      <section id="story" className="relative py-32 overflow-hidden">
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
                <p className="mt-6 italic font-serif text-lg text-gold/80">
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
              <div className="relative aspect-[4/5] overflow-hidden bg-panel">
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
      <section id="houses" className="relative py-32">
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

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {HOUSES.map((h, i) => (
              <Reveal key={h.name} delay={i * 80}>
                <HouseCard {...h} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== CHARACTERS ========================== */}
      <section id="characters" className="relative py-32 overflow-hidden">
        <Embers count={12} />
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
      <section id="seasons" className="relative py-32 bg-obsidian/60">
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
      <section id="trailer" className="relative py-32 overflow-hidden">
        <Embers count={20} />
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow">Cinematic Teaser · 4K UHD</p>
              <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)]">Behold the Realm</h2>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-12 relative bg-panel p-2 md:p-3">
              <div className="absolute -inset-px -z-10 opacity-60" style={{ background: "var(--grad-gold)", filter: "blur(30px)" }} />
              <div className="relative aspect-video overflow-hidden">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/BpJYNVhGf1s?rel=0"
                  title="Elden Sovereign — Official Cinematic Trailer"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center justify-between px-4 py-3 text-[10px] tracking-[0.32em] uppercase text-gold/70">
                <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" /> Live Broadcast</span>
                <span>Runtime · 2:41</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ GALLERY ============================ */}
      <section id="gallery" className="relative py-32">
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
                  className="group relative h-full w-full overflow-hidden bg-panel"
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
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-obsidian/95 backdrop-blur-xl p-6">
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 grid h-11 w-11 place-items-center border border-gold/40 text-gold hover:bg-gold/10"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              onClick={() => setLightbox((i) => (i === null ? 0 : (i - 1 + GALLERY.length) % GALLERY.length))}
              className="absolute left-6 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center border border-gold/40 text-gold hover:bg-gold/10"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setLightbox((i) => (i === null ? 0 : (i + 1) % GALLERY.length))}
              className="absolute right-6 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center border border-gold/40 text-gold hover:bg-gold/10"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="relative max-h-[85vh] max-w-6xl">
              <img src={GALLERY[lightbox].src} alt={GALLERY[lightbox].alt} className="max-h-[85vh] w-auto object-contain" />
              <p className="mt-4 text-center eyebrow">{GALLERY[lightbox].alt}</p>
            </div>
          </div>
        )}
      </section>

      {/* ============================ REVIEWS ============================ */}
      <section id="reviews" className="relative py-32 bg-obsidian/60">
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
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.source} delay={i * 80}>
                <div className="bg-panel bg-panel-hover p-8 relative">
                  <span className="absolute top-4 right-6 font-display text-6xl text-gold/25 leading-none">"</span>
                  <p className="font-serif text-lg leading-relaxed text-foreground/85 italic">"{r.quote}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center border border-gold/40 text-gold text-xs font-semibold">
                      {r.source[0]}
                    </span>
                    <div>
                      <p className="text-sm font-semibold tracking-widest uppercase text-parchment">{r.source}</p>
                      <p className="text-xs text-foreground/50">{r.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ AWARDS / TIMELINE ============================ */}
      <section id="awards" className="relative py-32">
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
                      <div className="bg-panel p-8 bg-panel-hover">
                        <p className="eyebrow">{t.season}</p>
                        <h3 className="mt-3 font-serif text-2xl">{t.title}</h3>
                        <p className="mt-3 text-foreground/70 leading-relaxed">{t.body}</p>
                        <div className={`mt-5 inline-flex items-center gap-2 border border-gold/40 px-3 py-1.5 ${i % 2 ? "" : "md:ml-auto"}`}>
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
      <section id="faq" className="relative py-32 bg-obsidian/60">
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
      <section id="contact" className="relative py-32 overflow-hidden">
        <Embers count={18} />
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <div className="bg-panel p-10 md:p-16 text-center relative">
              <div className="absolute -inset-px -z-10 opacity-40" style={{ background: "var(--grad-gold)", filter: "blur(40px)" }} />
              <p className="eyebrow">Sworn to the Chronicle</p>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)]">Enlist in the Chronicles</h2>
              <p className="mt-4 mx-auto max-w-lg text-foreground/70">
                Receive dispatches from the writers' hall, unreleased concept art, and first word on new seasons.
              </p>
              <NewsletterForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ FOOTER ============================ */}
      <footer className="relative border-t border-gold/15 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center border border-gold/60">
                  <Crown className="h-4 w-4 text-gold" />
                </span>
                <span className="font-display text-lg tracking-[0.4em] text-gold">ELDEN SOVEREIGN</span>
              </div>
              <p className="mt-6 max-w-md font-serif text-foreground/70 leading-relaxed">
                An original epic fantasy portfolio project. Every character, house, and image is invented for
                this showcase. No affiliation with any existing series.
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
                {NAV.slice(1, 7).map(([id, l]) => (
                  <li key={id}><a href={`#${id}`} className="hover:text-gold transition">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Contact</p>
              <ul className="mt-4 space-y-3 text-sm text-foreground/70">
                <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gold" /> ravens@eldensovereign.com</li>
                <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-gold" /> The Grand Archive, Old City</li>
                <li className="flex items-center gap-2"><Sword className="h-3.5 w-3.5 text-gold" /> Press Kit · Legal · Terms</li>
              </ul>
            </div>
          </div>
          <div className="divider-gold mt-14" />
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/50">
            <p>© {new Date().getFullYear()} Elden Sovereign Studios. All rights reserved. Pursue the Crown.</p>
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
function HouseCard({ name, sigil: Icon, motto, territory, desc, members }: {
  name: string; sigil: React.ElementType; motto: string; territory: string; desc: string; members: string[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-panel bg-panel-hover flex flex-col p-6 h-full">
      <div className="grid h-14 w-14 place-items-center border border-gold/50 text-gold">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 font-serif text-2xl">{name}</h3>
      <p className="mt-1 italic text-xs tracking-[0.2em] uppercase text-crimson/90">"{motto}"</p>
      <p className="mt-6 eyebrow">Territory</p>
      <p className="mt-2 text-sm text-foreground/80">{territory}</p>
      <p className={`mt-4 text-sm text-foreground/60 leading-relaxed transition-all ${open ? "" : "line-clamp-3"}`}>{desc}</p>
      {open && (
        <div className="mt-4">
          <p className="eyebrow">Key Members</p>
          <ul className="mt-2 space-y-1 text-sm text-foreground/70">
            {members.map((m) => <li key={m}>· {m}</li>)}
          </ul>
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)} className="mt-6 self-start text-[11px] tracking-[0.28em] uppercase text-gold flex items-center gap-2 border-b border-gold/40 pb-1 hover:border-gold transition">
        {open ? "Show Less" : "Learn More"}
        <ArrowRight className={`h-3 w-3 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>
    </div>
  );
}

function CharacterCard({ name, role, actor, img, bio, house }: {
  name: string; role: string; actor: string; img: string; bio: string; house: string;
}) {
  const [open, setOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
    setTilt({ x, y });
  };
  return (
    <>
      <div
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        onClick={() => setOpen(true)}
        className="group relative aspect-[3/4] overflow-hidden bg-panel cursor-pointer"
        style={{ transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`, transition: "transform 0.3s ease" }}
      >
        <img src={img} alt={`Portrait of ${name}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700" style={{ boxShadow: "inset 0 0 80px oklch(0.82 0.14 82 / 0.35)" }} />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="eyebrow">{role}</p>
          <h3 className="mt-2 font-serif text-2xl text-parchment">{name}</h3>
          <p className="mt-1 italic text-sm text-foreground/70">{actor}</p>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-obsidian/95 backdrop-blur-xl p-6" onClick={() => setOpen(false)}>
          <div className="relative max-w-3xl w-full bg-panel grid md:grid-cols-[1fr_1.2fr]" onClick={(e) => e.stopPropagation()}>
            <img src={img} alt={name} className="h-full w-full object-cover max-h-[500px]" />
            <div className="p-8">
              <p className="eyebrow">{house}</p>
              <h3 className="mt-2 font-serif text-3xl">{name}</h3>
              <p className="mt-1 italic text-sm text-gold">{role} · {actor}</p>
              <div className="divider-gold mt-5" />
              <p className="mt-5 font-serif text-lg leading-relaxed text-foreground/85">{bio}</p>
              <button onClick={() => setOpen(false)} className="mt-8 btn-ghost-royal">Close</button>
            </div>
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 grid h-9 w-9 place-items-center border border-gold/40 text-gold" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function SeasonRow({ n, year, title, episodes, summary }: { n: number; year: number; title: string; episodes: number; summary: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-panel bg-panel-hover">
      <button onClick={() => setOpen((o) => !o)} className="w-full grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto_auto_auto] gap-6 items-center p-6 text-left">
        <span className="font-display text-4xl text-gold/60 w-16">{String(n).padStart(2, "0")}</span>
        <div>
          <p className="eyebrow">Volume {n} · {year}</p>
          <h3 className="mt-2 font-serif text-2xl">{title}</h3>
        </div>
        <span className="hidden md:block text-sm text-foreground/60">{episodes} Episodes</span>
        <span className="hidden md:block text-sm text-foreground/60">{year}</span>
        <span className="grid h-10 w-10 place-items-center border border-gold/40 text-gold">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <div className="grid transition-[grid-template-rows] duration-500" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <div className="px-6 pb-8 md:pl-28 max-w-3xl">
            <p className="font-serif text-lg leading-relaxed text-foreground/75">{summary}</p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-2 text-sm text-foreground/60">
              {Array.from({ length: Math.min(episodes, 6) }).map((_, i) => (
                <li key={i} className="flex items-center justify-between border-b border-gold/10 pb-2">
                  <span>Ep. {String(i + 1).padStart(2, "0")} · Chapter of the {["Ember", "Blade", "Frost", "Wolf", "Crown", "Ashes"][i]}</span>
                  <span className="text-gold/60">54:00</span>
                </li>
              ))}
            </ul>
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
    <div ref={ref} className="bg-panel p-8 text-center bg-panel-hover">
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
          <span className="font-display text-3xl text-gold-gradient">{display}</span>
        </div>
      </div>
      <p className="mt-6 eyebrow">{label}</p>
      <p className="mt-2 text-sm text-foreground/60">{note}</p>
    </div>
  );
}

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between gap-6 py-6 text-left group">
        <span className="font-serif text-lg md:text-xl group-hover:text-gold transition">{q}</span>
        <span className="grid h-9 w-9 shrink-0 place-items-center border border-gold/40 text-gold">
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

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setState("err");
    setState("ok");
    setEmail("");
    setTimeout(() => setState("idle"), 4000);
  };
  return (
    <form onSubmit={onSubmit} className="mt-8 mx-auto flex flex-col sm:flex-row gap-3 max-w-lg">
      <input
        value={email}
        onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
        type="email"
        required
        placeholder="Your raven's address"
        className="flex-1 bg-obsidian/60 border border-gold/30 px-5 py-4 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-gold transition"
      />
      <button type="submit" className="btn-royal">
        {state === "ok" ? "Sworn ✓" : "Enlist"}
      </button>
      {state === "err" && <p className="text-xs text-crimson mt-2 sm:absolute">Enter a valid raven address.</p>}
    </form>
  );
}
