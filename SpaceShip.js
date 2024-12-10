class Ship {
    constructor(elementId, playAreaId) {
        this.shipElement = document.getElementById(elementId);
        this.playArea = document.getElementById(playAreaId); // Changed to store the actual element
        this.speed = 5; // Movement speed
        this.projectileCooldown = 500; // Cooldown between projectiles
        this.canShoot = true; // Whether the ship can fire
        this.moveState = {
            up: false,
            down: false,
            left: false,
            right: false
        };

        // Set initial position
        this.shipElement.style.top = "360px"; // Middle of screen
        this.shipElement.style.left = "20px";  // Left side

        this.initControls();
        this.startGameLoop();
    }

    // Move the ship up
    moveUp() {
        let topPosition = parseInt(window.getComputedStyle(this.shipElement).getPropertyValue("top"));
        let newPosition = topPosition - this.speed;
        // Make sure we don't go above the game area
        if (newPosition >= 0) {
            this.shipElement.style.top = `${newPosition}px`;
        }
    }

    // Move the ship down
    moveDown() {
        let topPosition = parseInt(window.getComputedStyle(this.shipElement).getPropertyValue("top"));
        let maxHeight = this.playArea.offsetHeight - this.shipElement.offsetHeight;
        let newPosition = topPosition + this.speed;
        // Make sure we don't go below the game area
        if (newPosition <= maxHeight) {
            this.shipElement.style.top = `${newPosition}px`;
        }
    }

    // Move the ship left
    moveLeft() {
        let leftPosition = parseInt(window.getComputedStyle(this.shipElement).getPropertyValue("left"));
        let newPosition = leftPosition - this.speed;
        // Make sure we don't go past the left edge
        if (newPosition >= 0) {
            this.shipElement.style.left = `${newPosition}px`;
        }
    }

    // Move the ship right
    moveRight() {
        let leftPosition = parseInt(window.getComputedStyle(this.shipElement).getPropertyValue("left"));
        let maxWidth = this.playArea.offsetWidth - this.shipElement.offsetWidth;
        let newPosition = leftPosition + this.speed;
        // Make sure we don't go past the right edge
        if (newPosition <= maxWidth) {
            this.shipElement.style.left = `${newPosition}px`;
        }
    }

    // Game loop for smooth movement
    startGameLoop() {
        setInterval(() => {
            if (this.moveState.up) this.moveUp();
            if (this.moveState.down) this.moveDown();
            if (this.moveState.left) this.moveLeft();
            if (this.moveState.right) this.moveRight();
        }, 1000 / 60); // 60 FPS
    }

    // Fire a projectile
    fireProjectile() {
        if (this.canShoot) {
            this.canShoot = false;

            // Create a new projectile
            new Projectile(this, this.playArea.id);

            setTimeout(() => {
                this.canShoot = true;
            }, this.projectileCooldown);
        }
    }

    // Initialize keyboard controls
    initControls() {
        window.addEventListener("keydown", (event) => {
            event.preventDefault();
            switch(event.key) {
                case "ArrowUp":
                    this.moveState.up = true;
                    break;
                case "ArrowDown":
                    this.moveState.down = true;
                    break;
                case "ArrowLeft":
                    this.moveState.left = true;
                    break;
                case "ArrowRight":
                    this.moveState.right = true;
                    break;
                case " ":
                    this.fireProjectile();
                    break;
            }
        });

        window.addEventListener("keyup", (event) => {
            switch(event.key) {
                case "ArrowUp":
                    this.moveState.up = false;
                    break;
                case "ArrowDown":
                    this.moveState.down = false;
                    break;
                case "ArrowLeft":
                    this.moveState.left = false;
                    break;
                case "ArrowRight":
                    this.moveState.right = false;
                    break;
            }
        });
    }
}

// Instantiate the ship
const ship = new Ship("player-controlled-shooter", "main-play-area");
