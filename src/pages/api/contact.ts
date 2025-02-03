import { Resend } from 'resend';
import type { APIRoute } from 'astro';

interface ResendEmailResponse {
    data: {
        id: string;
    } | null;
    error: {
        message: string;
        name: string;
    } | null;
}

export const onRequestPost: APIRoute = async ({ request }) => {
    if (!import.meta.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY non définie');
        return new Response(JSON.stringify({ 
            error: 'Configuration du serveur email manquante' 
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const data = await request.formData();
        const name = data.get('name')?.toString().trim() || '';
        const email = data.get('email')?.toString().trim() || '';
        const company = data.get('company')?.toString().trim() || '';
        const phone = data.get('phone')?.toString().trim() || '';
        const message = data.get('message')?.toString().trim() || '';

        // Validation des champs requis
        if (!name || !email || !company || !message) {
            return new Response(JSON.stringify({ 
                error: 'Veuillez remplir tous les champs obligatoires' 
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validation du format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ 
                error: 'Format d\'email invalide' 
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const resend = new Resend(import.meta.env.RESEND_API_KEY);

        const response: ResendEmailResponse = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'livano@livanoagency.com',
            subject: `Nouveau contact de ${name} - ${company}`,
            html: `
                <h2>Nouveau message de contact</h2>
                <p><strong>Nom:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Entreprise:</strong> ${company}</p>
                ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ''}
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
            replyTo: email
        });

        if (response.error) {
            console.error('Erreur Resend:', response.error);
            return new Response(JSON.stringify({ 
                error: 'Erreur lors de l\'envoi de l\'email',
                details: response.error.message 
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ 
            success: true,
            message: 'Message envoyé avec succès !',
            id: response.data?.id
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Erreur:', error);
        return new Response(JSON.stringify({ 
            error: 'Une erreur est survenue lors du traitement de votre demande',
            details: error instanceof Error ? error.message : 'Erreur inconnue'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};