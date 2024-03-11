export function formatNumberWithCommas(number: any) {
	if (!number || number == 0) return "0";
	if (number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " vnđ";
	}
}
export function formatTime(number: number) {
	const _number = Math.floor(number);
	const minutes = Math.floor(_number / 60);
	const seconds = _number % 60;
	return [minutes, seconds]
		.map((val) => val.toString().padStart(2, "0"))
		.join(":");
}
