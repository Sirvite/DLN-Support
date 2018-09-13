const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  message.delete();

  let bicon = bot.user.displayAvatarURL;
  let embed = new Discord.RichEmbed()

  .setAuthor("Information:", "https://i.imgur.com/U2wEjWz.png")
  .setDescription("Bot Information")
  .setColor("#15f153")
  .setThumbnail(bicon)
  .addField("Bot Name", bot.user.username)
  .addField("Created On", bot.user.createdAt);

  message.channel.send(embed);

}
module.exports.help = {
  name: "botinfo"
}
