var TelegramBot = require('node-telegram-bot-api');

var token = '1248890256:AAEmCP8unsGtl8PK5p-5POEv0oYyl7vuakw';
var bot = new TelegramBot(token, {polling: true});

var CronJob = require('cron').CronJob;

var notes = [];

bot.onText(/\/Напомни (.+) в (.+)/i, (msg, match) => {
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2];
    var note = notes.push({'uid':userId, 'time':match[2], 'text':match[1]});
    bot.sendMessage(userId, 'Хорошо, я напомню');
    new CronJob('* * * * * *', function() {
        for (var i = 0; i < notes.length; i++){
            var curDate = new Date().getHours() + ':' + new Date().getMinutes();
            if ( notes[i]['time'] === curDate ) {
                bot.sendMessage(notes[i]['uid'], 'Напоминаю: '+ notes[i]['text']);
                notes.pop(i,1);
            }
        }
    }, null, true, 'Europe/Kiev');
});