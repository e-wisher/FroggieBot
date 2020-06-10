//display list of commands

module.exports = {
    name: "help",
    description: "display list of commands",
    execute(message, args){
        const fs = require('fs');
        
        file = fs.readdir('../FroggieBot/commands', function(error, contents){
            if(error){
                return message.channel.send("An error occured, ribbit :(");
            }
            contents = contents.toString().split(',');
            helpsheet = [];

            //collects object in temp and adds to an array of text
            for(i = 0; i < contents.length; i++){

                var temp = require(`./${contents[i]}`);
                helpsheet.push("**"+ temp.name + "**" + ": " + temp.description);

                }
            message.channel.send(helpsheet);
            })
    }
}