// ============================================
// DATA.JS - Simulación de base de datos
// ============================================

// Simulación de la base de datos MySQL en memoria
// En producción, esto se conectaría a tu backend PHP/Node.js

const DB = {
    // Cliente actual (simulación de sesión)
    clienteActual: {
        id: 1,
        username: 'cliente1',
        password: '1234',
        nombre: 'Juan Carlos Pérez',
        email: 'juanperez@email.com',
        telefono: '+54 9 223 555-1234',
        direccion: 'Av. Independencia 1850',
        ciudad: 'Mar del Plata'
    },

    // Productos disponibles
    productos: [
        { id: 1, nombre: 'Aspersor Rotativo Hunter PGP', precio: 3500, categoria: 'aspersores', stock: 45 },
        { id: 2, nombre: 'Aspersor Fijo Rain Bird 1800', precio: 1800, categoria: 'aspersores', stock: 80 },
        { id: 3, nombre: 'Tubería PVC 1" (6m)', precio: 950, categoria: 'tuberias', stock: 200 },
        { id: 4, nombre: 'Tubería PVC 3/4" (6m)', precio: 720, categoria: 'tuberias', stock: 250 },
        { id: 5, nombre: 'Tubería PVC 1/2" (6m)', precio: 580, categoria: 'tuberias', stock: 300 },
        { id: 6, nombre: 'Codo 90° PVC 1"', precio: 220, categoria: 'accesorios', stock: 150 },
        { id: 7, nombre: 'Codo 90° PVC 3/4"', precio: 180, categoria: 'accesorios', stock: 200 },
        { id: 8, nombre: 'Tee PVC 1"', precio: 280, categoria: 'accesorios', stock: 120 },
        { id: 9, nombre: 'Válvula Solenoide Hunter 1"', precio: 5800, categoria: 'valvulas', stock: 30 },
        { id: 10, nombre: 'Válvula Manual 1"', precio: 2200, categoria: 'valvulas', stock: 50 },
        { id: 11, nombre: 'Programador Hunter Pro-C 4 Est.', precio: 12500, categoria: 'controladores', stock: 15 },
        { id: 12, nombre: 'Programador Rain Bird ESP-6 Est.', precio: 18900, categoria: 'controladores', stock: 10 },
        { id: 13, nombre: 'Sensor de Lluvia', precio: 4500, categoria: 'sensores', stock: 25 },
        { id: 14, nombre: 'Filtro de Malla 1"', precio: 3200, categoria: 'filtros', stock: 40 },
        { id: 15, nombre: 'Boquilla Ajustable 0-360°', precio: 850, categoria: 'accesorios', stock: 100 },
        { id: 16, nombre: 'Gotero Autocompensante 4L/h', precio: 95, categoria: 'goteo', stock: 500 },
        { id: 17, nombre: 'Cinta de Riego por Goteo 16mm', precio: 180, categoria: 'goteo', stock: 1000 },
        { id: 18, nombre: 'Regulador de Presión', precio: 1850, categoria: 'accesorios', stock: 35 },
        { id: 19, nombre: 'Electroválvula 3/4"', precio: 4200, categoria: 'valvulas', stock: 40 },
        { id: 20, nombre: 'Kit Reparación Aspersores', precio: 1200, categoria: 'repuestos', stock: 20 }
    ],

    // Pedidos del cliente
    pedidos: [
        {
            id: 1,
            clienteId: 1,
            fecha: '2024-10-15',
            estado: 'completado',
            tipoProyecto: 'residencial',
            descripcion: 'Instalación completa de riego para jardín de 150m²',
            notas: 'Cliente solicitó instalación para fin de semana',
            items: [
                { productoId: 1, cantidad: 6, precioUnitario: 3500, nombre: 'Aspersor Rotativo Hunter PGP' },
                { productoId: 3, cantidad: 8, precioUnitario: 950, nombre: 'Tubería PVC 1" (6m)' },
                { productoId: 6, cantidad: 12, precioUnitario: 220, nombre: 'Codo 90° PVC 1"' },
                { productoId: 9, cantidad: 3, precioUnitario: 5800, nombre: 'Válvula Solenoide Hunter 1"' },
                { productoId: 11, cantidad: 1, precioUnitario: 12500, nombre: 'Programador Hunter Pro-C 4 Est.' }
            ],
            subtotal: 45000,
            impuestos: 9450,
            total: 54450,
            fechaEntrega: '2024-10-25',
            fechaCompletado: '2024-10-24'
        },
        {
            id: 2,
            clienteId: 1,
            fecha: '2024-10-28',
            estado: 'en-proceso',
            tipoProyecto: 'residencial',
            descripcion: 'Ampliación sistema de riego - Zona lateral del jardín',
            notas: 'Agregar 3 aspersores más en zona lateral',
            items: [
                { productoId: 2, cantidad: 3, precioUnitario: 1800, nombre: 'Aspersor Fijo Rain Bird 1800' },
                { productoId: 4, cantidad: 5, precioUnitario: 720, nombre: 'Tubería PVC 3/4" (6m)' },
                { productoId: 7, cantidad: 8, precioUnitario: 180, nombre: 'Codo 90° PVC 3/4"' },
                { productoId: 19, cantidad: 2, precioUnitario: 4200, nombre: 'Electroválvula 3/4"' }
            ],
            subtotal: 18500,
            impuestos: 3885,
            total: 22385,
            fechaEntrega: '2024-11-08'
        },
        {
            id: 3,
            clienteId: 1,
            fecha: '2024-11-01',
            estado: 'pendiente',
            tipoProyecto: 'residencial',
            descripcion: 'Sistema de goteo para huerta',
            notas: 'Huerta de 20m² con hortalizas',
            items: [
                { productoId: 16, cantidad: 120, precioUnitario: 95, nombre: 'Gotero Autocompensante 4L/h' },
                { productoId: 17, cantidad: 25, precioUnitario: 180, nombre: 'Cinta de Riego por Goteo 16mm' },
                { productoId: 18, cantidad: 1, precioUnitario: 1850, nombre: 'Regulador de Presión' }
            ],
            subtotal: 8900,
            impuestos: 1869,
            total: 10769,
            fechaEntrega: '2024-11-12'
        }
    ],

    // Materiales faltantes
    materialesFaltantes: [
        {
            id: 1,
            pedidoId: 2,
            productoId: 2,
            productoNombre: 'Aspersor Fijo Rain Bird 1800',
            cantidadFaltante: 2,
            observaciones: 'Aspersores en tránsito desde proveedor, llegada estimada 5/11',
            fechaRegistro: '2024-11-02'
        },
        {
            id: 2,
            pedidoId: 2,
            productoId: 19,
            productoNombre: 'Electroválvula 3/4"',
            cantidadFaltante: 1,
            observaciones: 'Electroválvula pendiente de reposición stock',
            fechaRegistro: '2024-11-02'
        }
    ],

    // Presupuestos
    presupuestos: [
        {
            id: 1,
            clienteId: 1,
            fechaSolicitud: '2024-10-05',
            tipoProyecto: 'residencial',
            areaRiego: 150,
            descripcion: 'Sistema completo de riego automático para jardín con césped y plantas',
            estado: 'aprobado',
            montoEstimado: 54450,
            fechaRespuesta: '2024-10-07',
            observaciones: 'Presupuesto aprobado. Se generó el pedido #1'
        },
        {
            id: 2,
            clienteId: 1,
            fechaSolicitud: '2024-10-30',
            tipoProyecto: 'residencial',
            areaRiego: 30,
            descripcion: 'Cotización para sistema de riego por goteo en zona de árboles frutales',
            estado: 'pendiente',
            montoEstimado: null,
            fechaRespuesta: null,
            observaciones: null
        }
    ],

    // Consultas
    consultas: [
        {
            id: 1,
            clienteId: 1,
            asunto: '¿Cuándo llega mi pedido #2?',
            mensaje: 'Hola, quisiera saber si hay novedades sobre mi pedido de ampliación del sistema. ¿Para cuándo está estimada la entrega?',
            estado: 'respondida',
            fechaCreacion: '2024-11-01',
            fechaRespuesta: '2024-11-02',
            respuesta: 'Hola Juan! Tu pedido está en proceso. Estamos esperando la llegada de 2 aspersores que vienen en camino. La entrega estimada es para el 8 de noviembre. Cualquier novedad te avisamos. Saludos!'
        },
        {
            id: 2,
            clienteId: 1,
            asunto: 'Consulta sobre mantenimiento',
            mensaje: '¿Cada cuánto debo hacer mantenimiento al sistema de riego?',
            estado: 'abierta',
            fechaCreacion: '2024-11-03',
            fechaRespuesta: null,
            respuesta: null
        },
        {
            id: 3,
            clienteId: 1,
            asunto: 'Problema con aspersor',
            mensaje: 'Uno de los aspersores instalados no está girando correctamente. ¿Puede ser por la presión?',
            estado: 'respondida',
            fechaCreacion: '2024-10-18',
            fechaRespuesta: '2024-10-20',
            respuesta: 'Hola! Puede ser un tema de presión o que necesite limpieza. Te enviamos un técnico sin cargo esta semana para revisarlo. Te contactamos por teléfono para coordinar.'
        }
    ],

    // Historial de pedidos
    historialPedidos: [
        { pedidoId: 1, estadoAnterior: null, estadoNuevo: 'pendiente', comentario: 'Pedido creado por el cliente', fecha: '2024-10-15' },
        { pedidoId: 1, estadoAnterior: 'pendiente', estadoNuevo: 'en-proceso', comentario: 'Materiales preparados, iniciando instalación', fecha: '2024-10-18' },
        { pedidoId: 1, estadoAnterior: 'en-proceso', estadoNuevo: 'completado', comentario: 'Instalación finalizada y aprobada por el cliente', fecha: '2024-10-24' },
        { pedidoId: 2, estadoAnterior: null, estadoNuevo: 'pendiente', comentario: 'Pedido creado por el cliente', fecha: '2024-10-28' },
        { pedidoId: 2, estadoAnterior: 'pendiente', estadoNuevo: 'en-proceso', comentario: 'Pedido en preparación, falta stock de algunos materiales', fecha: '2024-10-30' },
        { pedidoId: 3, estadoAnterior: null, estadoNuevo: 'pendiente', comentario: 'Pedido creado por el cliente', fecha: '2024-11-01' }
    ]
};

// Funciones auxiliares para manejo de datos
const DataHelper = {
    // Obtener pedidos del cliente actual
    getPedidos: function() {
        return DB.pedidos.filter(p => p.clienteId === DB.clienteActual.id);
    },

    // Obtener un pedido por ID
    getPedidoById: function(id) {
        return DB.pedidos.find(p => p.id === id && p.clienteId === DB.clienteActual.id);
    },

    // Crear nuevo pedido
    crearPedido: function(pedidoData) {
        const nuevoPedido = {
            id: DB.pedidos.length + 1,
            clienteId: DB.clienteActual.id,
            fecha: new Date().toISOString().split('T')[0],
            estado: 'pendiente',
            ...pedidoData,
            fechaCompletado: null
        };
        DB.pedidos.push(nuevoPedido);
        return nuevoPedido;
    },

    // Obtener presupuestos
    getPresupuestos: function() {
        return DB.presupuestos.filter(p => p.clienteId === DB.clienteActual.id);
    },

    // Crear nuevo presupuesto
    crearPresupuesto: function(presupuestoData) {
        const nuevoPresupuesto = {
            id: DB.presupuestos.length + 1,
            clienteId: DB.clienteActual.id,
            fechaSolicitud: new Date().toISOString().split('T')[0],
            estado: 'pendiente',
            montoEstimado: null,
            fechaRespuesta: null,
            observaciones: null,
            ...presupuestoData
        };
        DB.presupuestos.push(nuevoPresupuesto);
        return nuevoPresupuesto;
    },

    // Obtener consultas
    getConsultas: function() {
        return DB.consultas.filter(c => c.clienteId === DB.clienteActual.id);
    },

    // Crear nueva consulta
    crearConsulta: function(consultaData) {
        const nuevaConsulta = {
            id: DB.consultas.length + 1,
            clienteId: DB.clienteActual.id,
            fechaCreacion: new Date().toISOString().split('T')[0],
            estado: 'abierta',
            fechaRespuesta: null,
            respuesta: null,
            ...consultaData
        };
        DB.consultas.push(nuevaConsulta);
        return nuevaConsulta;
    },

    // Obtener materiales faltantes
    getMaterialesFaltantes: function() {
        const pedidosEnProceso = DB.pedidos.filter(p => 
            p.clienteId === DB.clienteActual.id && p.estado === 'en-proceso'
        );
        
        return DB.materialesFaltantes.filter(mf => 
            pedidosEnProceso.some(p => p.id === mf.pedidoId)
        );
    },

    // Obtener producto por ID
    getProductoById: function(id) {
        return DB.productos.find(p => p.id === id);
    },

    // Obtener todos los productos
    getProductos: function() {
        return DB.productos;
    },

    // Calcular estadísticas
    getEstadisticas: function() {
        const pedidos = this.getPedidos();
        const presupuestos = this.getPresupuestos();
        const consultas = this.getConsultas();

        return {
            pedidosActivos: pedidos.filter(p => p.estado === 'en-proceso' || p.estado === 'pendiente').length,
            pedidosCompletados: pedidos.filter(p => p.estado === 'completado').length,
            presupuestosPendientes: presupuestos.filter(p => p.estado === 'pendiente').length,
            consultasAbiertas: consultas.filter(c => c.estado === 'abierta' || c.estado === 'en-revision').length
        };
    },

    // Formatear fecha
    formatearFecha: function(fecha) {
        if (!fecha) return '-';
        const f = new Date(fecha);
        return f.toLocaleDateString('es-AR', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        });
    },

    // Formatear precio
    formatearPrecio: function(precio) {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(precio);
    },

    // Validar login
    validarLogin: function(username, password) {
        if (username === DB.clienteActual.username && password === DB.clienteActual.password) {
            return DB.clienteActual;
        }
        return null;
    }
};