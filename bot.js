require('dotenv').config();

const Telegram = require('@yuva1422/telegram.js');
const { sendChat } = require('./gpt');
const { addMessage, getMessages, resetMessages } = require('./queue');


function get_allowed_users() {
    return process.env.ALLOWED_USERS.split(',').map((user) => {
        return parseInt(user);
    })
}

const client = new Telegram.Client()

client.on('message', (msg) => {
    // Check if the message is a command
    if (msg.content.startsWith('/')) return;

    if (get_allowed_users().includes(msg.member.chatID)) {
        console.log('================');
        addMessage(msg.member.id, {
            role: 'user',
            content: msg.content
        });

        const messages = getMessages(msg.member.chatID);
        const chatID = msg.member.chatID.toString();

        console.log('User: ', msg.member.user)

        sendChat(chatID, messages).then((response) => {
            msg.chat.send(response);

            addMessage(msg.member.id, {
                role: 'assistant',
                content: response
            });

            console.log('================');
            console.log("");
        })

    } else {
        console.log('================');
        console.log('User: ', msg.member.user)
        console.log('User not allowed: ', msg.member.chatID)
        msg.reply('You are not allowed to use this bot.')

        console.log('================');
        console.log("");;
    }
});

client.commands.on('restart', (bot, message, args) => {
    if (get_allowed_users().includes(message.member.chatID)) {
        message.chat.send('Restarting...');
        resetMessages(message.member.chatID);
    }
});

// /ping
client.commands.on('ping', (bot, message, args) => {
    message.chat.send('Pong!');
});


client.login(process.env.TELEGRAM_BOT_TOKEN);

client.startPolling();
