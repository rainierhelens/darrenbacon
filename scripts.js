document.addEventListener('DOMContentLoaded', () => {
    // Mobile nav (if you add it later)
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });
    }

    // Art Direction Samples (art-direction-samples.html)
    if (document.getElementById('art-direction-gallery')) {
        loadHaloInfiniteImages();
        setActiveButton('art-direction-samples', document.querySelector('button[data-type="HALO-INFINITE"]'));
    }

    // Hash version
    if (window.location.hash) {
        loadGallery(window.location.hash.substring(1));
    }
    // Or, for query string version:
    // const params = new URLSearchParams(window.location.search);
    // if (params.has('gallery')) loadGallery(params.get('gallery'));
});

// --- GALLERY DATA ---
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
        'images/deadrop/maker_art_style_guide_3k.jpg',
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
        
        // Add more image paths here
    ]
};

let currentGallery = [];
let currentIndex = 0;

// --- GALLERY FUNCTIONS ---
function setActiveGalleryTab(button) {
    document.querySelectorAll('.gallery-tabs button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

function loadGallery(name) {
    const galleryContainer = document.getElementById('concept-gallery');
    if (!galleryContainer) return;

    galleryContainer.innerHTML = '';
    currentGallery = galleries[name] || [];
    currentGallery.forEach((imgSrc, index) => {
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('gallery-item');
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        imgElement.alt = `${name} concept art`;
        imgElement.loading = 'lazy';
        imgElement.onclick = () => openLightbox(index);
        imgWrapper.appendChild(imgElement);
        galleryContainer.appendChild(imgWrapper);
    });

    // Set active tab
    const activeBtn = document.querySelector(`.gallery-tabs button[data-type="${name}"]`);
    if (activeBtn) setActiveGalleryTab(activeBtn);

    window.location.hash = name; // This updates the URL hash

    const url = new URL(window.location);
    url.searchParams.set('gallery', name);
    window.history.replaceState({}, '', url);
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    currentIndex = index;
    lightboxImg.src = currentGallery[currentIndex];
    lightbox.classList.add('open');
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
}
function navigateLightbox(direction) {
    if (!currentGallery.length) return;
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = currentGallery.length - 1;
    else if (currentIndex >= currentGallery.length) currentIndex = 0;
    const lightboxImage = document.getElementById('lightbox-image');
    if (lightboxImage) lightboxImage.src = currentGallery[currentIndex];
}

// --- LIGHTBOX EVENTS ---
document.addEventListener('keydown', (event) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('open')) {
        if (event.key === 'ArrowLeft') navigateLightbox(-1);
        else if (event.key === 'ArrowRight') navigateLightbox(1);
        else if (event.key === 'Escape') closeLightbox();
    }
});
document.addEventListener('click', (event) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && event.target === lightbox) closeLightbox();
});

// --- GALLERY AUTO-LOAD ON concept.html ---
document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('concept-gallery');
    if (galleryContainer) {
        const params = new URLSearchParams(window.location.search);
        const gallery = params.get('gallery');
        if (gallery) {
            loadGallery(gallery);
        }
    }
});

// --- ROTATING SOCIAL LINKS ---
document.addEventListener('DOMContentLoaded', function() {
    const links = [
        { url: "https://www.instagram.com/artofbacon/", label: "INSTAGRAM [↗]" },
        { url: "https://x.com/artofbacon", label: "X [↗]" },
        { url: "https://www.youtube.com/conceptdepartment", label: "YOUTUBE [↗]" },
        { url: "https://www.linkedin.com/in/darrenbacon/", label: "LINKEDIN [↗]" },
        { url: "https://www.artstation.com/darrenbacon", label: "ARTSTATION [↗]" }
    ];
    let idx = 0;
    const btn = document.getElementById('rotating-btn');
    if (btn) {
        setInterval(() => {
            idx = (idx + 1) % links.length;
            btn.href = links[idx].url;
            btn.textContent = links[idx].label;
        }, 3000);
    }
});

// --- HAMBURGER MENU ---
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-btn');
    const nav = document.getElementById('main-nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('open');
        });
    }
});

// --- LIGHTBOX CLOSE ON OVERLAY CLICK ---
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (
                e.target === lightbox ||
                e.target.classList.contains('lightbox')
            ) {
                closeLightbox();
            }
        });
        if (lightboxImage) {
            lightboxImage.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
});

// --- OPTIONAL: BACK TO TOP BUTTON ---
window.onscroll = function() {
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    }
};
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", function() {
  const submenuButtons = document.querySelectorAll(".menu-button");

  submenuButtons.forEach(button => {
    button.addEventListener("click", function() {
      const parentLi = this.parentElement;
      
      // Close other open submenus on desktop
      if (window.innerWidth >= 768) {
        document.querySelectorAll(".has-submenu").forEach(li => {
          if (li !== parentLi) li.classList.remove("open");
        });
      }

      parentLi.classList.toggle("open");
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const submenuButtons = document.querySelectorAll(".menu-button");

  submenuButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      if (window.innerWidth < 768) {
        // Only toggle on mobile
        e.preventDefault();
        const parentLi = this.parentElement;
        parentLi.classList.toggle("open");
      }
    });
  });
});

