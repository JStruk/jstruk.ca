# jstruk.ca

Personal site for Justin Struk. Astro, deployed on Netlify from GitHub.

## Edit

- Intro, jobs, and contact live in `src/data/site.ts`.
- Each product is a markdown file in `src/content/projects/`. The homepage card uses `summary`. The rest of the file is the project page.
- A new project is a new markdown file. Set `order` to place it. Add `repoUrl` only when the repository is public.

## Local

```sh
npm install
npm run dev
```

## Netlify

Build command: `npm run build`  
Publish directory: `dist`

`netlify.toml` already sets both. Connect the GitHub repo, then point `jstruk.ca` at that site.
