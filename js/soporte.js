// Funcionalidad de búsqueda y filtrado para soporte
function filtrarServicios() {
    const input = document.getElementById('buscador-soporte');
    const filter = input.value.toUpperCase();
    const cards = document.querySelectorAll('.soporte-card');
    const categoriaActiva = document.querySelector('.filtro-btn.active').getAttribute('data-categoria') || 'todos';

    cards.forEach(card => {
        const nombre = card.getAttribute('data-nombre').toUpperCase();
        const categoria = card.getAttribute('data-categoria');
        
        const coincideBusqueda = nombre.includes(filter);
        const coincideCategoria = categoriaActiva === 'todos' || categoria === categoriaActiva;
        
        if (coincideBusqueda && coincideCategoria) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

function filtrarServiciosPorCategoria(categoria) {
    // Actualizar botones activos
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-categoria') === categoria) {
            btn.classList.add('active');
        }
    });

    // Aplicar filtro
    const cards = document.querySelectorAll('.soporte-card');
    const busqueda = document.getElementById('buscador-soporte').value.toUpperCase();
    
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-categoria');
        const nombre = card.getAttribute('data-nombre').toUpperCase();
        
        const coincideCategoria = categoria === 'todos' || cardCat === categoria;
        const coincideBusqueda = nombre.includes(busqueda);
        
        if (coincideCategoria && coincideBusqueda) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

// Función para abrir WhatsApp con mensaje predefinido
function abrirWhatsApp(servicio) {
    const telefono = "573011382447";
    const mensaje = `Hola, estoy interesado en el servicio de ${servicio}. ¿Podrían brindarme más información?`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Configurar eventos para los botones de filtro
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const categoria = this.getAttribute('data-categoria');
            filtrarServiciosPorCategoria(categoria);
        });
    });

    // Configurar evento para el buscador
    document.getElementById('buscador-soporte').addEventListener('keyup', filtrarServicios);

    // Configurar eventos para los botones de WhatsApp
    document.querySelectorAll('.btn-soporte').forEach(btn => {
        btn.addEventListener('click', function() {
            const servicio = this.closest('.soporte-card').querySelector('h3').textContent;
            abrirWhatsApp(servicio);
        });
    });
});