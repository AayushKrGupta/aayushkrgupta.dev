import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";

const heroBackground =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85";

const portraitImage = "/aayush_animated.png";

const marqueeImages = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

const aboutDecor = [
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
    className: "top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]",
    delay: 0.1,
    x: -80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
    className: "top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]",
    delay: 0.15,
    x: 80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
    className: "bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]",
    delay: 0.25,
    x: -80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
    className: "bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]",
    delay: 0.3,
    x: 80,
  },
] as const;

const skills = [
  {
    number: "01",
    name: "Android Development",
    description:
      "Jetpack Compose, Kotlin, and cross-platform mobile workflows shaped around clean product thinking and fast execution.",
  },
  {
    number: "02",
    name: "Machine Learning",
    description:
      "TensorFlow, Scikit-learn, Pandas, and deep-learning workflows for practical applications and research-driven prototypes.",
  },
  {
    number: "03",
    name: "Computer Vision",
    description:
      "Vision pipelines, OCR-style interactions, image understanding, and perception systems that make software feel intelligent.",
  },
  {
    number: "04",
    name: "System Design",
    description:
      "Telemetry, architecture, and performance-aware product systems built to stay responsive, reliable, and maintainable.",
  },
  {
    number: "05",
    name: "Full-Stack Development",
    description:
      "React, Tailwind, Node.js, Express, REST APIs, MongoDB, Firebase, and MySQL for modern end-to-end product delivery.",
  },
] as const;

type ProjectCard = {
  number: string;
  category: string;
  name: string;
  images: [string, string, string];
};

const projects: ProjectCard[] = [
  {
    number: "01",
    category: "Mobile / Telemetry",
    name: "Sim Gamepad",
    images: [
      "/aayush_animated.png",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
    ],
  },
  {
    number: "02",
    category: "Productivity / Android",
    name: "MindScribe",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
    ],
  },
  {
    number: "03",
    category: "AI / Vision",
    name: "AlzVision AI",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
    ],
  },
];

const aboutText =
  "Aayush Kumar is a Electronics and Communication Engineering student at IIIT Dharwad, a software developer, AI enthusiast, and creator of mobile, desktop, and machine-learning projects. I enjoy building polished experiences across Android, computer vision, system design, and modern web technologies.";

function App() {
  useEffect(() => {
    document.title = "Aayush Kumar — 3D Creator";
  }, []);

  return (
    <main className="overflow-x-clip bg-[#0C0C0C] text-[#D7E2EA]">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}

function HeroSection() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="relative flex h-screen w-full flex-col justify-between overflow-x-clip bg-[#0C0C0C] px-6 pt-6 pb-7 sm:px-10 sm:pt-8 sm:pb-8 md:pb-10">
      <FadeIn delay={0} y={-20} className="w-full z-30">
        <nav className="flex w-full items-center justify-between gap-4 text-[#D7E2EA]">
          {[
            ["About", "#about"],
            ["Skills", "#skills"],
            ["Projects", "#projects"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
            >
              {label}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className="w-full flex-1 flex flex-col justify-start">
        <FadeIn delay={0.15} y={40} className="w-full">
          <div className="mt-6 sm:mt-4 md:-mt-5 overflow-hidden w-full flex justify-center text-center">
            <h1 className="hero-heading text-center w-full whitespace-nowrap font-black uppercase leading-none tracking-tight text-[10.5vw] sm:text-[11.5vw] md:text-[12.2vw] lg:text-[13vw]">
              Hi, i&apos;m Aayush
            </h1>
          </div>
        </FadeIn>
      </div>

      <motion.div
        initial={false}
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-10 w-[340px] sm:w-[450px] md:w-[560px] lg:w-[660px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0"
        style={{ willChange: "transform" }}
      >
        <Magnet padding={150} strength={3} reduceMotion={reduceMotion}>
          <FadeIn delay={0.6} y={30} className="pointer-events-auto w-full">
            <img src={portraitImage} alt="Portrait" className="h-full w-full object-cover" />
          </FadeIn>
        </Magnet>
      </motion.div>

      <div className="relative z-20 flex w-full items-end justify-between gap-4">
        <FadeIn delay={0.35} y={20} className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
          <p className="text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA]">
            a software developer driven by crafting striking and unforgettable projects across mobile, desktop, and ai systems
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton href="#contact">Contact Me</ContactButton>
        </FadeIn>
      </div>

      <style>{heroAnimations(reduceMotion)}</style>
    </section>
  );
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const sectionTop = sectionRef.current?.getBoundingClientRect().top ?? 0;
      const scrollY = window.scrollY ?? window.pageYOffset;
      const value = (scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(value);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const firstRow = marqueeImages.slice(0, 11);
  const secondRow = marqueeImages.slice(11);

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 pb-10 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <MarqueeRow images={firstRow} offset={offset} direction="right" />
        <MarqueeRow images={secondRow} offset={offset} direction="left" />
      </div>
    </section>
  );
}

function MarqueeRow({
  images,
  offset,
  direction,
}: {
  images: string[];
  offset: number;
  direction: "right" | "left";
}) {
  const transform = direction === "right" ? `translate3d(${offset - 200}px,0,0)` : `translate3d(${-(offset - 200)}px,0,0)`;

  return (
    <div className="overflow-hidden">
      <div className="flex w-max gap-3" style={{ transform, willChange: "transform" } as CSSProperties}>
        {[...images, ...images, ...images].map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt=""
            loading="lazy"
            className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
          />
        ))}
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10">
      {aboutDecor.map((item) => (
        <motion.img
          key={item.src}
          src={item.src}
          alt=""
          className={`pointer-events-none absolute ${item.className}`}
          initial={{ opacity: 0, x: item.x, y: 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: item.delay, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "50px", amount: 0 }}
        />
      ))}

      <div className="flex w-full flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading text-center font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText text={aboutText} />

          <FadeIn delay={0.35} y={20}>
            <ContactButton href="#contact">Contact Me</ContactButton>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function AnimatedText({ text }: { text: string }) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: paragraphRef, offset: ["start 0.8", "end 0.2"] });
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);
  });

  const characters = useMemo(() => Array.from(text), [text]);

  return (
    <p
      ref={paragraphRef}
      className="max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
      aria-label={text}
    >
      {characters.map((character, index) => {
        const threshold = characters.length > 1 ? index / (characters.length - 1) : 1;
        const distance = Math.abs(progress - threshold);
        const opacity = Math.max(0.2, Math.min(1, 1 - distance / 0.08));

        return (
          <span key={`${character}-${index}`} className="relative inline-block">
            <span className="invisible">{character === " " ? "\u00A0" : character}</span>
            <span className="absolute inset-0" style={{ opacity }}>
              {character === " " ? "\u00A0" : character}
            </span>
          </span>
        );
      })}
    </p>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn delay={0} y={40}>
        <h2 className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)] text-[#0C0C0C] sm:mb-20 md:mb-28">
          Skills
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {skills.map((skill, index) => (
          <FadeIn key={skill.number} delay={index * 0.1} y={24}>
            <div className="flex gap-6 border-b border-[rgba(12,12,12,0.15)] py-8 sm:gap-8 sm:py-10 md:py-12">
              <div className="w-[clamp(3rem,10vw,140px)] shrink-0 font-black leading-none text-[clamp(3rem,10vw,140px)] text-[#0C0C0C]">
                {skill.number}
              </div>
              <div className="flex-1">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-tight tracking-wide text-[#0C0C0C]">
                  {skill.name}
                </h3>
                <p className="mt-2 max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed text-[#0C0C0C]/60">
                  {skill.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pt-20 pb-36 text-[#D7E2EA] sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-24 md:pb-48"
    >
      <FadeIn delay={0} y={40}>
        <h2 className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)] sm:mb-20 md:mb-28">
          Project
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-7xl relative pb-20">
        {projects.map((project, index) => (
          <ProjectFolderCard
            key={project.name}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectFolderCard({
  project,
  index,
}: {
  project: ProjectCard;
  index: number;
  total: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.6, 0.95, 1]);

  return (
    <div
      ref={containerRef}
      className="sticky mb-16 sm:mb-24"
      style={{
        top: `${80 + index * 36}px`,
        zIndex: index + 1,
      }}
    >
      <motion.article
        style={{
          scale,
          opacity,
        }}
        className="relative rounded-[32px] sm:rounded-[44px] md:rounded-[56px] border-2 border-[#D7E2EA]/30 bg-[#0C0C0C] p-5 sm:p-8 md:p-10 shadow-[0_-10px_35px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all duration-300 hover:border-[#D7E2EA]/70"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#D7E2EA]/15 pb-6 sm:pb-8">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="font-black leading-none text-[clamp(3rem,10vw,140px)] text-[#D7E2EA]">
              {project.number}
            </div>
            <div>
              <div className="text-[clamp(0.75rem,1vw,1rem)] font-medium uppercase tracking-[0.3em] text-[#D7E2EA]/55">
                {project.category}
              </div>
              <h3 className="mt-2 text-[clamp(1rem,2.2vw,2.1rem)] font-bold uppercase tracking-wide text-[#D7E2EA]">
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton href="#">Live Project</LiveProjectButton>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[40%_60%]">
          <div className="grid gap-4">
            <img
              src={project.images[0]}
              alt=""
              loading="lazy"
              className="h-[clamp(140px,17vw,240px)] w-full rounded-[24px] sm:rounded-[36px] md:rounded-[44px] object-cover"
            />
            <img
              src={project.images[1]}
              alt=""
              loading="lazy"
              className="h-[clamp(170px,23vw,350px)] w-full rounded-[24px] sm:rounded-[36px] md:rounded-[44px] object-cover"
            />
          </div>

          <div className="min-h-full">
            <img
              src={project.images[2]}
              alt=""
              loading="lazy"
              className="h-full min-h-[clamp(330px,44vw,600px)] w-full rounded-[24px] sm:rounded-[36px] md:rounded-[44px] object-cover"
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        delay: reduceMotion ? 0 : delay,
        duration: reduceMotion ? 0.01 : duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
    >
      {children}
    </motion.div>
  );
}

function Magnet({
  children,
  padding,
  strength,
  reduceMotion,
}: {
  children: ReactNode;
  padding: number;
  strength: number;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, active: false });

  const update = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion) {
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;

    const withinX = Math.abs(dx) <= rect.width / 2 + padding;
    const withinY = Math.abs(dy) <= rect.height / 2 + padding;

    if (!withinX || !withinY) {
      setTransform({ x: 0, y: 0, active: false });
      return;
    }

    setTransform({ x: dx / strength, y: dy / strength, active: true });
  };

  return (
    <div
      ref={ref}
      onPointerMove={update}
      onPointerLeave={() => setTransform({ x: 0, y: 0, active: false })}
      className="will-change-transform"
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: transform.active ? "transform 0.3s ease-out" : "transform 0.6s ease-in-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

function ContactButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="contact-button inline-flex items-center justify-center text-xs font-medium uppercase tracking-widest sm:text-sm md:text-base">
      {children}
    </a>
  );
}

function LiveProjectButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="live-project-button inline-flex items-center justify-center text-sm font-medium uppercase tracking-widest sm:text-base">
      {children}
    </a>
  );
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

function heroAnimations(reduceMotion: boolean) {
  return `
    .anim-fade-in {
      animation: anim-fade-in ${reduceMotion ? "0.01ms" : "1.2s"} ease-out both;
    }

    .anim-rise-in {
      animation: anim-rise-in ${reduceMotion ? "0.01ms" : "1.4s"} cubic-bezier(0.22, 1, 0.36, 1) both;
      animation-delay: ${reduceMotion ? "0ms" : "300ms"};
    }

    .anim-fade-up {
      animation: anim-fade-up ${reduceMotion ? "0.01ms" : "0.9s"} cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    .anim-line {
      animation: anim-line ${reduceMotion ? "0.01ms" : "1.1s"} cubic-bezier(0.76, 0, 0.24, 1) both;
      animation-delay: ${reduceMotion ? "0ms" : "1200ms"};
    }

    .marquee {
      animation: marquee 30s linear infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .anim-fade-in,
      .anim-rise-in,
      .anim-fade-up,
      .anim-line,
      .marquee {
        animation-duration: 0.01ms !important;
        animation-delay: 0ms !important;
        animation-iteration-count: 1 !important;
      }
    }

    @keyframes anim-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes anim-rise-in {
      from { opacity: 0; transform: translateY(4vh) scale(1.03); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes anim-fade-up {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes anim-line {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }

    @keyframes marquee {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
  `;
}

function ContactSection() {
  const socials = [
    {
      name: "GitHub",
      username: "github.com/AayushKrGupta",
      url: "https://github.com/AayushKrGupta",
      icon: Github,
    },
    {
      name: "LinkedIn",
      username: "AayushKrGupta",
      url: "https://linkedin.com/in/AayushKrGupta",
      icon: Linkedin,
    },
    {
      name: "Twitter / X",
      username: "@AaayushKrGupta",
      url: "https://x.com/AaayushKrGupta",
      icon: Twitter,
    },
    {
      name: "Instagram",
      username: "@aayush.kumar.gupta",
      url: "https://instagram.com/aayush.kumar.gupta",
      icon: Instagram,
    },
  ];

  return (
    <section
      id="contact"
      className="relative z-10 border-t border-[#D7E2EA]/10 bg-[#0C0C0C] px-5 py-20 text-[#D7E2EA] sm:px-8 sm:py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn delay={0} y={40}>
          <div className="mb-12 text-center sm:mb-16">
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-[#D7E2EA]/60">
              Get In Touch
            </span>
            <h2 className="hero-heading mt-3 font-black uppercase leading-none tracking-tight text-[clamp(2.5rem,8vw,110px)]">
              Let&apos;s Work Together
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} y={30}>
          <div className="mb-14 flex justify-center">
            <a
              href="mailto:aayushkr.dev@gmail.com"
              className="group relative flex flex-col items-center gap-4 rounded-full border-2 border-[#D7E2EA]/30 bg-[#0C0C0C] px-8 py-4 sm:flex-row sm:px-12 sm:py-6 transition-all duration-300 hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/10 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-[#D7E2EA] transition-transform duration-300 group-hover:scale-110" />
                <span className="text-lg font-semibold tracking-wide text-[#D7E2EA] sm:text-2xl">
                  aayushkr.dev@gmail.com
                </span>
              </div>
              <ArrowUpRight className="h-5 w-5 text-[#D7E2EA]/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#D7E2EA]" />
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} y={30}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-2xl border border-[#D7E2EA]/15 bg-[#141414] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D7E2EA]/50 hover:bg-[#1c1c1c]"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-7 w-7 text-[#D7E2EA] transition-transform duration-300 group-hover:scale-110" />
                    <ArrowUpRight className="h-5 w-5 text-[#D7E2EA]/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#D7E2EA]" />
                  </div>
                  <div className="mt-8">
                    <span className="text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/50">
                      {social.name}
                    </span>
                    <p className="mt-1 truncate text-sm font-semibold text-[#D7E2EA] sm:text-base">
                      {social.username}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </FadeIn>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-[#D7E2EA]/10 pt-8 text-xs uppercase tracking-widest text-[#D7E2EA]/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Aayush Kumar. All rights reserved.</p>
          <a href="#about" className="transition-colors hover:text-[#D7E2EA]">
            Back to top ↑
          </a>
        </div>
      </div>
    </section>
  );
}

export default App;
