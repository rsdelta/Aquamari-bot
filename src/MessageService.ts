import { selfEvent} from './strings/jokes';

export class MessageService {
    private static instance: MessageService;

    static getInstance() {
        if (!MessageService.instance) {
            MessageService.instance = new MessageService();
        }
        return MessageService.instance;
    }

    public sendMessage(channel, message) {
        channel.send({ content: message})
    }

    public aggressiveReplies(message) {
        if (message.content.toLowerCase().includes("сиськи?")) {
            message.reply('Сиськи Лир, но лучше проверить карту осады.');
        }
        else if (message.content.toLowerCase().includes("кто вор")) {
            message.reply('Древняя китайская мудрость: \n1) Ба обвиняет Бу: Бу\n2) Бу обвиняет Бу: Ба\n3) Бо обвиняет Бу: Бо');
        }
        else if (message.content.includes("<@1088130726597234791>")) {//Bot highlighted
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
                message.reply('Я не смею перечить своему господину.');
                return;
            }
            message.reply(firstMessage + selfEvent[Math.floor(Math.random() * selfEvent.length)])
        }
    }
}

