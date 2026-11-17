// ============================================================
// INTERACTIVIDAD Y MULTIMEDIA — NÉBULA
// ============================================================

// 1. Visor de Galería Dinámico
const mainImage = document.querySelector('#main-image');
const mainCaption = document.querySelector('#main-caption');
const thumbnails = document.querySelectorAll('.thumb-item');

if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach(thumb => {
        const cambiarImagen = () => {
            const img = thumb.querySelector('img');
            const caption = thumb.querySelector('figcaption');

            mainImage.classList.add('fade');
            setTimeout(() => {
                mainImage.src = img.src;
                mainImage.alt = img.alt;
                if (caption) mainCaption.innerHTML = caption.innerHTML;

                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                mainImage.classList.remove('fade');
            }, 200);
        };

        thumb.addEventListener('click', cambiarImagen);
        thumb.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                cambiarImagen();
            }
        });
    });
}

// 2. Modal de Vídeo
const videoModal = document.querySelector('#video-modal');
const openModalBtn = document.querySelector('#open-modal-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const modalVideo = document.querySelector('#modal-video');
const modalBackdrop = document.querySelector('.modal-backdrop');

if (openModalBtn && videoModal && modalVideo) {
    const abrirModal = () => {
        videoModal.hidden = false;
        modalVideo.play();
    };

    const cerrarModal = () => {
        modalVideo.pause();
        videoModal.hidden = true;
    };

    openModalBtn.addEventListener('click', abrirModal);
    closeModalBtn.addEventListener('click', cerrarModal);
    modalBackdrop.addEventListener('click', cerrarModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !videoModal.hidden) {
            cerrarModal();
        }
    });
}

// 3. Reproductor de Audio Personalizado
const ambientAudio = document.querySelector('#ambient-audio');
const audioToggleBtn = document.querySelector('#audio-toggle-btn');
const audioBtnIcon = document.querySelector('#audio-btn-icon');
const audioBtnText = document.querySelector('#audio-btn-text');

if (ambientAudio && audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
        if (ambientAudio.paused) {
            ambientAudio.play();
            audioBtnIcon.innerHTML = '&#10074;&#10074;';
            audioBtnText.textContent = 'Pausar ambiente espacial';
        } else {
            ambientAudio.pause();
            audioBtnIcon.innerHTML = '&#9658;';
            audioBtnText.textContent = 'Escuchar ambiente espacial';
        }
    });

    ambientAudio.addEventListener('ended', () => {
        audioBtnIcon.innerHTML = '&#9658;';
        audioBtnText.textContent = 'Escuchar ambiente espacial';
    });
}
