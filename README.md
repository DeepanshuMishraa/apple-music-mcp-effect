## Apple Music MCP Server Built with Effect 

This is basically an Apple Music MCP server which allows you to control some parts of your Apple Music through your agents

## Setup

1. Clone the repo
2. `bun install`
3. `bun run build`
4. Add to your MCP client config:

```json
{
  "mcpServers": {
    "apple-music": {
      "command": "node",
      "args": ["/path/to/effect-apple-music/build/index.js"]
    }
  }
}
```

For opencode, add to `~/.config/opencode/opencode.json`:

```json
"apple-music": {
  "type": "local",
  "command": ["node", "/path/to/effect-apple-music/build/index.js"],
  "enabled": true
}
``` 

`Example: I can message my AI agent to poke through my iPhone to play something and it will play that on my Mac or any other Apple device. Mac is the choice for now.`

This is basically me learning Effect by slowly adopting some parts of Effect and trying to understand it.

## Plans 

My current approach focuses on using osascript / Applescript but I've heard that there are some issues with completely controlling Apple Music without a paid Apple Developer account, we will see about that and as well move on I will update the readme. 

Basic functionalities I'm aiming for:

- Play/Pause music (obv)
- Control the volume
- Add/remove songs from the queue
- Search and play specific songs 

This is what I can think of for now.

Below is just a dump of my 3am half asleep brain of how we can incorporate Effect into this, I would later ask Claude for this and do that but what I can think of considering I don't know much about Effect atm. 

- Use effect/schema for defining the request/response schema 
- Use the effect http lib for http server 
- For Error handling 

That's all I can think of for now. 

Stack: TypeScript, Effect and MCP 


# From the future:

Alright so did some hand coding after a while, felt good got a somewhat good understanding of Effect and will continue to do so. 

### About the MCP

It didn't turn out to be what I expected but it works for now. So it turns out to search the music catalog on Apple Music you need their $99 Apple Developer account but other than that we've achieved quite a bit. 

What it can do :

- Play / Pause songs from your library and playlists 
- Move between previous and next tracks 
- Control the volume 
- List songs in your playlists/library
- Play a specific song from your library / playlist 

TBH quite happy with this thing, it's not what I wanted but this will do the job for now.

Also this `https://github.com/wiedymi/applemusic-cli` worked as a good reference for the osascript commands. So yeah, good job. 

## Future of this 

I will be exploring ways to bypass this catalog thing but I don't think there is a workaround.

I will explore if we can implement a device switching tool to switch the device to play the music (no idea if it would even work)
