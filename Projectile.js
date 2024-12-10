class Projectile {
    constructor(ship, playArea) {
        this.playArea = document.getElementById(playArea);
        this.element = this.createProjectile(ship);
        this.speed = 4; // Speed of the projectile
        this.move();
    }

    // Create the projectile element
    createProjectile(ship) {
        const projectile = document.createElement("img");
        projectile.src = "images/projectile.png";
        projectile.classList.add("projectile");

        // Position projectile at the front of the ship
        const shipElement = ship.shipElement;
        projectile.style.left = `${parseInt(window.getComputedStyle(shipElement).getPropertyValue("left")) + shipElement.offsetWidth}px`;
        projectile.style.top = `${parseInt(window.getComputedStyle(shipElement).getPropertyValue("top")) + shipElement.offsetHeight / 2 - 10}px`;

        this.playArea.appendChild(projectile);
        return projectile;
    }

    // Move the projectile across the screen
    move() {
        const interval = setInterval(() => {
            let xPos = parseInt(this.element.style.left);

            if (xPos > this.playArea.offsetWidth) {
                this.element.remove();
                clearInterval(interval);
            } else {
                this.element.style.left = `${xPos + this.speed}px`;
            }
        }, 10);
    }
}
