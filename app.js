const Discord = require('discord.js');
const bot= new Discord.Client();

const prefix='-';

bot.on('message', message => {
	
	let msg = message.content.toUpperCase();
	let sender = message.author;
	
	if(msg=== prefix + 'ÇAY'){
	  
		message.channel.send("BİRİ ÇAY MI DEDİ?!");
	}
	
	if(msg=== prefix + 'YARDIM'){

		message.channel.send({embed: 
		{
			color:0x30db52,
			author : {
				name : bot.user.username,
				icon_url: bot.user.avatarURL
			},
			fields: [{
				name : {embed:"-çay"},
				value : "Deneme komutu.",
				inline : true
			},
			{
				name : {embed:"-puanım"},
				value : "Mevcut çay puanımı göster. (planlanıyor)",
				inline : true
			},
			{
				name : {embed:"-bonus"},
				value : "Günlük çay puanını almak için yaz. (planlanıyor)",
				inline : true
			}
			]
		}});
	}
});

bot.on('ready', () => { bot.user.setActivity('-yardım')	});

bot.login('NDYyMzc3MTEyOTg5MzM1NTcy.Dhg92A.GiLaFONey9oKxPHeGhzswQeEnU8');
// 