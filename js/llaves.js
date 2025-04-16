// Funcionalidad de filtrado por satélite
function filtrarPaquetes(satelite) {
    // Actualizar botones activos
    document.querySelectorAll('.satelite-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(satelite) || 
           (satelite === 'todos' && btn.textContent === 'Todos')) {
            btn.classList.add('active');
        }
    });

    const cards = document.querySelectorAll('.paquete-card');
    const secciones = document.querySelectorAll('.satelite-section');
    
    if (satelite === 'todos') {
        cards.forEach(card => {
            card.style.display = "";
        });
        secciones.forEach(sec => {
            sec.style.display = "";
        });
    } else {
        // Ocultar todas las secciones primero
        secciones.forEach(sec => {
            sec.style.display = "none";
        });
        
        // Mostrar solo la sección seleccionada
        document.getElementById(satelite).style.display = "";
        
        // Mostrar todos los paquetes de ese satélite
        cards.forEach(card => {
            const cardSat = card.getAttribute('data-satelite');
            if (cardSat === satelite) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    }
}

// Activar el filtro "Todos" al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    filtrarPaquetes('todos');
    
    // Agregar funcionalidad a los botones de compra
    document.querySelectorAll('.btn-comprar').forEach(btn => {
        btn.addEventListener('click', function() {
            const paquete = this.closest('.paquete-card').querySelector('h3').textContent;
            const satelite = this.closest('.satelite-section').querySelector('h2').textContent;
            const precio = this.closest('.paquete-card').querySelector('.precio-llave').textContent;
            
            // Redirigir a WhatsApp con la información del paquete
            const mensaje = `Estoy interesado en el ${paquete} para ${satelite} (${precio})`;
            const urlWhatsApp = `https://wa.me/3011382447?text=${encodeURIComponent(mensaje)}`;
            window.open(urlWhatsApp, '_blank');
        });
    });
});