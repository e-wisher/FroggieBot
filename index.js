const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require('./config.json');
const couchbase = require('couchbase');
const sqlite = require('better-sqlite3');
const sql = new sqlite('./scores.sqlite');


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.on('ready', () => {
	const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='scores';").get();
	if(!table['count(*)']){
 		const Initialise = require('./DBinit.js');
 		try{
 			Initialise();}
 		catch{
 			return;
 		}
 	}

 	client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
 });

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

//check for messages
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	//updates score per command request
	const scorecheck = require('./Scorehandler.js');
	scorecheck.execute(message, client, client.commands.get(command));

	if (!client.commands.has(command)) return;
	if(client.commands.get(command).working === false) return message.channel.send("Currently unavailable");

	//if true in file, and no args supplied: error
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
	
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}
	
		return message.channel.send(reply);
	}


	try {
		client.commands.get(command).execute(message, args);}
		
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
}
})


client.login(token);