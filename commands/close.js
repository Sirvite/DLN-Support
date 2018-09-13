const Discord = require ("discord.js");
const config = require("../config.json");
const colour = config.colour;

module.exports.run = async (bot, message, args) => {
  message.delete();
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you have insufficient permissions.");
    let username = message.author.username;

    let channelName = message.channel.name
    if (!message.channel.name.startsWith("ticket-")) return message.channel.send(`:x: You can't use the close command outside of a ticket channel!`);
    const embed1 = new Discord.RichEmbed()
    .setAuthor("Close Ticket: ", "https://i.imgur.com/U2wEjWz.png")
    .setColor(colour)
    .setDescription("Once confirmed, this action cannot be reversed. If you wish to proceed, please enter \"**yes**\" in this channel.\nThis will time out in 20 seconds.")
    .setTimestamp()
    .setFooter(`${config.footer}`);

    const embed2 = new Discord.RichEmbed()
    .setColor(colour)
    .setAuthor("Close Ticket: ", "https://i.imgur.com/U2wEjWz.png")
    .setDescription("The ticket will close in 10 seconds!")
    .setTimestamp()
    .setFooter(`${config.footer}`);

    const embed3 = new Discord.RichEmbed()
    .setColor(colour)
    .setAuthor("Ticket Closed: ", "https://i.imgur.com/U2wEjWz.png")
    .setDescription(`The support ticket ` + "#" + `${channelName} has been closed by ${username}!`)
    .setTimestamp()
    .setFooter(`${config.footer}`);

    message.channel.send(embed1)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'yes', {
        max: 1,
        time: 20000,
        errors: ['time'],
      })
      .then((collected) => {
        message.channel.send(embed2)
        var interval = setInterval(function() {
          message.channel.delete()
          clearInterval(interval);
        }, 10 * 1000);
        })
        .catch(() => {
          m.edit('Ticket close timed out, the ticket has not been closed.').then(m2 => {
              m2.delete();
          }, 10000);
        });
    });

}
module.exports.help = {
	name: "close"
}
