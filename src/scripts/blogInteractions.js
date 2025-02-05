// Gestion de la recherche et du filtrage des articles
function initBlogInteractions() {
    const filterButtons = document.querySelectorAll('[data-category]');
    const searchInput = document.getElementById('search-input');
    const loadMoreButton = document.getElementById('load-more');
    const showLessButton = document.getElementById('show-less');
    
    if (searchInput && loadMoreButton && showLessButton) {
        // Fonctionnalité de recherche
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const articles = document.querySelectorAll('article');
            
            articles.forEach((article) => {
                const title = article.querySelector('h3')?.textContent?.toLowerCase() || '';
                const excerpt = article.querySelector('p')?.textContent?.toLowerCase() || '';
                const category = article.querySelector('span')?.textContent?.toLowerCase() || '';
                
                article.style.display = 
                    title.includes(searchTerm) || 
                    excerpt.includes(searchTerm) || 
                    category.includes(searchTerm) ? 'block' : 'none';
            });
        });

        // Filtrage par catégorie
        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                searchInput.value = '';
                
                filterButtons.forEach((btn) => {
                    btn.classList.remove('bg-primary', 'text-white', 'border-primary');
                    btn.classList.add('border-box-border', 'text-heading-2');
                });

                button.classList.remove('border-box-border', 'text-heading-2');
                button.classList.add('bg-primary', 'text-white', 'border-primary');

                const category = button.getAttribute('data-category');
                const articles = document.querySelectorAll('article');
                
                articles.forEach((article) => {
                    const articleCategory = article.querySelector('[class*="bg-primary"]')?.textContent?.trim();
                    article.style.display = 
                        category === 'All' || category === articleCategory ? 'block' : 'none';
                });
            });
        });

        // Fonctionnalité Charger plus/Voir moins
        loadMoreButton.addEventListener('click', () => {
            showLessButton.classList.remove('hidden');
            loadMoreButton.style.display = 'none';
        });

        showLessButton.addEventListener('click', () => {
            loadMoreButton.style.display = 'inline-block';
            showLessButton.classList.add('hidden');
            
            const blogSection = document.querySelector('section');
            blogSection?.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Initialisation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogInteractions);
} else {
    initBlogInteractions();
}