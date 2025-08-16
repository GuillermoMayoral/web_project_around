# Tripleten Web Project: Around

## Descripción

Este proyecto es un perfil interactivo tipo blog, donde se muestran **cards con publicaciones**, y se puede editar el perfil con **nombre y descripción**.  
El objetivo fue practicar **diseño responsive**, **organización con BEM**, y **funcionalidad dinámica con JavaScript**.

---

page: https://guillermomayoral.github.io/web_project_around/

---

## Tecnologías utilizadas

- **HTML5**: Estructura del contenido.
- **CSS3**: Estilos, Flexbox y diseño responsive con valores relativos y `max-width`.
- **JavaScript (Vanilla)**: Funcionalidad de botones, formulario y activadores de modificadores.
- **Arquitectura BEM**: Organización de clases CSS clara y escalable.

---

## BEM aplicado en el proyecto

Se utilizó la metodología **BEM (Block, Element, Modifier)** para mantener el código modular y consistente.

- **Bloques**: componentes independientes, como `profile`, `post`, `popup`.
- **Elementos**: partes internas de un bloque, ejemplo `post__card`, `profile__name`.
- **Modificadores**: variaciones o estados, como `popup--disabled` o `post__icon--active`.

### Ejemplo en el proyecto

```html
<li class="post__card">
  <img
    class="post__images"
    src="./images/card-valle.jpg"
    alt="Valle de Yosemite"
  />
  <div class="post__description">
    <h2 class="post__title">Valle de Yosemite</h2>
    <img
      src="./images/heart-icon.svg"
      alt="logo me gusta"
      class="post__icon post__icon--active"
    />
  </div>
</li>
```

## Explicación de BEM en el proyecto

- `post` → **Block** (tarjeta de publicación).
- `post__card`, `post__images`, `post__description`, `post__title`, `post__icon` → **Elements** del bloque.
- `post__icon--active` → **Modifier**, usado por JavaScript para cambiar el color del corazón al presionarlo.

Otro ejemplo:

```html
<div class="popup popup--disabled">...</div>
```

popup → Block

popup--disabled → Modifier, controla la visibilidad del popup mediante JS.

## Estructura de la página

1. **Header**
   - Logo y línea divisoria, centrados con Flexbox.
2. **Main**
   - **Profile**: foto, nombre, descripción y botón de editar (abre popup).
   - **Post**: lista de cards de publicaciones, cada una con título e icono de “me gusta”.
3. **Popup**
   - Formulario para editar nombre y descripción del perfil.
   - Se activa/desactiva con el modificador `popup--disabled`.
4. **Footer**
   - Información de copyright.

## Funcionalidad JavaScript

### Popup

- Botón editar (`.profile__edit-button`) abre el popup eliminando `popup--disabled`.
- Botón cerrar (`.popup__close`) cierra el popup agregando `popup--disabled`.
- Formulario guarda cambios de nombre y descripción y cierra el popup.

```js
btneEditButton.addEventListener("click", openPopUp);
btnClosePopUp.addEventListener("click", closePopUp);
btnChangeName.addEventListener("click", editName);
```

## Corazones de las publicaciones

- Cada icono `.post__icon` alterna la clase `post__icon--active` al hacer clic.
- Esto cambia visualmente el estado del corazón.

```js
heartButtons.forEach((button) => {
  button.addEventListener("click", toggleHeart);
});
```

## Responsive y diseño

- **Mobile-first**: el diseño empieza optimizado para móvil (320px).
- **Puntos de quiebre**: tablet (~544px) y desktop (~880px).
- **Flexbox y max-width** para que los bloques crezcan/reduzcan suavemente.
- **Bordes redondeados y overflow hidden** en cards y popup para imágenes redondeadas.

---

## Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio.
2. Abrir `index.html` en el navegador.
3. Interactuar con el perfil, las cards y el popup.

## Cómo ver el proyecto

1. Git page: https://guillermomayoral.github.io/web_project_around/
2. Interactuar con el perfil, las cards y el popup.
