const config = require('./config.json')
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', async() => {
    console.log('I am now online and working.')
})

client.on('message', async(msg) => {
    if(msg.author.bot) return
    if(!msg.guild) return

    var prefix = config.prefix
    if(!msg.content.toLowerCase().startsWith(prefix)) return

    var args = msg.content.split(' ')
    var cmd = args.shift().slice(prefix.length).toLowerCase()

    try {
        var file = require(`./commands/${cmd}.js`)
        file.run(client, msg, args)

    } catch(err) {
        console.warn(err)
    }
})

client.login(config.token)