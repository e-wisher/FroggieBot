//ribbit

module.exports = {
    name: 'ribbit',
    description: "ribbit!",
    working: true,
    cost: 1,
    args: false,
    usage: "!ribbit",
    execute(message){
        message.channel.send("Ribbit!");
    }
} 