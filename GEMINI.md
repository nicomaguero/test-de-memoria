# GEMINI.md - Manifiesto de Desarrollo del Proyecto

Este archivo documenta las convenciones, buenas prácticas y directrices que se seguirán durante el desarrollo de este proyecto web. El objetivo es mantener un código limpio, legible y escalable.

## 1. Filosofía del Proyecto

- **Simplicidad Primero:** Empezamos con una base estática (HTML, CSS, JS) para consolidar los fundamentos. La complejidad se añadirá de forma incremental y justificada.
- **Escalabilidad:** La estructura de archivos y el código se diseñan pensando en el futuro, para poder integrar nuevas funcionalidades, frameworks o un backend sin tener que rehacer todo.
- **Buenas Prácticas Modernas:** Se seguirán las convenciones actuales de desarrollo web para HTML5 semántico, CSS con variables y JavaScript moderno.

## 2. Lenguaje y Comunicación

- **Idioma Principal:** Todo el código (comentarios, variables, funciones) y la documentación se escribirán en **castellano** para mantener la coherencia y facilitar la comprensión. El texto visible para el usuario también será en castellano.

## 3. Estándares de Código

- **HTML:** Se utilizará HTML5 semántico. Las etiquetas se usarán por su significado, no solo por su apariencia (`<header>`, `<main>`, `<nav>`, `<section>`, etc.).
- **CSS:** Se organizará el CSS de forma lógica. Se priorizará el uso de variables CSS (`:root`) para temas y consistencia. Se utilizará un enfoque de clases reutilizables.
- **JavaScript:** El código será limpio y modular. A medida que crezca, se organizará en funciones y módulos para evitar la contaminación del scope global.
- **Formateo:** Se mantendrá un formato de código consistente (indentación, espaciado) para mejorar la legibilidad. Se recomienda el uso de un formateador automático como Prettier.

## 4. Control de Versiones (Git)

- **Commits Atómicos:** Cada `commit` representará un cambio lógico y completo.
- **Mensajes de Commit Claros:** Los mensajes seguirán un formato convencional (ej. `feat: Añade formulario de registro`, `fix: Corrige estilo del botón principal`, `docs: Actualiza GEMINI.md`).
- **Rama Principal:** La rama `main` siempre contendrá la versión estable y desplegable del proyecto. El desarrollo de nuevas funcionalidades se realizará en ramas separadas (ej. `feature/juego-memoria`).

## 5. Proceso de Actualización (Gemini CLI)

- **Gemini CLI:** Se utilizará la asistencia de Gemini para generar, refactorizar y documentar código. Las interacciones y los prompts utilizados para modificar el código se podrán registrar aquí o en los mensajes de commit para tener un historial de cómo la IA ha contribuido al desarrollo.

---