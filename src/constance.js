window.primeVueDateFormat = {
    firstDayOfWeek: 0,
    dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
    today: "今天",
    clear: "清空",
    dateFormat: "yy-mm-dd",
    weekHeader: "周",
};
 


export const getDDL = (key,objList) => {
    const arr = objList.map( s => s[key]);
    const mySet = new Set(arr);
    return [...mySet].filter(s => s).sort();
}