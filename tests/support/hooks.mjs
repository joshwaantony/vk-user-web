// Node module hooks for unit tests (node --test), no extra dependencies:
// - resolve the "@/..." alias (jsconfig.json) to ./src
// - load src/**/*.js as ES modules (package.json has no "type": "module")
import { pathToFileURL, fileURLToPath } from "node:url";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const SRC = path.resolve(fileURLToPath(new URL("../../src", import.meta.url)));

export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    const base = path.join(SRC, specifier.slice(2));
    for (const candidate of [base, `${base}.js`, path.join(base, "index.js")]) {
      if (existsSync(candidate) && statSync(candidate).isFile()) {
        return { url: pathToFileURL(candidate).href, shortCircuit: true };
      }
    }
  }
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (url.startsWith("file:")) {
    const file = path.resolve(fileURLToPath(url));
    if (file.startsWith(SRC) && file.endsWith(".js")) {
      return { format: "module", source: readFileSync(file, "utf8"), shortCircuit: true };
    }
  }
  return next(url, context);
}
