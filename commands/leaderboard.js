const { DiscordAPIError } = require('discord.js');

module.exports = {
    name: "leaderboard",
    description: "Shows who the froggiest people in the server are!",
    working: true,
    args: false,
    cost: 2,
    usage: "!leaderboard",
    execute(message){
        const sqlite = require('better-sqlite3');
        const sql = sqlite('./scores.sqlite');
        const Discord = require('discord.js');

        const BoardEmbed = new Discord.MessageEmbed()
        .setColor('#3f6918')
        .setTitle('Leaderboard')

        temp = sql.prepare("SELECT user, points FROM scores WHERE guild = ? ORDER BY points DESC").all(message.guild.id);


        temp.forEach((item, index)  => {
                message.guild.members.fetch(item.user)
                .then(response => {
                    const embedContent = (`${"- "+ (index+1) + " :"}  ${response.user.username} has:  ${item.points} points!`);
                    BoardEmbed.addField("\u200b", embedContent);
                    if(index === (temp.length - 1)|| index === 10){
                        message.channel.send(BoardEmbed);

                    }
                });    
        }) 
        
    }


}