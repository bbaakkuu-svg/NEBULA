// ============================================================
// VISOR DE GALERÍA DINÁMICO (DOM y Eventos - UT4)
// ============================================================

const mainImage = document.querySelector('#main-image');
const mainCaption = document.querySelector('#main-caption');
const thumbnails = document.querySelectorAll('.thumb-item');

thumbnails.forEach(thumb => {
    const cambiarImagen = () => {
        const img = thumb.querySelector('img');
        const caption = thumb.querySelector('figcaption');

        // Transición suave: desvanecer imagen (fade-out)
        mainImage.classList.add('fade');

        setTimeout(() => {
            mainImage.src = img.src;
            mainImage.alt = img.alt;
            if (caption) mainCaption.innerHTML = caption.innerHTML;

            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            // Mostrar nueva imagen (fade-in)
            mainImage.classList.remove('fade');
        }, 200);
    };

    // Evento clic y accesibilidad por teclado (Enter / Espacio)
    thumb.addEventListener('click', cambiarImagen);
    thumb.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            cambiarImagen();
        }
    });
});
