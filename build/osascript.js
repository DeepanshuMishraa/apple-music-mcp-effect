import { Effect as effect } from "effect";
const $ = Bun.$;
export const osascript = (script) => effect.tryPromise({
    try: () => $ `osascript -e ${script}`.text().then((r) => r.trim()),
    catch: (unknown) => new Error(String(unknown))
});
export const osascriptList = (script) => effect.gen(function* () {
    const result = yield* osascript(script);
    if (!result)
        return [];
    return result.split(", ").map(s => s.trim());
});
