// index.js//este es el java del carrito flotante
document.addEventListener('DOMContentLoaded', () => {
  // Abrir/cerrar carrito flotante
  const carritoIcono = document.querySelector('.bi-cart');
  const miniCarrito = document.getElementById('mini-carrito');

  if (carritoIcono && miniCarrito) {
    carritoIcono.addEventListener('click', (e) => {
      e.preventDefault();
      miniCarrito.classList.toggle('oculto');
      renderizarCarrito();
    });
  }

  // Funciones para renderizar el carrito
  window.renderizarCarrito = () => {
    const contenedor = document.getElementById('carrito-items');
    if (!contenedor) return;

    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];

    contenedor.innerHTML = '';
    carritoGuardado.forEach((producto, index) => {
      const item = document.createElement('div');
      item.classList.add('carrito-item');
      item.innerHTML = `
        <p>${producto.nombre}</p>
        <div class="cantidad">
          <button onclick="cambiarCantidad(${index}, -1)">-</button>
          <span>${producto.cantidad}</span>
          <button onclick="cambiarCantidad(${index}, 1)">+</button>
        </div>
        <button onclick="eliminarProducto(${index})" style="color: red;">&#x2716;</button>
      `;
      contenedor.appendChild(item);
    });

    if (carritoGuardado.length === 0) {
      contenedor.innerHTML = '<p>Actualmente no hay productos en el carrito.</p>';
    }
  };

  window.cambiarCantidad = (index, cambio) => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad < 1) carrito[index].cantidad = 1;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
  };

  window.eliminarProducto = (index) => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
  };

const comprarBtn = document.getElementById('comprar-btn');
if (comprarBtn) {
  comprarBtn.addEventListener('click', () => {
    window.location.href = '../pago/pago.html';  // Redirige a la página de pago
  });
}

  renderizarCarrito();
});
/* <-----------------------------------------------------------------------------------------------------------------------------> */
document.addEventListener('DOMContentLoaded', () => {
  const botonesAgregar = document.querySelectorAll('.boton-agregar');
  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
      const nombre = boton.getAttribute('data-nombre');
      const precio = parseInt(boton.getAttribute('data-precio'), 10);
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      const productoExistente = carrito.find(p => p.nombre === nombre);
      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        carrito.push({ nombre, precio, cantidad: 1 });
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));
      alert(`${nombre} agregado al carrito correctamente.`);

      if (typeof renderizarCarrito === 'function') renderizarCarrito();
    });
  });
});
