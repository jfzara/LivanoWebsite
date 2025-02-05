const updateThemeAwareLogos = () => {
    const isDark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('.theme-aware-image').forEach(image => {
        const lightSrc = image.getAttribute('data-light-src') || '';
        const darkSrc = image.getAttribute('data-dark-src') || '';
        if (lightSrc && darkSrc) {
            image.setAttribute('src', isDark ? darkSrc : lightSrc);
        }
    });
}

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
            updateThemeAwareLogos();
        }
    });
});

observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
});

// Initial update
document.addEventListener('DOMContentLoaded', updateThemeAwareLogos);
updateThemeAwareLogos();