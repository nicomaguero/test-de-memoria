// Espera a que todo el contenido de la página esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- SELECCIÓN DE ELEMENTOS DEL DOM ---
    const backgroundCanvas = document.getElementById('backgroundCanvas');
    const backgroundCtx = backgroundCanvas.getContext('2d');
    const drawingCanvas = document.getElementById('drawingCanvas');
    const drawingCtx = drawingCanvas.getContext('2d');

    const colorPicker = document.getElementById('colorPicker');
    const lineWidthInput = document.getElementById('lineWidth');
    const pencilBtn = document.getElementById('pencilBtn');
    const eraserBtn = document.getElementById('eraserBtn');
    const randomBtn = document.getElementById('randomBtn');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');

    // --- CONFIGURACIÓN INICIAL ---
    const coloringImages = [
        'assets/images/coloring/dibujo1.png',
        'assets/images/coloring/dibujo2.png',
        'assets/images/coloring/dibujo3.png',
        'assets/images/coloring/dibujo4.png',
        'assets/images/coloring/dibujo5.png'
    ];
    let currentImage = new Image();
    let isDrawing = false;
    let isErasing = false;

    [backgroundCanvas, drawingCanvas].forEach(canvas => {
        canvas.width = 800;
        canvas.height = 600;
    });
    
    drawingCtx.lineWidth = lineWidthInput.value;
    drawingCtx.lineCap = 'round';

    // --- FUNCIONES ---

    function loadImage(src) {

	currentImage.crossOrigin = "Anonymous"; // Esto es clave para la seguridad CORS

        currentImage.src = src;
        currentImage.onload = () => {
            backgroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
            drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

            const scale = Math.min(backgroundCanvas.width / currentImage.width, backgroundCanvas.height / currentImage.height);
            const x = (backgroundCanvas.width / 2) - (currentImage.width / 2) * scale;
            const y = (backgroundCanvas.height / 2) - (currentImage.height / 2) * scale;
            backgroundCtx.drawImage(currentImage, x, y, currentImage.width * scale, currentImage.height * scale);
        };
    }

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function stopDrawing() {
        isDrawing = false;
        drawingCtx.beginPath();
    }

    function draw(e) {
        if (!isDrawing) return;

        const rect = drawingCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        drawingCtx.strokeStyle = colorPicker.value;
        drawingCtx.lineWidth = lineWidthInput.value;

        if (isErasing) {
            drawingCtx.globalCompositeOperation = 'destination-out';
        } else {
            drawingCtx.globalCompositeOperation = 'source-over';
        }

        drawingCtx.lineTo(x, y);
        drawingCtx.stroke();
        drawingCtx.beginPath();
        drawingCtx.moveTo(x, y);
    }
    
    function loadRandomImage() {
        const randomIndex = Math.floor(Math.random() * coloringImages.length);
        loadImage(coloringImages[randomIndex]);
    }

    // --- EVENT LISTENERS ---

    drawingCanvas.addEventListener('mousedown', startDrawing);
    drawingCanvas.addEventListener('mouseup', stopDrawing);
    drawingCanvas.addEventListener('mouseout', stopDrawing);
    drawingCanvas.addEventListener('mousemove', draw);
    
    colorPicker.addEventListener('change', () => {
        isErasing = false;
        pencilBtn.classList.add('active');
        eraserBtn.classList.remove('active');
    });
    
    lineWidthInput.addEventListener('input', (e) => {
        drawingCtx.lineWidth = e.target.value;
    });

    pencilBtn.addEventListener('click', () => {
        isErasing = false;
        pencilBtn.classList.add('active');
        eraserBtn.classList.remove('active');
    });

    eraserBtn.addEventListener('click', () => {
        isErasing = true;
        eraserBtn.classList.add('active');
        pencilBtn.classList.remove('active');
    });

    randomBtn.addEventListener('click', loadRandomImage);
    
    clearBtn.addEventListener('click', () => {
        drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    });

    // --- LÓGICA DE GUARDADO CORREGIDA ---
    saveBtn.addEventListener('click', () => {
        // 1. Crear un lienzo temporal en la memoria
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');

        // 2. Establecer las dimensiones del lienzo temporal
        tempCanvas.width = backgroundCanvas.width;
        tempCanvas.height = backgroundCanvas.height;

        // 3. Dibujar el canvas de fondo (la imagen original) en el lienzo temporal
        tempCtx.drawImage(backgroundCanvas, 0, 0);

        // 4. Dibujar el canvas de dibujo (lo que pintó el usuario) encima
        tempCtx.drawImage(drawingCanvas, 0, 0);

        // 5. Obtener la URL de datos del lienzo temporal combinado
        const dataURL = tempCanvas.toDataURL('image/png');

        // 6. Crear un enlace temporal para iniciar la descarga
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'mi-dibujo-coloreado.png';

        // 7. Simular un clic en el enlace para descargar y luego eliminarlo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    // --- INICIALIZACIÓN ---
    loadRandomImage();
});