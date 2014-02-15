function sortInput() {
    
	var data1 = document.getElementById("text1").value;
	// var data2 = document.getElementById("text2").value;
	
	var arr = data1.split(",");
	var smallestElem;
	var smallestElIndex;

	var sortedArr = [];
	
	while(!(arr.length == 0)) {
	    
		smallestElem = arr[0];
		smallestElIndex = 0;
		
		for (var i = 0; i < arr.length; i++) {
	    	
			
			
		    if ((parseInt(arr[i])) < (parseInt(smallestElem))) {
		    	smallestElem = arr[i];
				smallestElIndex = i;
			}
		
		    if (i == (arr.length - 1)) {
				sortedArr.push(arr[smallestElIndex]);
				arr.splice(smallestElIndex, 1);
			}
		}
		
	}

	document.getElementById("text2").value = sortedArr;
	
}

function getInput() {

	var data2 = document.getElementById("text2").value;
	var data3 = document.getElementById("text3").value;
	
	var selectedNumber = data3;
	
	
	var arr1 = data2.split(",");
	for (var i = 0; i < arr1.length; i++) {
		arr1[i] = parseInt(arr1[i]);
	}
	
	
	var middle = parseInt(arr1.length/2);
	var indexChange = 0;
	
	
	
	while (arr1.length != 0) {
		
		if (arr1[middle] == selectedNumber) {
			document.getElementById("resultArea").value = middle + indexChange;
			break;
		} else if (arr1[middle] > selectedNumber) {
			
			if (arr1.length%2==0) {
				arr1.splice(middle, middle);
				
				
			} else {
				arr1.splice(middle, middle + 1);
				
			}
		} else{
			
			if (arr1.length%2==0) {
				arr1.splice(0, middle);
				indexChange += middle;
				
				
			} else {
				arr1.splice(0, middle + 1);
				indexChange += (middle + 1);
				
			}
		}
		
		middle = parseInt(arr1.length/2);
		
		
	}
	
}
