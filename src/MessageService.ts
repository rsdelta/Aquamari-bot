import { selfEvent } from './strings/jokes';
import {SpellCheckService} from "./SpellCheckService";

export class MessageService {
    private static instance: MessageService;
    private client;

    static getInstance() {
        if (!MessageService.instance) {
            MessageService.instance = new MessageService();
        }
        return MessageService.instance;
    }

    public sendMessage(channel, message) {
        channel.send({ content: message})
    }

    public sendGrammarMessage(message) {
        this.client.channels.fetch('638469455390965760') //Bot channel
            .then(channel => {
                this.sendMessage(channel, message)
            });
    }

    public sendEmbeddedMessage(channel, message) {
        //TODO:
        const embedMessage = {
            title: "",
            author: {
                name: ""
            },
            description: "",
            fields: [
                {
                    name: "",
                    value: ''
                },
                {
                    name: "",
                    value: ''
                }]
        };
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
        if (message.content.toLowerCase().includes("жаб")) {
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
        if (message.content.includes("<@1088130726597234791>")) {//Bot highlighted
            let firstMessage = "";
            if(message.author.id === "266214524225323008") { //Killer
                firstMessage = "Держи морковку.\n\n";
            }
            else if(message.author.id === "237832481389150208") { //Killer
                firstMessage = "Плути хъеп!\n\n";
            }
            else if(message.author.id === "302915882261151747") { //Левайд
                firstMessage = "Ле Душнайд?\n\n";
            }
            else if(message.author.id === "525229138110578709") { //Жаба
                firstMessage = "АААААААааааааааааааАААААААААаааААА!\n\n";
            }
            else if(message.author.id === "205731886184660992") {//Owner
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
}

