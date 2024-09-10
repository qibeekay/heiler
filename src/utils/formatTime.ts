const FormatTime = (timestamp: number): string => {
	// Create a new Date object using the timestamp (multiplied by 1000 to convert from seconds to milliseconds)
	const date = new Date(timestamp * 1000);

	// Extract hours and minutes
	const hours = date.getHours().toString().padStart(2, '0'); // Ensures two digits
	const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensures two digits

	// Return formatted time string
	return `${hours}:${minutes}`;
};

export default FormatTime;
