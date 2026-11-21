
/* =========================================
   1. INFORMACIÓN DE LOS MODELOS TESLA
========================================= */

const modelos = {
    "model-s": {
        nombre: "Tesla Model S",
        imagen: "img/model-s.jpg",
        descripcion: "Sedán eléctrico de lujo que destaca por su aceleración, autonomía y tecnología avanzada."
    },

    "model-3": {
        nombre: "Tesla Model 3",
        imagen: "img/model-3.jpg",
        descripcion: "Sedán eléctrico moderno que combina eficiencia, comodidad y tecnología para los viajes diarios."
    },

    "model-x": {
        nombre: "Tesla Model X",
        imagen: "img/model-x.jpg",
        descripcion: "SUV eléctrico familiar que destaca por su espacio interior y sus puertas traseras tipo ala de halcón."
    },

    "model-y": {
        nombre: "Tesla Model Y",
        imagen: "img/model-y.jpg",
        descripcion: "SUV eléctrico versátil que ofrece espacio, tecnología y comodidad para diferentes necesidades."
    },

    "cybertruck": {
        nombre: "Tesla Cybertruck",
        imagen: "img/cybertruck.jpg",
        descripcion: "Camioneta eléctrica con diseño futurista, estructura resistente y tecnología innovadora."
    }
};


/* =========================================
   2. ELEMENTOS DEL HTML
========================================= */

const botones = document.querySelectorAll(".btn-ver-mas");
const baseUrl = new URL("../", document.currentScript.src);

const modal = document.getElementById("modal");
const tituloModal = document.getElementById("modal-titulo");
const imagenModal = document.getElementById("modal-imagen");
const descripcionModal = document.getElementById("modal-descripcion");
const botonCerrar = document.getElementById("cerrar-modal");


/* =========================================
   3. ABRIR LA VENTANA DE CADA MODELO
========================================= */

botones.forEach(function (boton) {
    boton.addEventListener("click", function () {

        const idModelo = boton.dataset.modelo;
        const modelo = modelos[idModelo];

        if (!modelo || !modal) {
            return;
        }

        tituloModal.textContent = modelo.nombre;

        imagenModal.src = new URL(modelo.imagen, baseUrl).href;
        imagenModal.alt = modelo.nombre;

        descripcionModal.textContent = modelo.descripcion;

        modal.classList.add("activo");

        document.body.style.overflow = "hidden";
    });
});


/* =========================================
   4. CERRAR LA VENTANA MODAL
========================================= */

function cerrarVentana() {
    if (!modal) {
        return;
    }

    modal.classList.remove("activo");
    document.body.style.overflow = "";
}


// Cerrar con el botón X
if (botonCerrar) {
    botonCerrar.addEventListener("click", cerrarVentana);
}


// Cerrar al hacer clic fuera del contenido
if (modal) {
    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            cerrarVentana();
        }
    });
}


// Cerrar al presionar Escape
document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
        cerrarVentana();
    }
});


/* =========================================
   5. FORMULARIO DE CONTACTO
========================================= */

const formulario = document.getElementById("formulario-contacto");

if (formulario) {
    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (!nombre || !correo || !mensaje) {
            alert("Por favor, completa todos los campos del formulario.");
            return;
        }

        alert(
            "¡Gracias por contactarnos, " + nombre + "!\n\n" +
            "Tu formulario se completó correctamente."
        );

        formulario.reset();
    });
}

const modoPwa = document.getElementById("modo-pwa");
const btnInstalar = document.getElementById("btn-instalar");
const estadoInstalacion = document.getElementById("estado-instalacion");
let eventoInstalacion = null;

if (modoPwa) {
    const ruta = window.location.pathname.split("/").filter(Boolean).pop() || "browser";
    const configuraciones = {
        browser: ["browser", "portrait"],
        "minimail-ui": ["minimal-ui", "portrait"],
        standalone: ["standalone", "portrait"],
        fullscrenn: ["fullscreen", "portrait"]
    };
    const [display, orientation] = configuraciones[ruta] || configuraciones.browser;
    modoPwa.textContent = `Modo de visualización: ${display} | Orientación: ${orientation}`;
}

window.addEventListener("beforeinstallprompt", function (evento) {
    evento.preventDefault();
    eventoInstalacion = evento;
    if (btnInstalar) {
        btnInstalar.hidden = false;
    }
});

if (btnInstalar) {
    btnInstalar.addEventListener("click", async function () {
        if (!eventoInstalacion) {
            if (estadoInstalacion) {
                estadoInstalacion.textContent = "La instalación se gestiona desde las opciones del navegador.";
            }
            return;
        }

        eventoInstalacion.prompt();
        const resultado = await eventoInstalacion.userChoice;
        if (estadoInstalacion) {
            estadoInstalacion.textContent = resultado.outcome === "accepted"
                ? "La instalación fue aceptada."
                : "La instalación fue rechazada.";
        }
        eventoInstalacion = null;
        btnInstalar.hidden = true;
    });
}

window.addEventListener("appinstalled", function () {
    if (estadoInstalacion) {
        estadoInstalacion.textContent = "Tesla fue instalada correctamente.";
    }
    if (btnInstalar) {
        btnInstalar.hidden = true;
    }
    eventoInstalacion = null;
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register(new URL("service-worker.js", window.location.href))
            .then(function (registro) {
                console.log("Service worker registrado correctamente.", registro.scope);
            })
            .catch(function (error) {
                console.error("Error al registrar el service worker.", error);
            });
    });
}


/* =========================================
   6. MENSAJE EN CONSOLA
========================================= */

console.log("Página Tesla: JavaScript cargado correctamente.");