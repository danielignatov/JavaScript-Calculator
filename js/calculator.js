/// Code written by Daniel Ignatov
/// danielignatov.com

var keys = document.querySelectorAll('#calculator span');
console.log(keys.length + ' keys are loaded!');
var display = document.querySelector('.screen');
var previousButtonValue;
var currentNumberContainDecimalPoint = false;

for (var i = 0; i < keys.length; i++) {
	keys[i].onclick = function() {
	console.log('Key \"' + this.innerHTML + '\" is clicked!');
	var buttonValue = this.innerHTML;	

	// If clear button is pressed
	if (buttonValue == 'C') {
		display.innerHTML = '';
		console.log('Display cleared!')
		currentNumberContainDecimalPoint = false;
	// Check if equal button is pressed to calculate result
	} else if ((buttonValue == '=') && (previousButtonValue != '=')) {
		// Check for operator or decimal point at the end
		// Could be replaced with .indexOf array
		// but IE8 does not support it
		if ((previousButtonValue == '/') || 
			(previousButtonValue == '*') ||
			(previousButtonValue == '-') ||
			(previousButtonValue == '+') ||
			(previousButtonValue == '.')) {
			display.innerHTML = display.innerHTML.replace(/.$/, '');
			console.log('Found operator or decimal point at end of equation, removed.');
			var calculate = eval(display.innerHTML);
			console.log('Calculation done!');
			display.innerHTML = calculate;
			console.log('Calculation displayed!');
			previousButtonValue = buttonValue;
			currentNumberContainDecimalPoint = false;
		} else if (display.innerHTML == '') {
			console.log('No calculation to be displayed!');
		} else {
			var calculate = eval(display.innerHTML);
			console.log('Calculation done!');
			display.innerHTML = calculate;
			console.log('Calculation displayed!');
			previousButtonValue = buttonValue;
			currentNumberContainDecimalPoint = false;
		}
	// Check if operator key is pressed		
	} else if ((buttonValue == '/') ||
			   (buttonValue == '*') ||
			   (buttonValue == '-') ||
			   (buttonValue == '+')) {
		// Check if the user try to put two operators
		// one after another and replaces with the last entered operator
		if ((previousButtonValue == '/') || 
			(previousButtonValue == '*') ||
			(previousButtonValue == '-') ||
			(previousButtonValue == '+') ||
			(previousButtonValue == '.')) {
			previousButtonValue = buttonValue;
			display.innerHTML = display.innerHTML.replace(/.$/, buttonValue);
		} else {
			if (display.innerHTML != '') {
				previousButtonValue = buttonValue;
				display.innerHTML += buttonValue;
			} else if ((display.innerHTML == '') && (buttonValue == '-')) {
				previousButtonValue = buttonValue;
				display.innerHTML += buttonValue;
			}
		}
		currentNumberContainDecimalPoint = false;
	// When the user continues to use the calculator after displayed result
	} else if (previousButtonValue == '=') {
		if ((buttonValue == '1') ||
			(buttonValue == '2') ||
			(buttonValue == '3') ||
			(buttonValue == '4') ||
			(buttonValue == '5') ||
			(buttonValue == '6') ||
			(buttonValue == '7') ||
			(buttonValue == '8') ||
			(buttonValue == '9') ||
			(buttonValue == '0')) {
			display.innerHTML = '';
			previousButtonValue = buttonValue;
			display.innerHTML += buttonValue;
			currentNumberContainDecimalPoint = false;
		} else if (buttonValue == '.') {
			display.innerHTML = '';
			previousButtonValue = buttonValue;
			display.innerHTML += '0' + buttonValue;
			currentNumberContainDecimalPoint = true;
		}
	// Check if decimal point button is pressed
	} else if (buttonValue == '.') {
		// Check if there is no current decimal points on current number
		if (currentNumberContainDecimalPoint == false) {
			currentNumberContainDecimalPoint = true;
			// If decimal point is added after operator
			if ((previousButtonValue == '/') || 
				(previousButtonValue == '*') ||
				(previousButtonValue == '-') ||
				(previousButtonValue == '+') ||
				(display.innerHTML == '')) {
				previousButtonValue = buttonValue;
				display.innerHTML += '0' + buttonValue;
			} else {
				previousButtonValue = buttonValue;
				display.innerHTML += buttonValue;
			}
		} else {
				console.log('Improper use of decimal point. Action ignored.');
		}
	// For numeric button pressed
	} else {
		previousButtonValue = buttonValue;
		display.innerHTML += buttonValue;
	}
	};
}