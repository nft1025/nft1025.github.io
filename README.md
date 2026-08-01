<<<<<<< HEAD
# Neil Francis A. Teresa — Portfolio (Next.js + Framer Motion + Tailwind)

Same fonts, structure, and background as the original mockup — rebuilt on a
proper component stack so every animation is smoother and easier to extend.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling, using CSS variables for the light/dark palette
- **Framer Motion** for fade-in-on-scroll, staggered reveals, hover lifts, and
  the magnetic CTA buttons
- **next-themes** for the dark/light mode toggle (persists to localStorage,
  no flash on reload)

## Run it locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

> Note: `next/font` fetches Space Grotesk, Inter, and JetBrains Mono from
> Google Fonts at build time. This requires an internet connection the first
> time you run `npm run dev` or `npm run build` (the fonts are then cached
> locally by Next.js).

## Deploying to GitHub Pages

This project is configured for static export (`output: 'export'` in
`next.config.js`), so it produces plain HTML/CSS/JS with no server required
— exactly what GitHub Pages serves.

**1. Push this repo to GitHub.**

**2. Tell it your repo name** (only needed if this is a *project* page, i.e.
your repo is `github.com/you/portfolio` rather than `github.com/you/you.github.io`):
   - Open `.github/workflows/deploy.yml` and set `REPO_NAME: "your-repo-name"`.
   - If this repo IS your `<username>.github.io` user page, leave `REPO_NAME` empty.

**3. Enable Pages.** In your repo: **Settings → Pages → Source → GitHub Actions**.

**4. Push to `main`.** The included workflow
(`.github/workflows/deploy.yml`) builds the site and deploys it
automatically on every push — no manual steps after that.

Your site will be live at:
- `https://<username>.github.io/` (user/org page), or
- `https://<username>.github.io/<repo-name>/` (project page)

### Deploying manually instead (no Actions)

```bash
REPO_NAME=your-repo-name GITHUB_ACTIONS=true npm run build
# static site is now in ./out
```
Push the contents of `./out` to a `gh-pages` branch (or the `docs/` folder
on `main`, if you point Pages at that instead) and enable Pages on that
branch/folder in repo settings.


## Floating chatbot ("Neil Bot")

A floating button, bottom-right, opens a chat panel scoped to answer
questions about this portfolio only (Neil's bio, skills, projects, and how
to get in touch) — off-topic questions get a polite redirect. It calls
[OpenRouter](https://openrouter.ai) directly from the browser using a free
`:free`-suffixed model.

**It always has a portfolio-aware local fallback.** Visitors can ask about
Neil's skills, projects, background, or contact details without an API key.
The opening panel also provides suggested portfolio questions. When an optional
OpenRouter key is configured, Neil Bot uses it for richer answers and switches
back to the local fallback automatically if the service is unavailable.

**Optional OpenRouter configuration:**

1. **Use the built-in local fallback (recommended).** Leave the key unset.
2. **Bake in a shared key at build time.** Set
   `NEXT_PUBLIC_OPENROUTER_API_KEY` in `.env.local` (copy from
   `.env.example`) before building. **Understand the tradeoff:** this is a
   static site, so the key ends up readable in the deployed JavaScript
   bundle — anyone can extract it and use it against your OpenRouter quota.
   Only do this with a key you're comfortable sharing, ideally one limited
   to free-tier models (which have their own rate limits regardless).

The model is set via `NEXT_PUBLIC_OPENROUTER_MODEL` (defaults to
`google/gemma-4-26b-a4b-it:free`). **Free models on OpenRouter
rotate** — check
[openrouter.ai/models](https://openrouter.ai/models?order=top-weekly),
filter by free, and update this value if the default has been retired.

The portfolio facts the bot answers from live in
`components/Chatbot.tsx` (`PORTFOLIO_CONTEXT`) — edit that string to update
what it knows.

## Contact form

Email is now a required field, validated client-side (shake animation +
inline error if missing/invalid before submit). On submit, it opens the
visitor's default email application addressed to you, with the visitor's name and email
included in the message body (`From: Name <email>`) so you can reply
directly to them.

Set your own address via `NEXT_PUBLIC_CONTACT_EMAIL` in `.env.local`.
It defaults to `neilfrancisteresa22@gmail.com`.

## What's animated

- **Nav** — fades/slides down on load.
- **Hero** — headline, tagline, stack line, and CTAs fade in with a stagger;
  the terminal panel's stat tiles lift on hover; CTA buttons follow the
  cursor slightly ("magnetic" effect).
- **Neural network background** — ambient canvas animation, unchanged from
  the original, now theme-aware (dot/line color adapts to dark vs. light).
- **Project cards** — fade up into view as you scroll, staggered by index;
  lift and glow their border on hover; the "view project →" arrow gap
  widens on hover.
- **Skill bars** — fill from 0 to their target width the first time they
  scroll into view.
- **Contact card** — fades in on scroll; button and social icons lift on
  hover/tap.
- **Theme toggle** — animated sun/moon swap in the nav, top right.
- **Cursor spotlight** — a soft teal glow in the hero that follows your
  mouse.
- **Project card tilt** — cards subtly rotate in 3D toward your cursor on
  hover, plus a colored glow shadow.
- **Nav on scroll** — gains a blurred background and shadow once you
  scroll past the hero.
- **Contact form** — shakes and highlights invalid fields in red if you
  submit without a valid email.
- **Chatbot** — floating button pulses subtly to draw attention; the panel
  fades/scales in and out; typing indicator while waiting on a reply;
  each message fades in as it arrives.

## Structure

```
app/
  layout.tsx       fonts + ThemeProvider
  page.tsx          assembles all sections
  globals.css       CSS variables for light/dark
components/
  Nav.tsx
  Hero.tsx
  NeuralCanvas.tsx   ambient network animation
  ProjectCard.tsx / Projects.tsx
  Skills.tsx
  Contact.tsx
  ThemeToggle.tsx
  Providers.tsx      next-themes wrapper
```

## Customizing

- Swap project data in `components/Projects.tsx` and skill data in
  `components/Skills.tsx` — no markup changes needed.
- Colors live in `app/globals.css` (`:root` for light, `.dark` for dark) and
  `tailwind.config.ts` (teal/amber accents).
=======
<!-- HEADER -->
<h1 align="center">👋 Hi, I'm <span style="color:#0078ff;">Neil Francis A. Teresa</span></h1>
<h3 align="center">
🎓 Computer Engineer | 💻 AI Developer |

<p align="center">
🚀 Skilled in Python, C++, HTML, JavaScript, PHP, SQL, Database Management, Static/Dynamic Routing in Cisco Packet Tracer, Machine Learning (Supervised/Unsupervised) <br>
💡 Passionate about learning and exploring new technologies!
</p>

---

## 🏫 University / Internship Projects

### 🐟 AI Related Activities  
> **Description:** AI-related projects including data preparation, regression, and classification techniques.  
> **Tech Used:** `Python`, `OpenCV`, `sklearn.metrics`, `Matplotlib`, `Seaborn`, `Pandas`  
> 🔗 [**View Project**](https://github.com/nft1025/AI-activities)

---

### 🎉 Event Management System  
> **Description:** A group project where I worked as the back-end developer for the student registration system.  
> **Tech Used:** `PHP`, `XAMPP`, `MySQL`  
> 🔗 [**View Project**](https://github.com/nft1025/ncp3106_grp3)

---

### 💻 Web Development Activities  
> **Description:** Various website development activities for different purposes.  
> **Tech Used:** `JavaScript`, `HTML`, `CSS`  
> 🔗 [**View Project**](https://github.com/nft1025/teresa)

---

### ⏰ Time Manager Website  
> **Description:** A web app to organize schedules and set deadlines for effective time management.  
> **Tech Used:** `TypeScript`, `HTML`, `CSS`, `ReactJS`, `NodeJS`  
> 🔗 [**View Project**](https://github.com/nft1025/task)

---

## 🧠 Skills

| Category | Details |
|-----------|----------|
| **Languages** | Python, C++, JavaScript, PHP |
| **Frameworks** | Flask, TensorFlow, OpenCV, ReactJS, Bootstrap |
| **Tech Skills** | Database Management, Cisco Packet Tracer Routing, Embedded Systems, Machine Learning (Supervised/Unsupervised) |
| **Soft Skills** | Communication, Adaptability, Leadership, Critical Thinking |
| **Tools** | Raspberry Pi, VS Code, PyCharm, Cisco Packet Tracer |

---

## 🛠️ Tech Stack & Tools

<p align="center">
  <img src="https://skillicons.dev/icons?i=python,cpp,js,php,html,css,react,nodejs,flask,tensorflow,bootstrap,mysql,raspberrypi,git,github,vscode" />
</p>

---

## 📫 Contact

📧 **Email:** [neilfrancisteresa22@gmail.com](mailto:neilfrancisteresa22@gmail.com)  
🌐 **Portfolio:** [https://nft1025.github.io](https://nft1025.github.io)  
💼 **LinkedIn:** [https://linkedin.com/in/neilteresa25](https://linkedin.com/in/neilteresa25)

---

<h3 align="center">✨ Thank you for visiting my portfolio! ✨</h3>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=nft1025&color=blue&style=for-the-badge" alt="Profile views" />
</p>
>>>>>>> f1ff80c34a6232e32bf4fd8ee09c2b46df2f532c
