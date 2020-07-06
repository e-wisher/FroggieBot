const { DiscordAPIError } = require('discord.js');

module.exports = {
    name: 'shop',
    description: 'See whats for sale',
    working: true,
    cost: 1,
    args: false,
    execute(message){
        const sqlite = require('better-sqlite3');
        const sql = new sqlite('./scores.sqlite');
        const Discord = require('discord.js');

        ShopContent = sql.prepare("SELECT * FROM items").all();

        shopEmbed = new Discord.MessageEmbed()
        .setColor('#3f6918')        
        .setTitle('Shop :frog:')


        ShopContent.forEach((item, index) => {
            shopEmbed.addField("\u200b", `${item.name}: ${item.cost} :moneybag: \n *${item.description} (level ${item.level})*`)
        });

        shopEmbed.addField("\u200b", "To purchase, please use !buy <item name> :frog:")
        message.channel.send(shopEmbed);
    }
}