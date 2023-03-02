const maximumMessagesperChat = 5;

const chats = [];

function addMessage(chat_id, message) {
    if (chats[chat_id] === undefined) {
        chats[chat_id] = [];
    }
    chats[chat_id].push(message);
    if (chats[chat_id].length > maximumMessagesperChat) {
        chats[chat_id].shift();
    }
}

function getMessages(chat_id) {
    return chats[chat_id];
}

function resetMessages(chat_id) {
    chats[chat_id] = [];
}

module.exports = {
    addMessage,
    getMessages,
    resetMessages
}
