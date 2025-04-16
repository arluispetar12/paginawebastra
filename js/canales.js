// Variables globales
let carrito = JSON.parse(localStorage.getItem('carritoCanales')) || [];

// Cargar canales al iniciar
document.addEventListener('DOMContentLoaded', function() {
    cargarCanales();
});

// Función principal para cargar canales desde JSON
function cargarCanales() {
    fetch('../data/canales.json')
        .then(response => response.json())
        .then(data => {
            mostrarCanales(data.categorias);
            inicializarFiltros();
            actualizarEstadoBotonesAgregar();
        })
        .catch(error => {
            console.error('Error al cargar los canales:', error);
        });
}

// Mostrar canales en el DOM
function mostrarCanales(categorias) {
    const contenedor = document.getElementById('contenedor-categorias');
    contenedor.innerHTML = '';
    
    categorias.forEach(categoria => {
        const categoriaDiv = document.createElement('div');
        categoriaDiv.className = 'categoria';
        categoriaDiv.id = categoria.id;
        
        const titulo = document.createElement('h2');
        titulo.innerHTML = `<i class="fas ${categoria.icono}"></i> ${categoria.nombre}`;
        categoriaDiv.appendChild(titulo);
        
        const gridCanales = document.createElement('div');
        gridCanales.className = 'grid-canales';
        
        categoria.canales.forEach(canal => {
            const canalCard = document.createElement('div');
            canalCard.className = 'canal-card';
            canalCard.setAttribute('data-categoria', categoria.id);
            canalCard.setAttribute('data-nombre', canal.nombre.toLowerCase());
            
            canalCard.innerHTML = `
                <div class="canal-logo">
                    <img src="${canal.logo}" alt="${canal.nombre}" loading="lazy">
                </div>
                <div class="canal-info">
                    <h3>${canal.nombre}</h3>
                    <p class="calidad"><span class="${canal.calidad.toLowerCase()}">${canal.calidad}</span> • ${canal.region}</p>
                </div>
            `;
            
            const btnAgregar = document.createElement('button');
            btnAgregar.className = 'btn-agregar';
            btnAgregar.innerHTML = '<i class="fas fa-plus"></i>';
            btnAgregar.onclick = function(e) {
                e.stopPropagation();
                agregarAlCarrito(canalCard);
            };
            
            canalCard.style.position = 'relative';
            canalCard.appendChild(btnAgregar);
            gridCanales.appendChild(canalCard);
        });
        
        categoriaDiv.appendChild(gridCanales);
        contenedor.appendChild(categoriaDiv);
    });
}

// Funciones de filtrado
function inicializarFiltros() {
    const input = document.getElementById('buscador-canales');
    if (input) {
        input.addEventListener('keyup', filtrarCanales);
    }
}

function filtrarCanales() {
    const input = document.getElementById('buscador-canales');
    const filter = input.value.toUpperCase();
    const cards = document.querySelectorAll('.canal-card');

    cards.forEach(card => {
        const nombre = card.getAttribute('data-nombre').toUpperCase();
        card.style.display = nombre.includes(filter) ? "" : "none";
    });
}

function filtrarPorCategoria(categoria) {
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const cards = document.querySelectorAll('.canal-card');
    const categorias = document.querySelectorAll('.categoria');
    
    if (categoria === 'todas') {
        cards.forEach(card => card.style.display = "");
        categorias.forEach(cat => cat.style.display = "");
    } else {
        categorias.forEach(cat => cat.style.display = "none");
        document.getElementById(categoria).style.display = "";
        
        cards.forEach(card => {
            card.style.display = card.getAttribute('data-categoria') === categoria ? "" : "none";
        });
    }
}

// Actualizar estado de botones agregar según carrito
function actualizarEstadoBotonesAgregar() {
    const canalCards = document.querySelectorAll('.canal-card');
    canalCards.forEach(card => {
        const nombre = card.querySelector('h3').textContent;
        const btn = card.querySelector('.btn-agregar');
        const existe = carrito.some(item => item.nombre === nombre);
        
        if (existe) {
            btn.classList.add('agregado');
            btn.innerHTML = '<i class="fas fa-check"></i>';
        }
    });
}