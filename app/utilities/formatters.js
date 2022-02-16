export const formatStatsNumbers = (unit) => {
	if (unit < 0 || unit > 999999) return null;
	if (unit < 10 && unit > 0) return `${unit.toFixed(2)}`;
	if (unit > 99990 && unit < 999999)
		return `${unit.toString()[0]}${unit.toString()[1]}${unit.toString()[2]}k`;
	if (unit > 9999 && unit < 99999)
		return `${unit.toString()[0]}${unit.toString()[1]}.${unit.toString()[2]}k`;
	if (unit > 999 && unit < 9999)
		return `${unit.toString()[0]}.${unit.toString()[1]}k`;
	if (unit < 999) return `${unit}`;
};
