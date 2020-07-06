//display list of commands

//toDO format embed as to be cute af ty

module.exports = {
    name: "help",
    description: "display list of commands",
    working: true,
    cost: 0,
    args: false,
    execute(message, args){
        const Discord = require('discord.js');
        const fs = require('fs');
        if(!args.length){
            file = fs.readdir('../FroggieBot/commands', function(error, contents){
                if(error){
                    return message.channel.send("An error occured, ribbit :(");
                }
                contents = contents.toString().split(',');
                helpsheet = [];
                //collects object in temp and adds to an array of text
                for(i = 0; i < contents.length; i++){

                    var temp = require(`./${contents[i]}`);
                    if(!temp.working == false){helpsheet.push("**"+ temp.name + "**" + ": " + temp.description);}

                    }

                    const helpEmbed = new Discord.MessageEmbed()
                    .setColor('#3f6918')
                    .setTitle('Froggiebot commands:')
                    .setDescription('what *can* this frog do?')
                    .addField('\u200b' , helpsheet)
                    .addField('\u200b' , "For information about individual commands: use !help <command>\nFor information on currency use !help currency")
                    message.channel.send(helpEmbed);
                })
            }
        else{
            if(args[0] === "currency"){
                const helpEmbed = new Discord.MessageEmbed()
                .setColor('#3f6918')
                .setTitle('Currency information')
                .addField('->', "Currency is earned by interacting with the bot, each command gives you a certain amount of wealth.\n Use currency TBA")
                message.channel.send(helpEmbed);
            }
            else{
                file = fs.readdir("../FroggieBot/commands" , function(error, contents){
                    if(error) return message.reply("Something went wrong, ribbit")
                    contents = contents.toString().split(',');
                    for(i = 0; i < contents.length; i++){
                        temp = require(`./${contents[i]}`);
                        if(temp.name == args[0]){
                            const helpEmbed = new Discord.MessageEmbed()
                            .setColor('#3f6918')
                            .setTitle('Command Help')
                            .addField('Usage:', temp.usage)
                            .addField('\u200b', temp.description)

                            message.reply(helpEmbed)
                        }
                    }
                })
            }
            
            
        }
        }   
    }
