class ThemeNavManager {
    private toggleMenu: HTMLButtonElement | null;
    private navbar: HTMLDivElement | null;
    private overlayNav: HTMLDivElement | null;

    constructor() {
        this.toggleMenu = document.querySelector("[data-toggle-nav]");
        this.navbar = document.querySelector("[data-navbar]");
        this.overlayNav = document.querySelector("[data-nav-overlay]");
        
        this.init();
    }

    private init(): void {
        this.initTheme();
        this.initNav();
    }

    private initTheme(): void {
        // Écouter les changements de préférence système
        const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        
        // Fonction pour mettre à jour le thème
        const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
            if (e.matches) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        };

        // Appliquer le thème initial
        updateTheme(darkModeMediaQuery);

        // Écouter les changements
        darkModeMediaQuery.addEventListener("change", updateTheme);
    }

    private closeNav = (): void => {
        this.toggleMenu?.setAttribute("data-open-nav", "false");
        this.overlayNav?.setAttribute("data-is-visible", "false");
        document.body.classList.remove("!overflow-y-hidden");
        if (this.navbar) {
            this.navbar.style.height = "0px";
        }
    };

    private initNav(): void {
        if (this.toggleMenu) {
            this.toggleMenu.addEventListener("click", e => {
                e.preventDefault();
                const isOpen = this.toggleMenu?.getAttribute("data-open-nav") === "true";
                this.toggleMenu?.setAttribute("data-open-nav", (!isOpen).toString());
                this.overlayNav?.setAttribute("data-is-visible", (!isOpen).toString());
                document.body.classList.toggle("!overflow-y-hidden", !isOpen);
                if (this.navbar) {
                    this.navbar.style.height = isOpen ? "0px" : `${this.navbar.scrollHeight}px`;
                }
            });

            this.navbar?.addEventListener("click", this.closeNav);
            this.overlayNav?.addEventListener("click", this.closeNav);
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        requestIdleCallback(() => new ThemeNavManager());
    });
} else {
    requestIdleCallback(() => new ThemeNavManager());
}