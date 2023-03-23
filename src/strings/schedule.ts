export interface GuildEvent {
    text: string,
    day: number,
    time: string,
    highlight_id?: string
}

export const guild_events : GuildEvent[] = [
    {
        text: "Через пять минут начнется событие 'БДСМ-сессия с Беарой'!",
        day: 1,
        time: "16:55:00",
    },
    {
        text: "Через пять минут начнется событие 'Остров Расколотых Задниц'!",
        day: 2,
        time: "16:55:00",
    },
    {
        text: "Через пять минут появятся Големы! (Межсерверное событие)",
        day: 2,
        time: "18:55:00",
    },
    {
        text: "Через пять минут начнется событие 'Темный афкающий легион'!",
        day: 3,
        time: "16:55:00",
    },
    {
        text: "Через пять минут появится кекзекутор!",
        day: 3,
        time: "18:55:00",
    },
    {
        text: "Не забудьте напомнить Плути про повозку! А еще там Снежный Пик через 5 минут.",
        day: 4,
        time: "16:55:00",
        highlight_id: "<@&678545537317732373>"
    },
    {
        text: "Через пять минут появятся Големы! (Межсерверное событие)",
        day: 4,
        time: "18:55:00",
    },
    {
        text: "Собираемся на турнир! Первый бой начнётся через 10 минут.",
        day: 5,
        time: "16:50:00",
        highlight_id: "<@&678545537317732373>"
    },
    {
        text: "Через пять минут появится кекзекутор! (Сегодня не для слабонервных)",
        day: 5,
        time: "18:55:00",
    },
    {
        text: "Собираемся на осадные бои!",
        day: 6,
        time: "16:31:00",
        highlight_id: "<@&678545537317732373>"
    },
    {
        text: "Осада началась!",
        day: 6,
        time: "17:31:00",
        highlight_id: "<@&678545537317732373>"
    },
    {
        text: "В это время обычно собирается на межсерверные фановые бои.",
        day: 7,
        time: "16:50:00",
    }
];

export const guild_events_mobile : GuildEvent[] = [
    {
        text: "Пять минут до события 'Isle of Greed' ака избиение деда.",
        day: 1,
        time: "12:25:00",
        highlight_id: "<@&1088445869021478992>"
    },
    {
        text: "Pool Party! Заходим!",
        day: 1,
        time: "12:45:00",
    },
    {
        text: "Через 5 минут начнётся регистрация на 'Sky Battle'. Три боя 5х5. Лутаем монетки за победы.",
        day: 1,
        time: "12:55:00",
        highlight_id: "<@&1088445869021478992>"
    },
    {
        text: "Через 5 минут начнётся регистрация на 'Top Protege'. Стань самым лучшим представителем своего класса!",
        day: 1,
        time: "13:55:00",
    },
    {
        text: "Пять минут до события 'Isle of Greed' ака избиение деда.",
        day: 2,
        time: "12:25:00",
        highlight_id: "<@&1088445869021478992>"
    },
    {
        text: "Pool Party! Заходим!",
        day: 2,
        time: "12:45:00",
    },
    {
        text: "Через 5 минут начнётся Soul Abyss. Слушаем РЛа и лутаем гильдийный аукцион.",
        day: 2,
        time: "12:55:00",
        highlight_id: "<@&1088445869021478992>"
    },
    {
        text: "Через 5 минут начнётся Sulan Mist. Лутаем сундуки в ночном сулане, побеждаем игроков с эмблемой над головой.",
        day: 2,
        time: "13:55:00",
    },
    {
        text: "Пять минут до события 'Isle of Greed' ака избиение деда.",
        day: 3,
        time: "12:25:00",
        highlight_id: "<@&1088445869021478992>"
    },
    {
        text: "Pool Party! Заходим!",
        day: 3,
        time: "12:45:00",
    },
    {
        text: "Через 5 минут начнётся регистрация на 'Sky Battle'. Три боя 5х5. Лутаем монетки за победы.",
        day: 3,
        time: "12:55:00",
        highlight_id: "<@&1088445869021478992>"
    },
    {
        text: "Пять минут до события 'Isle of Greed' ака избиение деда.",
        day: 4,
        time: "12:25:00",
        highlight_id: "<@&1088445869021478992>"
    },
    {
        text: "Pool Party! Заходим!",
        day: 4,
        time: "12:45:00",
    },
    {
        text: "Через 5 минут будет мобильный турнир!",
        day: 4,
        time: "13:25:00",
        highlight_id: "<@&1088445869021478992>"
    },
    {
        text: "Пять минут до события 'Isle of Greed' ака избиение деда.",
        day: 5,
        time: "12:25:00",
        highlight_id: "<@&1088445869021478992>"
    },
    {
        text: "Pool Party! Заходим!",
        day: 5,
        time: "12:45:00",
    },
    {
        text: "Через 5 минут начнётся регистрация на 'Выживалки'. ",
        day: 5,
        time: "13:55:00",
        highlight_id: "<@&1088445869021478992>"
    },
    {
        text: "Пять минут до события 'Isle of Greed' ака избиение деда.",
        day: 6,
        time: "12:25:00",
        highlight_id: "<@&1088445869021478992>"
    },
    {
        text: "Pool Party! Заходим!",
        day: 6,
        time: "12:45:00",
    },
    {
        text: "Пять минут до события 'Isle of Greed' ака избиение деда.",
        day: 7,
        time: "12:25:00",
        highlight_id: "<@&1088445869021478992>"
    },
    {
        text: "Pool Party! Заходим!",
        day: 7,
        time: "12:45:00",
    },
];