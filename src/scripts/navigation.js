const toggleMenu = document.querySelector("[data-toggle-nav]");
const navbar = document.querySelector("[data-navbar]");
const overlayNav = document.querySelector("[data-nav-overlay]");

if (toggleMenu) {
    // Fonction pour ouvrir le menu
    function openMenu() {
        toggleMenu.setAttribute("data-open-nav", "true");
        overlayNav.classList.remove("hidden");
        document.body.classList.add("!overflow-y-hidden");
        navbar.style.height = `${navbar.scrollHeight}px`;

        // Animation du hamburger
        const line1 = document.getElementById("line1");
        const line2 = document.getElementById("line2");
        const line3 = document.getElementById("line3");
        
        line1.style.transform = "rotate(45deg) translate(5px, 5px)";
        line2.style.opacity = "0";
        line3.style.transform = "rotate(-45deg) translate(5px, -5px)";
    }

    // Fonction pour fermer le menu
    function closeMenu() {
        toggleMenu.setAttribute("data-open-nav", "false");
        overlayNav.classList.add("hidden");
        document.body.classList.remove("!overflow-y-hidden");
        navbar.style.height = "0px";

        // Réinitialiser l'animation du hamburger
        const line1 = document.getElementById("line1");
        const line2 = document.getElementById("line2");
        const line3 = document.getElementById("line3");
        
        line1.style.transform = "";
        line2.style.opacity = "1";
        line3.style.transform = "";
    }

    // Gestionnaire de clic pour le bouton hamburger
    toggleMenu.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = toggleMenu.getAttribute("data-open-nav") === "true";
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Gestionnaire de clic pour les liens de navigation
    const navLinks = navbar.querySelectorAll("a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    // Empêcher la fermeture du menu lors du clic à l'intérieur
    navbar.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // Fermer le menu lors du clic sur l'overlay
    overlayNav.addEventListener("click", () => {
        closeMenu();
    });

    // Fermer le menu lors du clic en dehors
    document.addEventListener("click", (e) => {
        const isOpen = toggleMenu.getAttribute("data-open-nav") === "true";
        if (isOpen && !navbar.contains(e.target) && !toggleMenu.contains(e.target)) {
            closeMenu();
        }
    });
}