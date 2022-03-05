export const ranks = {
	1: {
		src: require("../assets/images/ranks/rookie.png"),
		name: "Rookie",
		id: 1,
		XP: { min: 0, max: 999 },
		advancers: 20,
	},
	2: {
		src: require("../assets/images/ranks/core.png"),
		name: "Core",
		id: 2,
		XP: { min: 1000, max: 2499 },
		advancers: 20,
	},
	3: {
		src: require("../assets/images/ranks/super.png"),
		name: "Super",
		id: 3,
		XP: { min: 2500, max: 4499 },
		advancers: 10,
	},
	4: {
		src: require("../assets/images/ranks/peak.png"),
		name: "Peak",
		id: 4,
		XP: { min: 4500, max: 7499 },
		advancers: 10,
	},
	5: {
		src: require("../assets/images/ranks/superstar.png"),
		name: "Superstar",
		id: 5,
		XP: { min: 7500, max: 10999 },
		advancers: 5,
	},
};
