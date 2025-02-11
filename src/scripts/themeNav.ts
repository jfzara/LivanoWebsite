class ThemeNavManager {
    private readonly switchTheme: HTMLButtonElement | null;
    private readonly toggleMenu: HTMLButtonElement | null;
    private readonly navbar: HTMLDivElement | null;
    private readonly overlayNav: HTMLDivElement | null;

    constructor() {
        this.switchTheme = document.querySelector<HTMLButtonElement>("[data-switch-theme]");
        this.toggleMenu = document.querySelector<HTMLButtonElement>("[data-toggle-nav]");
        this.navbar = document.querySelector<HTMLDivElement>("[data-navbar]");
        this.overlayNav = document.querySelector<HTMLDivElement>("[data-nav-overlay]");
        
        this.init();
    }

    private init(): void {
        this.initTheme();
        this.initNav();
    }

    private initTheme(): void {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const storedTheme = localStorage.getItem("appTheme");
        
        if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        // Écouter les changements de préférence système
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
            if (!localStorage.getItem("appTheme")) {
                document.documentElement.classList.toggle("dark", e.matches);
            }
        });

        this.switchTheme?.addEventListener("click", (e: Event) => {
            e.preventDefault();
            const doc = document.documentElement;
            const isDark = doc.classList.contains("dark");
            doc.classList.toggle("dark");
            localStorage.setItem("appTheme", isDark ? "light" : "dark");
        });
    }

    private closeNav = (): void => {
        if (!this.toggleMenu || !this.overlayNav || !this.navbar) return;
        
        this.toggleMenu.setAttribute("data-open-nav", "false");
        this.overlayNav.setAttribute("data-is-visible", "false");
        document.body.classList.remove("!overflow-y-hidden");
        this.navbar.style.height = "0px";
    };

    private initNav(): void {
        if (!this.toggleMenu) return;

        this.toggleMenu.addEventListener("click", (e: Event) => {
            e.preventDefault();
            const isOpen = this.toggleMenu?.getAttribute("data-open-nav") === "true";
            
            if (this.toggleMenu && this.overlayNav && this.navbar) {
                this.toggleMenu.setAttribute("data-open-nav", (!isOpen).toString());
                this.overlayNav.setAttribute("data-is-visible", (!isOpen).toString());
                document.body.classList.toggle("!overflow-y-hidden", !isOpen);
                this.navbar.style.height = isOpen ? "0px" : `${this.navbar.scrollHeight}px`;
            }
        });

        this.navbar?.addEventListener("click", this.closeNav);
        this.overlayNav?.addEventListener("click", this.closeNav);
    }
}

// Utiliser requestAnimationFrame au lieu de requestIdleCallback pour une meilleure performance
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        requestAnimationFrame(() => new ThemeNavManager());
    });
} else {
    requestAnimationFrame(() => new ThemeNavManager());
}