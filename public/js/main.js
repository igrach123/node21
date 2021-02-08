const chekoutdate = document.querySelectorAll('p.checkout-date');

today = new Date();
console.log(chekoutdate);


const todayM = moment(today).format( 'DD-MMM-YYYY' );

chekoutdate.forEach(chekoutdate => {
  console.log(chekoutdate.innerText);
  console.log(todayM);
 
  if (chekoutdate.innerText < todayM) {
    chekoutdate.classList.add('bg-danger')
  }

});




/* var today, someday, text;
today = new Date();
someday = new Date(chekoutdate);
someday.setFullYear(chekoutdate);

if (someday > today) {
  console.log("Today is before January 14, 2100.") 
} else {
  console.log("Today is after January 14, 2100.")
};
 */