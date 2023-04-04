function getMonthName(month) {
    const d = new Date();
    d.setMonth(month - 1);
    const monthName = d.toLocaleString("default", { month: "long" });
    return monthName;
  }


export const getDate = (d) => {
    const date = new Date(d);
    const day = date.getDate(); // Date of the month: 2 in our example
    let month = date.getMonth()+1; // Month of the Year: 0-based index, so 1 in our example
    const year = date.getFullYear(); // Year: 2013
    //const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    //const dayofweek = weekday[date.getDay()];
    month = getMonthName(month);
    return `${day} ${month} ${year}`;
  };