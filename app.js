const Discord = require('discord.js')
const git = require('simple-git');
const bot= new Discord.Client();
const fs = require('fs');
const prefix='-';
// userData2 => userData
let userData= JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Sunucuya hoş geldin, ${member}`);
});

function updateGit()
{
  git().add('*');
  git().commit('OchaBot updates');
  git().push(['origin','master']);
}

bot.on('message', async message => {
	if(message.channel.type === 'dm') return;
	if(message.author.bot) return;

	let msg = message.content.toUpperCase();
	let sender = message.author;

  if(sender.id === 292688279839703040)
  {
      message.edit("`" + message.content + "`");
  }
	let args = msg.slice(1).trim().split(" ");

  var date = new Date();

  if(!userData[sender.id]) userData[sender.id]={};
  if(!userData[sender.id].puan) userData[sender.id].puan=150;
	if(!userData.pick) userData.pick = false;
	fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
		if (err) console.error(err);
	});
  updateGit();

 // ` (backtick)
	if(args[0] === 'BAHIS')
	{
    console.log(sender.username + ' şu komutu kullandı : ' + args[0]);
		if(args[3]===undefined && args[2]<15 && userData[sender.id].puan>=args[1] && args[1]>0 && args[2]>=0)
		{
			  var num = await Math.floor(Math.random() * 15);
        message.channel.send("Numara belirleniyor...:game_die:")
				if(num==args[2])
				{
          message.delete();
					userData[sender.id].puan += args[1]*5;
					message.channel.send({embed:
						{
							color:0x30db52,
							author : {
							name : sender.username,
							icon_url: sender.avatarURL
						},
						fields: [{
							name:'Kazandınız!',
							value:'Bahsi kazandınız `(+' + args[1]*3 + ')`!'
						}]
						}});
				}
				else {
          message.delete();
					userData[sender.id].puan -= args[1];
					message.channel.send({embed:
					{
					color:0x30db52,
					author : {
						name : sender.username,
						icon_url: sender.avatarURL
					},
					fields: [{
						name:'Kaybettin!',
						value:'Bahsi kaybettin `(-' + args[1] + ')`. Çıkan sayı: `[' + num + ']`'
					}]
					}});
				}



		}
		else if(userData[sender.id].puan<args[1]){
			message.channel.send('<@' + sender.id + +'>, çay puanınız yetersiz.');
		}
		else {
			message.channel.send('<@' + sender.id + +'>, yanlış veya eksik komut girdiniz.');
		}
	}

	if(args[0] === 'BET')
	{
    console.log(sender.username + ' used command : ' + args[0]);
		if(args[3]===undefined && args[2]<15 && userData[sender.id].puan>=args[1] && args[1]>0 && args2[0]>=0)
		{
				var num = await Math.floor(Math.random() * 15);
        message.channel.send("Finding a number...:game_die:")
				if(num==args[2])
				{
          message.delete();
					userData[sender.id].puan += args[1]*5;
					message.channel.send({embed:
						{
							color:0x30db52,
							author : {
							name : sender.username,
							icon_url: sender.avatarURL
						},
						fields: [{
							name:'You won!',
							value:'You won the bet `(+' + args[1]*3 + ')`!'
						}]
						}});
				}
				else {
          message.delete();
					userData[sender.id].puan -= args[1];
					message.channel.send({embed:
					{
					color:0x30db52,
					author : {
						name : sender.username,
						icon_url: sender.avatarURL
					},
					fields: [{
						name:'You lost!',
						value:'You lost the bet. `(-' + args[1] + ')`. The number was: `[' + num + ']`'
					}]
					}});
				}



		}
		else if(userData[sender.id].puan<args[1]){
			message.channel.send('<@' + sender.id + +'>, not enough tea points.');
		}
		else {
			message.channel.send('<@' + sender.id + +'>, wrong or missing command.');
		}
	}

	if(msg === prefix + ('TEA'))
	{
			console.log(sender.username + ' used command : ' + args[0]);
			console.log('returned ' + num + ' number from random.');
			if (num == 0) message.channel.send('<@' + sender.id +'>, you made my day.');
			else if (num == 1) message.channel.send( '<@' + sender.id +'>, my algorithms telling me to stay away from you!');
			else if (num == 2) message.channel.send('<@' + sender.id +'>, no more tea to you, hmph.');
			else if (num == 3) message.channel.send('<@' + sender.id +'>, want me to brew a tea for you?');
			else if (num == 4) message.channel.send('<@' + sender.id +'>, i could easily delete your ' + userData[sender.id].puan + ' points you know.');
			else if (num == 5)
			{
				message.channel.send('<@' + sender.id +'> SENPAI?');
				message.channel.send('OchaBot used SENPAI keyword! Type -pick to get your reward!');
				userData.pick=true
			}
			else if (num == 6) message.channel.send('<@' + sender.id +'>, maybe you should take an ice tea.');
			else if (num == 7) message.channel.send('<@' + sender.id +'>! 私もお茶お大好きですよ!');
			else if (num == 8) message.channel.send('<@' + sender.id +'> here is your tea.');
			else message.channel.send('<@' + sender.id +'> im bored too but i still do my job.');
	}

	if(msg === prefix + ('ÇAY'))
	{
			console.log(sender.username + ' şu komutu kullandı : ' + args[0]);

			var num = Math.floor(Math.random() * 10);
			if(num == 0) message.channel.send('<@' + sender.id +'>, işte çayınız.');
			else if (num == 1) message.channel.send( '<@' + sender.id +'> belki bir bot olabilirim, ama benim de duygularım var!');
			else if (num == 2) {
				message.channel.send('<@' + sender.id +'>, Detroit - Become Human oyununu biliyor musun?');
				if(!userData[sender.id].quest) { userData[sender.id].quest = true;}
			}
			else if (num == 3) {
				message.channel.send('<@' + sender.id +'> SENPAAAAAAAAAAAAAAAI!');
				message.channel.send('OchaBot SENPAI anahtarını kullandı! Ödülü almak için -al yaz!');
				userData.pick=true;
			}
			else if (num == 4) message.channel.send('<@' + sender.id +'>、あなたのお茶は美味しいかったですか?');
			else if (num == 5 && sender.id== 270173785280217088) message.channel.send('<@' + sender.id +'>, bana hayat veren kişi. Sizi eğlendirmek bot olarak benim görevim.');
			else if (num == 5 && sender.id== 292688279839703040) message.channel.send('<@' + sender.id +'>, beni sunucuda barındıran ve geliştiricimin arkadaşı. Sizi eğlendirmek için elimden geleni yapacağım.');
			else if (num == 5) message.channel.send('<@' + sender.id +'> size bir çay ısmarlamama ne dersiniz?');
			else if (num == 6) message.channel.send('<@' + sender.id +'> bir bot, bir bota \'bip bopbipbop, bip bopbop bibbibbop bibbopbib\' demiş.');
			else if (num == 7) message.channel.send('<@' + sender.id +'> bazen sadece bot olmak istersin.');
			else if (num == 8) message.channel.send('<@' + sender.id +'>, ben şansa inanmam, başarmanın tek sırrı çok kodlamak.');
			else message.channel.send('<@' + sender.id +'>, bilgisayar ile kurduğum iletişim ve sizinle kurduğum iletişim arasında 1 0 fark var.');
	}

	if(msg === prefix + ('PICK') && userData.pick === true)
	{
      console.log(sender.username + ' picked up tea points.');
			userData.pick = false;
			message.delete();
			userData[sender.id].puan += 10;
			message.channel.send({embed:
			{
			color:0x30db52,
			author : {
				name : bot.user.username,
				icon_url: bot.user.avatarURL
			},
			fields: [{
				name:'Picked up tea points',
				value:'<@' + sender.id +'>, you got extra tea points (+10).  We are out of sugar, sorry.'
			}]
			}});
	}

	if(msg === prefix + ('AL') && userData.pick === true)
	{
    console.log(sender.username + ' çay puanı aldı.');
			userData.pick = false;
			message.delete();
			userData[sender.id].puan += 10;
			message.channel.send({embed:
			{
			color:0x30db52,
			author : {
				name : bot.user.username,
				icon_url: bot.user.avatarURL
			},
			fields: [{
				name:'Çay puanı kazandınız.',
				value:'<@' + sender.id +'>, ekstra çay puanı kazandınız `(+10)`.'
			}]
			}});
	}

	if(msg=== prefix + 'PUANIM'){
			message.channel.send({embed:
			{
				color:0x30db52,
				author : {
					name : sender.username,
					icon_url: sender.avatarURL
				},
				description: 'Çay Puanınız : `' + userData[sender.id].puan + '`'
			}});
	}

	if(msg=== prefix + 'POINTS'){
			message.channel.send({embed:
			{
				color:0x30db52,
				author : {
					name : sender.username,
					icon_url: sender.avatarURL
				},
				description: 'Your tea points: `' + userData[sender.id].puan + '`'
			}});
	}



	if(msg=== prefix + 'BONUS')
	{
			var d = new Date();
			if(!userData[sender.id]) userData[sender.id] = {};
			if(!userData[sender.id].sure || d.getHours() - new Date(userData[sender.id].sure).getHours() >= 20 && userData[sender.id].sure || d.getDay() || d.getMonth() - new Date(userData[sender.id].sure).getMonth() >= 1 || d.getYear - new Date(userData[sender.id].sure).getYear() >= 1 ){
				userData[sender.id].puan += 25;
				userData[sender.id].sure = d;
				message.channel.send({embed:
				{
				color:0x30db52,
				author : {
					name : bot.user.username,
					icon_url: bot.user.avatarURL
				},
				fields: [{
					name:'Günlük bonus',
					value:'<@' + sender.id +'>, günlük çayınız demlendi `(+25)`.'
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
					name:'Üzgünüm!',
					value:'Günde sadece 1 bardak çay ikram edebiliyorum!'
			}]
			}});
	}

	if(msg=== prefix + 'DAILY')
	{
			var d = new Date();
			if(!userData[sender.id]) userData[sender.id] = {};
			if(!userData[sender.id].sure || d.getDay() - new Date(userData[sender.id].sure).getDay() >= 1 || d.getMonth() - new Date(userData[sender.id].sure).getMonth() >= 1 || d.getYear - new Date(userData[sender.id].sure).getYear() >= 1 ){
				userData[sender.id].puan += 25;
				userData[sender.id].sure = d;
				message.channel.send({embed:
				{
				color:0x30db52,
				author : {
					name : bot.user.username,
					icon_url: bot.user.avatarURL
				},
				fields: [{
					name:'Daily bonus',
					value:'<@' + sender.id +'>, brewed your daily tea (+25).  Want some sugar?'
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
					value:'I am only allowed to give 1 glass of tea everyday!'
			}]
			}});
	}

	if(msg=== prefix + 'HELP')
	{
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
			},
			{
				name : '-bet (points) (number)',
				value : 'Bet your points for a guessing. Number should be (0-49). Ex: -bet 5 21',
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
				value : 'Beraber çay içmek ister misin?',
			},
			{
				name : '-puanım',
				value : 'Mevcut çay puanımı göster.',
			},
			{
				name : '-bonus',
				value : 'Günlük çay puanını almak için yaz.',
			},
			{
				name : '-bahis (puan) (tahmin)',
				value : 'Belirtilen puan miktarında bahis yap. Tahmininiz (0-49) arası olmalıdır. Örnek kullanım : -bahis 5 41'
			}
			]
		}});
	}
});

bot.on('ready', () => { bot.user.setActivity('-yardım, -help')});
bot.on('ready', () => { console.log('OchaBot başladı.')});

bot.login('NDYyOTcyNzgyNTQ4ODc3MzEy.Dhu4Hg.lIE-t-oHro53StCP8Xe4e4yHPeo');
//process.env.token
