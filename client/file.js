function isPalimdrone(string) {
	if (string.length() % 2 === 0) {
	let stringArray = [];
let sliceNumber = string.length / 2 
	let evenString1 = string.slice(0, sliceNumber)
	let evenString2 = string.slice(sliceNumber)
	let splitString2 = evenString2.split('')
	for (let i = evenString2.length - 1; i >= 0; i -= 1){
	stringArray.push(splitString2[i])
}
 if (evenString1 ===  splitString2.join('')){
return true
}
  }


	
	if (string.length() % 2 === 1) {
	let stringArray2 = [];
let sliceMiddleNumber = Math.ceiling(string.length / 2) 
	let arrayString = string.split('');
	for(let i = 0; i < arrayString.length; i++) {
	if ( i !== sliceMiddleNumber){
	stringArray2.push(arrayString[i])
}
}

	let sliceNumber = stringArray2.join('').length() / 2 
	let evenString1 = stringArray2.join('').slice(0, sliceNumber)
	let evenString2 = stringArray2.join('').slice(sliceNumber)
	let splitString2 = evenString2.split('')
	for (let i = evenString2.length - 1; i >= 0; i -= 1){
	stringArray.push(splitString2[i])

}
 if (evenstring1 ===  splitString2.join('')){
return true
}
}

return false
}


console.log(isPalimdrone(hannah))