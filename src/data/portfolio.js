// Central content file — edit this once you send over your photos, project
// details, and dates. Everything on the site reads from here.
//
// Translatable prose fields are { en, fr, ht } objects — components resolve
// them via the `pick()` helper from LanguageContext. Proper nouns (names,
// institutions, tech names) stay as plain strings.

export const profile = {
  name: "Roodkenley Terveus",
  role: {
    en: "Software Engineer",
    fr: "Ingénieur Logiciel",
    ht: "Enjenyè Lojisyèl",
  },
  tagline: {
    en: "I turn ideas into functional, user-friendly applications — and bring the communication skills of a teacher and interpreter to how I build and collaborate.",
    fr: "Je transforme des idées en applications fonctionnelles et conviviales — en apportant les compétences en communication d'un enseignant et interprète à ma façon de créer et de collaborer.",
    ht: "Mwen transfòme lide an aplikasyon fonksyonèl ak fasil pou itilize — mwen pote ladrès kominikasyon yon pwofesè ak yon entèprèt nan fason mwen bati ak kolabore.",
  },
  avatar: "/images/avatar.jpg",
  resumeUrl: "/resume/resume.pdf", // TODO: drop your resume here
  location: "Cap-Haïtien, Haiti",
  email: "roodterveus@gmail.com",
};

export const about = {
  bio: [
    {
      en: "I'm a Software Engineer, English teacher, and professional Haitian Creole–English interpreter based in Cap-Haïtien, Haiti.",
      fr: "Je suis Ingénieur Logiciel, professeur d'anglais et interprète professionnel créole haïtien–anglais, basé à Cap-Haïtien, Haïti.",
      ht: "Mwen se yon Enjenyè Lojisyèl, pwofesè anglè, epi entèprèt pwofesyonèl kreyòl ayisyen–anglè, ki baze Okap, Ayiti.",
    },
    {
      en: "I'm passionate about building modern web applications and creating digital solutions that solve real-world problems. My interests include full-stack web development, software engineering, UI/UX design, and fintech innovation. I enjoy turning ideas into functional, user-friendly applications using technologies like React, Next.js, FastAPI, JavaScript, Python, and PHP.",
      fr: "Je suis passionné par la création d'applications web modernes et de solutions numériques qui résolvent des problèmes concrets. Je m'intéresse au développement web full-stack, au génie logiciel, au design UI/UX et à l'innovation fintech. J'aime transformer des idées en applications fonctionnelles et conviviales en utilisant des technologies comme React, Next.js, FastAPI, JavaScript, Python et PHP.",
      ht: "Mwen renmen konstwi aplikasyon web modèn ak kreye solisyon dijital ki rezoud pwoblèm reyèl. Enterè m gen ladan devlopman web full-stack, jeni lojisyèl, konsepsyon UI/UX ak inovasyon fintech. Mwen renmen transfòme lide an aplikasyon fonksyonèl ak fasil pou itilize avèk teknoloji tankou React, Next.js, FastAPI, JavaScript, Python ak PHP.",
    },
    {
      en: "Beyond software development, I have experience in language instruction, interpretation, and graphic design. These roles have strengthened my communication, problem-solving, creativity, and client relationship skills, allowing me to work effectively with people from diverse cultural and professional backgrounds.",
      fr: "Au-delà du développement logiciel, j'ai de l'expérience en enseignement des langues, en interprétation et en design graphique. Ces rôles ont renforcé mes compétences en communication, en résolution de problèmes, en créativité et en relation client, me permettant de travailler efficacement avec des personnes d'horizons culturels et professionnels variés.",
      ht: "Anplis devlopman lojisyèl, mwen gen eksperyans nan ansèyman lang, entèpretasyon, ak design grafik. Wòl sa yo ranfòse ladrès kominikasyon m, rezolisyon pwoblèm, kreyativite, ak relasyon ak kliyan, sa ki pèmèt mwen travay byen ak moun ki soti nan diferan kilti ak background pwofesyonèl.",
    },
    {
      en: "I believe that great technology is built through continuous learning, collaboration, and attention to detail. I am always looking for opportunities to expand my knowledge, contribute to meaningful projects, and grow as a software engineer.",
      fr: "Je crois qu'une technologie de qualité se construit par l'apprentissage continu, la collaboration et le souci du détail. Je suis toujours à la recherche d'opportunités pour élargir mes connaissances, contribuer à des projets porteurs de sens et progresser en tant qu'ingénieur logiciel.",
      ht: "Mwen kwè bon teknoloji konstwi atravè aprantisaj kontinyèl, kolaborasyon, ak atansyon nan detay. Mwen toujou ap chèche opòtinite pou elaji konesans mwen, kontribye nan pwojè ki gen sans, epi grandi kòm yon enjenyè lojisyèl.",
    },
    {
      en: "When I'm not coding, I enjoy reading, watching movies, listening to music, and volunteering in my community.",
      fr: "Quand je ne code pas, j'aime lire, regarder des films, écouter de la musique et faire du bénévolat dans ma communauté.",
      ht: "Lè m pa ap kode, mwen renmen li, gade fim, koute mizik, epi fè volontarya nan kominote m.",
    },
  ],
  closing: {
    en: "Let's build something amazing together.",
    fr: "Construisons quelque chose d'extraordinaire ensemble.",
    ht: "Ann bati yon bagay ekstraòdinè ansanm.",
  },
  skills: [
    "JavaScript",
    "Python",
    "PHP",
    "React",
    "Next.js",
    "Tailwind CSS",
    "FastAPI",
    "SQL",
    "HTML",
    "CSS",
    "Graphic Design",
  ],
};

// Each project: add an `image` (path under src/assets/images) and a `date`
// once you send them — they'll show up on the card automatically.
export const projects = [
  {
    id: "dinnas-sweets",
    title: "Dinna's Sweets",
    description: {
      en: "Website and admin dashboard for a custom cake and dessert business in Broward County, FL — online menu, event gallery, and an order form with photo uploads. The owner manages requests, quotes, menu, and photos from a private dashboard with weekly stats.",
      fr: "Site web et tableau de bord pour une entreprise de gâteaux et desserts sur mesure dans le comté de Broward, en Floride — menu en ligne, galerie d'événements et formulaire de commande avec envoi de photos. La propriétaire gère les demandes, les devis, le menu et les photos depuis un tableau de bord privé avec des statistiques hebdomadaires.",
      ht: "Sitwèb ak tablo administrasyon pou yon biznis gato ak desè sou mezi nan Broward County, Florid — meni an liy, galri evènman, ak yon fòm kòmand ki pèmèt voye foto. Pwopriyetè a jere demann, pri, meni ak foto nan yon tablo prive ki gen estatistik chak semèn.",
    },
    image: "/images/dinnas-sweets.jpg",
    date: "2026-11",
    tags: ["Next.js", "Tailwind CSS", "Drizzle ORM", "SQLite", "Vercel"],
    liveUrl: "https://dinnas-sweets.vercel.app",
    repoUrl: "",
  },
  {
    id: "inae-site",
    title: "INAE — English Speaking Practice",
    description: {
      en: "A trilingual (Creole/French/English) landing and registration site for INAE's English program — session schedules, pricing, and a signup form with NatCash/MonCash payment options.",
      fr: "Un site trilingue (créole/français/anglais) de présentation et d'inscription pour le programme d'anglais de l'INAE — horaires des sessions, tarifs et un formulaire d'inscription avec paiement via NatCash/MonCash.",
      ht: "Yon sit trileng (kreyòl/franse/angle) prezantasyon ak enskripsyon pou pwogram anglè INAE — orè sesyon, pri, ak yon fòm enskripsyon ak opsyon peman NatCash/MonCash.",
    },
    image: null, // TODO: drop a screenshot into public/images/ once you have one
    date: null,
    tags: ["React"],
    liveUrl: "https://siteinae123.netlify.app/",
    repoUrl: "",
  },
  {
    id: "ftbe",
    title: "Faculté Théologie Biblique Esdras (FTBE)",
    description: {
      en: "A website for FTBE, a theology university in Port-de-Paix, Haiti — my first session project, deployed live on Netlify.",
      fr: "Un site web pour la FTBE, une université de théologie à Port-de-Paix, Haïti — mon tout premier projet de session, déployé en ligne sur Netlify.",
      ht: "Yon sitwèb pou FTBE, yon inivèsite teyoloji nan Port-de-Paix, Ayiti — premye pwojè sesyon mwen, deplwaye an dirèk sou Netlify.",
    },
    image: "/images/ftbe.jpg",
    date: "2026-04",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://ftbe.netlify.app",
    repoUrl: "", // TODO: if the repo is public, add its URL
  },
  {
    id: "media-production",
    title: "Live Broadcast & Media Production",
    description: {
      en: "Ran multi-camera video switching and live streaming for the UEBH Mission's Convention Baraca (Agapao), coordinating camera feeds and stream output in real time.",
      fr: "Gestion du mixage vidéo multi-caméras et de la diffusion en direct pour la Convention Baraca de la Mission UEBH (Agapao), coordonnant les flux caméra et la diffusion en temps réel.",
      ht: "Te jere switch videyo miltip-kamera ak livestriming pou Konvansyon Baraka Misyon UEBH (Agapao), koòdone flux kamera ak difizyon an tan reyèl.",
    },
    image: "/images/media-production.jpg",
    date: null,
    dateLabel: "Jul 2022 – Dec 2024",
    tags: ["Live Streaming", "Multi-Camera Production", "Video Switching"],
    liveUrl: "",
    repoUrl: "",
  },
];

// Roles and activities that aren't standalone coding projects — jobs,
// volunteer work, and notable appearances. Shown as a timeline.
export const experience = [
  {
    id: "inae-teacher",
    role: {
      en: "Spelling Teacher",
      fr: "Professeur d'orthographe",
      ht: "Pwofesè Òtograf",
    },
    org: "INAE (International American English)",
    dateLabel: "2026 – Present",
    description: {
      en: "Teaching English spelling, running practice sessions and spelling assessments for students.",
      fr: "Enseignement de l'orthographe anglaise, animation de séances de pratique et d'évaluations pour les étudiants.",
      ht: "Ansenye òtograf angle, dirije sesyon pratik ak evalyasyon òtograf pou elèv yo.",
    },
    image: "/images/inae-teaching.jpg",
    tags: ["Teaching", "English"],
  },
  {
    id: "usfah-media",
    role: {
      en: "Volunteer, Media Team",
      fr: "Bénévole, Équipe Média",
      ht: "Volontè, Ekip Medya",
    },
    org: "USFAH (Université Saint François d'Assise d'Haïti)",
    dateLabel: "2025 – 2026",
    description: {
      en: "Livestreaming and video switching for university events using OBS Studio, broadcasting to Facebook.",
      fr: "Diffusion en direct et mixage vidéo pour les événements universitaires avec OBS Studio, diffusés sur Facebook.",
      ht: "Livestriming ak switch videyo pou evènman inivèsitè yo avèk OBS Studio, difize sou Facebook.",
    },
    image: "/images/usfah-media.jpg",
    tags: ["OBS Studio", "Live Streaming"],
  },
  {
    id: "kolabo-tech",
    role: {
      en: "Conference Participant — NTIC, Fintech, AI & Blockchain",
      fr: "Participant à la conférence — NTIC, Fintech, IA & Blockchain",
      ht: "Patisipan Konferans — NTIC, Fintech, AI & Blockchain",
    },
    org: "Kolabo Tech — Haïti, Nouvelles Technologies: Défis et Opportunités",
    dateLabel: "Apr 2026",
    description: {
      en: "Attended a conference on Haiti's digital transformation, covering fintech's role in modernizing payments, AI in security and decision-making, and blockchain's potential for transparency — with case studies from Rwanda and Israel.",
      fr: "Participation à une conférence sur la transformation digitale d'Haïti, abordant le rôle de la fintech dans la modernisation des paiements, l'impact de l'intelligence artificielle dans la sécurité et la prise de décision, et le potentiel de la blockchain pour la transparence — avec des études de cas du Rwanda et d'Israël.",
      ht: "Patisipe nan yon konferans sou transfòmasyon dijital Ayiti, ki kouvri wòl fintech nan modènizasyon peman yo, enpak entelijans atifisyèl nan sekirite ak pran desizyon, ak potansyèl blockchain pou plis transparans — ak egzanp ki soti Rwanda ak Izrayèl.",
    },
    image: "/images/kolabo-tech.jpg",
    tags: ["Fintech", "AI", "Blockchain"],
  },
  {
    id: "conference-limonade",
    role: {
      en: "University Delegation Participant",
      fr: "Participant de la délégation universitaire",
      ht: "Patisipan Delegasyon Inivèsitè",
    },
    org: "Conférence Universitaire Limonade — Ministère de l'Économie et des Finances",
    dateLabel: "Jun 2025",
    description: {
      en: "Represented USFAH at a university conference organized by Haiti's Ministry of Economy and Finance in Limonade.",
      fr: "A représenté l'USFAH lors d'une conférence universitaire organisée par le Ministère de l'Économie et des Finances d'Haïti à Limonade.",
      ht: "Reprezante USFAH nan yon konferans inivèsitè Ministè Ekonomi ak Finans Ayiti òganize nan Limonad.",
    },
    image: "/images/conference-limonade.jpg",
    tags: [],
  },
];

// `category` drives the gallery filters: "usfah" (USFAH media team photos),
// "field" (on-site work), or "other".
export const gallery = [
  {
    id: "usfah-assembly",
    category: "usfah",
    image: "/images/gallery/usfah-assembly.jpg",
    caption: { en: "Student assembly at USFAH", fr: "Assemblée des étudiants à l'USFAH", ht: "Asanble etidyan nan USFAH" },
  },
  {
    id: "usfah-officials",
    category: "usfah",
    image: "/images/gallery/usfah-officials.jpg",
    caption: { en: "Guests at a USFAH ceremony", fr: "Invités lors d'une cérémonie à l'USFAH", ht: "Envite nan yon seremoni USFAH" },
  },
  {
    id: "usfah-anatomy-laptop",
    category: "usfah",
    image: "/images/gallery/usfah-anatomy-laptop.jpg",
    caption: { en: "Anatomy study session at USFAH", fr: "Séance d'étude d'anatomie à l'USFAH", ht: "Sesyon etid anatomi nan USFAH" },
  },
  {
    id: "usfah-assembly-front",
    category: "usfah",
    image: "/images/gallery/usfah-assembly-front.jpg",
    caption: { en: "Opening of a USFAH event", fr: "Ouverture d'un événement à l'USFAH", ht: "Ouvèti yon evènman USFAH" },
  },
  {
    id: "usfah-cake-ceremony",
    category: "usfah",
    image: "/images/gallery/usfah-cake-ceremony.jpg",
    caption: { en: "Cake cutting at a USFAH celebration", fr: "Coupe du gâteau lors d'une célébration à l'USFAH", ht: "Koupe gato nan yon fèt USFAH" },
  },
  {
    id: "usfah-workshop-drawing",
    category: "usfah",
    image: "/images/gallery/usfah-workshop-drawing.jpg",
    caption: { en: "Student workshop at USFAH", fr: "Atelier étudiant à l'USFAH", ht: "Atelye etidyan nan USFAH" },
  },
  {
    id: "usfah-poster-session",
    category: "usfah",
    image: "/images/gallery/usfah-poster-session.jpg",
    caption: { en: "Students working on a group project", fr: "Étudiants travaillant sur un projet de groupe", ht: "Etidyan k ap travay sou yon pwojè an gwoup" },
  },
  {
    id: "usfah-courtyard",
    category: "usfah",
    image: "/images/gallery/usfah-courtyard.jpg",
    caption: { en: "Activities in the USFAH courtyard", fr: "Activités dans la cour de l'USFAH", ht: "Aktivite nan lakou USFAH" },
  },
  {
    id: "field-team-selfie",
    category: "field",
    image: "/images/gallery/field-team-selfie.jpg",
    caption: { en: "With the team on site", fr: "Avec l'équipe sur le terrain", ht: "Ak ekip la sou teren" },
  },
  {
    id: "field-site-tech",
    category: "field",
    image: "/images/gallery/field-site-tech.jpg",
    caption: { en: "Technical work on site", fr: "Travail technique sur le terrain", ht: "Travay teknik sou teren" },
  },
  {
    id: "field-portrait",
    category: "field",
    image: "/images/gallery/field-portrait.jpg",
    caption: { en: "On site", fr: "Sur le terrain", ht: "Sou teren" },
  },
  {
    id: "hardware-repair",
    category: "other",
    image: "/images/gallery/hardware-repair.jpg",
    caption: {
      en: "Hardware repair work",
      fr: "Travail de réparation matérielle",
      ht: "Travay reparasyon aparèy",
    },
  },
  {
    id: "conference-hall",
    image: "/images/gallery/conference-hall.jpg",
    caption: {
      en: "Conférence Universitaire Limonade",
      fr: "Conférence Universitaire Limonade",
      ht: "Konferans Inivèsitè Limonad",
    },
  },
  {
    id: "media-crowd",
    image: "/images/gallery/media-crowd.jpg",
    caption: {
      en: "Convention Baraca media coverage",
      fr: "Couverture médiatique de la Convention Baraca",
      ht: "Kouvèti medya Konvansyon Baraka",
    },
  },
  {
    id: "usfah-obs",
    category: "usfah",
    image: "/images/gallery/usfah-obs.jpg",
    caption: {
      en: "Livestreaming with OBS Studio at USFAH",
      fr: "Diffusion en direct avec OBS Studio à l'USFAH",
      ht: "Livestriming ak OBS Studio nan USFAH",
    },
  },
  {
    id: "inae-classroom",
    image: "/images/gallery/inae-classroom.jpg",
    caption: {
      en: "Teaching at INAE",
      fr: "Enseignement à l'INAE",
      ht: "Ansenye nan INAE",
    },
  },
  {
    id: "kolabo-tech-poster",
    image: "/images/gallery/kolabo-tech-poster.jpg",
    caption: {
      en: "Kolabo Tech conference poster",
      fr: "Affiche de la conférence Kolabo Tech",
      ht: "Afich konferans Kolabo Tech",
    },
  },
  {
    id: "kolabo-tech-audience",
    image: "/images/gallery/kolabo-tech-audience.jpg",
    caption: {
      en: "Kolabo Tech conference audience",
      fr: "Public de la conférence Kolabo Tech",
      ht: "Piblik konferans Kolabo Tech",
    },
  },
];

export const socials = [
  { name: "GitHub", url: "https://github.com/roodterveus-dev", icon: "github" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/roodkenley-terveus-43681b2ba",
    icon: "linkedin",
  },
  { name: "Email", url: "mailto:roodterveus@gmail.com", icon: "email" },
  { name: "WhatsApp", url: "https://wa.me/50941671824", icon: "whatsapp" },
];
