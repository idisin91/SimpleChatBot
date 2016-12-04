var TelegramBot = require('node-telegram-bot-api');

//TODO: добавить базу данных для хранения текущего состояния пользователя
var token = '314400177:AAGdYxeda0twyZCyAXWUq4M8u_hn5Ne5IVw';
var botOptions = {
    polling: true
};
var bot = new TelegramBot(token, botOptions);

bot.getMe().then(function(me)
{
    console.log('Hello! My name is %s!', me.first_name);
    console.log('My id is %s.', me.id);
    console.log('And my username is @%s.', me.username);

});

var fs = require('fs');
var answers = JSON.parse(fs.readFileSync('./answers.json', 'utf8')); // Подключаем ответы в формате JSON
var buttons = JSON.parse(fs.readFileSync('./buttons.json', 'utf8'));

var oldText = '';
var oldState = 0;
bot.on('text', function(msg)
{
    var answer = false;
    var messageChatId = msg.chat.id;
    var messageText = msg.text;
    if ((messageText === '/start')&& !answer) {
        answer = true;
        var key = {
            reply_markup: JSON.stringify({
                keyboard: [
                    [buttons[0]],
                    [buttons[1]],
                    [buttons[2]],
                    [buttons[3]]
                ],
                one_time_keyboard: true
            })
        };
        bot.sendMessage(messageChatId, answers[0].text,key);
    }

    if ((messageText === buttons[0].text)&& !answer) {
        answer = true;
        key = {
        reply_markup: JSON.stringify({
            keyboard: [
                [buttons[1].text],
                [buttons[2].text],
                [buttons[3].text]
            ],
            one_time_keyboard: true
        })
    };
        bot.sendMessage(messageChatId,answers[1].text,key)
    }

    if ((messageText === buttons[1].text)&& !answer) {
        answer = true;
        key = {
            reply_markup: JSON.stringify({
                keyboard: [
                    [buttons[2].text],
                    [buttons[3].text]
                ],
                one_time_keyboard: true
            })
        };
        bot.sendMessage(messageChatId,answers[2].text,key)
    }

    if ((messageText === buttons[2].text)&& !answer) {
        answer = true;
        bot.sendMessage(messageChatId, answers[3].text);
        oldState = 1;
    }

    if ((messageText === buttons[3].text)&& !answer) {
        answer = true;
        bot.sendMessage(messageChatId, answers[3].text);
        oldState = 1;
    }

    if ((oldState === 1)&& !answer) {
        answer = true;
        bot.sendMessage(messageChatId, answers[4].text);
        oldState = 2;
    }

    else if ((oldState === 2)&& !answer){
        answer = true;
        oldState = 3;
        bot.sendMessage(messageChatId, answers[5].text);
    }

    console.log(oldText);
    oldText = msg.text;
    console.log(msg);
});


