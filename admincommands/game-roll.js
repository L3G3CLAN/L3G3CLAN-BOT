const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("You're Not an ADMIN so you can't do this.");

    const options = [
        {
            label: "Call Of Duty",
            value: "766054238991286292",
            emoji: "🎮"
        },
        {
            label: "GTA V Roleplay",
            value: "682940180994588737",
            emoji: "🎮"
        },
        {
            label: "Minecraft",
            value: "767380986190102539",
            emoji: "🎮"
        },
        {
            label: "Phasmophobia",
            value: "769589830166118430",
            emoji: "🎮"
        },        {
            label: "Hytale",
            value: "768845353431859230",
            emoji: "🎮"
        },
        {
            label: "Rockt League",
            value: "768846094524219432",
            emoji: "🎮"
        },
        {
            label: "ARK",
            value: "768845937422368813",
            emoji: "🎮"
        },
        {
            label: "Destiny",
            value: "837724704567328778",
            emoji: "🎮"
        }
    ];

    const row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageSelectMenu()
                .setCustomId("game-roll-menu")
                .setMinValues(0) //Minimum keuzes
                .setMaxValues(8) //Maximum keuzes
                .setPlaceholder("Kies jou games.")
                .addOptions(options)
        );

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Kies jou games !!!!!!")
        .setDescription("Hier kan je jou game rolle mee kiezen. \n Door hier onder in het dropdown menu jou games te kiesen krijg je die rollen waar door je ook ik de daar voor bestemde chats kan kijken en praaten.")
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter("games command")

    return message.channel.send({ embeds: [botEmbed], components: [row] }).then(msg => {
        message.delete()
    });

}

module.exports.help = {
    name: "game-roll",
    category: "admin",
    discription: "Dist is an example code for game roll menu."
}