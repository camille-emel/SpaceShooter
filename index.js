const shooter = document.getElementById("player-controlled-shooter");

function moveUp() {
    let topPosition = window.getComputedStyle(shooter).getPropertyValue("top");
    if(shooter.style.top === "0px") {
        return;
    }else{
        let position = parseInt(topPosition);
        position -=4
        //string interpolation is used to insert the value of position into the strin
        shooter.style.top = `${position}px`;
    }
}
function moveDown() {
    let topPosition = window.getComputedStyle(shooter).getPropertyValue("top");
    if(shooter.style.top === "360px") {
        return;
    }else{
        let position = parseInt(topPosition);
        position +=4
        shooter.style.top = `${position}px`;
    }
}
function letShipFly(event){
    if(event.key === "ArrowUp"){
        event.preventDefault();
        moveUp();
    }else if(event.key === "ArrowDown"){
        event.preventDefault();
        moveDown();
    } else if(event.key === " "){
        event.preventDefault();
        fireWeapon();
    }
}
window.addEventListener("keydown", letShipFly);