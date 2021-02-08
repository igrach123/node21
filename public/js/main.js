//red date background logic

const chekoutdate = document.querySelectorAll('p.checkout-date');
today = new Date();
const todayM = moment(today).format( 'DD-MMM-YYYY' );
console.log(chekoutdate.length);
chekoutdate.forEach(chekoutdate => {
  console.log(chekoutdate.innerText);
  const MomentCD = moment(chekoutdate.innerText).format( 'DD-MMM-YYYY' );
  console.log(todayM);
  console.log(MomentCD);
 
  if (moment(todayM).isAfter(MomentCD) ) {
    chekoutdate.classList.add('text-danger')
  }else{
    chekoutdate.classList.add('text-success')
  }
});

