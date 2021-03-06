console.log("slimgame");
console.log(`\x1b[31m -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- \x1b[0m`);
console.log(`\x1b[31m Dit is de officiële source code van de SlimGame. \x1b[0m`);
console.log(`\x1b[31m Het door geven van deze files of verkopen is van zijn strengste verboden! \x1b[0m`);
console.log(`\x1b[31m Deze bot is gemaakt bij Bryan aka SlimGame. \x1b[0m`);
console.log(`\x1b[31m https://github.com/SlimHostdev/discord_v13_main_bot \x1b[0m`);
console.log(`\x1b[31m -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- \x1b[0m`);
console.log('<---------------------------------------------------------------------------------------------------------------------->',);
console.log(['DISCORD.JS V13 Bot']);
console.log(['Aan het opsterten...']);
console.log('<---------------------------------------------------------------------------------------------------------------------->',);

const { Console } = require("console");
//------------------------------------Benodigt heeden------------------------------------------
const { Client, Intents, Collection, Interaction } = require("discord.js");

//.env config
require('dotenv-flow').config();

//MySQL
const mysql = require('mysql');

const DB = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPW,
  database: process.env.DBNAME
});

//DB.connect(function(err) {
//    if (err) throw err;
//    console.log(`[\x1b[31m Connected To DataBase! \x1b[0m]`);
    
    //Table Create
   // var sql = "CREATE TABLE SERVERINFO (JOIN_ROLL_ID VARCHAR(255), WELKOM_ID VARCHAR(255))";
    
   // DB.query(sql, function (err, result) {
   //   if (err) throw err;
   //   console.log(`[\x1b[31m Create Table! \x1b[0m]`);
   // });

   //Select Form Table
//    DB.query("SELECT JOIN_ROLL_ID FROM SERVERINFO", function (err, joinrollid, fields) {
//        if (err) throw err;
//        console.log(joinrollid);
//    });

//});

//File server
const fs = require("fs");

//Flags regchten van de bot
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

//Command handler
client.commands = new Collection();

//Ophaalen van commandos uit map commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

console.log(`[\x1b[31m COMMANDS \x1b[0m]`);

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log([`I have Load [${command.help.name}.js]`]);

}

//Ophaalen van commandos uit map admincommands
const admincommandFiles = fs.readdirSync('./admincommands').filter(file => file.endsWith(".js"));

console.log(`[\x1b[31m ADMIN COMMANDS \x1b[0m]`);

for (const file of admincommandFiles) {

    const command = require(`./admincommands/${file}`);

    client.commands.set(command.help.name, command);

    console.log([`I have Load [${command.help.name}.js]`]);

}

//Ophaalen van commandos uit map addons
const addonFiles = fs.readdirSync('./addons').filter(file => file.endsWith(".js"));

console.log(`[\x1b[31m ADDONS \x1b[0m]`);

for (const file of addonFiles) {

    const command = require(`./addons/${file}`);

    client.commands.set(command.help.name, command);

    console.log([`I have Load [${command.help.name}.js]`]);

}

//----------------------------------------ADMINS-----------------------------------------------
const admins = [process.env.ADMINROLL];

//Start op info
client.once("ready", () => {

    client.user.setActivity(`${process.env.STATUS}`, { type: "DND" });

    const statusOptions = [
        `${process.env.STATUS}`,
        "-help",
        "-info",
        "-serverinfo",
        "-review"
    ]

    let counter =0;

    let time = 1 * 60 * 1000; //1000 = 1 Minut

    const updateStatus = () => {

        client.user.setPresence({

            status: "dnd",
            activities: [
                {
                    name: statusOptions[counter]
                }
            ]
    
        });

        if(++counter >= statusOptions.length) counter = 0;

        setTimeout(updateStatus, time);

    }
    updateStatus();

    console.log('<---------------------------------------------------------------------------------------------------------------------->',);
    console.log(['All commands ar load']);
    console.log(`[\x1b[31m ${client.user.username} \x1b[0m]`);
    console.log(['is online']);
    console.log('<---------------------------------------------------------------------------------------------------------------------->',);
    console.log([`Bot Name: ${client.user.username}`]);
    console.log([`Bot BotID: ${process.env.BOTID}`]);
    console.log([`Bot Preffix: ${process.env.PREFFIX}`]);
    console.log([`Bot MySQL:`]);
    console.log(`[\x1b[31m Data Base Host: ${process.env.DBHOST} \x1b[0m]`);
    console.log(`[\x1b[31m Data Base User: ${process.env.DBUSER} \x1b[0m]`);
    console.log(`[\x1b[31m Data Base Name: ${process.env.DBNAME} \x1b[0m]`);
    console.log([`Bot Invite:`]);
    console.log(`[\x1b[31m ${process.env.INVITE} \x1b[0m]`);
    console.log('<---------------------------------------------------------------------------------------------------------------------->',);

});

client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get(process.env.JOINROLL);

    if (!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get(process.env.WELKOM);

    if (!channel) return;

    channel.send(`Welcom in the server, ${member}`);

})

//Command werking
client.on("messageCreate", async message => {

    if (message.author.bot) return;

    //Prefix oproepen uit .env
    var prefix = process.env.PREFFIX;

    //bericht splitsen
    var messageArray = message.content.split(" ");

    //commando werking
    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    const commandData = client.commands.get(command.slice(prefix.length));

    if (!commandData) return;

    var arguments = messageArray.slice(1);

    try {

        await commandData.run(client, message, arguments);

    } catch (error) {

        console.log(`\x1b[31m ERROR \x1b[0m`);
        console.log(error);
        await message.reply("Something went wrong **Look in the console for the ERROR!**");

    }

});

client.on("interactionCreate", interaction => {

    if(!interaction.isSelectMenu()){
        return;
    }

    const { customId, values, member } = interaction;

    if(customId === 'dropdown'){

        const component = interaction.component;
        
        //filter van wat er wel en niet is gekoozen
        const removed = component.options.filter((option) => {
            return !values.includes(option.value)
        });

        //roll verwijderen all hij niet is ge selecteerd.
        for (var id of removed){
            member.roles.remove(id.value)
        }

        //roll toevoegen
        for (var id of values){
            member.roles.add(id)
        }

        interaction.reply({
            content: "Your choice has been well received",
            ephemeral: true
        });

    }
    
    //Kleuren menu keuzen
    if(customId === 'kleur-menu'){

        const component = interaction.component;
        
        //filter van wat er wel en niet is gekoozen
        const removed = component.options.filter((option) => {
            return !values.includes(option.value)
        });

        //roll verwijderen all hij niet is ge selecteerd.
        for (var id of removed){
            member.roles.remove(id.value)
        }

        //roll toevoegen
        for (var id of values){
            member.roles.add(id)
        }

        interaction.reply({
            content: "Je heb de Kleur Roll gekreegen.",
            ephemeral: true
        });

    }

    //Game Roll menu keuzen
    if(customId === 'game-roll-menu'){

        const component = interaction.component;
        
        //filter van wat er wel en niet is gekoozen
        const removed = component.options.filter((option) => {
            return !values.includes(option.value)
        });

        //roll verwijderen all hij niet is ge selecteerd.
        for (var id of removed){
            member.roles.remove(id.value)
        }

        //roll toevoegen
        for (var id of values){
            member.roles.add(id)
        }

        interaction.reply({
            content: "Je hebb alle game rollen gekregen die je heb ge kozen.",
            ephemeral: true
        });

    }

    //Rolle menu keuzen
    if(customId === 'rolle-menu'){

        const component = interaction.component;
        
        //filter van wat er wel en niet is gekoozen
        const removed = component.options.filter((option) => {
            return !values.includes(option.value)
        });

        //roll verwijderen all hij niet is ge selecteerd.
        for (var id of removed){
            member.roles.remove(id.value)
        }

        //roll toevoegen
        for (var id of values){
            member.roles.add(id)
        }

        interaction.reply({
            content: "Je hebb alle game rollen gekregen die je heb ge kozen.",
            ephemeral: true
        });

    }

});

//Bot Login
client.login(process.env.TOKEN);