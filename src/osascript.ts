import { execSync } from "child_process";
import { Effect as effect } from "effect";

const escape = (s: string) => s.replace(/'/g, "'\\''");

export const osascript = (script: string) => effect.try({
  try: () => execSync(`osascript -e '${escape(script)}'`, { encoding: "utf-8" }).trim(),
  catch: (unknown) => new Error(String(unknown))
});



export const osascriptList = (script: string) =>
  effect.gen(function* () {
    const result = yield* osascript(script);
    if (!result) return [];
    return result.split(", ").map(s => s.trim());
  })
