import { readdir, readFile, rm, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ORIGINAL = /\.(jpe?g|png)$/i;
const TEXT = /\.(html|css|js|mjs|json|xml|txt)$/i;

/**
 * Astro kopiuje do `_astro` oryginały zdjęć z `src/assets`, choć strony używają
 * tylko ich wersji WebP. Po buildzie usuwamy kopie, których nazwy nie ma w żadnym
 * pliku tekstowym, co zmniejsza wdrożenie i nie zmienia działania strony.
 */
export default function pruneOriginals() {
  return {
    name: "prune-originals",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const paths = (await readdir(root, { recursive: true })).map((path) => join(root, path));

        let text = "";
        for (const path of paths) {
          if (TEXT.test(path)) text += await readFile(path, "utf8");
        }

        let removed = 0;
        let bytes = 0;
        const assets = await readdir(join(root, "_astro"));
        for (const name of assets) {
          if (!ORIGINAL.test(name) || text.includes(name)) continue;
          const path = join(root, "_astro", name);
          bytes += (await stat(path)).size;
          await rm(path);
          removed += 1;
        }
        logger.info(`Usunięto ${removed} nieużywanych oryginałów (${Math.round(bytes / 1048576)} MB).`);
      },
    },
  };
}
