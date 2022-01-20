const Discord = require ("discord.js");
const config = require("../config.json");
const colour = config.colour;

module.exports.run = async (bot, message, args) => {
  message.delete();
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you have insufficient permissions.");
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let username = message.author.username;
  if(!user) return message.channel.send("That user could not be found. Please supply a currect user tag.")

  let theChannel = message.channel;
  let channelName = theChannel.name;
  if (!channelName.startsWith(`ticket-`)) return message.channel.send(`You can't use the add command outside of a ticket channel!`);

  theChannel.overwritePermissions(user, {
      SEND_MESSAGES: true,
      READ_MESSAGES: true,
      ATTACH_FILES: true
  });

  let embed = new Discord.RichEmbed()
  .setColor(colour)
  .setTitle(`User added!`)
  .setDescription(`${message.author.tag} has added ${user} to this ticket!`)
  .setTimestamp()
  .setFooter(`${config.footer}`);

  message.channel.send(embed)
}


module.exports.help = {
  name: "add"
}
