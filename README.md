## Apple Music MCP Server Built with Effect 

This is basically an apple music mcp server which allows you to control some parts of your apple music through your agents 

`Example: I can message my ai agent like poke through my iphone to play something and it will play that on my mac or any other apple device. Mac is the choice for now.`

this is basically me learning effect by slowly adopting some parts of effect and trying to understand it.

## Plans 

My current approach focuses on using osascript / Applescript but i have heard that there is some issues with completely controlling apple music without an apple developer paid account , we will see about that and as well move on i will update the readme. 

Basic functionalities iam aiming for:

- Play/Pause music (obv)
- Control the volume
- Add/remove songs from the queue
- search and play specific songs 

This is what i can think of for now.

Below is just a dump of my 3am half asleep brain of how we can incorporate effect into this , i would later ask claude for this and do that but what i can think of considering i dont know much about effect atm. 

- Use effect/schema for defining the request/response schema 
- Use the effect http lib for http server 
- For Error handling 

thats all i can think of for now. 

Stack: Typescript , Effect and MCP 
