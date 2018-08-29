const Discord = require('discord.js')

var mysql = require('mysql');
var connection = mysql.createConnection(process.env.JAWSDB_URL);

const bot= new Discord.Client();
const fs = require('fs');
const prefix='-';
// userData2 => userData
let userData= JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

connection.connect((err) => {if(err) console.error(err); else console.log("Connected to JawsDB MySQL database.")});

bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Sunucuya hoş geldin, ${member}`);
});

bot.on('message', async message => {
	if(message.channel.type === 'dm') return;
  if(message.author.bot && message.content === "Numara belirleniyor...:game_die:" || message.content === "Finding a number...:game_die:") {
    message.delete();
  }
  if(message.author.bot) return;

	let msg = message.content.toUpperCase();
	let sender = message.author;
  //if(sender.id === '292688279839703040')
	let args = msg.slice(1).trim().split(" ");

  var date = new Date();
  function generatePoints()
  {
    var min = 10;
    var max = 30;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function updateData()
  {
    let sql = '';

    connection.query(sql, function(err, res) {
      if (err) throw err;

      console.log('affectedRows: ' + res.affectedRows);
    });
  }

  function createData()
  {
    let sql = 'INSERT INTO userData(userID,xp,level,drinkKind,lng) VALUES (' + sender.id + ', 0, 0, "Çay", "tr")';

    connection.query(sql, function(err, res) {
      if (err) throw err;

      console.log('affectedRows: ' + res.affectedRows);
    });
  }

  function writeData()
  {
    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
  		if (err) console.error(err);
  	});
  }



  var num = Math.floor(Math.random() * 20);

  if(num === 9 && userData.pick ===false)
  {
     userData.pick=true;
     if(userData[sender.id].lng === "English")
     {
     message.channel.send({embed:{
       color:0xffebb8,
       author : {
       name : bot.user.username,
       icon_url: bot.user.avatarURL
       },
       fields:[{name:'`-pick` your points!',value:'S-senpai!'}]
     }});
     }
     else {
       message.channel.send({embed:{
         color:0xffebb8,
         author : {
         name : bot.user.username,
         icon_url: bot.user.avatarURL
         },
         fields:[{name:'Puanını `-al`',value:'Senpa-i~!'}]
       }});
     }
  }

  let sql = 'SELECT * FROM userData WHERE userID = ' + sender.id;

  connection.query(sql, function(err, res) {
    if (err) throw err;

    console.log('Result: ' + res);
    if(res.count === undefined) console.log("0 got this.");
  });

  if(!userData[sender.id]) userData[sender.id]={};
  if(!userData[sender.id].lng)
  {
     message.channel.send("[TR] <@" + sender.id + ">, Varsayılan diliniz `Türkçe` olarak ayarlandı. Değiştirmek için `-language` komutunu kullanın.");
     message.channel.send("[EN] <@" + sender.id + ">, Your default language is set to `Turkish`. To change this, use `-language` command.");
     userData[sender.id].lng="Turkish";
  }
  if(!userData[sender.id].puan) userData[sender.id].puan=150;
  if(!userData[sender.id].xp) userData[sender.id].xp=0;
  if(!userData[sender.id].count) userData[sender.id].count=0;
  if(!userData[sender.id].teaKind) userData[sender.id].teaKind="tea";
  if(!userData[sender.id].level) userData[sender.id].level=1;
	if(!userData.pick) userData.pick = false;
  userData[sender.id].xp+=generatePoints();

  if(date.getDay() - new Date(userData[sender.id].timeCount).getDay() >= 1 || date.getHours() - new Date(userData[sender.id].timeCount).getHours() >= 20 || date.getMonth() - new Date(userData[sender.id].timeCount).getMonth() >= 1 || date.getYear() - new Date(userData[sender.id].timeCount).getYear() >= 1)
  {
     userData[sender.id].count=0;
  }
  var nxtlvl = userData[sender.id].level*150;
  if(nxtlvl<= userData[sender.id].xp)
  {
     userData[sender.id].level++;
     if(userData[sender.id].lng === "English")
     {
       message.channel.send({embed:{
         color:0xffebb8,
         author : {
         name : sender.username,
         icon_url: sender.avatarURL
         },
         fields:[{name:'Level up!',value:'You are `level ' + userData[sender.id].level + '` now!'}]
       }});
     }
     else {
       message.channel.send({embed:{
         color:0xffebb8,
         author : {
         name : sender.username,
         icon_url: sender.avatarURL
         },
         fields:[{name:'Seviye atlandı!',value:'Artık `seviye ' + userData[sender.id].level + '` oldunuz!'}]
       }});
     }

  }
	writeData();


 // ` (backtick)
	if(args[0] === 'BAHIS')
	{
    console.log(sender.username + ' şu komutu kullandı : ' + args[0]);
		if(args[3]===undefined && args[2]<=15 && userData[sender.id].puan>=args[1] && args[1]>0 && args[2]>=0)
		{
			  var num = await Math.floor(Math.random() * 16);
        message.channel.send("Numara belirleniyor...:game_die:");
				if(num==args[2])
				{
					userData[sender.id].puan += args[1]*5;
					message.channel.send({embed:
						{
							color:0xffebb8,
							author : {
							name : sender.username,
							icon_url: sender.avatarURL
						},
						fields: [{
							name:'Kazandınız!',
							value:'Bahsi kazandınız `(+' + args[1]*5 + ')`!'
						}]
						}});
				}
				else {
					userData[sender.id].puan -= args[1];
					message.channel.send({embed:
					{
					color:0xffebb8,
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
        writeData();
		}
		else if(userData[sender.id].puan<args[1]){
			message.channel.send('<@' + sender.id +'>, çay puanınız yetersiz.');
		}
		else {
			message.channel.send('<@' + sender.id +'>, yanlış veya eksik komut girdiniz.');
		}
	}

	if(args[0] === 'BET')
	{
    console.log(sender.username + ' used command : ' + args[0]);
		if(args[3]===undefined && args[2]<=15 && userData[sender.id].puan>=args[1] && args[1]>0 && args2[0]>=0)
		{
				var num = await Math.floor(Math.random() * 16);
        message.channel.send("Finding a number...:game_die:")
				if(num==args[2])
				{
					userData[sender.id].puan += args[1]*5;
					message.channel.send({embed:
						{
							color:0xffebb8,
							author : {
							name : sender.username,
							icon_url: sender.avatarURL
						},
						fields: [{
							name:'You won!',
							value:'You won the bet `(+' + args[1]*5 + ')`!'
						}]
						}});
				}
				else {
					userData[sender.id].puan -= args[1];
					message.channel.send({embed:
					{
					color:0xffebb8,
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
        writeData();
		}
		else if(userData[sender.id].puan<args[1]){
			message.channel.send('<@' + sender.id +'>, not enough tea points.');
		}
		else {
			message.channel.send('<@' + sender.id +'>, wrong or missing command.');
		}
	}

	if(msg === prefix + ('DRINK') && userData[sender.id].count <3)
	{
      var d = new Date();
			console.log(sender.username + ' used command : ' + args[0]);
      var x = await generatePoints();
      message.channel.send("Making `" + userData[sender.id].teaKind + "`...");
      message.channel.send("Your order `" + userData[sender.id].teaKind + "` is ready! `(+ " + x + " points)` `[ " + userData[sender.id].count + "/3]`");
      userData[sender.id].puan +=x;
      userData[sender.id].timeCount=d;
	}
  else if(userData[sender.id].count >= 3 && msg === prefix + ("DRINK")){
      message.channel.send("Cant make `" + userData[sender.id].teaKind + "` anymore. `(3/3)`");
      userData[sender.id].count++;

  }

	if(msg === prefix + ('IÇ') && userData[sender.id].count <3)
	{
      var d = new Date();
			console.log(sender.username + ' şu komutu kullandı : ' + args[0]);
      var x = await generatePoints();
      message.channel.send("`" + userData[sender.id].teaKind + "` hazırlanıyor...");
      userData[sender.id].count++;
      userData[sender.id].puan +=x;
      userData[sender.id].timeCount=d;
      message.channel.send("Siparişiniz olan `" + userData[sender.id].teaKind + "` hazır! `(+ " + x + " puan)` `[ " + userData[sender.id].count + "/3]`");

	}
  else if(userData[sender.id].count >= 3 && msg === prefix + ("IÇ")){
      message.channel.send("`" + userData[sender.id].teaKind + "` artık hazırlanamıyor. `(3/3)`");
  }

	if(msg === prefix + ('PICK') && userData.pick === true)
	{
      console.log(sender.username + ' picked up extra points.');
			userData.pick = false;
			message.delete();
      var points = generatePoints();
			userData[sender.id].puan += points;
			message.channel.send({embed:
			{
			color:0xffebb8,
			author : {
				name : bot.user.username,
				icon_url: bot.user.avatarURL
			},
			fields: [{
				name:'Picked up points',
				value:'<@' + sender.id +'>, you got extra points `(+' + points + ')`.'
			}]
			}});
      writeData();
	}

	if(msg === prefix + ('AL') && userData.pick === true)
	{
    console.log(sender.username + ' ekstra puanı aldı.');
			userData.pick = false;
			message.delete();
      var points = generatePoints();
			userData[sender.id].puan += points;
			message.channel.send({embed:
			{
			color:0xffebb8,
			author : {
				name : bot.user.username,
				icon_url: bot.user.avatarURL
			},
			fields: [{
				name:'Puan kazandınız.',
				value:'<@' + sender.id +'>, ekstra puan kazandınız `(+' + points + ')`.'
			}]
			}});
      writeData();
	}

	if(msg=== prefix + 'PUANIM'){
			message.channel.send({embed:
			{
				color:0xffebb8,
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
				color:0xffebb8,
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
			if(!userData[sender.id].sure || d.getHours() - new Date(userData[sender.id].sure).getHours() >= 20 || d.getDay() - new Date(userData[sender.id].sure).getDay() >=1 || d.getMonth() - new Date(userData[sender.id].sure).getMonth() >= 1 || d.getYear - new Date(userData[sender.id].sure).getYear() >= 1 ){
				userData[sender.id].puan += 25;
				userData[sender.id].sure = d;
				message.channel.send({embed:
				{
				color:0xffebb8,
				author : {
					name : bot.user.username,
					icon_url: bot.user.avatarURL
				},
				fields: [{
					name:'Günlük bonus',
					value:'<@' + sender.id +'>, günlük ' + userData[sender.id].teaKind + ' içeceğiniz hazır `(+25)`.'
				}]
				}});
        writeData();
	}
	else message.channel.send({embed:
	{
			color:0xffebb8,
			author : {
				name : bot.user.username,
				icon_url: bot.user.avatarURL
			},
			fields: [{
					name:'Neeee?!',
					value:'Ben size çay vermiştim a-ama? (Belki de veritabanım yine arızalıdır!)'
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
				color:0xffebb8,
				author : {
					name : bot.user.username,
					icon_url: bot.user.avatarURL
				},
				fields: [{
					name:'Daily bonus',
					value:'<@' + sender.id +'>, your daily drink ' + userData[sender.id].teaKind + ' is ready `(+25)`.'
				}]
				}});
        writeData();
	}
			else message.channel.send({embed:
			{
				color:0xffebb8,
				author : {
					name : bot.user.username,
					icon_url: bot.user.avatarURL
				},
				fields: [{
					name:'Oops!',
					value:'Looks like you are out of quota, or my database sucks!'
			}]
			}});
	}

	if(msg=== prefix + 'HELP')
	{
			message.channel.send({embed:
			{
			color:0xffebb8,
			author : {
				name : bot.user.username,
				icon_url: bot.user.avatarURL
			},
			fields: [{
				name : '-drink',
				value : 'All kinds are available on -mydrink `<teaname>` command.',
			},
			{
				name : '-points',
				value : 'Let me show your points.',
			},
			{
				name : '-daily',
				value : 'Well, my database is out of service. `Warned.` Go on, and take a risk.',
			},
			{
				name : '-bet (points) (number)',
				value : 'Bet your points for a guessing. Number should be `(0-15)`. Ex: `-bet 5 0`',
			},
      {
				name : '-level',
				value : 'Let me show your level. It should be somewhere here.',
			},
      {
				name : '-language',
				value : 'Okay, I will be service on english.',
			}
			]
		}});
	}

  if(msg=== prefix + 'LEVEL'){
    message.channel.send({embed:{
      color:0xffebb8,
      author : {
      name : sender.username,
      icon_url: sender.avatarURL
      },
      fields:[{name:'There it is!',value:'Looks like you are `level ' + userData[sender.id].level + '` right now and you need `' + ((userData[sender.id].level*150)-userData[sender.id].xp) + '` experience points for next level.'}]
    }});
  }
  if(args[0] === 'IÇERIM' && args[1]!= undefined){
    userData[sender.id].teaKind=args[1].toLowerCase();;
    message.channel.send({embed:
    {
    color:0xffebb8,
    author : {
      name : sender.username,
      icon_url: sender.avatarURL
    },
    description:"Tercihiniz kaydedildi."
  }});
  }

  if(args[0] === 'MYDRINK' && args[1]!= undefined){
    userData[sender.id].teaKind=args[1].toLowerCase();
    message.channel.send({embed:
    {
    color:0xffebb8,
    author : {
      name : sender.username,
      icon_url: sender.avatarURL
    },
    description:"Drink saved."
  }});
  }

  if(msg=== prefix + 'LANGUAGE'){
    message.channel.send("Your default language is now `-English-`.");
    userData[sender.id].lng="English";
  }

  if(msg=== prefix + 'DIL'){
    message.channel.send("Artık varsayılan diliniz `-Türkçe-`.");
    userData[sender.id].lng="Turkish";
  }

  if(msg=== prefix + 'SEVIYE'){
    message.channel.send({embed:{
      color:0xffebb8,
      author : {
      name : sender.username,
      icon_url: sender.avatarURL
      },
      fields:[{name:'İşte buradaymış!',value:'Sanırım `seviye ' + userData[sender.id].level + '` olduğunuz ve diğer seviye için `' + ((userData[sender.id].level*150)-userData[sender.id].xp) + '` tecrübe gerektiği yazıyor.'}]
    }});
  }

	if(msg=== prefix + 'YARDIM'){
		message.channel.send({embed:
		{
			color:0xffebb8,
			author : {
				name : bot.user.username,
				icon_url: bot.user.avatarURL
			},
			fields: [{
				name : '-iç',
				value : 'Çeşitler için : -içerim `<çay adı>`',
			},
			{
				name : '-puanım',
				value : 'Mevcut puanınızı hemen gösterebilirim.',
			},
			{
				name : '-bonus',
				value : 'Veritabanım arızalı. Lütfen bonus alırken bunu göz önünde bulundurun.',
			},
			{
				name : '-bahis (puan) (tahmin)',
				value : 'Belirtilen puan miktarında bahis yap. Tahmininiz `(0-15)` arası olmalıdır. Örnek kullanım : `-bahis 5 1`'
			},
      {
				name : '-seviye',
				value : 'Seviyenizi hemen gösterebilirim. Şuralarda bir yerde olacaktı!',
			},
      {
				name : '-dil',
				value : 'Mevcut dil ayarlarınızı hemen kaydediyorum.',
			}
			]
		}});
	}
});


/*bot.on('ready', () => { var channel = bot.channels.get("457590277683544084"); bot.user.setActivity('-yardım, -help'); channel.send({embed:{
  color:0xffebb8,
  author: {
      name: bot.user.username + '.v2',
      icon_url: bot.user.avatarURL
  },
  fields:[{name:'Info',value:'OchaBot is currently fighting with database problems!'}]
  }});
});*/
bot.on('ready', () => { console.log('OchaBot başladı.')});

bot.login(process.env.testtoken);
//process.env.token
