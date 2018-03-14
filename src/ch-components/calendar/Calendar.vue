<template>
    <div class="calendar">
        <div class="header">
            <a
                @click="movePreviousYear"
                class="arrow"
            >
                &laquo;
            </a>
            <a
                @click="movePreviousMonth"
                class="arrow"
            >
                &lsaquo;
            </a>
            <span
                @click="moveThisMonth"
                class="title"
            >
                {{ header.label }}
            </span>
            <a
                @click="moveNextMonth"
                class="arrow"
            >
                &rsaquo;
            </a>
            <a
                @click="moveNextYear"
                class="arrow"
            >
                &raquo;
            </a>
        </div>
        <div class="weekdays">
            <div
                class="weekday"
                v-for="weekday in weekdays"
            >
                {{ weekday.label_3 }}
            </div>
        </div>
        <div
            class="week"
            v-for="week in weeks"
        >
            <div
                :class="{ today: day.isToday }"
                class="day"
                v-for="day in week"
            >
                {{ day.label }}
            </div>
        </div>
    </div>
</template>

<script>
// Special thanks to natedoggit for this calendar component.
// https://medium.com/@natedoggit/building-an-extendable-calendar-in-vue-js-part-1-8fb26c04819
const _daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const _weekdayLabels = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]
const _weekdayLength = 3
const _weekdayCasing = 'title'
const _monthLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]
const _monthLength = 0
const _monthCasing = 'title'

function _transformLabel(label, length, casing) {
    label = (length <= 0) ? label : label.substring(0, length)

    if (casing.toLowerCase() === 'lower') {
        return label.toLowerCase()
    }

    if (casing.toLowerCase() === 'upper') {
        return label.toUpperCase()
    }

    return label
}

const _today = new Date()
const _todayComps = {
    year: _today.getFullYear(),
    month: _today.getMonth() + 1,
    day: _today.getDate()
}

export default {
    data() {
        return {
            month: _todayComps.month,
            year: _todayComps.year
        }
    },
    computed: {
        monthIndex() {
            return this.month - 1
        },
        months() {
            return _monthLabels.map((ml, i) => ({
                label: ml,
                label_1: ml.substring(0, 1),
                label_2: ml.substring(0, 2),
                label_3: ml.substring(0, 3),
                number: i + 1,
            }))
        },
        weekdays() {
            return _weekdayLabels.map((wl, i) => ({
                label: wl,
                label_1: wl.substring(0, 1),
                label_2: wl.substring(0, 2),
                label_3: wl.substring(0, 3),
                number: i + 1,
            }))
        },
        header() {
            const month = this.months[this.monthIndex]
            return {
                month,
                year: this.year.toString(),
                shortYear: this.year.toString().substring(2,4),
                label: month.label + ' ' + this.year
            }
        },
        firstWeekdayInMonth() {
            return new Date(this.year, this.monthIndex, 1).getDay() + 1
        },
        daysInMonth() {
            if (this.month === 2 && this.isLeapYear) return 29;

            return _daysInMonths[this.monthIndex]
        },
        weeks() {
            const weeks = []

            let previousMonth = true
            let thisMonth = false
            let nextMonth = false

            let day = this.previousMonthComps.days - this.firstWeekdayInMonth + 2
            let month = this.previousMonthComps.month
            let year = this.previousMonthComps.year

            // Cycle through each week of the month, up to 6 total
            for (let w = 1; w <= 6 && !nextMonth; w++) {
                const week = []

                for (let d = 1; d <= 7; d++) {
                    // We need to know when to start counting actual month days
                    if (previousMonth && d >= this.firstWeekdayInMonth) {
                        // Reset day/month/year counters
                        day = 1;
                        month = this.month;
                        year = this.year;
                        // ...and flag we're tracking actual month days
                        previousMonth = false;
                        thisMonth = true;
                    }

                    // Append day info for the current week
                    // Note: this might or might not be an actual month day
                    //  We don't know how the UI wants to display various days,
                    //  so we'll supply all the data we can
                    week.push ({
                        label: (day && thisMonth) ? day.toString() : '',
                        day,
                        weekday: d,
                        week: w,
                        month,
                        year,
                        date: new Date(year, month - 1, day),
                        beforeMonth: previousMonth,
                        afterMonth: nextMonth,
                        inMonth: thisMonth,
                        isToday: day === _todayComps.day && month === _todayComps.month && year === _todayComps.year,
                        isFirstDay: thisMonth && day === 1,
                        isLastDay: thisMonth && day === this.daysInMonth,
                    })

                    // We've hit the last day of the month
                    if (thisMonth && day >= this.daysInMonth) {
                        thisMonth = false;
                        nextMonth = true;
                        day = 1;
                        month = this.nextMonthComps.month;
                        year = this.nextMonthComps.year;
                        // Still in the middle of the month (hasn't ended yet)
                    } else {
                        day++;
                    }
                }

                weeks.push(week)
            }

            return weeks
        },
        isLeapYear() {
            return (this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0
        },
        previousMonthComps() {
            if (this.month === 1) return {
                days: _daysInMonths[11],
                month: 12,
                year: this.year - 1
            }

            return {
                days: (this.month === 3 && this.isLeapYear) ? 29 : _daysInMonths[this.monthIndex - 1],
                month: this.month - 1,
                year: this.year
            }
        },
        nextMonthComps() {
            if (this.month === 12) return {
                days: _daysInMonths[0],
                month: 1,
                year: this.year + 1
            }

            return {
                days: (this.month === 1 && this.isLeapYear) ? 29 : _daysInMonths[this.monthIndex + 1],
                month: this.month + 1,
                year: this.year
            }
        }
    },
    methods: {
        moveThisMonth() {
            this.month = _todayComps.month
            this.year = _todayComps.year
        },
        moveNextMonth() {
            const { month, year } = this.nextMonthComps
            this.month = month
            this.year = year
        },
        movePreviousMonth() {
            const { month, year } = this.previousMonthComps
            this.month = month
            this.year = year
        },
        moveNextYear() {
            this.year++
        },
        movePreviousYear() {
            this.year--
        }
    },
}
</script>

<style lang="scss">
$themeColor: dodgerblue;

$calendar-grey: #cccccc;

$headerPadding: 0.5rem 1rem;
$headerBorderWidth: 1px;
$headerBorderStyle: solid;
$headerBorderColor: $calendar-grey;
$headerBackground: $themeColor;
$headerColor: white;

$weekdayPadding: 0.4rem 0;
$weekdayColor: #7a7a7a;
$weekdayBorderWidth: 1px;
$weekdayBorderStyle: solid;
$weekdayBorderColor: $calendar-grey;

$dayColor: #3a3a3a;
$dayBorder: solid 1px $calendar-grey;
$dayBackgroundColor: white;
$dayWidth: 14.2857%;
$dayHeight: 50px;

$todayColor: white;
$todayBackgroundColor: $themeColor;

.calendar {
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    justify-content: stretch;
    align-items: center;
    padding: $headerPadding;
    border-width: $headerBorderWidth;
    border-style: $headerBorderStyle;
    border-color: $headerBorderColor;

    .arrow {
        cursor: pointer;
        padding: 0 0.4em 0.2em 0.4em;
        font-size: 1.8rem;
        font-weight: 500;
        user-select: none;
        flex-grow: 0;
    }

    .title {
        cursor: pointer;
        flex-grow: 1;
        font-size: 1.2rem;
        text-align: center;
    }
}

.weekdays {
    display: flex;
    flex: auto;
}

.weekday {
    width: $dayWidth;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $weekdayPadding;
    border-width: $weekdayBorderWidth;
    border-style: $weekdayBorderStyle;
    border-color: $weekdayBorderColor;
}

.week {
    display: flex;
}

.day {
    width: $dayWidth;
    height: $dayHeight;
    display: flex;
    justify-content: center;
    align-items: center;
    border: $dayBorder;
}

.today {
    font-weight: 500;
    color: white;
    background-color: $todayBackgroundColor;
}

</style>
