import React from "react";
import githubLogo from "../../assets/images/whiteGitHub.png";
import appStoreIcon from "../../assets/images/appstore.png";
import impactPointGameplay3 from "../../assets/images/ImpactPointGamePlay3.jpg";
import impactPointVideo from "../../assets/images/a5cc595139ee87a9ec6ef866722bf47d.mp4";
import steamLogo from "../../assets/images/steam-logo-black-transparent.png";
import kartoMap from "../../assets/images/kartoMap.png";
import kartoPost from "../../assets/images/kartoPost.png";
import moodLogPortrait from "../../assets/images/MoodLog-portrait.png";
import moodDashboardPortrait from "../../assets/images/Dashboard-portrait.png";

const projects = [
  {
    title: "Impact Point",
    description:
      "Live multiplayer arena shooter on Steam. Co-founded and engineered the backend infrastructure, real-time systems, and cloud architecture, with mobile expansion currently in development.",
    tags: ["C#", "Unity", "Azure", "PlayFab", "Steamworks", "Real-time Systems"],
    badge: "👥 280,000+ registered players",
    linkLabel: "Steam store page",
    link: "https://store.steampowered.com/app/1680550/Impact_Point/",
    linkIcon: steamLogo,
    media: [
      {
        type: "video",
        src: impactPointVideo,
        label: "Impact Point gameplay video"
      },
      {
        type: "image",
        src: impactPointGameplay3,
        alt: "Impact Point gameplay"
      }
    ],
    mediaLayout: "stack"
  },
  {
    title: "Automated Search Result Collector",
    description:
      "Created a scalable Python web automation tool (Selenium, BeautifulSoup) to simulate organic human behavior, successfully extracting and parsing 10,000+ Google search results. This dataset served as the core foundation for a published research paper.",
    tags: ["Python (Programming Language)", "Selenium"],
    linkLabel: "Read my paper",
    link: "https://ieeexplore.ieee.org/document/10459555"
  },
  {
    title: "Karto | iOS Social Network",
    description:
      "Location-based social iOS app built from concept to App Store. Won 2nd Place at the EIBF Entrepreneurship Competition (Edinburgh, Scotland) and received the Lightbulb Prize & Microfinance Award.",
    tags: [
      "Flutter",
      "Firebase",
      "Google Maps API",
      "Google Cloud Functions",
      "Dart"
    ],
    badge: "🏆 2nd Place — EIBF Edinburgh",
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
  }
];

const Projects = () => {
  return (
    <section className="px-6 py-5" id="projects">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div data-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Projects
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-text">Cool things I've built and worked on</h2>
        </div>
        <div className="md:columns-2 md:gap-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className="mb-6 break-inside-avoid flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
              data-reveal
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-text">{project.title}</h3>
                {project.badge ? (
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-text">
                    {project.badge}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-sm text-muted">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.media ? (
                <div
                  className={`mt-6 grid gap-4 ${
                    project.mediaLayout === "stack" ? "grid-cols-1" : "sm:grid-cols-2"
                  }`}
                >
                  {project.media.map((item) => (
                    <figure key={`${item.type}-${item.src}`}>
                      {item.type === "video" ? (
                        <video
                          className="w-full rounded-2xl border border-white/10"
                          controls
                          preload="metadata"
                        >
                          <source src={item.src} type="video/mp4" />
                          {item.label}
                        </video>
                      ) : (
                        <img
                          alt={item.alt}
                          className="w-full rounded-2xl"
                          loading="lazy"
                          src={item.src}
                        />
                      )}
                    </figure>
                  ))}
                </div>
              ) : null}
            {project.images ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.images.map((image) => (
                <figure key={image.alt}>
                    <img
                    alt={image.alt}
                    className="w-full border-white/10"
                    loading="lazy"
                    src={image.src}
                    />
                </figure>
                ))}
            </div>
            ) : null}
              {project.linkLabel ? (
                <a
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em]"
                  href={project.link}
                  rel="noreferrer"
                  target="_blank"
                >
                  {project.linkIcon ? (
                    <img
                      alt=""
                      aria-hidden="true"
                      className="h-5 w-5"
                      src={project.linkIcon}
                    />
                  ) : null}
                  {project.linkLabel}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
