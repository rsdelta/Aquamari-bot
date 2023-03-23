import {MessageService} from "./MessageService";
import fetch from "node-fetch";

export class SpellCheckService {
    private static instance: SpellCheckService;

    static getInstance() {
        if (!SpellCheckService.instance) {
            SpellCheckService.instance = new SpellCheckService();
        }
        return SpellCheckService.instance;
    }

    public checkAndReplace(message) {
        let author = "<@" + message?.author?.id + ">";
        let url = "http://speller.yandex.net/services/spellservice.json/checkText?options=7&text=" + message.content;
        if (message.content.length > 750) {
            return;
        }
        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonResponse: any) {
                let send = false;
                let errors = 0;
                let botMessage = author + "\n";

                console.log(jsonResponse.length);
                jsonResponse.forEach((spellData) => {
                    if (spellData.word && spellData.s[0] && errors <= 5) {
                        errors++;
                        if (errors <= 5) {
                            botMessage = botMessage + "Вместо '" + spellData.word + "' следует писать '" + spellData.s[0] + "'.\n";
                        }
                        send = true;
                    }
                });

                if (errors >= 5) {
                    botMessage = botMessage + "У вас больше " + errors + " орфографических ошибок и мне лень на них указывать. Боюсь, вам уже ничего не поможет..."
                }
                if (send) {
                    MessageService.getInstance().sendGrammarMessage(botMessage);
                }
            });
    }
}