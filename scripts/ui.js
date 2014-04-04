var ui = (function () {

	function buildLoginForm() {
		var html =
            '<div id="login-form-holder">' +
				'<form>' +
					'<div id="login-form">' +
						'<label for="tb-login-username">Username: </label>' +
						'<input type="text" id="tb-login-username" autofocus="true"><br />' +
						'<label for="tb-login-password">Password: </label>' +
						'<input type="password" id="tb-login-password"><br />' +
						'<button id="btn-login" class="button">Login</button>' +
					'</div>' +
					'<div id="register-form" style="display: none">' +
						'<label for="tb-register-username">Username: </label>' +
						'<input type="text" id="tb-register-username"><br />' +
						'<label for="tb-register-password">Password: </label>' +
						'<input type="password" id="tb-register-password"><br />' +
						'<button id="btn-register" class="button">Register</button>' +
					'</div>' +
					'<a href="#" id="btn-show-login" class="button selected">Login</a>' +
					'<a href="#" id="btn-show-register" class="button">Register</a>' +
				'</form>' +
				'<div id="error-messages"></div>' +
            '</div>';
		return html;
	}
	
	function buildGameUI() {
		
		var html = '<section id="chatMainBox">' +
			'<div id="allUsers">' +
			'</div>' +
			'<div id="chatUsers">' +
			'</div>' +
			'<div id="messages">' +
			'</div>' +
			'<section id="chatDisplay"><div id="innerChat"></div>' +
			'</section>' +
			'<div id="chatMessageBox">' +
				'<textarea placeholder="Enter your message">' +
				'</textarea>' +
				'<button id="submit-message">' +
					'Submit' +
				'</button>' +
			'</div>' +
		'</section>'
		
		return html;
	}
	
	
	function buildUsersList(list) {
		
		var html = '<ul>'
		
		for (var i = 0; i < list.length; i++) {
			
			html += '<li style="margin-top: 10px; font-size: 1.5rem;"><a href="#">' +
						list[i] + '</a><form class="form-key">'
							+ '<label for="input-key">Enter secret key</label>'
							+ '<input type="password" class="input-key"/>'
							+ '<button class="invite" data-id="' + list[i] + '">Send</button>'
						+ '</form>'
					+ '</li>'
		}
		
		html += '</ul>'
		
		return html;
	}
	
	function getChatUser(user) {
		var html = '<div class="chatUser" style="margin-top: 10px; font-size: 1.5rem; color: #0f0">' +
			user + '</div>' + '<button style="margin-left:10px" data-id="' + user + '">Quit Chat</button>'
		
		return html;
	}
	
	
	
	
	return {
		loginForm: buildLoginForm,
		gameUI: buildGameUI,
		buildUsersList: buildUsersList,
		getChatUser: getChatUser
	}

}());