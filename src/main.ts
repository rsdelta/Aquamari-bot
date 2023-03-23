import { config } from 'dotenv';
import { jokes } from './strings/jokes';
import {guild_events, guild_events_mobile} from './strings/schedule';
import { scheduleJob } from 'node-schedule';

import { Client, GatewayIntentBits, Collection, ChannelType } from 'discord.js';
import { MessageService } from "./MessageService";
import {channel} from "diagnostics_channel";

let globalTimeout = null;

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages ]});
client["commands"] = new Collection();

config();
initClientEvents();
main();

function startTimedEvent(channel) {
	client.channels.fetch('625649420553289749') //Main channel
		.then(channel => {
			sendTimedAnnouncement(channel, guild_events);
		});

	client.channels.fetch('638469455390965760') //Bot channel
		.then(channel => {
			sendTimedJoke(channel);
		});

	client.channels.fetch('1085959065462644867') //RevelationMobile 1085959065462644867
		.then(channel => {
			sendTimedAnnouncement(channel, guild_events_mobile);
		});

	clearTimeout(globalTimeout);
	globalTimeout = setTimeout(() => {
		startTimedEvent(channel);
	}, 1000);
}

function initClientEvents() {
	client.on('messageCreate', (message) => {
		MessageService.getInstance().aggressiveReplies(message);
	});

	client.on('ready', () => {
		console.log('Aquamari Bot initialized!');
		const date = new Date(new Date().getTime());
		const time = date.toLocaleTimeString([], {hour12: false});
		console.log(time);
		startTimedEvent(channel);
	});

	client.on('interactionCreate', (interaction) => {
		if (interaction.isChatInputCommand()) {
			if (interaction.commandName === 'schedule') {
				const message = interaction.options.getString('message');
				const time = interaction.options.getInteger('time');
				const channel : any = interaction.options.getChannel('channel');
				const date = new Date(new Date().getTime() + time);
				interaction.reply({ content: 'Принято.'});
				scheduleJob(date, () => {
					channel.send({ content: message})
				});

			}
		}
	});
}

function sendTimedAnnouncement(channel: any, list) {
	const date = new Date(new Date().getTime());
	const time = date.toLocaleTimeString([], {hour12: false});
	const day = date.getDay();
	list.forEach((event) => {
		if (event.day === day && event.time === time) {
			if (event.important) {
				MessageService.getInstance().sendMessage(channel, event.highlight_id + " " + event.text)
			}
			else {
				MessageService.getInstance().sendMessage(channel, event.text);
			}
		}
	});
}

function sendTimedJoke(channel: any) {
	const date = new Date(new Date().getTime());
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	if (minutes === 0 && seconds === 0 && (hours > 7 && hours < 23)) {
		const firstMessage = "Несмешная шутка часа:\n";
		console.log("Sending joke");
		MessageService.getInstance().sendMessage(channel, firstMessage + jokes[Math.floor(Math.random() * jokes.length)]);
	}
}

function main() {
	try {
		client.login(process.env.TOKEN)
	}
	catch (err) {
		console.log(err);
	}
}
