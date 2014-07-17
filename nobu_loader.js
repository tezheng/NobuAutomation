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

var loginURL = "http://user.mobcast.jp/login?guid=ON&return_to=http%3A%2F%2Fmn.mobcast.jp%2Fmn%2F&sc=on";
var newUserURL = "http://gmpa.jp/regist.php?gmpa=on&input=1&back_url=http%3A%2F%2Fmn.mobcast.jp%2Fmn%2F&gid=23&sid=0";

var timeRatio = 1;
var timeDelay = 30;
var initConfig = function() {
	timeDelay = document.getElementById("timeDelay").value;	
	timeRatio = document.getElementById("timeRatio").value;	
}

var playerIndex = 2;
var playerCount = 17;
var playerList = null;
var password = null;
var initPlayerList = function(playerCount, playerCountYahoo) {
	playerIndex = document.getElementById("playerIndex").value;
	password = document.getElementById("password").value;
	playerList = [
					"tezheng1982@gmail.com", "tezhengchenhao@gmail.com"
//					, "dummyedu@gmail.com", "dummyedu01@gmail.com", "dummyedu02@gmail.com", "dummyedu03@gmail.com", "dummedu@gmail.com"
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
	frame.width = 350;
	frame.height = 450;
	frame.frameborder = '0';
	frame.scrolling = 'no';
	frame.src = url
	document.body.appendChild(frame);	

	var result = document.getElementById("game");
	return result;
};

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

            window.setTimeout(function() {
                window.location="http://mn.mobcast.jp/mn/#/invite/invite";
                window.setTimeout(function() {
                    $("input[name='codeInput']").value = "2xwy472";
                    window.setTimeout(function() {
                        var invite = findChildScope(frame.rootScope, function (childscope) { return typeof childscope.inputInviteCode != "undefined" });
                        invite.inputInviteCode();
                    }, 1000);
                }, 3000);
            }, 2000);
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

var autoExpedition = function(frame)
{
	var doChallenge = function() {
 		if (!frame.expedition || frame.expedition.stamina == 0)
 			return {"continue":false, "index":-1};

		for (var index = 0; index <  frame.expedition.matchList.length - 1; ++index)
		{
			var me = frame.player.myData;
			var opponent = frame.expedition.matchList[index];

			// result. 0: won, 1: lost, 3: not done yet
			if (opponent.result > 1)
			{
				var threatDegree = (opponent.threatDegree == 1) ? " 强敌":" 普通";
				if (opponent.threatDegree == 1 && opponent.eventItemId == 3) {
					frame.console.log("远征. " + me.lordName+". 名茶!: "+me.rank+" vs "+op.vsPlayerName+threatDegree+" lvl "+opponent.vsRank+" 活动物品: "+opponent.eventItemId);
				}
				else if (opponent.vsRank > 10 && (opponent.vsRank > me.rank))
				{
					frame.console.log("远征. " + me.lordName+". 跳过: "+me.rank+" vs "+op.vsPlayerName+threatDegree+" lvl "+opponent.vsRank+" 活动物品: "+opponent.eventItemId);
					continue;
				}
				else if (opponent.vsRank - me.rank > 5)
				{
					frame.console.log("远征. " + me.lordName+". 跳过: "+me.rank+" vs "+op.vsPlayerName+threatDegree+" lvl "+opponent.vsRank+" 活动物品: "+opponent.eventItemId);
					continue;
				}

				frame.expedition.stamina -= 1;
				opponent.result = -2;
				frame.expedition.challenge(opponent.vsPlayerId);
				return {"continue":true, "index":index};
			}
		}
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
		}, 2000);
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
		}, 3000);
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
			if (frame.chaki == null) {
				var movie = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.movieEnd != "undefined"; });
				if (movie != null)
					frame.setTimeout(locateExpedition, 1000);
				else
					frame.setTimeout(getChakiPoints, 1000);
				return;
			}

			var me = frame.player.myData;
			frame.console.log("远征. " + me.lordName + ". 茶器数: " + frame.chaki.teaSets);
			frame.console.log("远征. " + me.lordName + ". 友好度: " + frame.chaki.friendlyPoints);
			frame.setTimeout(locateExpedition, 2000);
		}, 3000);
	};

	frame.rootScope = frame.angular.element(frame.document.getElementsByTagName('body')[0]).scope();
	if (!frame.rootScope)
		return;
	frame.player = findChildScope(frame.rootScope, function(childscope) { return typeof childscope.myData != "undefined"; });
	if (!frame.player)
		return;

	frame.console.log("远征. " + playerList[playerIndex]);
	frame.location="http://mn.mobcast.jp/mn/#/expedition";
	frame.setTimeout(getChakiPoints, 3000);
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

var autoPlay = function(nextLogin) {
	document.getElementById("playerIndex").value = playerIndex;
	document.getElementById('userid').innerText = playerIndex;
	document.getElementById('username').innerText = playerList[playerIndex];

	var game = createGame(loginURL);

	window.setTimeout(function() {
		autoLogin(game.contentWindow);
	}, 4000 * timeRatio);

	window.setTimeout(function() {
		autoExpedition(game.contentWindow);
	}, 15000 * timeRatio);

	if (nextLogin && nextLogin > 0)
	{
		window.setTimeout(function() {
			++playerIndex;
			if (playerIndex == playerList.length)
				playerIndex = 0;
			autoPlay(nextLogin);
		}, nextLogin);
	}
};

var start = function() {
	initConfig();
	initPlayerList(18, 20);
	window.console.log(playerList);

	autoPlay(timeDelay * 1000 * timeRatio);
};

var nextPlayer = function() {
	if (!playerList)
	{
		initConfig();
		initPlayerList(18, 20);
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

var newAccount = function() {
	var timeRatio = document.getElementById("timeRatio").value;	

	var game = createGame(newUserURL);

	window.setTimeout(function() {
		var frame = game.contentWindow;
		frame.$("input[name='NAME']").val("モブ"+generatePasswords());
		frame.$("form[name=frmMain]").submit();
	}, 3000 * timeRatio);

	window.setTimeout(function() {
		var frame = game.contentWindow;

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
		    //frame.setTimeout(frame.autoTutorial, 5000);
		}
		else
		{
		    frame.setTimeout(frame.autoTutorial, 200);
		}
	}, 15000 * timeRatio);
};
