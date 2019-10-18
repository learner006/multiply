module.exports = multiply;

function multiply(p_first, p_second) {
	let n1 = p_first.split('')
	let n2 = p_second.split('')

	return MultiplyBigNum(n1,n2).join('');
}

function say(p_text) {
	console.log(p_text);
}


//console.log('\x1b[37m',multiply(2,3));
///////////////////////////////////////////////////////////////////////////
//
//
//
function AdjustSizesLeftPadding(p_arr1, p_arr2) {
	let size1 = p_arr1.length;
	let size2 = p_arr2.length;

	if (size1 == size2)
		return;

	// todo: refactor it later!
	if (size1 > size2)
	{
		let zerosCount = size1 - size2;
		for(let n=0; n < zerosCount; ++n)
			p_arr2.unshift(0);
	}
	else
	{
		let zerosCount = size2 - size1;
		for(let n=0; n < zerosCount; ++n)
			p_arr1.unshift(0);
	}
}
///////////////////////////////////////////////////////////////////////////
//
//
//
function AddBigNum(p_arrNum1, p_arrNum2) {
	let out_arrSum = [];

	let a1 = p_arrNum1;
	let a2 = p_arrNum2;

	AdjustSizesLeftPadding(a1,a2);

	let digitExtra = 0;
	// going backward
	for(let n = a1.length-1; n >=0; --n)
	{
		let digitSumWide = a1[n] + a2[n] + digitExtra;
		digitExtra = Math.floor(digitSumWide / 10);

		let digitSum = digitSumWide % 10;
		out_arrSum.unshift(digitSum);
	}

	if (digitExtra)
		out_arrSum.unshift(digitExtra);

	return out_arrSum;
}
///////////////////////////////////////////////////////////////////////////
//
//
//
function MultiplyNumByDigit(p_arrNum, p_digitToMul) {
	let out_arrProduct = [];

	let digitExtra = 0;	
	let a = p_arrNum;

	// going backward
	for(let n = a.length-1; n >=0; --n)
	{
		let prodWide = a[n] * p_digitToMul + digitExtra;

		digitExtra = Math.floor(prodWide/10);
		let prod = prodWide % 10;

		out_arrProduct.unshift(prod);
	}
		
	if (digitExtra)
		out_arrProduct.unshift(digitExtra);

	return out_arrProduct;
}
///////////////////////////////////////////////////////////////////////////
//
//
//
function MultiplyBigNum(p_arrNum1, p_arrNum2) {

	let out_arrProduct = [];

	let a1 = p_arrNum1;
	let a2 = p_arrNum2;

	// Let's play with memory model a bit
	// Set $a2 reference to the smallest number
	let temp = p_arrNum1;
	if (a2.length > a1.length)
	{
		temp = a1;
		a1 = a2;
		a2 = temp;
	}

	for(let n = a2.length-1; n>=0; --n)
	{
		let arrProdTemp = MultiplyNumByDigit(a1,a2[n]);

		// Let's add zeros to the right
		// todo: refactor it later! ;-)
		for(let i = 1; i <= a2.length-1-n; ++i)
			arrProdTemp.push(0);

		out_arrProduct = AddBigNum(out_arrProduct,arrProdTemp);
	}

	return out_arrProduct;
}