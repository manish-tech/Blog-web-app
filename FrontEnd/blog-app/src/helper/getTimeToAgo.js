const secondsToMinute = (seconds)=>{
    return seconds/60;
}

const minutesToHours = (minutes)=>{
    return minutes/60;
}

const hoursToDays = (hours)=>{
    return hours/24;
}

const daysToWeeks = (days)=>{
    return days/7;
}

const weeksToMonths = (weeks)=>{
    return weeks/4;
}

const monthsToYears = (months)=>{
    return months/12;
}

const getTimeToAgo = (date)=>{
    const current = new Date();
    const prev = new Date(date.toString() + ' UTC');
    const seconds = (current - prev)/1000;

    if(seconds <= 60)
        return parseInt(seconds) + ' seconds ago';
    const minutes = secondsToMinute(seconds);
    if(minutes <= 60)
        return parseInt(minutes) + ' minutes ago';
    const hours = minutesToHours(minutes);
    if(hours <= 24)
        return parseInt(hours) + ' hours ago';
    const days = hoursToDays(hours);
    if(days <= 7)
        return parseInt(days) + ' days ago';    
    const weeks = daysToWeeks(days);
    if(weeks <= 4)
        return parseInt(weeks) + ' weeks ago';
    const months = weeksToMonths(weeks);
    if(months <= 12)
        return parseInt(months) + ' months ago';
    const years = monthsToYears(months);
    return parseInt(years) + ' years ago';
}

export default getTimeToAgo;