const { Client } = require("discord.js-selfbot-v13");
const { joinVoiceChannel } = require("@discordjs/voice");
const { TOKENS, GUILDID, CHANNELEID, selfDeaf, selfMute } = require("./config.json");


for (let index = 0; index < TOKENS.length; index++) {
    setTimeout(() => {
        const client = new Client();

        client.on("ready", async () => {
            console.log(`Logged in as ${client.user.tag}`);

            try {
                const connection = joinVoiceChannel({
                    channelId: CHANNELEID,
                    guildId: GUILDID,
                    adapterCreator: client.guilds.cache.get(GUILDID)?.voiceAdapterCreator,
                    selfDeaf: selfDeaf,
                    selfMute: selfMute,
                    group:`${index}`
                });
                console.log(`Joined voice channel with ${client.user.tag}`);

                connection.on("stateChange", (oldState, newState) => {
                    if (oldState.status === "connected" && newState.status !== "connected") {
                        console.log(`Rejoining voice channel for ${client.user.tag}`);
                        joinVoiceChannel({
                            channelId: CHANNELEID,
                            guildId: GUILDID,
                            adapterCreator: client.guilds.cache.get(GUILDID).voiceAdapterCreator,
                            selfDeaf: selfDeaf,
                            selfMute: selfMute,
                        });
                    }
                });
            } catch (error) {
                console.error(`Failed to join voice channel for ${client.user.tag}:`, error);
            }
        });

        client.login(TOKENS[index]).catch((error) => {
            console.error(`Failed to log in with token ${TOKENS[index]}:`, error);
        });
    }, index * 1000)
}
