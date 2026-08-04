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
      en: "I'm passionate about building modern web applications and creating digital solutions that solve real-world problems. My interests include full-stack web development, software engineering, UI/UX design, and fintech innovation. I enjoy turning ideas into functional, user-friendly applications using technologies like React, FastAPI, MongoDB, JavaScript, Python, and PHP.",
      fr: "Je suis passionné par la création d'applications web modernes et de solutions numériques qui résolvent des problèmes concrets. Je m'intéresse au développement web full-stack, au génie logiciel, au design UI/UX et à l'innovation fintech. J'aime transformer des idées en applications fonctionnelles et conviviales en utilisant des technologies comme React, FastAPI, MongoDB, JavaScript, Python et PHP.",
      ht: "Mwen renmen konstwi aplikasyon web modèn ak kreye solisyon dijital ki rezoud pwoblèm reyèl. Enterè m gen ladan devlopman web full-stack, jeni lojisyèl, konsepsyon UI/UX ak inovasyon fintech. Mwen renmen transfòme lide an aplikasyon fonksyonèl ak fasil pou itilize avèk teknoloji tankou React, FastAPI, MongoDB, JavaScript, Python ak PHP.",
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
    "FastAPI",
    "MongoDB",
    "HTML",
    "CSS",
    "Graphic Design",
  ],
};

// Each project: add an `image` (path under src/assets/images) and a `date`
// once you send them — they'll show up on the card automatically.
export const projects = [
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

export const gallery = [
  {
    id: "hardware-repair",
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
