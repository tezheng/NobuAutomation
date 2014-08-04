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
var playerCountYahoo = 115;

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

var acquirePresents = function(frame) {
	var rootScope = getRootScope(frame);
	var overlay = findChildScope(rootScope, function(childscope) {
		return typeof childscope.showPresentBox != "undefined" &&
			   typeof childscope.showGlobalMenu != "undefined"; });

	overlay.showPresentBox();
	overlay.$apply();

	var getAll = function() {
		var checkPresents = function () {
			var present = findChildScope(rootScope, function(childscope) { return typeof childscope.acquireAllPresents != "undefined"; });
			if (!present)
				frame.setTimeout(checkPresents, 1000);
			else
				present.acquireAllPresents();
		}; frame.setTimeout(checkPresents, 1000);
	}; frame.setTimeout(getAll, 1000);
};

var autoTutorialBase = function(frame)
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

            leader.selectIndex=1;
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
            states.gotoPageCountry(1);/*大阪37,尾张27,1-60*/
            states.click_gotoNextMessage();
            frame.setTimeout(frame.autoTutorial, 1000);
        }
        else if (frame.rootScope.tutorial.currentItemIndex == 4)
        {
            states.click_finish();

            frame.setTimeout(function() {
            	frame.tutorialDone = true;
            	acquirePresents(frame);
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
				frame.setTimeout(function() { readyForNext = true; }, 1000);
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
				frame.setTimeout(function() { readyForNext = true; }, 6000);
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
		frame.setTimeout(function() { readyForNext = true; }, 4000);
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

		if (series.seriesList.length == 0 && series.day > 0) {
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

		frame.setTimeout(function() { readyForNext = true; }, 1000);
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

		// playerGeneralCard.leaderBonusParam.{leadership: 0, offense: 0, defense: 0, wisdom: 12, politics: 0}
		// playerGeneralSeasonRecord.bean Object drawn: 2games: 24guideDrawn: 0guideGames: 0guideLost: 0
		// guideWon: 0id: Objectleague: 173005lost: 1 rankingAttackDamage: 11rankingKnockDown: 29
		// rankingSoldier: totalAttack: totalAttackCritical: totalAttackDamage: totalAttackTip: totalDead: totalDefense: 39
		// totalDefenseCritical: totalDefenseDamage: totalDefenseTip: totalKnockDown: totalSkill: totalSoldier: won: world: 17
		var politicsStr = "";
		var expiredPolitics = 0;
		for (var i = 7; i < 10; ++i)
		{
			var card = teamData.generalList.generalcards[teamData.positionArray.list[i]]
			var curSeason = card.playerGeneralCard.bean.season + 1;
			var seasonData = card.generalCard.bean.peaks.split(',');
			if (!seasonData[curSeason] || seasonData[curSeason] == "2")
			{
				++expiredPolitics;
				politicsStr += card.generalCard.bean.cardName + ":"+curSeason+"期|";
			}
		}; log += ";过期内政:"+expiredPolitics+";" + "<font color='red'><b>" + politicsStr + "</b></font>";

		for (var i = 0; i < teamData.positionArray.list.length; i++) {
			var card = teamData.generalList.generalcards[teamData.positionArray.list[i]];
			if (leaderBonusRecord[teamData.positionArray.list[i]])
				continue;

			var leaderBonus = "大将. " + card.generalCard.bean.cardName + (card.generalCard.bean.cardRank|0+1) + ". "
									   + teamData.positionArray.list[i] + ". "
									   + "统." + card.playerGeneralCard.leaderBonusParam.leadership + ". "
									   + "攻." + card.playerGeneralCard.leaderBonusParam.offense + ". "
									   + "防." + card.playerGeneralCard.leaderBonusParam.defense + ". "
									   + "知." + card.playerGeneralCard.leaderBonusParam.wisdom + ". ";
			frame.console.log(leaderBonus);
			leaderBonusRecord[teamData.positionArray.list[i]] = leaderBonus;
		};

		var sep = "合战;" + playerIndex + "." + playerList[playerIndex] + "------";
		frame.console.log(sep);

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
			frame.playerInfo.gold = [];
			frame.playerInfo.cur = [];
			frame.playerInfo.cur.duty = [];
			frame.playerInfo.cur.bench = [];
			frame.playerInfo.nxt = [];
			frame.playerInfo.nxt.duty = [];
			frame.playerInfo.nxt.bench = [];
			frame.playerInfo.nxt.politics = [];
		}; initCardInfo();

		for (var i = 0; i < teamData.positionArray.list.length; i++) {
			var card = teamData.generalList.generalcards[teamData.positionArray.list[i]];
			if (card.playerGeneralSeasonRecord && card.playerGeneralSeasonRecord.bean.totalAttackDamage)
			{
				var bean = card.playerGeneralSeasonRecord.bean;
				var record = "合战;" + card.generalCard.bean.cardName + (card.generalCard.bean.cardRank|0+1) + "." + teamData.positionArray.list[i] + "." + card.playerGeneralCard.bean.season+"期"
									  + ";位置:" + (i|0+1)
									  + ";参战:" + bean.games + ";均伤:" + ((bean.totalAttackDamage/bean.games)>>0)
									  + ";击败:" + bean.totalKnockDown + ";溃退:" + bean.totalDead
									  + ";攻击:" + bean.totalAttack + ";暴击:" + bean.totalAttackCritical + ";特技:" + bean.totalSkill
									  + ";总伤害:" + bean.totalAttackDamage + ";单次伤害:" + ((bean.totalAttackDamage / bean.totalAttack) >> 0)
									  + ";格挡:" + bean.totalDefenseCritical
									  + ";总损失:" + bean.totalDefenseDamage + ";总防御:" + bean.totalDefense + ";单次防御:" + ((bean.totalDefenseDamage / bean.totalDefense) >> 0)
									  ;
				frame.console.log(record);
			}

			var seasonData = card.generalCard.bean.peaks.split(',');
			var season = card.playerGeneralCard.bean.season;

			if (isCrappyCard(card.generalCard)) {
				recordCard(card, season, frame.playerInfo.droppable);
			}
			else if (season < 10 && seasonData[season] == "2" && !noDropCard(card.generalCard)) {
				// var data = {"name":card.generalCard.bean.cardName,"rank":card.generalCard.bean.cardRank,"season":season+1}
				// frame.playerInfo.droppable.push(data);
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
				frame.playerInfo.gold.push(data);
			}

			// var curSeason = season + 1;
			// if (curSeason < 10 && seasonData[curSeason] == "2")
			// {
			// 	if (i < 7) {
			// 		++expiredCardOnDuty;
			// 		strExpiringCardOnDuty += card.generalCard.bean.cardName + ":"+curSeason+"期|";
			// 	}
			// 	else if (i > 9) {
			// 		++expiredCardBench;
			// 		strExpiringCardBench += card.generalCard.bean.cardName + ":"+curSeason+"期|";
			// 	}
			// }
			// else if (card.generalCard.bean.cardRank > 2) {
			// 	strBenchGoldCard += card.generalCard.bean.cardName + ":"+curSeason+"期|";				
			// }

			if (i > 9) {
				var season = card.playerGeneralCard.bean.season + 1;
				var politicses = card.generalCard.bean.politicses.split(',');
				if ((politicses[season] > 70 && expiredPolitics) || politicses[season] > politics[0]) {
					recordCard(card, season, frame.playerInfo.nxt.politics);
					// ++subtitudePolitics;
					// strPoliticsCandidate += card.generalCard.bean.cardName + ":"+season+"期"+politicses[season]+"|";
				}
			}
		}
		frame.console.log(sep);

		log += ";" + (frame.playerInfo.normalText("当前参战过期", frame.playerInfo.cur.duty));
		log += ";" + (frame.playerInfo.normalText("当前替补过期", frame.playerInfo.cur.bench));
		log += ";" + (frame.playerInfo.normalText("可替换武将", frame.playerInfo.droppable));
		log += ";" + (frame.playerInfo.normalText("替补内政", frame.playerInfo.nxt.politics));
		log += ";" + (frame.playerInfo.normalText("参战即将过期", frame.playerInfo.nxt.duty));
		log += ";" + (frame.playerInfo.normalText("替补即将过期", frame.playerInfo.nxt.bench));
		log += ";" + (frame.playerInfo.normalText("四星", frame.playerInfo.gold));

		// log += ";替补内政:"+subtitudePolitics+";" + "<font color='blue'><b>" + ((strPoliticsCandidate.length > 0) ? strPoliticsCandidate : "无") + "</b></font>";
		// log += ";参战过期武将:"+expiredCardOnDuty+";" + "<font color='red'><b>" + strExpiringCardOnDuty + "</b></font>";
		// log += ";替补4星武将;" + "<font color='blue'><b>" + strBenchGoldCard + "</font></b>";
		// log += ";替补过期武将:"+expiredCardBench+";" + "<font color='red'><b>" + strExpiringCardBench + "</b></font>";

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
		var str = item.name+(item.rank|0+1)+":"+item.season+"期|";
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
		frame.setTimeout(function() { readyForNext = true; }, 1000);
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
		for (var i = 12; i < 17; i++) {
			appendLog(logList[i], logArea);
		}

		appendLog(addCategoryHtml("当前参战过期", frame.playerInfo.cur.duty), logArea);
		appendLog(addCategoryHtml("当前替补过期", frame.playerInfo.cur.bench), logArea);
		appendLog(addCategoryHtml("可替换武将", frame.playerInfo.droppable), logArea);
		appendLog(addCategoryHtml("替补内政", frame.playerInfo.nxt.politics), logArea);
		appendLog(addCategoryHtml("参战即将过期", frame.playerInfo.nxt.duty), logArea);
		appendLog(addCategoryHtml("替补即将过期", frame.playerInfo.nxt.bench), logArea);
		appendLog(addCategoryHtml("四星", frame.playerInfo.gold), logArea);
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
			frame.setTimeout(function() { readyForNext = true; }, 1000);
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
		frame.setTimeout(function() { readyForNext = true; }, 1000);
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
		frame.setTimeout(function() { readyForNext = true; }, 1000);
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

var autoPlay = function(nextLogin, fn) {
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
			fn(game.contentWindow);
		}
	};

	if (fn) {
		window.setTimeout(checkGame, 3000 * timeRatio);
	}

	if (nextLogin && nextLogin > 0)
	{
		window.setTimeout(function() {
			++playerIndex;
			if (playerIndex == playerList.length)
				playerIndex = 0;
			autoPlay(nextLogin, fn);
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
var doStartInterval = function(fn, cb) {
	if (!playerList || playerList.length == 0)
	{
		initPlayerList();
		window.console.log(playerList);		
	}

	updateConfig();

	var forceNext = 0;
	var doPlay = function() {
		window.clearTimeout(forceNext);
		forceNext = window.setTimeout(function() {
			window.console.log("Force Next.");
			doPlay();
		}, timeDelay * 1000);

		autoPlay(0, fn);
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
	if ((config.type == 2 && gacha.walletData.gameGold < 30) || ++curGachaCount[config.type] > maxGachaCount[config.type]) {
		frame.console.log("Gacha not available. GameGold: "+gacha.walletData.gameGold+". Count: "+curGachaCount[config.type]);		
		return;
	}

	gacha.gachaType = config.type;
	gacha.gachaReListup();

	var checkGachaResult = function() {
		frame.console.log("Checking gacha result...");
		var gacha = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.gachaReListup != "undefined"; });
		if (!gacha.listupData || !gacha.listupData.entity || !gacha.listupData.entity.generalCardList)
			frame.setTimeout(checkGachaResult, 2000);
		else
			collectGacha(frame, config);
	}; frame.setTimeout(checkGachaResult, 2000);
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
		|| card.bean.generalCardId == 10170 // Name: 柳生三厳2  6.5/7
	;
};

var isHighPolitics = function(card) {
	return card.bean.generalCardId == 10526 // Name: 村井貞勝2  8
		|| card.bean.generalCardId == 10537 // Name: 伊達稙宗2  8
	;
}

var isMediumPolitics = function(card) {
	return card.bean.generalCardId == 10553 // Name: 筒井順慶2  7
	;
}
var isLowendPolitics = function(card)
{
	return card.bean.generalCardId == 10549 // Name: 新発田長敦2 6
		|| card.bean.generalCardId == 10562 // Name: 三好政康2  6
		|| card.bean.generalCardId == 10550 // Name: 春日元忠2  6
		|| card.bean.generalCardId == 10544 // Name: 片桐且元2  5.5(晚)
	;
};

var isReplacable = function(card)
{

}

var collectGacha = function(frame, config)
{
	var gacha = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.gachaReListup != "undefined"; });
	var count = 0;
	for (var i = 0; i < gacha.listupData.entity.generalCardList.length; i++) {
		var card = gacha.listupData.entity.generalCardList[i];
		//card.bean.generalCardId
		frame.console.log("Gacha. CardId: "+card.bean.generalCardId+", Name: "+card.bean.cardName);
		if ((config.type == 0 && (card.bean.cardRank > 0 || isSpecialCard(card)) && !isCrappyCard(card)) ||

			(config.type == 2 && card.bean.cardRank >= 3))
		{
			++count;
		}
	};

	if (count == 0) {
		frame.setTimeout(function () {
			prepareGacha(frame, config);
		}, 2000);
	}
	else if (config.safeCollect && count == 1) {
		for (var i = 0; i < gacha.listupData.entity.generalCardList.length; i++) {
			var card = gacha.listupData.entity.generalCardList[i];
		}		
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
	if (!player)
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

var newAccount = function() {
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
				autoTutorialBase(game.contentWindow);
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

		if (!checkStatus()) {
			window.console.log("Checking regist...");
			window.setTimeout(regist, 2000);
			return;
		}

		var frame = game.contentWindow; lastLocation = frame.location.href;
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

		if (!checkStatus()) {
			window.console.log("Checking createUser...");
			window.setTimeout(createUser, 2000);
			return;
		}

		var frame = game.contentWindow; lastLocation = frame.location.href;
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

		if (!checkStatus()) {
			window.console.log("Checking visit...");
			window.setTimeout(visit, 2000);
			return;
		}

		var frame = game.contentWindow; lastLocation = frame.location.href;
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

var newAccountLoop = function()
{
	var count = document.querySelector("#count").value;
	var doCreateAccount = function() {
		if (count-- <= 0) {
			return;
		}
		document.querySelector("#count").value = count;

		removeAll();
		window.setTimeout(newAccount, 1000);
		window.setTimeout(checkStatus, 3000);
	};

	var forceRetry = 0;
	var checkStatus = function() {
		var frame = getFrame();
		if (!isGameStarted(frame)) {
			window.console.log("Checking tutorial status...");
			window.setTimeout(checkStatus, 3000);
			return;
		}

		if (frame.tutorialDone && isInGame(frame)) {
			frame.tutorialDone = true;
			window.clearTimeout(forceRetry);
			forceRetry = window.setTimeout(doCreateAccount, 60000);
			window.setTimeout(doCreateAccount, 3000);
		}
		else {
			window.console.log("Checking tutorial status...");
			window.setTimeout(checkStatus, 3000);
		}
	}
	doCreateAccount();
};
