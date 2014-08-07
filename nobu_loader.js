	//(function(){
//window.doLogin = function() {
// var doLogin = function() {
// 	window.setTimeout(function() {
// 		//$("input[name='email']").val('xiaotenobu12@gmail.com');
// 		//$("input[name='password']").val('tzh20080426');
// 		document.getElementById('login').submit();
// 	}, 5000);
// 	//window.location = 'http://user.mobcast.jp/login?guid=ON&return_to=http%3A%2F%2Fmn.mobcast.jp%2Fmn%2F&sc=on';
// }
//})()

/*
auto yahoo email register
javascript:(
(function() {
var autoYahooEmail = function() {
  document.getElementById('yid').value = "xiaotenobu";
  document.getElementById('pw').value = "";
  document.getElementById('pw2').value = "";
  document.getElementById('postalCode_a').value = "1900155";
  document.getElementById('male').checked = true;
  document.getElementById('birth').value = "19820217";
  document.getElementById('qa').value = "Beijing";
  document.getElementById('numok').checked = false;
};
autoYahooEmail();
})()
)
*/

var loginURL = "http://user.mobcast.jp/login?guid=ON&return_to=http%3A%2F%2Fmn.mobcast.jp%2Fmn%2F&sc=on";
var newUserURL = "http://gmpa.jp/regist.php?gmpa=on&input=1&back_url=http%3A%2F%2Fmn.mobcast.jp%2Fmn%2F&gid=23&sid=0";

var readyForNext = false;

var timeRatio = 1;
var timeDelay = 50;
var playerIndex = 0;
var startPlayer = 0;
var endPlayer = 0;
var playerList = [];
var password = "tzh20080426";
var playerCount = 18;
var playerCountYahoo = 123;

var getTodayString = function() {
	var date = new Date();
	var today = sprintf("%d%02d%02d", date.getFullYear(), date.getMonth() + 1, date.getDate());
	return today;
}

var updateConfig = function(cfgCB) {
	timeDelay = document.getElementById("timeDelay").value;	
	timeRatio = document.getElementById("timeRatio").value;	

	playerIndex = document.getElementById("playerIndex").value;
	var passwd = document.getElementById("password");
	if (passwd && passwd.value.length > 0)
		password = document.getElementById("password").value;

	var elem = document.getElementById("startPlayer");
	startPlayer = (elem) ? elem.value : playerIndex;
	elem = document.getElementById("endPlayer");
	endPlayer = (elem && elem.value > 0) ? elem.value : -1;

	if (cfgCB)
		cfgCB();
}

var initPlayerList = function() {
	playerList = [
					"tezheng1982@gmail.com", "tezhengchenhao@gmail.com"
					, "dummyedu@gmail.com", "dummyedu01@gmail.com", "dummyedu02@gmail.com", "dummyedu03@gmail.com", "dummedu04@gmail.com"
	];
	for (var i = 1; i <= playerCount; ++i) {
		var email = sprintf("xiaotenobu%02.0f@gmail.com", i);
		playerList.push(email);
	};
	for (var i = 1; i <= playerCountYahoo; ++i) {
		var email = sprintf("xiaotenobu%02.0f@yahoo.co.jp", i);
		playerList.push(email);
	};
};

var createGame = function(url) {
	var frame = document.getElementById("game");
	if (frame)
		frame.remove();

	frame = document.createElement('iframe');
	frame.id = "game";
	frame.width = 320;
	frame.height = 430;
	frame.frameborder = '0';
	frame.scrolling = 'no';
	frame.src = url;
	document.getElementById("game_placeholder").appendChild(frame);

	var result = document.getElementById("game");
	return result;
};

var getFrame = function() {
	var frame = null;
	if (typeof game != "undefined" && typeof game.contentWindow != "undefined")
		frame = game.contentWindow;
	else
		frame = window;
	return frame;
}

var getRootScope = function(frame, forceUpdate) {
	var local = frame ? frame : getFrame();
	if (!local || !local.angular || !local.angular.element || !frame.document.getElementsByTagName('body')[0])
		return null;

	if (!frame.rootScope || forceUpdate)
		frame.rootScope = frame.angular.element(frame.document.getElementsByTagName('body')[0]).scope();

	return frame.rootScope;
}

var findChildScope = function(scope, condition) {
  var childscope = scope.$$childHead;
  while (childscope != null)
  {
    if (condition(childscope))
    {
        return childscope;
    }
    else
    {
      var childscope1 = findChildScope(childscope, condition);
      if (childscope1 != null)
        return childscope1;
    }
    childscope = childscope.$$nextSibling;
  }
  return null;
};

var bubbleSort = function(list)
{
	for (var i = 0; i < list.length; i++)
	{
		for (j = 1; j < list.length - i; j++)
		{
			if (list[j-1] > list [j])
			{
				var t = list[j-1];
				list[j-1] = list[j];
				list[j] = t;
			}
		}
	}
};

var generatePasswords = function () {
    var passwordLength = 8 * 1;
    var upperCaseLetters = true;
    var lowerCaseLetters = true;
    var numbers = true;
    var avoidSimilarCharacters = true;
    var specialCharacters = false;
    var specialCharactersText = "?!@#$%^&*().,;/\+-=_~";
    var numberOfPasswords = 1;
    
    var characterSet = {all: {upperCaseLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                              lowerCaseLetters: 'abcdefghijklmnopqrstuvwxyz',
                              numbers: '0123456789'},
                        nonSimilar: {upperCaseLetters: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
                                     lowerCaseLetters: 'abcdefghjkmnpqrstuvwxyz',
                                     numbers: '23456789'}
                        };
    
    var selectedCharacterSet = avoidSimilarCharacters ? characterSet.nonSimilar : characterSet.all;
    var characters = '';
    if (upperCaseLetters) characters += selectedCharacterSet.upperCaseLetters;
    if (lowerCaseLetters) characters += selectedCharacterSet.lowerCaseLetters;
    if (numbers) characters += selectedCharacterSet.numbers;
    if (specialCharacters) characters += specialCharactersText;
    
    var i, j;
    var passwords = '';
    var password;
    for (i = 0; i < numberOfPasswords; i++) {
        password = '';
        for (j = 0; j < passwordLength; j++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        passwords += password;
        if (i < numberOfPasswords - 1) passwords += '\n';
    }
    
    return passwords;
};

var acquirePresents = function(frame, config) {
	var rootScope = getRootScope(frame);
	var overlay = findChildScope(rootScope, function(childscope) {
		return typeof childscope.showPresentBox != "undefined" &&
			   typeof childscope.showGlobalMenu != "undefined"; });

	overlay.showPresentBox();
	overlay.$apply();

	var getAll = function() {
		var checkPresents = function () {
			var present = findChildScope(rootScope, function(childscope) { return typeof childscope.acquireAllPresents != "undefined"; });
			if (!present) {
				frame.setTimeout(checkPresents, 1000);
				return;
			}

			present.acquireAllPresents();
	       	if (config && config.fancyGacha) {
        		frame.setTimeout(function() {
					tryFancyGacha(frame);            			
        		}, 2000);
        	}
		}; frame.setTimeout(checkPresents, 1000);
	}; frame.setTimeout(getAll, 1000);
};

var tryFancyGacha = function(frame) {
	frame.location = "http://mn.mobcast.jp/mn/#/gacha/top?"+Math.random();
	getRootScope(frame);

	var checkGacha = function() {
		var gacha = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.gachaReListup != "undefined"; });
		if (!gacha || !gacha.walletData) {
			frame.setTimeout(checkGacha, 1000);
			return;
		}

		if (gacha.walletData.gameGold < 300)
			return;

		gacha.gachaType = 15;
		gacha.gotoPageListUp();

		var checkGachaResult = function() {
			frame.console.log("Checking gacha result...");
			var gacha = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.gachaReListup != "undefined"; });
			if (!gacha.listupData || !gacha.listupData.entity || !gacha.listupData.entity.generalCardList) {
				frame.setTimeout(checkGachaResult, 2000);
				return;
			}

			for (var i = 0; i < gacha.listupData.entity.generalCardList.length; i++) {
				var c = gacha.listupData.entity.generalCardList[i];
				frame.console.log("Gacha. CardId: "+c.bean.generalCardId+" // Name: "+c.bean.cardName+((c.bean.cardRank|0)+1));

				// 4星卡, 直接停掉
				if (c.bean.cardRank > 2) {
					window.clearTimeout(window.forceRetryNewAccount);
					return;
				}
			};
			frame.tutorialDone = true;
		}; frame.setTimeout(checkGachaResult, 2000);	
	}; frame.setTimeout(checkGacha, 1000);
};

var autoTutorialBase = function(frame, config)
{
    if (frame.rootScope.tutorial.currentPhaseIndex == 0)
    {
		var leader = findChildScope(frame.rootScope, function (childscope) { return typeof childscope.click_popupOk != "undefined" });

        if (frame.rootScope.tutorial.currentItemIndex == 10 && leader && leader.selectIndex < 0)
        {
            if (!leader)
            {
                frame.setTimeout(frame.autoTutorial, 500);
                return;
            }

            leader.selectIndex = (config && config.leader) ? config.leader : 1;
            leader.click_popupOk();
            frame.setTimeout(frame.autoTutorial, 2000);
        }
        else if (frame.rootScope.tutorial.currentItemIndex >= frame.lastItemIndex)
        {
        	frame.lastItemIndex = frame.rootScope.tutorial.currentItemIndex;
            frame.tutorial.click();
            frame.setTimeout(frame.autoTutorial, 1000);
        }
        else //if (frame.rootScope.tutorial.currentItemIndex == 9)
        {
            frame.tutorial.click();
            frame.setTimeout(frame.autoTutorial, 3000);
        }
    }
    else if (frame.rootScope.tutorial.currentPhaseIndex == 7)
    {
        var states = findChildScope(frame.rootScope, function (childscope) { return typeof childscope.gotoPageCountry != "undefined" });
        if (frame.rootScope.tutorial.currentItemIndex == 1)
        {
            /*states.gotoPageStates('oshu');*/
            states.gotoPageCountry((config && config.city) ? config.city : 1);/*大阪37,尾张27,1-60*/
            states.click_gotoNextMessage();
            frame.setTimeout(frame.autoTutorial, 1000);
        }
        else if (frame.rootScope.tutorial.currentItemIndex == 4)
        {
            states.click_finish();

            frame.setTimeout(function() {
            	acquirePresents(frame, config);

            	if (config && config.fancyGacha) {

            	}
				else {
					frame.tutorialDone = true;
				}
                //window.location="http://mn.mobcast.jp/mn/#/invite/invite";
                // frame.setTimeout(function() {
                //     $("input[name='codeInput']").value = "2xwy472";
                //     frame.setTimeout(function() {
                //         var invite = findChildScope(frame.rootScope, function (childscope) { return typeof childscope.inputInviteCode != "undefined" });
                //         invite.inputInviteCode();
                //     }, 1000);
                // }, 3000);
            }, 5000);
        }
        else
        {
            frame.setTimeout(frame.autoTutorial, 200);
            frame.tutorial.click();
        }
    }
    else if (frame.rootScope.tutorial.currentPhaseIndex == 9)
    {
    	return;
    }
    else
    {
        frame.setTimeout(frame.autoTutorial, 200);
        frame.tutorial.click();
    }
};

var checkChaki = function(frame) {
	frame.chaki = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.friendlyPoints != "undefined"; });
	if (frame.chaki == null) {
		frame.setTimeout(checkChaki, 1000);
		return;
	}

	var validation = 0;
	var extraChaki = 0;

	frame.targetPoints = [];
	var targetPoints = frame.targetPoints;
	for (var i = 0; i < frame.chaki.teaSets.length; i++) {
		var multiplier = (i == frame.chaki.teaSets.length - 1) ? 5 : 3;
		var required = Math.min(frame.chaki.teaSets[i], Math.max(Math.ceil(500 - frame.chaki.friendlyPoints[i]), 0));
		targetPoints[i] = required * multiplier + frame.chaki.friendlyPoints[i];
		extraChaki += (frame.chaki.teaSets[i] - required);
		validation += targetPoints[i];
	};

	if (!validation) {
		frame.setTimeout(checkChaki, 1000);
		return false;
	}

	targetPoints[targetPoints.length - 1] += extraChaki;
	var me = frame.player.myData;
	frame.console.log("远征. " + me.lordName + ". 茶器数: " + frame.chaki.teaSets);
	frame.console.log("远征. " + me.lordName + ". 当前友好度: " + frame.chaki.friendlyPoints);
	frame.console.log("远征. " + me.lordName + ". " + playerList[playerIndex] + ". 目标友好度: " + targetPoints);

	frame.doRecover = false;
	var threshold = 500;
	if (targetPoints[0] > 500
		&& targetPoints[1] > 500
		&& targetPoints[2] > 500
		&& targetPoints[targetPoints.length - 1] < threshold)
	{
		var diff = 0;
		if (targetPoints[targetPoints.length - 1] - 200 < 0) {
			diff = 200 - targetPoints[targetPoints.length - 1]
		}
		else if (targetPoints[targetPoints.length - 1] - 300 < 0) {
			diff = 300 - targetPoints[targetPoints.length - 1];
		}
		else if (targetPoints[targetPoints.length - 1] - 400 < 0) {
			diff = 400 - targetPoints[targetPoints.length - 1];
		}
		else if (targetPoints[targetPoints.length - 1] - threshold < 0) {
			diff = threshold - targetPoints[targetPoints.length - 1];
		}

		frame.doRecover = true;
		frame.recoverNeeded = ((diff / 7) >> 0) + 1;
		frame.console.log("远征. " + me.lordName + ". 需要远征饭: " + frame.recoverNeeded);
	}

	return true;
};

var autoExpedition = function(frame)
{
	var recover = function() {
		frame.location="http://mn.mobcast.jp/mn/#/shop/recover?"+Math.random();
		var checkRecover = function() {
			var recover = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.buyRecover != "undefined"; });
			if (!recover) {
				frame.setTimeout(checkRecover, 2000);
				return;
			}

			frame.console.log("远征. " + frame.player.myData.lordName + ". 当前远征饭: " + recover.recoverItem);
			if (recover.recoverItem >= frame.recoverNeeded - 1) {
				recover.buyRecover("item");
				frame.setTimeout(getChakiPoints, 4000);				
			}
			else {
				callForNextPlayer(frame);
			}
		}; frame.setTimeout(checkRecover, 2000);
	};

	var doChallenge = function() {
 		if (!frame.expedition)
 		{
 			return {"continue":false, "index":-1};
 		}

 		if (frame.expedition.stamina == 0)
 		{
 			if (frame.doRecover)
 			{
 				recover();
 				return;
 			}
 		 	return {"continue":false, "index":-1};	
 		}

		for (var index = 0; index <  frame.expedition.matchList.length - 1; ++index)
		{
			var me = frame.player.myData;
			var opponent = frame.expedition.matchList[index];

			// result. 0: won, 1: lost, 3: not done yet
			if (opponent.result > 1)
			{
				var threatDegree = (opponent.threatDegree == 1) ? " 强敌":" 普通";
				// if (frame.targetPoints[opponent.eventItemId] > 500 && opponent.threatDegree != 1) {
				// 	continue;
				// }
				// else if (opponent.eventItemId == 3) {
				// 	frame.console.log("远征. " + me.lordName+". 名茶!: "+me.rank+" vs "+opponent.vsPlayerName+threatDegree+" lvl "+opponent.vsRank+" 活动物品: "+opponent.eventItemId);
				// }
				// else
				if ((opponent.vsRank > 10 && (opponent.vsRank > me.rank + 1))
						 ||(opponent.vsRank > 15 && (opponent.vsRank > me.rank)))
				{
					frame.console.log("远征. " + me.lordName+". 跳过: "+me.rank+" vs "+opponent.vsPlayerName+threatDegree+" lvl "+opponent.vsRank+" 活动物品: "+opponent.eventItemId);
					continue;
				}
				else if (opponent.vsRank - me.rank > 5)
				{
					frame.console.log("远征. " + me.lordName+". 跳过: "+me.rank+" vs "+opponent.vsPlayerName+threatDegree+" lvl "+opponent.vsRank+" 活动物品: "+opponent.eventItemId);
					continue;
				}

				frame.expedition.stamina -= 1;
				opponent.result = -2;
				frame.expedition.challenge(opponent.vsPlayerId);
				return {"continue":true, "index":index};
			}
		}
		frame.console.log("远征. " + me.lordName+". 更新!");
		frame.expedition.listUpAgain();
		return {"continue":true, "index":-1};
	};

	var recordChallengeResult = function (index) {
		var expedition = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.stamina != "undefined"; });
		if (!expedition)
			return;

		var me = frame.player.myData;
		var op = expedition.matchList[index];
		var result = (op.round1stResult + op.round2ndResult + op.round3rdResult);
		var resultStr = ". 结果: "+(3-result)+"胜"+result+"负";
		var threatDegreeStr = (op.threatDegree == 1) ? " 强敌":" 普通";
		var eventStr = ". 活动物品: " + op.eventItemId;
		frame.console.log("远征. " + me.lordName + ". 进行: " + me.rank + " vs " + op.vsPlayerName + threatDegreeStr + " lvl " + op.vsRank + resultStr + eventStr);
	};

	var startChallenge = function() {
		frame.setTimeout(function() {
	    	frame.expedition.listUp();
		}, 1000);
		frame.setTimeout(function () {
			var result = doChallenge();
			if (result["continue"]) {
				// Arrange the next expedition
				frame.setTimeout(locateExpedition, 2000);
				var index = result["index"];
				if (index > -1)
					frame.setTimeout(function () {
						recordChallengeResult(index);
					}, 6000);
			}
			else {
				callForNextPlayer(frame, 6000);
			}
		}, 2000);
	};

	var doLocateExpedition = function() {
	    frame.expedition = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.stamina != "undefined"; });
	    if (frame.expedition == null) {
			var movie = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.movieEnd != "undefined"; });
			if (movie != null) {
				frame.console.log("Find expedition movie!");
				frame.setTimeout(function () {
					movie.tap();
				}, 7000);
				frame.setTimeout(locateExpedition, 9000);
			}
			else {
				frame.setTimeout(doLocateExpedition, 2000);
			}
	    }
	    else {
	    	startChallenge();
	    }
	};

	var locateExpedition = function() {
		frame.location="http://mn.mobcast.jp/mn/#/expedition?"+Math.random();
		frame.setTimeout(doLocateExpedition, 2000);
	};

	var getChakiPoints = function() {
		frame.location = "http://mn.mobcast.jp/mn/#/event/chaki/award";
		frame.setTimeout(function() {
			frame.chaki = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.friendlyPoints != "undefined"; });
			if (frame.chaki == null || !checkChaki(frame)) {
				var movie = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.movieEnd != "undefined"; });
				if (movie != null)
					frame.setTimeout(locateExpedition, 1000);
				else
					frame.setTimeout(getChakiPoints, 1000);
				return;
			}

			frame.setTimeout(locateExpedition, 2000);
		}, 3000);
	};

	frame.rootScope = frame.angular.element(frame.document.getElementsByTagName('body')[0]).scope();
	if (!frame.rootScope)
		return;

	var checkPlayer = function() {
		frame.player = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.myData != "undefined"; });
		if (!frame.player) {
			frame.console.log("Checking player for expedition...");
			frame.setTimeout(checkPlayer, 2000);
			return;
		}
		else {
			frame.console.log("远征. " + playerList[playerIndex]);
			frame.setTimeout(locateExpedition, 3000);
		}
	}; frame.setTimeout(checkPlayer, 2000);
};

var collectChakiAward = function(frame) {
	var collectChaki = function() {
		var chaki = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.friendlyPoints != "undefined"; });

		for (var i = 0; i < chaki.teaSets.length; i++) {
			if (chaki.teaSets[i] > 0 && chaki.friendlyPoints[i] < 500) {
				var count = 0;
				var multiplier = (i == chaki.teaSets.length - 1) ? 5 : 3;

				if (chaki.teaSets[i] >= 5)
					count = 5;
				else if (chaki.teaSets[i] >= 3)
					count = 3;
				else if (chaki.teaSets[i] >= 1)
					count = 1;

				while (count > 1 && (chaki.friendlyPoints[i] + count * multiplier > 500 + multiplier)) {
					count -= 2;
				}

				chaki.currentIndex = i;
				chaki.present(i, count);

				frame.setTimeout(tryCheckChaki, 1000);
				return;
			}
		};

		if (chaki.friendlyPoints[0] > 500 && chaki.friendlyPoints[1] > 500 && chaki.friendlyPoints[2] > 500)
		{
			if (chaki.friendlyPoints[3] < 500)
			{
				for (var i = 0; i < chaki.teaSets.length; i++) {
					if (chaki.teaSets[i] > 0) {
						var count = 0;
						if (chaki.teaSets[i] >= 5)
							count = 5;
						else if (chaki.teaSets[i] >= 3)
							count = 3;
						else if (chaki.teaSets[i] >= 1)
							count = 1;

						chaki.currentIndex = 3;
						chaki.present(i, count);

						frame.setTimeout(tryCheckChaki, 1000);
						return;
					}
				}
			}
		}
		callForNextPlayer(frame, 4000);
	};

	var tryCheckChaki = function() {
		frame.location = "http://mn.mobcast.jp/mn/#/event/chaki/award";
		frame.setTimeout(function() {
			var chaki = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.friendlyPoints != "undefined"; });
			if (chaki == null || !checkChaki(frame)) {
				frame.setTimeout(tryCheckChaki, 1000);
				return;
			}

			collectChaki();
		}, 2000);
	};

	var checkPlayer = function() {
		frame.player = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.myData != "undefined"; });
		if (!frame.player) {
			frame.console.log("Checking player for expedition...");
			frame.setTimeout(checkPlayer, 2000);
			return;
		}
		else {
			frame.console.log("远征. " + playerList[playerIndex]);
			frame.setTimeout(tryCheckChaki, 1000);
		}
	};

	frame.rootScope = frame.angular.element(frame.document.getElementsByTagName('body')[0]).scope();
	if (frame.rootScope)
		frame.setTimeout(checkPlayer, 2000);
};

var getSeriesData = function(frame, log) {
	var resource = 0;
	var results = [0, 0, 0];
	var getData = function() {
		var series = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.seriesList != "undefined"; });
		if (!series) {
			frame.setTimeout(getData, 2000);
			return;
		}

		// if (series.seriesList.length == 0 && series.day > 0) {
		// if (series.day != 1) {
		if (series.seriesList.length != 5 && series.day > 0) {
			var days = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.previousDay != "undefined"; });
			days.previousDay();
			days.$apply();
			frame.setTimeout(getData, 2000);
			return;
		}

		for (var i = 0; i < series.seriesList.length; i++) {
			var item = series.seriesList[i];
			if (!item.finished)
				continue;

			resource += item.ownerResourcesSwing;
			results[item.round1stResult] += 1;
			results[item.round2ndResult] += 1;
			results[item.round3rdResult] += 1;
		}

		log += ";胜:" + sprintf("%02.0f",results[0]) + ";平:" + sprintf("%02.0f",results[2]) + ";负:" + sprintf("%02.0f",results[1]);
		log += ";石:" + resource;

		getFormationData(frame, log);
	}
	frame.location = "http://mn.mobcast.jp/mn/#/war/match?"+Math.random();
	frame.setTimeout(getData, 2000);
};


var getConquestInfo = function(frame, log)
{
	var checkConquest = function() {
		var conquest = findChildScope(getRootScope(frame), function(childscope) { return typeof childscope.gotoPageCountry!= "undefined"; });
		if (!conquest || !conquest.apiResultData || !conquest.apiResultData.data) {
			frame.console.log("Checking conquest...");
			frame.setTimeout(checkConquest, 1000);
			return;
		}

		var conquestData = conquest.apiResultData.data;
		var str = sprintf("进军:%02.0f",conquestData.matchCountryId|0) + conquestData.matchCountryName;

		var resources = 0;
		var cities = conquestData.countryDataMap["COUNTRY_"+conquestData.matchCountryId].castleDataList;
		for (var i = 0; i < cities.length; i++) {
			resources += cities[i].resources;
		};
		str += ";余额:"+(((conquestData.regularResources - resources)/10000)>>0)+"石.当前:"+((conquestData.regularResources/10000)>>0)+"石.所需:"+((resources/10000)>>0)+"石.";
		if (log) {
			log += ";"+str;
		}
		else {
			frame.console.log("" + playerIndex + ";" + playerList[playerIndex] + str);
		}

		callForNextPlayer(frame);
	};

	frame.location = "http://mn.mobcast.jp/mn/#/conquest/conquest";
	frame.setTimeout(checkConquest, 1000);
};

var leaderBonusRecord = {};
var getPoliticsData = function(frame, log) {
	var url = "http://mn.mobcast.jp/mn/#/organize/general";
	frame.location = url;

	var checkPolitics = function() {
		var teamData = findChildScope(frame.rootScope, function(childscope) {
			return typeof childscope.tapOkButton != "undefined" &&
				   typeof childscope.generalTap != "undefined" &&
				   typeof childscope.abilityEntity != "undefined";
		});

		if (!teamData) {
			frame.setTimeout(checkPolitics, 2000);
			return;
		}

		var politics = [teamData.abilityEntity.politics1|0
					   ,teamData.abilityEntity.politics2|0
					   ,teamData.abilityEntity.politics3|0];
		for (var i = 0; i < politics.length; i ++)
		{
			for (j = 1; j < politics.length - i; j ++)
			{
				if (politics [j-1] > politics [j])
				{
					var t = politics [j-1];
					politics [j-1] = politics [j];
					politics [j] = t;
				}
			}
		}
		log += ";内政:"+politics[0]+"|"+politics[1]+"|"+politics[2];

		log += ";阵:"+teamData.formationData.bean.formationName
				+ ";剩余:" + (teamData.abilityEntity.maxCost - teamData.abilityEntity.cost)
				+ ";统:" + teamData.abilityEntity.leaderships + "|"
				+ "攻:" + teamData.abilityEntity.offenses + "|"
				+ "防:" + teamData.abilityEntity.defenses + "|"
				+ "知:" + teamData.abilityEntity.wisdoms;

		// playerGeneralCard.leaderBonusParam.{leadership: 0, offense: 0, defense: 0, wisdom: 12, politics: 0}
		// playerGeneralSeasonRecord.bean Object drawn: 2games: 24guideDrawn: 0guideGames: 0guideLost: 0
		// guideWon: 0id: Objectleague: 173005lost: 1 rankingAttackDamage: 11rankingKnockDown: 29
		// rankingSoldier: totalAttack: totalAttackCritical: totalAttackDamage: totalAttackTip: totalDead: totalDefense: 39
		// totalDefenseCritical: totalDefenseDamage: totalDefenseTip: totalKnockDown: totalSkill: totalSoldier: won: world: 17
		// var politicsStr = "";
		// var expiredPolitics = 0;
		// for (var i = 7; i < 10; ++i)
		// {
		// 	var card = teamData.generalList.generalcards[teamData.positionArray.list[i]]
		// 	var curSeason = card.playerGeneralCard.bean.season + 1;
		// 	var seasonData = card.generalCard.bean.peaks.split(',');
		// 	if (!seasonData[curSeason] || seasonData[curSeason] == "2")
		// 	{
		// 		recordCard(card, season, frame.playerInfo.topOnBench);
		// 		++expiredPolitics;
		// 		politicsStr += card.generalCard.bean.cardName + ":"+curSeason+"期|";
		// 	}
		// }; log += ";过期内政:"+expiredPolitics+";" + "<font color='red'><b>" + politicsStr + "</b></font>";

		for (var i = 0; i < teamData.positionArray.list.length; i++) {
			var card = teamData.generalList.generalcards[teamData.positionArray.list[i]];
			if (leaderBonusRecord[teamData.positionArray.list[i]])
				continue;

			var rank = (card.generalCard.bean.cardRank|0)+1;
			var leaderBonus = "大将. " + card.generalCard.bean.cardName + rank + ". "
									   + teamData.positionArray.list[i] + ". "
									   + "统." + card.playerGeneralCard.leaderBonusParam.leadership + ". "
									   + "攻." + card.playerGeneralCard.leaderBonusParam.offense + ". "
									   + "防." + card.playerGeneralCard.leaderBonusParam.defense + ". "
									   + "知." + card.playerGeneralCard.leaderBonusParam.wisdom + ". ";
			frame.console.log(leaderBonus);

			var getSeasonString = function(seasonData) {
				var seasonType = "";
				if (seasonData[2] == "1") {
					seasonType = "1早";
				}
				else if (seasonData[4] == "1") {
					if (seasonData[5] == "2")
						seasonType = "2普";
					else
						seasonType = "4长";
				}
				else if (seasonData[6] == "1") {
					seasonType = "3晚";
				}
				return seasonType+";";
			};
			var seasonData = card.generalCard.bean.peaks.split(',');
			frame.console.log(""+rank+";card.bean.generalCardId == "+teamData.positionArray.list[i]+" // Name: "+card.generalCard.bean.cardName+rank + ";"
								+ getSeasonString(seasonData)
								+ "价;" + card.generalCard.bean.cost + ";"
								+ "政;" + card.generalCard.generalCardSeasonList[0].politics + ";"
								+ "统;" + card.generalCard.generalCardSeasonList[0].leadership + ";"
								+ "攻;" + card.generalCard.generalCardSeasonList[0].offense + ";"
								+ "防;" + card.generalCard.generalCardSeasonList[0].defense + ";"
								+ "知;" + card.generalCard.generalCardSeasonList[0].wisdom + ";"
								+ "武;" + card.generalCard.armName + ";" + card.generalCard.bean.armType
							 );

			leaderBonusRecord[teamData.positionArray.list[i]] = leaderBonus;
		};

		var subtitudePolitics = 0;
		var expiredCardOnDuty = 0;
		var expiredCardBench = 0;
		var strExpiringCardOnDuty = "";
		var strExpiringCardBench = "";
		var strPoliticsCandidate = "";
		var strBenchGoldCard = "";

		var recordCard = function(card, season, list) {
			var data = {"name":card.generalCard.bean.cardName,"rank":card.generalCard.bean.cardRank,"season":season+1}
			list.push(data);
		};

		var logExpiredCard = function(index, card, season, seasonData, record) {
			if (season < 10 && seasonData[season] == "2")
			{
				if (index < 7) {
					recordCard(card, season, record.duty);
				}
				else if (i > 9) {
					recordCard(card, season, record.bench);
				}
			}
		};

		var initCardInfo = function() {
			frame.playerInfo.droppable = [];
			frame.playerInfo.topOnBench = [];
			frame.playerInfo.goldOn = [];
			frame.playerInfo.goldOff = [];
			frame.playerInfo.cur.politics = [];
			frame.playerInfo.cur.politics.name = "内政即将过期";
			frame.playerInfo.cur = [];
			frame.playerInfo.cur.duty = [];
			frame.playerInfo.cur.bench = [];
			frame.playerInfo.nxt = [];
			frame.playerInfo.nxt.duty = [];
			frame.playerInfo.nxt.bench = [];
			frame.playerInfo.nxt.politics = [];
		}; initCardInfo();

		var sep = "合战;"+ getTodayString() + ";" + playerIndex + "." + playerList[playerIndex] + ";";
		for (var i = 0; i < teamData.positionArray.list.length; i++)
		{
			var card = teamData.generalList.generalcards[teamData.positionArray.list[i]];
			if (card.playerGeneralSeasonRecord && card.playerGeneralSeasonRecord.bean.totalAttackDamage)
			{
				var bean = card.playerGeneralSeasonRecord.bean;
				var rank = (card.generalCard.bean.cardRank|0)+1;
				var season = (card.playerGeneralCard.bean.season|0)+ 1;
				var cost = card.playerGeneralCard.bean.cost;
				var record = sep + card.generalCard.bean.cardName +rank+";"+rank+";消耗;"+cost+";"
								 + teamData.positionArray.list[i]+";"+season+"期"
								 + ";位置;" + ((i|0)+1)
								 + ";参战;" + bean.games + ";均伤;" + ((bean.totalAttackDamage/bean.games)>>0)
								 + ";击败;" + bean.totalKnockDown + ";溃退;" + bean.totalDead
								 + ";攻击;" + bean.totalAttack + ";暴击;" + bean.totalAttackCritical + ";特技;" + bean.totalSkill
								 + ";总伤害;" + bean.totalAttackDamage + ";单次伤害;" + ((bean.totalAttackDamage / bean.totalAttack) >> 0)
								 + ";格挡;" + bean.totalDefenseCritical
								 + ";总损失;" + bean.totalDefenseDamage + ";总防御;" + bean.totalDefense + ";单次防御;" + ((bean.totalDefenseDamage / bean.totalDefense) >> 0)
							;
				frame.console.log(record);
			}

			var seasonData = card.generalCard.bean.peaks.split(',');
			var season = card.playerGeneralCard.bean.season;

			if (i >= 7 && i < 10)
			{
				if (!seasonData[season+1] || seasonData[season+1] == "2")
				{
					recordCard(card, season, frame.playerInfo.cur.politics);
					// ++expiredPolitics;
					// politicsStr += card.generalCard.bean.cardName + ":"+curSeason+"期|";
				}
			}

			if (isCrappyCard(card.generalCard)) {
				recordCard(card, season, frame.playerInfo.droppable);
			}
			else if (season < 10 && seasonData[season] == "2" && !noDropCard(card.generalCard)) {
				recordCard(card, season, frame.playerInfo.droppable);
			}
			else if (season < 9 && seasonData[season + 1] == "2" && i > 9 && !noDropCard(card.generalCard)) {
				recordCard(card, season, frame.playerInfo.droppable);
			}

			logExpiredCard(i, card, season, seasonData, frame.playerInfo.cur);
			logExpiredCard(i, card, season + 1, seasonData, frame.playerInfo.nxt);

			if (card.generalCard.bean.cardRank >=3)
			{
				var data = {"name":card.generalCard.bean.cardName,"rank":card.generalCard.bean.cardRank,"season":season+1,"onduty":(i < 10)
						   ,"expired":(season < 10 && seasonData[season] == "2")};
				if (i < 10)
					frame.playerInfo.goldOn.push(data);
				else
					frame.playerInfo.goldOff.push(data);					
			}

			if (i > 9) {
				var season = card.playerGeneralCard.bean.season + 1;
				var politicses = card.generalCard.bean.politicses.split(',');
				if ((isHighPolitics(card.generalCard) || isMediumPolitics(card.generalCard)) && politicses[season] > politics[0]) {
					recordCard(card, season, frame.playerInfo.nxt.politics);
				}

				if ((shouldAlwaysOn(card.generalCard) || isTopClassCard(card.generalCard)) && (season >= 9 || seasonData[season] != "2"))
				{
					recordCard(card, season, frame.playerInfo.topOnBench);
				}
			}
		}

		log += ";" + (frame.playerInfo.normalText("当前参战过期", frame.playerInfo.cur.duty));
		log += ";" + (frame.playerInfo.normalText("替补强将", frame.playerInfo.topOnBench));
		log += ";" + (frame.playerInfo.normalText("替补内政", frame.playerInfo.nxt.politics));
		log += ";" + (frame.playerInfo.normalText(frame.playerInfo.cur.politics.name, frame.playerInfo.cur.politics));
		log += ";" + (frame.playerInfo.normalText("参战即将过期", frame.playerInfo.nxt.duty));
		log += ";" + (frame.playerInfo.normalText("当前替补过期", frame.playerInfo.cur.bench));
		log += ";" + (frame.playerInfo.normalText("替补即将过期", frame.playerInfo.nxt.bench));
		log += ";" + (frame.playerInfo.normalText("可替换武将", frame.playerInfo.droppable));
		log += ";" + (frame.playerInfo.normalText("四星参战", frame.playerInfo.goldOn));
		log += ";" + (frame.playerInfo.normalText("四星替补", frame.playerInfo.goldOff));

		// logout
		frame.logDone = true; frame.logtxt = log;
		frame.location = "http://mn.mobcast.jp/mn/#";
	}; frame.setTimeout(checkPolitics, 2000);
};

var getFormationData = function(frame, log)
{
	var checkFormation = function() {
		var formation = findChildScope(frame.rootScope, function(childscope) {
			return typeof childscope.walletData != "undefined" &&
				   typeof childscope.getTopPageDisplayFormationItems != "undefined";
		});

		if (!formation || !formation.walletData ||
			!(formation.walletData.gameGold + formation.walletData.portalGold + formation.walletData.bonusPoint))
		{
			frame.setTimeout(checkFormation, 2000);
			return;
		}

		var totalGold = formation.walletData.gameGold + formation.walletData.portalGold;
		log += ";Money:" + sprintf("%03.0f", totalGold) +":Point:" + formation.walletData.point;

		var formationList = formation.getTopPageDisplayFormationItems();
		var formationStr = "";
		for (var i = 0; i < formationList.length; i++) {
			var fo = formationList[i];
			var fcard = fo.formationCard;
			if (fo.soldOut || fo.pricePoint < 0)
				continue;
			formationStr += " 阵型:"+fcard.bean.formationName
							+".统" + fcard.bean.bonusLeadership * 7
							+".攻" + fcard.bean.bonusOffense * 7
							+".防" + fcard.bean.bonusDefense * 7
							+".知" + fcard.bean.bonusWisdom * 7;
		};
		log += ";Formation:" + formationStr;

		getPoliticsData(frame, log);
	}

	frame.location = "http://mn.mobcast.jp/mn/#/shop/formation";
	frame.setTimeout(checkFormation, 2000);
};

var getRankingData = function(frame, log) {
	var checkRanking = function() {
		var ranking = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.switchToLastSeason != "undefined"; });
		if (!ranking || !ranking.rankings.league) {
			frame.setTimeout(checkRanking, 2000);
			return;
		}

		for (var i = 0; i < ranking.rankings.league.length; i++) {
			var item = ranking.rankings.league[i];
			if (item.playerid == ranking.userID) {
				var str = sprintf("排名:%02.0f;%02.0f胜|%02.0f平|%02.0f负",
								  (item.ranking + 1), item.won, item.drawn, item.lost);
				log += ";" + str;
				log += ";" + ((item.resources/10000)|0) + "万石";

				getSeriesData(frame, log);
				return;
			}
		}
	}

	frame.location = "http://mn.mobcast.jp/mn/#/war/ranking";
	frame.setTimeout(checkRanking, 2000);
}

	var c_yellowPre = "<font color='#FF00FF'><b>";
	var c_yellowSuf = "</b></font>";
	var c_redPre = "<font color='red'><b>";
	var c_redSuf = "</b></font>";
	var infoStr = function(item, markup) {
		var str = item.name+((item.rank|0)+1)+":"+item.season+"期|";
		if (markup)
			str = item.rank > 2 ? (c_yellowPre+str+c_yellowSuf) : (c_redPre+str+c_redSuf);
		return str;
	};
	var appendLog = function(text, logArea) {
		var node = document.createElement('div');
		var content = document.createElement('span');
		content.innerHTML = text;
		node.appendChild(content);
		logArea.appendChild(node);
	};
	var addCategoryBase = function(name, items, markup) {
		var count = markup ? (c_redPre+items.length+c_redSuf) : items.length;
		var str = name+":"+count+";";
		for (var i = 0; i < items.length; i++) {
			str += infoStr(items[i], markup);
		};
		return str;
	};
	var addCategoryHtml = function(name, items) {
		return addCategoryBase(name, items, true);
	};
	var addCategoryNormal = function(name, items) {
		return addCategoryBase(name, items, false);
	};

var logOutInfo = function(frame, logFn) {
	// todo: expired politics and potential replacement, expired generals
	frame.logtxt = "Info;" + playerIndex + ";" + playerList[playerIndex];

	var checkPlayer = function() {
		frame.player = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.myData != "undefined"; });
		if (!frame.player || !frame.player.myData || !frame.player.myData.presentBoxCount) {
			frame.setTimeout(checkPlayer, 2000);
			return;
		}
		else {
			frame.logtxt += ";" + frame.player.myData.division + frame.player.myData.leagueName;
			frame.logtxt += ";奖励:" + sprintf("%03.0f", frame.player.myData.presentBoxCount);

			getRankingData(frame, frame.logtxt);
		}
	};

	var doLog = function() {
		if (!frame.logDone) {
			frame.setTimeout(doLog, 1000);
			return;
		}

		if (logFn)
			logFn(frame, frame.logtxt);
		else
			frame.console.log(frame.logtxt);
		callForNextPlayer(frame);
	}

	frame.rootScope = frame.angular.element(frame.document.getElementsByTagName('body')[0]).scope();
	frame.setTimeout(checkPlayer, 2000);

	frame.logDone = false;
	frame.playerInfo = [];
	frame.playerInfo.normalText = addCategoryNormal;

	doLog();
}

var collectCityData = function() {
	doStartInterval(getConquestInfo, function(){advancePlayerBy(1)});
};

var gatherInfo = function()
{
	// 进攻国, 相差石数
	var logFn = function(frame, str) {
		var logArea = document.createElement('div');
		logArea.id = "logContent";
		document.getElementById("log").appendChild(logArea);
		logArea = document.getElementById("logContent");

		var logList = str.split(';');
		appendLog(logList[3]+";"+logList[4], logArea);
		appendLog(logList[5]+";"+logList[6]+";"+logList[7], logArea);
		appendLog("今日:"+logList[8]+";"+logList[9]+";"+logList[10]+";"+logList[11], logArea);
		appendLog(logList[12], logArea); // money
		appendLog(logList[15]+";"+logList[16], logArea);
		appendLog(logList[14], logArea); // politics
		appendLog(logList[17], logArea); // formation stats

		appendLog(addCategoryHtml("当前参战过期", frame.playerInfo.cur.duty), logArea);
		appendLog(addCategoryHtml("替补强将", frame.playerInfo.topOnBench), logArea);
		appendLog(addCategoryHtml(frame.playerInfo.cur.politics.name, frame.playerInfo.cur.politics), logArea);
		appendLog(addCategoryHtml("参战即将过期", frame.playerInfo.nxt.duty), logArea);
		appendLog(addCategoryHtml("当前替补过期", frame.playerInfo.cur.bench), logArea);
		appendLog(addCategoryHtml("替补即将过期", frame.playerInfo.nxt.bench), logArea);
		appendLog(addCategoryHtml("替补内政", frame.playerInfo.nxt.politics), logArea);
		appendLog(addCategoryHtml("可替换武将", frame.playerInfo.droppable), logArea);
		appendLog(addCategoryHtml("四星参战", frame.playerInfo.goldOn), logArea);
		appendLog(addCategoryHtml("四星替补", frame.playerInfo.goldOff), logArea);
	};

	var frame = getFrame();
	frame.playerInfo = [];
	frame.playerInfo.normalText = addCategoryNormal;

	var logArea = document.getElementById("logContent");
	if (logArea)
		logArea.remove();

	logOutInfo(frame, logFn);
}

var politics = [-1, -1, -1];
var findOpponent = function(frame) {
	frame.console.log("Formation. " + playerList[playerIndex]);
	frame.rootScope = frame.angular.element(frame.document.getElementsByTagName('body')[0]).scope();
	frame.location = "http://mn.mobcast.jp/mn/#/war/match?"+Math.random();

	var getOpponent = function() {
		var series = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.seriesList != "undefined"; });
		if (!series) {
			frame.setTimeout(getOpponent, 2000);
			return;
		}

		for (var i = 0; i < series.seriesList.length; i++) {
			var item = series.seriesList[i];
			if (!item.finished)
				break;
		}

		if (!item.finished) {
			var day = (item.turn / 5) >> 0;
			var turn = item.turn % 5;
			day += 1;
			turn += 1;
			frame.console.log("Formation. "+series.divName+". Day: "+day+", Turn: "+turn);

			var url = "http://mn.mobcast.jp/mn/#/team_data?userID=" + item.vsPlayerId;
			var openOpponentInfo = function() {
				var teamData = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.abilityEntity != "undefined"; });
				if (!teamData) {
					frame.location = url;
					frame.setTimeout(openOpponentInfo, 2000);
				}
				else {
					getOpponentPolitics(frame);
				}
			}; frame.setTimeout(openOpponentInfo, 2000);
		}
		else {
			callForNextPlayer(frame);
		}
	}; frame.setTimeout(getOpponent, 2000);
};

var getOpponentPolitics = function(frame) {
	if (!frame.rootScope)
		return;

	var teamData = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.abilityEntity != "undefined"; });
	politics[0] = teamData.abilityEntity.politics1;
	politics[1] = teamData.abilityEntity.politics2;
	politics[2] = teamData.abilityEntity.politics3;

	frame.console.log("Formation. Opponent politics: ["+politics+"]");

	gotoFormation(frame);
};

var gotoFormation = function(frame) {
	var url = "http://mn.mobcast.jp/mn/#/organize/general";
	frame.location = url;

	var checkFormation = function() {
		var teamData = findChildScope(frame.rootScope, function(childscope) {
			return typeof childscope.tapOkButton != "undefined" &&
				   typeof childscope.generalTap != "undefined" &&
				   typeof childscope.abilityEntity != "undefined";
		});
		if (!teamData)
			frame.setTimeout(checkFormation, 2000);
		else
			makeFormation(frame);
	}; frame.setTimeout(checkFormation, 2000);
};

var makeFormation = function(frame) {
	var DoSwap = function(src, dst, index) {
		var src1 = src + 7;
		var dst1 = dst + 7;
		frame.setTimeout(function() {
			frame.console.log("src: "+src1+". dst: "+dst1);
			teamData.generalTap(src1);
			teamData.generalTap(src1);
			teamData.generalTap(dst1);
			teamData.generalTap(dst1);
		}, index * 2000);
	};

	var getOrder = function(data) {
		// make sure no number is equal to any of the others
		for (var i = 0; i < data.length; i++) {
			data[i] = data[i] * data.length + i;
		}

		var ret = [0, 0, 0];
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < data.length; j++) {
				if (i != j)
					ret[i] += (data[i] - data[j] > 0) ? 1 : 0;
			}
		}
		return ret;
	};

	var teamData = findChildScope(frame.rootScope, function(childscope) {
		return typeof childscope.tapOkButton != "undefined" &&
			   typeof childscope.generalTap != "undefined" &&
			   typeof childscope.abilityEntity != "undefined";
	});
	var dstData = [];
	dstData[0] = teamData.abilityEntity.politics1|0;
	dstData[1] = teamData.abilityEntity.politics2|0;
	dstData[2] = teamData.abilityEntity.politics3|0;
	frame.console.log("Formation. Player politics: ["+dstData+"]");
	if (Math.abs(dstData[0] - dstData[1]) < 8
		&& Math.abs(dstData[0] - dstData[2]) < 8
		&& Math.abs(dstData[1] - dstData[2]) < 8)
	{
		frame.console.log("Formation. No Need!!!");		
		callForNextPlayer(frame);
		return;
	}

	var orderSrc = getOrder(politics);
	var orderDst = getOrder(dstData);
	frame.console.log("Formation. OrderSrc: " + orderSrc);
	frame.console.log("Formation. OrderDst: " + orderDst);

	var index = 0;
	for (var i = 0; i < orderDst.length; i ++)
	{
		for (j = 1; j < orderDst.length - i; j ++)
		{
			if (orderDst [j-1] > orderDst [j])
			{
				var t = orderDst [j-1];
				orderDst [j-1] = orderDst [j];
				orderDst [j] = t;
				DoSwap (j, j-1, index++);
			}
		}
	}
	var stack = [];
	for (var i = 0; i < orderSrc.length; i ++)
	{
		for (j = 0; j < orderSrc.length - i; j ++)
		{
			if (orderSrc [j-1] > orderSrc [j])
			{
				var t = orderSrc [j-1];
				orderSrc [j-1] = orderSrc [j];
				orderSrc [j] = t;
				stack [stack.length] = j;
			}
		}
	}
	for (var i = stack.length-1; i >= 0; i --)
	{
		DoSwap (stack[i], stack[i]-1, index++);
	}

	frame.setTimeout(function() {
		frame.console.log("Formation. Result: [" + teamData.abilityEntity.politics1 + ", "
										   + teamData.abilityEntity.politics2 + ", "
										   + teamData.abilityEntity.politics3 + "]");
		teamData.tapOkButton();
		callForNextPlayer(frame);
	}, index * 2000);
};

var autoLogin = function(frame, nextLogin)
{
	var email = playerList[playerIndex];
	frame.$("input[name='email']").val(email);

	if ((new String(email)).indexOf("dum") == 0)
		frame.$("input[name='password']").val("1783882");
	else
		frame.$("input[name='password']").val(password);

	frame.document.getElementById("login").submit();
};

var callForNextPlayer = function(frame, timeout) {
	frame.setTimeout(function() {
		readyForNext = true;
	}, timeout ? timeout : 1000);
};

var autoPlay = function(nextLogin, fn, playerCB) {
	var logArea = document.getElementById("logContent");
	if (logArea)
		logArea.remove();

	document.getElementById('playerIndex').value = playerIndex;
	document.getElementById('userid').innerText = playerIndex;
	document.getElementById('username').innerText = playerList[playerIndex];

	var game = createGame(loginURL);

	var checkLogin = function() {
		game = document.getElementById("game");
		var frame = game.contentWindow;
		if (!frame || !frame.$ || !frame.$("input[name='email']") || !frame.$("input[name='password']") || !frame.document.getElementById("login")) {
			window.console.log("Checking login status...");
			window.setTimeout(checkLogin, 1000);			
		}
		else {
			autoLogin(game.contentWindow);
		}
	};	window.setTimeout(checkLogin, 1000 * timeRatio);

	var checkGame = function() {
		game = document.getElementById("game");
		var frame = game.contentWindow;
		if (!frame || !frame.document || !frame.document.getElementsByTagName('body')[0] ||
			!frame.angular || !frame.angular.element(frame.document.getElementsByTagName('body')[0]).scope()) {
			window.console.log("Checking game status...");
			window.setTimeout(checkGame, 2000);
		}
		else {
			game.contentWindow.alert = function(msg) { frame.console.log("Redirect alert. "+msg); };
			game.contentWindow.playerTag = "" + playerIndex + ";" + playerList[playerIndex];
			frame.rootScope = frame.angular.element(frame.document.getElementsByTagName('body')[0]).scope();
			fn(game.contentWindow);
		}
	};

	if (fn) {
		window.setTimeout(checkGame, 3000 * timeRatio);
	}

	if (nextLogin && nextLogin > 0)
	{
		window.setTimeout(function() {
			if (playerCB)
				playerCB();
			// ++playerIndex;
			// if (playerIndex == playerList.length)
			// 	playerIndex = 0;
			autoPlay(nextLogin, fn, playerCB);
		}, nextLogin);
	}
};

var advancePlayerBy = function(step)
{
	if (step)
		++playerIndex;
	else
		playerIndex += step;

	if ((endPlayer != -1 && playerIndex == endPlayer) ||
		playerIndex == playerList.length)
	{
		playerIndex = startPlayer;		
	}
}

var startInterval = 0;
var doStartInterval = function(fn, cb, config) {
	if (!playerList || playerList.length == 0)
	{
		initPlayerList();
		window.console.log(playerList);		
	}

	updateConfig();

	var forceNext = 0;
	var doPlay = function() {
		if (!config || !config.noTimeout) {
			window.clearTimeout(forceNext);
			forceNext = window.setTimeout(function() {
				window.console.log("Force Next.");
				doPlay();
			}, timeDelay * 1000);			
		}

		autoPlay(0, fn, cb);
	};

	if (startInterval) {
		window.clearInterval(startInterval);
	}
	startInterval = window.setInterval(function() {
		if (readyForNext) {
			readyForNext = false;
			if (cb)
				cb();
			doPlay();
		}
	}, 2000);

	readyForNext = false;
	doPlay();
};

var start = function() {
	doStartInterval(autoExpedition, function(){advancePlayerBy(1)});
};

var startFormation = function() {
	doStartInterval(findOpponent, function(){advancePlayerBy(1)});
};

var startChakiCollection = function() {
	doStartInterval(collectChakiAward, function(){advancePlayerBy(1)});
};

var startInfo = function() {
	doStartInterval(logOutInfo, function(){advancePlayerBy(1)});
};

var login = function () {
	if (!playerList || playerList.length == 0)
	{
		initPlayerList();
		window.console.log(playerList);		
	}
	updateConfig();

	autoPlay();
}

var nextPlayer = function() {
	var elem = document.getElementById("playerIndex");
	elem.value = (elem.value|0) + 1;
	login();
};

var nextGachaType = -1;
var maxGachaCount = [];
var curGachaCount = [];
var doGacha = function(frame, config) {
	if (!frame.rootScope) {
		frame.console.log("doGacha. Can not find rootScope!");
		return;
	}

	var gacha = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.gachaReListup != "undefined"; });
	if ((config.type == 2 && gacha.walletData.gameGold < 30)
		|| (config.type == 0 && gacha.walletData.point < 100)
		|| ++curGachaCount[config.type] > maxGachaCount[config.type])
	{
		frame.console.log("Gacha not available. GameGold: "+gacha.walletData.gameGold+". Count: "+curGachaCount[config.type]);		
		return;
	}

	gacha.gachaType = config.type;
	if (config.weekly) {
		var agent = gacha.walletData.tickets["AGENT_"+getTodayString()];
		if (agent.count == 0) {
			frame.console.log("Gacha. Weekly. No more ticket!");
			callForNextPlayer(frame);
			return;
		}

		gacha.gachaType = 8;
		gacha.gotoPageListUp();
	}
	else {
		gacha.gachaReListup();
	}

	var checkGachaResult = function() {
		frame.console.log("Checking gacha result...");
		var gacha = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.gachaReListup != "undefined"; });
		if (!gacha.listupData || !gacha.listupData.entity || !gacha.listupData.entity.generalCardList)
			frame.setTimeout(checkGachaResult, 2000);
		else
			collectGacha(frame, config);
	}; frame.setTimeout(checkGachaResult, 2000);
};

// 0:早, 1:普, 2:晚, 3:长
var getSeasonType = function(seasonData) {
	if (seasonData[2] == "1") {
		return 0;
	}
	else if (seasonData[4] == "1") {
		if (seasonData[5] == "2")
			return 1;
		else
			return 3;
	}
	else if (seasonData[6] == "1") {
		return 2;
	}
	return -1;
};

var shouldAlwaysOn = function(card)
{
	return card.bean.cardRank > 2
		|| card.bean.generalCardId == 10376 // Name: 柳生宗矩2
		|| card.bean.generalCardId == 10382 // Name: 朝比奈泰能3
		|| card.bean.generalCardId == 10327 // Name: 伊達政宗3
		|| card.bean.generalCardId == 10488 // Name: 伊達政宗3
		|| card.bean.generalCardId == 10325	 // 	島津義弘3	8023
		|| card.bean.generalCardId == 10305	 // 	真田幸村3	7945
		|| card.bean.generalCardId == 10171	 // 	武田信玄3	7230
		|| card.bean.generalCardId == 10326	 // 	島津家久3	7820
		|| card.bean.generalCardId == 10034	 // 	片倉重長2	7245
		|| card.bean.generalCardId == 10170	 // 	柳生三厳2	6735
		|| card.bean.generalCardId == 10228	 // 	島津貴久2	5720
		|| card.bean.generalCardId == 10209	 // 	前田利家2	5530
		|| card.bean.generalCardId == 10229	 // 	島津歳久3	5080
		|| card.bean.generalCardId == 10120	 // 	柳生宗矩1	4517
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 10105	 // 	武田勝頼3	8178
	;
};

var isBestCheapCard = function(card)
{
	return false
//		|| card.bean.generalCardId == 10249	 // 	百地三太夫1	3458
	;
}

var isTopClassCard = function(card)
{
	return false
		|| card.bean.generalCardId == 10213	 // 	福島正則2	5978
		|| card.bean.generalCardId == 10216	 // 	後藤基次2	5635
		|| card.bean.generalCardId == 10267	 // 	服部正成2	4747
		|| card.bean.generalCardId == 10265	 // 	山本晴幸2	4513
		|| card.bean.generalCardId == 10254	 // 	長宗我部国親2 4022

		|| card.bean.generalCardId == 10339	 // 	村上義清3	7748
		|| card.bean.generalCardId == 10321	 // 	吉川元春3	7155
		|| card.bean.generalCardId == 10172	 // 	山県昌景3	7056
		|| card.bean.generalCardId == 10311	 // 	加藤清正3	6974
		|| card.bean.generalCardId == 10307	 // 	柴田勝家3	6763
		|| card.bean.generalCardId == 10315	 // 	本多忠勝3	6730
		|| card.bean.generalCardId == 10333	 // 	最上義光3	6672
		|| card.bean.generalCardId == 10308	 // 	滝川一益3	6495
		|| card.bean.generalCardId == 10319	 // 	北条綱成3	6468
		|| card.bean.generalCardId == 10231	 // 	新納忠元3	6144
		|| card.bean.generalCardId == 10532	 // 	六角義賢3	6135
		|| card.bean.generalCardId == 10337	 // 	斎藤道三3	6107
		|| card.bean.generalCardId == 10238	 // 	安東愛季3	5939
		|| card.bean.generalCardId == 10175	 // 	立花宗茂3	5710
		|| card.bean.generalCardId == 10338	 // 	斎藤義龍3	5451
		|| card.bean.generalCardId == 10343	 // 	松永久秀3	5420
		|| card.bean.generalCardId == 10252	 // 	十河一存3	5332
		|| card.bean.generalCardId == 10233	 // 	伊達成実3	5106
		|| card.bean.generalCardId == 10357	 // 	鈴木重秀3	4860
		|| card.bean.generalCardId == 10163	 // 	江里口信常3	4731
		|| card.bean.generalCardId == 10313	 // 	大谷吉継3	4524

		|| card.bean.generalCardId == 10306	 // 	織田信長3	5155
		|| card.bean.generalCardId == 10318	 // 	北条氏康3	3632
		|| card.bean.generalCardId == 10173	 // 	上杉謙信3	3571

//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 
	;
};

// Object {generalCardId: 10046, dataStatus: 1, distribution: 1, cardName: "朝比奈泰能"}
// {generalCardId: 10120, cardName: "柳生宗矩"}
var isSpecialCard = function(card)
{
	return card.bean.generalCardId == 10120 // Name: 柳生宗矩1  7
		|| card.bean.generalCardId == 10249 // Name: 百地三太夫1  5
	;
};

var isCrappyCard = function(card)
{
	return (card.bean.cardRank == 0 && !isSpecialCard(card))
		|| card.bean.generalCardId == 10247 // Name: 遠藤直経2
		|| card.bean.generalCardId == 10056 // Name: 富田景政2
		|| card.bean.generalCardId == 10145 // Name: 南部晴政2
		|| card.bean.generalCardId == 10103 // Name: 直江景綱2
		|| card.bean.generalCardId == 10157 // Name: 山浦国清2  4
		|| card.bean.generalCardId == 10262 // Name: 十河存保2  4
		|| card.bean.generalCardId == 10144 // Name: 鈴木重兼2  5
		|| card.bean.generalCardId == 10136 // Name: 頴娃久虎2  4
		|| card.bean.generalCardId == 10030 // Name: 伊集院忠棟2  5
		|| card.bean.generalCardId == 10121 // Name: 北条氏政2  5.5
		|| card.bean.generalCardId == 10104 // Name: 本庄繁長2  5
		|| card.bean.generalCardId == 10129 // Name: 吉川元長2  5
		|| card.bean.generalCardId == 10164 // Name: 円城寺信胤2  4.5
		|| card.bean.generalCardId == 10223 // Name: 北条氏照2  4.5
		|| card.bean.generalCardId == 10137 // Name: 鬼庭綱元2  4
		|| card.bean.generalCardId == 10115 // Name: 堀秀政2  4
		|| card.bean.generalCardId == 10221 // Name: 板倉勝重2  4
		|| card.bean.generalCardId == 10114 // Name: 森蘭丸2  4
		|| card.bean.generalCardId == 10250 // Name: 細川忠興2  5.5
		|| card.bean.generalCardId == 10165 // Name: 木下昌直2  5
		|| card.bean.generalCardId == 10138 // Name: 後藤信康2  4
	;
};

var noDropCard = function(card)
{
	if (card.bean.cardRank >= 3)
		return true;

	return card.bean.generalCardId == 10376 // Name: 柳生宗矩2
		|| card.bean.generalCardId == 10382 // Name: 朝比奈泰能3
		|| card.bean.generalCardId == 10327 // Name: 伊達政宗3
		|| card.bean.generalCardId == 10488 // Name: 伊達政宗3
		|| card.bean.generalCardId == 10325 // Name: 島津義弘3
		|| card.bean.generalCardId == 10305 // Name: 真田幸村3
		|| card.bean.generalCardId == 10343 // Name: 松永久秀3
		|| card.bean.generalCardId == 10171 // Name: 武田信玄3
		|| card.bean.generalCardId == 10318 // Name: 北条氏康3
		|| card.bean.generalCardId == 10306 // Name: 織田信長3
	;
}
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 10138 // Name: 後藤信康2 4

var isUsableBronze = function(card) {
	return isHighPolitics(card) || isMediumPolitics(card) || isLowendPolitics(card)
		|| card.bean.generalCardId == 10218 // Name: 酒井忠次2  5.5
	;
};

var isSuperbBronze = function(card) {
	if (card.bean.cardRank != 1)
		return false;

	return isHighPolitics(card) || isMediumPolitics(card)
		|| card.bean.generalCardId == 10209 // Name: 前田利家2
		|| card.bean.generalCardId == 10265 // Name: 山本晴幸2
		|| card.bean.generalCardId == 10034 // Name: 片倉重長2
		|| card.bean.generalCardId == 10208 // Name: 丹羽長秀2
		|| card.bean.generalCardId == 10207 // Name: 真田幸隆2
		|| card.bean.generalCardId == 10376 // Name: 柳生宗矩2
		|| card.bean.generalCardId == 10254 // Name: 長宗我部国親2
		|| card.bean.generalCardId == 10228 // Name: 島津貴久2
		|| card.bean.generalCardId == 10210 // Name: 織田信秀2
		|| card.bean.generalCardId == 10170 // Name: 柳生三厳2
		|| card.bean.generalCardId == 10267 // Name: 服部正成2

		|| card.bean.generalCardId == 10244 // Name: 太田資正2
		|| card.bean.generalCardId == 10216 // Name: 後藤基次2
		|| card.bean.generalCardId == 10213 // Name: 福島正則2
		|| card.bean.generalCardId == 10258	 // 	龍造寺隆信2
	;
};

var isGoodBronze = function(card) {
	return false
		|| card.bean.generalCardId == 10340 // Name: 浅井長政2
		|| card.bean.generalCardId == 10215 // Name: 黒田長政2
		|| card.bean.generalCardId == 10266 // Name: 竹中重治2
		|| card.bean.generalCardId == 10304 // Name: 真田昌幸2
	;	
};

var isUsableSilver = function(card) {
	if (card.bean.cardRank != 2)
		return false;
	return !isCrappySilver(card);
};

var isCrappySilver = function(card) {
	if (card.bean.cardRank != 2)
		return false;
	return false
		|| card.bean.generalCardId == 10101 // Name: 柿崎景家3
		|| card.bean.generalCardId == 10050 // Name: 北畠具教3
		|| card.bean.generalCardId == 10060 // Name: 東郷重位3
		|| card.bean.generalCardId == 10251 // Name: 三好義賢3
		|| card.bean.generalCardId == 10348 // Name: 甲斐宗運3 
	;
}
var isLowendBronze = function(card) {
	return false
		|| card.bean.generalCardId == 10302 // Name: 武田信繁2
		|| card.bean.generalCardId == 10258 // Name: 龍造寺隆信2
		|| card.bean.generalCardId == 10146 // Name: 石川高信2
		|| card.bean.generalCardId == 10239 // Name: 志村光安2
	;
};

var isHighPolitics = function(card) {
	return card.bean.generalCardId == 10526 // Name: 村井貞勝2  8
		|| card.bean.generalCardId == 10537 // Name: 伊達稙宗2  8
		|| card.bean.generalCardId == 10547 // Name: 穴山信君2
		|| card.bean.generalCardId == 10538 // Name: 酒井忠勝2
		|| card.bean.generalCardId == 10499 // Name: 本多正純2
		|| card.bean.generalCardId == 10529 // Name: 大野治長2
		|| card.bean.generalCardId == 10546 // Name: 蜂須賀家政2
		|| card.bean.generalCardId == 10543 // Name: 以心崇伝2
		|| card.bean.generalCardId == 10537 // Name: 伊達稙宗2
		|| card.bean.generalCardId == 10527 // Name: 前田玄以2

		|| card.bean.generalCardId == 10567 // Name: 佐久間信盛3
		|| card.bean.generalCardId == 10320 // Name: 毛利元就3
		|| card.bean.generalCardId == 10536 // Name: 浅井久政3
		|| card.bean.generalCardId == 10352 // Name: 直江兼続3
	;
};
//CardId: 10585 // Name: 黒田長政4

var isAutoReplacablePolitics = function(card) {
	return isMediumPolitics(card) || isLowendPolitics(card) || isCrappyPolitics(card);
};

var isPoliticsCard = function(card) {
	return isHighPolitics(card) || isAutoReplacablePolitics(card);
};

var isMediumPolitics = function(card) {
	return false
		|| card.bean.generalCardId == 10542 // Name: 臼杵鑑速2
		|| card.bean.generalCardId == 10551 // Name: 三好康長2
		|| card.bean.generalCardId == 10553 // Name: 筒井順慶2  7
	;
};

var isLowendPolitics = function(card)
{
	return false
		|| card.bean.generalCardId == 10541 // Name: 大久保忠隣2
		|| card.bean.generalCardId == 10211 // Name: 豊臣秀長2
		|| card.bean.generalCardId == 10226 // Name: 安国寺恵瓊2
		|| card.bean.generalCardId == 10558 // Name: 有馬晴信2
		|| card.bean.generalCardId == 10556 // Name: 吉岡長増2
		|| card.bean.generalCardId == 10555 // Name: 岡家利2
		|| card.bean.generalCardId == 10557 // Name: 吉弘鑑理2
		|| card.bean.generalCardId == 10549 // Name: 新発田長敦2 6
		|| card.bean.generalCardId == 10554 // Name: 戸川秀安2
	;
};

var isCrappyPolitics = function(card)
{
	return false
		|| card.bean.generalCardId == 10559 // Name: 伊東義祐2
		|| card.bean.generalCardId == 10562 // Name: 三好政康2  6

		|| card.bean.generalCardId == 10561 // Name: 小野鎮幸2
		|| card.bean.generalCardId == 10563 // Name: 三好長逸2
		|| card.bean.generalCardId == 10564 // Name: 石成友通2
		|| card.bean.generalCardId == 10545 // Name: 松前慶広2
		|| card.bean.generalCardId == 10548 // Name: 大熊朝秀2
		|| card.bean.generalCardId == 10550 // Name: 春日元忠2  6
		|| card.bean.generalCardId == 10497 // Name: 河野通直2
		|| card.bean.generalCardId == 10501 // Name: 小田氏治2
		|| card.bean.generalCardId == 10510 // Name: 大村純忠2
		|| card.bean.generalCardId == 10317 // Name: 南光坊天海2
		|| card.bean.generalCardId == 10127 // Name: 板部岡江雪斎2
		|| card.bean.generalCardId == 10560 // Name: 京極高知2 (晚)	
		|| card.bean.generalCardId == 10544 // Name: 片桐且元2 (晚)
		|| card.bean.generalCardId == 10331 // Name: 蘆名盛氏2 (晚)
	;
};

var isReplacable = function(card)
{

}

var isNormalGacha = function(type) {
	return type == 0;
};

var isMoneyGacha = function(type) {
	return type == 2;
};

var isWeeklyGacha = function(type) {
	return type == 8;
};

var collectGacha = function(frame, config)
{
	var count = 0;
	var card = null;
	var gacha = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.gachaReListup != "undefined"; });
	for (var i = 0; i < gacha.listupData.entity.generalCardList.length; i++) {
		var c = gacha.listupData.entity.generalCardList[i];
		frame.console.log("Gacha. CardId: "+c.bean.generalCardId+" // Name: "+c.bean.cardName+((c.bean.cardRank|0)+1));

		// 4星卡, 直接停掉
		if (c.bean.cardRank > 2)
			return;

		if (config.type == 2)
			continue;

		if (isCrappyCard(c))
			continue;

		if (isSpecialCard(c)
			|| (c.bean.cardRank == 1 && (config && config.safeCollect && (isSuperbBronze(c) || isLowendPolitics(c))))
			|| (c.bean.cardRank == 1 && !(config && config.safeCollect))
			|| (c.bean.cardRank == 2 && !isCrappySilver(c))
			)
		{
			card = c;
			card.gachaListIndex = i;
			++count;
		}
	};

	frame.console.log("Gacha. Good card count: "+count);

	var gotoNextStep = function() {
		if (isWeeklyGacha(config.type)) {
			if (config.autoNextPlayer) {
				callForNextPlayer(frame);
			}
		}
		else {
			frame.setTimeout(function () {
				prepareGacha(frame, config);
			}, 2000);					
		}		
	};

	if (count == 0) {
		gotoNextStep();
	}
	else if (config.safeCollect && (isNormalGacha(config.type) || isWeeklyGacha(config.type)) && count == 1) {
		var filterCards = function(list, result, fn) {
			for (var i = 0; i < list.length; i++) {
				var card2 = list[i];
				if (fn(card2, i)) {
					card2.replaceIndex = i;
					result.push(card2);
				}
			}
		};

		gacha.gotoPageDischarge(card.gachaListIndex);
		var checkDiscardData = function() {
			if (!gacha.dischargeData) {
				frame.setTimeout(checkDiscardData, 1000);
				return;
			}

			var candidates = [];
			var discardList = gacha.getDischargeCardList();

			var politicsThreshold = 200; var politics = []; var politicsCandidates = []; var politicsCandidatesVal = [];
			var expiringPoliticsCount = 0;
			var expiredPoliticsCount = 0;
			for (var i = 0; i < discardList.length; i++) {
				var card2 = discardList[i];
				card2.seasonData = card2.generalCard.bean.peaks.split(',');
				if (i > 6) {
					var season = card2.playerGeneralCard.bean.season;
					var values = card2.generalCard.bean.politicses.split(',');
					if (i < 10) {
						politics[i - 7] = values[season]|0;
						if (card2.seasonData[season] == 2)
							++expiredPoliticsCount;
						else if (season < 9 && card2.seasonData[season + 1] == 2)
							++expiringPoliticsCount;
						else if (politics[i - 7] < politicsThreshold)
							politicsThreshold = politics[i - 7];					
					}
					else {
						++season; if (season >= 10) season = 0;
						var val = values[season]|0;
						if (isPoliticsCard(card2.generalCard) && (card2.generalCard.bean.cost * 5.5) < val) {
							card2.politicsVal = val;
							card2.replaceIndex = i;
							politicsCandidates.push(card2);
							politicsCandidatesVal.push(val);
						}
					}
				}
			}

			bubbleSort(politicsCandidatesVal);
			var politicsToReplaceCount = expiringPoliticsCount + expiredPoliticsCount;
			var requiredPoliticsCount = Math.min(politicsToReplaceCount + 1, 3);
			politicsThreshold = (politicsCandidates.length < requiredPoliticsCount) ? politicsThreshold : politicsCandidatesVal[politicsCandidates.length-requiredPoliticsCount];
			frame.console.log("Current Politics:"+politics);
			frame.console.log("Current Candidate Count:"+politicsCandidatesVal.length);
			frame.console.log("Current Candidates:"+politicsCandidatesVal);
			frame.console.log("Require Candidate Count:"+requiredPoliticsCount);
			frame.console.log("Politics Threshold:"+politicsThreshold);

			for (var i = 0; i < politicsCandidates.length; i++) {
				if (politicsCandidates[i].politicsVal < politicsThreshold && isAutoReplacablePolitics(politicsCandidates[i].generalCard))
					candidates.push(politicsCandidates[i]);
			};

			filterCards(discardList, candidates, function(card2, index) {
				return isCrappyCard(card2.generalCard) && index > 9;
			});
			filterCards(discardList, candidates, function(card2, index) {
				var season = card2.playerGeneralCard.bean.season;
				return (season < 10 && card2.seasonData[season] == "2" && !noDropCard(card2.generalCard));
			});
			filterCards(discardList, candidates, function(card2, index) {
				return isCrappyCard(card2.generalCard) && index < 10;
			});
			filterCards(discardList, candidates, function(card2, index) {
				var season = card2.playerGeneralCard.bean.season + 1;
				return (season < 10 && card2.seasonData[season] == "2" && index > 9 && !noDropCard(card2.generalCard));
			});
			filterCards(discardList, candidates, function(card2, index) {
				return (card2.generalCard.bean.cardRank == 1
						&& !isSuperbBronze(card2.generalCard)
						&& !isLowendPolitics(card2.generalCard)
						&& index > 9);
			});


			var elem = window.document.getElementById("gacha");
			if (elem)
			{
				var gachaArea = document.getElementById("gachaContent");
				if (gachaArea)
					gachaArea.remove();
				gachaArea = document.createElement('div');
				gachaArea.id = "gachaContent";
				elem.appendChild(gachaArea);
				gachaArea = document.getElementById("gachaContent");

				for (var i = 1; i < candidates.length; i++) {
					var item = candidates[i];
					var str = item.generalCard.bean.cardName
							  +((item.generalCard.bean.cardRank|0)+1)
							  +"."+((item.playerGeneralCard.bean.season|0)+1)+"期"
							  +".Index:"+item.replaceIndex;
					appendLog(str, gachaArea);
				};					
			}

			for (var i = 0; i < candidates.length; i++) {
				var item = candidates[i];
				frame.console.log("Candidate: "+item.generalCard.bean.cardName
											   +((item.generalCard.bean.cardRank|0)+1)
											   +"."+((item.playerGeneralCard.bean.season|0)+1)+"期"
											   +".Index:"+item.replaceIndex
								 );
			};

			if (isSpecialCard(card)
				|| isSuperbBronze(card)
				|| (isPoliticsCard(card) && card.politicsVal > politicsThreshold)
				|| (card.bean.cardRank == 2 && !isCrappySilver(card)))
			{
				if (candidates.length > 0) {
					frame.console.log(frame.playerTag + ".Replace. "+card.bean.cardName+"=>"+candidates[0].generalCard.bean.cardName);
					gacha.setSelectDischargeCardIndex(candidates[0].replaceIndex);
					gacha.gotoPageResult();
				}
			}

			gotoNextStep();
		}; frame.setTimeout(checkDiscardData, 1000);
	}
	else if (config.autoCollect && count == 1) {
		for (var i = 0; i < gacha.listupData.entity.generalCardList.length; i++) {
			var card = gacha.listupData.entity.generalCardList[i];
			if (config.type == 0 && (card.bean.cardRank == 1 || card.bean.cardRank == 2 || isSpecialCard(card))) {
				gacha.gotoPageDischarge(i);
				var checkDiscardData = function() {
					if (!gacha.dischargeData) {
						frame.setTimeout(checkDiscardData, 1000);
					}
					else {
						var discardList = gacha.getDischargeCardList();
						for (var i = 0; i < discardList.length; i++) {
							var card2 = discardList[i];
							if (card2.generalCard.bean.cardRank == 0 && !isSpecialCard(card2.generalCard) && config.type == 0) {
								frame.console.log("Replace. "+card.bean.cardName+"=>"+card2.generalCard.bean.cardName);
								gacha.setSelectDischargeCardIndex(i);
								gacha.gotoPageResult();

								frame.setTimeout(function () {
									prepareGacha(frame, config);
								}, 2000);
								return;
							}
						};
					}
				}; frame.setTimeout(checkDiscardData, 1000);
			}
			else if (config.type == 2 && card.bean.cardRank >= 3) {
				return;
			}
		};
	}
};

var prepareGacha = function(frame, config) {
	frame.location = "http://mn.mobcast.jp/mn/#/gacha/top?"+Math.random();
	getRootScope(frame);
	var checkGacha = function() {
		var gacha = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.gachaReListup != "undefined"; });
		if (!gacha || !gacha.walletData) {
			frame.setTimeout(checkGacha, 1000);
		}
		else {
			if (gacha && gacha.listupData && gacha.listupData.entity)
				gacha.listupData.entity.generalCardList = null;
			doGacha(frame, config);
		}
	}; frame.setTimeout(checkGacha, 1000);
};

// type. {2: money, 0: normal}
var startGacha = function(config, frame)
{
	maxGachaCount[config.type] = (!config.count) ? 1 : config.count;
	curGachaCount[config.type] = 0;
 	nextGachaType = config.type;

	prepareGacha(frame ? frame : getFrame(), config);
};

var isGameStarted = function(frame) {
	if (!frame || !frame.angular || !frame.angular.element)
		return false;

	var rootScope = frame.angular.element(frame.document.getElementsByTagName('body')[0]).scope();
	if (!rootScope || !rootScope.$$childHead)
		return false;

	return true;
};

var isInGame = function(frame)
{
	if (!frame || !frame.angular || !frame.angular.element)
		return false;

	var rootScope = frame.angular.element(frame.document.getElementsByTagName('body')[0]).scope();
	if (!rootScope || !rootScope.$$childHead)
		return false;

	var player = findChildScope(rootScope, function(childscope) { return typeof childscope.myData != "undefined"; });
	if (!player || player.isTutorial)
		return false;

	return true;
};

var isInTutorial = function(frame)
{
	if (!frame || !frame.angular || !frame.angular.element)
		return false;

	var rootScope = frame.angular.element(frame.document.getElementsByTagName('body')[0]).scope();
	if (!rootScope || !rootScope.$$childHead || !rootScope.tutorial)
		return false;

	var tutorial = findChildScope(rootScope, function (childscope) { return typeof childscope.tutorialData != "undefined" });
	if (!tutorial)
		return false;

	return true;
};

var newAccount = function(config) {
	var state = 0;
	var lastLocation = "";
	var timeRatio = document.getElementById("timeRatio").value;
	var newUserURL = document.getElementById("newUserURL").value;
	var count = document.getElementById("count").value;
	var game = createGame(newUserURL);

	var autoRun = function() {
		var checkEnv = function () {
			window.console.log("Checking env...");

			game = document.getElementById("game");
			var frame = game.contentWindow;

			if (isInGame(frame))
				return;

			if (!isInTutorial(frame)) {
				window.setTimeout(checkEnv, 2000);
				return;				
			}

			frame.autoTutorial = function () {
				window.console.log("frame.autoTutorial");
				autoTutorialBase(game.contentWindow, config);
			};

			frame.lastItemIndex = -1;
			frame.rootScope = frame.angular.element(frame.document.getElementsByTagName('body')[0]).scope();
			frame.tutorial = findChildScope(frame.rootScope, function (childscope) { return typeof childscope.tutorialData != "undefined" });
			if (frame.rootScope.tutorial.currentPhaseIndex == 0)
			{
			    frame.rootScope.tutorial.currentItemIndex=9;
			    frame.tutorial.click();
			    frame.setTimeout(frame.autoTutorial, 4000 * timeRatio);
			}
			else
			{
			    frame.setTimeout(frame.autoTutorial, 200);
			}
		};
		checkEnv();
	};

	var openGame = function() {
		state = -1;
		var frame = game.contentWindow;
		frame.location = "http://mn.mobcast.jp/mn/#/";

		autoRun();
	};

	var regist = function() {
		var checkStatus = function() {
			game = document.getElementById("game");
			var frame = game.contentWindow;
			if (!frame || !frame.$ || frame.$("form[name=frmMain]").length == 0 || frame.location.href == lastLocation)
				return false;
			else
				return true;
		}

		game = document.getElementById("game");
		var frame = game.contentWindow;
		if (isGameStarted(frame))
			return;

		if (!checkStatus()) {
			window.console.log("Checking regist...");
			window.setTimeout(regist, 2000);
			return;
		}

		lastLocation = frame.location.href;
		var button = frame.$("form[name='frmMain']");
		button.submit();

		state = 3;
	};

	var createUser = function() {
		var checkStatus = function() {
			game = document.getElementById("game");
			var frame = game.contentWindow;
			if (!frame || !frame.$ || frame.$("input[name='NAME']").length == 0 || frame.$("form[name=frmMain]").length == 0)
				return false;
			else
				return true;
		}

		game = document.getElementById("game");
		var frame = game.contentWindow;
		if (isGameStarted(frame))
			return;

		if (!checkStatus()) {
			window.console.log("Checking createUser...");
			window.setTimeout(createUser, 2000);
			return;
		}
		lastLocation = frame.location.href;

		var input = frame.$("input[name='NAME']");
		input.val("モブ"+generatePasswords()+"ブ");
		frame.$("form[name=frmMain]").submit();

		state = 2;
	};

	var visit = function() {
		var checkStatus = function() {
			game = document.getElementById("game");
			var frame = game.contentWindow;
			if (!frame || !frame.$ || !frame.$("[name='INSTALL']"))
				return false;
			else
				return true;
		}

		game = document.getElementById("game");
		var frame = game.contentWindow;
		if (isGameStarted(frame))
			return;

		if (!checkStatus()) {
			window.console.log("Checking visit...");
			window.setTimeout(visit, 2000);
			return;
		}
		lastLocation = frame.location.href;

		var button = frame.$("[name='INSTALL']");

		var url = button.attr('onclick');
		url = "location.href='http://gmpa.jp/" + url.substring(url.indexOf('regist'));
		window.console.log(url);

		button.attr('onclick', url);
		button.click();

		state = 1;
	};

	var runner = function() {
		game = document.getElementById("game");
		var frame = game.contentWindow;
		if (isInTutorial(frame)) {
			autoRun(frame);
			return;
		}

		window.console.log("runner.state: " + state);
		if (state == -1) {
			return;
		}
		else if (state == 0) {
			window.setTimeout(runner, 1000);
			return;
		}

		switch (state) {
			case 1:
				createUser();
				break;
			case 2:
				regist();
				break;
			case 3:
				return openGame();
			default:
				break;
		}

		state = 0;
		window.setTimeout(runner, 1000);
	};

	visit();
	runner();

	// window.setTimeout(function() {
	// 	window.setTimeout(visit, 2000 * timeRatio);
	// 	window.setTimeout(createUser, 4000 * timeRatio);
	// 	window.setTimeout(regist, 6000 * timeRatio);
	// 	window.setTimeout(openGame, 8000 * timeRatio);
	// 	window.setTimeout(autoRun, 18000 * timeRatio);
	// }, 0);
};

var newAccountLoop = function(config)
{
	var count = document.querySelector("#count").value;
	var doCreateAccount = function(config) {
		if (count-- <= 0) {
			return;
		}
		document.querySelector("#count").value = count;

		removeAll();
		window.setTimeout(function() { newAccount(config); }, 1000);
		window.setTimeout(checkStatus, 3000);
	};

	window.forceRetryNewAccount = 0;
	var checkStatus = function() {
		var frame = getFrame();
		// if (!isGameStarted(frame)) {
		// 	window.console.log("Checking tutorial status...");
		// 	window.setTimeout(checkStatus, 3000);
		// 	return;
		// }

		if (frame.tutorialDone) {
			window.clearTimeout(window.forceRetryNewAccount);
			window.forceRetryNewAccount = window.setTimeout(function() { doCreateAccount(config); }, 90000);
			window.setTimeout(function() { doCreateAccount(config); }, 3000);
		}
		else {
			window.console.log("Checking tutorial status...");
			window.setTimeout(checkStatus, 3000);
		}
	}
	doCreateAccount(config);
};

var openInvitePage = function() {
	var frame = getFrame();
	frame.location.href = "http://mn.mobcast.jp/mn/#/invite/invite?"+Math.random();
};

var doGetInvitatoinInfo = function(frame) {
	var checkInvitation = function() {
		var invitation = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.inviteCount != "undefined"; });
		if (!invitation) {
			frame.setTimeout(checkInvitation, 2000);
			return;
		}

		frame.console.log(frame.playerTag+";邀请完成:"+invitation.inviteCount+";URL:"+invitation.inviteUrl);
		callForNextPlayer(frame);
	}

	frame.location.href = "http://mn.mobcast.jp/mn/#/invite/invite?"+Math.random();
	frame.setTimeout(checkInvitation, 2000);
};

var getInvitatoinInfo = function()
{
	doStartInterval(doGetInvitatoinInfo, function(){advancePlayerBy(1)});
}

var startWeeklyGacha = function()
{
	var elem = document.getElementById("playerIndex");
	elem.value = (elem.value|0) + 1;

	doStartInterval(function() {
		startGacha({'type':8,'weekly':true,'safeCollect':true,'autoNextPlayer':true});
	}, function(){advancePlayerBy(1)}, {'noTimeout':true});
}


window.realAlert = window.alert;
window.alert = function(msg) { window.console.log("Redirect alert. "+msg); };
window.showModalDialog = function(msg) { window.console.log("Redirect alert. "+msg); };
window.__proto__.alert = function(msg) { window.console.log("Redirect alert. "+msg); };
window.__proto__.showModalDialog = function(msg) { window.console.log("Redirect alert. "+msg); };
