    let carrito = [];

    function agregarAlCarrito(id, nombre, precio, imagen) {
        const existente = carrito.find(item => item.id === id);
        if (existente) {
            existente.cantidad += 1;
        } else {
            carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
        }
        actualizarContador();
        mostrarNotificacion(`${nombre} agregado al carrito.`);
    }

    function mostrarCarrito() {
        const modal = document.getElementById("modalCarrito");
        const contenido = document.getElementById("contenidoCarrito");
        const total = document.getElementById("totalCarrito");

        contenido.innerHTML = "";

        if (carrito.length === 0) {
            contenido.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío.</p>`;
        } else {
            carrito.forEach(item => {
                const div = document.createElement("div");
                div.classList.add("elemento-carrito");
                div.innerHTML = `
                    <img src="${item.imagen}" class="imagen-elemento" alt="${item.nombre}" />
                    <div class="info-elemento">
                        <div class="nombre-elemento">${item.nombre}</div>
                        <div class="precio-elemento">$${item.precio}</div>
                        <div class="controles-cantidad">
                            <button class="boton-cantidad" onclick="cambiarCantidad('${item.id}', -1)">−</button>
                            <span class="cantidad-texto">${item.cantidad}</span>
                            <button class="boton-cantidad" onclick="cambiarCantidad('${item.id}', 1)">+</button>
                            <button class="boton-eliminar" onclick="eliminarItem('${item.id}')">Eliminar</button>
                        </div>
                    </div>
                `;
                contenido.appendChild(div);
            });
        }

        total.textContent = `$${carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2)}`;
        modal.style.display = "block";
    }

    function cerrarCarrito() {
        document.getElementById("modalCarrito").style.display = "none";
    }

    function cambiarCantidad(id, cambio) {
        const item = carrito.find(p => p.id === id);
        if (item) {
            item.cantidad += cambio;
            if (item.cantidad <= 0) eliminarItem(id);
        }
        mostrarCarrito();
        actualizarContador();
    }

    function eliminarItem(id) {
        carrito = carrito.filter(p => p.id !== id);
        mostrarCarrito();
        actualizarContador();
    }

    function vaciarCarrito() {
        carrito = [];
        mostrarCarrito();
        actualizarContador();
    }

    function actualizarContador() {
        document.getElementById("contadorCarrito").textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    }

    function mostrarNotificacion(mensaje) {
        let noti = document.createElement("div");
        noti.className = "notificacion mostrar";
        noti.innerText = mensaje;
        document.body.appendChild(noti);
        setTimeout(() => {
            noti.classList.remove("mostrar");
            setTimeout(() => document.body.removeChild(noti), 300);
        }, 2500);
    }

    // Cerrar modal si se hace clic fuera del contenido
    window.onclick = function (e) {
        const modal = document.getElementById("modalCarrito");
        if (e.target === modal) {
            cerrarCarrito();
        }
    };