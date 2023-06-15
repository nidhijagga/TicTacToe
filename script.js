document.getElementById("loading").style.display = "none";
document.getElementById("bigCont").style.display = "none";
document.getElementById("userCont").style.display = "none";
document.getElementById("oppNameCont").style.display = "none";
document.getElementById("valueCont").style.display = "none";
document.getElementById("whosTurn").style.display = "none";

const socket = io();

let name;

document.getElementById("find").addEventListener("click", function(){
    name = document.getElementById("name").value;
    document.getElementById("user").innerHTML = name;

    if(name === null || name === " "){
        alert("Enter a valid name");
    }
    else{

        //sending the name to server
        socket.emit("find", {name : name})
        document.getElementById("loading").style.display="block";
        document.getElementById("find").disabled = true;
    }
})

socket.on("find", (e) => {

    let allPlayersArray = e.allPlayers

    if (name != '') {
        document.getElementById("userCont").style.display = "block"
        document.getElementById("oppNameCont").style.display = "block"
        document.getElementById("valueCont").style.display = "block"
        document.getElementById("loading").style.display = "none"
        document.getElementById("name").style.display = "none"
        document.getElementById("find").style.display = "none"
        document.getElementById("enterName").style.display = "none"
        document.getElementById("bigCont").style.display = "block"
        document.getElementById("whosTurn").style.display = "block"
        document.getElementById("whosTurn").innerText = "X's Turn"

    }

    let oppName;
    let value;

    const foundObject = allPlayersArray.find(obj => obj.p1.p1name == `${name}` || obj.p2.p2name == `${name}`);
    foundObject.p1.p1name == `${name}` ? oppName = foundObject.p2.p2name : oppName = foundObject.p1.p1name
    foundObject.p1.p1name == `${name}` ? value = foundObject.p1.p1value : value = foundObject.p2.p2value

    document.getElementById("oppName").innerText = oppName
    document.getElementById("value").innerText = value


})

// Get all the buttons with class "btn"
const buttons = document.querySelectorAll('.btn');

// Loop through each button and attach an event listener
buttons.forEach((e) => {
  e.addEventListener('click', function(){
    let value = document.getElementById("value").innerText;
    e.innerText = value;
    socket.emit("play", {value : value, name : name, id : e.id});
  });
});

socket.on("play", (e)=>{
    const foundObject = (e.allPlayers).find(obj => obj.p1.p1name == `${name}` || obj.p2.p2name == `${name}`);
    p1id = foundObject.p1.p1move
    p2id = foundObject.p2.p2move

    if ((foundObject.sum) % 2 == 0) {
        document.getElementById("whosTurn").innerText = "O's Turn"
    }
    else {
        document.getElementById("whosTurn").innerText = "X's Turn"
    }

    if (p1id != '') {
        document.getElementById(`${p1id}`).innerText = "X"
        document.getElementById(`${p1id}`).disabled = true
        document.getElementById(`${p1id}`).style.color = "black"
    }
    if (p2id != '') {
        document.getElementById(`${p2id}`).innerText = "O"
        document.getElementById(`${p2id}`).disabled = true
        document.getElementById(`${p2id}`).style.color = "black"
    }


})


