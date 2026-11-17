// ============================================================
// INTERACTIVIDAD Y MULTIMEDIA — NÉBULA
// ============================================================

const mainImage = document.querySelector('#main-image');
const mainCreditAuthor = document.querySelector('#main-credit-author');
const thumbnails = document.querySelectorAll('.thumb-item');

if (mainImage && mainCreditAuthor && thumbnails.length) {
    let galleryTimer;
    let pendingThumbnail = null;

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            if (thumb === pendingThumbnail) return;

            if (thumb.classList.contains('active')) {
                if (pendingThumbnail) {
                    window.clearTimeout(galleryTimer);
                    pendingThumbnail = null;
                    mainImage.classList.remove('fade');
                }
                return;
            }

            const image = thumb.querySelector('img');
            if (!image) return;

            window.clearTimeout(galleryTimer);
            pendingThumbnail = thumb;
            mainImage.classList.add('fade');

            galleryTimer = window.setTimeout(() => {
                mainImage.src = image.src;
                mainImage.alt = thumb.dataset.imageAlt;
                mainCreditAuthor.href = thumb.dataset.creditUrl;
                mainCreditAuthor.textContent = thumb.dataset.creditName;

                thumbnails.forEach(item => {
                    const isActive = item === thumb;
                    item.classList.toggle('active', isActive);
                    item.setAttribute('aria-pressed', String(isActive));
                });
                pendingThumbnail = null;
                mainImage.classList.remove('fade');
            }, 250);
        });
    });
}

const videoModal = document.querySelector('#video-modal');
const openModalBtn = document.querySelector('#open-modal-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const modalVideo = document.querySelector('#modal-video');
const modalBackdrop = document.querySelector('.modal-backdrop');
const videoStatus = document.querySelector('#video-status');

if (videoModal && openModalBtn && closeModalBtn && modalVideo && modalBackdrop && videoStatus) {
    const focusableElements = [closeModalBtn, modalVideo];

    const closeModal = () => {
        modalVideo.pause();
        videoModal.hidden = true;
        videoStatus.textContent = '';
        openModalBtn.focus();
    };

    openModalBtn.addEventListener('click', () => {
        videoModal.hidden = false;
        closeModalBtn.focus();
        videoStatus.textContent = '';
        modalVideo.play().catch(() => {
            if (!videoModal.hidden) {
                videoStatus.textContent = 'No se pudo iniciar el vídeo automáticamente. Usa los controles para reproducirlo.';
            }
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', event => {
        if (videoModal.hidden) return;

        if (event.key === 'Escape') {
            closeModal();
        } else if (event.key === 'Tab') {
            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });
}

const ambientAudio = document.querySelector('#ambient-audio');
const audioToggleBtn = document.querySelector('#audio-toggle-btn');
const audioBtnIcon = document.querySelector('#audio-btn-icon');
const audioBtnText = document.querySelector('#audio-btn-text');
const audioStatus = document.querySelector('#audio-status');

if (ambientAudio && audioToggleBtn && audioBtnIcon && audioBtnText && audioStatus) {
    let playRequestId = 0;

    const updateAudioButton = () => {
        const isPlaying = !ambientAudio.paused && !ambientAudio.ended;
        audioToggleBtn.setAttribute('aria-pressed', String(isPlaying));
        audioBtnIcon.textContent = isPlaying ? '\u275A\u275A' : '\u25B6';
        audioBtnText.textContent = isPlaying
            ? 'Pausar ambiente espacial'
            : 'Escuchar ambiente espacial';
    };

    audioToggleBtn.addEventListener('click', () => {
        audioStatus.textContent = '';

        if (ambientAudio.paused) {
            const requestId = ++playRequestId;
            ambientAudio.play().catch(() => {
                if (requestId !== playRequestId) return;
                audioStatus.textContent = 'No se pudo reproducir el audio. Comprueba el archivo o inténtalo de nuevo.';
                updateAudioButton();
            });
        } else {
            playRequestId++;
            ambientAudio.pause();
        }
    });

    ambientAudio.addEventListener('play', updateAudioButton);
    ambientAudio.addEventListener('pause', updateAudioButton);
    ambientAudio.addEventListener('ended', updateAudioButton);
}
