import { Schema, Effect as effect } from "effect";
import { osascript, osascriptList } from "./osascript";
import { paginate } from "./paginate";
const ListPlaylistsParams = Schema.Struct({
    limit: Schema.Number.pipe(Schema.int(), Schema.greaterThanOrEqualTo(1), Schema.lessThanOrEqualTo(100), Schema.optionalWith({ default: () => 20 })),
    offset: Schema.Number.pipe(Schema.int(), Schema.greaterThanOrEqualTo(0), Schema.optionalWith({ default: () => 0 }))
});
const PlayPlaylistParams = Schema.Struct({
    name: Schema.String
});
const ListTracksParams = Schema.Struct({
    name: Schema.optional(Schema.String),
    limit: Schema.Number.pipe(Schema.int(), Schema.greaterThanOrEqualTo(1), Schema.lessThanOrEqualTo(100), Schema.optionalWith({ default: () => 20 })),
    offset: Schema.Number.pipe(Schema.int(), Schema.greaterThanOrEqualTo(0), Schema.optionalWith({ default: () => 0 }))
});
export const listPlaylistsTool = (raw) => effect.gen(function* () {
    const params = yield* Schema.decodeUnknown(ListPlaylistsParams)(raw);
    const names = yield* osascriptList('tell application "Music" to get name of every playlist');
    return paginate(names, params.limit, params.offset);
});
export const playPlaylistTool = (raw) => effect.gen(function* () {
    const params = yield* Schema.decodeUnknown(PlayPlaylistParams)(raw);
    yield* osascript(`tell application "Music" to play playlist "${params.name}"`);
    return { message: `Playing playlist: ${params.name}` };
});
export const listTracksTool = (raw) => effect.gen(function* () {
    const params = yield* Schema.decodeUnknown(ListTracksParams)(raw);
    const target = params.name
        ? `playlist "${params.name}"`
        : "current playlist";
    const names = yield* osascriptList(`tell application "Music" to get name of every track of ${target}`);
    const artists = yield* osascriptList(`tell application "Music" to get artist of every track of ${target}`);
    const tracks = names.map((name, i) => ({
        name,
        artist: artists[i] ?? "Unknown"
    }));
    return paginate(tracks, params.limit, params.offset);
});
