import githubLogo from "../assets/images/whiteGitHub.png";
import appStoreIcon from "../assets/images/appstore.png";
import impactPointGameplay3 from "../assets/images/ImpactPointGamePlay3.jpg";
import impactPointVideo from "../assets/images/a5cc595139ee87a9ec6ef866722bf47d.mp4";
import steamLogo from "../assets/images/steam-logo-black-transparent.png";
import kartoMap from "../assets/images/kartoMap.png";
import kartoPost from "../assets/images/kartoPost.png";
import moodLogPortrait from "../assets/images/MoodLog-portrait.png";
import moodDashboardPortrait from "../assets/images/Dashboard-portrait.png";

const projects = [
  {
    id: "impact-point",
    accent: "violet",
    featured: true,
    year: "2025 — Present",
    summary: "Backend, real-time systems, and cloud architecture for a live product on Steam.",
    title: "Impact Point",
    description:
      "Live multiplayer arena shooter on Steam. Co-founded and engineered the backend infrastructure, real-time systems, and cloud architecture, with mobile expansion currently in development.",
    tags: ["C#", "Unity", "Azure", "PlayFab", "Steamworks", "Real-time Systems"],
    badge: "280,000+ registered players",
    linkLabel: "Steam store page",
    link: "https://store.steampowered.com/app/1680550/Impact_Point/",
    linkIcon: steamLogo,
    media: [
      {
        type: "video",
        src: impactPointVideo,
        poster: impactPointGameplay3,
        label: "Impact Point gameplay video"
      }
    ]
  },
  {
    id: "karto",
    accent: "pink",
    year: "2024",
    summary: "Location-based social media app, built from concept to App Store.",
    title: "Karto | iOS Social Network",
    description:
      "Location-based social media app built from concept to App Store. Won 2nd Place at the EIBF Entrepreneurship Competition (Edinburgh, Scotland) and received the Lightbulb Prize & Microfinance Award.",
    tags: [
      "Flutter",
      "Firebase",
      "Google Maps API",
      "Google Cloud Functions",
      "Dart"
    ],
    badge: "2nd place, EIBF Edinburgh",
    linkLabel: "App Store page",
    link: "https://apps.apple.com/us/app/karto-social/id6474485058",
    linkIcon: appStoreIcon,
    media: [
      {
        type: "image",
        src: kartoMap,
        alt: "Karto map screen"
      },
      {
        type: "image",
        src: kartoPost,
        alt: "Karto post screen"
      }
    ]
  },
  {
    id: "moodwaves",
    accent: "teal",
    year: "2024",
    summary: "Cross-platform mental health app for UNCW students.",
    title: "MoodWaves",
    description:
      "Mood Waves is a cross-platform mobile app built with Flutter, utilizing Firebase and Firestore. Tailored for students at the University of North Carolina Wilmington, the app lets you express feelings, track moods, access mental health resources, and stay updated on campus events.",
    tags: ["Flutter", "Firebase", "Firestore"],
    linkLabel: "MoodWaves Github Repo",
    link: "https://github.com/CarsonGodwin/MoodWaves",
    linkIcon: githubLogo,
    images: [
      {
        src: moodLogPortrait,
        alt: "MoodWaves mood log screen"
      },
      {
        src: moodDashboardPortrait,
        alt: "MoodWaves dashboard screen"
      }
    ]
  },
  {
    id: "search-collector",
    accent: "orange",
    year: "2023",
    summary: "Python crawler that simulated user personas to collect 10,000+ search results for a published IEEE paper.",
    title: "Persona-Based Search Result Crawler",
    description:
      "Created a scalable Python web automation tool (Selenium, BeautifulSoup) to simulate organic human behavior, successfully extracting and parsing 10,000+ Google search results. This dataset served as the core foundation for a published research paper.",
    tags: ["Python (Programming Language)", "Selenium"],
    linkLabel: "Read my paper",
    link: "https://ieeexplore.ieee.org/document/10459555"
  }
];

export default projects;
