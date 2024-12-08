const shooter = document.getElementById("player-controlled-shooter");
const mainPlayArea = document.getElementById("main-play-area");

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
        fireProjectile();
    }
}

function fireProjectile(){
    let projectiles = createProjectileElement()
    mainPlayArea.appendChild(projectiles);
    let projectileSound = new Audio("audio/pew.m4a");
    projectileSound.volume = 0.2;
    projectileSound.play();
    moveProjectile(projectiles);
}
function createProjectileElement(){
    let xPos = parseInt(window.getComputedStyle(shooter).getPropertyValue("left"));
    let yPos = parseInt(window.getComputedStyle(shooter).getPropertyValue("top"));
    let newProjectile = document.createElement("img");
    newProjectile.src ="images/projectile.png";
    newProjectile.classList.add("projectile");
    newProjectile.style.left = `${xPos}px`;
    newProjectile.style.top = `${yPos - 10}px`;
    return newProjectile;
}
function moveProjectile(projectiles){
    let projectileInterval = setInterval(() => {
        let xPos = parseInt(projectiles.style.left);
        if(xPos === 340){
            projectiles.remove();
        }else {
            projectiles.style.left = `${xPos + 4}px`;
        }
    }, 10)
}
window.addEventListener("keydown", letShipFly);
