document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const messageTextarea = form.querySelector('textarea[name="message"]');
    const messageLengthDiv = form.querySelector('.message-length');
    let turnstileWidget = null;
    let resetTimeout = null;
    let shouldReset = false;
    let successTextTimeout = null;

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

    // Gestion de la soumission du formulaire - UN SEUL événement submit
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validation du Turnstile en premier
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
            return false;
        }

        // Validation des autres champs
        const nameInput = form.querySelector('input[name="name"]');
        if (nameInput.value.length < 2) {
            nameInput.setCustomValidity('Please enter your full name (minimum 2 letters)');
            nameInput.reportValidity();
            return;
        }

        const emailInput = form.querySelector('input[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.setCustomValidity('Please enter a valid email address');
            emailInput.reportValidity();
            return;
        }

        const messageInput = form.querySelector('textarea[name="message"]');
        if (!messageInput.value.trim()) {
            messageInput.setCustomValidity('Please enter your message');
            messageInput.reportValidity();
            return;
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
            shouldReset = true;
            
            // Réinitialisation après 3 secondes
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

    // Autres fonctions de support
    function showSuccessMessage() {
        const oldSuccess = form.querySelector('.success-message');
        if (oldSuccess) {
            oldSuccess.remove();
        }

        const successDiv = document.createElement('div');
        successDiv.className = 'mb-[1.3rem] flex justify-center success-message animate-fadeIn';
        successDiv.setAttribute('role', 'alert');
        successDiv.innerHTML = `
            <div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-blue-50/80 dark:bg-blue-900/20 border border-blue-500/30 success-container">
                <span class="text-blue-600 dark:text-blue-400 font-medium success-text">Sent</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
        `;

        form.insertBefore(successDiv, form.firstChild);

        // Animation de clignotement avant la disparition
        setTimeout(() => {
            const container = successDiv.querySelector('.success-container');
            container.classList.add('animate-flicker');
        }, 2700);

        setTimeout(() => {
            successDiv.classList.add('animate-fadeOut');
            setTimeout(() => successDiv.remove(), 300);
        }, 3000);
    }

    function resetForm() {
        form.reset();
        if (window.turnstile) {
            window.turnstile.reset();
        }
        updateMessageLength();
        const errorMessages = form.querySelectorAll('.turnstile-error');
        errorMessages.forEach(msg => msg.remove());
        shouldReset = false;
    }

    // Réinitialisation sur interaction utilisateur
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', () => {
            if (shouldReset) {
                resetForm();
            }
        });
    });
});