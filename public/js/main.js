//date color change
const chekoutdate = document.querySelectorAll('p.checkout-date');
today = new Date();
const todayM = moment(today).format( 'DD-MMM-YYYY' );

chekoutdate.forEach(chekoutdate => {
  const MomentCD = moment(chekoutdate.innerText).format( 'DD-MMM-YYYY' );
 
  if (moment(todayM).isAfter(MomentCD) ) {
    chekoutdate.classList.add('text-danger');
 
  }else{
    chekoutdate.classList.add('text-success');
  
  }
});

//status color change
const  status = document.getElementById("isactive");

if (status.value === "Active: true") {
  status.classList.add('text-success');
  
}else if(status.value === "true"){
  status.classList.add('text-success');
}
else{
  status.classList.add('text-danger');
};


