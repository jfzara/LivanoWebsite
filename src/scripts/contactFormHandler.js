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
}

// Initialisation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}