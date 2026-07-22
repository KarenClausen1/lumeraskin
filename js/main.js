/* ===================================================================
 * LUMÉRA SKIN — main.js
 * JavaScript propio del sitio.
 * =================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    //con DOMContentLoaded obligamos a que el script se ejecute una vez que el DOM esté completamente cargado

    /* -----------------------------------------------------------------
     * 1. Botones "Agregar al carrito"
     * --------------------------------------------------------------- */
    var botonesCarrito = document.querySelectorAll('.btn-agregar-carrito'); //querySelectorAll devuelve todos los elementos con la clase .btn-agregar-carrito. El resultado es una coleccion, un NodeList con todos los botones
    var toastEl = document.getElementById('toastCarrito'); //busca el elemento con el id toastCarrito y lo guarda en la variable toastEl
    var toastMensaje = document.getElementById('toastCarritoMensaje'); //busca el elemento con el id toastCarritoMensaje y lo guarda en la variable toastMensaje
    var toast = toastEl ? new bootstrap.Toast(toastEl, { delay: 2500 }) : null;
    // operador ternario: si existe el elemento del Toast, crea una instancia de Bootstrap que se ocultara automaticamente después de 2500ms; si no existe, guarda null.

    botonesCarrito.forEach(function (boton) { //recorremos todos los botones
        boton.addEventListener('click', function (evento) { //escuchamos el evento click de cada boton. El evento se ejecuta recien al hacer clic en el boton
            var producto = evento.currentTarget.dataset.producto || 'Producto';

            if (toastMensaje) {
                toastMensaje.textContent = producto + ' se agregó al carrito.'; //Obtiene el nombre del producto del boton; si no existe, usa "Producto"
            }

            if (toast) { // si el toast existe, bootstrap lo muestra
                toast.show();
            }
        });
    });

    /* -----------------------------------------------------------------
     * 2. Formulario Newsletter
     * --------------------------------------------------------------- */
    var formNewsletter = document.getElementById('form-newsletter');

    if (formNewsletter) {
        formNewsletter.addEventListener('submit', function (evento) {

            evento.preventDefault();

            if (!formNewsletter.checkValidity()) {
                evento.stopPropagation();
                formNewsletter.classList.add('was-validated');
                return;
            }

            var emailInput = document.getElementById('newsletter-email');

            if (toastMensaje) {
                toastMensaje.textContent = '¡Gracias por suscribirte, ' + emailInput.value + '!';
            }

            if (toast) {
                toast.show();
            }

            formNewsletter.reset();
            formNewsletter.classList.remove('was-validated');
        });
    }

    /* -----------------------------------------------------------------
     * 3. Offcanvas Mobile
     * --------------------------------------------------------------- */
    var menuMobileEl = document.getElementById('menuMobile');

    if (menuMobileEl) {

        var enlacesMenuMobile = menuMobileEl.querySelectorAll('a.nav-link');
        var offcanvasInstancia = bootstrap.Offcanvas.getOrCreateInstance(menuMobileEl);

        enlacesMenuMobile.forEach(function (enlace) {
            enlace.addEventListener('click', function () {
                offcanvasInstancia.hide();
            });
        });
    }

    /* -----------------------------------------------------------------
     * 4. Link activo del menú
     * --------------------------------------------------------------- */
    var paginaActual = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.main-nav .nav-link, #menuMobile .nav-link').forEach(function (enlace) {

        var href = enlace.getAttribute('href').split('#')[0];

        if (href === paginaActual) {
            enlace.classList.add('active');
        }

    });

    /* -----------------------------------------------------------------
     * 5. Modal Paso (Skincare)
     * --------------------------------------------------------------- */
    var modalPasoEl = document.getElementById('modalPaso');

    if (modalPasoEl) {

        modalPasoEl.addEventListener('show.bs.modal', function (evento) {

            var boton = evento.relatedTarget;

            var titulo = boton.dataset.pasoTitulo || 'Paso';
            var texto = boton.dataset.pasoTexto || '';

            modalPasoEl.querySelector('#modalPasoLabel').textContent = titulo;
            modalPasoEl.querySelector('#modalPasoTexto').textContent = texto;

        });

    }

    /* -----------------------------------------------------------------
     * 6. Formulario Contacto
     * --------------------------------------------------------------- */
    var formContacto = document.getElementById('form-contacto');

    if (formContacto) {

        formContacto.addEventListener('submit', function (evento) {

            evento.preventDefault();
            evento.stopPropagation();

            if (!formContacto.checkValidity()) {
                formContacto.classList.add('was-validated');
                return;
            }

            if (toastMensaje) {
                toastMensaje.textContent = '¡Gracias! Tu consulta fue enviada correctamente.';
            }

            if (toast) {
                toast.show();
            }

            formContacto.reset();
            formContacto.classList.remove('was-validated');

        });

    }

    /* -----------------------------------------------------------------
     * 7. Tooltips Bootstrap
     * --------------------------------------------------------------- */
    var elementosTooltip = document.querySelectorAll('[data-bs-toggle="tooltip"]');

    elementosTooltip.forEach(function (el) {
        new bootstrap.Tooltip(el);
    });

    /* -----------------------------------------------------------------
     * 8. Copiar datos de contacto
     * --------------------------------------------------------------- */
    var datosCopiables = document.querySelectorAll('.dato-copiable');

    datosCopiables.forEach(function (dato) {

        var copiar = function () {

            var valor = dato.dataset.copiar || dato.textContent.trim();

            if (navigator.clipboard) {
                navigator.clipboard.writeText(valor);
            }

            if (toastMensaje) {
                toastMensaje.textContent = 'Copiado: ' + valor;
            }

            if (toast) {
                toast.show();
            }

        };

        dato.addEventListener('click', copiar);

        dato.addEventListener('keydown', function (evento) {

            if (evento.key === 'Enter' || evento.key === ' ') {
                evento.preventDefault();
                copiar();
            }

        });

    });

});