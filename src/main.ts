import { config } from 'dotenv';
import { jokes } from './strings/jokes';
import {guild_events, guild_events_mobile, GuildEvent} from './strings/schedule';
import { scheduleJob } from 'node-schedule';
import { Client, GatewayIntentBits, Collection, Routes, REST, SlashCommandBuilder, ChannelType, EmbedBuilder } from 'discord.js';
import {QueryType , Player} from 'discord-player'
import { MessageService } from "./MessageService";

const TIMEZONE_OFFSET = 2;

let globalTimeout = null;
let rest = null;
let commands = null;

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates ]});

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

async function initClientEvents() {
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
		console.log(time);
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
				case 'play':
					playAudio(interaction);
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

function playAudioCommand() {
	return new SlashCommandBuilder()
			.setName("play")
			.setDescription("play a song from YouTube.")
			.addSubcommand(subcommand =>
				subcommand
					.setName("search")
					.setDescription("Searches for a song and plays it")
					.addStringOption(option =>
						option.setName("searchterms").setDescription("search keywords").setRequired(true)
					)
			)
			.addSubcommand(subcommand =>
				subcommand
					.setName("playlist")
					.setDescription("Plays a playlist from YT")
					.addStringOption(option => option.setName("url").setDescription("the playlist's url").setRequired(true))
			)
			.addSubcommand(subcommand =>
				subcommand
					.setName("song")
					.setDescription("Plays a single song from YT")
					.addStringOption(option => option.setName("url").setDescription("the song's url").setRequired(true))
			)
}
function rollCommand() {
	return new SlashCommandBuilder().setName('roll').setDescription('Roll dice').toJSON();
}

function initCommands() {
	commands = [
		scheduleMessageCommand(),
		rollCommand(),
		playAudioCommand()
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


async function playAudio(interaction) {

		if (!interaction.member.voice.channel) return interaction.reply("You need to be in a Voice Channel to play a song.");
		const player = new Player(client, {
			ytdlOptions: {
				filter: "audioonly"
			}});
		if (!player || !player.createQueue) {
			return;
		}

	player.on('error', (queue, error) => {
		console.log(error);
		console.log(queue);
		console.log(`Error emitted from the queue ${error.message}`);
	});

	player.on('connectionError', (queue, error) => {
		console.log(error);
		console.log(`Error emitted from the connection ${error.message}`);
	});

		// Create a play queue for the server
	const queue = await player.createQueue(interaction.guild, {autoSelfDeaf: false});

		// Wait until you are connected to the channel
		if (!queue.connection) await queue.connect(interaction.member.voice.channel);

		let embed = new EmbedBuilder();

		if (interaction.options.getSubcommand() === "song") {
			let url = interaction.options.getString("url");

			// Search for the song using the discord-player
			const result = await player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.AUTO
			});

			// finish if no tracks were found
			if (result.tracks.length === 0)
				return interaction.reply("No results");

			// Add the track to the queue
			const song = result.tracks[0];
			await queue.addTrack(song);
			embed
				.setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
				.setThumbnail(song.thumbnail)
				.setFooter({ text: `Duration: ${song.duration}`})

		}
		else if (interaction.options.getSubcommand() === "playlist") {

			// Search for the playlist using the discord-player
			let url = interaction.options.getString("url");
			const result = await player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_PLAYLIST
			});

			if (result.tracks.length === 0)
				return interaction.reply(`No playlists found with ${url}`);

			const playlist = result.playlist;
			await queue.addTracks(result.tracks);
			embed
				.setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
				.setThumbnail(playlist.thumbnail)

		}
		else if (interaction.options.getSubcommand() === "search") {

			let url = interaction.options.getString("searchterms")
			const result = await player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.AUTO
			});

			if (result.tracks.length === 0)
				return interaction.editReply("No results")

			const song = result.tracks[0];
			await queue.addTrack(song);
			embed
				.setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
				.setThumbnail(song.thumbnail)
				.setFooter({ text: `Duration: ${song.duration}`})
		}

		if (!queue.playing) await queue.play().then(event => {

		});


		await interaction.reply({
			embeds: [embed]
		})
}
