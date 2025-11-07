// ============================================
// PEDIDOS.JS - Gestión de pedidos
// ============================================

let productosSeleccionados = [];

// Renderizar lista de pedidos
function renderizarPedidos() {
    const pedidos = DataHelper.getPedidos();
    const tbody = document.getElementById('pedidosTable');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (pedidos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No hay pedidos registrados</td></tr>';
        return;
    }
    
    pedidos.forEach(pedido => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${pedido.id}</td>
            <td>${DataHelper.formatearFecha(pedido.fecha)}</td>
            <td><span class="status-badge status-${pedido.estado}">${pedido.estado.toUpperCase()}</span></td>
            <td>${pedido.descripcion.substring(0, 50)}...</td>
            <td>${pedido.items.length} productos</td>
            <td>${DataHelper.formatearPrecio(pedido.total)}</td>
            <td>
                <button class="action-btn btn-view" onclick="verDetallePedido(${pedido.id})">Ver</button>
                ${pedido.estado === 'pendiente' ? `<button class="action-btn btn-cancel" onclick="confirmarCancelarPedido(${pedido.id})">Cancelar</button>` : ''}
                <button class="action-btn btn-pdf" onclick="descargarPedidoPDF(${pedido.id})">PDF</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Renderizar últimos pedidos en dashboard
function renderizarUltimosPedidos() {
    const pedidos = DataHelper.getPedidos().slice(-3).reverse();
    const tbody = document.getElementById('ultimosPedidosTable');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (pedidos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No hay pedidos registrados</td></tr>';
        return;
    }
    
    pedidos.forEach(pedido => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${pedido.id}</td>
            <td>${DataHelper.formatearFecha(pedido.fecha)}</td>
            <td><span class="status-badge status-${pedido.estado}">${pedido.estado.toUpperCase()}</span></td>
            <td>${DataHelper.formatearPrecio(pedido.total)}</td>
            <td>
                <button class="action-btn btn-view" onclick="verDetallePedido(${pedido.id})">Ver</button>
                <button class="action-btn btn-pdf" onclick="descargarPedidoPDF(${pedido.id})">PDF</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Nuevo: Función para filtrar pedidos (corregida)
function filtrarPedidos() {
    const input = document.getElementById('searchPedidos').value.toLowerCase();
    const rows = document.querySelectorAll('#pedidosTable tr');
    
    rows.forEach(row => {
        const id = row.querySelector('td:nth-child(1)')?.textContent.toLowerCase() || '';
        const desc = row.querySelector('td:nth-child(4)')?.textContent.toLowerCase() || '';  // Ahora en columna 4
        if (id.includes(input) || desc.includes(input)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Ver detalle de pedido
function verDetallePedido(pedidoId) {
    const pedido = DataHelper.getPedidoById(pedidoId);
    
    if (!pedido) {
        mostrarAlertaInterna('Pedido no encontrado', 'error');
        return;
    }
    
    const modal = document.getElementById('modalDetallePedido');
    const content = document.getElementById('detallePedidoContent');
    
    let itemsHTML = '';
    pedido.items.forEach(item => {
        const subtotal = item.cantidad * item.precioUnitario;
        itemsHTML += `
            <li>
                <div>
                    <strong>${item.nombre}</strong><br>
                    <small>Cantidad: ${item.cantidad} x ${DataHelper.formatearPrecio(item.precioUnitario)}</small>
                </div>
                <div><strong>${DataHelper.formatearPrecio(subtotal)}</strong></div>
            </li>
        `;
    });
    
    content.innerHTML = `
        <div class="detalle-section">
            <h4>Información del Pedido</h4>
            <div class="detalle-info">
                <strong>Pedido:</strong> #${pedido.id}
            </div>
            <div class="detalle-info">
                <strong>Fecha:</strong> ${DataHelper.formatearFecha(pedido.fecha)}
            </div>
            <div class="detalle-info">
                <strong>Estado:</strong> <span class="status-badge status-${pedido.estado}">${pedido.estado.toUpperCase()}</span>
            </div>
            <div class="detalle-info">
                <strong>Tipo de Proyecto:</strong> ${pedido.tipoProyecto}
            </div>
            <div class="detalle-info">
                <strong>Descripción:</strong> ${pedido.descripcion}
            </div>
            ${pedido.fechaEntrega ? `<div class="detalle-info"><strong>Fecha Estimada de Entrega:</strong> ${DataHelper.formatearFecha(pedido.fechaEntrega)}</div>` : ''}
            ${pedido.fechaCompletado ? `<div class="detalle-info"><strong>Fecha de Completado:</strong> ${DataHelper.formatearFecha(pedido.fechaCompletado)}</div>` : ''}
        </div>
        
        <div class="detalle-section">
            <h4>Productos</h4>
            <ul class="productos-detalle">
                ${itemsHTML}
            </ul>
        </div>
        
        <div class="detalle-section">
            <div class="detalle-info">
                <strong>Subtotal:</strong> ${DataHelper.formatearPrecio(pedido.subtotal)}
            </div>
            <div class="detalle-info">
                <strong>IVA (21%):</strong> ${DataHelper.formatearPrecio(pedido.impuestos)}
            </div>
            <div class="detalle-info" style="font-size: 18px; background: #f0f0f0; padding: 15px;">
                <strong>TOTAL:</strong> ${DataHelper.formatearPrecio(pedido.total)}
            </div>
        </div>
        
        ${pedido.notas ? `
        <div class="detalle-section">
            <h4>Notas</h4>
            <div class="detalle-info">
                ${pedido.notas}
            </div>
        </div>
        ` : ''}
    `;
    
    modal.classList.add('active');
}

// Nuevo: Confirmar cancelar pedido
function confirmarCancelarPedido(pedidoId) {
    mostrarAlertaInterna('¿Estás seguro de que deseas cancelar este pedido?', 'warning', 'Confirmar Cancelación', (confirmado) => {
        if (confirmado) {
            cancelarPedido(pedidoId);
        }
    });
}

// Cancelar pedido
function cancelarPedido(pedidoId) {
    const pedido = DataHelper.getPedidoById(pedidoId);
    
    if (pedido && pedido.estado === 'pendiente') {
        pedido.estado = 'cancelado';
        renderizarPedidos();
        renderizarUltimosPedidos();
        actualizarEstadisticas();
        mostrarAlertaInterna('Pedido cancelado correctamente', 'success');
    } else {
        mostrarAlertaInterna('No se puede cancelar este pedido', 'error');
    }
}

// Cargar productos en select
function cargarProductosSelect() {
    const select = document.getElementById('productoSelect');
    if (!select) return;
    
    const productos = DataHelper.getProductos();
    
    select.innerHTML = '<option value="">Seleccionar producto...</option>';
    
    productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.id;
        option.textContent = `${producto.nombre} - ${DataHelper.formatearPrecio(producto.precio)}`;
        select.appendChild(option);
    });
}

// Agregar producto al pedido
function agregarProductoAPedido() {
    const selectProducto = document.getElementById('productoSelect');
    const inputCantidad = document.getElementById('cantidadProducto');
    
    const productoId = parseInt(selectProducto.value);
    const cantidad = parseInt(inputCantidad.value);
    
    if (!productoId || !cantidad || cantidad < 1) {
        mostrarAlertaInterna('Por favor selecciona un producto y una cantidad válida', 'error');
        return;
    }
    
    const producto = DataHelper.getProductoById(productoId);
    
    if (!producto) {
        mostrarAlertaInterna('Producto no encontrado', 'error');
        return;
    }
    
    // Verificar si ya existe el producto
    const productoExistente = productosSeleccionados.find(p => p.productoId === productoId);
    
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        productosSeleccionados.push({
            productoId: producto.id,
            nombre: producto.nombre,
            precioUnitario: producto.precio,
            cantidad: cantidad
        });
    }
    
    renderizarProductosSeleccionados();
    
    // Limpiar campos
    selectProducto.value = '';
    inputCantidad.value = '1';
}

// Renderizar productos seleccionados
function renderizarProductosSeleccionados() {
    const container = document.getElementById('productosSeleccionados');
    
    if (!container) return;
    
    if (productosSeleccionados.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No hay productos seleccionados</p>';
        return;
    }
    
    let html = '<h4>Productos Seleccionados:</h4>';
    let total = 0;
    
    productosSeleccionados.forEach((item, index) => {
        const subtotal = item.cantidad * item.precioUnitario;
        total += subtotal;
        
        html += `
            <div class="product-item">
                <div class="product-item-info">
                    <strong>${item.nombre}</strong><br>
                    <small>${item.cantidad} x ${DataHelper.formatearPrecio(item.precioUnitario)} = ${DataHelper.formatearPrecio(subtotal)}</small>
                </div>
                <button class="remove-btn" onclick="eliminarProductoSeleccionado(${index})">Eliminar</button>
            </div>
        `;
    });
    
    const impuestos = total * 0.21;
    const totalFinal = total + impuestos;
    
    html += `
        <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Subtotal:</span>
                <strong>${DataHelper.formatearPrecio(total)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>IVA (21%):</span>
                <strong>${DataHelper.formatearPrecio(impuestos)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 18px; padding-top: 10px; border-top: 2px solid #ddd;">
                <span><strong>TOTAL:</strong></span>
                <strong style="color: #667eea;">${DataHelper.formatearPrecio(totalFinal)}</strong>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Eliminar producto seleccionado
function eliminarProductoSeleccionado(index) {
    productosSeleccionados.splice(index, 1);
    renderizarProductosSeleccionados();
}

// Manejar envío de nuevo pedido
function handleNuevoPedido(e) {
    e.preventDefault();
    
    if (productosSeleccionados.length === 0) {
        mostrarAlertaInterna('Por favor agrega al menos un producto al pedido', 'error');
        return;
    }
    
    const tipoProyecto = document.getElementById('tipoProyecto').value;
    const descripcion = document.getElementById('descripcionProyecto').value;
    const notas = document.getElementById('notasPedido').value;
    
    // Calcular totales
    let subtotal = 0;
    productosSeleccionados.forEach(item => {
        subtotal += item.cantidad * item.precioUnitario;
    });
    
    const impuestos = subtotal * 0.21;
    const total = subtotal + impuestos;
    
    // Crear pedido
    const nuevoPedido = {
        tipoProyecto: tipoProyecto,
        descripcion: descripcion,
        notas: notas,
        items: [...productosSeleccionados],
        subtotal: subtotal,
        impuestos: impuestos,
        total: total,
        fechaEntrega: calcularFechaEstimada()
    };
    
    DataHelper.crearPedido(nuevoPedido);
    
    // Limpiar formulario
    document.getElementById('nuevoPedidoForm').reset();
    productosSeleccionados = [];
    renderizarProductosSeleccionados();
    
    // Actualizar vistas
    renderizarPedidos();
    renderizarUltimosPedidos();
    actualizarEstadisticas();
    
    mostrarAlertaInterna('¡Pedido creado exitosamente! Nos contactaremos contigo pronto.', 'success');
}

// Calcular fecha estimada de entrega (10 días hábiles)
function calcularFechaEstimada() {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 10);
    return fecha.toISOString().split('T')[0];
}

// Renderizar materiales faltantes
function renderizarMaterialesFaltantes() {
    const container = document.getElementById('materialesFaltantesContainer');
    
    if (!container) return;
    
    const materiales = DataHelper.getMaterialesFaltantes();
    
    if (materiales.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center; padding: 30px;">No hay materiales faltantes en tus pedidos activos.</p>';
        return;
    }
    
    // Agrupar por pedido
    const materialesPorPedido = {};
    
    materiales.forEach(material => {
        if (!materialesPorPedido[material.pedidoId]) {
            materialesPorPedido[material.pedidoId] = [];
        }
        materialesPorPedido[material.pedidoId].push(material);
    });
    
    let html = '';
    
    Object.keys(materialesPorPedido).forEach(pedidoId => {
        const pedido = DataHelper.getPedidoById(parseInt(pedidoId));
        const materialesPedido = materialesPorPedido[pedidoId];
        
        html += `
            <div class="material-card">
                <h4>Pedido #${pedidoId} - ${pedido ? pedido.descripcion : ''}</h4>
                <ul class="material-list">
        `;
        
        materialesPedido.forEach(material => {
            html += `
                <li>
                    <div>
                        <span class="material-name">${material.productoNombre}</span>
                        ${material.observaciones ? `<br><small style="color: #666;">${material.observaciones}</small>` : ''}
                    </div>
                    <span class="material-cantidad">${material.cantidadFaltante} faltantes</span>
                </li>
            `;
        });
        
        html += `
                </ul>
            </div>
        `;
    });
    
    container.innerHTML = html;
}