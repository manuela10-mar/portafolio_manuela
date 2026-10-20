document.addEventListener('DOMContentLoaded', () => {
  const resumen = document.getElementById('resumen-compra');
  const totalElem = document.getElementById('total');

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    resumen.innerHTML = '<p>No hay productos en tu carrito.</p>';
    totalElem.textContent = '';
    return;
  }

  let total = 0;

  const lista = document.createElement('ul');
  lista.classList.add('list-group');

  carrito.forEach(producto => {
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    const nombre = document.createElement('span');
    nombre.textContent = `${producto.nombre} (x${producto.cantidad})`;

    const precio = document.createElement('span');
    const subtotal = producto.precio * producto.cantidad;
    precio.textContent = `$${subtotal.toLocaleString()}`;

    total += subtotal;

    item.appendChild(nombre);
    item.appendChild(precio);
    lista.appendChild(item);
  });

  resumen.appendChild(lista);
  totalElem.textContent = `Total: $${total.toLocaleString()}`;

  // Finalizar compra
  document.getElementById('finalizar-compra').addEventListener('click', () => {
    alert('¡Gracias por tu compra!');
    localStorage.removeItem('carrito');
    window.location.href = '../Inicio/inicio.html';  // Vuelve a inicio
  });
});
