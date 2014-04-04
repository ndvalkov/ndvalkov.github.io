var controllers = (function($) {
	
	var rootUrl = "http://cryptochat.apphb.com/CryptoChatService.svc/";
	var invitationsList = {};
	var tempKey;
	var msgBox;
	var display;
	var msgLoop;
	
	var Controller = Class.create({
		init: function() {
			this.persister = persisters.getPersister(rootUrl);
			
		},
		
		loadUI: function(selector) {
			if (this.persister.isUserLoggedIn()) {
				this.loadGameUI(selector);
			} else {
				this.loadLoginFormUI(selector);
			}
			
			this.attachUIEventHandlers(selector);
			
		},
		
		loadGameUI: function(selector) {
			
			
			var container = $(selector);
			var self = this;
			
			container.html('<button id="btn-logout">Logout</button>');
			container.append(ui.gameUI());
			
			var listUsers = $(selector + " #allUsers");
			msgBox = $(selector + " #messages");
			display = $(selector + " #innerChat");
			
			
			
			setTimeout(function() {
				self.persister.chat.listUsers(function(data) {
					
					listUsers.html(ui.buildUsersList(data));
					
				}, function(arguments) {
					msgBox.prepend("Unable to retrieve users' list");
				});
			},
			1000);
			
			
			msgLoop = setInterval(function() {
				
				self.persister.chat.getNextMessage(function(data) {
					
					switch (data.msgType) {
						case "MSG_NO_MESSAGES": ; break;
						case "MSG_USER_ONLINE": ; break;
						case "MSG_USER_OFFLINE": ; break;
						case "MSG_CHALLENGE": 
							msgBox.prepend(data.username + ": sent chat invitation.<br/>");
							if (!invitationsList[data.username]) {
								invitationsList[data.username] = data.msgText;
							}
							
						break;
						case "MSG_RESPONSE": 
							msgBox.prepend(data.username + ": responded to your invitation.<br/>");
							
							if (persisters.getExpectedNum() == (GibberishAES.dec(data.msgText, tempKey))) {
								msgBox.prepend(data.username + ": Authentication successful! Beginning chat...<br/>");
								
								var dt = {
									username: data.username
								}
								
								self.persister.chat.startChat(dt, function(data) {
									
									
									$(selector + " #chatUsers").append(ui.getChatUser(dt.username));
									
									
								}, function(arguments) {
									msgBox.prepend("Unable to begin chat session.<br/>");
								}
								
								)
								
								
								
							} else {
								msgBox.prepend(data.username + ": Authentication failed. Wrong key.<br/>");
							}
							
							
						break;
						case "MSG_START_CHAT": 
							msgBox.prepend(data.username + ": Chat started.<br/>");
						break;
						case "MSG_CANCEL_CHAT":
							msgBox.prepend(data.username + ": Chat session cancelled.<br/>");
							$("#chatUsers").empty();
						break;
						case "MSG_CHAT_MESSAGE": 
						var ms = GibberishAES.dec(data.msgText, tempKey);
						display.prepend('<p class="bubble2">' + ms + '</p><br/>');
						
						
						break;
						
					}
					
					
					
				}, function(arguments) {
					msgBox.prepend("Problem with message visualization<br/>");
				});
				
				
			}, 2000
			)
			
			
			
		},
		
		loadLoginFormUI: function(selector) {
			
			var loginForm = ui.loginForm();
			
			$(selector).html(loginForm);
		},
		
		// --------------------------------
		
		attachUIEventHandlers: function(selector) {
			
			var container = $(selector);
			var self = this;
			
			container.on("click", "#btn-register", function() {
					var user = {
						username: $(selector + " #tb-register-username").val(),
						password: $(selector + " #tb-register-password").val()
					}
					
					self.persister.user.register(user, function() {
							self.loadGameUI(selector);
						}, function() {
							container.html("Sorry, there appears to be a problem with the registration.");
						}
						
					)
					
					return false;
				}
			)
			
			
			container.on("click", "#btn-login", function() {
					var user = {
						username: $(selector + " #tb-login-username").val(),
						password: $(selector + " #tb-login-password").val()
					}
					
					self.persister.user.login(user, function() {
							self.loadGameUI(selector);
						}, function() {
							container.html("Sorry, unable to login.");
						}
						
					)
					
					return false;
				}
			)
			
			container.on("click", "#btn-logout", function() {
					
					self.persister.user.logout(function(data) {
						
						clearInterval(msgLoop);
						container.empty();
						
						self.loadLoginFormUI(selector);
						
					}, function(arguments) {
						msgBox.prepend("Logout error.<br/>");
					}
					)
				}
			)
			
			container.on("click", "#allUsers a", function() {
					
					var el = $(this).next();
					
					if (el.css("display") == "none" || el.css("display") == "") {
						$("#allUsers form").hide();
						el.show();
					} else {
						el.hide();
					}

				}
			)
			
			container.on("click", "#allUsers button", function() {
					
					var el = $(this);
					tempKey = el.prev().val();
					
					var dataUser = {
						username: el.attr("data-id"),
						key: tempKey
					}
					
					if (invitationsList.hasOwnProperty(dataUser.username)) {
						
						dataUser["encrypted"] = invitationsList[dataUser.username];
						try {
							self.persister.chat.responseChatInvitation(dataUser, function(data) {
								$(selector + " #chatUsers").append(ui.getChatUser(dataUser.username));
								delete invitationsList[dataUser.username];
							}, function(arguments) {
								msgBox.prepend("Unable to respond to invitation.<br/>");
							}
							)
						} catch(err) {
							msgBox.prepend("Problem with decryption. Possibly wrong key.<br/>");
						}
						
					} else {
						
						self.persister.chat.inviteUser(dataUser, function(data) {
							
							msgBox.prepend("Invitation to " + dataUser.username + " sent.<br/>");
							
						}, function(arguments) {
							msgBox.prepend("Unable to invite user.<br/>");
						}
						)
					
					}
					
					
					
				

				}
			)
			
			container.on("click", "#chatUsers button", function() {
				
				var el = $(this);
				var dataUser = {
					username: el.attr("data-id")
				}
				
				
				
				self.persister.chat.cancelChat(dataUser, function(data) {
					msgBox.prepend(dataUser.username + ": Chat session cancelled.<br/>");
					el.parent().empty();
					
				}, function(argument) {
					msgBox.prepend("Chat cancel failed.<br/>");
				}
				
				)
				
			})
			
			container.on("click", "#submit-message", function() {
				
				var el = $(this);
				
				var userData = {
						"username": $("#chatUsers button").attr("data-id"),
						"msg": el.prev().val(),
						"key": tempKey
					}
				
				
				
				self.persister.chat.sendChatMessage(userData, function(data) {
					display.prepend('<p class="bubble">' + userData.msg + '</p><br/>');
					
					
				}, function(arguments) {
					msgBox.prepend("Unable to send message.<br/>");
				}
				
				)
			}
			)
			
			container.on("click", "#btn-show-register", function() {
				
				$("#register-form").show();
				$("#login-form").hide();
				
			})
			
			container.on("click", "#btn-show-login", function() {
				
				$("#register-form").hide();
				$("#login-form").show();
				
			})
			
			
			
			
		}
		
		
		
		
		
		
	})
	
	
	
	
	
	
	return {
		get: function() {
			return new Controller();
		}
		
	}
	
}(jQuery));