import {Player, QueryType} from "discord-player";
import {EmbedBuilder} from "discord.js";

export class AudioPlayerService {
    private static instance: AudioPlayerService;
    private player;

    static getInstance() {
        if (!AudioPlayerService.instance) {
            AudioPlayerService.instance = new AudioPlayerService();
        }
        return AudioPlayerService.instance;
    }

    public initPlayer(client){
        this.player = new Player(client, {
            ytdlOptions: {
                filter: "audioonly"
            }});
    }

    async stopAudio(client, interaction) {
        if (!interaction.member.voice.channel) return interaction.reply("Тебе нужно быть в войсе!");
        const queue = this.player.getQueue(interaction.guildId)
        if (!queue) {
            await interaction.reply("А я ничего не играю.");
            return;
        }
        queue.clear();
        queue.destroy();
        await interaction.reply("Отключаюсь.");
    }

    async playAudio(client, interaction) {
        if (!interaction.member.voice.channel) return interaction.reply("Тебе нужно быть в войсе!");

        if (!this.player || !this.player.createQueue) {
            return;
        }

        this.player.on('error', (queue, error) => {
            console.log(`Error emitted from the queue ${error.message}`);
        });

        this.player.on('connectionError', (queue, error) => {
            console.log(error);
            console.log(`Error emitted from the connection ${error.message}`);
        });

        // Create a play queue for the server
        const queue = await this.player.createQueue(interaction.guild, {autoSelfDeaf: false});

        // Wait until you are connected to the channel
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);

        let embed = new EmbedBuilder();

        if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url");

            // Search for the song using the discord-player
            const result = await this.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            });

            // finish if no tracks were found
            if (result.tracks.length === 0)
                return interaction.reply("Я не смог найти трек по этой ссылке.");

            // Add the track to the queue
            const song = result.tracks[0];
            await queue.addTrack(song);
            embed
                .setDescription(`Трек **[${song.title}](${song.url})** добавлен в очередь.`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Длительность: ${song.duration}`})

        }
        else if (interaction.options.getSubcommand() === "playlist") {

            // Search for the playlist using the discord-player
            let url = interaction.options.getString("url");
            const result = await this.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            });

            if (result.tracks.length === 0)
                return interaction.reply(`Я не смог найти плейлист по данной ссылке: ${url}`);

            const playlist = result.playlist;
            await queue.addTracks(result.tracks);
            embed.setDescription(`**${result.tracks.length} песен из [${playlist.title}](${playlist.url})** были добавлены в очередь.`)
        }

        if (!queue.playing) await queue.play().then(event => {
            console.log("Playing music")
        }).catch(err => {
            console.log(err);
            interaction.reply("Мне стало плохо. Держи бесполезный лог:\n " + err);
        });


        await interaction.reply({
            embeds: [embed]
        })
    }
}