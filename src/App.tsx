import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import {
  ArrowUpRight,
  Code2,
  Download,
  ExternalLink,
  Github,
  Mail,
  Menu,
  Sparkles,
  SquareArrowOutUpRight,
  Zap,
} from "lucide-react";

type Repo = {
  name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
};

type ProjectCard = {
  name: string;
  description: string;
  tags: string[];
  href: string;
  accent: string;
};

type NavItem = {
  label: string;
  href: string;
};

const navigation: NavItem[] = [
  { label: "HOME", href: "#home" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "RESUME", href: "https://github.com/AayushKrGupta" },
  { label: "CONTACT", href: "#contact" },
];

const rotatingWords = ["MOBILE", "AI", "SYSTEMS", "SIMULATION"];

const specializations = [
  "Android Development",
  "Machine Learning",
  "Computer Vision",
  "System Design",
  "Full-Stack Development",
  "Performance Engineering",
];

const skillGroups = [
  {
    title: "Languages",
    items: ["C", "C++", "Python", "JavaScript", "SQL", "Kotlin", "TypeScript"],
  },
  {
    title: "Frontend",
    items: ["React", "Tailwind", "Jetpack Compose", "Expo"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "MySQL", "Firebase", "Room"],
  },
  {
    title: "AI and Machine Learning",
    items: ["TensorFlow", "OpenCV", "NumPy", "Pandas", "Scikit-learn", "Keras"],
  },
];

const achievements = [
  "IIIT Dharwad student",
  "Built Sim Gamepad from scratch",
  "Developed multiple AI projects",
  "Designed cross-platform applications",
  "Published open-source projects on GitHub",
];

const technologies = ["React", "Android", "TensorFlow", "Rust", "Node.js", "MongoDB", "GitHub", "Linux", "Firebase"];

const fallbackProjects: ProjectCard[] = [
  {
    name: "Sim Gamepad",
    description:
      "Transforming smartphones into precision gaming controllers with real-time telemetry and low-latency UDP communication.",
    tags: ["React Native", "Rust", "Kotlin", "WPF", "Telemetry"],
    href: "https://github.com/AayushKrGupta",
    accent: "from-[#fd2601] via-[#f37e1c] to-white",
  },
  {
    name: "MindScribe",
    description: "A modern writing companion built around note capture, sync, and structured organization.",
    tags: ["Jetpack Compose", "Firebase", "Room", "Retrofit"],
    href: "https://github.com/AayushKrGupta",
    accent: "from-white/20 via-[#f37e1c]/50 to-[#fd2601]/70",
  },
  {
    name: "Intelligent Perception Assistant",
    description: "Computer vision and speech-driven assistant for actionable on-device perception.",
    tags: ["Computer Vision", "Speech Recognition", "NLP"],
    href: "https://github.com/AayushKrGupta",
    accent: "from-[#fd2601]/70 via-white/20 to-transparent",
  },
  {
    name: "AlzVision AI",
    description: "A deep learning pipeline for MRI classification and neurologic screening workflows.",
    tags: ["Vision Transformers", "MRI", "Deep Learning"],
    href: "https://github.com/AayushKrGupta",
    accent: "from-[#f37e1c]/60 via-white/20 to-[#090909]",
  },
];

const roleDescriptions = [
  "Software developer specializing in mobile applications, AI systems, computer vision, desktop software, telemetry systems, and modern web technologies.",
  "Building polished products that feel fast, tactile, and technically precise across mobile, desktop, and ML-driven experiences.",
];

function App() {
  const shouldReduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [projects, setProjects] = useState<ProjectCard[]>(fallbackProjects);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % rotatingWords.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadProjects() {
      try {
        const response = await fetch("https://api.github.com/users/AayushKrGupta/repos?per_page=100&sort=updated", {
          headers: {
            Accept: "application/vnd.github+json",
          },
        });

        if (!response.ok) {
          throw new Error("GitHub API request failed");
        }

        const repos = (await response.json()) as Repo[];
        const curated = curateProjects(repos);

        if (mounted && curated.length > 0) {
          setProjects(curated);
        }
      } catch {
        if (mounted) {
          setProjects(fallbackProjects);
        }
      } finally {
        if (mounted) {
          setLoadingProjects(false);
        }
      }
    }

    loadProjects();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !heroRef.current || !marqueeRef.current) {
      return;
    }

    const hero = heroRef.current;
    const marquee = marqueeRef.current;
    const orbElements = gsap.utils.toArray<HTMLElement>('[data-orb="true"]');

    gsap.fromTo(
      hero.querySelectorAll("[data-reveal='true']"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.08,
        ease: "power3.out",
      },
    );

    orbElements.forEach((element, index) => {
      gsap.to(element, {
        x: index % 2 === 0 ? 24 : -20,
        y: index % 2 === 0 ? -18 : 16,
        duration: 9 + index * 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    gsap.to(marquee, {
      xPercent: -50,
      duration: 24,
      repeat: -1,
      ease: "none",
    });
  }, [shouldReduceMotion]);

  const currentWord = rotatingWords[wordIndex];
  const totalProjects = useCountUp(10);
  const totalTechnologies = useCountUp(5);
  const totalApps = useCountUp(4);

  const stats = useMemo(
    () => [
      { value: `${totalProjects}+`, label: "Projects Built" },
      { value: "100,000+", label: "Lines of Code" },
      { value: `${totalTechnologies}+`, label: "Technologies Mastered" },
      { value: `${totalApps}+`, label: "Major Applications" },
    ],
    [totalApps, totalProjects, totalTechnologies],
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#090909] text-white">
      <BackgroundOrbs />
      <AmbientWords />

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:px-6">
          <a href="#home" className="group flex items-center gap-3 text-sm font-medium tracking-[0.32em] text-white/95">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#f37e1c] transition-transform duration-300 group-hover:scale-110">
              ✦
            </span>
            <span className="font-display text-base uppercase tracking-[0.28em] sm:text-lg">AAYUSH KUMAR</span>
            <span className="hidden text-xs uppercase tracking-[0.35em] text-white/55 md:inline">Software Engineer</span>
          </a>

          <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.34em] text-white/70 lg:flex">
            {navigation.map((item) => (
              <a key={item.label} href={item.href} className="transition-colors duration-300 hover:text-white">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <MagneticButton
              href="#contact"
              className="group border-white/15 bg-white/5 text-white transition-colors duration-300 hover:bg-white hover:text-[#090909]"
            >
              <span>LET'S BUILD</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-white">
                <ArrowUpRight className="h-4 w-4 text-[#f37e1c] transition-colors duration-300 group-hover:text-[#f37e1c]" />
              </span>
            </MagneticButton>

            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        <section id="home" ref={heroRef} className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-20 pt-28 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr_1.1fr] lg:gap-8">
            <div className="space-y-8" data-reveal="true">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/75 backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-[#f37e1c]" />
                Computer Science at IIIT Dharwad
              </div>

              <div className="space-y-3">
                <p className="font-display text-5xl uppercase leading-[0.92] tracking-[0.08em] text-white sm:text-6xl lg:text-7xl xl:text-[6.5rem]">
                  <span className="block">Building</span>
                  <span className="block">The Future</span>
                  <span className="block text-[#fd2601]">Of Software</span>
                </p>

                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.42em] text-white/50 sm:text-base">
                  <span>Moving between</span>
                  <span className="relative min-w-28 overflow-hidden text-[#f37e1c]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentWord}
                        initial={{ y: 26, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -26, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="absolute left-0 top-0 inline-flex w-full justify-start font-semibold"
                      >
                        {currentWord}
                      </motion.span>
                    </AnimatePresence>
                    <span className="invisible">SYSTEMS</span>
                  </span>
                </div>
              </div>

              <p className="max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
                <span className="block text-lg font-medium text-white sm:text-xl">B.Tech CSE Student at IIIT Dharwad</span>
                <span className="mt-3 block max-w-xl text-white/68">{roleDescriptions[0]}</span>
                <span className="mt-3 block max-w-xl text-white/55">{roleDescriptions[1]}</span>
              </p>

              <div className="flex flex-wrap gap-3" data-reveal="true">
                <MagneticButton href="#projects" className="bg-white text-[#090909] shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
                  <span>VIEW PROJECTS</span>
                  <SquareArrowOutUpRight className="h-4 w-4" />
                </MagneticButton>
                <MagneticButton href="#contact" className="border-white/15 bg-white/5 text-white">
                  <span>CONTACT</span>
                  <Mail className="h-4 w-4 text-[#f37e1c]" />
                </MagneticButton>
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-[26rem] items-center justify-center lg:max-w-none" data-reveal="true">
              <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgba(253,38,1,0.28),transparent_55%)] blur-3xl" />

              <div className="relative isolate w-full max-w-[22rem] sm:max-w-[25rem]">
                <div className="absolute -inset-6 rounded-[2.5rem] border border-white/10 bg-white/5 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-3 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),transparent_45%),linear-gradient(180deg,transparent,rgba(0,0,0,0.32))]" />
                  <div className="relative rounded-[2rem] border border-white/10 bg-black/30 p-4">
                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.4em] text-white/60">
                      <span>Portrait Interface</span>
                      <span className="text-[#f37e1c]">A.K.</span>
                    </div>

                    <div className="relative mt-4 overflow-hidden rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(253,38,1,0.18),transparent_28%),radial-gradient(circle_at_50%_75%,rgba(243,126,28,0.18),transparent_35%)]" />
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_35%,rgba(255,255,255,0.04)_35%,rgba(255,255,255,0.04)_42%,transparent_42%)] opacity-60" />
                      <img
                        src="/portrait-aayush.svg"
                        alt="Stylized portrait of Aayush Kumar"
                        className="relative h-[31rem] w-full object-cover grayscale [mask-image:linear-gradient(180deg,black_82%,transparent_100%)]"
                      />
                      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_80px_rgba(253,38,1,0.18),inset_0_0_0_1px_rgba(255,255,255,0.03)]" />
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-white/60">
                      <div className="rounded-2xl border border-white/8 bg-white/5 p-3 text-center">Mobile</div>
                      <div className="rounded-2xl border border-white/8 bg-white/5 p-3 text-center">AI</div>
                      <div className="rounded-2xl border border-white/8 bg-white/5 p-3 text-center">Build</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:justify-self-end" data-reveal="true">
              <GlassCard className="lg:translate-x-6">
                <p className="text-[11px] uppercase tracking-[0.32em] text-white/45">// CURRENTLY BUILDING</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Sim Gamepad</h2>
                <p className="mt-3 text-sm leading-6 text-white/68">
                  Transforming smartphones into precision gaming controllers using React Native, Rust, Kotlin, WPF, and telemetry systems.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.24em] text-white/55">
                  {["React Native", "Rust", "Kotlin", "WPF", "UDP"].map((item) => (
                    <span key={item} className="rounded-full border border-white/8 bg-white/5 px-3 py-1">
                      {item}
                    </span>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="lg:-translate-x-6">
                <p className="text-[11px] uppercase tracking-[0.32em] text-white/45">// SPECIALIZATIONS</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-white/72 sm:grid-cols-3 lg:grid-cols-1">
                  {specializations.map((item) => (
                    <span key={item} className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2">
                      {item}
                    </span>
                  ))}
                </div>
              </GlassCard>

              <GlassCard className="lg:translate-x-8">
                <p className="text-[11px] uppercase tracking-[0.32em] text-white/45">// IN FOCUS</p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.24em] text-white/60">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">IIIT Dharwad</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Software Developer</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Open Source Contributor</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">AI Enthusiast</span>
                </div>
              </GlassCard>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" data-reveal="true">
            {stats.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Featured Projects"
            title="GitHub-backed builds with mobile, desktop, and ML depth"
            description="The portfolio pulls from GitHub when available and falls back to a curated presentation so the section stays fast, resilient, and deployable."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {projects.map((project) => (
              <motion.a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
              >
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${project.accent}`} />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/45">Featured</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{project.name}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <p className="mt-4 min-h-20 text-sm leading-6 text-white/68">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/65"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/45">
                  <Github className="h-4 w-4 text-[#f37e1c]" />
                  <span>GitHub API Ready</span>
                  <ExternalLink className="ml-auto h-4 w-4" />
                </div>
              </motion.a>
            ))}
          </div>

          <p className="mt-4 text-xs uppercase tracking-[0.35em] text-white/40">
            {loadingProjects ? "Syncing GitHub projects..." : "Projects hydrated from GitHub when available."}
          </p>
        </section>

        <section id="skills" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Skills"
            title="A broad stack that spans interfaces, infrastructure, and intelligence"
            description="Each category is animated as a compact card so the section reads well on mobile while still feeling premium on desktop."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group) => (
              <motion.article
                key={group.title}
                whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                  <Code2 className="h-5 w-5 text-[#f37e1c]" />
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/75">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Achievements"
            title="Timeline cards that show momentum, not just milestones"
            description="A short timeline keeps the section scannable and makes the page feel alive without adding heavy motion or clutter."
          />

          <div className="mt-10 grid gap-4">
            {achievements.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="flex items-start gap-5 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-[#f37e1c]">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-white/45">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{item}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 backdrop-blur-2xl sm:p-8 lg:p-10">
            <SectionHeading
              kicker="Contact"
              title="Let’s build something sharp, fast, and memorable"
              description="Open to mobile, AI, and full-stack work that benefits from strong product taste and careful engineering."
            />

            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton href="https://github.com/AayushKrGupta" className="bg-white text-[#090909]">
                <Github className="h-4 w-4" />
                <span>GITHUB PROFILE</span>
              </MagneticButton>
              <MagneticButton href="mailto:aayush@example.com" className="border-white/15 bg-white/5 text-white">
                <Mail className="h-4 w-4 text-[#f37e1c]" />
                <span>EMAIL ME</span>
              </MagneticButton>
              <MagneticButton href="#home" className="border-white/15 bg-white/5 text-white">
                <Download className="h-4 w-4 text-[#f37e1c]" />
                <span>TOP OF PAGE</span>
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black/25">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-[10px] uppercase tracking-[0.45em] text-white/35">Technology stack</div>
          <div className="mt-4 overflow-hidden rounded-full border border-white/10 bg-white/5 py-4">
            <div ref={marqueeRef} className="flex w-max items-center gap-4 whitespace-nowrap px-4">
              {[...technologies, ...technologies].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/80"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#f37e1c]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Aayush Kumar</p>
            <p>Built with React, TypeScript, Tailwind CSS, Framer Motion, GSAP, and Lenis.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function curateProjects(repos: Repo[]): ProjectCard[] {
  const normalized = repos
    .map((repo) => ({
      repo,
      score: projectScore(repo),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 4)
    .map(({ repo }) => ({
      name: repo.name,
      description: repo.description ?? "A featured repository from Aayush Kumar's GitHub profile.",
      tags: repo.topics.length > 0 ? repo.topics.slice(0, 4) : repo.language ? [repo.language] : ["GitHub"],
      href: repo.homepage ?? repo.html_url,
      accent: repo.language?.toLowerCase().includes("rust") ? "from-[#fd2601] via-[#f37e1c] to-white" : "from-white/20 via-[#f37e1c]/50 to-[#fd2601]/70",
    }));

  return normalized.length > 0 ? normalized : fallbackProjects;
}

function projectScore(repo: Repo) {
  const text = `${repo.name} ${repo.description ?? ""} ${repo.topics.join(" ")}`.toLowerCase();
  const keywords = [
    "simgamepad",
    "mindscribe",
    "intelligent",
    "perception",
    "alz",
    "vision",
    "water",
    "marketing",
    "android",
    "ml",
    "computer vision",
  ];

  return keywords.reduce((score, keyword) => score + (text.includes(keyword) ? 1 : 0), 0) + Math.min(repo.stargazers_count, 3) / 3;
}

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    let start = 0;

    const animate = (timestamp: number) => {
      if (!start) {
        start = timestamp;
      }

      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [duration, shouldReduceMotion, target]);

  return value;
}

function MagneticButton({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 24, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 300, damping: 24, mass: 0.8 });

  const onPointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left - rect.width / 2) / 7;
    const offsetY = (event.clientY - rect.top - rect.height / 2) / 7;

    x.set(offsetX);
    y.set(offsetY);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={`inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] transition-colors duration-300 ${className ?? ""}`}
    >
      {children}
    </motion.a>
  );
}

function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#f37e1c]">{kicker}</p>
      <h2 className="mt-3 font-display text-3xl uppercase leading-tight tracking-[0.08em] text-white sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">{description}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-center backdrop-blur-xl"
    >
      <p className="font-display text-4xl uppercase tracking-[0.08em] text-white sm:text-5xl">{value}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.32em] text-white/55">{label}</p>
    </motion.div>
  );
}

function GlassCard({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

function BackgroundOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div data-orb="true" className="absolute -right-24 bottom-10 h-[300px] w-[300px] rounded-full bg-[#fd2601] opacity-40 blur-[120px]" />
      <div data-orb="true" className="absolute -left-20 bottom-20 h-[600px] w-[600px] rounded-full bg-[#f37e1c] opacity-30 blur-[100px]" />
      <div data-orb="true" className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-white opacity-[0.04] blur-[160px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(253,38,1,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(243,126,28,0.08),transparent_35%)] opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_30%,rgba(0,0,0,0.18))]" />
    </div>
  );
}

function AmbientWords() {
  const words = ["SIM GAMEPAD", "AI", "REACT", "RUST", "ANDROID"];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {words.map((word, index) => (
        <span
          key={word}
          className="absolute select-none font-display text-[clamp(4rem,10vw,10rem)] uppercase tracking-[0.12em] text-white/5 blur-[5px]"
          style={{
            left: `${8 + index * 15}%`,
            top: `${12 + (index % 2) * 20}%`,
            transform: `rotate(${index % 2 === 0 ? -12 : 10}deg)`,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

export default App;
