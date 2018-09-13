const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  message.delete();

  let embed = new Discord.RichEmbed()
  .setAuthor("Ticket Help", "https://i.imgur.com/U2wEjWz.png")
  .addField("/New", "Creates new ticket channel.")
  .addField("/Close", "Closes current ticket channel.")
  .addField("/Add @user", "Adds user to ticket.")
  .addField("/Remove @user", "Removes a user from the ticket.")
  .setColor(config.colour)
  .setTimestamp()
  .setFooter(config.footer);

  message.channel.send(embed);

}
module.exports.help = {
  name: "help"
}
