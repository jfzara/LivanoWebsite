// Gestionnaire de formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const messageTextarea = form.querySelector('textarea[name="message"]');
    const messageLengthDiv = form.querySelector('.message-length');

    // Mise à jour du compteur de caractères
    function updateMessageLength() {
        const currentLength = messageTextarea.value.length;
        const maxLength = messageTextarea.getAttribute('maxlength');
        messageLengthDiv.textContent = `${currentLength}/${maxLength}`;
    }

    // Initialisation du compteur
    updateMessageLength();

    // Mise à jour du compteur lors de la saisie
    messageTextarea.addEventListener('input', updateMessageLength);

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', function(e) {
        // Réinitialisation des messages d'erreur personnalisés
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.setCustomValidity('');
        });

        // Validation personnalisée du nom
        const nameInput = form.querySelector('input[name="name"]');
        if (nameInput.value.length < 2) {
            nameInput.setCustomValidity('Please enter your full name (minimum 2 letters)');
            return;
        }

        // Validation personnalisée de l'email
        const emailInput = form.querySelector('input[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.setCustomValidity('Please enter a valid email address');
            return;
        }

        // Validation personnalisée du numéro de téléphone
        const phoneInput = form.querySelector('input[name="phone"]');
        if (phoneInput.value) {
            const phoneRegex = /^[0-9+\-\(\)\s]*$/;
            if (!phoneRegex.test(phoneInput.value)) {
                phoneInput.setCustomValidity('Please use only numbers and these symbols: + - ( )');
                return;
            }
        }

        // Validation du message
        const messageInput = form.querySelector('textarea[name="message"]');
        if (!messageInput.value.trim()) {
            messageInput.setCustomValidity('Please enter your message');
            return;
        }

        // La validation du reCAPTCHA est gérée automatiquement par le formulaire
    });
});