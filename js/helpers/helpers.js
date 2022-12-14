import allWeeks from "../data/weeks.js";
import { getSelectedDate } from "./elements.js";
import displayWeek from "../components/displayWeek.js";

export function getMondayOfWeek(date) {
	if (date) {
		date = new Date(date);
	} else {
		date = new Date();
	}

	const firstDayOfWeek = date.getDate() - date.getDay() + 1;
	const dateOfFirstDay = `${date.getMonth() + 1}/${firstDayOfWeek}/${date.getFullYear()}`;
	return dateOfFirstDay;
}

export function doesThisWeekExistInTheData(allWeeks, week) {
	return allWeeks.includes(week);
}

export function formateDate(date, monthFirst = true) {
	const d = new Date(date);

	let datestring;

	if (monthFirst) {
		datestring = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
	} else {
		datestring = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
	}

	return datestring;
}

export function findClosestPrevDate(dates, currentWeek) {
	const currentWeekDate = new Date(currentWeek);

	const previousDates = dates.filter((e) => currentWeekDate - new Date(e) > 0);

	const sortedPreviousDates = previousDates.sort((a, b) => new Date(b) - new Date(a));

	return sortedPreviousDates[0] || null;
}

export function getWeekWithDataIfCurrentIsEmpty() {
	const selectedDate = getSelectedDate();

	let weekToGetDataFor = getMondayOfWeek(selectedDate);

	if (!doesThisWeekExistInTheData(allWeeks, weekToGetDataFor)) {
		const wantedWeek = weekToGetDataFor;
		weekToGetDataFor = findClosestPrevDate(allWeeks, weekToGetDataFor);
		displayWeek(weekToGetDataFor, false, wantedWeek);
	} else {
		displayWeek(weekToGetDataFor);
	}

	return weekToGetDataFor;
}
