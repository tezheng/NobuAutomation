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
var password = "";

var updateConfig = function(cfgCB) {
	timeDelay = document.getElementById("timeDelay").value;	
	timeRatio = document.getElementById("timeRatio").value;	

	playerIndex = document.getElementById("playerIndex").value;
	password = document.getElementById("password").value;

	var elem = document.getElementById("startPlayer");
	startPlayer = (elem) ? elem.value : playerIndex;
	elem = document.getElementById("endPlayer");
	endPlayer = (elem) ? elem.value : -1;

	if (cfgCB)
		cfgCB();
}

var initPlayerList = function(playerCount, playerCountYahoo) {
	playerList = [
					"tezheng1982@gmail.com", "tezhengchenhao@gmail.com"
					, "dummyedu@gmail.com", "dummyedu01@gmail.com", "dummyedu02@gmail.com", "dummyedu03@gmail.com", "dummedu04@gmail.com"
	];
	for (var i = 1; i <=playerCount; ++i) {
		if (i < 10)
			playerList.push("xiaotenobu0"+i+"@gmail.com");
		else
			playerList.push("xiaotenobu"+i+"@gmail.com");			
	};
	for (var i = 1; i <=playerCountYahoo; ++i) {
		if (i < 10)
			playerList.push("xiaotenobu0"+i+"@yahoo.co.jp");
		else
			playerList.push("xiaotenobu"+i+"@yahoo.co.jp");			
	};
};

var createGame = function(url) {
	var frame = document.getElementById("game");
	if (frame)
		frame.remove();

	frame = document.createElement('iframe');
	frame.id = "game";
	frame.width = 320;
	frame.height = 440;
	frame.frameborder = '0';
	frame.scrolling = 'no';
	frame.src = url;
	document.body.appendChild(frame);	

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
				frame.setTimeout(checkPresents, 2000);
			else
				present.acquireAllPresents();
		}; frame.setTimeout(checkPresents, 2000);
	}; frame.setTimeout(getAll, 4000);
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

		log += ", 胜, " + results[0] + ", 平, " + results[2] + ", 负, " + results[1];
		log += ", 石, " + resource;

		getPoliticsData(frame, log);
	}
	frame.location = "http://mn.mobcast.jp/mn/#/war/match?"+Math.random();
	frame.setTimeout(getData, 2000);
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

		log += ", 内政:" + teamData.abilityEntity.politics1 + "|"
		 				 + teamData.abilityEntity.politics2 + "|"
		 				 + teamData.abilityEntity.politics3;

		// playerGeneralCard.leaderBonusParam.{leadership: 0, offense: 0, defense: 0, wisdom: 12, politics: 0}
		// playerGeneralSeasonRecord.bean Object drawn: 2games: 24guideDrawn: 0guideGames: 0guideLost: 0
		// guideWon: 0id: Objectleague: 173005lost: 1 rankingAttackDamage: 11rankingKnockDown: 29
		// rankingSoldier: totalAttack: totalAttackCritical: totalAttackDamage: totalAttackTip: totalDead: totalDefense: 39
		// totalDefenseCritical: totalDefenseDamage: totalDefenseTip: totalKnockDown: totalSkill: totalSoldier: won: world: 17
		var politicsStr = "";
		for (var i = 7; i < 10; ++i)
		{
			var card = teamData.generalList.generalcards[teamData.positionArray.list[i]]
			var curSeason = card.playerGeneralCard.bean.season + 1;
			var seasonData = card.generalCard.bean.peaks.split(',');
			if (!seasonData[curSeason] || seasonData[curSeason] == "2")
			{
				politicsStr += card.generalCard.bean.cardName + ":"+curSeason+"期. ";
			}
		}; log += ", " + politicsStr;

		for (var i = 0; i < teamData.positionArray.list.length; i++) {
			var card = teamData.generalList.generalcards[teamData.positionArray.list[i]];
			if (leaderBonusRecord[teamData.positionArray.list[i]])
				continue;

			var leaderBonus = "大将. " + card.generalCard.bean.cardName + ". "
									   + teamData.positionArray.list[i] + ". "
									   + "统." + card.playerGeneralCard.leaderBonusParam.leadership + ". "
									   + "攻." + card.playerGeneralCard.leaderBonusParam.offense + ". "
									   + "防." + card.playerGeneralCard.leaderBonusParam.defense + ". "
									   + "知." + card.playerGeneralCard.leaderBonusParam.wisdom + ". ";
			frame.console.log(leaderBonus);
			leaderBonusRecord[teamData.positionArray.list[i]] = leaderBonus;
		};

		for (var i = 0; i < teamData.positionArray.list.length; i++) {
			var card = teamData.generalList.generalcards[teamData.positionArray.list[i]];
			if (card.playerGeneralSeasonRecord && card.playerGeneralSeasonRecord.bean.totalAttackDamage)
			{
				var bean = card.playerGeneralSeasonRecord.bean;
				var record = "合战. " + card.generalCard.bean.cardName + ". " + teamData.positionArray.list[i] + ". 参战." + bean.games
									  + ". 击败." + bean.totalKnockDown + ". 溃退." + bean.totalDead
									  + ". 攻击." + bean.totalAttack + ". 暴击." + bean.totalAttackCritical + ". 特技." + bean.totalSkill
									  + ". 总伤害." + bean.totalAttackDamage + ". 单次伤害." + ((bean.totalAttackDamage / bean.totalAttack) >> 0)
									  + ". 格挡." + bean.totalDefenseCritical + ""
									  + ". 总损失." + bean.totalDefenseDamage + ". 总防御." + bean.totalDefense + ". 单次防御." + ((bean.totalDefenseDamage / bean.totalDefense) >> 0)
									  ;
				frame.console.log(record);
			}
		};

		getFormationData(frame, log);
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
		log += ", Money, " + totalGold;

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
		log += ", Formation, " + formationStr;

		// logout
		frame.console.log(log);
		frame.setTimeout(function() { readyForNext = true; }, 1000);
	}

	frame.location = "http://mn.mobcast.jp/mn/#/shop/formation";
	frame.setTimeout(checkFormation, 2000);
};

var logOutInfo = function(frame) {
	// todo: expired politics and potential replacement, expired generals
	var log = "Info. " + playerList[playerIndex];

	var checkPlayer = function() {
		frame.player = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.myData != "undefined"; });
		if (!frame.player || !frame.player.myData || !frame.player.myData.presentBoxCount) {
			frame.setTimeout(checkPlayer, 2000);
			return;
		}
		else {
			log += ", " + frame.player.myData.division + frame.player.myData.leagueName;
			log += ", 奖励, " + frame.player.myData.presentBoxCount;
			getSeriesData(frame, log);
		}
	};

	frame.rootScope = frame.angular.element(frame.document.getElementsByTagName('body')[0]).scope();
	frame.setTimeout(checkPlayer, 2000);
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
	dstData[0] = teamData.abilityEntity.politics1;
	dstData[1] = teamData.abilityEntity.politics2;
	dstData[2] = teamData.abilityEntity.politics3;
	frame.console.log("Formation. Player politics: ["+dstData+"]");

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
		initPlayerList(18, 110);
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
	autoPlay();
}

var nextPlayer = function() {
	var elem = document.getElementById("playerIndex");
	elem.value += 1;
	login();
};

var nextPlayer_old = function() {
	if (!playerList || playerList.length == 0)
	{
		initConfig();
		initPlayerList(18, 110);
		window.console.log(playerList);
	}

	++playerIndex;
	if (playerIndex == playerList.length)
		playerIndex = 0;

	document.getElementById("playerIndex").value = playerIndex;
	document.getElementById('userid').innerText = playerIndex;
	document.getElementById('username').innerText = playerList[playerIndex];

	var game = createGame(loginURL);

	window.setTimeout(function() {
		autoLogin(game.contentWindow);
	}, 4000 * timeRatio);
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
	return card.bean.generalCardId == 10120
//			|| card.bean.generalCardId == 10046
			;
}

var collectGacha = function(frame, config)
{
	var gacha = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.gachaReListup != "undefined"; });
	var count = 0;
	for (var i = 0; i < gacha.listupData.entity.generalCardList.length; i++) {
		var card = gacha.listupData.entity.generalCardList[i];
		//card.bean.generalCardId
		frame.console.log("Gacha. CardId: "+card.bean.generalCardId+", Name: "+card.bean.cardName);
		if ((config.type == 0 && (card.bean.cardRank > 0 || isSpecialCard(card))) ||
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

var newAccount = function() {
	var autoRun = function() {
		var frame = game.contentWindow;

		frame.autoTutorial = function () {
			window.console.log("frame.autoTutorial");
			autoTutorialBase(game.contentWindow);
		};

		frame.lastItemIndex = -1;

		var checkEnv = function () {
			if (!frame.angular) {
				frame.setTimeout(checkEnv, 2000);
				return;
			}

			frame.rootScope = frame.angular.element(frame.document.getElementsByTagName('body')[0]).scope();
			if (!frame.rootScope || !frame.rootScope.tutorial) {
				frame.setTimeout(checkEnv, 2000);
				return;				
			}

			frame.tutorial = findChildScope(frame.rootScope, function (childscope) { return typeof childscope.tutorialData != "undefined" });
			if (!frame.tutorial) {
				frame.setTimeout(checkEnv, 2000);
				return;				
			}

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
		var frame = game.contentWindow;
		frame.location = "http://mn.mobcast.jp/mn/#/";
	};

	var regist = function() {
		var frame = game.contentWindow;
		var button = frame.$("form[name='frmMain']");
		button.submit();
	};

	var createUser = function() {
		var frame = game.contentWindow;
		var input = frame.$("input[name='NAME']");
		input.val("モブ"+generatePasswords()+"ブ");
		frame.$("form[name=frmMain]").submit();
	};

	var visit = function() {
		var frame = game.contentWindow;
		var button = frame.$("[name='INSTALL']");

		var url = button.attr('onclick');
		url = "location.href='http://gmpa.jp/" + url.substring(url.indexOf('regist'));
		window.console.log(url);

		button.attr('onclick', url);
		button.click();
	};

	var timeRatio = document.getElementById("timeRatio").value;
	var newUserURL = document.getElementById("newUserURL").value;
	var count = document.getElementById("count").value;

	for (var i = 0; i < count; i++) {
		window.setTimeout(function() {
			var game = createGame(newUserURL);
			window.setTimeout(visit, 2000 * timeRatio);
			window.setTimeout(createUser, 4000 * timeRatio);
			window.setTimeout(regist, 6000 * timeRatio);
			window.setTimeout(openGame, 8000 * timeRatio);
			window.setTimeout(autoRun, 18000 * timeRatio);
		}, i * 60000 * timeRatio);
	};
};
