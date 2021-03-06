//Sends an image of a frog in a hat, currently stored locally


module.exports = {
    name: 'hats',
    description: 'Sends an image of a dapper fellow!',
    working: true,
    cost: 2,
    args: false,
    usage: "!hats",
    execute(message){
        const fs = require('fs');
        function RandomNumberInt(max, min){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    
    files = fs.readdir('../FroggieBot/assets/hats', function(error, data){
        contents = data.toString().split(",");
        message.channel.send({files:[`../FroggieBot/assets/hats/${contents[RandomNumberInt((contents.length-1),0)]}`]});
    })
    }
}