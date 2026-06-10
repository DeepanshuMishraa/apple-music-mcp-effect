import { Effect as effect } from "effect";
import { osascript } from "./osascript";


export const play = () => effect.gen(function* () {
  yield* osascript('tell application "Music" to play');
});


export const pause = () => effect.gen(function* () {
  yield* osascript('tell application "Music" to pause');
});


export const next = () => effect.gen(function* () {
  yield* osascript('tell application "Music" to next track');
});


export const prev = () => effect.gen(function* () {
  yield* osascript('tell application "Music" to previous track');
});

export const playTrack = (query: string) =>
  effect.gen(function* () {
    yield* osascript(`tell application "Music" to play (first track whose name contains "${query}")`);
  });
