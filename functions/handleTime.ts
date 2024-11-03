export function convertToISOTime(time: string) {
	const today = new Date();
	const dateString = today.toISOString().split('T')[0];
	const dateTimeString = `${dateString}T${time}:00`;
	const dateTime = new Date(dateTimeString);
	if (!isNaN(dateTime.getTime())) {
		return dateTime.toISOString();
	} else {
		throw new Error('Invalid time format');
	}
}

export function convertDateToTimeString(date: Date) {
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');

	return `${hours}:${minutes}`;
}
export function convertDateToDMYString(date: Date) {
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();

	return `${day}-${month}-${year}`;
}
