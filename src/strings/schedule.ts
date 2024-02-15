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
    monday: {
        title: "Не среда",
        description: ":(",
        fields: [{name: "\u200b", value: "\u200b"},{name: "До среды еще 2 дня.", value: "\u200b"}],
        timestamp: true,
        image: "https://cdn.discordapp.com/attachments/1088211033010753576/1207683833366052894/image.png?ex=65e08a37&is=65ce1537&hm=c0cb2a041209612b15b002d5c8d35c346d49ce5b7f55c0e923486d1aff47f20c"
    },
    tuesday: {
        title: "Предсреда",
        description: "Совсем скоро...",
        fields: [{name: "\u200b", value: "\u200b"},{name: "Во всех кинотеатрах страны...", value: "\u200b"}],
        timestamp: true,
        image: "https://cdn.discordapp.com/attachments/1088211033010753576/1207682701079879690/image.png?ex=65e08929&is=65ce1429&hm=f87ef63772e691caa5442fef8a951d19b7727675d77f257e2e1676393b204b01"
    },
    wednesday: {
        title: "Среда",
        description: "Это среда, мои чуваки!",
        fields: [{name: "\u200b", value: "\u200b"},{name: "АаааАаааААААааАААааАА!", value: "\u200b"}],
        timestamp: true,
        image: "https://cdn.discordapp.com/attachments/1088211033010753576/1092843632232509582/cover1.png"
    },
    thursday: {
        title: "Не среда",
        description: "Вот прям совсем не среда...",
        fields: [{name: "\u200b", value: "\u200b"},{name: "Среда через 6 дней.", value: "\u200b"}],
        timestamp: true,
        image: "https://cdn.discordapp.com/attachments/1088211033010753576/1207684166125359134/not-wednesday.png?ex=65e08a86&is=65ce1586&hm=ecd611cd6ee353a8bc395d19f889c9666f18bff7793f1d56ebf705a0a70b8d8d&"
    },
    friday: {
        title: "Это могло бы быть средой",
        description: "Но нет, это пятница.",
        fields: [{name: "\u200b", value: "\u200b"},{name: "Среда через 5 дней.", value: "\u200b"}],
        timestamp: true,
        image: "https://cdn.discordapp.com/attachments/1088211033010753576/1207685352639299584/2b3.png?ex=65e08ba1&is=65ce16a1&hm=dde5369d51c4d872a0a6b20a503eac7ad3eb4109c59517ca7e957865f0a2c4e0"
    },
    saturday: {
        title: "Среда?",
        description: "Не Среда...",
        fields: [{name: "\u200b", value: "\u200b"},{name: "Среда через 4 дня.", value: "\u200b"}],
        timestamp: true,
        image: "https://cdn.discordapp.com/attachments/1088211033010753576/1207685590561071125/oi0g3l0pk8w61.png?ex=65e08bda&is=65ce16da&hm=3aae1516dff6bbcd63214b11cfe24c3f4052a8f93ffc01aa8db800e4deb7e60f"
    },
    sunday: {
        title: "Не Среда...",
        description: "Не Среда...",
        fields: [{name: "\u200b", value: "\u200b"},{name: "Среда через 3 дня.", value: "\u200b"}],
        timestamp: true,
        image: "https://cdn.discordapp.com/attachments/1088211033010753576/1207685908665602068/l3vgv5rk0s071.png?ex=65e08c26&is=65ce1726&hm=182c7cb2001ced1b6b1ede4f4cffe881e63aeb281265f02b82ff8de1393e847d"
    },
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
    embed?: EmbedObject,
    isUser?: boolean
}

export const guild_events : GuildEvent[] = [
    {
        text: "...",
        day: 1,
        time: "09:30:00",
        embed: fixed_embed_messages.monday
    },
    {
        text: "...",
        day: 2,
        time: "09:30:00",
        embed: fixed_embed_messages.tuesday
    },
    {
        text: "Это среда, мои чуваки.",
        day: 3,
        time: "09:30:00",
        embed: fixed_embed_messages.wednesday
    },
    {
        text: "...",
        day: 4,
        time: "09:30:00",
        embed: fixed_embed_messages.thursday
    },
    {
        text: "...",
        day: 5,
        time: "09:30:00",
        embed: fixed_embed_messages.friday
    },
    {
        text: "...",
        day: 6,
        time: "09:30:00",
        embed: fixed_embed_messages.saturday
    },
    {
        text: "...",
        day: 0,
        time: "09:30:00",
        embed: fixed_embed_messages.sunday
    },
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
        text: "Через пять минут появится кекзекутор!",
        day: 3,
        time: "21:55:00",
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
        text: "Через 10 минут начнется событие 'Волшебный цветочек'.",
        day: 6,
        time: "18:50:00"
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
];

export const guild_events_mobile : GuildEvent[] = [];