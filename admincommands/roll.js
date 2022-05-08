const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("You're Not an ADMIN so you can't do this.");

    const options = [
        {
            label: "Live Stream Meldingen",
            value: "655549793929789460",
            emoji: "📡"
        },
        {
            label: "Gamer Girl",
            value: "414786081959968770",
            emoji: "👱🏻‍♀️"
        },
        {
            label: "DJ",
            value: "401095162090225664",
            emoji: "🎧"
        }
    ];

    const row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageSelectMenu()
                .setCustomId("rolle-menu")
                .setMinValues(0) //Minimum keuzes
                .setMaxValues(2) //Maximum keuzes
                .setPlaceholder("Kies jou rolle.")
                .addOptions(options)
        );

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Kies jou rolle !!!!!!")
        .setDescription("Hier kan je jou game rolle mee kiezen. \n Door hier onder in het dropdown menu jou rolle te kiesen krijg je die rollen waar door je ook ik de daar voor bestemde chats kan kijken en praaten.")
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter("rolle command")

    return message.channel.send({ embeds: [botEmbed], components: [row] }).then(msg => {
        message.delete()
    });

}

module.exports.help = {
    name: "rolle",
    category: "admin",
    discription: "Dist is an example code for rolle menu."
}