// ============================================
// APP.JS - Controlador principal
// ============================================

// Inicializar aplicación
function inicializarApp() {
    actualizarEstadisticas();
    renderizarUltimosPedidos();
    renderizarPedidos();
    renderizarPresupuestos();
    renderizarConsultas();
    renderizarMaterialesFaltantes();
    cargarProductosSelect();
    
    // Event listeners
    const nuevoPedidoForm = document.getElementById('nuevoPedidoForm');
    if (nuevoPedidoForm) {
        nuevoPedidoForm.addEventListener('submit', handleNuevoPedido);
    }
    
    const consultaForm = document.getElementById('consultaForm');
    if (consultaForm) {
        consultaForm.addEventListener('submit', handleNuevaConsulta);
    }
    
    const presupuestoForm = document.getElementById('presupuestoForm');
    if (presupuestoForm) {
        presupuestoForm.addEventListener('submit', handleNuevoPresupuesto);
    }
}

// Actualizar estadísticas del dashboard
function actualizarEstadisticas() {
    const stats = DataHelper.getEstadisticas();
    
    document.getElementById('pedidosActivos').textContent = stats.pedidosActivos;
    document.getElementById('pedidosCompletados').textContent = stats.pedidosCompletados;
    document.getElementById('presupuestosPendientes').textContent = stats.presupuestosPendientes;
    document.getElementById('consultasAbiertas').textContent = stats.consultasAbiertas;
}

// Cambiar sección activa
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Desactivar todos los botones
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }
    
    // Activar botón correspondiente
    event.target.classList.add('active');
}

// Renderizar presupuestos
function renderizarPresupuestos() {
    const presupuestos = DataHelper.getPresupuestos();
    const tbody = document.getElementById('presupuestosTable');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (presupuestos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No hay presupuestos solicitados</td></tr>';
        return;
    }
    
    presupuestos.forEach(presupuesto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${presupuesto.id}</td>
            <td>${DataHelper.formatearFecha(presupuesto.fechaSolicitud)}</td>
            <td>${presupuesto.descripcion.substring(0, 50)}...</td>
            <td><span class="status-badge status-${presupuesto.estado}">${presupuesto.estado.toUpperCase()}</span></td>
            <td>${presupuesto.montoEstimado ? DataHelper.formatearPrecio(presupuesto.montoEstimado) : '-'}</td>
            <td>
                <button class="action-btn btn-view" onclick="verDetallePresupuesto(${presupuesto.id})">Ver</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Ver detalle de presupuesto
function verDetallePresupuesto(presupuestoId) {
    const presupuestos = DataHelper.getPresupuestos();
    const presupuesto = presupuestos.find(p => p.id === presupuestoId);
    
    if (!presupuesto) {
        mostrarAlertaInterna('Presupuesto no encontrado', 'error');
        return;
    }
    
    let contenido = `
        <h3>Presupuesto #${presupuesto.id}</h3>
        <p><strong>Fecha de Solicitud:</strong> ${DataHelper.formatearFecha(presupuesto.fechaSolicitud)}</p>
        <p><strong>Estado:</strong> <span class="status-badge status-${presupuesto.estado}">${presupuesto.estado.toUpperCase()}</span></p>
        <p><strong>Tipo de Proyecto:</strong> ${presupuesto.tipoProyecto}</p>
        <p><strong>Área a Regar:</strong> ${presupuesto.areaRiego} m²</p>
        <p><strong>Descripción:</strong> ${presupuesto.descripcion}</p>
    `;
    
    if (presupuesto.montoEstimado) {
        contenido += `<p><strong>Monto Estimado:</strong> ${DataHelper.formatearPrecio(presupuesto.montoEstimado)}</p>`;
    }
    
    if (presupuesto.observaciones) {
        contenido += `<p><strong>Observaciones:</strong> ${presupuesto.observaciones}</p>`;
    }
    
    if (presupuesto.fechaRespuesta) {
        contenido += `<p><strong>Fecha de Respuesta:</strong> ${DataHelper.formatearFecha(presupuesto.fechaRespuesta)}</p>`;
    }
    
    // Usar modal de alerta para mostrar detalle (adaptado)
    mostrarAlertaInterna(contenido, 'info', 'Detalle de Presupuesto');
}

// Renderizar consultas
function renderizarConsultas() {
    const consultas = DataHelper.getConsultas();
    const container = document.getElementById('consultasContainer');
    
    if (!container) return;
    
    if (consultas.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center; padding: 30px;">No hay consultas realizadas</p>';
        return;
    }
    
    let html = '';
    
    consultas.forEach(consulta => {
        html += `
            <div class="consulta-card">
                <div class="consulta-header">
                    <h4>${consulta.asunto}</h4>
                    <span class="status-badge status-${consulta.estado}">${consulta.estado.toUpperCase()}</span>
                </div>
                <div class="consulta-body">
                    <p><strong>Tu consulta:</strong></p>
                    <p>${consulta.mensaje}</p>
                    ${consulta.respuesta ? `
                        <p style="margin-top: 15px;"><strong>Respuesta:</strong></p>
                        <p style="background: #f0f7ff; padding: 10px; border-left: 3px solid #667eea; border-radius: 4px;">
                            ${consulta.respuesta}
                        </p>
                        <p class="consulta-date">Respondido el ${DataHelper.formatearFecha(consulta.fechaRespuesta)}</p>
                    ` : '<p style="color: #999; font-style: italic;">Esperando respuesta...</p>'}
                </div>
                <p class="consulta-date">Creada el ${DataHelper.formatearFecha(consulta.fechaCreacion)}</p>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Manejar nueva consulta
function handleNuevaConsulta(e) {
    e.preventDefault();
    
    const asunto = document.getElementById('asuntoConsulta').value;
    const mensaje = document.getElementById('mensajeConsulta').value;
    
    DataHelper.crearConsulta({
        asunto: asunto,
        mensaje: mensaje
    });
    
    // Limpiar formulario
    document.getElementById('consultaForm').reset();
    cerrarModal('modalConsulta');
    
    // Actualizar vistas
    renderizarConsultas();
    actualizarEstadisticas();
    
    mostrarAlertaInterna('Consulta enviada exitosamente. Te responderemos a la brevedad.', 'success');
}

// Manejar nuevo presupuesto
function handleNuevoPresupuesto(e) {
    e.preventDefault();
    
    const tipoProyecto = document.getElementById('tipoProyectoPresupuesto').value;
    const areaRiego = parseFloat(document.getElementById('areaRiego').value);
    const descripcion = document.getElementById('descripcionPresupuesto').value;
    
    DataHelper.crearPresupuesto({
        tipoProyecto: tipoProyecto,
        areaRiego: areaRiego,
        descripcion: descripcion
    });
    
    // Limpiar formulario
    document.getElementById('presupuestoForm').reset();
    cerrarModal('modalPresupuesto');
    
    // Actualizar vistas
    renderizarPresupuestos();
    actualizarEstadisticas();
    
    mostrarAlertaInterna('Solicitud de presupuesto enviada exitosamente. Te contactaremos pronto.', 'success');
}

// Abrir modales
function abrirModalConsulta() {
    document.getElementById('modalConsulta').classList.add('active');
}

function abrirModalPresupuesto() {
    document.getElementById('modalPresupuesto').classList.add('active');
}

// Cerrar modal
function cerrarModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Prevenir que el click dentro del modal lo cierre
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-content')) {
        e.stopPropagation();
    }
});

// Nuevo: Función para descargar PDF
function descargarPedidoPDF(pedidoId) {
    const pedido = DataHelper.getPedidoById(pedidoId);
    if (!pedido) return;
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text('Detalle del Pedido', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Pedido: #${pedido.id}`, 20, 40);
    doc.text(`Fecha: ${DataHelper.formatearFecha(pedido.fecha)}`, 20, 50);
    doc.text(`Estado: ${pedido.estado.toUpperCase()}`, 20, 60);
    doc.text(`Total: ${DataHelper.formatearPrecio(pedido.total)}`, 20, 70);
    
    // Agregar items
    let y = 90;
    doc.text('Productos:', 20, y);
    y += 10;
    pedido.items.forEach(item => {
        doc.text(`${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: ${DataHelper.formatearPrecio(item.cantidad * item.precioUnitario)}`, 20, y);
        y += 10;
    });
    
    doc.save(`pedido_${pedido.id}.pdf`);
}

// Nuevo: Mostrar alerta interna
function mostrarAlertaInterna(mensaje, tipo = 'info', titulo = 'Mensaje', callback = null) {
    const modal = document.getElementById('modalAlert');
    const titleEl = document.getElementById('alertTitle');
    const messageEl = document.getElementById('alertMessage');
    const okBtn = document.getElementById('alertOkBtn');
    const cancelBtn = document.getElementById('alertCancelBtn');
    
    titleEl.textContent = titulo;
    messageEl.innerHTML = mensaje;  // Permitir HTML
    okBtn.textContent = callback ? 'Confirmar' : 'OK';
    cancelBtn.classList.toggle('hidden', !callback);
    
    okBtn.onclick = () => {
        cerrarModal('modalAlert');
        if (callback) callback(true);
    };
    
    if (callback) {
        cancelBtn.onclick = () => {
            cerrarModal('modalAlert');
            callback(false);
        };
    }
    
    modal.classList.add('active');
}