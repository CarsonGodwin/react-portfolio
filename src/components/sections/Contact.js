import React from "react";
import githubLogo from "../../assets/images/whiteGitHub.png";
import linkedinLogo from "../../assets/images/linkedin.png";

const LINKEDIN_URL = "https://www.linkedin.com/in/carson-godwin/";
const GITHUB_URL = "https://github.com/CarsonGodwin";

const Contact = () => {
  return (
    <section className="px-6 pb-4 pt-5" id="contact">
      <div className="mx-auto flex max-w-6xl flex-col gap-10" data-reveal>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Contact
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-text">Let’s Connect</h2>
        </div>
        <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div>
            <p className="text-sm text-muted">Email</p>
            <a className="mt-2 block text-base font-semibold text-text" href="mailto:carson@carsongodwin.com">
              carson@carsongodwin.com
            </a>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <a
              className="inline-flex items-center gap-2 text-muted underline underline-offset-4 transition hover:text-text"
              href={LINKEDIN_URL}
              rel="noreferrer"
              target="_blank"
            >
              <img alt="LinkedIn" className="h-4 w-4" src={linkedinLogo} />
              LinkedIn
            </a>
            <a
              className="inline-flex items-center gap-2 text-muted underline underline-offset-4 transition hover:text-text"
              href={GITHUB_URL}
              rel="noreferrer"
              target="_blank"
            >
              <img alt="GitHub" className="h-4 w-4" src={githubLogo} />
              GitHub
            </a>
          </div>
        </div>
        <footer className="border-t border-white/10 pt-6 text-xs uppercase tracking-[0.3em] text-muted">
          carsongodwin.com
        </footer>
      </div>
    </section>
  );
};

export default Contact;
