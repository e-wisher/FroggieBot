
module.exports = {
    name: 'image',
    description: 'Retrieves first image from google search pertaining to argument supplied',
    working: true,
    args: true,
    cost: 2,
    usage: '!image <searchterm>',
    execute(message, args){
        filter = ["frog","froggy","toad","froggie","ribbit","croak","fwoggy","tadpole","pond","FROG","Frog","dat boi"];
        const gis = require('g-i-s');

        if(!args.length){
            return message.reply("Please give me something to search, ribbit");
        }

        if(args.length > 1){
            var concatSearch = ""
            //collects search term in google format from argument
            for(i = 0; i < (args.length - 1); i++){
                concatSearch += `${args[i]}` + "+";
            }
            concatSearch += `${args[args.length - 1]}`
        }
        else{
            var concatSearch = `${args[0]}`;
        }

        var opts = {
            searchTerm: concatSearch,
        }

        gis(concatSearch, logResults);
        //collects from google
        function logResults(error, results){
            if(error) return message.reply("Something went wrong with image search, ribbit");
            else{
                if(!filter.some(word =>
                    message.content.includes(word))){
                    message.channel.send("Thats not frog related, ribbit >:(");
                }
                else{
                    message.channel.send("ribbit :)!");
                }
                message.channel.send({files: [results[0].url]});

                
            }
        }
    }
}