import { selfEvent } from './strings/jokes';
import {SpellCheckService} from "./SpellCheckService";
import {EmbedField, EmbedObject, GuildEvent, UserID} from "./strings/schedule";
import { EmbedBuilder, AttachmentBuilder } from 'discord.js';

export class MessageService {
    private static instance: MessageService;
    private client;

    static getInstance() {
        if (!MessageService.instance) {
            MessageService.instance = new MessageService();
        }
        return MessageService.instance;
    }

    public sendMessage(channel, message, event ?: GuildEvent) {
        if (event?.embed) {
            channel.send({ embeds: [this.createEmbed(event.embed)], content: message || "\u200b"})
        }
        else {
            channel.send({ content: message})
        }
    }

    public sendGrammarMessage(message) {
        this.client.channels.fetch('638469455390965760') //Bot channel
            .then(channel => {
                this.sendMessage(channel, message)
            });
    }

    public createEmbed(obj: EmbedObject) {
        const embed = new EmbedBuilder();
        embed.setTitle(obj.title);
        embed.setDescription(obj.description);
        obj.fields.forEach((field: EmbedField) => {
            console.log(field);
            embed.addFields(field)
        });

        if (obj.timestamp) {
            embed.setTimestamp();
        }
        if (obj.color) {
            embed.setColor(obj.color);
        }
        if (obj.url) {
            embed.setURL(obj.url);
        }
        if (obj.image) {
            embed.setImage(obj.image);
        }
        if (obj.author) {
            embed.setAuthor(obj.author)
        }
        if (obj.footer) {
            embed.setFooter(obj.footer);
        }

        return embed;

    }

    public sendEmbeddedMessage(channel, embedMessage) {
        channel.send({ embeds: [embedMessage]})
    }

    public addClient(client) {
        this.client = client;
    }

    getEmoji(emojiName) {
        return this.client?.emojis?.cache?.find(emoji => emoji.name === emojiName) || null
    }

    spellCheck(message) {
        SpellCheckService.getInstance().checkAndReplace(message);
    }

    public passiveReplies(message) {
        const zhabs = ["what", "awkwarddrink", "cwak", "charmed", "sus", "FrogguThink"];
        let finalString = "";
        if (message.content.toLowerCase().includes("кто вор")) {
            finalString = finalString + 'Древняя китайская мудрость: \n1) Ба обвиняет Бу: Бу\n2) Бу обвиняет Бу: Ба\n3) Бо обвиняет Бу: Бо\n';
        }
        if (message.content.toLowerCase().includes("кролик")) {
            const emoji = this.getEmoji("rabbitdance");
            if (emoji) {
                finalString = finalString + emoji.toString() + "\n";
            }
        }
        if (message.content.toLowerCase().includes("по жопе")) {
            const emoji = this.getEmoji("rabbitbuttslap");
            if (emoji) {
                finalString = finalString + emoji.toString() + "\n";
            }
        }
        if (message.content.toLowerCase().includes("накажи")) {
            const emoji = this.getEmoji("rabbitredslap");
            if (emoji) {
                finalString = finalString + emoji.toString() + "\n";
            }
        }
        if (message.content.toLowerCase().includes("жаб") || message.content.toLowerCase().includes("лягуш") || message.content.toLowerCase().includes("ква")) {
            const emoji = this.getEmoji(zhabs[Math.floor(Math.random() * zhabs.length)]);
            if (emoji) {
                finalString = finalString + emoji.toString() + "\n";
            }
        }
        if (message.content.toLowerCase().includes("сиськи")) {
            finalString = finalString + "Сиськи Лир, но лучше проверить карту осады.\n"
        }
        if (finalString.length > 0) {
            message.reply(finalString);
            return true;
        }
        else {
            return false;
        }

    }


    public aggressiveReplies(message) {
        let finalString = "";
        if (message.content.includes(UserID.AQUAMARI_BOT)) {//Bot highlighted
            let firstMessage = "";
            if(message.author.id === UserID.KILLERWITHASPOON) { //Killer
                firstMessage = "Держи морковку.\n\n";
            }
            else if(message.author.id === UserID.PLYTI) { //Plyti
                firstMessage = "Плути хъеп!\n\n";
            }
            else if(message.author.id === UserID.LEVIDE) { //Левайд
                firstMessage = "Ле Душнайд?\n\n";
            }
            else if(message.author.id === UserID.WONDERWALL) { //Жаба
                firstMessage = "АААААААааааааааааааАААААААААаааААА!\n\n";
            }
            else if(message.author.id === UserID.HOLY_GUACAMOLE) {//Owner
                firstMessage = 'Я устал, босс.\n';
            }
            message.reply(finalString + firstMessage + selfEvent[Math.floor(Math.random() * selfEvent.length)])
        }
    }

    public calcTime(offset) {
        let d = new Date();
        let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        let nd = new Date(utc + (3600000*offset));
        return nd.toLocaleTimeString([], {hour12: false});
    }

    public sendDiceMessage(channel, message, number) {
        channel.send({ files: [this.attachImage("./src/dice/" + number + ".png")], content: message || "\u200b"})
    }

    public attachImage(url) {
        return new AttachmentBuilder(url)
    }
}

