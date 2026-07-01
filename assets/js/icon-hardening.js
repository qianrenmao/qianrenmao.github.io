/**
 * Sidebar icon hardening
 * Do not remove: this keeps profile icons stable even when icon-font resources fail.
 */
(function () {
  const inlineIconStyles = `
    .author__urls i.icon-inline-svg {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.05em;
      height: 1.05em;
      color: #4b5563;
      box-sizing: border-box;
      overflow: visible;
      font-style: normal;
      margin-right: 0.5em;
      vertical-align: middle;
    }

    .author__urls i.icon-inline-svg svg {
      width: 100%;
      height: 100%;
      display: block;
      overflow: visible;
    }

    html[data-theme="dark"] .author__urls i.icon-inline-svg {
      color: #d1d5db;
    }

    .author__urls i.icon-inline-svg[data-icon-key="ring"] {
      color: #9acb3f;
    }
  `;

  const classIconKeyMap = {
    "fa-github": "github",
    "fa-linkedin": "network",
    "fa-envelope": "mail",
    "fa-location-dot": "location",
    "fa-building-columns": "building",
    "fa-link": "link",
    "ai-orcid": "ring",
    "ai-google-scholar": "cap",
    "ai-dblp": "cap",
    "ai-arxiv": "cap",
    "ai-scopus": "cap",
    "ai-pubmed": "cap",
    "ai-semantic-scholar": "cap"
  };

  const iconSvgMap = {
    github: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2-.46-1.14-1.12-1.44-1.12-1.44-.91-.62.07-.6.07-.6 1 .07 1.54 1.03 1.54 1.03.9 1.53 2.35 1.09 2.93.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.1-4.55-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.41.1 2.66.65.7 1.03 1.59 1.03 2.68 0 3.84-2.33 4.68-4.56 4.92.36.31.68.93.68 1.89v2.8c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 6h18v12H3z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m3 7 9 7 9-7"/></svg>',
    location: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2" d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="10" r="2.7" fill="currentColor"/></svg>',
    building: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2" d="M4 21h16M6 21V8l6-3 6 3v13M10 11h1m3 0h1m-5 3h1m3 0h1"/></svg>',
    link: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M10 14 7.5 16.5a3.5 3.5 0 1 1-5-5L5 9m9 1 2.5-2.5a3.5 3.5 0 1 1 5 5L19 15m-10 0h6"/></svg>',
    network: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="6" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="6" r="2" fill="currentColor"/><circle cx="18" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="18" r="2" fill="currentColor"/><path fill="none" stroke="currentColor" stroke-width="1.8" d="M7.7 10.7 10.3 7.3m3.4 0 2.6 3.4m0 2.6-2.6 3.4m-3.4 0-2.6-3.4"/></svg>',
    cap: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 4 2 9l10 5 8-4v5h2V9L12 4Z"/><path fill="none" stroke="currentColor" stroke-width="2" d="M6 12.2V16c0 1.6 2.7 3 6 3s6-1.4 6-3v-3.8"/></svg>',
    ring: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>',
    generic: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/></svg>'
  };

  function injectStyle() {
    const style = document.createElement("style");
    style.textContent = inlineIconStyles;
    document.head.appendChild(style);
  }

  function getIconKey(icon) {
    const classList = Array.from(icon.classList || []);
    for (const cls of classList) {
      if (classIconKeyMap[cls]) return classIconKeyMap[cls];
    }
    return "generic";
  }

  function applyInlineSvg(icon) {
    const iconKey = getIconKey(icon);
    icon.classList.add("icon-inline-svg");
    icon.setAttribute("data-icon-key", iconKey);
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = iconSvgMap[iconKey] || iconSvgMap.generic;
  }

  function needsInlineSvg(icon) {
    if (!icon.classList.contains("icon-inline-svg")) return true;
    return !icon.querySelector("svg");
  }

  function processSidebarIcons() {
    const icons = document.querySelectorAll(".author__urls i.icon-pad-right");
    icons.forEach((icon) => {
      if (needsInlineSvg(icon)) {
        applyInlineSvg(icon);
      }
    });
  }

  function watchSidebarIcons() {
    const containers = document.querySelectorAll(".author__urls");
    containers.forEach((container) => {
      const observer = new MutationObserver(() => {
        processSidebarIcons();
      });

      observer.observe(container, {
        childList: true,
        subtree: true
      });
    });
  }

  function init() {
    injectStyle();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        processSidebarIcons();
        watchSidebarIcons();
      });
    } else {
      processSidebarIcons();
      watchSidebarIcons();
    }

    // Re-apply on bfcache restore/navigation resume.
    window.addEventListener("pageshow", processSidebarIcons);
  }

  init();
})();
