// Funcionalidad de filtrado por tipo de licencia
function filtrarLicencias(tipo) {
    // Actualizar botones activos
    document.querySelectorAll('.tipo-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(tipo) || 
           (tipo === 'todos' && btn.textContent === 'Todas')) {
            btn.classList.add('active');
        }
    });

    const cards = document.querySelectorAll('.licencia-card');
    
    if (tipo === 'todos') {
        cards.forEach(card => {
            card.style.display = "";
        });
    } else {
        cards.forEach(card => {
            const cardTipo = card.getAttribute('data-tipo');
            if (cardTipo === tipo) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    }
}

// Activar el filtro "Todos" al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    filtrarLicencias('todos');
    
    // Agregar funcionalidad a los botones de licencia
    document.querySelectorAll('.btn-licencia').forEach(btn => {
        btn.addEventListener('click', function() {
            const licencia = this.closest('.licencia-card').querySelector('h3').textContent;
            const mensaje = `Estoy interesado en la licencia ${licencia}`;
            const urlWhatsApp = `https://wa.me/3011382447?text=${encodeURIComponent(mensaje)}`;
            window.open(urlWhatsApp, '_blank');
        });
    });
});