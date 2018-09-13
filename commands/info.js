const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  message.delete();

  let embed = new Discord.RichEmbed()
  .setAuthor("Information:", "https://i.imgur.com/U2wEjWz.png")
  .setDescription("Using /new would create a new ticket for you to get assistance with a bug, or General Assistance")
  .setColor("#1A60E5")
  .setTimestamp()
  .setFooter(config.footer);

  message.channel.send(embed);

}
module.exports.help = {
  name: "info"
}
