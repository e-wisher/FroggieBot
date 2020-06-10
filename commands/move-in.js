//froggie moves in! 
//sends images of the frog furniture in a random order

module.exports = {
    name:'move-in',
    description:"froggie makes themselves at home",
    execute(message, args){
        message.channel.send({files:['./assets/furniture/Frog_chair.jpg']});
    }
}