var username;
var name;

async function infload(){
    const response = await fetch('https://gamersville.onrender.com/loadinf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
      
    const data = await response.json();
    console.log(data.body);
    console.log(data.un);

    if(data.un == null){
        console.log("meh");
    }
    else{
        console.log(data.un + " " + data.n);
    }

    var infcard = document.getElementById("info");
    infcard.innerHTML += "<br>NAME     : "+data.un +"<br>"+"USERNAME :"+ data.n;

}

async function infloadpb(){ 
    const response = await fetch('https://gamersville.onrender.com/loadinfpb', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
      
    var data = await response.json();

    console.log(data.score);

    var infcardpb = document.getElementById("personal-best");
    infcardpb.innerHTML += "<u>PERSONAL BEST</u><br><br>Rock Paper Scissors : "+data.score;

}

async function infloadpb1(){
    const response = await fetch('https://gamersville.onrender.com/loadinfpb1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
      
    var data = await response.json();

    console.log(data.score);

    var infcardpb1 = document.getElementById("personal-best");
    infcardpb1.innerHTML += "<br><br>MATCH THE CARDS : "+data.score;

}

infload();
infloadpb();
infloadpb1();
