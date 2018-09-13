const Discord = require ("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const config = require("./config.json");
const colour = config.colour;

bot.commands = new Discord.Collection();
let prefix = config.prefix;

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0 ){
    console.log("Couldn't find commands!");
    return;
  };
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${i + 1}: ${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is now online!`)
  bot.user.setActivity("DLN | /new", {type: "WATCHING"});
  bot.user.setStatus("dnd");
});

bot.on("message", async message => {
  if(!message.content.startsWith(prefix)) return;
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
});

bot.login(config.token);
