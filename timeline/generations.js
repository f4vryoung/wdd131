import { generationsData } from './ancestor-data.js';


const ancestorModal = document.getElementById('ancestor-modal');
const closeModalButton = document.querySelector('.close-button');
const documentModal = document.getElementById('document-modal');
const closeDocumentButton = document.querySelector('.close-document-button');

const ancestorNameEl = document.getElementById('ancestor-name');
const bioTextEl = document.getElementById('bio-text');
const profilePhotoEl = document.getElementById('profile-photo');
const noPhotoMessageEl = document.getElementById('no-photo-message');
const lifespanBirthDateEl = document.getElementById('lifespan-birth-date');
const lifespanDeathDateEl = document.getElementById('lifespan-death-date');
const factBirthDateEl = document.getElementById('fact-birth-date');
const factDeathDateEl = document.getElementById('fact-death-date');
const factResidenceLi = document.getElementById('fact-residence');
const residenceLocationEl = document.getElementById('residence-location');
const marriageListEl = document.getElementById('marriage-list');
const noMarriageMessageEl = document.getElementById('no-marriage-message');
const childrenListEl = document.getElementById('children-list');
const noChildrenMessageEl = document.getElementById('no-children-message');
const timelineWrapperEl = document.querySelector('.timeline-wrapper');
const noTimelineMessageEl = document.getElementById('no-timeline-message');
const sourcesListEl = document.getElementById('sources-list');
const noSourcesMessageEl = document.getElementById('no-sources-message');
const documentImageEl = document.getElementById('document-image');

function populateModal(ancestor) {
    marriageListEl.innerHTML = ''; 
    childrenListEl.innerHTML = '';
    timelineWrapperEl.innerHTML = '';
    sourcesListEl.innerHTML = '';

    noPhotoMessageEl.style.display = 'none';
    noMarriageMessageEl.style.display = 'none';
    noChildrenMessageEl.style.display = 'none';
    noTimelineMessageEl.style.display = 'none';
    noSourcesMessageEl.style.display = 'none';

    ancestorNameEl.textContent = ancestor.name;
    bioTextEl.textContent = ancestor.bio;
    
    if (ancestor.imageUrl) {
        profilePhotoEl.src = ancestor.imageUrl;
        profilePhotoEl.style.display = 'block';
    } else {
        profilePhotoEl.style.display = 'none';
        noPhotoMessageEl.style.display = 'block';
    }

    lifespanBirthDateEl.textContent = ancestor.birthDate;
    lifespanDeathDateEl.textContent = ancestor.deathDate;
    factBirthDateEl.textContent = ancestor.birthDate;
    factDeathDateEl.textContent = ancestor.deathDate;

    if (ancestor.spouse && ancestor.spouse.length > 0) {
        ancestor.spouse.forEach(spouse => {
            const listItem = document.createElement('li');
            listItem.textContent = `${spouse.name} (m. ${spouse.marriageYear})`;
            marriageListEl.appendChild(listItem);
        });
        marriageListEl.style.display = 'block';
    } else {
        marriageListEl.style.display = "none";
        noMarriageMessageEl.style.display = 'block';
    }

    if (ancestor.residence) {
        residenceLocationEl.textContent = ancestor.residence;
        factResidenceLi.style.display = 'list-item';
    } else {
        factResidenceLi.style.display = 'none';
    }
    
    if (ancestor.children && ancestor.children.length > 0) {
        ancestor.children.forEach(child => {
            const listItem = document.createElement('li');
            listItem.textContent = `${child.name} (b. ${child.birthYear})`;
            childrenListEl.appendChild(listItem);
        });
        childrenListEl.style.display = 'block';
    } else {
        childrenListEl.style.display = 'none';
        noChildrenMessageEl.style.display = 'block';
    }

    if (ancestor.timeline && ancestor.timeline.length > 0) {
        ancestor.timeline.forEach(event => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.innerHTML = `<span class="timeline-year">${event.year}:</span> ${event.event}`;
            timelineWrapperEl.appendChild(timelineItem);
        });
        timelineWrapperEl.style.display = 'block';
    } else {
        timelineWrapperEl.style.display = 'none'; 
        noTimelineMessageEl.style.display = 'block';
    }

    if (ancestor.sources && ancestor.sources.length > 0) {
        ancestor.sources.forEach(source => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = "#";
            
            link.addEventListener('click', (event) => {
                event.preventDefault();
                documentImageEl.src = source.imageUrl;
                documentModal.style.display = 'block';
            });

            const imgIcon = document.createElement('img');
            imgIcon.src = 'images/document-icon.png';
            imgIcon.alt = 'View Source Document';
            
            
            link.appendChild(imgIcon);
            link.appendChild(document.createTextNode(source.title));
            
            listItem.appendChild(link);
            sourcesListEl.appendChild(listItem);
        });
        sourcesListEl.style.display = 'block';
    } else {
        sourcesListEl.style.display = 'none';
        noSourcesMessageEl.style.display = 'block';
    }
}

function createAncestorCards(data) {
    for (const generationId in data) {
        const container = document.getElementById(generationId);
        if (container) {
            data[generationId].forEach(ancestor => {
                const card = document.createElement('div');
                card.className = 'ancestor-card';
                card.style.cursor = 'pointer';
                
                card.addEventListener('click', () => {
                    populateModal(ancestor);
                    ancestorModal.style.display = 'block';
                });

                const img = document.createElement('img');
                img.src = ancestor.imageUrl;
                img.alt = `Profile photo of ${ancestor.name}`;
                card.appendChild(img);

                const nameHeading = document.createElement('h3');
                nameHeading.textContent = ancestor.name;
                card.appendChild(nameHeading);

                const lifespanPara = document.createElement('p');
                lifespanPara.textContent = ancestor.lifespan;
                card.appendChild(lifespanPara);
                
                container.appendChild(card);
            });
        }
    }
}

closeModalButton.addEventListener('click', () => {
    ancestorModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == ancestorModal) {
        ancestorModal.style.display = 'none';
    }
});

closeDocumentButton.addEventListener('click', () => {
    documentModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == documentModal) {
        documentModal.style.display = 'none';
    }
});


document.addEventListener('DOMContentLoaded', () => {
    createAncestorCards(generationsData);
});