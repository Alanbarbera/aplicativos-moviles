// ============================================
// AUTH.JS - Gestión de autenticación
// ============================================

let usuarioActual = null;

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay sesión activa
    const sesion = sessionStorage.getItem('sesionCliente');
    if (sesion) {
        usuarioActual = JSON.parse(sesion);
        mostrarApp();
    } else {
        mostrarLogin();
    }

    // Evento de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Manejar login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validar credenciales
    const usuario = DataHelper.validarLogin(username, password);
    
    if (usuario) {
        usuarioActual = usuario;
        sessionStorage.setItem('sesionCliente', JSON.stringify(usuario));
        mostrarApp();
    } else {
        mostrarAlertaInterna('Usuario o contraseña incorrectos', 'error');
    }
}

// Mostrar pantalla de login
function mostrarLogin() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('appContainer').classList.remove('active');
    document.getElementById('appContainer').style.display = 'none';
}

// Mostrar aplicación
function mostrarApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appContainer').classList.add('active');
    document.getElementById('appContainer').style.display = 'block';
    
    // Actualizar nombre de usuario
    document.getElementById('userNameDisplay').textContent = usuarioActual.nombre;
    
    // Inicializar la aplicación
    if (typeof inicializarApp === 'function') {
        inicializarApp();
    }
}

// Cerrar sesión
function logout() {
    sessionStorage.removeItem('sesionCliente');
    usuarioActual = null;
    mostrarLogin();
    
    // Limpiar formularios
    document.getElementById('loginForm').reset();
}

// Obtener usuario actual
function getUsuarioActual() {
    return usuarioActual;
}