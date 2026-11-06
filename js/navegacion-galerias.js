(() => {
  const galerias = [
    { visor: 'visor', selector: '.foto-galeria' },
    { visor: 'visorTerminados', selector: '.juego-terminado-imagen', grupo: '.galeria-terminados' },
    { visor: 'indiceVisor', selector: '[data-foto]', grupo: '.indice-items' }
  ];

  galerias.forEach(({ visor: id, selector, grupo }) => {
    const visor = document.getElementById(id);
    if (!visor) return;

    const imagen = visor.querySelector('.visor-imagen');
    let fotos = [];
    let posicion = 0;
    visor.classList.add('visor-navegable');

    function cambiarFoto(paso) {
      posicion = (posicion + paso + fotos.length) % fotos.length;
      const foto = fotos[posicion];
      imagen.src = foto.dataset.foto || foto.dataset.imagen;
      imagen.alt = foto.dataset.nombre || foto.querySelector('img')?.alt || 'Imagen ampliada';
    }

    function crearFlecha(texto, etiqueta, paso, clase) {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = `visor-flecha ${clase}`;
      boton.textContent = texto;
      boton.setAttribute('aria-label', etiqueta);
      boton.hidden = true;
      boton.addEventListener('click', () => cambiarFoto(paso));
      visor.appendChild(boton);
      return boton;
    }

    const anterior = crearFlecha('‹', 'Foto anterior', -1, 'visor-anterior');
    const siguiente = crearFlecha('›', 'Foto siguiente', 1, 'visor-siguiente');

    document.addEventListener('click', evento => {
      const boton = evento.target.closest(selector);
      if (!boton) return;

      const contenedor = grupo ? boton.closest(grupo) : document;
      fotos = Array.from(contenedor.querySelectorAll(selector));
      posicion = fotos.indexOf(boton);
      anterior.hidden = siguiente.hidden = fotos.length < 2;
    }, true);

    document.addEventListener('keydown', evento => {
      if (!(visor.open || visor.classList.contains('abierto')) || fotos.length < 2) return;
      if (evento.key !== 'ArrowLeft' && evento.key !== 'ArrowRight') return;
      evento.preventDefault();
      cambiarFoto(evento.key === 'ArrowLeft' ? -1 : 1);
    });
  });
})();