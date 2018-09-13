const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) => {

  let amt = args[0] || 1;

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");

  if (amt >= 99) {
    let e = new Discord.RichEmbed()
    .addField(`Are you sure you want to delete ${amt} messages`,`Yes\t-\t<:yes:475909521223581717>\nNo\t-\t<:no:475909534825578497>`)
    .setColor("#0e46a0");

    let embed = await message.channel.send(e);
    await embed.react('yes:475909521223581717');
    await embed.react('no:475909534825578497');

    let filterE = (reaction, user) => {
      return ['yes', 'no'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    let choice1 = await embed.awaitReactions(filterE, {
      max: 1,
      time: 60000,
      errors: ['time']
    });

    if (choice1.first()._emoji.name == 'no') {
      message.delete();
      embed.delete();
      return;
    }

    if (choice1.first()._emoji.name == 'yes') {
      var Ramt=parseInt(amt);
      while(Ramt > 0){
        if (Ramt>=100) {
          await del(message, 99);
          Ramt = Ramt - 99;
        }else{
        await del(message, Ramt);
        Ramt = Ramt - Ramt;
      }
      }

      await amtidentify(amt);

    }


  }else{
    await del(message, amt);
    await amtidentify(amt);
}

function del(message,amt){
message.channel.bulkDelete(++amt,true);
}

function amtidentify(amt){
message.channel.send(`Cleared ${amt} messages.`).then(msg => msg.delete(5000));
}


}



module.exports.help = {
  name: "clear",
  aliases:['purge'],
  description: "Removes a set amount of messages in the channel. If no amount is defined, it will remove the previous message",
  reqRank: 0,
  hidden: false,
  usage: "clear 10"
}
