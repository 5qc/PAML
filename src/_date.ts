function generateDate() {
    const getFormat = (format, d: Date) => {
        const hasZero = (num: Number) => {
            if (num < 10) return `0${num}`
            else return num
        }

        const monthArr1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const monthArr2 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        const dayArr1 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        const dayArr2 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        const month = d.getMonth() + 1
        const day = d.getDate()
        const year = d.getFullYear()
        const dayOfWeek = d.getDay()

        const hour = d.getHours()
        const min = d.getMinutes()
        const seconds = d.getSeconds()
        const milliseconds = d.getMilliseconds()

        const timezone = d.getTimezoneOffset() == 0 ? d.getTimezoneOffset() : d.getTimezoneOffset() / 60 > 0 ? `-${d.getTimezoneOffset() / 60}` : `+${d.getTimezoneOffset() / 60}`

        format = format.replace(/\byyyy\b/g, () => year)
        format = format.replace(/\byy\b/g, () => String(year).replace(/^../, ""))
        format = format.replace(/\bmmmm\b/g, () => monthArr2[month - 1])
        format = format.replace(/\bmmm\b/g, () => monthArr1[month - 1])
        format = format.replace(/\bmm\b/g, () => hasZero(month))
        format = format.replace(/\bm\b/g, () => month)
        format = format.replace(/\bdddd\b/g, () => dayArr2[dayOfWeek])
        format = format.replace(/\bddd\b/g, () => dayArr1[dayOfWeek])
        format = format.replace(/\bdd\b/g, () => hasZero(day))
        format = format.replace(/\bd\b/g, () => day)

        format = format.replace(/\bhour\b/g, () => hasZero(hour))
        format = format.replace(/\bmin\b/g, () => hasZero(min))
        format = format.replace(/\bsec\b/g, () => hasZero(seconds))
        format = format.replace(/\bms\b/g, () => hasZero(milliseconds))

        format = format.replace(/\btz\b/g, () => timezone)

        return format
    }

    const dateTags = document.querySelectorAll("date")
    for (let i = 0; i < dateTags.length; i++) {
        const date = dateTags[i]
        const liveDate = date.getAttribute("live") !== null ? true : false
        const format = date.getAttribute("format")

        const a = () => {
            if (format) {
                const d = new Date()
                return getFormat(format, d)
            } else {
                const d = new Date()
                return d
            }
        }

        if (liveDate === true) {
            const b = () => {
                date.innerHTML = String(a())
                setTimeout(b, 10)
            }
            b()
        } else if (liveDate === false) {
            date.innerHTML = String(a())
        }
    }
}