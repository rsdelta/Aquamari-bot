export interface EmbedObject {
    title: string,
    description: string,
    fields: any,
    timestamp?: boolean,
    color?: number,
    url?: string,
    author?: any,
    image?: string,
    footer?: any;
}

export interface EmbedField {
    name: string,
    value: string,
    inline?: boolean
}

export const fixed_embed_messages = {
    wednesday: {
        title: "Среда",
        description: "Это среда, мои чуваки",
        fields: [{name: "\u200b", value: "\u200b"},{name: "АаааАаааААААааАААааАА!", value: "\u200b"}],
        timestamp: true,
        image: "https://cdn.discordapp.com/attachments/1088211033010753576/1092843632232509582/cover1.png"
    }
};


export enum GroupID {
    AQUAMARI = "678545537317732373",
    REVELATION_MOBILE = "1088445869021478992"
}

export enum UserID {
    HOLY_GUACAMOLE = "205731886184660992",
    WONDERWALL = "525229138110578709",
    LEVIDE = "302915882261151747",
    PLYTI = "237832481389150208",
    KILLERWITHASPOON = "266214524225323008",
    AQUAMARI_BOT = "1088130726597234791"
}

export interface GuildEvent {
    text: string,
    day: number,
    time: string,
    highlight_id?: string
    embed?: EmbedObject
}

export const guild_events : GuildEvent[] = [
    {
        text: "Через пять минут начнется событие 'БДСМ-сессия с Беарой'!",
        day: 1,
        time: "19:55:00",
    },
    {
        text: "Через пять минут начнется событие 'Остров Расколотых Задниц'!",
        day: 2,
        time: "19:55:00",
    },
    {
        text: "Через пять минут появятся Големы! (Межсерверное событие)",
        day: 2,
        time: "21:55:00",
    },
    {
        text: "Это среда, мои чуваки.",
        day: 3,
        time: "09:30:00",
        embed: fixed_embed_messages.wednesday
    },
    {
        text: "Через пять минут начнется событие 'Темный афкающий легион'!",
        day: 3,
        time: "19:55:00",
    },
    {
        text: "Через пять минут появится кекзекутор!",
        day: 3,
        time: "21:55:00",
    },
    {
        text: "Не забудьте напомнить Плути про повозку! А еще там Снежный Пик через 5 минут.",
        day: 4,
        time: "19:55:00",
        highlight_id: GroupID.AQUAMARI
    },
    {
        text: "Через пять минут появятся Големы! (Межсерверное событие)",
        day: 4,
        time: "21:55:00",
    },
    {
        text: "Собираемся на турнир! Первый бой начнётся через 10 минут.",
        day: 5,
        time: "19:50:00",
        highlight_id: GroupID.AQUAMARI
    },
    {
        text: "Через пять минут появится кекзекутор! (Сегодня не для слабонервных)",
        day: 5,
        time: "21:55:00",
    },
    {
        text: "Собираемся на осадные бои!",
        day: 6,
        time: "19:31:00",
        highlight_id: GroupID.AQUAMARI
    },
    {
        text: "Осада началась!",
        day: 6,
        time: "20:32:00",
        highlight_id: GroupID.AQUAMARI
    },
    {
        text: "В это время обычно начинают собираться на межсерверные фановые бои в Дорвике.",
        day: 0,
        time: "19:50:00",
    }
];

export const guild_events_mobile : GuildEvent[] = [
    {
        text: "Пять минут до события 'Isle of Greed' ака избиение деда.",
        day: 1,
        time: "15:25:00",
        highlight_id: GroupID.REVELATION_MOBILE
    },
    {
        text: "Pool Party! Заходим! ┌[☉‿☉]┘",
        day: 1,
        time: "15:45:00",
    },
    {
        text: "Через 5 минут начнётся регистрация на 'Sky Battle'. Три боя 5х5. Лутаем монетки за победы.",
        day: 1,
        time: "15:55:00",
        highlight_id: GroupID.REVELATION_MOBILE
    },
    {
        text: "Через 5 минут начнётся регистрация на 'Top Protege'. Стань самым лучшим представителем своего класса!",
        day: 1,
        time: "16:55:00",
    },
    {
        text: "Пять минут до события 'Isle of Greed' ака избиение деда.",
        day: 2,
        time: "15:25:00",
        highlight_id: GroupID.REVELATION_MOBILE
    },
    {
        text: "Pool Party! Заходим! ┌[☉‿☉]┘",
        day: 2,
        time: "15:45:00",
    },
    {
        text: "Через 5 минут начнётся Soul Abyss. Слушаем РЛа и лутаем гильдийный аукцион.",
        day: 2,
        time: "15:55:00",
        highlight_id: GroupID.REVELATION_MOBILE
    },
    {
        text: "Через 5 минут начнётся Sulan Mist. Лутаем сундуки в ночном сулане, побеждаем игроков с эмблемой над головой.",
        day: 2,
        time: "16:55:00",
    },
    {
        text: "Пять минут до события 'Isle of Greed' ака избиение деда.",
        day: 3,
        time: "15:25:00",
        highlight_id: GroupID.REVELATION_MOBILE
    },
    {
        text: "Pool Party! Заходим! ┌[☉‿☉]┘",
        day: 3,
        time: "15:45:00",
    },
    {
        text: "Через 5 минут начнётся регистрация на 'Sky Battle'. Три боя 5х5. Лутаем монетки за победы.",
        day: 3,
        time: "15:55:00",
        highlight_id: GroupID.REVELATION_MOBILE
    },
    {
        text: "Пять минут до события 'Isle of Greed' ака избиение деда.",
        day: 4,
        time: "15:25:00",
        highlight_id: GroupID.REVELATION_MOBILE
    },
    {
        text: "Pool Party! Заходим! ┌[☉‿☉]┘",
        day: 4,
        time: "15:45:00",
    },
    {
        text: "Через 5 минут будет мобильный турнир!",
        day: 4,
        time: "16:25:00",
        highlight_id: GroupID.REVELATION_MOBILE
    },
    {
        text: "Пять минут до события 'Isle of Greed' ака избиение деда.",
        day: 5,
        time: "15:25:00",
        highlight_id: GroupID.REVELATION_MOBILE
    },
    {
        text: "Pool Party! Заходим! ┌[☉‿☉]┘",
        day: 5,
        time: "15:45:00",
    },
    {
        text: "Через 5 минут начнётся регистрация на 'Выживалки'. ",
        day: 5,
        time: "16:55:00",
        highlight_id: GroupID.REVELATION_MOBILE
    },
    {
        text: "Через 5 минут будем выбирать лучшую девочку Аквамари!",
        day: 5,
        time: "18:55:00",
        highlight_id: GroupID.REVELATION_MOBILE
    },
    {
        text: "Пять минут до события 'Isle of Greed' ака избиение деда.",
        day: 6,
        time: "15:25:00",
        highlight_id: GroupID.REVELATION_MOBILE
    },
    {
        text: "Pool Party! Заходим! ┌[☉‿☉]┘",
        day: 6,
        time: "15:45:00",
    },
    {
        text: "Через 5 минут начнётся мобильная осада!",
        day: 6,
        time: "15:55:00",
    },
    {
        text: "Пять минут до события 'Isle of Greed' ака избиение деда.",
        day: 0,
        time: "15:25:00",
        highlight_id: GroupID.REVELATION_MOBILE
    },
    {
        text: "Pool Party! Заходим! ┌[☉‿☉]┘",
        day: 0,
        time: "15:45:00",
    },
];