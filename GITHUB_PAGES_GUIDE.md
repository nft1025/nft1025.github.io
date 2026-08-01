# Publish this portfolio to your GitHub Pages site

This project is already configured to export a static website and deploy it with GitHub Actions.

## If your current site is `https://YOUR-USERNAME.github.io`

1. Open the repository named `YOUR-USERNAME.github.io` on GitHub.
2. Replace its existing site files with this project's files, including the `.github/workflows/deploy.yml` workflow.
3. In `.github/workflows/deploy.yml`, leave `REPO_NAME` blank.
4. Commit and push the files to the `main` branch.
5. On GitHub, open **Settings > Pages** and set **Source** to **GitHub Actions**.
6. Open the **Actions** tab and wait for the **Deploy to GitHub Pages** workflow to finish. Your updated site will be available at `https://YOUR-USERNAME.github.io`.

## If the portfolio is a project repository

For a repository such as `https://github.com/YOUR-USERNAME/portfolio`, set this in `.github/workflows/deploy.yml` before pushing:

```yml
REPO_NAME: "portfolio"
```

The published address will be `https://YOUR-USERNAME.github.io/portfolio/`.

## Push commands

Run these commands from the portfolio folder after you have created or connected the correct GitHub repository:

```powershell
git init
git add .
git commit -m "Publish portfolio updates"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

If the target repository already contains commits, clone it first or add its remote and pull its `main` branch before copying these files. Do not force-push unless you intentionally want to replace its history.

## Important configuration

- The contact form defaults to `neilfrancisteresa22@gmail.com`; override it at build time with `NEXT_PUBLIC_CONTACT_EMAIL` only if needed.
- Neil Bot works locally with portfolio answers even when no AI key is configured. To enable the AI model for the deployed site, open the repository's **Settings > Secrets and variables > Actions**, create a repository secret named `OPENROUTER_API_KEY`, and paste the OpenRouter key. The deployment workflow passes it to the build as `NEXT_PUBLIC_OPENROUTER_API_KEY`.
- The deployed browser must receive this key to call OpenRouter directly. It is therefore recoverable from the public JavaScript bundle; use only a key with strict spending limits or free-model access.
