//edit the nickname of user to include the word frog randomly

module.exports = {
    name: 'froggify',
    description: 'become one of us',
    execute(message, args){
        if(!message.guild.me.hasPermission("MANAGE_NICKNAMES")){
            return message.channel.send("I dont have permission to do that!");}

        message.member.setNickname("FroggyCheck");
    }
}