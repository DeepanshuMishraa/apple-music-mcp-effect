import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import { z } from "zod";
import { Effect as effect } from "effect";
import { play, pause, next, prev, playTrack } from "./playback";
import { volumeTool } from "./volume";
import { songsTool } from "./library";
import { listPlaylistsTool, playPlaylistTool, listTracksTool } from "./playlists";

const server = new McpServer({
  name: "Apple Music Mcp",
  version: "1.0.0"
});

const run = <A>(eff: effect.Effect<A, Error, never>) =>
  effect.runPromise(eff).then(
    (data) => ({
      content: [{
        type: "text" as const,
        text: data === undefined ? "Done" : typeof data === "string" ? data : JSON.stringify(data, null, 2)
      }]
    }),
    (err) => ({ content: [{ type: "text" as const, text: `Error: ${err instanceof Error ? err.message : String(err)}` }] })
  );

server.registerTool(
  "play",
  { description: "Play current track in Apple Music" },
  () => run(play())
);

server.registerTool(
  "pause",
  { description: "Pause Apple Music" },
  () => run(pause())
);

server.registerTool(
  "next",
  { description: "Skip to next track" },
  () => run(next())
);

server.registerTool(
  "previous",
  { description: "Go to previous track" },
  () => run(prev())
);

server.registerTool(
  "volume",
  {
    description: "Get or set volume (0-100). Omit level to read current volume.",
    inputSchema: z.object({
      level: z.number().optional()
    })
  },
  ({ level }) => run(volumeTool({ level }))
);

server.registerTool(
  "songs",
  {
    description: "List all songs in your Apple Music library",
    inputSchema: z.object({
      limit: z.number().optional(),
      offset: z.number().optional()
    })
  },
  ({ limit, offset }) => run(songsTool({ limit, offset }))
);

server.registerTool(
  "playlists",
  {
    description: "List all playlists in your Apple Music library",
    inputSchema: z.object({
      limit: z.number().optional(),
      offset: z.number().optional()
    })
  },
  ({ limit, offset }) => run(listPlaylistsTool({ limit, offset }))
);

server.registerTool(
  "play_playlist",
  {
    description: "Play a playlist by name",
    inputSchema: z.object({
      name: z.string()
    })
  },
  ({ name }) => run(playPlaylistTool({ name }))
);

server.registerTool(
  "play_song",
  {
    description: "Play a song by name (searches library and plays first match)",
    inputSchema: z.object({
      query: z.string()
    })
  },
  ({ query }) => run(playTrack(query))
);

server.registerTool(
  "tracks",
  {
    description: "List tracks in a playlist (or current playlist if no name given)",
    inputSchema: z.object({
      name: z.string().optional(),
      limit: z.number().optional(),
      offset: z.number().optional()
    })
  },
  ({ name, limit, offset }) => run(listTracksTool({ name, limit, offset }))
);

const main = () =>
  effect.gen(function* () {
    const transport = new StdioServerTransport();
    yield* effect.promise(() => server.connect(transport));
  });

effect.runPromise(main());
