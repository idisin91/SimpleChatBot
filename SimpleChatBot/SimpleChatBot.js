var TelegramBot = require('node-telegram-bot-api');


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
var oldText = '';
var oldState = 0;
bot.on('text', function(msg)
{

    // Коды состояний oldstate:
    // 1 - ввод имени
    // 2 - ввод телефона
    // 3 - конец диалога

    var answer = false;
    var messageChatId = msg.chat.id;
    var messageText = msg.text;
    if ((messageText === '/start')&& !answer) {
        answer = true;
        var key = {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['Что такое накопительная пенсия?'],
                    ['Какие преимущества у ОАО НПФ Газфонд?'],
                    ['Стать клиентом НПФ до конца года'],
                    ['Вызвать консультанта домой или в офис. Услуга бесплатная!']
                ],
                one_time_keyboard: true
            })
        };

        bot.sendMessage(messageChatId, 'Здравствуйте! Я консультант ПенсияМаркет, сайта по выбору негосударственного пенсионного фонда. \n Сегодня гражданам 1967 г.р. и моложе очень важно грамотно распорядиться своей накопительной пенсией, чтобы инфляция не обесценивала ваш пенсионный капитал.\n До конца года специалисты нашей компании предлагают вступить в один из крупнейших НПФ России – ОАО НПФ Газфонд пенсионные накопления. ',key);
    }

    if ((messageText === 'Что такое накопительная пенсия?')&& !answer) {
        answer = true;
        key = {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Какие преимущества у ОАО НПФ Газфонд?'],
                ['Хочу стать клиентом НПФ до конца года'],
                ['Хочу вызвать консультанта домой или в офис. Услуга бесплатная!']
            ],
            one_time_keyboard: true
        })
    };
        bot.sendMessage(messageChatId,'Каждый месяц работодатель перечисляет 6% от вашей официальной заработной платы на специальный счет в ПФР в вашу будущую накопительную пенсию. \nЭти накопления должны инвестироваться, работать и получать дополнительный доход. \nТаким управлением занимаются профессиональные управляющие – негосударственные пенсионные фонды.',key)
    }

    if ((messageText === 'Какие преимущества у ОАО НПФ Газфонд?')&& !answer) {
        answer = true;
        key = {
            reply_markup: JSON.stringify({
                keyboard: [
                    ['Хочу стать клиентом НПФ до конца года'],
                    ['Вызвать консультанта домой или в офис. Услуга бесплатная!']
                ],
                one_time_keyboard: true
            })
        };
        bot.sendMessage(messageChatId,'Единственным акционером фонда является НПФ ГАЗФОНД, которым в свою очередь владеют стурктуры Газпрома.\n Высокая доходность (к примеру, в 2015 году доходность составила 11,07%).\n Будет доступен личный кабинет для отслеживания ваших накоплений',key)
    }

    if ((messageText === 'Хочу стать клиентом НПФ до конца года')&& !answer) {
        answer = true;
        bot.sendMessage(messageChatId, 'Как вас зовут?');
        oldState = 1;
    }

    if ((messageText === 'Хочу вызвать консультанта домой или в офис. Услуга бесплатная!')&& !answer) {
        answer = true;
        bot.sendMessage(messageChatId, 'Как вас зовут?');
        oldState = 1;
    }

    if ((oldState === 1)&& !answer) {
        answer = true;
        bot.sendMessage(messageChatId, 'Ваше имя: ' + messageText + '\nВведите номер телефона');
        oldState = 2;
    }

    else if ((oldState === 2)&& !answer){
        answer = true;
        oldState = 3;
        bot.sendMessage(messageChatId, 'Ваш телефон: ' + messageText + '\nС вами свяжется оператор');
    }

    if((oldState === 3)&& !answer) {
        answer = true;
    }

    console.log(oldText);
    oldText = msg.text;
    console.log(msg);
});


