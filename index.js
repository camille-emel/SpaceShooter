const shooter = document.getElementById("player-controlled-shooter");
const mainPlayArea = document.getElementById("main-play-area");

function moveUp() {
    let topPosition = window.getComputedStyle(shooter).getPropertyValue("top");
    if (shooter.style.top === "0px") {
        return;
    } else {
        let position = parseInt(topPosition);
        position -= 4
        //string interpolation is used to insert the value of position into the strin
        shooter.style.top = `${position}px`;
    }
}

function moveDown() {
    let topPosition = window.getComputedStyle(shooter).getPropertyValue("top");
    if (shooter.style.top === "360px") {
        return;
    } else {
        let position = parseInt(topPosition);
        position += 4
        shooter.style.top = `${position}px`;
    }
}

function letShipFly(event) {
    if (event.key === "ArrowUp") {
        event.preventDefault();
        moveUp();
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        moveDown();
    } else if (event.key === " ") {
        event.preventDefault();
        fireProjectile();
    }
}

function fireProjectile() {
    /*fix avant de passer le jeu en OOP
    1. En JavaScript, les fonctions sont aussi des objets.
    Cela signifie qu'on peut leur ajouter des propriétés.
    fireProjectile.canShoot est comme une variable attachée à la fonction,
    comme si c'était un tiroir de rangement qui appartient à la fonction.
    */
    if (fireProjectile.canShoot === undefined) {
        fireProjectile.canShoot = true;
    }

    if (fireProjectile.canShoot) {
        fireProjectile.canShoot = false;

        const sound = new Audio("sounds/pew.mp3");
        sound.volume = 0.2;
        sound.play();

        let projectiles = createProjectileElement()
        mainPlayArea.appendChild(projectiles);
        moveProjectile(projectiles);

        setTimeout(() => {
            fireProjectile.canShoot = true;
        }, 500);
    }
}

function createProjectileElement() {
    let xPos = parseInt(window.getComputedStyle(shooter).getPropertyValue("left"));
    let yPos = parseInt(window.getComputedStyle(shooter).getPropertyValue("top"));
    let newProjectile = document.createElement("img");
    newProjectile.src = "images/projectile.png";
    newProjectile.classList.add("projectile");
    newProjectile.style.left = `${xPos}px`;
    newProjectile.style.top = `${yPos - 10}px`;
    return newProjectile;
}

function moveProjectile(projectiles) {
    let projectileInterval = setInterval(() => {
        let xPos = parseInt(projectiles.style.left);
        if (xPos === 340) {
            projectiles.remove();
            clearInterval(projectileInterval);
        } else {
            projectiles.style.left = `${xPos + 4}px`;
        }
    }, 10)
}

window.addEventListener("keydown", letShipFly);
