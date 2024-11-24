export function officNameToSlug(teamName) {
	return teamName.toLowerCase().replace(/\s+/g, '-');
}