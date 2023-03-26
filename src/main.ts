import { config } from 'dotenv';
import { jokes } from './strings/jokes';
import {guild_events, guild_events_mobile, GuildEvent} from './strings/schedule';
import { scheduleJob } from 'node-schedule';
import { Client, GatewayIntentBits, Collection, Routes, REST, SlashCommandBuilder, ChannelType } from 'discord.js';
import { MessageService } from "./MessageService";

const TIMEZONE_OFFSET = 3;

let globalTimeout = null;
let rest = null;
let commands = null;

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages ]});
client["commands"] = new Collection();

config();
initClientEvents();
main();

function startTimedEvent() {
	client.channels.fetch('625649420553289749') //Main channel
		.then(channel => {
			sendTimedAnnouncement(channel, guild_events);
		});
	client.channels.fetch('1085959065462644867') //RevelationMobile 1085959065462644867
		.then(channel => {
			sendTimedAnnouncement(channel, guild_events_mobile);
		});
	client.channels.fetch('638469455390965760') //Bot channel
		.then(channel => {
			sendTimedJoke(channel);
		});
	clearTimeout(globalTimeout);
	globalTimeout = setTimeout(() => {
		startTimedEvent();
	}, 1000);
}

function initClientEvents() {
	client.on('messageCreate', (message) => {
		if (message?.author?.id === "1088130726597234791") {
			return;
		}
		MessageService.getInstance().spellCheck(message)
		MessageService.getInstance().aggressiveReplies(message);
	});

	client.on('ready', () => {
		console.log('Aquamari Bot initialized!');
		MessageService.getInstance().addClient(client);
		const time = MessageService.getInstance().calcTime(TIMEZONE_OFFSET);
		console.log("Start time: " + time);
		startTimedEvent();
	});

	client.on('interactionCreate', (interaction) => {
		if (interaction.isChatInputCommand()) {
			switch (interaction.commandName) {
				case 'schedule':
					const message = interaction.options.getString('message');
					const time = interaction.options.getInteger('time');
					const channel : any = interaction.options.getChannel('channel');
					const date = new Date(new Date().getTime() + time);
					interaction.reply({ content: 'Принято.'});
					scheduleJob(date, () => {
						channel.send({ content: message})
					});
					break;
				case 'roll':
					const user = interaction?.user?.id;
					if (!user) {
						console.log("User not found: " + user);
						return;
					}
					const userString = "<@" + user + ">";
					const randomNumber = Math.floor(Math.random() * 100) + 1;
					interaction.reply({ content: `${userString} бросает кубик: [${randomNumber}] оч.`});
					break;
			}

		}
	});
}

function sendTimedAnnouncement(channel: any, list: GuildEvent[]) {
	const date = new Date(new Date().getTime());
	const time = MessageService.getInstance().calcTime(TIMEZONE_OFFSET);
	const day = date.getDay();
	list.forEach((event) => {
		if (event.day === day && event.time === time) {
			MessageService.getInstance().sendMessage(channel, (event.highlight_id || "") + " " + event.text)
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
		MessageService.getInstance().sendMessage(channel, firstMessage + jokes[Math.floor(Math.random() * jokes.length)]);
	}
}

function scheduleMessageCommand() {
	return new SlashCommandBuilder().setName('schedule').setDescription('Schedules a message').addStringOption((option) => option.setName('message').setDescription('The message to be scheduled').setRequired(true).setMinLength(1).setMaxLength(1000))
		.addIntegerOption((option) => option.setName('time').setDescription('time').setChoices(
			{name: '1 Minute', value: 60000},
			{name: '10 Minutes', value: 600000},
		).setRequired(true))
		.addChannelOption(option => option.setName('channel').setDescription('channel').addChannelTypes(ChannelType.GuildText).setRequired(true))
		.toJSON();
}

function rollCommand() {
	return new SlashCommandBuilder().setName('roll').setDescription('Roll dice').toJSON();
}

function initCommands() {
	commands = [
		scheduleMessageCommand(),
		rollCommand()
	];
}

async function main() {
	rest = new REST({version: '10'});
	rest.setToken(process.env.TOKEN);
	initCommands();
	try {
		await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
			body: commands
		});
		client.login(process.env.TOKEN)
	}
	catch (err) {
		console.log(err);
	}
}
