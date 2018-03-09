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
                {{ weekday.label }}
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
                label: _transformLabel(ml, _monthLength, _monthCasing),
                number: i + 1
            }))
        },
        weekdays() {
            return _weekdayLabels.map((wl, i) => {
                return {
                    label: _transformLabel(wl, _weekdayLength, _weekdayCasing),
                    number: i + 1
                }
            })
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
            const isFebruary = this.month === 2
            const isLeapYear = (this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0

            if (isFebruary && isLeapYear) {
                return 29
            }

            return _daysInMonths[this.monthIndex]
        },
        weeks() {
            const weeks = []

            let monthStarted = false
            let monthEnded = false
            let monthDay = 0

            // Cycle through each week of the month, up to 6 total
            for (let w = 1; w <= 6 && !monthEnded; w++) {
                const week = []

                for (let d = 1; d <= 7; d++) {
                    // We need to know when to start counting actual month days
                    if (!monthStarted && d >= this.firstWeekdayInMonth) {
                        // Initialize day counter
                        monthDay = 1
                        // ...and flag we're tracking actual month days
                        monthStarted = true
                    // Still in the middle of the month (hasn't ended yet)
                    } else if (monthStarted && !monthEnded) {
                        // Increment the day counter
                        monthDay += 1
                    }

                    // Append day info for the current week
                    // Note: this might or might not be an actual month day
                    //  We don't know how the UI wants to display various days,
                    //  so we'll supply all the data we can
                    week.push({
                        label: monthDay ? monthDay.toString(): '',
                        number: monthDay,
                        weekdayNumber: d,
                        weekNumber: w,
                        beforeMonth: !monthStarted,
                        afterMonth: monthEnded,
                        inMonth: monthStarted && !monthEnded,
                        isToday: (monthDay === _todayComps.day) && (this.month === _todayComps.month) && (this.year === _todayComps.year),
                        isFirstDay: monthDay === 1,
                        isLastDay: monthDay === this.daysInMonth
                    })

                    // Trigger end of month on the last day
                    if (monthStarted && !monthEnded && monthDay >= this.daysInMonth) {
                        monthDay = 0
                        monthEnded = true
                    }
                }

                weeks.push(week)
            }

            return weeks
        }
    },
    methods: {
        moveThisMonth() {
            this.month = _todayComps.month
            this.year = _todayComps.year
        },
        moveNextMonth() {
            if (this.month < 12) {
                this.month++
            } else {
                this.month = 1
                this.year++
            }
        },
        movePreviousMonth() {
            if (this.month > 1) {
                this.month--
            } else {
                this.month = 12
                this.year--
            }
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
