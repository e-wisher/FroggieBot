module.exports = {
    name: 'inventory',
    description: 'Check your inventory and see what items you have',
    cost: 1,
    args: false,
    usage: "!inventory",
    execute(message){
        const sqlite = require('better-sqlite3');
        const sql = new sqlite('./scores.sqlite');
        const Discord = require('discord.js');
        
        const id = message.guild.id + "-" + message.author.id 
        const inv = sql.prepare("SELECT * FROM bought WHERE user_id = ?").all(id);
        
        invEmbed = new Discord.MessageEmbed().setTitle("Inventory").setColor('#3f6918')

        inv.forEach(item => {
            iteminfo = sql.prepare("SELECT name, description FROM items INNER JOIN bought ON items.item_id = bought.item_id WHERE items.item_id= ?").get(item.item_id);
            invEmbed.addField("\u200b",`${iteminfo.name}: ${iteminfo.description}`);
        });

        message.channel.send(invEmbed);
    }
}