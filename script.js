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

