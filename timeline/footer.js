//Footer Modal
const contactLink = document.getElementById('contact-link');
const privacyLink = document.getElementById('privacy-link');
const termsLink = document.getElementById('terms-link');

const contactModal = document.getElementById('contact-modal');
const privacyModal = document.getElementById('privacy-modal');
const termsModal = document.getElementById('terms-modal');

const contactCloseButton = document.querySelector('.contact-close-button');
const privacyCloseButton = document.querySelector('.privacy-close-button');
const termsCloseButton = document.querySelector('.terms-close-button');

function openModal(modal) {
    modal.style.display = 'block';
}
function closeModal(modal) {
    modal.style.display = 'none';
}
contactLink.addEventListener('click', (event) => {
    event.preventDefault();
    openModal(contactModal);
});

privacyLink.addEventListener('click', (event) => {
    event.preventDefault();
    openModal(privacyModal);
});

termsLink.addEventListener('click', (event) => {
    event.preventDefault();
    openModal(termsModal);
});

contactCloseButton.addEventListener('click', () => {
    closeModal(contactModal);
});

privacyCloseButton.addEventListener('click', () => {
    closeModal(privacyModal);
});

termsCloseButton.addEventListener('click', () => {
    closeModal(termsModal);
});

window.addEventListener('click', (event) => {
    if (event.target == contactModal) {
        closeModal(contactModal);
    }
    if (event.target == privacyModal) {
        closeModal(privacyModal);
    }
    if (event.target == termsModal) {
        closeModal(termsModal);
    }
});