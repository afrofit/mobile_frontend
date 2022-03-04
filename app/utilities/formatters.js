export const formatStatsNumbers = (unit, int = false) => {
	if (unit === 0) return unit;
	if (unit < 0 || unit > 999999) return null;
	if (unit > 99990 && unit < 999999)
		return `${unit.toString()[0]}${unit.toString()[1]}${unit.toString()[2]}k`;
	if (unit > 9999 && unit < 99999)
		return `${unit.toString()[0]}${unit.toString()[1]}.${unit.toString()[2]}k`;
	if (unit > 999 && unit < 9999)
		return `${unit.toString()[0]}.${unit.toString()[1]}k`;
	if (unit < 999) {
		if (!int) {
			return `${unit.toFixed(1)}`;
		} else if (int) {
			return `${Math.floor(unit)}`;
		}
	}
};
