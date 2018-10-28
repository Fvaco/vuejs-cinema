function checkFilter(category, title, checked) {
  if (checked) return this[category].push(title);
  return this[category].splice(
    this[category].findIndex(item => item === title),
    1
  );
}
function setDay(day){
  this.day = day;
}

export {checkFilter, setDay}