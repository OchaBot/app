const Discord = require('discord.js');
const bot= new Discord.Client();
const fs = require('fs');
const prefix='-';

let userData=JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

bot.on('message', message => {
	
	let msg = message.content.toUpperCase();
	let sender = message.author;
	
	if(!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {}
	if(!userData[sender.id + message.guild.id].puan) userData[sender.id + message.guild.id].puan = 0;
	
	fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
		if (err) console.error(err);
	})
	
	if(msg=== prefix + ('ÇAY') || msg.name=== ":tea:")
	{
		var num = Math.floor(Math.random() * 3);
		if(num == 0) message.channel.send('Çay? <@' + sender.id + '> Çay.');
		else if (num == 1) message.channel.send( '<@' + sender.id + '>, çay gibi demli kokular alıyorum senden!');
		else message.channel.send('<@' + sender.id + '>, şakire çay yok!');
		
	}
	
	if(msg=== prefix + 'PUANIM'){
		message.channel.send({embed: 
		{
			color:0x30db52,
			author : {
				name : sender.username,
				icon_url: sender.avatarURL
			},
			description: ":tea: Çay Puanınız : " + userData[sender.id + message.guild.id].puan
		}});
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
				name : "-çay",
				value : "Deneme komutu.",
				inline : true
			},
			{
				name : "-puanım",
				value : "Mevcut çay puanımı göster.",
				inline : true
			},
			{
				name : "-bonus",
				value : "Günlük çay puanını almak için yaz. (planlanıyor)",
				inline : true
			}
			]
		}});
	}
});

bot.on('ready', () => { bot.user.setActivity('-yardım')});
bot.on('ready', () => { console.log('OchaBot başladı.')});

bot.login('NDYyMzc3MTEyOTg5MzM1NTcy.Dhg92A.GiLaFONey9oKxPHeGhzswQeEnU8');
// 