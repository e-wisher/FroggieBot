//displays server info


module.exports = {
    name: 'server',
    description: "display server info",
    working: true,
    cost: 1,
    args: false,
    usage: "!server",
    execute(message){
            message.channel.send(`This pond is called ${message.guild.name}\nThere are a total of ${message.guild.memberCount} frogs in this pond, wow! \nribbit`);
        }
    }
