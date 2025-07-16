document.addEventListener('DOMContentLoaded', function() {
    console.log('main.js loaded and DOMContentLoaded fired.'); // Debugging step 1

    const sampleTaleButton = document.querySelector('.cta-button');

    if (sampleTaleButton) {
        console.log('Button with class .cta-button found:', sampleTaleButton); // Debugging step 2

        sampleTaleButton.addEventListener('click', function() {
            console.log('Button CLICKED!');
            window.location.href = 'generations.html';
        });
    } else {
        console.error('Error: Button with class .cta-button NOT found in the DOM.'); // Debugging step 4
    }
});