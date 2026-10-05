
document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       CONFIGURACIÓN DE FOTOS
    ===================================================== */

    const fotos = [

        {
            archivo: "images/foto1.JPG",
            titulo: "Los primeros recuerdos",
            descripcion:
                "El comienzo de una historia maravillosa."
        },

        {
            archivo: "images/foto2.JPG",
            titulo: "La familia",
            descripcion:
                "Los momentos que realmente importan."
        },

        {
            archivo: "images/foto3.JPG",
            titulo: "Momentos inolvidables",
            descripcion:
                "Recuerdos que permanecen para siempre."
        },

        {
            archivo: "images/foto4.JPG",
            titulo: "Una vida extraordinaria",
            descripcion:
                "70 años dejando huellas en nuestros corazones."
        },

        {
            archivo: "images/foto5.JPG",
            titulo: "La historia continúa",
            descripcion:
                "Porque todavía quedan muchos momentos por vivir."
        },
        {
            archivo: "images/foto6.JPG",
            titulo: "Eres Única mamita",
            descripcion:
                "Por ser un ejemplo de madre."
        },
        {
            archivo: "images/foto7.JPG",
            titulo: "Compadres presentes",
            descripcion:
                "Por ser un día especial para todos."
        }
        ,
        {
            archivo: "images/foto8.JPG",
            titulo: "La cantante de la familia",
            descripcion:
                "Por alegrar nuestro día."
        }
        ,
        {
            archivo: "images/foto9.JPG",
            titulo: "Mi viejita linda",
            descripcion:
                "icono de la cancion cangallina."
        }

    ];


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const heroSlideshow =
        document.getElementById(
            "hero-slideshow"
        );


    const gallery =
        document.getElementById(
            "memory-gallery"
        );


    const currentSlide =
        document.getElementById(
            "currentSlide"
        );


    const totalSlides =
        document.getElementById(
            "totalSlides"
        );


    const previousButton =
        document.getElementById(
            "previousButton"
        );


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    const pauseButton =
        document.getElementById(
            "pauseButton"
        );


    const startButton =
        document.getElementById(
            "startButton"
        );


    const musicButton =
        document.getElementById(
            "musicButton"
        );


    const music =
        document.getElementById(
            "backgroundMusic"
        );


    const confetti =
        document.getElementById(
            "confetti"
        );


    /* =====================================================
       VALIDAR FOTOS
    ===================================================== */

    totalSlides.textContent =
        fotos.length;


    /* =====================================================
       CREAR TIMELAPSE DE PORTADA
    ===================================================== */

    fotos.forEach((foto, index) => {

        const slide =
            document.createElement("div");


        slide.className =
            "hero-slide";


        if (index === 0) {

            slide.classList.add(
                "active"
            );

        }


        slide.style.backgroundImage =
            `url("${foto.archivo}")`;


        heroSlideshow.appendChild(
            slide
        );

    });


    const heroSlides =
        document.querySelectorAll(
            ".hero-slide"
        );


    /* =====================================================
       CREAR GALERÍA
    ===================================================== */

    fotos.forEach((foto, index) => {

        const slide =
            document.createElement("div");


        slide.className =
            "memory-slide";


        if (index === 0) {

            slide.classList.add(
                "active"
            );

        }


        slide.innerHTML = `

            <img
                src="${foto.archivo}"
                alt="${foto.titulo}"
                loading="${index === 0 ? "eager" : "lazy"}"
                onerror="this.parentElement.classList.add('image-error')"
            >

            <div class="memory-caption">

                <h3>
                    ${foto.titulo}
                </h3>

                <p>
                    ${foto.descripcion}
                </p>

            </div>

        `;


        gallery.appendChild(
            slide
        );

    });


    const memorySlides =
        document.querySelectorAll(
            ".memory-slide"
        );


    /* =====================================================
       ESTADO
    ===================================================== */

    let indice = 0;

    let reproduciendo = true;

    let intervalo;


    /* =====================================================
       CAMBIAR FOTO
    ===================================================== */

    function mostrarFoto(n) {

        indice =
            (n + fotos.length)
            % fotos.length;


        heroSlides.forEach(
            (slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === indice
                );

            }
        );


        memorySlides.forEach(
            (slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === indice
                );

            }
        );


        currentSlide.textContent =
            indice + 1;

    }


    /* =====================================================
       SIGUIENTE
    ===================================================== */

    function siguiente() {

        mostrarFoto(
            indice + 1
        );

    }


    /* =====================================================
       ANTERIOR
    ===================================================== */

    function anterior() {

        mostrarFoto(
            indice - 1
        );

    }


    /* =====================================================
       INICIAR TIMELAPSE
    ===================================================== */

    function iniciarTimelapse() {

        clearInterval(
            intervalo
        );


        intervalo =
            setInterval(() => {

                if (reproduciendo) {

                    siguiente();

                }

            }, 5000);

    }


    iniciarTimelapse();


    /* =====================================================
       BOTONES
    ===================================================== */

    nextButton.addEventListener(
        "click",
        () => {

            siguiente();

        }
    );


    previousButton.addEventListener(
        "click",
        () => {

            anterior();

        }
    );


    pauseButton.addEventListener(
        "click",
        () => {

            reproduciendo =
                !reproduciendo;


            pauseButton.textContent =
                reproduciendo
                    ? "❚❚"
                    : "▶";

        }
    );


    /* =====================================================
       BOTÓN COMENZAR
    ===================================================== */

    startButton.addEventListener(
        "click",
        () => {

            /*
             * Los navegadores permiten reproducir
             * música después de una interacción
             * del usuario.
             */

            music.volume =
                0.35;


            music.play()
                .then(() => {

                    musicButton.textContent =
                        "♫";

                })
                .catch(error => {

                    console.log(
                        "No se pudo iniciar la música:",
                        error
                    );

                });


            /*
             * Lanzar confeti
             */

            lanzarConfeti();


            /*
             * Ir a la siguiente sección
             */

            const intro =
                document.querySelector(
                    ".intro"
                );


            intro.scrollIntoView({
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       CONTROL DE MÚSICA
    ===================================================== */

    let musicaActiva = false;


    musicButton.addEventListener(
        "click",
        () => {

            if (musicaActiva) {

                music.pause();

                musicaActiva =
                    false;

                musicButton.textContent =
                    "♪";

            } else {

                music.play()
                    .then(() => {

                        musicaActiva =
                            true;

                        musicButton.textContent =
                            "♫";

                    })
                    .catch(() => {

                        console.log(
                            "No se pudo reproducir la música."
                        );

                    });

            }

        }
    );


    /* =====================================================
       ANIMACIONES AL HACER SCROLL
    ===================================================== */

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "visible"
                                );

                        }

                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    document
        .querySelectorAll(".reveal")
        .forEach(element => {

            observer.observe(
                element
            );

        });


    /* =====================================================
       CONFETI
    ===================================================== */

    function lanzarConfeti() {

        confetti.style.display =
            "block";


        const ctx =
            confetti.getContext("2d");


        confetti.width =
            window.innerWidth;


        confetti.height =
            window.innerHeight;


        const piezas = [];


        for (
            let i = 0;
            i < 150;
            i++
        ) {

            piezas.push({

                x:
                    Math.random()
                    * confetti.width,

                y:
                    Math.random()
                    * -confetti.height,

                size:
                    Math.random()
                    * 8 + 4,

                speed:
                    Math.random()
                    * 4 + 2,

                rotation:
                    Math.random()
                    * 360,

                rotationSpeed:
                    Math.random()
                    * 6 - 3

            });

        }


        let frames = 0;


        function animar() {

            ctx.clearRect(
                0,
                0,
                confetti.width,
                confetti.height
            );


            piezas.forEach(
                pieza => {

                    pieza.y +=
                        pieza.speed;


                    pieza.rotation +=
                        pieza.rotationSpeed;


                    ctx.save();


                    ctx.translate(
                        pieza.x,
                        pieza.y
                    );


                    ctx.rotate(
                        pieza.rotation
                        * Math.PI
                        / 180
                    );


                    ctx.fillStyle =
                        [
                            "#c6a15b",
                            "#e5c98b",
                            "#ffffff",
                            "#d6b56b"
                        ][
                        Math.floor(
                            Math.random()
                            * 4
                        )
                        ];


                    ctx.fillRect(
                        -pieza.size / 2,
                        -pieza.size / 2,
                        pieza.size,
                        pieza.size * 2
                    );


                    ctx.restore();

                }
            );


            frames++;


            if (
                frames < 240
            ) {

                requestAnimationFrame(
                    animar
                );

            } else {

                confetti.style.display =
                    "none";

            }

        }


        animar();

    }


    /* =====================================================
       RESPONSIVE CANVAS
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            confetti.width =
                window.innerWidth;

            confetti.height =
                window.innerHeight;

        }
    );


    /* =====================================================
    AUDIO DE HIJOS Y NIETOS
    ===================================================== */

    const familyAudio =
        document.getElementById(
            "familyAudio"
        );


    const familyAudioButton =
        document.getElementById(
            "familyAudioButton"
        );


    const familyAudioIcon =
        document.getElementById(
            "familyAudioIcon"
        );


    const familyAudioText =
        document.getElementById(
            "familyAudioText"
        );


    const audioProgress =
        document.getElementById(
            "audioProgress"
        );


    const audioCurrentTime =
        document.getElementById(
            "audioCurrentTime"
        );


    const audioDuration =
        document.getElementById(
            "audioDuration"
        );


    /* =====================================================
    FORMATO DE TIEMPO
    ===================================================== */

    function formatoTiempo(segundos) {

        if (
            !Number.isFinite(segundos)
        ) {

            return "0:00";

        }


        const minutos =
            Math.floor(
                segundos / 60
            );


        const segundosRestantes =
            Math.floor(
                segundos % 60
            );


        return (
            minutos +
            ":" +
            String(
                segundosRestantes
            ).padStart(2, "0")
        );

    }


    /* =====================================================
    BOTÓN REPRODUCIR / PAUSAR
    ===================================================== */

    familyAudioButton.addEventListener(
        "click",
        () => {

            if (
                familyAudio.paused
            ) {

                familyAudio.play()
                    .then(() => {

                        familyAudioIcon.textContent =
                            "❚❚";

                        familyAudioText.textContent =
                            "Pausar mensaje";

                        familyAudioButton.classList.add(
                            "playing"
                        );

                    })
                    .catch(error => {

                        console.error(
                            "No se pudo reproducir el audio:",
                            error
                        );

                    });

            } else {

                familyAudio.pause();

                familyAudioIcon.textContent =
                    "▶";

                familyAudioText.textContent =
                    "Continuar mensaje";

                familyAudioButton.classList.remove(
                    "playing"
                );

            }

        }
);


/* =====================================================
   CUANDO CARGA EL AUDIO
===================================================== */

familyAudio.addEventListener(
    "loadedmetadata",
    () => {

        audioDuration.textContent =
            formatoTiempo(
                familyAudio.duration
            );

    }
);


/* =====================================================
   ACTUALIZAR PROGRESO
===================================================== */

familyAudio.addEventListener(
    "timeupdate",
    () => {

        if (
            !familyAudio.duration
        ) {

            return;

        }


        const porcentaje =
            (
                familyAudio.currentTime /
                familyAudio.duration
            ) * 100;


        audioProgress.style.width =
            porcentaje + "%";


        audioCurrentTime.textContent =
            formatoTiempo(
                familyAudio.currentTime
            );

    }
);


/* =====================================================
   CLICK EN LA BARRA
===================================================== */

const progressContainer =
    document.querySelector(
        ".audio-progress-container"
    );


progressContainer.addEventListener(
    "click",
    (event) => {

        if (
            !familyAudio.duration
        ) {

            return;

        }


        const rect =
            progressContainer.getBoundingClientRect();


        const posicion =
            event.clientX -
            rect.left;


        const porcentaje =
            posicion /
            rect.width;


        familyAudio.currentTime =
            porcentaje *
            familyAudio.duration;

    }
);


/* =====================================================
   AUDIO TERMINADO
===================================================== */

familyAudio.addEventListener(
    "ended",
    () => {

        familyAudioIcon.textContent =
            "▶";

        familyAudioText.textContent =
            "Escuchar nuevamente";

        familyAudioButton.classList.remove(
            "playing"
        );

        audioProgress.style.width =
            "0%";

        audioCurrentTime.textContent =
            "0:00";

    }
);




});

