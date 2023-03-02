# Telegram ChatGPT Bot

This is a Telegram bot that uses the new ChatGPT Api to generate text in a Telegram Chat.

You can write him a message and he will reply with a generated text.

It sends the last 5 messages to the API and uses the last message as the prompt. This is done in the queue.js file.

## How to use
```bash
yarn install

node bot.js
```

You need to set the following environment variables:
```bash
OPENAI_API_KEY=
TELEGRAM_BOT_TOKEN=
ALLOWED_USERS=1234556,7859346
```

To find your user chat id you need to start the bot and send him a message. The log prints you your chat id.
