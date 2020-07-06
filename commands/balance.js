module.exports = {
    name: 'balance',
    description: 'check your current wallet balance',
    cost: 0,
    working: true,
    args: false,
    usage: '!balance',
    execute(message){
        const sqlite = require('better-sqlite3');
        const sql = sqlite('./scores.sqlite');
        
        const userpoints = sql.prepare("SELECT balance FROM scores WHERE user = ? AND guild = ?").get(message.author.id, message.guild.id);
        message.channel.send(`You have ${userpoints.balance} coins, earn more by using the bot!`);
    }
}