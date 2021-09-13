import { DefineCommand } from "../utils/decorators/DefineCommand";
import { BaseCommand } from "../structures/BaseCommand";
import { createEmbed } from "../utils/createEmbed";
import { Message, version } from "discord.js";
import { uptime as osUptime } from "os";

@DefineCommand({
    aliases: ["botinfo", "info", "information", "stats"],
    name: "about",
    description: "Show the bot's information",
    usage: "{prefix}about"
})
export class AboutCommand extends BaseCommand {
    public async execute(message: Message): Promise<void> {
        const opusEncoder = await this.client.util.getOpusEncoder();
        message.channel.send(
            createEmbed("info")
                .setDescription("Built using [**:link: Disc 11**](https://github.com/zhycorp/disc-11)!\n\nSource Code: [**:link:**](https://github.com/Marshmelly/marshmelly-music)!\n\n")
                .addField("Bot Version", `\`\`\`v${(await this.client.util.getPackageJSON()).version}\`\`\``, true)
                .addField("Bot Uptime", `\`\`\`${this.client.util.formatMS(this.client.uptime!)}\`\`\``, true)
                .addField("User Count", `\`\`\`${await this.client.util.getUsersCount()}\`\`\``, true)    
                .addField("Platform", `\`\`\`${process.platform} (${process.arch})\`\`\``, true)
                .addField("Node.js version", `\`\`\`${process.version}\`\`\``, true)
                .addField("Discord.js version", `\`\`\`\nv${version}\`\`\``, true)
                .addField("Channel Count", `\`\`\`${await this.client.util.getChannelsCount()}\`\`\``, true)
                .addField("Guild Count", `\`\`\`${await this.client.util.getGuildsCount()}\`\`\``, true)    
                .addField("Shard Count", `\`\`\`${this.client.shard ? `${this.client.shard.count}` : "N/A"}\`\`\``, true)    
                .addField("Shard ID", `\`\`\`${this.client.shard ? `${this.client.shard.ids[0]}` : "N/A"}\`\`\``, true)    
                .setAuthor(`${this.client.user?.username as string} - Bot Information`)
        ).catch(e => this.client.logger.error("ABOUT_CMD_ERR:", e));
    }
}
