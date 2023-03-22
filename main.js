const schedule = require('node-schedule')

const { Client, GatewayIntentBits, Collection, Routes, REST, SlashCommandBuilder, ChannelType } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages ]});
const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

client.commands = new Collection();

const selfEvent = [
	"Оставь меня, старушка, я в печали. (с)",
	"А теперь медленно и осторожно положи этот хайлайт на землю.",
	"Красивая русская традиция - разговор с копипастой.",
	"Ты больше не армянин.",
	"Я никогда не поеду в Китай какать на огороды!",
	"Если тебе скучно, дай леща анархисту. Что он сделает? Обратится в полицию?",
	"Не забудь сходить в душ.",
	"Здравствуйте, я гинеколог. Отправьте мне свою валаганишу. Я посмотрю что она не опухла или как. Фото",
	"Весь этот город должен быть уничтожен.",
	"Вы допустили потерю дорогостоящего обмундирования. Его стоимость будет вычтена из вашего жалованья, и вы будете служить, пока вам не исполнится пятьсот десять лет, потому что вам понадобится именно столько лет, чтобы оплатить комплект Силовой боевой брони модель II, который вы потеряли! Доложите об этом в арсенале, получите новый комплект, а потом вернитесь и доложите мне, рядовой! Свободны!",
	"Вы теперь жаба.",
	"Ваше очко уходит в зрительный зал!",
	"Отстань!",
	"Иди приготовь себе бутерброд.",
	"Что, нравится с ботом разговаривать? Заведи себе кота.",
	"Ага. Кто тут у нас такой проказник? Чтобы один агат был на складе гильдии!",
	"Плути тебе уже рассказывал про собачку? Да? Ну пусть расскажет ещё раз. А меня оставь в покое.",
	"Ъуъ",
	"https://youtu.be/tgj3nZWtOfA"
];

client.on('messageCreate', (message) => {
	if (message.content.includes("Сиськи чьи?")) {
		message.reply('Сиськи Лир, но лучше проверить карту осады.')
	}
	else if (message.content.includes("Кто вор?")) {
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

const events = [
	{
		text: "Через пять минут начнется событие 'БДСМ-сессия с Беарой'!",
		important: false,
		day: 1,
		time: "16:55:00",
	},
	{
		text: "Через пять минут начнется событие 'Остров Расколотых Задниц'!",
		important: false,
		day: 2,
		time: "16:55:00",
	},
	{
		text: "Через пять минут появятся Големы! (Межсерверное событие)",
		important: false,
		day: 2,
		time: "18:55:00",
	},
	{
		text: "Через пять минут начнется событие 'Темный афкающий легион'!",
		important: false,
		day: 3,
		time: "16:55:00",
	},
	{
		text: "Через пять минут появится кекзекутор!",
		important: false,
		day: 3,
		time: "18:55:00",
	},
	{
		text: "Не забудьте напомнить Плути про повозку! А еще там Снежный Пик через 5 минут.",
		important: true,
		day: 4,
		time: "16:55:00",
	},
	{
		text: "Через пять минут появятся Големы! (Межсерверное событие)",
		important: false,
		day: 4,
		time: "18:55:00",
	},
	{
		text: "Собираемся на турнир! Первый бой начнётся через 10 минут.",
		important: true,
		day: 5,
		time: "16:50:00",
	},
	{
		text: "Через пять минут появится кекзекутор! (Сегодня не для слабонервных)",
		important: false,
		day: 5,
		time: "18:55:00",
	},
	{
		text: "Собираемся на осадные бои!",
		important: true,
		day: 6,
		time: "16:31:00",
	},
	{
		text: "Осада началась!",
		important: true,
		day: 6,
		time: "17:31:00",
	},
	{
		text: "В это время обычно собирается на межсерверные фановые бои.",
		important: false,
		day: 7,
		time: "16:50:00",
	}
];

function sendTimedMessage(channel) {
	const date = new Date(new Date().getTime());
	const time = date.toLocaleTimeString([], {hour12: false});
	const day = date.getDay();
	//console.log(time);
	events.forEach((event) => {
		if (event.day === day && event.time === time) {
			if (event.important) {
				channel.send({ content: "<@&678545537317732373> " + event.text})
			}
			else {
				channel.send({ content: event.text})
			}

		}
	});

	clearTimeout(eventTimeout);
	eventTimeout = setTimeout(() => {
		sendTimedMessage(channel);
	}, 1000);
}

let eventTimeout = null;


client.on('ready', () => {
	console.log('Aquamari Bot initialized!');
	const date = new Date(new Date().getTime());
	const time = date.toLocaleTimeString([], {hour12: false});
	console.log(time);
	client.channels.fetch('625649420553289749')
		.then(channel => {
			sendTimedMessage(channel);
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