document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });

    // Automatically load the "HALO" gallery
    switchGallery('concept-samples');
    loadGallery('HALO');
    setActiveButton('concept-samples', 'HALO');
});

const galleries = {
    'HALO': [
        'images/halo/halo1.jpg',
        'images/halo/halo2.jpg',
        'images/halo/halo3.jpg',
        'images/halo/halo4.jpg',
        'images/halo/halo5.jpg',
        'images/halo/halo6.jpg',
        'images/halo/halo7.jpg',
        'images/halo/halo8.jpg',
        'images/halo/halo9.jpg',
        'images/halo/halo10.jpg',
        'images/halo/halo11.jpg',
        'images/halo/halo12.jpg',
        'images/halo/halo13.jpg',
        'images/halo/halo14.jpg',
        'images/halo/halo15.jpg',
        'images/halo/halo16.jpg',
        'images/halo/halo17.jpg',
        'images/halo/halo18.jpg',
        'images/halo/halo19.jpg',
        'images/halo/halo20.jpg',
        'images/halo/halo21.jpg',
        'images/halo/halo22.jpg',
        'images/halo/halo26.jpg',
        'images/halo/halo27.jpg',
        'images/halo/halo28.jpg',
        'images/halo/halo29.jpg',
        'images/halo/halo30.jpg',
        'images/halo/halo31.jpg',
        'images/halo/halo32.jpg',
        'images/halo/halo33.jpg',
        'images/halo/halo34.jpg',
        'images/halo/halo35.jpg',
        'images/halo/halo36.jpg',
        'images/halo/halo37.jpg',
        'images/halo/halo39.jpg',
        'images/halo/halo40.jpg',
        'images/halo/halo41.jpg',
        'images/halo/halo42.jpg',
        'images/halo/halo43.jpg',
        'images/halo/halo44.jpg',
        'images/halo/halo45.jpg',    
        // Add more image paths here
    ],
    'DEADROP': [
        'images/deadrop/deadrop1.jpg',
        'images/deadrop/deadrop2.jpg',
        'images/deadrop/deadrop3.jpg',
        'images/deadrop/deadrop4.jpg',
        'images/deadrop/deadrop5.jpg',
        'images/deadrop/deadrop6.jpg',
        'images/deadrop/deadrop7.jpg',
        'images/deadrop/deadrop8.gif',
        'images/deadrop/deadrop9.jpg',
        'images/deadrop/deadrop10.jpg',
        'images/deadrop/deadrop11.jpg',
        'images/deadrop/deadrop12.gif',
        'images/deadrop/deadrop13.jpg',
        'images/deadrop/deadrop14.jpg',
        'images/deadrop/deadrop15.jpg',
        'images/deadrop/deadrop16.jpg',
        'images/deadrop/deadrop17.jpg',
        'images/deadrop/deadrop18.jpg',
        'images/deadrop/deadrop19.jpg',
        'images/deadrop/deadrop20.jpg',
        'images/deadrop/deadrop21.jpg',
        'images/deadrop/deadrop24.jpg',
        'images/deadrop/deadrop25.jpg',
        'images/deadrop/deadrop26.jpg',
        'images/deadrop/deadrop27.jpg',
        'images/deadrop/deadrop28.jpg',
        'images/deadrop/deadrop29.jpg',
        'images/deadrop/deadrop33.jpg',
        'images/deadrop/deadrop34.jpg',
        'images/deadrop/deadrop35.jpg',
        'images/deadrop/deadrop36.jpg',
        'images/deadrop/deadrop37.gif',
        'images/deadrop/deadrop38.gif',
        'images/deadrop/deadrop39.gif',
        'images/deadrop/deadrop40.jpg',
        'images/deadrop/deadrop41.gif',
        'images/deadrop/deadrop42.jpg',
        'images/deadrop/deadrop43.jpg',
        'images/deadrop/deadrop44.jpg',
        'images/deadrop/deadrop45.jpg',
        'images/deadrop/deadrop46.jpg',
        'images/deadrop/deadrop47.jpg',
        'images/deadrop/deadrop48.jpg',
        'images/deadrop/maker_art_style_guide_3k.jpg'
',
        // Add more image paths here
    ],
    'DESTINY': [
        'images/destiny/destiny1.jpg',
        'images/destiny/destiny2.jpg',
        'images/destiny/destiny3.jpg',
        'images/destiny/destiny4.jpg',
        'images/destiny/destiny5.jpg',
        'images/destiny/destiny6.jpg',
        'images/destiny/destiny7.jpg',
        'images/destiny/destiny8.jpg',
        'images/destiny/destiny9.jpg',
        'images/destiny/destiny10.jpg',
        'images/destiny/destiny11.jpg',
        'images/destiny/destiny12.jpg',
        'images/destiny/destiny13.jpg',
        'images/destiny/destiny14.jpg',
        'images/destiny/destiny15.jpg',
        'images/destiny/destiny16.jpg',
        'images/destiny/destiny17.jpg',
        'images/destiny/destiny18.jpg',
        'images/destiny/destiny19.jpg',
        'images/destiny/destiny20.jpg',
        'images/destiny/destiny21.jpg',
        'images/destiny/destiny22.jpg',
        'images/destiny/destiny23.jpg',
        'images/destiny/destiny24.jpg',
        'images/destiny/destiny25.jpg',
        'images/destiny/destiny26.jpg',
        'images/destiny/destiny27.jpg',
        'images/destiny/destiny28.jpg',
        'images/destiny/destiny29.jpg',
        'images/destiny/destiny30.jpg',
        'images/destiny/tumblr_nc8hm9ajhz1rqvckio6_1280.jpg',
        'images/destiny/tumblr_p2gd6iTRSc1rqvckio1_1280.jpg',

        // Add more image paths here
    ],
    'DISNEY': [
        'images/disney/SW_001i.jpg',
        'images/disney/SW_001g.jpg',
        'images/disney/SW_001b.jpg',
        'images/disney/FILE58893.jpg',
        'images/disney/FILE58892.jpg',
        'images/disney/FILE58876.jpg',
        'images/disney/FILE58880.jpg',
        'images/disney/FILE58885.jpg',
        'images/disney/FILE58887.jpg',
        'images/disney/FILE58889.jpg',
        'images/disney/FILE58890.jpg',
        'images/disney/TU_tron_sc125_panel3_v2b_render.jpg',
        'images/disney/TU_argon_sq_fromABV_v3a.jpg',
        'images/disney/TU_110712-sc323_paint_v1b.jpg',
        'images/disney/TU_recognizer_BAY_paint_2a.jpg',
        'images/disney/TU_dysons_ship_paintV1b.jpg',
        'images/disney/TU_tron_bar_paint1a.jpg',
        'images/disney/TU_TRON_underCOLISEUM_v1c.jpg',
        'images/disney/TU_tron_vehicleBAY_v3b.jpg',
        'images/disney/TU_Recognizer_Back_Int_v4a.jpg',
        'images/disney/YS_yellowSUBover_1c.jpg',
        'images/disney/YS_2009_Sep15_00139_2_DB2h.jpg',
        'images/disney/YS_yellowSUB_v3e_2.jpg',
        'images/disney/YS_seaSnakeDB1f.jpg',
        'images/disney/YS_subInt_cam_06_v1.jpg',
        'images/disney/YS_trpRM5_13f_r1e.jpg',
        'images/disney/MNM_TWOC_keyboardDB_v3a.jpg',
        'images/disney/MNM_rocketship_AIRlock3d.jpg',
        'images/disney/MNM_rocket_int_drw7x.jpg',
        'images/disney/MNM_rocket_GEARbay_v1f.jpg',
        'images/disney/MNM_rocketBAYscene4e.jpg',
        'images/disney/MNM_rockedFULE_6aflat.jpg',
        'images/disney/MNM_mono_ckpit_intpanels01c.jpg',
        'images/disney/MNM_mars_city_concept10a.jpg',
        'images/disney/MNM_gribLAIR_line2b.jpg',
        'images/disney/MNM_angle3AO_db1b_closedb.jpg',
        'images/disney/MNM_airLOCKdesign1d.jpg',
        'images/disney/FILE58981.jpg',
        'images/disney/FILE58969.jpg',
        'images/disney/FILE58960.jpg',
        'images/disney/FILE58959.jpg',
        // Add more image paths here
    ],
    'OTHER': [
        'images/other/dbacon_BE_jamesbond_4k-2.jpg',
        'images/other/dbacon_BEM_mad_max-1E_onesheet4k.jpg',
        'images/other/unnamed.jpg',
        'images/other/Kovalai_Vector_Refinery.jpg',
        'images/other/rover_1_sketch.jpg',
        'images/other/space_soldier.jpg',
        'images/other/tumblr_ppiupnrqV51qeldhr_1280.jpg',
        'images/other/tumblr_phqbbfCIkK1rqvckio6_1280.jpg',
        'images/other/tumblr_phqbbfCIkK1rqvckio5_1280.jpg',
        'images/other/tumblr_phqbbfCIkK1rqvckio4_1280.png',
        'images/other/tumblr_phqbbfCIkK1rqvckio3_1280.jpg',
        'images/other/tumblr_phqbbfCIkK1rqvckio2_1280.jpg',
        'images/other/tumblr_pg31ymAguW1rqvckio3_1280.png',
        'images/other/tumblr_pg31ymAguW1rqvckio2_1280.jpg',
        'images/other/tumblr_pg31ymAguW1rqvckio1_1280.jpg',
        'images/other/tumblr_oqkhthIkGe1rqvckio1_1280.jpg',
        'images/other/tumblr_ol72kzhins1rqvckio1_1280.jpg',
        'images/other/tumblr_ojw22b2srD1rqvckio1_1280.jpg',
        'images/other/tumblr_oi8ohlz61a1rqvckio1_1280.jpg',
        'images/other/tumblr_oh8fulDsBH1rqvckio1_1280.jpg',
        'images/other/tumblr_oer3eaMtPp1rqvckio1_1280.jpg',
        'images/other/tumblr_o7wchuENY51rqvckio1_1280.jpg',
        'images/other/tumblr_o9e6qtdMUT1rqvckio1_400.webp',
        'images/other/tumblr_o96p6sJm1x1rqvckio3_400.webp',
        'images/other/tumblr_o5fxmaFRTy1rqvckio1_1280.jpg',
        'images/other/tumblr_o03op1khMs1rqvckio1_1280.jpg',
        'images/other/tumblr_o2juektf2p1rqvckio1_1280.jpg',
        'images/other/tumblr_o0inwz4HTr1rqvckio1_1280.jpg',
        'images/other/tumblr_nm35a3jtgU1rqvckio1_1280.jpg',
        'images/other/tumblr_n202yxvnx91rqvckio2_1280.jpg',
        'images/other/tumblr_n202yxvnx91rqvckio1_1280.jpg',
        'images/other/RR_bedside_shot-overrender01a-3K.jpg',
        'images/other/RR_mWARDproj_sketches01-a-sm.jpg',
        'images/other/RR_mWARDproj_sketches02-c.jpg',
        'images/other/RR_reapers_05a.jpg',
        // Add more image paths here
    ]
};

let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
const canvas = document.getElementById('pdf-canvas');
const ctx = canvas.getContext('2d');
let currentGallery = [];
let currentIndex = 0;

const renderPage = (num) => {
    pageRendering = true;
    pdfDoc.getPage(num).then((page) => {
        const viewport = page.getViewport({ scale: 1 });
        const scale = Math.min(800 / viewport.height, 1);
        const scaledViewport = page.getViewport({ scale: scale });
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: scaledViewport
        };
        const renderTask = page.render(renderContext);

        renderTask.promise.then(() => {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });

    document.getElementById('page-num').textContent = num;
};

const queueRenderPage = (num) => {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
};

const onPrevPage = () => {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
};

const onNextPage = () => {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
};

document.getElementById('prev-page').addEventListener('click', onPrevPage);
document.getElementById('next-page').addEventListener('click', onNextPage);

const pdfPageNumbers = {};

const loadPDF = (pdfPath, button) => {
    const pdfViewer = document.getElementById('pdf-viewer');
    pdfViewer.style.display = 'flex'; // Ensure the viewer is displayed
    document.getElementById('halo-infinite-images').style.display = 'none'; // Hide Halo Infinite images
    document.getElementById('gameplay-videos').style.display = 'none'; // Hide Gameplay videos

    pdfjsLib.getDocument(pdfPath).promise.then((pdfDoc_) => {
        pdfDoc = pdfDoc_;
        document.getElementById('page-count').textContent = pdfDoc.numPages;

        if (!pdfPageNumbers[pdfPath]) {
            pdfPageNumbers[pdfPath] = 1;
        }
        pageNum = pdfPageNumbers[pdfPath];
        renderPage(pageNum);
    });

    setActiveButton('art-direction-samples', button);
};

const switchGallery = (type) => {
    // Hide all gallery sections
    document.querySelectorAll('.gallery-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected gallery section
    const selectedGallery = document.getElementById(`${type}-gallery`);
    if (selectedGallery) {
        selectedGallery.style.display = 'block';
    }

    // Clear the gallery content
    document.querySelectorAll('.gallery').forEach(gallery => {
        gallery.innerHTML = '';
    });

    // Set the active button
    setActiveButton(type, null);
};

const setActiveButton = (mainType, button) => {
    document.querySelectorAll('.gallery-tabs button').forEach(btn => {
        btn.classList.remove('active');
    });

    if (button) {
        button.classList.add('active');
    } else {
        const mainButton = document.querySelector(`.gallery-tabs button[data-type="${mainType}"]`);
        if (mainButton) {
            mainButton.classList.add('active');
        }
    }

    // Set the main tab active state
    if (mainType === 'concept-samples' || mainType === 'art-direction-samples') {
        document.querySelectorAll('.main-gallery-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        const mainTab = document.querySelector(`.main-gallery-tab[data-type="${mainType}"]`);
        if (mainTab) {
            mainTab.classList.add('active');
        }
    }
};

const loadGallery = (type) => {
    const galleryContainer = document.getElementById('concept-gallery');
    galleryContainer.innerHTML = ''; // Clear existing images

    currentGallery = galleries[type] || [];
    currentGallery.forEach((imgSrc, index) => {
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('gallery-item');
        
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        imgElement.alt = `${type} concept art`;
        imgElement.loading = 'lazy'; // Add lazy loading attribute
        imgElement.onclick = () => openLightbox(index);
        
        imgWrapper.appendChild(imgElement);
        galleryContainer.appendChild(imgWrapper);
    });

    setActiveButton('concept-samples', document.querySelector(`button[data-type="${type}"]`));
};

const loadArtDirectionGallery = (type) => {
    const galleryContainer = document.getElementById('art-direction-gallery');
    galleryContainer.innerHTML = ''; // Clear existing images

    currentGallery = galleries[type] || [];
    currentGallery.forEach((imgSrc, index) => {
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('gallery-item');
        
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        imgElement.alt = `${type} concept art`;
        imgElement.loading = 'lazy'; // Add lazy loading attribute
        imgElement.onclick = () => openLightbox(index);
        
        imgWrapper.appendChild(imgElement);
        galleryContainer.appendChild(imgWrapper);
    });

    setActiveButton('art-direction-samples', document.querySelector(`button[data-type="${type}"]`));
};

const loadHaloInfiniteImages = () => {
    const imageContainer = document.getElementById('halo-infinite-images');
    imageContainer.innerHTML = ''; // Clear existing images

    const images = [
        'images/ad-halo/halo-ad-1.jpg',
        'images/ad-halo/halo-ad-2.jpg',
        'images/ad-halo/halo-ad-3.jpg',
        'images/ad-halo/halo-ad-4.jpg',
        'images/ad-halo/halo-ad-5.jpg',
        'images/ad-halo/halo-ad-6.jpg',
        'images/ad-halo/halo-ad-7.jpg',
        'images/ad-halo/halo-ad-8.jpg',
        'images/ad-halo/halo-ad-9.jpg',
        'images/ad-halo/halo-ad-10.jpg',
        'images/ad-halo/frag1_BEFORE-AFTER.jpg',
        'images/ad-halo/frag2_BEFORE-AFTER.jpg',
        'images/ad-halo/interlock_visual_target_BEFORE-AFTER.jpg',
        'images/ad-halo/rockridge_vis_target_BEFORE-AFTER.jpg',
        'images/ad-halo/screenshot06-POc-4k-2-BEFORE-AFTER.jpg',
        'images/ad-halo/halo-ad-11.jpg',
        'images/ad-halo/halo-ad-12.jpg',
        'images/ad-halo/halo-ad-13.jpg',
        'images/ad-halo/halo-ad-14.jpg',
        'images/ad-halo/halo-ad-15.jpg',
        'images/ad-halo/halo-ad-16.jpg',
        'images/ad-halo/halo-ad-17.jpg',
        'images/ad-halo/halo-ad-18.jpg',
        'images/ad-halo/halo-ad-19.jpg',
        'images/ad-halo/halo-ad-20.jpg',
        'images/ad-halo/halo-ad-21.jpg',
        'images/ad-halo/halo-ad-22.jpg',
        'images/ad-halo/halo-ad-23.jpg',
        'images/ad-halo/halo-ad-24.jpg',
        'images/ad-halo/halo-ad-25.jpg',
        'images/ad-halo/halo-ad-26.jpg',

        // Add more image paths here
    ];

    currentGallery = images; // Update currentGallery with Halo Infinite images

    images.forEach((imgSrc, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        imgElement.alt = `Halo Infinite Image ${index + 1}`;
        imgElement.loading = 'lazy'; // Add lazy loading attribute
        imgElement.onclick = () => openLightbox(index);

        imageContainer.appendChild(imgElement);
    });

    imageContainer.style.display = 'flex'; // Ensure the container is displayed
    document.getElementById('pdf-viewer').style.display = 'none'; // Hide PDF viewer
    document.getElementById('gameplay-videos').style.display = 'none'; // Hide Gameplay videos
    setActiveButton('art-direction-samples', document.querySelector('button[data-type="HALO-INFINITE"]'));
};

const loadGameplay = () => {
    const gameplayContainer = document.getElementById('gameplay-videos');
    gameplayContainer.style.display = 'block'; // Show Gameplay videos
    document.getElementById('halo-infinite-images').style.display = 'none'; // Hide Halo Infinite images
    document.getElementById('pdf-viewer').style.display = 'none'; // Hide PDF viewer

    setActiveButton('art-direction-samples', document.querySelector('button[data-type="GAMEPLAY"]'));
};

const openLightbox = (index) => {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.src = currentGallery[currentIndex];
    lightbox.style.display = 'flex';
};

const closeLightbox = () => {
    document.getElementById('lightbox').style.display = 'none';
};

const navigateLightbox = (direction) => {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = currentGallery.length - 1;
    } else if (currentIndex >= currentGallery.length) {
        currentIndex = 0;
    }
    document.getElementById('lightbox-image').src = currentGallery[currentIndex];
};

document.addEventListener('keydown', (event) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'flex') {
        if (event.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (event.key === 'ArrowRight') {
            navigateLightbox(1);
        } else if (event.key === 'Escape') {
            closeLightbox();
        }
    }
});

document.addEventListener('click', (event) => {
    const lightbox = document.getElementById('lightbox');
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Show or hide the button based on scroll position
window.onscroll = function() {
    const backToTopButton = document.getElementById('backToTop');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
};

// Scroll to the top of the page when the button is clicked
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

