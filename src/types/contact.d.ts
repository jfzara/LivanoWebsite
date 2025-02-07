declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
        grecaptchaCallback: () => void;
    }
}

interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    email: HTMLInputElement;
    company: HTMLInputElement;
    phone: HTMLInputElement;
    message: HTMLTextAreaElement;
}

interface ContactForm extends HTMLFormElement {
    elements: FormElements;
}

type MessageType = 'error' | 'success';

export {};