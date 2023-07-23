import { Timestamp } from "firebase/firestore";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getFormattedDate = (
  date: Date,
  prefomattedDate: string | boolean = false,
  hideYear = false
) => {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes: number | string = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${minutes}`;
  }

  if (prefomattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${prefomattedDate} at ${hours}:${minutes}`;
  }

  if (hideYear) {
    // 10. January at 10:20
    return `${day}. ${month} at ${hours}:${minutes}`;
  }

  // 10. January 2017. at 10:20
  return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
};

const timeAgo = (dateParam: Date) => {
  if (!dateParam) {
    return null;
  }

  const timeHours: number = dateParam.getHours();
  const timeMinutes: number = dateParam.getMinutes();

  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
  const today = new Date();
  const seconds = Math.round((today.getTime() - Number(date)) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(seconds / (60 * 60));
  const days = Math.round(seconds / (60 * 60 * 24));
  const monthes = Math.round(seconds / (60 * 60 * 24 * 30));
  const isThisYear = today.getFullYear() === date.getFullYear();

  if (seconds < 5) {
    return "now";
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 90) {
    return "about a minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago at ${
      timeHours < 10 ? "0" + timeHours : timeHours
    }:${timeMinutes < 10 ? "0" + timeMinutes : timeMinutes}`;
  } else if (monthes < 12) {
    return `${monthes} days ago at ${
      timeHours < 10 ? "0" + timeHours : timeHours
    }:${timeMinutes < 10 ? "0" + timeMinutes : timeMinutes}`;
  } else if (isThisYear) {
    return getFormattedDate(date, false, true);
  }

  return getFormattedDate(date);
};

const caculateCountPerDay = (labels: string[], filteredRecord: Date[]) => {
  const dataSet = [];
  for (let i = 0; i < labels.length; i++) {
    const labelDay = labels[i];
    let count = 0;
    for (let j = 0; j < filteredRecord.length; j++) {
      const recordMon = filteredRecord[j].getMonth() + 1;
      const recordDate = filteredRecord[j].getDate();
      const recordDay = `${recordMon}/${recordDate}`;

      if (labelDay == recordDay) {
        count += 1;
      }
    }

    dataSet.push(count);
  }
  return dataSet;
};

const getTime = (time: Timestamp, showMinutes: boolean) => {
  const date = new Date(time.seconds * 1000);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  if (showMinutes) {
    return `${date.getFullYear()}/${month < 10 ? `0${month}` : month}/${
      day < 10 ? `0${day}` : day
    } ${showMinutes && hour < 10 ? `0${hour}` : hour}:${
      minute < 10 ? `0${minute}` : minute
    }`;
  }
  return `${date.getFullYear()}/${month < 10 ? `0${month}` : month}/${
    day < 10 ? `0${day}` : day
  } `;
};

export { timeAgo, caculateCountPerDay, getTime };
