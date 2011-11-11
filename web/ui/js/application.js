//function to process the json received from backend
function processJson(data) {	
	$('.results').empty();
	//looping over all the response data from json
	$.each(data, function(key,value){
		$('.results').append(value.userId +"\t" + value.name+"<br/>");//create the result divs now
	});
}

