import { Schema, Effect as effect } from "effect";
import { osascript } from "./osascript";


const VolumeSchema = Schema.Struct({
  level: Schema.Number.pipe(
    Schema.int(),
    Schema.greaterThanOrEqualTo(0),
    Schema.lessThanOrEqualTo(100),
    Schema.optional
  )
});


export const volumeTool = (raw: unknown) =>
  effect.gen(function* () {
    const params = yield* Schema.decodeUnknown(VolumeSchema)(raw);

    if (params.level === undefined) {
      const vol = yield* osascript('tell application "Music" to get sound volume');
      return { volume: Number(vol.trim()), message: `Current volume: ${vol.trim()}%` };
    }

    yield* osascript(`tell application "Music" to set sound volume to ${params.level}`);
    return { volume: params.level, message: `Volume set to ${params.level}%` };
  })
