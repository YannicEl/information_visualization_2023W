export function formatDate(date: string): string {
	return new Intl.DateTimeFormat(...navigator.languages).format(new Date(date));
}
