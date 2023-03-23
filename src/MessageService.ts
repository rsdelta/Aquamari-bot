import { selfEvent } from './strings/jokes';

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

    public addClient(client) {
        this.client = client;
    }

    getEmoji(emojiName) {
        return this.client?.emojis?.cache?.find(emoji => emoji.name === emojiName) || null
    }

    public aggressiveReplies(message) {
        let finalString = "";
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
        if (message.content.toLowerCase().includes("сиськи?")) {
            finalString = finalString + "Сиськи Лир, но лучше проверить карту осады.\n"
        }
        if (message.content.toLowerCase().includes("кто вор")) {
            finalString = finalString + 'Древняя китайская мудрость: \n1) Ба обвиняет Бу: Бу\n2) Бу обвиняет Бу: Ба\n3) Бо обвиняет Бу: Бо\n';
        }
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
}

