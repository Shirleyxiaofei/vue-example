(function() {
	"use strict";

	function getBrowserInfo() {
		var Msie = /(msie\s|trident.*rv:)([\w.]+)/,
			Firefox = /(firefox)\/([\w.]+)/,
			Chrome = /(chrome)\/([\w.]+)/,
			Opera = /(opera).+version\/([\w.]+)/,
			Safari = /version\/([\w.]+).*(safari)/,
			agent = navigator.userAgent.toLowerCase(),
			match = Msie.exec(agent);
		if(match) return {
			"browser": "IE",
			"version": match[2] || "0"
		};
		match = Firefox.exec(agent);
		if(match) return {
			"browser": match[1] || "",
			"version": match[2] || "0"
		};
		match = Chrome.exec(agent);
		if(match) return {
			"browser": match[1] || "",
			"version": match[2] || "0"
		};
		match = Opera.exec(agent);
		if(match) return {
			"browser": match[1] || "",
			"version": match[2] || "0"
		};
		match = Safari.exec(agent);
		if(match) return {
			"browser": match[2] || "",
			"version": match[1] || "0"
		};
		return "false"
	}

	function detectOS() {
		var isUnix, UserAgent, isIpad, isIphone, isAndroid, isWindowsCe, isWindowsMobile, isWin2K, isXP, isVista, isWin7, isWin8, isWin81, isLinux, bIsAndroid, isWinXP, isWin2003, isWinVista, isWin10, sUserAgent = navigator.userAgent,
			isWin = "Win32" === navigator.platform || "Win64" === navigator.platform || "Windows" === navigator.platform,
			isMac = "Mac68K" === navigator.platform || "MacPPC" === navigator.platform || "Macintosh" === navigator.platform || "MacIntel" === navigator.platform;
		if(isMac) return "Mac";
		isUnix = "X11" === navigator.platform && !isWin && !isMac;
		if(isUnix) return "linux";
		UserAgent = sUserAgent.toLowerCase();
		isIpad = /ipad/.test(UserAgent);
		isIphone = /iphone os/.test(UserAgent);
		isAndroid = /android/.test(UserAgent);
		isWindowsCe = /windows ce/.test(UserAgent);
		isWindowsMobile = /windows mobile/.test(UserAgent);
		isWin2K = /windows nt 5.0/.test(UserAgent);
		isXP = /windows nt 5.1/.test(UserAgent);
		isVista = /windows nt 6.0/.test(UserAgent);
		isWin7 = /windows nt 6.1/.test(UserAgent);
		isWin8 = /windows nt 6.2/.test(UserAgent);
		isWin81 = /windows nt 6.3/.test(UserAgent);
		if(isIpad || isIphone || isAndroid || isWindowsMobile || isWindowsCe) return "other";
		isLinux = String(navigator.platform).indexOf("Linux") > -1;
		bIsAndroid = "android" === sUserAgent.toLowerCase().match(/android/i);
		if(isLinux) return bIsAndroid ? "other" : "linux";
		if(isWin) {
			isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
			if(isWin2K) return "win7";
			isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
			if(isWinXP) return "win7";
			isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
			if(isWin2003) return "win7";
			isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
			if(isWinVista) return "win7";
			isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
			if(isWin7) return "win7";
			isWin10 = sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows NT 6.3") > -1 || sUserAgent.indexOf("Windows NT 6.4") > -1 || sUserAgent.indexOf("Windows NT 10.0") > -1 || sUserAgent.indexOf("Windows 10") > -1;
			if(isWin10) return "win10";
			if(isWin8 || isWin81) return "win7"
		}
		return "false"
	}

	function checkBrowser() {
		var browserInfo, browser, version, browserArray, supportArray, index, currentOs = detectOS(),
			browserFlag = "C",
			flag = browserFlag;
		if("false" === currentOs) return flag;
		if("other" === currentOs) return "A";
		browserInfo = getBrowserInfo();
		if("false" === browserInfo) return flag;
		browser = browserInfo.browser.toLowerCase();
		version = browserInfo.version;
		browserArray = supportOSArray[currentOs.toLowerCase()];
		supportArray = browserArray[browser];
		for(index in supportArray) {
			flag = supportArray[index];
			if(index.indexOf("X") >= 0) return flag;
			if(index.indexOf("+") >= 0 && parseInt(version, 10) >= parseInt(index, 10)) return flag;
			if(parseInt(version, 10) === parseInt(index, 10)) return flag
		}
		return browserFlag
	}

	function setCookie(cname, cvalue) {
		document.cookie = cname + "=" + cvalue + ";path=/"
	}
  function IEVersion() {
    var browserFlag = "B";
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
//        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
//        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isOpera = userAgent.indexOf("OPR") > -1;
    if (isOpera) {
      var reOpera = new RegExp("OPR/(\\d+\\.\\d+\\.\\d+\\.\\d+)");
      reOpera.test(userAgent);
      var OperaVersion = parseFloat(RegExp["$1"]);
      if(OperaVersion<52){
        browserFlag = "C";
        alert('Opera版本低于52');
        return false;
      }
    }
    if (userAgent.indexOf("Firefox") > -1) {
      var reFirefox = new RegExp("Firefox/(\\d+\\.\\d+)");
      reFirefox.test(userAgent);
      var FirefoxVersion = parseFloat(RegExp["$1"]);
      if(FirefoxVersion<56){
        browserFlag = "C";
        alert('Firefox版本低于56');
        return false;
      }
    }
    if (userAgent.indexOf("Chrome") > -1){
      var reChrome = new RegExp("Chrome/(\\d+\\.\\d+\\.\\d+\\.\\d+)");
      reChrome.test(userAgent);
      var ChromeVersion = parseFloat(RegExp["$1"]);
      if(ChromeVersion<63){
        browserFlag = "C";
        return browserFlag;
        alert('Chrome版本低于63');
        return false;
      }

    }
    if (userAgent.indexOf("Safari") > -1) {
      var reSafari = new RegExp("Version/(\\d+\\.\\d+) Safari");
      reSafari.test(userAgent);
      var SafariVersion = parseFloat(RegExp["$1"]);
      if(SafariVersion<10){
        browserFlag = "C";
        alert('Safari版本低于10');
        return false;
      }
    }
    if(isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if(fIEVersion<9){
        browserFlag = "C";
        alert('IE版本低于9');
        return false;
      }

    }
    return browserFlag;
  }
	function CreateElement(tags,style){
		var el = document.createElement(tags);
		if(style && JSON.stringify(style) !== "{}"){
			for(var k in style){
				el.setAttribute(k,style[k])
			}
		}
		return el;
	}
	function loadTip(){
		var img = CreateElement('img',{
			src :'/static/img/face.png',
			id:'face',
		})
		var browserInfo = document.getElementById('browserInfo');
		browserInfo.insertBefore(img,browserInfo.childNodes[0]);
	}
	function loadExplore(){
		var ul = CreateElement('ul',{
			'class':'browserContent'
		});
		var expolres =[
			{
				name:'chrome',
				img:'chrome.png',
				link:'https://www.google.com/chrome/',
				txt:'Chrome 31+'
			},
			{
				name:'ie',
				img:'ie.png',
				link:'https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads',
				txt:'IE 11+'
			},{
				name:'ff',
				img:'firefox.png',
				link:'https://www.mozilla.org/en-US/firefox/new/',
				txt:'FireFox 27+'
			}
		];
		for(var i=0,len=expolres.length;i<len;i++){
			var li = CreateElement('li',{
				'class':'browserName'
			});
			var img = CreateElement('img',{
				'src':'/static/img/'+expolres[i].img
			});
			var a = CreateElement('a',{
				'class' :'browserLink',
				'href' : expolres[i].link
			});
			var p = CreateElement('p');
			p.innerHTML = expolres[i].txt;
			a.innerHTML = '下载最新版本';
			li.appendChild(img);
			li.appendChild(p);
			li.appendChild(a);
			ul.appendChild(li)
		};

		var temp = document.getElementById('template');
		temp.appendChild(ul);
    var app=document.getElementById('app');
    document.body.removeChild(app);
    console.log(app);
	}


	function loadCss(filename) {
		var fileref = document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
		document.getElementsByTagName("head")[0].appendChild(fileref)
	}


	function setErrorCss(){
		var cssLink = ['pageframework','browsersupport','error.extend'];
		loadCss('/static/css/browserCheck.css')
		loadExplore()
		loadTip()
		var temp = document.getElementById('template');
		temp.style.display = 'block'
	}

	var supportOSArray = {
			"win7": {
				"ie": {
					"11+": "A"
				},
				"firefox": {
					"38+": "A",
					"27+": "B"
				},
				"chrome": {
					"43+": "A",
					"31+": "B"
				}
			},
			"win10": {
				"microsoft edge": {
					"13+": "B"
				},
				"ie": {
					"11+": "A"
				},
				"firefox": {
					"38+": "A",
					"27+": "B"
				},
				"chrome": {
					"43+": "A",
					"31+": "B"
				}
			},
			"linux": {
				"firefox": {
					"27+": "A",
					"X": "B"
				},
				"chrome": {
					"50+": "A",
					"31+": "B"
				}
			},
			"mac": {
				"chrome": {
					"43+": "A",
					"31+": "B"
				},
				"firefox": {
					"38+": "A",
					"27+": "B"
				},
				"safari": {
					"8+": "B"
				}
			}
		},
		result = IEVersion();
	"C" === result ? setErrorCss() : "B" === result ? setCookie("browserCheckResult", "B") : setCookie("browserCheckResult", "A")
})();
