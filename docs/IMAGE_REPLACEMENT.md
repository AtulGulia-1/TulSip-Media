## Replace Website Images From Your PC

Copy your images into these folders:

- `public/images/founders/`
- `public/images/team/`
- `public/images/portfolio/`
- `public/images/clients/` (optional, if you want local client logos)

OR (now supported automatically):

- `lib/public/images/founders/`
- `lib/public/images/team/`
- `lib/public/images/portfolio/`
- `lib/public/images/clients/`

Images from `lib/public/images` are auto-copied to `public/images` when you run:

- `npm run dev`
- `npm run build`
- `npm run start`

Then update only these data files:

- `lib/data/founders.ts`
- `lib/data/team.ts`
- `lib/data/portfolio.ts`
- `lib/data/clients.ts`

Use web paths (not Windows paths). Example:

- Correct: `/images/team/sagar-gulia.jpg`
- Wrong: `C:\\Users\\...\\sagar-gulia.jpg`

Important:

- File names must match exactly (including spaces, dash, and extension).
- Example: if file is `shail sehrawat.jpg`, path must be `/images/team/shail sehrawat.jpg`.
