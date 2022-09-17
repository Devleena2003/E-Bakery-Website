let futureDate=new Date("September 20, 2022 00:00:00").getTime();
let x=setInterval(function(){
    let now=new Date().getTime();
    let distance=futureDate-now;
    // let days=Math.floor((distance/(1000*60*60*24)));
    let hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));
    let minutes=Math.floor((distance%(1000*60*60))/(1000*60));
    let seconds=Math.floor((distance%(1000*60))/(1000));

   
    document.getElementById('hours').innerHTML=hours;
    document.getElementById('minutes').innerHTML=minutes;
    document.getElementById('days').innerHTML=seconds;

    if(distance<0){
        clearInterval(x);
       
        document.getElementById('hours').innerHTML="00";
        document.getElementById('minutes').innerHTML="00";
        document.getElementById('days').innerHTML="00";

    }
},1000);
