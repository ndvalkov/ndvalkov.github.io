// "http://cryptochat.apphb.com/CryptoChatService.svc/"


var persisters = (function() {
	
	// var username = localStorage.getItem("username");
	var sessionID = localStorage.getItem("sessionID");
	var randomNum = localStorage.getItem("random");
	var expectedNum;
	
	function saveUserData(userData) {
		localStorage.setItem("sessionID", userData.sessionID);
		sessionID = userData.sessionID;
	}
	
	function clearUserData() {
		localStorage.removeItem("sessionID");
		sessionID = "";
	}
	
	function generateRandom() {
		var num = parseInt(Math.random() * 999999999);
		localStorage.setItem("random", num)
		randomNum = num;
		expectedNum = 999999999 - randomNum;
		return num;
	}
	
	
	
	// --------------------------------------------
	
	var MainPersister = Class.create({
		init: function(rootUrl) {
			this.rootUrl = rootUrl;
			this.user = new UserPersister(this.rootUrl);
			this.chat = new ChatPersister(this.rootUrl);
		},
		
		isUserLoggedIn: function() {
			
			return sessionID != null;
		}
		
		
	
	});
	
	// --------------------------------------------
	
	var UserPersister = Class.create({
		init: function(rootUrl) {
			this.rootUrl = rootUrl;
		},
		
		login: function(user, success, error) {
			var url = this.rootUrl + "login";
			var userData = {
				username: user.username,
				authCode: CryptoJS.SHA1(user.username + user.password).toString()
			};
			
			httpRequester.postJSON(url, userData, function(data) {
				saveUserData(data);
				success(data);
			}
			, error);
			
		},
		
		register: function(user, success, error) {
			var url = this.rootUrl + "register";
			var userData = {
				username: user.username,
				authCode: CryptoJS.SHA1(user.username + user.password).toString()
			};
			
			httpRequester.postJSON(url, userData, function(data) {
				saveUserData(data);
				success(data);
			}, error);
		},
		
		logout: function(success, error) {
			var url = this.rootUrl + "logout/" + sessionID;
			
			httpRequester.getJSON(url, function(data) {
				clearUserData();
				success(data);
			}, error);
			
			
		}
		
		
	});
	
	// ----------------------------------------
	
	var ChatPersister = Class.create({
		init: function(rootUrl) {
			this.rootUrl = rootUrl;
		},
		
		listUsers: function(success, error) {
			
			
			var url = this.rootUrl + "list-users/" + sessionID;
			
			httpRequester.getJSON(url, success, error);
			
		},
		
		inviteUser: function(user, success, error) {
			
			var url = this.rootUrl + "invite-user";
			
			var userData = {
				"sessionID": sessionID,
				"recipientUsername": user.username,
				"challenge": GibberishAES.enc(generateRandom(), user.key).toString()
			};
			
			httpRequester.postJSON(url, userData, success, error);
			
			
		},
		
		responseChatInvitation: function(user, success, error) {
			
			var url = this.rootUrl + "response-chat-invitation";
		
			var userData = {
				"sessionID": sessionID,
				"recipientUsername": user.username,
				"response": GibberishAES.enc((999999999 - parseInt(GibberishAES.dec(user.encrypted, user.key))), user.key).toString()
			};
			
			httpRequester.postJSON(url, userData, success, error);
			
		},
		
		startChat: function(user, success, error) {
			
			var url = this.rootUrl + "start-chat";
		
			var userData = {
				"sessionID": sessionID,
				"recipientUsername": user.username
			};
			
			httpRequester.postJSON(url, userData, success, error);
		},
		
		cancelChat: function(user, success, error) {
			
			var url = this.rootUrl + "cancel-chat";
		
			var userData = {
				"sessionID": sessionID,
				"recipientUsername": user.username
			};
			
			httpRequester.postJSON(url, userData, success, error);
			
		},
		
		sendChatMessage: function(user, success, error) {
			
			var url = this.rootUrl + "send-chat-message";
			
			var userData = {
				"sessionID": sessionID,
				"recipientUsername": user.username,
				"encryptedMsg": GibberishAES.enc(user.msg, user.key).toString()
			};
			
			httpRequester.postJSON(url, userData, success, error);
			
			
		},
		
		getNextMessage: function(success, error) {
			
			var url = this.rootUrl + "get-next-message/" + sessionID;
			
			httpRequester.getJSON(url, success, error);
			
		}
		
		
		
		
	});
	
	return {
		getPersister: function(rootUrl) {
			return new MainPersister(rootUrl);
		},
		
		getExpectedNum: function() {
			return expectedNum;
		}
		
		
	
	}
	
	
	
}());