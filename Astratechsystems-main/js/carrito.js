// carrito.js
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let carrito = JSON.parse(localStorage.getItem('carritoCanales')) || [];

    // Inicializar el carrito
    actualizarCarrito();

    // Función para alternar la visibilidad del carrito
    window.toggleCarrito = function() {
        const carritoContainer = document.getElementById('carrito-container');
        carritoContainer.classList.toggle('mostrar');
    };

    // Cerrar el carrito al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const carritoContainer = document.getElementById('carrito-container');
        const carritoToggle = document.querySelector('.carrito-toggle');
        
        if (!carritoContainer.contains(event.target) && 
            !carritoToggle.contains(event.target) && 
            carritoContainer.classList.contains('mostrar')) {
            carritoContainer.classList.remove('mostrar');
        }
    });

    // Función para agregar canales al carrito
    window.agregarAlCarrito = function(card) {
        const nombre = card.querySelector('h3').textContent;
        const calidad = card.querySelector('.calidad').textContent;
        const categoria = card.getAttribute('data-categoria');
        
        const existe = carrito.some(item => item.nombre === nombre);
        
        if (!existe) {
            carrito.push({ nombre, calidad, categoria });
            localStorage.setItem('carritoCanales', JSON.stringify(carrito));
            
            const btn = card.querySelector('.btn-agregar');
            if (btn) {
                btn.classList.add('agregado');
                btn.innerHTML = '<i class="fas fa-check"></i>';
            }
            
            actualizarCarrito();
            mostrarNotificacion(`"${nombre}" agregado al carrito`);
        } else {
            mostrarNotificacion(`"${nombre}" ya está en el carrito`, 'info');
        }
    };

    // Actualizar visualización del carrito
    function actualizarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        const contador = document.getElementById('contador-carrito');
        const contadorToggle = document.getElementById('contador-toggle');
        
        contador.textContent = carrito.length;
        contadorToggle.textContent = carrito.length;
        
        if (carrito.length === 0) {
            listaCarrito.innerHTML = '<p class="carrito-vacio">No has seleccionado ningún canal aún</p>';
            return;
        }
        
        listaCarrito.innerHTML = '';
        
        carrito.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item-carrito';
            itemElement.innerHTML = `
                <div class="item-info">
                    <div class="item-details">
                        <div class="nombre">${item.nombre}</div>
                        <div class="calidad">${item.calidad}</div>
                    </div>
                </div>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            listaCarrito.appendChild(itemElement);
        });
    }

    // Eliminar item del carrito
    window.eliminarDelCarrito = function(index) {
        const nombre = carrito[index].nombre;
        carrito.splice(index, 1);
        localStorage.setItem('carritoCanales', JSON.stringify(carrito));
        actualizarCarrito();
        
        const canalCards = document.querySelectorAll('.canal-card');
        canalCards.forEach(card => {
            if (card.querySelector('h3').textContent === nombre) {
                const btn = card.querySelector('.btn-agregar');
                if (btn) {
                    btn.classList.remove('agregado');
                    btn.innerHTML = '<i class="fas fa-plus"></i>';
                }
            }
        });
        
        mostrarNotificacion(`"${nombre}" eliminado del carrito`);
    };

    // Limpiar carrito completo
    window.limpiarCarrito = function() {
        carrito = [];
        localStorage.removeItem('carritoCanales');
        actualizarCarrito();
        
        document.querySelectorAll('.btn-agregar').forEach(btn => {
            btn.classList.remove('agregado');
            btn.innerHTML = '<i class="fas fa-plus"></i>';
        });
        
        mostrarNotificacion('Carrito vaciado');
    };

    // Enviar por WhatsApp
    window.enviarWhatsApp = function() {
        if (carrito.length === 0) {
            mostrarNotificacion('No hay canales seleccionados', 'error');
            return;
        }
        
        let mensaje = '¡Hola! Estoy interesado en cotizar los siguientes canales:\n\n';
        const categorias = {};
        
        carrito.forEach(item => {
            if (!categorias[item.categoria]) categorias[item.categoria] = [];
            categorias[item.categoria].push(item);
        });
        
        for (const categoria in categorias) {
            mensaje += `*${categoria.toUpperCase()}*\n`;
            categorias[categoria].forEach(item => {
                mensaje += `- ${item.nombre} (${item.calidad})\n`;
            });
            mensaje += '\n';
        }
        
        mensaje += `Total: ${carrito.length} canales seleccionados\n\n`;
        mensaje += 'Por favor, envíenme información sobre precios y paquetes disponibles.';
        
        const numeroWhatsApp = '+573011382447'; // Reemplaza con tu número
        window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`, '_blank');
    };

    // Mostrar notificaciones
    function mostrarNotificacion(mensaje, tipo = 'success') {
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion ${tipo}`;
        notificacion.textContent = mensaje;
        
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            notificacion.classList.add('mostrar');
        }, 10);
        
        setTimeout(() => {
            notificacion.classList.remove('mostrar');
            setTimeout(() => {
                document.body.removeChild(notificacion);
            }, 300);
        }, 3000);
    }
});