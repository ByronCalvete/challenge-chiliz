/*
 * Your program must print string with the number of years and months and the total number of days between the dates.
 * Dates are provided in dd.mm.yyyy format.
 * You are not allowed to plug in JS libraries such as moment.js or date-fns directly into the code. All code need to be written in this file.
 * 
 * Result must be shown as a string in years, months and total days. If years or months are 0, then it should not be displayed in the output.
 *
 * Example:
 * Input: ['01.01.2000', '01.01.2016']
 * Output:
 * '16 years, total 5844 days'
 *
 * Example 2:
 * Input: ['01.11.2015', '01.02.2017']
 *
 * Output:
 * '1 year, 3 months, total 458 days'
*/
const dates = [
    ['01.01.2000', '01.01.2016'],
    ['01.01.2016', '01.08.2016'],
    ['01.11.2015', '01.02.2017'],
    ['17.12.2016', '16.01.2017'],
    ['01.01.2016', '01.01.2016'],
    ['28.02.2015', '13.04.2018'],
    ['28.01.2015', '28.02.2015'],
    ['17.03.2022', '17.03.2023'],
    ['17.02.2024', '17.02.2025'],
];

function pluralNames(number, unit) {
    return `${number} ${(number === 1) ? unit : unit + 's'}`
}

function exactMonths(numberOfMonths, dates) {
    let onlyDatesMonths = []
    // Extract only the days (dd)
    for (let date in dates) {
        onlyDatesMonths.push(dates[date].split('.')[0])
    }

    return (onlyDatesMonths[0] === onlyDatesMonths[1][0]) ? Math.trunc(numberOfMonths) : 0
}

// Receive string of dates one after each other
function outputDate(dates) {
    let formatDates = []
    // Convert dates to ISO 8601 format for new Date() function
    for (let date in dates) {
        formatDates.push(new Date(dates[date].split('.').reverse().join(".")).getTime() / 1000)
    }

    const diference = formatDates[1] - formatDates[0]
    const totalDays = Math.round(diference/(60*60*24))

    const years = Math.trunc(totalDays/365)

    // Condition is "<= 1" for check months with 30, 29 and 28 days
    const months = ((totalDays % 365)/30) <= 1 ? exactMonths((totalDays % 365)/30, dates) : Math.trunc((totalDays % 365)/30)


    const yearsFormat = (years > 0) ? `${pluralNames(years, 'year')}, ` : ''
    const monthsFormat = (months > 0) ? `${pluralNames(months, 'month')}, ` : ''

    console.log('Years', years);
    console.log('Months',months);
    console.log('Days', totalDays);
    console.log('---------');

    return `${yearsFormat}${monthsFormat}total ${totalDays} days`
}