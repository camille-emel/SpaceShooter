class Background {
    constructor() {
        // 1. Création du canvas (comme une toile pour dessiner)
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.ctx = this.canvas.getContext('2d');  // Obtient le "pinceau" pour dessiner
        document.getElementById('main-play-area').appendChild(this.canvas);
        
        // 2. Variables de base
        this.starsX = 0;      // Position horizontale des étoiles
        this.speed = 0.1;       // Vitesse de défilement
        this.isReady = false; // Drapeau pour savoir si on peut commencer
        
        // 3. Démarre le chargement des images
        this.loadImages();
    }
    
    // 4. Fonction pour charger les images
    loadImages() {
        this.nebula = new Image();  // Crée l'image de la nébuleuse
        this.stars = new Image();   // Crée l'image des étoiles
        
        let loadedImages = 0;  // Compte les images chargées
        
        // 5. Cette fonction est appelée chaque fois qu'une image finit de charger
        const imageLoaded = () => {
            loadedImages++;
            if (loadedImages === 2) {  // Si les 2 images sont chargées
                this.isReady = true;   // On est prêt !
                this.animate();        // On démarre l'animation
            }
        };
        
        // 6. Attache la fonction aux événements de chargement
        this.nebula.onload = imageLoaded;
        this.stars.onload = imageLoaded;
        
        // 7. Démarre le chargement des images
        this.nebula.src = 'images/background_nebula.jpg';
        this.stars.src = 'images/background_stars.png';
    }
    
    // 8. Fonction d'animation (tourne en boucle)
    animate() {
        if (!this.isReady) return;  // Sécurité
        
        // 9. Dessine la nébuleuse (fond fixe)
        this.ctx.drawImage(this.nebula, 0, 0, this.canvas.width, this.canvas.height);
        
        // 10. Dessine les étoiles deux fois (pour le défilement continu)
        this.ctx.drawImage(this.stars, this.starsX, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.stars, this.starsX + this.canvas.width, 0, this.canvas.width, this.canvas.height);
        
        // 11. Déplace les étoiles vers la gauche
        this.starsX -= this.speed;
        
        // 12. Si les étoiles sont sorties de l'écran, on les remet au début
        if (this.starsX <= -this.canvas.width) {
            this.starsX = 0;
        }
        
        // 13. Demande la prochaine frame d'animation
        requestAnimationFrame(() => this.animate());
    }
    
    // 14. Fonction pour changer la vitesse
    setSpeed(newSpeed) {
        this.speed = newSpeed;
    }
}

// 15. Crée le background
const background = new Background();