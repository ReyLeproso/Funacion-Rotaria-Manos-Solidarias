document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.getElementById("dropArea");
    const input = document.getElementById("input-file");
    const fileList = document.getElementById("fileList");

    dropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropArea.classList.add("active");
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("active");
    });

    dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        dropArea.classList.remove("active");
        handleFiles(e.dataTransfer.files);
    });

    input.addEventListener("change", () => {
        handleFiles(input.files);
    });

    function handleFiles(files) {
        fileList.innerHTML = ""; // Limpiar la lista de archivos

        for (const file of files) {
            const listItem = document.createElement("div");
            listItem.className = "file-item";

            const fileName = document.createElement("span");
            fileName.textContent = file.name;

            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(file);
            downloadLink.download = file.name;
            downloadLink.textContent = "Descargar";

            listItem.appendChild(fileName);
            listItem.appendChild(downloadLink);

            fileList.appendChild(listItem);
        }
    }
});
