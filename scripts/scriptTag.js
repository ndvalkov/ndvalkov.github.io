var tagsArray = ["cms", "javascript", "js", "ASP.NET MVC", ".net", ".net", "css", "wordpress", "xaml", "js", "http", "web", "asp.net", "asp.net MVC", "ASP.NET MVC", "wp", "javascript", "js", "cms", "html", "javascript", "http", "http", "CMS"]

function solve() {
	
		if(document.getElementById("mainDiv").firstChild) {
			document.getElementById("mainDiv").innerHTML = ' ';
		}

		var inpt1 = parseInt(document.getElementById("minSize").value);
		var inpt2 = parseInt(document.getElementById("maxSize").value);
	
		generateTagCloud(tagsArray, inpt1, inpt2);
}

function generateTagCloud(tagsArray, minSize, maxSize) {
	
	var tags = tagsArray.slice();
	
	for (var i = 0; i < tags.length; i++) {
		tags[i] = tags[i].toLowerCase();
	}
	
	var tagOccurObject = {};
	
	while (tags.length != 0) {
		
		if (tagOccurObject.hasOwnProperty(tags[0])) {
			tags.shift();
			continue;
		}
		
		var counter = 0;
		var startTagName = "";
		
		for (var i = 0; i < tags.length; i++) {
			
			if (i == 0) {
				startTagName = tags[0];
				counter++;
				tagOccurObject[startTagName] = counter;
				continue;
			}
				
			if (tags[i] == startTagName) {
				counter++;
				tagOccurObject[startTagName] = counter;
			}
		}
		
		tags.shift();
	}
	
	var frameDiv = document.getElementById("mainDiv");
	
	var countDivs = 0;
	
	for (var property in tagOccurObject) {
		
		var tagDiv = document.createElement("div");
		frameDiv.appendChild(tagDiv);
		var tagElement = frameDiv.getElementsByTagName("div")[countDivs];
		tagElement.style.position = "absolute";
		tagElement.style.top = (parseInt(Math.random()*300 + 20)) + "px";
		tagElement.style.left =  (parseInt(Math.random()*300 + 20)) + "px";
		tagElement.innerHTML = property;
		var sizeFont = minSize + (tagOccurObject[property] - 1)*4;
		
		if (sizeFont > maxSize) {
			sizeFont = maxSize;
		}
		
		tagElement.style.fontSize = sizeFont + "px";
		countDivs++;
	}
	
}


