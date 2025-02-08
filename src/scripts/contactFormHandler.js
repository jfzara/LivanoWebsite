// Gestionnaire de formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const messageTextarea = form.querySelector('textarea[name="message"]');
    const messageLengthDiv = form.querySelector('.message-length');
    let turnstileWidget = null;
    let resetTimeout = null;
    let shouldReset = false;
    let successTextTimeout = null;

    // Configuration du widget Turnstile
    window.onloadTurnstileCallback = function() {
        turnstileWidget = turnstile.render('.cf-turnstile', {
            sitekey: document.querySelector('.cf-turnstile').dataset.sitekey,
            theme: 'light',
            appearance: 'checkbox',
            'refresh-expired': 'manual',
            'retry-interval': 'never',
            size: 'normal',
            'response-field': true,
            'response-field-name': 'cf-turnstile-response',
            callback: function(token) {
                const errorMessage = form.querySelector('.turnstile-error');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    };

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

    // Fonction pour afficher le message de succès
    function showSuccessMessage() {
        // Supprimer l'ancien message de succès s'il existe
        const oldSuccess = form.querySelector('.success-message');
        if (oldSuccess) {
            oldSuccess.remove();
        }

        const successDiv = document.createElement('div');
        successDiv.className = 'mb-[1.3rem] flex justify-center success-message';
        successDiv.setAttribute('role', 'alert');
        successDiv.innerHTML = `
            <div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs success-container">
                <span class="text-primary dark:text-blue-400 font-medium success-text"></span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-primary dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
        `;

        // Ajouter le style pour l'animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes success-flash {
                0%, 100% {
                    background-color: rgba(29, 78, 216, 0.1);
                    border-color: rgb(29, 78, 216);
                }
                50% {
                    background-color: rgba(29, 78, 216, 0.2);
                    border-color: rgba(29, 78, 216, 0.8);
                }
            }

            .success-container {
                animation: success-flash 0.6s ease-in-out 3;
                border: 1.5px solid;
                background-color: rgba(29, 78, 216, 0.1);
                border-color: rgb(29, 78, 216);
            }

            @media (prefers-color-scheme: dark) {
                .success-container {
                    background-color: rgba(96, 165, 250, 0.2);
                    border-color: rgb(96, 165, 250);
                }

                @keyframes success-flash {
                    0%, 100% {
                        background-color: rgba(96, 165, 250, 0.2);
                        border-color: rgb(96, 165, 250);
                    }
                    50% {
                        background-color: rgba(96, 165, 250, 0.3);
                        border-color: rgba(96, 165, 250, 0.8);
                    }
                }
            }
        `;

        document.head.appendChild(style);
        form.insertBefore(successDiv, form.firstChild);

        // Afficher le texte "Sent" pendant 2 secondes
        const successText = successDiv.querySelector('.success-text');
        successText.textContent = 'Sent';
        
        successTextTimeout = setTimeout(() => {
            if (successText) {
                successText.textContent = '';
            }
        }, 2000);

        // Supprimer le message et le style après 3 secondes
        setTimeout(() => {
            successDiv.remove();
            style.remove();
        }, 3000);
    }

    // Fonction pour réinitialiser complètement le formulaire
    function resetForm() {
        form.reset();
        if (turnstileWidget) {
            turnstile.reset(turnstileWidget);
        }
        updateMessageLength();
        const errorMessages = form.querySelectorAll('.turnstile-error');
        errorMessages.forEach(msg => msg.remove());
        shouldReset = false;
        
        // Nettoyer les timeouts
        if (successTextTimeout) {
            clearTimeout(successTextTimeout);
        }
    }

    // Gestionnaire d'événements pour les interactions utilisateur
    function handleUserInteraction() {
        if (shouldReset) {
            resetForm();
        }
    }

    // Ajouter les écouteurs d'événements pour la réinitialisation par clic
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', handleUserInteraction);
        input.addEventListener('click', handleUserInteraction);
    });

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Réinitialisation des messages d'erreur personnalisés
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.setCustomValidity('');
        });

        // Validation personnalisée du nom
        const nameInput = form.querySelector('input[name="name"]');
        if (nameInput.value.length < 2) {
            nameInput.setCustomValidity('Please enter your full name (minimum 2 letters)');
            nameInput.reportValidity();
            return;
        }

        // Validation personnalisée de l'email
        const emailInput = form.querySelector('input[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.setCustomValidity('Please enter a valid email address');
            emailInput.reportValidity();
            return;
        }

        // Validation personnalisée du numéro de téléphone
        const phoneInput = form.querySelector('input[name="phone"]');
        if (phoneInput.value) {
            const phoneRegex = /^[0-9+\-\(\)\s]*$/;
            if (!phoneRegex.test(phoneInput.value)) {
                phoneInput.setCustomValidity('Please use only numbers and these symbols: + - ( )');
                phoneInput.reportValidity();
                return;
            }
        }

        // Validation du message
        const messageInput = form.querySelector('textarea[name="message"]');
        if (!messageInput.value.trim()) {
            messageInput.setCustomValidity('Please enter your message');
            messageInput.reportValidity();
            return;
        }

        // Validation stricte du Turnstile
        const turnstileResponse = form.querySelector('[name="cf-turnstile-response"]');
        if (!turnstileResponse || !turnstileResponse.value) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'text-red-500 text-sm mt-2 text-center turnstile-error';
            errorDiv.textContent = 'Please complete the security verification';
            
            const oldError = form.querySelector('.turnstile-error');
            if (oldError) {
                oldError.remove();
            }
            
            const turnstileWidget = form.querySelector('.cf-turnstile');
            turnstileWidget.parentNode.insertBefore(errorDiv, turnstileWidget.nextSibling);
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return; // Arrête la soumission du formulaire
        }

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Error sending the form');
            }
            
            showSuccessMessage();
            
            // Forcer la réinitialisation immédiate du widget Turnstile
            if (turnstileWidget) {
                turnstile.reset(turnstileWidget);
            }
            
            // Activer le flag de réinitialisation
            shouldReset = true;
            
            // Planifier la réinitialisation automatique après 3 secondes
            resetTimeout = setTimeout(() => {
                if (shouldReset) {
                    resetForm();
                }
            }, 3000);
            
        } catch (error) {
            console.error('Error:', error);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'text-red-500 text-sm mt-2 text-center';
            errorDiv.textContent = 'An error occurred while sending the message';
            form.insertBefore(errorDiv, form.firstChild);
            setTimeout(() => errorDiv.remove(), 3000);
        }
    });
});