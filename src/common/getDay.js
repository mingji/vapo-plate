const getDay = (date) => {
  console.log("getDay -> date", date);
  let date1 = new Date(date);
  date1.setTime(date);
  console.log("getDay -> date1", date1);
  let date2 = new Date();
  let timeDiff = Math.abs(date2.getTime() - date1.getTime());
  console.log("getDay -> timeDiff", timeDiff);
  let result;
  if (Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) > 1) {
    result = String(Math.ceil(timeDiff / (1000 * 60 * 60 * 24))).concat(
      " days"
    );
  } else {
    if (Math.ceil(timeDiff / (1000 * 60 * 60)) > 1) {
      result = String(Math.ceil(timeDiff / (1000 * 60 * 60))).concat(" hours");
    } else {
      if (Math.ceil(timeDiff / (1000 * 60) > 1)) {
        result = String(Math.ceil(timeDiff / (1000 * 60))).concat(" mins");
      } else {
        result = String(Math.ceil(timeDiff / 1000)).concat(" sec");
      }
    }
  }
  return result + ' ago';
};

export default getDay;
