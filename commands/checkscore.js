//displays current score of user


module.exports = {

    name: 'checkscore',
    description: 'Display your current score',
    working: true,
    cost: 1,
    args: false,
    usage: "!Checkscore",
    execute(message){
        const sqlite = require('better-sqlite3');
        const sql = sqlite('./scores.sqlite');

        const userpoints = sql.prepare("SELECT points, level, balance FROM scores WHERE user = ? AND guild = ?").get(message.author.id, message.guild.id);

        message.channel.send(`You have ${userpoints.points} points, ribbit\nThis means you are level ${userpoints.level}!`)
    }
}