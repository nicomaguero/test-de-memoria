document.addEventListener('DOMContentLoaded', () => {

    const backgroundCanvas = document.getElementById('backgroundCanvas');
    const backgroundCtx = backgroundCanvas.getContext('2d');
    const drawingCanvas = document.getElementById('drawingCanvas');
    const drawingCtx = drawingCanvas.getContext('2d', { willReadFrequently: true }); // Optimización para lectura

    // Selección de herramientas
    const colorPicker = document.getElementById('colorPicker');
    const lineWidthInput = document.getElementById('lineWidth');
    const pencilBtn = document.getElementById('pencilBtn');
    const eraserBtn = document.getElementById('eraserBtn');
    const randomBtn = document.getElementById('randomBtn');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Configuración inicial
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
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
    });
    
    drawingCtx.lineWidth = lineWidthInput.value;
    drawingCtx.lineCap = 'round';
    drawingCtx.lineJoin = 'round';


    // --- FUNCIONES ---

    function loadImage(src) {
        currentImage.crossOrigin = "Anonymous";
        currentImage.src = src;
        currentImage.onload = () => {
            backgroundCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
            drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

            const canvasAspectRatio = backgroundCanvas.width / backgroundCanvas.height;
            const imageAspectRatio = currentImage.width / currentImage.height;
            let drawWidth, drawHeight, x, y;

            if (imageAspectRatio > canvasAspectRatio) {
                drawWidth = backgroundCanvas.width;
                drawHeight = drawWidth / imageAspectRatio;
            } else {
                drawHeight = backgroundCanvas.height;
                drawWidth = drawHeight * imageAspectRatio;
            }

            x = (backgroundCanvas.width - drawWidth) / 2;
            y = (backgroundCanvas.height - drawHeight) / 2;

            backgroundCtx.drawImage(currentImage, x, y, drawWidth, drawHeight);
        };
    }

    function getCoordinates(event) {
        const rect = drawingCanvas.getBoundingClientRect();
        let x, y;

        if (event.touches) {
            // Evento táctil
            if (event.touches.length > 0) {
              x = event.touches[0].clientX - rect.left;
              y = event.touches[0].clientY - rect.top;
            }
        } else {
            // Evento de mouse
            x = event.clientX - rect.left;
            y = event.clientY - rect.top;
        }
        return { x, y };
    }

    function startDrawing(event) {
        isDrawing = true;
        draw(event);
    }

    function stopDrawing() {
        if (isDrawing) {
          isDrawing = false;
          drawingCtx.beginPath();
        }
    }

    function draw(event) {
        if (!isDrawing) return;
        event.preventDefault(); // Previene el scroll mientras se dibuja

        const { x, y } = getCoordinates(event);
        if (x === undefined || y === undefined) return;

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

    // Eventos de Mouse
    drawingCanvas.addEventListener('mousedown', startDrawing);
    drawingCanvas.addEventListener('mousemove', draw);
    drawingCanvas.addEventListener('mouseup', stopDrawing);
    drawingCanvas.addEventListener('mouseout', stopDrawing); // Si el mouse sale del canvas

    // Eventos Táctiles
    drawingCanvas.addEventListener('touchstart', startDrawing);
    drawingCanvas.addEventListener('touchmove', draw);
    drawingCanvas.addEventListener('touchend', stopDrawing);
    drawingCanvas.addEventListener('touchcancel', stopDrawing); // Si el sistema cancela el toque

    // Eventos de Herramientas
    colorPicker.addEventListener('change', () => { isErasing = false; });
    lineWidthInput.addEventListener('input', (e) => { drawingCtx.lineWidth = e.target.value; });
    pencilBtn.addEventListener('click', () => { isErasing = false; });
    eraserBtn.addEventListener('click', () => { isErasing = true; });
    randomBtn.addEventListener('click', loadRandomImage);
    clearBtn.addEventListener('click', () => { drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height); });
    saveBtn.addEventListener('click', () => {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = backgroundCanvas.width;
        tempCanvas.height = backgroundCanvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(backgroundCanvas, 0, 0);
        tempCtx.drawImage(drawingCanvas, 0, 0);
        const link = document.createElement('a');
        link.download = 'mi-dibujo-coloreado.png';
        link.href = tempCanvas.toDataURL('image/png');
        link.click();
    });
    
    // Inicialización
    loadRandomImage();
});