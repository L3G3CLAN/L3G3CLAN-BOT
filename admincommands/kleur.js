const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("You're Not an ADMIN so you can't do this.");

    const options = [
        {
            label: "Rood",
            value: "774409433597345833",
            emoji: "🟥"
        },
        {
            label: "Groen",
            value: "774409426718556181",
            emoji: "🟩"
        },
        {
            label: "Blouw",
            value: "774410190845247508",
            emoji: "🟦"
        },
        {
            label: "Oranje",
            value: "823913602553348128",
            emoji: "🟧"
        },
        {
            label: "Rolze",
            value: "838811881363210280",
            emoji: "🟪"
        }
    ];

    const row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageSelectMenu()
                .setCustomId("kleur-menu")
                .setMinValues(0) //Minimum keuzes
                .setMaxValues(1) //Maximum keuzes
                .setPlaceholder("Kies jou kleur.")
                .addOptions(options)
        );

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Kies jou kleur !!!!!!")
        .setDescription("Hier kan je jou kleur mee kiezen. \n Door hier onder in het dropdown menu een kleur te kiesen kijg jij de kleur in de discord")
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter("Kleur command")

    return message.channel.send({ embeds: [botEmbed], components: [row] }).then(msg => {
        message.delete()
    });

}

module.exports.help = {
    name: "kleur",
    category: "admin",
    discription: "Dist is an example code for kleur menu."
}