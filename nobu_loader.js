
//TODO
// 分析出同组的号
//

var loginURL = "http://user.mobcast.jp/login?guid=ON&return_to=http%3A%2F%2Fmn.mobcast.jp%2Fmn%2F&sc=on";
var newUserURL = "http://gmpa.jp/regist.php?gmpa=on&input=1&back_url=http%3A%2F%2Fmn.mobcast.jp%2Fmn%2F&gid=23&sid=0";

var rootURL = "http://mn.mobcast.jp/mn/";
var searchStr = "#/";//"?v=20140808.00.00#/";

var partialList = [43, 87, 56, 73, 17, 44, 45, 69, 36, 46, 91, 105, 24, 29, 66, 84, 47, 39];

var partialListIndex = 0;
var advancePlayerByPatialList = function(step)
{
	if (step)
		++partialListIndex;
	else
		partialListIndex += step;

	if (partialListIndex != playerList.length)
	{
		playerIndex = partialList[partialListIndex];		
	}
}

var getRootURL = function() {
	return rootURL + searchStr;
}
var getGachaURL = function() {
	return getRootURL() + "gacha/top?" + Math.random();
};

var getRecoverURL = function() {
	return getRootURL() + "shop/recover?" + Math.random();
};

var getExpeditionURL = function() {
	return getRootURL() + "expedition?" + Math.random();
};

var getWarMatchURL = function() {
	return getRootURL() + "war/match?" + Math.random();
};

var getInvitationURL = function() {
	return getRootURL() + "invite/invite?" + Math.random();
};

var getOrganizeURL = function() {
	return getRootURL() + "organize/general";
};

var getOrganizeFormationURL = function() {
	return getRootURL() + "organize/formation";
};

var getTeamDataURL = function() {
	return getRootURL() + "team_data?userID=";
};

var getWarRankingURL = function() {
	return getRootURL() + "war/ranking";
};

var getShopFormationURL = function() {
	return getRootURL() + "shop/formation";
};

var getConquestURL = function() {
	return getRootURL() + "conquest/conquest";
};

var getExplorationURL = function() {
	return getRootURL() + "exploration";//?" + Math.random();
};


var readyForNext = false;

var timeRatio = 1;
var timeDelay = 50;
var playerIndex = 0;
var startPlayer = 0;
var endPlayer = 0;
var playerList = [];
var password = "tzh20080426";
var playerCount = 18;
var playerCountYahoo = 136;

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
		if (i>=126 && i<=132)
			continue;

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
	if (!local || !local.angular || !local.angular.element || !local.document.getElementsByTagName('body')[0])
		return null;

	if (!local.rootScope || forceUpdate)
		local.rootScope = local.angular.element(local.document.getElementsByTagName('body')[0]).scope();

	return local.rootScope;
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
				window.setTimeout(checkPresents, 1000);
				return;
			}

			present.acquireAllPresents();
	       	if (config && config.fancyGacha) {
        		window.setTimeout(function() {
					tryFancyGacha(frame);            			
        		}, 2000);
        	}
		}; window.setTimeout(checkPresents, 1000);
	}; window.setTimeout(getAll, 1000);
};

var tryFancyGacha = function(frame) {
	frame.location = getGachaURL();

	var checkFancyGacha = function() {
		var gacha = findChildScope(getRootScope(), function(childscope) { return typeof childscope.gachaReListup != "undefined"; });
		if (!gacha || !gacha.walletData) {
			window.setTimeout(checkFancyGacha, 1000);
			return;
		}

		if (gacha.walletData.gameGold < 300)
			return;

		gacha.gachaType = 15;
		gacha.gotoPageListUp();

		var checkGachaResult = function() {
			frame.console.log("Checking gacha result...");
			var gacha = findChildScope(getRootScope(), function(childscope) { return typeof childscope.gachaReListup != "undefined"; });
			if (!gacha.listupData || !gacha.listupData.entity || !gacha.listupData.entity.generalCardList) {
				window.setTimeout(checkGachaResult, 2000);
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
			getFrame().tutorialDone = true;
		}; window.setTimeout(checkGachaResult, 2000);	
	}; window.setTimeout(checkFancyGacha, 1000);
};

var autoTutorialBase = function(frame, config)
{
    if (getRootScope().tutorial.currentPhaseIndex == 0)
    {
		var leader = findChildScope(getRootScope(), function (childscope) { return typeof childscope.click_popupOk != "undefined" });

        if (getRootScope().tutorial.currentItemIndex == 10 && leader && leader.selectIndex < 0)
        {
            if (!leader)
            {
                window.setTimeout(frame.autoTutorial, 500);
                return;
            }

            leader.selectIndex = (config && (typeof config.leader != "undefined")) ? config.leader : 1;
            leader.click_popupOk();
            window.setTimeout(frame.autoTutorial, 2000);
        }
        else if (getRootScope().tutorial.currentItemIndex >= frame.lastItemIndex)
        {
        	frame.lastItemIndex = getRootScope().tutorial.currentItemIndex;
            frame.tutorial.click();
            window.setTimeout(frame.autoTutorial, 1000);
        }
        else //if (getRootScope().tutorial.currentItemIndex == 9)
        {
            frame.tutorial.click();
            window.setTimeout(frame.autoTutorial, 3000);
        }
    }
    else if (getRootScope().tutorial.currentPhaseIndex == 7)
    {
        var states = findChildScope(getRootScope(), function (childscope) { return typeof childscope.gotoPageCountry != "undefined" });
        if (getRootScope().tutorial.currentItemIndex == 1)
        {
            /*states.gotoPageStates('oshu');*/
            //(config && (typeof config.city != "undefined")) ? config.city : 1
            var cityIndex = (((Math.random() * 59)|0)>>0)+1;
            states.gotoPageCountry(cityIndex);/*大阪37,尾张27,1-60*/
            states.click_gotoNextMessage();
            window.setTimeout(frame.autoTutorial, 1000);
        }
        else if (getRootScope().tutorial.currentItemIndex == 4)
        {
            states.click_finish();

            window.setTimeout(function() {
            	acquirePresents(frame, config);

            	if (config && config.fancyGacha) {

            	}
				else {
					getFrame().tutorialDone = true;
				}
                //window.location="http://mn.mobcast.jp/mn/#/invite/invite";
                // window.setTimeout(function() {
                //     $("input[name='codeInput']").value = "2xwy472";
                //     window.setTimeout(function() {
                //         var invite = findChildScope(getRootScope(), function (childscope) { return typeof childscope.inputInviteCode != "undefined" });
                //         invite.inputInviteCode();
                //     }, 1000);
                // }, 3000);
            }, 5000);
        }
        else
        {
            window.setTimeout(frame.autoTutorial, 200);
            frame.tutorial.click();
        }
    }
    else if (getRootScope().tutorial.currentPhaseIndex == 9)
    {
    	return;
    }
    else
    {
        window.setTimeout(frame.autoTutorial, 200);
        frame.tutorial.click();
    }
};

var checkChaki = function(frame) {
	frame.chaki = findChildScope(getRootScope(), function(childscope) { return typeof childscope.friendlyPoints != "undefined"; });
	if (frame.chaki == null) {
		window.setTimeout(checkChaki, 1000);
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
		window.setTimeout(checkChaki, 1000);
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
		frame.location = getRecoverURL();
		var checkRecover = function() {
			var recover = findChildScope(getRootScope(), function(childscope) { return typeof childscope.buyRecover != "undefined"; });
			if (!recover) {
				window.setTimeout(checkRecover, 2000);
				return;
			}

			frame.console.log("远征. " + frame.player.myData.lordName + ". 当前远征饭: " + recover.recoverItem);
			if (recover.recoverItem >= frame.recoverNeeded - 1) {
				recover.buyRecover("item");
				window.setTimeout(getChakiPoints, 4000);				
			}
			else {
				callForNextPlayer(frame);
			}
		}; window.setTimeout(checkRecover, 2000);
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
		var expedition = findChildScope(getRootScope(), function(childscope) { return typeof childscope.stamina != "undefined"; });
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
		window.setTimeout(function() {
	    	frame.expedition.listUp();
		}, 1000);
		window.setTimeout(function () {
			var result = doChallenge();
			if (result["continue"]) {
				// Arrange the next expedition
				window.setTimeout(locateExpedition, 2000);
				var index = result["index"];
				if (index > -1)
					window.setTimeout(function () {
						recordChallengeResult(index);
					}, 6000);
			}
			else {
				callForNextPlayer(frame, 6000);
			}
		}, 2000);
	};

	var doLocateExpedition = function() {
	    frame.expedition = findChildScope(getRootScope(), function(childscope) { return typeof childscope.stamina != "undefined"; });
	    if (frame.expedition == null) {
			var movie = findChildScope(getRootScope(), function(childscope) { return typeof childscope.movieEnd != "undefined"; });
			if (movie != null) {
				frame.console.log("Find expedition movie!");
				window.setTimeout(function () {
					movie.tap();
				}, 7000);
				window.setTimeout(locateExpedition, 9000);
			}
			else {
				window.setTimeout(doLocateExpedition, 2000);
			}
	    }
	    else {
	    	startChallenge();
	    }
	};

	var locateExpedition = function() {
		window.setTimeout(doLocateExpedition, 2000);
		frame.location=getExpeditionURL();
	};

	var getChakiPoints = function() {
		frame.location = "http://mn.mobcast.jp/mn/#/event/chaki/award";
		window.setTimeout(function() {
			frame.chaki = findChildScope(getRootScope(), function(childscope) { return typeof childscope.friendlyPoints != "undefined"; });
			if (frame.chaki == null || !checkChaki(frame)) {
				var movie = findChildScope(getRootScope(), function(childscope) { return typeof childscope.movieEnd != "undefined"; });
				if (movie != null)
					window.setTimeout(locateExpedition, 1000);
				else
					window.setTimeout(getChakiPoints, 1000);
				return;
			}

			window.setTimeout(locateExpedition, 2000);
		}, 3000);
	};

	if (!getRootScope())
		return;

	var checkPlayer = function() {
		frame.player = findChildScope(getRootScope(), function(childscope) { return typeof childscope.myData != "undefined"; });
		if (!frame.player) {
			frame.console.log("Checking player for expedition...");
			window.setTimeout(checkPlayer, 2000);
			return;
		}
		else {
			frame.console.log("远征. " + playerList[playerIndex]);
			window.setTimeout(locateExpedition, 3000);
		}
	}; window.setTimeout(checkPlayer, 2000);
};

var collectChakiAward = function(frame) {
	var collectChaki = function() {
		var chaki = findChildScope(getRootScope(), function(childscope) { return typeof childscope.friendlyPoints != "undefined"; });

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

				window.setTimeout(tryCheckChaki, 1000);
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

						window.setTimeout(tryCheckChaki, 1000);
						return;
					}
				}
			}
		}
		callForNextPlayer(frame, 4000);
	};

	var tryCheckChaki = function() {
		frame.location = "http://mn.mobcast.jp/mn/#/event/chaki/award";
		window.setTimeout(function() {
			var chaki = findChildScope(getRootScope(), function(childscope) { return typeof childscope.friendlyPoints != "undefined"; });
			if (chaki == null || !checkChaki(frame)) {
				window.setTimeout(tryCheckChaki, 1000);
				return;
			}

			collectChaki();
		}, 2000);
	};

	var checkPlayer = function() {
		frame.player = findChildScope(getRootScope(), function(childscope) { return typeof childscope.myData != "undefined"; });
		if (!frame.player) {
			frame.console.log("Checking player for expedition...");
			window.setTimeout(checkPlayer, 2000);
			return;
		}
		else {
			frame.console.log("远征. " + playerList[playerIndex]);
			window.setTimeout(tryCheckChaki, 1000);
		}
	};

	if (getRootScope())
		window.setTimeout(checkPlayer, 2000);
};


// game.contentWindow.location="http://mn.mobcast.jp/mn/#/exploration"
// var temp1 = findChildScope(getRootScope(), function(childscope) { return typeof childscope.click_adjacent != "undefined"; });

var startExploration = function() {
	window.isCheckingExplorationResult = false;
	doStartInterval(checkExploration1, function(){advancePlayerBy(1)});
};

var checkExplorationResult = function() {
	window.isCheckingExplorationResult = true;
	doStartInterval(checkExploration1, function(){advancePlayerBy(1)});
};

var checkExploration1 = function(frame)
{
	var doCheckExploration1 = function(frame)
	{
		var result = findChildScope(getRootScope(), function(childscope) { return typeof childscope.isAcquisition != "undefined"; });
		if (!result || !result.reward) {
			var movie = findChildScope(getRootScope(), function(childscope) {
				return typeof childscope.tap != "undefined" &&
					   typeof childscope.movieEnd != "undefined"; 
			});

			if (movie) {
				movie.movieEnd = true;
				movie.tap();
				movie.$apply();				
			}

			window.setTimeout(doCheckExploration1, 100);
			return;
		}

		window.console.log(window.playerTag + "; 包围网战果; "+result.maxFlag+"; 剩余军粮; "+window.player.myData.eventProvisionsNum);
		if (window.isCheckingExplorationResult)
		{
			window.setTimeout(function() {callForNextPlayer(frame);}, 2000);
			return;
		}

		if (result.maxFlag < 4000 && window.player.myData.eventProvisionsNum > 0)
		{
			window.setTimeout(function() {
				optimizePoliticsForExploration(getFrame());
			}, 2000);
		}
		else
		{
			callForNextPlayer(frame);
		}
	}

	frame.location = "http://mn.mobcast.jp/mn/#/event/nobunagaHoui/top";
	window.setTimeout(doCheckExploration1, 100);	
};

var optimizePoliticsForExploration = function(frame)
{
	var checkFormation = function() {
		var teamData = findChildScope(getRootScope(), function(childscope) {
			return typeof childscope.tapOkButton != "undefined" &&
				   typeof childscope.generalTap != "undefined" &&
				   typeof childscope.abilityEntity != "undefined";
		});
		if (!teamData) {
			window.setTimeout(checkFormation, 2000);
			return;
		}
		else
		{
			frame = getFrame();
		}

		var power = (teamData.abilityEntity.leaderships * 1.2 + teamData.abilityEntity.offenses) | 0;
		var dstData = []; var targetPos = 0; var delay = 0;
		dstData[0] = teamData.abilityEntity.politics1|0;
		dstData[1] = teamData.abilityEntity.politics2|0;
		dstData[2] = teamData.abilityEntity.politics3|0;
		frame.console.log(window.playerTag+"; 包围网内政; ["+dstData+"]");
		frame.console.log(window.playerTag+"; 包围网战力; " + power
						+ ";统:" + teamData.abilityEntity.leaderships + "|"
						+ "攻:" + teamData.abilityEntity.offenses + "|"
						+ "防:" + teamData.abilityEntity.defenses + "|"
						+ "知:" + teamData.abilityEntity.wisdoms);

		// if (power < 1600)
		// {
		// 	callForNextPlayer(frame);
		// 	return;
		// }

		if (dstData[0] < dstData[1] || dstData[0] < dstData[2])
		{
			if (dstData[1] > dstData[2])
				targetPos = 8;
			else
				targetPos = 9;

			DoSwap(teamData, 7, targetPos, ++delay);

			window.setTimeout(function() {
				frame.console.log(window.playerTag + ". Formation. Result: [" + teamData.abilityEntity.politics1 + ", "
														 + teamData.abilityEntity.politics2 + ", "
														 + teamData.abilityEntity.politics3 + "]");
				teamData.tapOkButton();
			}, ++delay * 2000);
		}

		window.setTimeout(function() {
			autoExploration(getFrame());
		}, ++delay * 2000);
	}

	var url = getOrganizeURL();
	frame.location = url;
	checkFormation(frame);
}

var explorationStep = 0;
var autoExploration = function(frame, config)
{
	var c_stepList_new_2 = [
		"end",
		"end",
		"end",
		"end",
		"end",
		"end",
		"end",
		"end",
		"80302",
		"80301",
		"end"
	];

	explorationStep = -1;

	if (config && config.hard)
		var stepList = c_stepList_new_1;
	else
		var stepList = c_stepList_new_2;

	var givingUp = false;
	var checkingWarResult = false; var warResultId = 0;
	var checkWarResult = function() {
		if (!checkingWarResult)
			return;

		var warResult = findChildScope(getRootScope(), function(childscope) { return typeof childscope.click_retryPopupMap != "undefined"; });
		if (!warResult || !warResult.leftTeam || !warResult.leftTeam.matchResult || warResult.curOne)// || !warResult.walletData)
		{
			window.clearTimeout(warResultId);
			warResultId = window.setTimeout(checkWarResult, 1000);
			return;
		}
		else
		{
			checkingWarResult = false;
		}

		// if (explorationStep > 9)
		// {
		// 	givingUp = true;
		// 	warResult.click_retryPopupMap();
		// }
		// else
		{
			warResult.showWarMatchRounds();
			warResult.$apply();
			window.setTimeout(function() {
				var warResult1 = findChildScope(getRootScope(), function(childscope) { return typeof childscope.click_retryPopupMap != "undefined"; });
				if (!warResult1)
					return;

				if (!warResult1.useItem)
				{
					callForNextPlayer(frame);
					return;
				}

				warResult1.click_retryPopupRetry();
				warResult1.curOne = true;
				window.setTimeout(gotoExploration, 5000);				
			}, 2000);
		}
	}

	var gotoExploration = function() {
		getFrame().location = getExplorationURL();

		window.setTimeout(checkExploration, 1000);
		checkingWarResult = true;
		checkWarResult();
	};

	var checkExploration = function() {
		var exploration = findChildScope(getRootScope(), function(childscope) { return typeof childscope.click_adjacent != "undefined"; });
		if (!exploration || !exploration.userInfoData || !exploration.userInfoData.provisionAmount) {
			window.console.log("checkExploration");
			window.setTimeout(checkExploration, 1000);
			return;
		}

		window.setTimeout(function() {
			if (givingUp)
			{
				checkWarResult = false;
				window.clearTimeout(warResultId);
				givingUp = false;
				exploration.click_giveupPopupYes();

				window.setTimeout(function() {
					autoExploration(getFrame());
				}, 4000);
			}
			else
			{
				window.setTimeout(doExploration, 1000);
			}
		}, 2000);

		window.console.log("checkExploration done");
	};

	var doExploration = function()
	{
		var warResult = findChildScope(getRootScope(), function(childscope) { return typeof childscope.click_retryPopupMap != "undefined"; });
		if (warResult)
			return;

		var exploration = findChildScope(getRootScope(), function(childscope) { return typeof childscope.click_adjacent != "undefined"; });
		if (!exploration)
			return;

		var step = (exploration && exploration.userInfoData) ? exploration.userInfoData.lastTurn : 0;
		if (step == explorationStep)
		{
			if (checkingWarResult == false)
			{
				checkingWarResult = true;
				checkWarResult();
			}
			return;
		}
		else
		{
			explorationStep = step;
		}

		window.console.log("Current step: "+step);

		var nextPos = stepList[10-step];
		if (nextPos == "done")
			return;
		else
			stepList[10-step] = "done";
		if (nextPos == "end")
			return;
		// var nextPos = stepList[step++];
		// if (nextPos == "end")
		// 	return;

		exploration.click_pole(exploration.poleMap[nextPos]);
		exploration.$apply();
		exploration.click_adjacent();

		if (stepList[10-step+1] == "end")
		{
			window.setTimeout(function() {
				exploration.click_goalPopupYes();
				var checkCurExplorationResult = function() {
					var curExplorationResult = findChildScope(getRootScope(), function(childscope) { return typeof childscope.click_next != "undefined"; });
					if (!curExplorationResult || !curExplorationResult.currentFlag)
					{
						window.setTimeout(checkCurExplorationResult, 1000);
						return;
					}

					frame.console.log(window.playerTag+"; 包围网结果; "+curExplorationResult.currentFlag);
					curExplorationResult.click_next();
					window.setTimeout(function() {callForNextPlayer(frame);}, 2000);
				}; checkCurExplorationResult();
			}, 2000);
		}
		else
		{
			checkingWarResult = true;
			checkWarResult();
			window.setTimeout(gotoExploration, 5000);
		}
	};

	gotoExploration();
}

var c_leadership_ratio = 1.7;
var c_offense_ratio = 1.4;
var c_wisdom_ratio = 1.2;
var c_defense_ratio = 1.0;

var DoSwap = function(teamData, src, dst, index) {
	window.setTimeout(function() {
		window.console.log("DoSwap. src: "+src+". dst: "+dst);
		if (src == dst)
			return;

		teamData.generalTap(src);
		teamData.generalTap(src);
		teamData.generalTap(dst);
		teamData.generalTap(dst);
	}, index * 2000);
};

var startOrganizeFormation = function()
{
	doStartInterval(gotoOrganizeFormation, function(){advancePlayerBy(1)});
};

var gotoOrganizeFormation = function(frame, nextfn, autoFormationFn)
{
	var checkFormation = function()
	{
		var formation = findChildScope(getRootScope(), function(childscope) {
			return typeof childscope.getFormationDataById != "undefined";
		});

		if (!formation || !formation.formationList || !formation.formationList.formation) {
			window.setTimeout(checkFormation, 2000);
			return;
		}

		if (nextfn)
			nextfn(getFrame())
		else
			autoFormation(getFrame(), autoFormationFn);
	};

	// hack!
	if (!nextfn)
	{
		var formationArea = document.getElementById("formationContent");
		if (formationArea)
			formationArea.remove();		
	}

	frame.location = getOrganizeFormationURL();
	window.setTimeout(checkFormation, 2000);
};

var baseScoreOfFormation = function(f)
{
	var score = 0;
	score += f.bean.cardRank * 200;
	if (f.bean.formationCardId == 31)	// 墨俣一夜城
		score -= 100;
	else if (f.bean.formationCardId == 16) // 雁行の陣
		score -= 100;

	return score;
};

var autoFormation = function(frame, fn)
{
	var formation = findChildScope(getRootScope(), function(childscope) {
		return typeof childscope.getFormationDataById!= "undefined";
	});

	window.primaryFormations = [];
	window.secondaryFormations = [];

	var formationList = formation.formationList.formation;
	for (var i = 0; i < formationList.length; i++) {
		var formation = formationList[i];
		var posList = formation.formationPositionList;

		var data = [];
		data.extraCost = formation.bean.additionalCost;
		data.level = formation.bean.cardRank;
		data.Id = formation.bean.formationCardId;
		data.name = formation.bean.formationName;
		data.leadership = formation.bean.bonusLeadership;
		data.offense = formation.bean.bonusOffense;
		data.defense = formation.bean.bonusDefense;
		data.wisdom = formation.bean.bonusWisdom;
		data.sum = data.leadership + data.offense + data.defense + data.wisdom;
		data.baseScore = baseScoreOfFormation(formation);

		data.requirements = [];
		data.nonrequirements = [];

		var posList2 = posList.sort(function(a,b) { return b.bean.posX - a.bean.posX; });
		var maxX = posList2[0].bean.posX;
		var c_frontCount = 3;
		for (var j = 0; j < posList2.length; j++) {
			var pos = posList2[j];
			if (pos.bean.posX > (maxX - 1000) || j < c_frontCount)
				pos.bean["position"] = "front";
			else
				pos.bean["position"] = "back";
		}

		for (var j = 0; j < posList.length; j++) {
			var pos = posList[j];
			if (pos.bean.armType != -1) {
				data.requirements.push({"armType":pos.bean.armType, "armTypeCode":pos.armTypeCode,
										"posX":pos.bean.posX, "posY":pos.bean.posY,
										"sequence":pos.bean.priority, "pos":pos.bean.position});
			}
			else
			{
				data.nonrequirements.push({"posX":pos.bean.posX, "posY":pos.bean.posY,
										   "sequence":pos.bean.priority, "pos":pos.bean.position});
			}
		};

		if (data.leadership >= 5 && (data.leadership + data.sum) >= 29) {
			primaryFormations.push(data);
		}
		else {
			secondaryFormations.push(data);
		}
	};

	window.primaryFormations = window.primaryFormations.sort(function(a,b) { return b.sum - a.sum; });
	for (var key in window.primaryFormations) {
		var f = window.primaryFormations[key];
		window.console.log("优选阵型."+f.Id+"."+f.name+(f.level+1)+".统:"+f.leadership+".总:"+f.sum);
	};
	for (var key in window.secondaryFormations) {
		var f = window.secondaryFormations[key];
		window.console.log("一般阵型."+f.Id+"."+f.name+(f.level+1));
	};

	var gotoOrganize = function(frame) {
		var checkOrganize = function() {
			var teamData = findChildScope(getRootScope(), function(childscope) {
				return typeof childscope.tapOkButton != "undefined" &&
					   typeof childscope.generalTap != "undefined" &&
					   typeof childscope.abilityEntity != "undefined";
			});

			if (!teamData) {
				window.setTimeout(checkOrganize, 2000);
				return;
			}

			doAutoFormation(getFrame());
		};

		frame.location = getOrganizeURL();
		window.setTimeout(checkOrganize, 2000);
	};

	if (fn) {
		fn(frame);
	}
	else {
		gotoOrganize(frame);		
	}
};

var getCardRatio = function(card, value)
{
	if (card.bean.generalCardId == 10459) // 延沢満延4.
	{
		return 1.0;
	}
	else if (card.bean.generalCardId == 10424) // Name: 柴田勝家4
	{
		return 1.5 * value;
	}
	else if (card.bean.generalCardId == 10307) // 柴田勝家3	 6763
	{
		return 1.3 * value;
	}
	else if (card.bean.generalCardId == 10265) // 山本晴幸2	 4513
	{
		return 0.9 * value;
	}
	else if (card.bean.generalCardId == 10209) // 前田利家2	 5530
	{
		return 1.1 * value;
	}
	else if (card.bean.generalCardId == 10311)	 // 	加藤清正3	 6974
	{
		return 1.4 * value;
	}
	else if (card.bean.generalCardId == 10216)	 // 	後藤基次2	 5635)
	{
		return 1.4 * value;
	}
	// else if (card.bean.generalCardId == 10327  // Name: 伊達政宗3
	// 	  || card.bean.generalCardId == 10488) // Name: 伊達政宗3
	// {
	// 	return value * 1.6;		
	// }
	// else if (card.bean.generalCardId == 10376  // Name: 柳生宗矩2
	// 	  || card.bean.generalCardId == 10120) // Name: 柳生宗矩1	 4517
	// {
	// 	return value * 1.4;
	// }

	return value;
};

var getCardStr = function(c)
{
	var season = c.playerGeneralCard ? (c.playerGeneralCard.bean.season|0) : 0;
	return c.generalCard.bean.cardName+(c.generalCard.bean.cardRank+1)+"."+(season+1)+"期";
};

var getSkillType = function(s)
{
	var skill = s.bean;
	if (skill.skillTrigger == 1 || skill.skillTrigger == 3 || skill.skillTrigger == 5)
	{
		return "1passive";
	}
	else if (skill.skillTrigger == 2)
	{
		return "4reactive";
	}
	else if (skill.skillIcon == 8 || skill.skillIcon == 9 || skill.skillIcon == 12 || skill.skillIcon == 13)
	{
		return "3proactiveBuff";
	}
	else
	{
		return "2proactive";
	}
};

// effectType
//  0~5 单体 低~x大
//  6~11 单连 低~x大
//  12~17 全体 低~x大
//  18~23 全连 低~x大
//  24~29 随机 低~x大
//  30~35 反击 低~x大
//  36~41 追击 低~x大
// skillCondition
//  1: 胜机中
var getSkillBonus = function(s)
{
	var c_critical_rate = 0.2;
	var c_win_chance = 0.1;

	var skill = s.bean;
	var ratio = 1.0 + (skill.effectType % 6) * 0.15;

	// 随机
	if (skill.effectType >= 24 && skill.effectType < 30)
	{
		ratio *= 1.3;
	}

	// 胜机中
	if (skill.skillCondition == 1)
	{
		ratio *= 0.6;
	}

	if (skill.skillTrigger == 1 || skill.skillTrigger == 3) // 味方攻击/被攻击
	{
		if (skill.skillIcon == 8 || skill.skillIcon == 10 || skill.skillIcon == 12)
			ratio += 0.2 + skill.exeRate / 1600;	// buff味方防御/debuff敌方攻击
		else if (skill.skillIcon == 9 || skill.skillIcon == 11 || skill.skillIcon == 13)
			ratio += 0.3 + skill.exeRate / 1600;	// buff味方攻击/debuff敌方防御
		else
			ratio += 0.5 + skill.exeRate / 800;		// attack
	}
	else if (skill.skillTrigger == 5) // 味方会心时
	{
		ratio += 0.1 + (skill.exeRate / 800) * c_critical_rate;
	}
	else if (skill.skillTrigger == 2) // 自分被攻击时反击
	{
		if (skill.conditionParam1 != 0)
			ratio += 0.3 * (skill.conditionParam1 * skill.conditionParam1 / 49);
		else
			ratio += 0.3;
	}
	else if (skill.skillTrigger == 7) // 自军胜机中
	{
		ratio *= 0.6;
		if (skill.skillIcon >= 8 && skill.skillIcon <= 13)
		{
			//ratio *= 0.8;
		}
	}
	else
	{
		if (skill.skillIcon >= 8 && skill.skillIcon <= 13)
		{
			ratio *= 0.8;
		}
		else
		{
			var multiplier = (skill.conditionParam1 != 0 && skill.skillCondition != 8) ? 0.25 : 1;
			ratio += skill.exeRate * multiplier / 800;			
		}
	}

	return ratio;
};

var logFormationScoreStr = function(f, logArea, nextSeason)
{
	var dataList = []
	for (var i = 0; i < f.orderedList.length; i++) {
		var card = f.orderedList[i];
		var season = card.playerGeneralCard ? (card.playerGeneralCard.bean.season|0) : 0;	
		if (nextSeason)
			++season;

		var data = {"name":card.generalCard.bean.cardName,"rank":card.generalCard.bean.cardRank,"season":season+1};
		dataList.push(data);
	}
	var strPrefix = "战力: "+c_redPre+f.score+c_redSuf+"."+f.name+". 最大: "+f.maxCost+". 消耗: "+f.cost+". 内政: "+f.politicsStr+". ";
	appendLog(addCategoryHtml(strPrefix, dataList), logArea);
};

var calcBestFormation = function(frame, cardList, baseCost, maxCost, priFormation, secFormation, nextSeason)
{
	var primaryList = []; var secondaryList = []; var subsitutionList = []; var otherList = []; var allList = [];
	for (var i = 0; i < cardList.length; i++) {
		var card = cardList[i];
		var generalCard = card.generalCard;

		var season = card.playerGeneralCard ? (card.playerGeneralCard.bean.season|0) : 0;
		if (nextSeason)
		{
			season = Math.min(++season, 9);
		}

		var seasonData = generalCard.bean.peaks.split(',');
		var offenseData = generalCard.bean.offenses.split(',');
		var defenseData = generalCard.bean.defenses.split(',');
		var leadershipData = generalCard.bean.leaderships.split(',');
		var wisdomData = generalCard.bean.wisdoms.split(',');

		generalCard.curData = [];
		generalCard.curData.offense = offenseData[season]|0;
		generalCard.curData.defense = defenseData[season]|0;
		generalCard.curData.leadership = leadershipData[season]|0;
		generalCard.curData.wisdom = wisdomData[season]|0;

		var collectCards = function(card, ratio, list1, list2)
		{
			var data = card.generalCard.curData;
			card.skillType = getSkillType(card.generalCard.skillList[0]);
			card.skillBonus = getSkillBonus(card.generalCard.skillList[0]);
			card.ratio = getCardRatio(card.generalCard, ratio) * card.skillBonus;
			card.power = (data.leadership * c_leadership_ratio + data.offense * c_offense_ratio +
						  data.wisdom * c_wisdom_ratio + data.defense * c_defense_ratio) * card.ratio;

			list1.push(card);
			if (list2)
				list2.push(card);
		}

		if (shouldOn(card.generalCard, season, seasonData, 1))
		{
			collectCards(card, 2.0, primaryList, allList);
		}
		else if (shouldOn(card.generalCard, season, seasonData, 2))
		{
			collectCards(card, 1.7, secondaryList, allList);
		}
		else if (shouldOn(card.generalCard, season, seasonData, 3))
		{ 
			collectCards(card, 1.4, secondaryList, allList);
		}
		else if ((generalCard.curData.offense > 90 || generalCard.curData.offense > 90) &&
				 (generalCard.curData.offense + generalCard.curData.leadership > 150))
		{
			collectCards(card, 1.2, subsitutionList, allList);
		}
		else if ((generalCard.curData.offense > 77 || generalCard.curData.leadership > 77) &&
				 (generalCard.curData.offense + generalCard.curData.leadership > 135))
		{
			collectCards(card, 1.0, subsitutionList, allList);
		}
		else
		{
			collectCards(card, 0.9, subsitutionList, allList);
			otherList.push(card);
		}
	}

	for (var key in primaryList) {
		var c = primaryList[key];
		frame.console.log("排阵.1等大将:"+getCardStr(c)+". Ratio:"+c.ratio);
	}
	for (var key in secondaryList) {
		var c = secondaryList[key];
		frame.console.log("排阵.2等大将:"+getCardStr(c)+". Ratio:"+c.ratio);
	}
	for (var key in subsitutionList) {
		var c = subsitutionList[key];
		frame.console.log("排阵.3等大将:"+getCardStr(c)+". Ratio:"+c.ratio);
	}

	if (allList.length < 12)
	{
		var otherList2 = otherList.sort(function(a,b) {
			return (b.generalCard.curData.offense + b.generalCard.curData.leadership * 1.1)
				 - (a.generalCard.curData.offense + a.generalCard.curData.leadership * 1.1);
		});
		var toAdd = 12 - allList.length;
		for (var i = 0; i < toAdd; i++) {
			allList.push(otherList2[i]);
			frame.console.log("排阵.补充大将:"+getCardStr(otherList2[i])+". Ratio:"+otherList2[i].ratio);
		};
	}

	var calcFormation = function(f) {
		f.politicsCost = baseCost;

		var group = [];
		getCardGroup(f, group, 7, allList, 0);

		if (f.orderedList)
		{
			var logArea = document.createElement('div');
			logArea.id = "formationContent";
			document.getElementById("formation").appendChild(logArea);
			logArea = document.getElementById("formationContent");

			logFormationScoreStr(f, logArea);

			return 1;
		}
		else
		{
			return 0;
		}
	}

	var fcount = 0;
	var newFormation = null; var score = 0;
	for (var key in priFormation)
	{
		var f = priFormation[key];
		f.maxCost = maxCost + f.extraCost;
		fcount += calcFormation(f);

		if (f.score > score) {
			score = f.score;
			newFormation = f;
		}
	}

	if (fcount == 0 || true)
	{
		for (var key in secFormation)
		{
			var f = secFormation[key];
			f.maxCost = maxCost + f.extraCost;
			fcount += calcFormation(f);

			if (f.score > score) {
				score = f.score;
				newFormation = f;
			}
		}	
	}

	return newFormation;
}

var doAutoFormation = function(frame)
{
	var teamData = findChildScope(getRootScope(), function(childscope) {
		return typeof childscope.tapOkButton != "undefined" &&
			   typeof childscope.generalTap != "undefined" &&
			   typeof childscope.abilityEntity != "undefined";
	});

	var politicsStr = ""; var politicsCost = 0;
	var cardList = [];
	for (var i = 0; i < teamData.positionArray.list.length; i++) {
		var card = teamData.generalList.generalcards[teamData.positionArray.list[i]];
		if (i > 6 && i < 10) {
			politicsStr += getCardStr(card)+"|";
			politicsCost += card.generalCard.bean.cost;
			continue;
		}
		else
		{
			cardList.push(card)
		}
	}

	var newFormation = calcBestFormation(frame, cardList, politicsCost, window.player.myData.leadership, window.primaryFormations, window.secondaryFormations);

	var setNewFormation = function(frame)
	{
		var formation = findChildScope(getRootScope(), function(childscope) {
			return typeof childscope.getFormationDataById!= "undefined";
		});

		var formationList = formation.formationList.formation;
		for (var i = 0; i < formationList.length; i++) {
			var f = formationList[i];
			if (f.bean.formationCardId == newFormation.Id)
			{
				formation.showDetail(f.bean.formationCardId);
				formation.$apply();
				formation.saveChange();
				checkTeamData();
				return;
			}
		};
	};

	var checkTeamData = function ()
	{
		var teamData = findChildScope(getRootScope(), function(childscope) {
			return typeof childscope.tapOkButton != "undefined" &&
				   typeof childscope.generalTap != "undefined" &&
				   typeof childscope.abilityEntity != "undefined";
		});

		if (!teamData) {
			window.setTimeout(checkTeamData, 2000);
			return;
		}

		for (var j = 0; j < teamData.positionArray.list.length; j++) {
			var card2 = teamData.generalList.generalcards[teamData.positionArray.list[j]];
			card2.cardIndex = j;
		}

		var posList = [].concat(teamData.positionArray.list);
		for (var i = 0; i < newFormation.orderedList.length; i++) {
			var card = newFormation.orderedList[i];
			for (var j = 0; j < posList.length; j++) {
				var card2 = teamData.generalList.generalcards[posList[j]];
				if (card.generalCard.bean.generalCardId == card2.generalCard.bean.generalCardId) {
					var card3 = teamData.generalList.generalcards[posList[i]];

					DoSwap(teamData, card2.cardIndex, i, (i+1));
					var tmp = card2.cardIndex;
					card2.cardIndex = i;
					posList[card2.cardIndex] = card2.generalCard.bean.generalCardId;
					card3.cardIndex = tmp;
					posList[card3.cardIndex] = card3.generalCard.bean.generalCardId;
					break;
				}
			}
		};

		window.setTimeout(function() {
			teamData.tapOkButton();
			callForNextPlayer(frame);
		}, ++i * 2000);
	};

	gotoOrganizeFormation(frame, setNewFormation);
};

var getCardGroup = function(f, ret, count, cardList, startIndex)
{
	for (var i = startIndex; i < cardList.length; ++i)
	{
		ret.push(cardList[i]);
		if (ret.length == 7) {
			var score = validateGroup(f, ret);
			if (score > -1 && (!f.score || score>f.score)) {
				f.score = score;
				f.cost = ret.cost;
				f.orderedList = ret.orderedList;
				ret.orderedList = null;
			}
		}
		else {
			getCardGroup(f, ret, count - 1, cardList, i + 1);			
		}
		ret.pop();
	}
};

var validateGroup = function(f, cl)
{
	var cardList = [].concat(cl);

	var posBonus = 8;
	for (var j = 0; j < f.requirements.length; j++) { if (f.requirements[j].armType < 1000) var posBonus = 12; }
	
	var bonusVal = [0, 5, 8, 10, 12];
	var familyMap = {};

	var cost = f.politicsCost;
	var offense = f.offense * 7; var defense = f.offense * 7;
	var leadership = f.leadership * 7; var wisdom = f.leadership * 7;

	var requirements = [].concat(f.requirements);
	for (var i = 0; i < cardList.length; i++) {
		var card = cardList[i].generalCard;
		var matchData = card.curData;

		if (!familyMap[card.groupName]) {
			familyMap[card.groupName] = {"count":1,"ratio":cardList[i].ratio};
		}
		else {
			familyMap[card.groupName].count += 1;
			familyMap[card.groupName].ratio += cardList[i].ratio;
		}

		cost += card.bean.cost;
		offense += matchData.offense * cardList[i].ratio;
		defense += matchData.defense * cardList[i].ratio;
		leadership += matchData.leadership * cardList[i].ratio;
		wisdom += matchData.wisdom * cardList[i].ratio;

		for (var j = 0; j < requirements.length; j++) {
			if (card.bean.armType == requirements[j].armType) {
				offense += posBonus * cardList[i].ratio;
				defense += posBonus * cardList[i].ratio;
				leadership += posBonus * cardList[i].ratio;
				wisdom += posBonus * cardList[i].ratio;
				requirements.splice(j, 1);
				break;
			}
			else if (requirements[j].armType >= 1000) {
				var code = requirements[j].armType - 1000;
				if (((card.bean.armType/3)>>0) == code) {
					offense += posBonus * cardList[i].ratio;
					defense += posBonus * cardList[i].ratio;
					leadership += posBonus * cardList[i].ratio;
					wisdom += posBonus * cardList[i].ratio;
					requirements.splice(j, 1);
					break;
				}
			}
		};
	};

	for (var key in familyMap) {
		var item = familyMap[key];
		var familyBonus = (item.count > bonusVal.length) ? bonusVal[bonusVal.length-1]:bonusVal[item.count-1];
		offense += familyBonus * item.ratio;
		defense += familyBonus * item.ratio;
		leadership += familyBonus * item.ratio;
		wisdom += familyBonus * item.ratio;
	}

	var score = f.baseScore + leadership * c_leadership_ratio + offense * c_offense_ratio + wisdom * c_wisdom_ratio + defense * c_defense_ratio;
	//window.console.log("formation: " + f.name + "score: "+ score + ". cost: " + cost + ". " + str);// + ". 内政: "+f.politicsStr);

	if (cost > f.maxCost)
		return -1;
	if (requirements.length > 0)
		return -1;

	var calcBestCandidate = function(requirement, card, candidateList)
	{
		var doPosition = function(newCard, target)
		{
			var refNew = newCard.generalCard.curData.defense * card.skillBonus;
			var refTarget = target.generalCard.curData.defense * target.skillBonus;
			if (requirement.pos == "front" && refNew > refTarget)
				candidateList.unshift(card);
			else if (requirement.pos == "back" && refNew < refTarget)
				candidateList.unshift(card);
		};

		if (requirement.sequence < 5)
		{
			if (card.skillType > candidateList[0].skillType)
			{
				candidateList.unshift(card);
			}
			else if (card.skillType == candidateList[0].skillType)
			{
				doPosition(card, candidateList[0]);
			}
		}
		else if (requirement.sequence > 4)
		{
			if (card.skillType < candidateList[0].skillType)
			{
				candidateList.unshift(card);
			}
			else if (card.skillType == candidateList[0].skillType)
			{
				doPosition(card, candidateList[0]);
			}						
		}
	}

	var orderedList = [];
	requirements = [].concat(f.requirements);
	for (var j = 0; j < requirements.length; j++)
	{
		var candidateList = [];
		for (var i = 0; i < cardList.length; i++)
		{
			var card = cardList[i];
			var generalCard = card.generalCard;
			if (generalCard.bean.armType == requirements[j].armType)
			{
				if (candidateList.length == 0)
				{
					candidateList.push(card);
				}
				else
				{
					calcBestCandidate(requirements[j], card, candidateList);
				}
			}
		}
		if (candidateList.length > 0)
		{
			cardList.splice(cardList.indexOf(candidateList[0]), 1);
			orderedList[requirements[j].sequence - 1] = candidateList[0];			
		}
		if (requirements[j].sequence - 1 == 1 && !candidateList[0])
		{
			var a = 1;
		}
	}

	for (var j = 0; j < requirements.length; j++)
	{
		var candidateList = [];
		for (var i = 0; i < cardList.length; i++)
		{
			var card = cardList[i];
			var generalCard = card.generalCard;
			if (requirements[j].armType >= 1000 && (((generalCard.bean.armType/3)>>0) == requirements[j].armType - 1000))
			{
				if (candidateList.length == 0)
				{
					candidateList.push(card);
				}
				else
				{
					calcBestCandidate(requirements[j], card, candidateList);
				}
			}
		}
		if (candidateList.length > 0)
		{
			cardList.splice(cardList.indexOf(candidateList[0]), 1);
			orderedList[requirements[j].sequence - 1] = candidateList[0];			
		}
		if (requirements[j].sequence - 1 == 1 && !candidateList[0])
		{
			var a = 1;
		}
	}

	var cardList2 = cardList.sort(function(a,b) { return a.generalCard.curData.defense - b.generalCard.curData.defense; });
	for (var j = 0; j < f.nonrequirements.length; ++j) 
	{
		var item = f.nonrequirements[j];
		var candidateList = [];
		for (var i = 0; i < cardList2.length; i++)
		{
			var card = cardList2[i];
			if (candidateList.length == 0)
			{
				candidateList.push(card);
			}
			else
			{
				calcBestCandidate(item, card, candidateList);
			}
		}
		cardList2.splice(cardList2.indexOf(candidateList[0]), 1);
		orderedList[item.sequence - 1] = candidateList[0];
	};

	//cardList.str = str;
	cl.cost = cost;
	cl.orderedList = orderedList;
	return (score>>0);
};

var getSeriesData = function(frame, log) {
	var resource = 0;
	var results = [0, 0, 0];
	var getData = function() {
		var series = findChildScope(getRootScope(), function(childscope) { return typeof childscope.seriesList != "undefined"; });
		if (!series) {
			window.setTimeout(getData, 2000);
			return;
		}

		// if (series.seriesList.length == 0 && series.day > 0) {
		// if (series.day != 1) {
		var goBackOneDay = function ()
		{
			var days = findChildScope(getRootScope(), function(childscope) { return typeof childscope.previousDay != "undefined"; });
			days.previousDay();
			days.$apply();
			window.setTimeout(getData, 3000);
		};

		if (series.day > 0) {
			if (series.seriesList.length != 5) {
				goBackOneDay();
				return;
			}

			for (var i = 0; i < series.seriesList.length; i++) {
				if (!series.seriesList[i].finished) {
					goBackOneDay();
					return;
				}
			}
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
	frame.location = getWarMatchURL();
	window.setTimeout(getData, 2000);
};


var getConquestInfo = function(frame, log)
{
	var stateNames =['oshu','kanto','chubu','kinai','saigoku','kyushu'];

	var checkConquest = function() {
		var conquest = findChildScope(getRootScope(frame), function(childscope) { return typeof childscope.gotoPageCountry!= "undefined"; });
		if (!conquest || !conquest.apiResultData || !conquest.apiResultData.data) {
			frame.console.log("Checking conquest...");
			window.setTimeout(checkConquest, 1000);
			return;
		}

		var conquestData = conquest.apiResultData.data;
		var str = sprintf("进军:%02.0f",conquestData.matchCountryId|0) + conquestData.matchCountryName;

		var resources = 0;
		var country = conquestData.countryDataMap["COUNTRY_"+conquestData.matchCountryId];
		var cities = country.castleDataList;
		for (var i = 0; i < cities.length - country.occupationCastleNum; i++) {
			resources += cities[i].resources;
		};
		var diff = conquestData.regularResources - resources;
		str += ";余额;"+(((diff)/10000)>>0)+";当前;"+((conquestData.regularResources/10000)>>0)+";所需:"+((resources/10000)>>0)+"万石.";
		if (log) {
			log += ";"+str;
		}
		else {
			frame.console.log(window.playerTag+";"+str);
		}

		var stateCountryList = [0];
		var lenOfStates = Object.keys(conquestData.statesDataMap).length;
		for (var i = 0; i < lenOfStates; ++i) {
			var countryNum = conquestData.statesDataMap["STATES_"+(i+1)].countryNum;
			stateCountryList.push(countryNum + stateCountryList[stateCountryList.length - 1]);				
		}
		window.console.log("stateCountryList: "+stateCountryList);

		var stateOfCity = function(cityIndex) {
			for (var i = 0; i < stateCountryList.length; i++) {
				if (cityIndex < stateCountryList[i])
					return i;
			};
		};

		var newTarget = -1;
		var curState = conquestData.matchStatesId;
		var diffInState = diff;
		var diffInNation = diff;
		var targetInState = -1;
		var targetInNation = -1;

		for (var i = stateCountryList[curState-1]; i < stateCountryList[curState]; i++) {
			var country = conquestData.countryDataMap["COUNTRY_"+(i+1)];
			if (!country.matchableFlag)
				continue;

			var cities = country.castleDataList;
			var resources = 0;
			for (var j = 0; j < cities.length - country.occupationCastleNum; j++) {
				resources += cities[j].resources;
			};
			var newDiff = conquestData.regularResources - resources;
			if ((diffInState > 0 && newDiff > 0 && newDiff < diffInState) ||
				(diffInState < 0 && newDiff > 0) ||
				(diffInState < 0 && newDiff < 0 && newDiff < diffInState))
			{
				targetInState = i;
				diffInState = newDiff;
			}
		};

		var lenOfCountry = Object.keys(conquestData.countryDataMap).length;
		for (var i = 0; i < lenOfCountry; ++i) {
			var country = conquestData.countryDataMap["COUNTRY_"+(i+1)];
			if (!country.matchableFlag)
				continue;

			var cities = country.castleDataList;
			var resources = 0;
			for (var j = 0; j < cities.length - country.occupationCastleNum; j++) {
				resources += cities[j].resources;
			};
			var newDiff = conquestData.regularResources - resources;
			if ((diffInNation > 0 && newDiff > 0 && newDiff < diffInNation) ||
				(diffInNation < 0 && newDiff > 0) ||
				(diffInNation < 0 && newDiff < 0 && newDiff < diffInNation))
			{
				targetInNation = i;
				diffInNation = newDiff;
			}
		}

		if (targetInNation > -1 || targetInState > -1)
		{
			var cityIndex = -1;
			if ((targetInNation > -1) &&
				((diffInState - diffInNation > 10*10000) ||
				 (diffInState < 0 && diffInNation > 0)))
			{
				cityIndex = targetInNation;
				var newTarget = conquestData.countryDataMap["COUNTRY_"+(cityIndex+1)];
				window.console.log(window.playerTag + sprintf(";新进军:%02.0f",conquestData.matchCountryId|0)+newTarget.countryName+";余额;"+(((diffInNation)/10000)>>0));
			}
			else if (targetInState > -1)
			{
				cityIndex = targetInState;
				var newTarget = conquestData.countryDataMap["COUNTRY_"+(cityIndex+1)];
				window.console.log(window.playerTag + sprintf(";新进军:%02.0f",conquestData.matchCountryId|0)+newTarget.countryName+";余额;"+(((diffInState)/10000)>>0));
			}

			if (cityIndex > -1)
			{
				var stateName = stateNames[stateOfCity(cityIndex) - 1];
				conquest.gotoPageStates(stateName);
				conquest.$apply();
				window.setTimeout(function () {
					conquest.gotoPageCountry(cityIndex+1);
					conquest.$apply();
					window.setTimeout(function () {
						conquest.changeMatchCountry(cityIndex);
						window.setTimeout(function () {
							callForNextPlayer(frame);
						}, 2000);
					}, 2000);
				}, 2000);				
			}
			else
			{
				callForNextPlayer(frame);
			}
		}
		else
		{
			callForNextPlayer(frame);
		}
	};

	frame.location = getConquestURL();
	window.setTimeout(checkConquest, 1000);
};

var leaderBonusRecord = {};
var getPoliticsData = function(frame, log) {
	frame.location = getOrganizeURL();

	var checkPolitics = function() {
		var teamData = findChildScope(getRootScope(), function(childscope) {
			return typeof childscope.tapOkButton != "undefined" &&
				   typeof childscope.generalTap != "undefined" &&
				   typeof childscope.abilityEntity != "undefined";
		});

		if (!teamData) {
			window.setTimeout(checkPolitics, 2000);
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
		// 		recordCard(card, season, window.playerInfo.topOnBench);
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

		var recordCard = function(card, season, list, value) {
			var data = {"name":card.generalCard.bean.cardName,"rank":card.generalCard.bean.cardRank,"season":season+1}
			if (value)
				data.value = value;
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
			window.playerInfo.droppable = [];
			window.playerInfo.topOnBench = [];
			window.playerInfo.goldOn = [];
			window.playerInfo.goldOff = [];
			window.playerInfo.cur = [];
			window.playerInfo.cur.politics = [];
			window.playerInfo.cur.politics.name = "内政即将过期";
			window.playerInfo.cur.duty = [];
			window.playerInfo.cur.bench = [];
			window.playerInfo.nxt = [];
			window.playerInfo.nxt.duty = [];
			window.playerInfo.nxt.bench = [];
			window.playerInfo.nxt.politics = [];
		}; initCardInfo();

		var sep = "合战;"+ getTodayString() + ";" + playerIndex + "." + playerList[playerIndex] + ";";
		for (var i = 0; i < teamData.positionArray.list.length; i++)
		{
			var card = teamData.generalList.generalcards[teamData.positionArray.list[i]];
			if (card.playerGeneralSeasonRecord && card.playerGeneralSeasonRecord.bean.totalAttackDamage)
			{
				var cost = card.generalCard.bean.cost;
				var rank = (card.generalCard.bean.cardRank|0)+1;
				var season = (card.playerGeneralCard.bean.season|0)+ 1;
				var bean = card.playerGeneralSeasonRecord.bean;
				var record = sep + card.generalCard.bean.cardName +rank+";"+rank+";消耗;"+cost+";"
								 + teamData.positionArray.list[i]+";"+season+"期"
								 + ";阵型:" + teamData.formationData.bean.formationName + ";位置:" + ((i|0)+1)
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
					recordCard(card, season, window.playerInfo.cur.politics);
					// ++expiredPolitics;
					// politicsStr += card.generalCard.bean.cardName + ":"+curSeason+"期|";
				}
			}

			if (isCrappyCard(card.generalCard)) {
				recordCard(card, season, window.playerInfo.droppable);
			}
			else if (season < 10 && seasonData[season] == "2" && !noDropCard(card.generalCard)) {
				recordCard(card, season, window.playerInfo.droppable);
			}
			else if (season < 9 && seasonData[season + 1] == "2" && i > 9 && !noDropCard(card.generalCard)) {
				recordCard(card, season, window.playerInfo.droppable);
			}

			logExpiredCard(i, card, season, seasonData, window.playerInfo.cur);
			logExpiredCard(i, card, season + 1, seasonData, window.playerInfo.nxt);

			if (card.generalCard.bean.cardRank >=3)
			{
				var expired = (season < 10 && seasonData[season] == "2");
				var data = {"name":card.generalCard.bean.cardName,"rank":card.generalCard.bean.cardRank,"season":season+1,"onduty":(i < 10)
						   ,"expired":expired};
				if (i < 10)
					window.playerInfo.goldOn.push(data);
				else if (!expired)
					window.playerInfo.goldOff.push(data);					
			}

			if (i > 9) {
				var season = card.playerGeneralCard.bean.season;
				var politicses = card.generalCard.bean.politicses.split(',');
				if ((isHighPolitics(card.generalCard) || isMediumPolitics(card.generalCard)) &&
					(politicses[season+1] > politics[0] || politicses[season+1] > 90))
				{
					recordCard(card, season+1, window.playerInfo.nxt.politics, politicses[season+1]);
				}

				if (shouldOn(card.generalCard, season, seasonData))
				{
					recordCard(card, season, window.playerInfo.topOnBench);
				}
			}
		}

		log += ";" + (window.playerInfo.normalText("当前参战过期", window.playerInfo.cur.duty));
		log += ";" + (window.playerInfo.normalText("替补强将", window.playerInfo.topOnBench));
		log += ";" + (window.playerInfo.normalText("替补内政", window.playerInfo.nxt.politics));
		log += ";" + (window.playerInfo.normalText(window.playerInfo.cur.politics.name, window.playerInfo.cur.politics));
		log += ";" + (window.playerInfo.normalText("参战即将过期", window.playerInfo.nxt.duty));
		log += ";" + (window.playerInfo.normalText("可替换武将", window.playerInfo.droppable));
		log += ";" + (window.playerInfo.normalText("四星参战", window.playerInfo.goldOn));
		log += ";" + (window.playerInfo.normalText("四星替补", window.playerInfo.goldOff));
		log += ";" + (window.playerInfo.normalText("当前替补过期", window.playerInfo.cur.bench));
		log += ";" + (window.playerInfo.normalText("替补即将过期", window.playerInfo.nxt.bench));

		// logout
		frame.logDone = true; frame.logtxt = log;
		frame.location = getRootURL();
	}; window.setTimeout(checkPolitics, 2000);
};

var getFormationData = function(frame, log)
{
	var checkFormation = function() {
		var formation = findChildScope(getRootScope(), function(childscope) {
			return typeof childscope.walletData != "undefined" &&
				   typeof childscope.getTopPageDisplayFormationItems != "undefined";
		});

		if (!formation || !formation.walletData ||
			!(formation.walletData.gameGold + formation.walletData.portalGold + formation.walletData.bonusPoint))
		{
			window.setTimeout(checkFormation, 2000);
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

	frame.location = getShopFormationURL();
	window.setTimeout(checkFormation, 2000);
};

var getRankingData = function(frame, log) {
	var checkRanking = function() {
		var ranking = findChildScope(getRootScope(), function(childscope) { return typeof childscope.switchToLastSeason != "undefined"; });
		if (!ranking || !ranking.rankings.league) {
			window.setTimeout(checkRanking, 2000);
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

	frame.location = getWarRankingURL();
	window.setTimeout(checkRanking, 2000);
}

	var c_yellowPre = "<font color='#FF00FF'><b>";
	var c_yellowSuf = "</b></font>";
	var c_redPre = "<font color='red'><b>";
	var c_redSuf = "</b></font>";
	var infoStr = function(item, markup) {
		var str = item.name+((item.rank|0)+1);
		if (item.value)
			str += ":"+item.value;
		str += ":"+item.season+"期|";
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
		frame.player = findChildScope(getRootScope(), function(childscope) { return typeof childscope.myData != "undefined"; });
		if (!frame.player || !frame.player.myData || !frame.player.myData.presentBoxCount) {
			window.setTimeout(checkPlayer, 2000);
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
			window.setTimeout(doLog, 1000);
			return;
		}

		if (logFn)
			logFn(frame, frame.logtxt);
		else
			frame.console.log(frame.logtxt);
		callForNextPlayer(frame);
	}

	window.setTimeout(checkPlayer, 2000);

	frame.logDone = false;
	window.playerInfo = [];
	window.playerInfo.normalText = addCategoryNormal;

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

		appendLog(addCategoryHtml("当前参战过期", window.playerInfo.cur.duty), logArea);
		appendLog(addCategoryHtml("替补强将", window.playerInfo.topOnBench), logArea);
		appendLog(addCategoryHtml(window.playerInfo.cur.politics.name, window.playerInfo.cur.politics), logArea);
		appendLog(addCategoryHtml("参战即将过期", window.playerInfo.nxt.duty), logArea);
		appendLog(addCategoryHtml("当前替补过期", window.playerInfo.cur.bench), logArea);
		appendLog(addCategoryHtml("替补即将过期", window.playerInfo.nxt.bench), logArea);
		appendLog(addCategoryHtml("替补内政", window.playerInfo.nxt.politics), logArea);
		appendLog(addCategoryHtml("可替换武将", window.playerInfo.droppable), logArea);
		appendLog(addCategoryHtml("四星参战", window.playerInfo.goldOn), logArea);
		appendLog(addCategoryHtml("四星替补", window.playerInfo.goldOff), logArea);
	};

	var frame = getFrame();
	window.playerInfo = [];
	window.playerInfo.normalText = addCategoryNormal;

	var logArea = document.getElementById("logContent");
	if (logArea)
		logArea.remove();

	logOutInfo(frame, logFn);
}

var startOptimiztePolitics = function()
{
	doStartInterval(optimizePolitics, function(){advancePlayerBy(1)});
};

var optimizePolitics = function(frame)
{
	var url = getOrganizeURL();
	frame.location = url;

	var checkFormation = function() {
		var teamData = findChildScope(getRootScope(), function(childscope) {
			return typeof childscope.tapOkButton != "undefined" &&
				   typeof childscope.generalTap != "undefined" &&
				   typeof childscope.abilityEntity != "undefined";
		});
		if (!teamData) {
			window.setTimeout(checkFormation, 2000);
			return;
		}
		else
		{
			frame = getFrame();
		}

		var dstData = [];
		dstData[0] = teamData.abilityEntity.politics1|0;
		dstData[1] = teamData.abilityEntity.politics2|0;
		dstData[2] = teamData.abilityEntity.politics3|0;
		dstData = dstData.sort();
		frame.console.log("Formation. Player politics: ["+dstData+"]");

		var politicsCards = [];
		var familyMap = {};
		for (var i = 0; i < teamData.positionArray.list.length; i++) {
			var card = teamData.generalList.generalcards[teamData.positionArray.list[i]];
			if (i > 6 && i < 10) {
				var values = card.generalCard.bean.politicses.split(',');
				var val = values[card.playerGeneralCard.bean.season];
				card.politics = val|0;
				card.currentIndex = i;
				politicsCards.push(card);
			}

			if (i < 10) {
				if (!familyMap[card.generalCard.groupName]) {
					familyMap[card.generalCard.groupName] = 1;
				}
				else {
					familyMap[card.generalCard.groupName] += 1;
				}				
			}
		}

		politicsCards = politicsCards.sort(function(a,b) { return a.politics - b.politics; });

		var swapId = 0;
		var costLeft = teamData.abilityEntity.maxCost - teamData.abilityEntity.cost;
		for (var i = 0; i < teamData.positionArray.list.length; i++) {
			var card = teamData.generalList.generalcards[teamData.positionArray.list[i]];
			var generalCard = card.generalCard;
			if (i > 9 && isPoliticsCard(generalCard))
			{
				var values = generalCard.bean.politicses.split(',');
				var val = values[card.playerGeneralCard.bean.season];
				card.politics = val|0;
				card.currentIndex = i;

				var familyCountSrc = familyMap.hasOwnProperty(politicsCards[0].generalCard.groupName) ? familyMap[politicsCards[0].generalCard.groupName] - 1 : 0;
				var familyCountDst = familyMap.hasOwnProperty(card.generalCard.groupName) ? familyMap[card.generalCard.groupName] : 0;
				familyCountSrc = (familyCountSrc > 4) ? 0 : familyCountSrc;
				familyCountDst = (familyCountDst > 4) ? 0 : familyCountDst;
				srcBonus = (familyCountSrc > familyCountDst) ? 3 : 0;
				dstBonus = (familyCountSrc < familyCountDst) ? 3 : 0;
				if (card.politics + dstBonus > politicsCards[0].politics + srcBonus) {
					var needCost = card.generalCard.bean.cost - politicsCards[0].generalCard.bean.cost;
					if (needCost <=	 costLeft) {
						frame.console.log(window.playerTag+". Old Politics: "+politicsCards[0].politics+"("+srcBonus+")"
										+". New Politics: "+card.politics+"("+dstBonus+")"+". ExtraCost: "+needCost);

						DoSwap(teamData, politicsCards[0].currentIndex, card.currentIndex, ++swapId);
						costLeft -= needCost;

						var tmp = politicsCards[0].currentIndex;
						politicsCards[0].currentIndex = card.currentIndex;
						card.currentIndex = tmp;

						politicsCards[0] = card;
						politicsCards = politicsCards.sort(function(a,b) { return a.politics - b.politics; });						
					}
					else
					{
						frame.console.log(window.playerTag+". 内政. 点数不足!"+". Old Politics: "+politicsCards[0].politics+"("+srcBonus+")"
										+". New Politics: "+card.politics+"("+dstBonus+")"+". ExtraCost: "+needCost);
					}
				}
			}
		}

		if (swapId > 0) {
			window.setTimeout(function() {
				frame.console.log(window.playerTag + ". Formation. Result: [" + teamData.abilityEntity.politics1 + ", "
														 + teamData.abilityEntity.politics2 + ", "
														 + teamData.abilityEntity.politics3 + "]");
				teamData.tapOkButton();
			}, ++swapId * 2000);
		}

		window.setTimeout(function() {
			callForNextPlayer(frame);
		}, ++swapId * 2000);
	}; window.setTimeout(checkFormation, 2000);
}

var politics = [-1, -1, -1];
var findOpponent = function(frame) {
	frame.console.log("Formation. " + playerList[playerIndex]);
	frame.location = getWarMatchURL();

	var getOpponent = function() {
		var series = findChildScope(getRootScope(), function(childscope) { return typeof childscope.seriesList != "undefined"; });
		if (!series) {
			window.setTimeout(getOpponent, 2000);
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

			var url = getTeamDataURL() + item.vsPlayerId;
			var openOpponentInfo = function() {
				var teamData = findChildScope(getRootScope(), function(childscope) { return typeof childscope.abilityEntity != "undefined"; });
				if (!teamData) {
					frame.location = url;
					window.setTimeout(openOpponentInfo, 2000);
				}
				else {
					getOpponentPolitics(frame);
				}
			}; window.setTimeout(openOpponentInfo, 2000);
		}
		else {
			callForNextPlayer(frame);
		}
	}; window.setTimeout(getOpponent, 2000);
};

var getOpponentPolitics = function(frame) {
	if (!getRootScope())
		return;

	var teamData = findChildScope(getRootScope(), function(childscope) { return typeof childscope.abilityEntity != "undefined"; });
	politics[0] = teamData.abilityEntity.politics1;
	politics[1] = teamData.abilityEntity.politics2;
	politics[2] = teamData.abilityEntity.politics3;

	frame.console.log("Formation. Opponent politics: ["+politics+"]");

	gotoFormation(frame);
};

var gotoFormation = function(frame) {
	var url = getOrganizeURL();
	frame.location = url;

	var checkFormation = function() {
		var teamData = findChildScope(getRootScope(), function(childscope) {
			return typeof childscope.tapOkButton != "undefined" &&
				   typeof childscope.generalTap != "undefined" &&
				   typeof childscope.abilityEntity != "undefined";
		});
		if (!teamData) {
			window.setTimeout(checkFormation, 2000);
			return;
		}

		getFrame().alert = function(msg) { frame.console.log("Redirect alert. "+msg); };
		makeFormation(frame);
	}; window.setTimeout(checkFormation, 2000);
};

var makeFormation = function(frame) {
	var DoSwapInternal = function(src, dst, index) {
		var src1 = src + 7;
		var dst1 = dst + 7;
		window.setTimeout(function() {
			frame.console.log("src: "+src1+". dst: "+dst1);
			if (src1 == dst1)
				return;

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

	var teamData = findChildScope(getRootScope(), function(childscope) {
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

	if (orderSrc[0] == orderDst[0] && orderSrc[1] == orderDst[1] && orderSrc[2] == orderDst[2])
	{
		callForNextPlayer(frame);
		return;		
	}

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
				DoSwapInternal (j, j-1, index++);
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
		DoSwapInternal (stack[i], stack[i]-1, index++);
	}

	window.setTimeout(function() {
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
	window.setTimeout(function() {
		readyForNext = true;
	}, timeout ? timeout : 1000);
};

var autoPlay = function(nextLogin, fn, playerCB) {
	var logAreaList = ["logContent", "gachaContent", "formationContent"];
	for (var i = 0; i < logAreaList.length; i++) {
		var logArea = document.getElementById(logAreaList[i])
		if (logArea)
			logArea.remove();
	};

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
			return;
		}

		var player = findChildScope(getRootScope(), function(childscope) { return typeof childscope.myData != "undefined"; });
		if (!player) {
			window.setTimeout(checkGame, 2000);
			return;			
		}

		game.contentWindow.alert = function(msg) { frame.console.log("Redirect alert. "+msg); };
		window.playerTag = "" + playerIndex + ";" + playerList[playerIndex];
		window.player = player;

		if (fn)
			fn(game.contentWindow);
	};

	window.setTimeout(checkGame, 3000 * timeRatio);

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
	if (!getRootScope()) {
		frame.console.log("doGacha. Can not find rootScope!");
		return;
	}

	var gachaArea = document.getElementById("gachaContent");
	if (gachaArea)
		gachaArea.remove();

	var gachaResultArea = document.getElementById("gachaResultContent");
	if (gachaResultArea)
		gachaResultArea.remove();

	var gacha = findChildScope(getRootScope(), function(childscope) { return typeof childscope.gachaReListup != "undefined"; });
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
		if (!agent)
		{
			frame.console.log(window.playerTag + "Gacha. Weekly. Have not collected!");
			callForNextPlayer(frame);
			return;			
		}
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
		var gacha = findChildScope(getRootScope(), function(childscope) { return typeof childscope.gachaReListup != "undefined"; });
		if (!gacha.listupData || !gacha.listupData.entity || !gacha.listupData.entity.generalCardList)
			window.setTimeout(checkGachaResult, 2000);
		else
			collectGacha(frame, config);
	}; window.setTimeout(checkGachaResult, 2000);
};

// 0:早, 1:普, 2:晚, 3:长
var getSeasonType = function(card) {
	if (card.growth.growthIconCode == "PREMATURE")
		return 0;
	else if (card.growth.growthIconCode == "NORMAL")
		return 1;
	else if (card.growth.growthIconCode == "LATE")
		return 2;
	else if (card.growth.growthIconCode == "ENDURE")
		return 3;

	return -1;
};

var notInBadShape = function(card, season, seasonData)
{
	var refData = card.growth.bean.offenses.split(',');
	return (season < 10) && (refData[season]/refData[0] > 0.8);
}

var isInGoodShape = function(card, season, seasonData)
{
	var type = getSeasonType(card);
	return ((type == 0 && (season == 1 || season == 2))
		 || (type == 1 && (season > 1 && season < 5))
		 || (type == 2 && (season > 2 && season < 7))
		 || (type == 3 && (season > 1 && season < 7))
		   );
};

var isinExcelentShape = function(card, season, seasonData)
{
	return (season < 10) && (seasonData[season] == "1");
};

var shouldOn = function(card, season, seasonData, level)
{
	if ((!level || level == 1) && shouldAlwaysOn(card) && notInBadShape(card, season, seasonData))
		return true;

	if ((!level || level == 2) && shouldOnIfInGoodShape(card) && isInGoodShape(card, season, seasonData))
		return true;

	if ((!level || level == 3) && isTopClassCard(card) && isInGoodShape(card, season, seasonData))
		return true;

	return false;
};

var shouldAlwaysOn = function(card)
{
	return card.bean.cardRank > 2
		|| card.bean.generalCardId == 10376 // Name: 柳生宗矩2
		|| card.bean.generalCardId == 10382 // Name: 朝比奈泰能3
		|| card.bean.generalCardId == 10327 // Name: 伊達政宗3
		|| card.bean.generalCardId == 10488 // Name: 伊達政宗3
		|| card.bean.generalCardId == 10325	 // 	島津義弘3 8023
		|| card.bean.generalCardId == 10305	 // 	真田幸村3	 7945
		|| card.bean.generalCardId == 10171	 // 	武田信玄3	 7230
		|| card.bean.generalCardId == 10326	 // 	島津家久3	 7820
		|| card.bean.generalCardId == 10034	 // 	片倉重長2	 7245
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 
//		|| card.bean.generalCardId == 
	;
};

var shouldOnIfInGoodShape = function(card)
{
	return false
		|| card.bean.generalCardId == 10170	 // 	柳生三厳2	 6735
		|| card.bean.generalCardId == 10228	 // 	島津貴久2	 5720
		|| card.bean.generalCardId == 10209	 // 	前田利家2	 5530
		|| card.bean.generalCardId == 10229	 // 	島津歳久3	 5080
		|| card.bean.generalCardId == 10120	 // 	柳生宗矩1	 4517
		|| card.bean.generalCardId == 10172	 // 	山県昌景3	 7056
		|| card.bean.generalCardId == 10311	 // 	加藤清正3	 6974
		|| card.bean.generalCardId == 10307	 // 	柴田勝家3	 6763
		|| card.bean.generalCardId == 10315	 // 	本多忠勝3	 6730
		|| card.bean.generalCardId == 10333	 // 	最上義光3	 6672
		|| card.bean.generalCardId == 10532	 // 	六角義賢3	 6135
		|| card.bean.generalCardId == 10108 // Name: 原虎胤3
	;
};

var keepForFuture = function(card)
{
	return card.bean.cardRank > 2 || isTopClassCard(card) || shouldAlwaysOn(card) || shouldOnIfInGoodShape(card)
		|| card.bean.generalCardId == 10228	 // 	島津貴久2	 5720
		|| card.bean.generalCardId == 10209	 // 	前田利家2	 5530
		|| card.bean.generalCardId == 10229	 // 	島津歳久3	 5080
		|| card.bean.generalCardId == 10539 // Name: 井伊直孝3
		|| card.bean.generalCardId == 10248 // Name: 藤堂高虎3 
		|| card.bean.generalCardId == 10105	 // 	武田勝頼3	 8178
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
		|| card.bean.generalCardId == 10213	 // 	福島正則2	 5978
		|| card.bean.generalCardId == 10216	 // 	後藤基次2	 5635
		|| card.bean.generalCardId == 10267	 // 	服部正成2	 4747
		|| card.bean.generalCardId == 10265	 // 	山本晴幸2	 4513
		|| card.bean.generalCardId == 10254	 // 	長宗我部国親2 4022
		|| card.bean.generalCardId == 10539 // Name: 井伊直孝3

		|| card.bean.generalCardId == 10105	 // 	武田勝頼3	 8178
		|| card.bean.generalCardId == 10330 // Name: 下間頼廉3
		|| card.bean.generalCardId == 10339	 // 	村上義清3 7748
		|| card.bean.generalCardId == 10321	 // 	吉川元春3	 7155
		|| card.bean.generalCardId == 10308	 // 	滝川一益3	 6495
		|| card.bean.generalCardId == 10319	 // 	北条綱成3	 6468
		|| card.bean.generalCardId == 10231	 // 	新納忠元3	 6144
		|| card.bean.generalCardId == 10337	 // 	斎藤道三3	 6107
		|| card.bean.generalCardId == 10238	 // 	安東愛季3	 5939
		|| card.bean.generalCardId == 10175	 // 	立花宗茂3	 5710
		|| card.bean.generalCardId == 10338	 // 	斎藤義龍3	 5451
		|| card.bean.generalCardId == 10343	 // 	松永久秀3	 5420
		|| card.bean.generalCardId == 10252	 // 	十河一存3	 5332
		|| card.bean.generalCardId == 10233	 // 	伊達成実3	 6099
		|| card.bean.generalCardId == 10357	 // 	鈴木重秀3	 5210
		|| card.bean.generalCardId == 10235	 // 	鈴木重意3	 4658
		|| card.bean.generalCardId == 10163	 // 	江里口信常3 4731
		|| card.bean.generalCardId == 10313	 // 	大谷吉継3	 4524
		|| card.bean.generalCardId == 10248 // Name: 藤堂高虎3 

		|| card.bean.generalCardId == 10306	 // 	織田信長3	 5155

//		|| card.bean.generalCardId == 10318	 // 	北条氏康3	 3632
//		|| card.bean.generalCardId == 10173	 // 	上杉謙信3	 3571

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
	return false;

	// return card.bean.generalCardId == 10376 // Name: 柳生宗矩2
	// 	|| card.bean.generalCardId == 10382 // Name: 朝比奈泰能3
	// 	|| card.bean.generalCardId == 10327 // Name: 伊達政宗3
	// 	|| card.bean.generalCardId == 10488 // Name: 伊達政宗3
	// 	|| card.bean.generalCardId == 10325 // Name: 島津義弘3
	// 	|| card.bean.generalCardId == 10305 // Name: 真田幸村3
	// 	|| card.bean.generalCardId == 10343 // Name: 松永久秀3
	// 	|| card.bean.generalCardId == 10171 // Name: 武田信玄3
	// 	|| card.bean.generalCardId == 10318 // Name: 北条氏康3
	// 	|| card.bean.generalCardId == 10306 // Name: 織田信長3
	// ;
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

	return isHighPolitics(card)// || isMediumPolitics(card)
		|| card.bean.generalCardId == 10209 // Name: 前田利家2
		|| card.bean.generalCardId == 10265 // Name: 山本晴幸2
		|| card.bean.generalCardId == 10034 // Name: 片倉重長2
		|| card.bean.generalCardId == 10208 // Name: 丹羽長秀2
		|| card.bean.generalCardId == 10207 // Name: 真田幸隆2
		|| card.bean.generalCardId == 10376 // Name: 柳生宗矩2
		|| card.bean.generalCardId == 10254 // Name: 長宗我部国親2
		|| card.bean.generalCardId == 10228 // Name: 島津貴久2
		|| card.bean.generalCardId == 10170 // Name: 柳生三厳2
		|| card.bean.generalCardId == 10267 // Name: 服部正成2

		|| card.bean.generalCardId == 10244 // Name: 太田資正2
		|| card.bean.generalCardId == 10216 // Name: 後藤基次2
		|| card.bean.generalCardId == 10213 // Name: 福島正則2
		|| card.bean.generalCardId == 10258	 // 	龍造寺隆信2

		|| card.bean.generalCardId == 10210 // Name: 織田信秀2
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
		|| card.bean.generalCardId == 10112 // Name: 佐々成政3
		|| card.bean.generalCardId == 10336 // Name: 太原雪斎3
		|| card.bean.generalCardId == 10201 // Name: 長尾政景3
		|| card.bean.generalCardId == 10140 // Name: 鈴木元信3
		|| card.bean.generalCardId == 10310 // Name: 蒲生氏郷3
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

		|| card.bean.generalCardId == 10320 // Name: 毛利元就3 

		// 70早->87
		|| card.bean.generalCardId == 10222 // Name: 大久保長安3
		|| card.bean.generalCardId == 10316 // Name: 本多正信3
		|| card.bean.generalCardId == 10524 // Name: 林秀貞3 
		|| card.bean.generalCardId == 10241 // Name: 結城晴朝3
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
	var gacha = findChildScope(getRootScope(), function(childscope) { return typeof childscope.gachaReListup != "undefined"; });
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

			var values = c.bean.politicses.split(',');
			card = c;
			card.politicsVal = values[1];
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
			window.setTimeout(function () {
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
				window.setTimeout(checkDiscardData, 1000);
				return;
			}

			var candidates = [];
			var discardList = gacha.getDischargeCardList();

			var politicsThreshold = 200; var politics = []; var politicsCandidates = []; var politicsCandidatesVal = [];
			var expiringPoliticsCount = 0;
			var expiredPoliticsCount = 0;
			var politicsCost = 0;
			for (var i = 0; i < discardList.length; i++) {
				var card2 = discardList[i];
				card2.seasonData = card2.generalCard.bean.peaks.split(',');
				if (i > 6) {
					var season = card2.playerGeneralCard.bean.season;
					var values = card2.generalCard.bean.politicses.split(',');
					if (i < 10) {
						politicsCost += card2.generalCard.bean.cost;
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

				var gachaResultArea = document.getElementById("gachaResultContent");
				if (gachaResultArea)
					gachaResultArea.remove();
				gachaResultArea = document.createElement('div');
				gachaResultArea.id = "gachaResultContent";
				window.document.getElementById("gachaResult").appendChild(gachaResultArea);
				gachaResultArea = document.getElementById("gachaResultContent");

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
					var str = window.playerTag + ".Replace. "+card.bean.cardName+"=>"+candidates[0].generalCard.bean.cardName;
					frame.console.log(str);
					appendLog(str, gachaResultArea);

					gacha.setSelectDischargeCardIndex(candidates[0].replaceIndex);
					gacha.gotoPageResult();
					gotoNextStep();				
				}
				else
				{
					var formationArea = document.getElementById("formationContent");
					if (formationArea)
						formationArea.remove();

					var cardList = [].concat(discardList);
					cardList.splice(7, 1);
					cardList.splice(7, 1);
					cardList.splice(7, 1);
					if (!isPoliticsCard(card))
					{
						var newCard = {"generalCard":card};
						cardList.push(newCard);						
					}

					var newFormation = calcBestFormation(frame, cardList, politicsCost, window.player.myData.leadership, window.primaryFormations, window.secondaryFormations, true);
					if (newFormation.orderedList.indexOf(newCard) < 0 && !keepForFuture(card) && !isPoliticsCard(card))
					{
						window.console.log("Gacha. No need to keep: "+card.bean.name);
						gotoNextStep();				
					}
					else
					{
						appendLog("可替换武将.", gachaArea);
						for (var i = 10; i < discardList.length; i++) {
							var card2 = discardList[i];
							if (newFormation.orderedList.indexOf(card2) < 0 && !isPoliticsCard(card2.generalCard) && !keepForFuture(card2.generalCard))
							{
								var str = card2.generalCard.bean.cardName
										  +((card2.generalCard.bean.cardRank|0)+1)
										  +"."+((card2.playerGeneralCard.bean.season|0)+1)+"期|";
								appendLog(str, gachaArea);

								str = window.playerTag + ".Replace. "+card.bean.cardName+"=>"+card2.generalCard.bean.cardName;
								frame.console.log(str);
								appendLog(str, gachaResultArea);

								gacha.setSelectDischargeCardIndex(card2.replaceIndex);
								gacha.gotoPageResult();
								gotoNextStep();	
							}
						}

						logFormationScoreStr(newFormation, gachaArea, true);
					}
				}
			}
			else
			{
				gotoNextStep();				
			}
		}; window.setTimeout(checkDiscardData, 1000);
	}
	else if (config.autoCollect && count == 1) {
		for (var i = 0; i < gacha.listupData.entity.generalCardList.length; i++) {
			var card = gacha.listupData.entity.generalCardList[i];
			if (config.type == 0 && (card.bean.cardRank == 1 || card.bean.cardRank == 2 || isSpecialCard(card))) {
				gacha.gotoPageDischarge(i);
				var checkDiscardData = function() {
					if (!gacha.dischargeData) {
						window.setTimeout(checkDiscardData, 1000);
					}
					else {
						var discardList = gacha.getDischargeCardList();
						for (var i = 0; i < discardList.length; i++) {
							var card2 = discardList[i];
							if (card2.generalCard.bean.cardRank == 0 && !isSpecialCard(card2.generalCard) && config.type == 0) {
								frame.console.log("Replace. "+card.bean.cardName+"=>"+card2.generalCard.bean.cardName);
								gacha.setSelectDischargeCardIndex(i);
								gacha.gotoPageResult();

								window.setTimeout(function () {
									prepareGacha(frame, config);
								}, 2000);
								return;
							}
						};
					}
				}; window.setTimeout(checkDiscardData, 1000);
			}
			else if (config.type == 2 && card.bean.cardRank >= 3) {
				return;
			}
		};
	}
};

var prepareGacha = function(frame, config) {
	frame.location = getGachaURL();
	getRootScope(frame);
	var checkGacha = function() {
		var gacha = findChildScope(getRootScope(), function(childscope) { return typeof childscope.gachaReListup != "undefined"; });
		if (!gacha || !gacha.walletData) {
			window.setTimeout(checkGacha, 1000);
		}
		else {
			if (gacha && gacha.listupData && gacha.listupData.entity)
				gacha.listupData.entity.generalCardList = null;
			doGacha(frame, config);
		}
	}; window.setTimeout(checkGacha, 1000);
};

// type. {2: money, 0: normal}
var startGacha = function(config, frame)
{
	maxGachaCount[config.type] = (!config.count) ? 1 : config.count;
	curGachaCount[config.type] = 0;
 	nextGachaType = config.type;

 	if (config && config.safeCollect) {
 		gotoOrganizeFormation(getFrame(), null, function() {
			prepareGacha(getFrame(), config);
 		});
 	}
 	else {
		prepareGacha(getFrame(), config);
 	}
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
	var city = document.getElementById("city").value;
	var leader = document.getElementById("leader").value;

	if (!config)
		config = [];
	config.city = city;
	config.leader = leader;

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
			frame.tutorial = findChildScope(getRootScope(), function (childscope) { return typeof childscope.tutorialData != "undefined" });
			if (getRootScope().tutorial.currentPhaseIndex == 0)
			{
			    getRootScope().tutorial.currentItemIndex=9;
			    frame.tutorial.click();
			    window.setTimeout(frame.autoTutorial, 4000 * timeRatio);
			}
			else
			{
			    window.setTimeout(frame.autoTutorial, 200);
			}
		};
		checkEnv();
	};

	var openGame = function() {
		state = -1;
		var frame = game.contentWindow;
		frame.location = getRootURL();

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
		window.setTimeout(function() { newAccount(config); }, 2000);
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
	frame.location = getInvitationURL();
};

var doGetInvitatoinInfo = function(frame) {
	var checkInvitation = function() {
		var invitation = findChildScope(getRootScope(), function(childscope) { return typeof childscope.inviteCount != "undefined"; });
		if (!invitation) {
			window.setTimeout(checkInvitation, 2000);
			return;
		}

		frame.console.log(window.playerTag+";邀请完成:"+invitation.inviteCount+";URL:"+invitation.inviteUrl);
		callForNextPlayer(frame);
	}

	frame.location = getInvitationURL();
	window.setTimeout(checkInvitation, 2000);
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
