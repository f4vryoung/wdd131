//Menu Toggle
const menuButton = document.querySelector(".menu-button");
function toggleMenu() {
    const menu = document.querySelector(".navigation");
    menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);

function handleResize() {
    const menu = document.querySelector(".navigation");
    if (window.innerWidth > 1000) {
        menu.classList.remove("hide");
    } else {
        menu.classList.add("hide");
    }
}
// Handle Window Resize
handleResize(); 
window.addEventListener("resize", handleResize);

//Image Viewer Modal
const gallery = document.querySelector(".gallery");
function handleGalleryClick(event) {
    const clickedImage = event.target.closest('img');
    if (clickedImage) {
        const fullImagesrc = clickedImage.src.split('-')[0] + '-full.jpeg';
        const altText = clickedImage.alt;

        const dialog = document.createElement('dialog');
        dialog.id = 'imageModal';

        dialog.innerHTML = `
            <img src="${fullImagesrc}" alt="${altText}">
            <button class="close-viewer">X</button>
            `;
        document.body.appendChild(dialog);
        
        const closeButton = dialog.querySelector('.close-viewer');
        closeButton.addEventListener('click', () => {
            dialog.close();
            dialog.remove();
        });
        
         dialog.addEventListener('click', (event) => {
            if (event.target === dialog) {
                dialog.close();
                dialog.remove();
            }
        });

        dialog.showModal();
    }
}
gallery.addEventListener("click", handleGalleryClick);






