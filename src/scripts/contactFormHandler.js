// Gestion du compteur de caractères et des soumissions du formulaire
function initContactForm() {
    const form = document.getElementById('contactForm');
    const messageTextarea = form?.querySelector('textarea[name="message"]');
    const messageLengthDiv = form?.querySelector('.message-length');
    
    if (messageTextarea && messageLengthDiv) {
        const updateMessageLength = () => {
            const remaining = 1000 - messageTextarea.value.length;
            messageLengthDiv.textContent = `${remaining} characters remaining`;
        };
        
        messageTextarea.addEventListener('input', updateMessageLength);
        updateMessageLength();
    }

    // Ajout de la gestion du reCAPTCHA lors de la soumission
    if (form) {
        form.addEventListener('submit', async function(e) {
            // En développement, on soumet directement le formulaire
            if (window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1' || 
                window.location.hostname.includes('.pages.dev')) {
                return;
            }

            e.preventDefault();
            
            try {
                // Renouveler le token reCAPTCHA avant la soumission
                const token = await grecaptcha.execute(window.recaptchaSiteKey, {action: 'submit'});
                document.getElementById('g-recaptcha-response').value = token;
                
                // Soumettre le formulaire
                form.submit();
            } catch (error) {
                console.error('reCAPTCHA error:', error);
                // En cas d'erreur, on soumet quand même le formulaire
                form.submit();
            }
        });
    }
}

// Initialisation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}