const Discord = require ("discord.js");
const config = require("../config.json");
const colour = config.colour;
const categoryID = config.CategoryID;

module.exports.run = async (bot, message, args) => {

  const embed = new Discord.RichEmbed()
  .setColor(colour)
  .setDescription(`:x: ${message.author.username} you already have a ticket open! If this is incorrect, please contact a staff member immediately!`)
  .setTimestamp()
  .setFooter(`${config.footer}`);

  const embed3 = new Discord.RichEmbed()
  .setColor(colour)
  .setAuthor("DLN Support:", "https://i.imgur.com/U2wEjWz.png")
  .setDescription("Thank you for reaching our support team! A member of our support team will be with you soon, by the time please specify what you need assistance with.")
  .setTimestamp()
  .setFooter(`${config.footer}`);

  let user1 = message.author.username.toLowerCase()
  if (message.guild.channels.exists(`name`, `ticket-${user1}`)) {
    message.channel.send(embed)
    return
  }

  message.guild.createChannel(`ticket-${message.author.username}`).then(async c => {
    c.setParent(categoryID);
    let supportrole = message.guild.roles.find(`name`, `Support Team`)
    if(!supportrole) return message.channel.send("The support role doesn't exist! Please create a role called **Support Team**");
    c.overwritePermissions(message.guild.defaultRole, {
      VIEW_CHANNEL: false,
      SEND_MESSAGES: false
    })
    c.overwritePermissions(message.member, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true
    })
    c.overwritePermissions(supportrole, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true
    })

    const embed2 = new Discord.RichEmbed()
    .setColor(colour)
    .setDescription(`${message.author.username} has created a support ticket!`)
    .setTimestamp()
    .setFooter(`${config.footer}`);

    message.channel.send(embed2)

    c.send(embed3)

    message.delete(2);
  })

}
module.exports.help = {
	name: "new"
}
