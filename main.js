const { Client } = require("discord.js-selfbot-v13")
const { joinVoiceChannel } = require("@discordjs/voice")
const { TOKEN, GUILDID, CHANNELEID, selfDeaf, selfMute } = require("./config.json")

const client = new Client()

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}`);


    setInterval(async () => {
        try {
            await joinVoiceChannel({
                channelId: CHANNELEID,
                guildId: GUILDID,
                adapterCreator: client.guilds.cache.get(GUILDID).voiceAdapterCreator,
                selfDeaf: selfDeaf,
                selfMute: selfMute,
            });
        } catch (error) {
            console.error("Failed to join the voice channel:", error);
        }
    }, 5000);
    
});



client.login(TOKEN)