export const setLocal = (key,value) => {
	if(typeof value === 'object'){
		value = JSON.stringify(value)
	}
	localStorage.setItem(key,value)
}
export const getLocal = (key) => {
	if(key.startsWith('[') || key.startsWith('{')) {
		return JSON.parse(localStorage.getItem(key));
	}else{
		return localStorage.getItem(key) || '';
	}
}