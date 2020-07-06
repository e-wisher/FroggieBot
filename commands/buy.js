const { Guild } = require('discord.js');

module.exports = {
    name: 'buy',
    description: 'Purchase an item from the shop',
    cost: 0,
    args: true,
    working: true,
    usage: "!buy <item>",
    execute(message, args){
        const sqlite = require('better-sqlite3');
        const sql = sqlite('./scores.sqlite');

        const id = message.guild.id + "-" + message.author.id;

        const item = sql.prepare("SELECT item_id, name, cost, level FROM items WHERE ? = name ").get(args[0])
        const userpoints = sql.prepare("SELECT * FROM scores WHERE ? = user_id").get(id);

        if(userpoints.level <= item.level){
            return message.channel.send("Sorry! you aren't a high enough level to purchase this, ribbit");
        }else if(userpoints.balance < item.cost){
            return message.channel.send("You can't afford this! ribbit!");
        }else{
            const newbal = userpoints.balance - item.cost;
            var currDate = new Date().getDate()
            sql.prepare("INSERT INTO bought(user_id, item_id, date) VALUES (?,?,?)").run(id, item.item_id, currDate);
            sql.prepare("UPDATE scores SET balance = ? WHERE user_id = ?").run(newbal, id);
            message.channel.send(`Purchase Successful! You now own: ${item.name} :frog:`)
        }
    }
}