//add score factors into an embed
const sqlite = require('better-sqlite3');
const {DiscordAPIError} = require('discord.js');
const sql = new sqlite('./scores.sqlite');


module.exports = {
    name: 'Scorehandler',
    description: 'Handles score incrementation',
    working: false,
    args: false,
    execute(message, client, command){
        const Discord = require('discord.js');

        let score;
        if (message.guild) {
          score = client.getScore.get(message.author.id, message.guild.id);}
        if(!score){
            score = {
                user_id: `${message.guild.id}-${message.author.id}`,
                user: message.author.id,
                guild: message.guild.id,
                points: 0,
                level: 1
              }
              const embed = new Discord.MessageEmbed()
                .setColor('#3f6918')
                .addField('\u200b', "Oh! a tadpole, \nYou're at level 1, ribbit!" )
                message.channel.send(embed)
            }
        //increment points and save to Db
        score.points = score.points + command.cost;
        score.balance = score.balance + 1
        const newlevel = Math.ceil(Math.sqrt(score.points));
        
        if(score.level < newlevel){
            //turn into an embed with a smiley frog :)
            message.reply(`Wowee, You've levelled up! ribbit, you're now level ${newlevel}`);
            
        }
        sql.prepare("INSERT OR REPLACE INTO scores (user_id, user, guild, points, level, balance) VALUES (?,?,?,?,?,?);").run(score.user_id, score.user, score.guild, score.points, newlevel, score.balance);
    }
}
