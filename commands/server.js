module.exports = {
    name: 'server',
    description: "display server info",
    execute(message, args){
            message.channel.send(`This pond is called ${message.guild.name}\nThere are a total of ${message.guild.memberCount} frogs in this pond, wow! \nribbit`);
        }
    }
