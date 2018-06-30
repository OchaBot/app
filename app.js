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
	
	if(msg === prefix + ('TEA'))
	{
		console.log(msg.name);
		var num = Math.floor(Math.random() * 5);
		if(num == 0) message.channel.send('I understood you <@' + sender.id + '>, you look hot again.');
		else if (num == 1) message.channel.send( '<@' + sender.id + '>, you are smelling like a tea!');
		else if (num == 2) message.channel.send('<@' + sender.id + '>, no more tea to you!');
		else if (num == 3) message.channel.send('<@' + sender.id + '>, want me to brew a tea for you?');
		else message.channel.send('<@' + sender.id + '>, could you brew the tea slowly?');
		
	}
	
	if(msg === prefix + ('ÇAY'))
	{
		console.log(msg.name);
		var num = Math.floor(Math.random() * 5);
		if(num == 0) message.channel.send('Anlıyorum <@' + sender.id + '>, demlisin yine.');
		else if (num == 1) message.channel.send( '<@' + sender.id + '>, çay gibi demli kokular alıyorum senden!');
		else if (num == 2) message.channel.send('<@' + sender.id + '>, şakire çay yok!');
		else if (num == 3) message.channel.send('<@' + sender.id + '>, demliyim mi abi?');
		else message.channel.send('<@' + sender.id + '>, mümkünse kısık ateşte demler misiniz?');
		
	}
	
	if(msg=== prefix + 'PUANIM'){
		message.channel.send({embed: 
		{
			color:0x30db52,
			author : {
				name : sender.username,
				icon_url: sender.avatarURL
			},
			description: 'Çay Puanınız : ' + userData[sender.id + message.guild.id].puan + ':tea:'
		}});
	}
	
	if(msg=== prefix + 'BONUS'){
		var d = new Date();
		if(!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {};
		if(!userData[sender.id + message.guild.id].sure || userData[sender.id + message.guild.id].sure.getDay - d.getDay >= 1){
			userData[sender.id + message.guild.id].puan += 25; 
			userData[sender.id + message.guild.id].sure = d;
			message.channel.send({embed: 
			{
			color:0x30db52,
			author : {
				name : bot.user.username,
				icon_url: bot.user.avatarURL
			},
			fields: [{
				name:'Günlük bonus',
				value:'<@' + sender.id + '>, günlük çayınız demlendi (+25).  Kaç şeker alırdınız?'
			}]
			}});
		}
		else message.channel.send({embed: 
			{
				color:0x30db52,
				author : {
					name : bot.user.username,
					icon_url: bot.user.avatarURL
				},
				fields: [{
					name:'Üzgünüm! :sad:',
					value:'Günde sadece 1 bardak çay ikram edebiliyorum!'
			}]
			}});
	}
	
	if(msg=== prefix + 'DAILY'){
		var d = new Date();
		if(!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {};
		if(!userData[sender.id + message.guild.id].sure || userData[sender.id + message.guild.id].sure.getDay - d.getDay >= 1){
			userData[sender.id + message.guild.id].puan += 25; 
			userData[sender.id + message.guild.id].sure = d;
			message.channel.send({embed: 
			{
			color:0x30db52,
			author : {
				name : bot.user.username,
				icon_url: bot.user.avatarURL
			},
			fields: [{
				name:'Daily bonus',
				value:'<@' + sender.id + '>, brewed your daily tea (+25).  Want some sugar?'
			}]
			}});
		}
		else message.channel.send({embed: 
			{
				color:0x30db52,
				author : {
					name : bot.user.username,
					icon_url: bot.user.avatarURL
				},
				fields: [{
					name:'So sorry!',
					value:'I am only allowed to give 1 glass of tea everyday! (Blame my programmer)'
			}]
			}});
	}
	
	if(msg=== prefix + 'HELP'){

		message.channel.send({embed: 
		{
			color:0x30db52,
			author : {
				name : bot.user.username,
				icon_url: bot.user.avatarURL
			},
			fields: [{
				name : '-tea',
				value : 'Would you like to drink some tea with me?',
			},
			{
				name : '-points',
				value : 'Show my current tea points.',
			},
			{
				name : '-daily',
				value : 'Get your daily tea points.',
			}
			]
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
				name : '-çay',
				value : 'Çay içmek istedi canın değil mi?',
			},
			{
				name : '-puanım',
				value : 'Mevcut çay puanımı göster.',
			},
			{
				name : '-bonus',
				value : 'Günlük çay puanını almak için yaz.',
			}
			]
		}});
	}
});

bot.on('ready', () => { bot.user.setActivity('-yardım, -help')});
bot.on('ready', () => { console.log('OchaBot başladı.')});

bot.login('NDYyMzc3MTEyOTg5MzM1NTcy.Dhg92A.GiLaFONey9oKxPHeGhzswQeEnU8');
// 