const { Configuration, OpenAIApi } = require("openai");
const { getMessages } = require("./queue");

async function getOpenAI() {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });
    return new OpenAIApi(configuration);
}

async function answerChat(user_id, messages) {
    const client = await getOpenAI();

    const response = await client.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
        user: user_id
    });

    console.log('User: ', user_id);
    console.log(`Usage:`, response.data.usage);

    return response.data.choices[0].message?.content;
}

module.exports = {
    sendChat: answerChat
}
