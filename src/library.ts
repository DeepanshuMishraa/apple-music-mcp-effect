import { Schema, Effect as effect } from "effect";
import { osascriptList } from "./osascript";
import { paginate } from "./paginate";

interface song {
  name: string;
  artist: string;
}


const songSchema = Schema.Struct({
  limit: Schema.Number.pipe(
    Schema.int(),
    Schema.greaterThanOrEqualTo(1),
    Schema.lessThanOrEqualTo(100),
    Schema.optionalWith({ default: () => 20 })
  ),
  offset: Schema.Number.pipe(
    Schema.int(),
    Schema.greaterThanOrEqualTo(0),
    Schema.optionalWith({ default: () => 0 })
  )
});

const getAllSongs = effect.gen(function* () {
  const names = yield* osascriptList(`tell application "Music" to get name of every track of playlist "Library"`);
  const artists = yield* osascriptList(`tell application "Music" to get artist of every track of playlist "Library"`);
  return names.map((name, i) => ({ name, artist: artists[i] ?? "Unknown" }));
});

export const songsTool = (raw: unknown) =>
  effect.gen(function* () {
    const params = yield* Schema.decodeUnknown(songSchema)(raw);
    const all = yield* getAllSongs;
    return paginate(all, params.limit, params.offset);
  })
