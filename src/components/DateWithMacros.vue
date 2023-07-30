
<template>
  <v-form v-model="valid">
    <v-container>
      <v-label class="lookup-label">
        Date with macros
      </v-label>
      <v-row>
        <v-col>
            <v-responsive class="text-field-wrapper">
              <v-text-field
                v-model="date"
                variant="outlined"
                color="on_green"
                placeholder="mm/dd/yyyy"
                :rules="dateRule"
                @update:focused="handleFocus"
              />
            </v-responsive>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script setup lang="ts">
import { ref } from 'vue';

/**
 * Type of spliter in the input date
 * 
 * For example: the spliter for input 02/02/2023 is "/"
 */
type Spliter = "/" | "-" | ""

const valid = ref<boolean>(false)

const date = ref<string>("")

const lastDate = ref<string>("")


/**
 * Regex for counting with format d, d + n, m, m + n, w, w + n
 * 
 * For example: d+1, d, w, w+2, m, m+10
 */
 const countingRegex = /(d|w|m)([+-]\d+)?$/

/**
 * Regex for input with format mm/dd/yyyy and m/d/yyyy
 * 
 * For example: 02/02/2023, 2/2/2023
 */
const dateRegexWithSlash = /^\d{1,2}\/\d{1,2}\/\d{4}$/


/**
 * Regex for input with format mm/dd/yy
 * 
 * For example: 02/02/23, 2/2/23
 * 
 */
const shortDateRegexWithSlash = /^\d{1,2}\/\d{1,2}\/\d{2}$/


/**
 * Regex for input with format mm-dd-yyyy and m-d-yyyy
 * 
 * For example: 02-02-2023, 2-2-2023
 * 
 */

// eslint-disable-next-line no-useless-escape
const dateRegexWithDash = /^\d{1,2}\-\d{1,2}\-\d{4}$/


/**
 * Regex for input with format mm-dd-yy and m-d-yy
 * 
 * For example: 02-02-23, 2-2-23
 * 
 */
// eslint-disable-next-line no-useless-escape
const shortDateRegexWithDash = /^\d{1,2}\-\d{1,2}\-\d{2}$/


/**
 * Regex for input with format mmddyyyy
 * For example: 02022023
 * 
 * 
 * We can get month, day, year with this regex
 * 
 * For example:
 * 
 *   const month =  "02022023".match(dateWithoutSpliter)[1]
 * 
 *   const day =  "02022023".match(dateWithoutSpliter)[2]
 * 
 *   const year =  "02022023".match(dateWithoutSpliter)[3]
 * 
 *   const [,_month, _day, _year] = "02022023".match(dateWithoutSpliter)[3]
 * 
*/
const dateWithoutSpliter = /^(\d{2})(\d{2})(\d{4})$/

/**
 * Check if user's input is one of the desired formats
 * 
 * mm/dd/yyyy, m/d/yyyy, mm/dd/yy, mm-dd-yyyy, m-d-yyyy, mm-dd-yy, m-d-yy and mmddyyyy
 * 
 * @param date The string from user's input
 */ 
const isValidDateString = (date: string): boolean => {
  return dateRegexWithSlash.test(date) ||
    dateRegexWithDash.test(date) ||
    shortDateRegexWithDash.test(date) ||
    shortDateRegexWithSlash.test(date) ||
    dateWithoutSpliter.test(date)
}


/**
 * Return formated number for any number less than 10
 * 
 * For example:
 * formatNumberInDate(1)
 * 
 * => 01
 * 
 * formatNumberInDate(8)
 * 
 * => 08
 * 
 * formatNumberInDate(01)
 * 
 * => 01 
 *
 * 
 * @param num The number need to be formated
 */
const formatNumberInDate = (num: number) => {
  if (0 < num && num < 10) {
    return "0" + num
  }
  return num.toString()
}


/**
 * 
 * Return the formated date from date object
 * 
 * For example: formatDate(new Date(), "/")
 * 
 * => 02/02/2023
 * 
 * @param date The Date object
 * @param spliter The disired spliter
 */
const formatDate = (date: Date | number | string, spliter: Spliter) => {
  const dateObj = new Date(date)
  const dateOfMonth = formatNumberInDate(dateObj.getDate())
  const month = formatNumberInDate(dateObj.getMonth() + 1)
  const year = formatNumberInDate(dateObj.getFullYear())
  return [month, dateOfMonth, year].join(spliter)
}


/**
 * 
 * Return the formated date from year, month, date and spliter
 * 
 * For example:
 * 
 * formatDateWithDateMonthYear(2020, 2, 2, "/")
 * 
 * => 02/02/2022
 * 
 * formatDateWithDateMonthYear(2020, 2, 2, "-")
 * 
 * => 02-02-2022
 * 
 * 
 * @param year 
 * @param month 
 * @param date 
 * @param spliter 
 */
const formatDateWithDateMonthYear = (year: string | number, month: string | number, date: string | number, spliter: Spliter) => {
  const formatedDate = formatNumberInDate(Number(date))
  const formatedMonth = formatNumberInDate(Number(month))
  const formatedYear = formatNumberInDate(Number(year))
  return [formatedMonth, formatedDate, formatedYear].join(spliter)
}

/**
 * 
 * Return month, date, year from user's input
 * 
 * @param inputValue The input of user
 */
const getMonthYearDateFromInput = (inputValue: string) => {
  let spliter:Spliter = ""
  let month, date, year

  if (dateRegexWithSlash.test(inputValue) || shortDateRegexWithSlash.test(inputValue)) {
    spliter = "/";
    [month, date, year] = inputValue.split("/").map(Number)
    if (shortDateRegexWithSlash.test(inputValue)) {
      year = Number("20" + year)
    }
  }
  if (dateRegexWithDash.test(inputValue) || shortDateRegexWithDash.test(inputValue)) {
    spliter = "-";
    [month, date, year] = inputValue.split("-").map(Number)
    if (shortDateRegexWithDash.test(inputValue)) {
      year = Number("20" + year)
    }
  } 

  if (dateWithoutSpliter.test(inputValue)) {
    [, month, date, year] = inputValue.match(dateWithoutSpliter);
  }

  return {
    date,
    month,
    year,
    spliter
  } 
}


/**
 * Return the formated date from user's input
 * 
 * For example:
 * formatDateWithDateMonthYear("2/2/2022")
 * 
 * => 02/02/2022
 * 
 * formatDateWithDateMonthYear("02022022")
 * 
 * => 02/02/2022
 * 
 * @param inputValue The input of user
 */
const formatDateFromInput = (inputValue: string) => {
  const { month, date, year } = getMonthYearDateFromInput(inputValue)
  return formatDateWithDateMonthYear(year, month, date, "/");
}


/**
 * Return the date after adding month/week/day
 * 
 * For example, the current date is 02/02/2023
 * 
 * getCountedDateValue("d+1", "02/02/2023")
 * 
 * => 02/03/2023
 * 
 * 
 * @param inputValue The input of user
 * @param type Type of time, can be day, week, month
 * @param start The start time
 */
const getCountedDateValue = (inputValue: string, start: string) => {
  const isAdd = inputValue.includes("+")
  const sign = isAdd ? "+" : "-"
  const valueCount = inputValue.split(sign)[1] || 0
  const dateCount = isNaN(Number(valueCount)) ? 0 : Number(valueCount)
  const type = inputValue.match(countingRegex)?.[1] ?? "";
  let { date, month, year, spliter } = getMonthYearDateFromInput(start)

  if (type === "d") {
    date = isAdd ? date + dateCount : date - dateCount
  }

  if (type === "w") {
    date = isAdd ? date + dateCount * 7 : date - dateCount * 7
  }

  if (type === "m") {
    month = isAdd ? month + dateCount : month - dateCount
  }

  return formatDateWithDateMonthYear(year, month, date, spliter)
}

/**
 * 
 * @param isFocus The focus status of input
 */
const handleFocus = (isFocus: boolean) => {
  if (!isFocus) {
    let result = ""
    const start = lastDate.value ? lastDate.value : formatDate(new Date(), "/")
    if (countingRegex.test(date.value)) {
      result = getCountedDateValue(date.value, start)
    }
    if (isValidDateString(date.value)) {
      result = formatDateFromInput(date.value)
    }
    lastDate.value = result
    date.value = result
  }
}

/**
 * The array of special date values
 */
const validValues = [0, 99]


/**
 * 
 * Check if a number is a valid month
 * 
 * @param month 
 */
const isValidMonth = (month: number) => {
  return (month <= 12 && month > 0) || validValues.includes(month)
}


/**
 * 
 * Check if a number is a valid day in month
 * 
 * @param day The number that we want to check
 * @param maxDay The max value of day. Default is 31
 */
const isValidDay = (day: number, maxDay: number = 31) => {
  return (day <= maxDay && day > 0) || validValues.includes(day)
}


/**
 * Rules for the user's input. If date, month and year are invalid, return "Invalid Date", else return true 
 * 
 */
const dateRule = [
  (value: string | null | undefined) => {
    if (!value) {
      return true
    }
    if (isValidDateString(value)) {
      const { date, month, year } = getMonthYearDateFromInput(value)
      if (validValues.includes(month) && !isValidDay(date)) {
        return "Invalid Date"
      }
      if (validValues.includes(date) && !isValidMonth(month)) {
        return "Invalid Date"
      }
      const maxDayInMonth = new Date(year, month, 0).getDate()
      if (!isValidMonth(month) || !isValidDay(date, maxDayInMonth)) {
        return "Invalid Date"
      }
      return true
    }
    return true
  },
]

</script>