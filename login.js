        function mostrarRegistro() {
            document.getElementById('formularioInicioSesion').classList.add('oculto');
            document.getElementById('formularioRegistro').classList.remove('oculto');
        }
        
        function mostrarInicioSesion() {
            document.getElementById('formularioRegistro').classList.add('oculto');
            document.getElementById('formularioInicioSesion').classList.remove('oculto');
        }
        
        // Manejar envío de formularios
        document.getElementById('formularioInicioSesion').addEventListener('submit', function(evento) {
            evento.preventDefault();
        });
        
        document.getElementById('formularioRegistro').addEventListener('submit', function(evento) {
            evento.preventDefault();
        });