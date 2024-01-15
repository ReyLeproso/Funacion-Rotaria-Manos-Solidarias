// Obtener la lista de archivos al cargar la página
window.onload = function () {
    fetch('/archivos')
        .then(response => response.json())
        .then(data => {
            const listaArchivos = document.getElementById('listaArchivos');
            data.archivos.forEach(archivo => {
                const elementoLista = document.createElement('li');
                elementoLista.textContent = archivo;
                listaArchivos.appendChild(elementoLista);
            });
        })
        .catch(error => console.error('Error:', error));
};

// Descargar archivos seleccionados
function descargarArchivos() {
    const archivosSeleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
    if (archivosSeleccionados.length === 0) {
        alert('Selecciona al menos un archivo para descargar.');
        return;
    }

    const archivosDescargar = Array.from(archivosSeleccionados).map(checkbox => checkbox.value);
    const url = '/descargar?archivos=' + encodeURIComponent(JSON.stringify(archivosDescargar));
    window.location.href = url;
}
