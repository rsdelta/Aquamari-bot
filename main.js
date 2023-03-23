require('dotenv').config();

import {jokes, selfEvent} from "./data/jokes";
import {guild_events} from "./data/schedule";

const schedule = require('node-schedule');
const { Client, GatewayIntentBits, Collection, Routes, REST, SlashCommandBuilder, ChannelType } = require('discord.js');

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages ]});
const rest = new REST({version: '10'}).setToken(process.env.TOKEN);
const GUILD_TAG = "<@&678545537317732373>";

let announcementTimeout = null;
let jokeTimeout = null;



client.commands = new Collection();

client.on('messageCreate', (message) => {
	if (message.content.toLowerCase().includes("сиськи?")) {
		message.reply('Сиськи Лир, но лучше проверить карту осады.')
	}
	else if (message.content.toLowerCase().includes("кто вор")) {
		message.reply('Древняя китайская мудрость: \n1) Ба обвиняет Бу: Бу\n2) Бу обвиняет Бу: Ба\n3) Бо обвиняет Бу: Бо')
	}
	else if (message.content.includes("<@1088130726597234791>")) {//Bot highlighted
		let firstMessage = "";
		if(message.author.id === "266214524225323008") { //Killer
			firstMessage = "Держи морковку.\n\n"
		}
		else if(message.author.id === "237832481389150208") { //Killer
			firstMessage = "Плути хъеп!\n\n"
		}
		else if(message.author.id === "302915882261151747") { //Левайд
			firstMessage = "Ле Душнайд?\n\n"
		}
		else if(message.author.id === "525229138110578709") { //Жаба
			firstMessage = "АААААААааааааааааааАААААААААаааААА!\n\n"
		}
		else if(message.author.id === "205731886184660992") {//Owner
			message.reply('Я не смею перечить своему господину.')
			return;
		}
		message.reply(firstMessage + selfEvent[Math.floor(Math.random() * selfEvent.length)])
	}
});



function sendTimedAnnouncement(channel) {
	const date = new Date(new Date().getTime());
	const time = date.toLocaleTimeString([], {hour12: false});
	const day = date.getDay();
	guild_events.forEach((event) => {
		if (event.day === day && event.time === time) {
			if (event.important) {
				channel.send({ content: GUILD_TAG + " " + event.text})
			}
			else {
				channel.send({ content: event.text})
			}

		}
	});

	clearTimeout(announcementTimeout);
	announcementTimeout = setTimeout(() => {
		sendTimedAnnouncement(channel);
	}, 1000);
}

function sendTimedJoke(channel) {
	const date = new Date(new Date().getTime());
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	if (minutes === 0 && seconds === 0 && (hours > 7 && hours < 23)) {
		const firstMessage = "Несмешная шутка часа:\n";
		console.log("Sending joke");
		channel.send({ content: firstMessage + jokes[Math.floor(Math.random() * jokes.length)]})
	}

	clearTimeout(jokeTimeout);
	jokeTimeout = setTimeout(() => {
		sendTimedJoke(channel);
	}, 1000);
}

client.on('ready', () => {
	console.log('Aquamari Bot initialized!');
	const date = new Date(new Date().getTime());
	const time = date.toLocaleTimeString([], {hour12: false});
	console.log(time);
	client.channels.fetch('625649420553289749') //Main channel
		.then(channel => {
			sendTimedAnnouncement(channel);
		});

	client.channels.fetch('638469455390965760') //Bot channel
		.then(channel => {
			sendTimedJoke(channel);
		});
});

client.on('interactionCreate', (interaction) => {
	if (interaction.isChatInputCommand()) {
		if (interaction.commandName === 'schedule') {
			const message = interaction.options.getString('message');
			const time = interaction.options.getInteger('time');
			const channel = interaction.options.getChannel('channel');
			const date = new Date(new Date().getTime() + time);
			interaction.reply({ content: 'Принято.'});
			schedule.scheduleJob(date, () => {
				channel.send({ content: message})
			});

		}
	}
});


const commands = [
	new SlashCommandBuilder().setName('schedule').setDescription('Schedules a message').addStringOption((option) => option.setName('message').setDescription('The message to be scheduled').setRequired(true).setMinLength(1).setMaxLength(1000))
		.addIntegerOption((option) => option.setName('time').setDescription('time').setChoices(
			{name: '1 Minute', value: 60000},
			{name: '10 Minutes', value: 600000},
		).setRequired(true))
		.addChannelOption(option => option.setName('channel').setDescription('channel').addChannelTypes(ChannelType.GuildText).setRequired(true))
		.toJSON()
];

async function main() {
	try {
		await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
			body: [] //TODO: return commands
		});
		client.login(process.env.TOKEN)
	}
	catch (err) {
		console.log(err);
	}
}

main();