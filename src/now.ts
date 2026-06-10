import { Effect as effect } from "effect";
import { osascript } from "./osascript";


const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;


export const now = () => effect.gen(function* () {
  const name = yield* osascript('tell application "Music" to get name of current track');
  const artist = yield* osascript('tell application "Music" to get artist of current track');
  const album = yield* osascript('tell application "Music" to get album of current track');
  const position = yield* osascript('tell application "Music" to get player position');
  const duration = yield* osascript('tell application "Music" to get duration of current track');

  const pos = Math.floor(parseFloat(position));
  const dur = Math.floor(parseFloat(duration));

  console.log(`🎵 ${name}`);
  console.log(`   ${artist} - ${album}`);
  console.log(`   ${formatTime(pos)} / ${formatTime(dur)}`);
})
