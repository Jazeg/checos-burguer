/* ============================================================
   Arranque, eventos y cambio de turno. Une carta.js, hoja.js
   y recomendador-vista.js.
   ============================================================ */

function iniciar() {
  actualizarTurno(true);
  pintarPie();
  restaurarContacto();
  pintarPedido();

  document.addEventListener("click", e => {
    const b = e.target.closest("button, [data-ir]");
    if (!b) return;
    if (b.dataset.producto) abrirProducto(b.dataset.producto);
    if (b.dataset.turno) { turnoManual = b.dataset.turno; actualizarTurno(true); }
    if (b.id === 'turno-auto') { turnoManual = null; actualizarTurno(true); }
    if (b.dataset.agregar) sumarAlPedido(b.dataset.agregar, 1);
    if (b.dataset.mas) sumarAlPedido(b.dataset.mas, 1);
    if (b.dataset.menos) sumarAlPedido(b.dataset.menos, -1);
    if (b.dataset.eliminar) eliminarDelPedido(b.dataset.eliminar);
    if (b.dataset.ir) $(b.dataset.ir).scrollIntoView({ behavior: "smooth", block: "start" });

    if ("recomCasa" in b.dataset) { estadoRecom.modo = "casa"; estadoRecom.paso = "casa-personas"; pintarRecomendador(); }
    if ("recomGustos" in b.dataset) { estadoRecom.modo = "gustos"; estadoRecom.paso = "gustos-saciedad"; pintarRecomendador(); }
    if (b.dataset.personas) { estadoRecom.personas = b.dataset.personas; estadoRecom.paso = "casa-saciedad"; pintarRecomendador(); }
    if (b.dataset.saciedad) {
      estadoRecom.saciedad = b.dataset.saciedad;
      if (estadoRecom.modo === "casa") siguienteRecomendacion();
      else { estadoRecom.paso = "gustos-picante"; pintarRecomendador(); }
    }
    if (b.dataset.picante) { estadoRecom.picante = b.dataset.picante; siguienteRecomendacion(); }
    if ("recomOtra" in b.dataset) siguienteRecomendacion();
    if ("recomReset" in b.dataset) {
      estadoRecom.paso = "inicio"; estadoRecom.modo = null;
      estadoRecom.personas = estadoRecom.saciedad = estadoRecom.picante = null;
      estadoRecom.plato = estadoRecom.platos = null;
      pintarRecomendador();
    }
  });

  $("enviar").addEventListener("click", e => {
    actualizarTurno();
    if (!pedidoDisponible()) { e.preventDefault(); return; }

    if (!detalleValido()) {
      e.preventDefault();
      detalleTocado = true;
      pintarValidacionDetalle();
      $("detalle").focus();
      return;
    }

    const detalle = $("detalle").value.trim();
    guardarContacto(detalle);
    registrarPedidoEnHistorial([...pedido.keys()]);
  });

  $("buscar-carta").addEventListener('input', () => { pintarCarta(); observarCarta(); });
  $("detalle").addEventListener("input", pintarPedido);
  $("detalle").addEventListener("blur", () => { detalleTocado = true; pintarValidacionDetalle(); });

  document.querySelectorAll("[data-modo]").forEach(b => {
    b.addEventListener("click", () => {
      modoEntrega = b.dataset.modo;
      document.querySelectorAll("[data-modo]").forEach(o => {
        const activo = o === b;
        o.setAttribute("aria-pressed", activo);
        o.classList.toggle("bg-ink", activo);
        o.classList.toggle("text-canvas", activo);
      });
      pintarCampoDetalle();
      pintarPedido();
    });
  });

  /* el teclado virtual no cambia innerHeight, solo visualViewport: la
     diferencia entre ambos es lo que el teclado tapa. Ver --teclado en
     styles.css. */
  const vv = window.visualViewport;
  if (vv) {
    const medirTeclado = () => {
      const tapado = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      document.documentElement.style.setProperty("--teclado", Math.round(tapado) + "px");
    };
    vv.addEventListener("resize", medirTeclado);
    vv.addEventListener("scroll", medirTeclado);
    medirTeclado();
  }

  $("detalle").addEventListener("focus", () => {
    setTimeout(() => $("detalle").scrollIntoView({ block: "center", behavior: "smooth" }), 250);
  });

  $("pestana-pedido").addEventListener("click", () => abrirHoja(true));
  $("pestana-pedido").addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrirHoja(true); }
  });
  $("hoja").addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const controls = [...$("hoja").querySelectorAll('button:not([disabled]), input, a[href]:not([aria-disabled="true"])')].filter(el => el.getClientRects().length);
    const first = controls[0], last = controls[controls.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  $("header-pedido").addEventListener('click', () => abrirHoja(true));
  $("producto-cerrar").addEventListener('click', () => $("producto-dialog").close());
  $("producto-dialog").addEventListener('close', () => { document.body.style.overflow = $("hoja").dataset.abierto === "si" ? "hidden" : ""; productoActivo = null; });
  $("producto-dialog").addEventListener('click', e => { if (e.target === $("producto-dialog")) $("producto-dialog").close(); });
  $("producto-pedido").addEventListener('click', () => { $("producto-dialog").close(); abrirHoja(true); });
  $("barra-abrir").addEventListener("click", () => abrirHoja(true));
  $("cerrar-hoja").addEventListener("click", () => abrirHoja(false));
  $("velo").addEventListener("click", () => abrirHoja(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape" && $("hoja").dataset.abierto === "si") abrirHoja(false); });

  setInterval(actualizarTurno, 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) actualizarTurno(); });
  window.addEventListener('focus', () => actualizarTurno());
  window.addEventListener('pageshow', () => actualizarTurno());
}

function actualizarTurno(forzar = false) {
  const siguiente = estadoHorario();
  const cambio = siguiente.activo !== estadoActual.activo;
  if (!forzar && !cambio) return;
  estadoActual = siguiente;
  if (cambio) {
    turnoManual = null;
    $("aviso-turno").textContent = 'Cambió el horario de atención. Actualizamos la carta y conservamos tu pedido para que lo revises.';
  }
  const id = turnoVisible(), turno = TURNOS[id];
  document.body.dataset.turno = id;
  pintarCabecera();
  $("hero-estado").textContent = !estadoActual.activo
    ? `Cerrado · abrimos a las ${horaTexto(TURNOS[estadoActual.siguiente].inicio)}`
    : estadoActual.activo === id ? `${turno.nombre} · disponible ahora` : 'Explora la carta · fuera de horario';
  $("hero-titulo").innerHTML = turno.titulo;
  $("hero-descripcion").textContent = turno.descripcion;
  $("hero-carta").textContent = `Ver ${turno.nombre.toLowerCase()}`;
  $("hero-carta").href = '#' + turno.carta[0].id;
  $("hero-secundario").textContent = turno.secundario.texto;
  $("hero-secundario").href = '#' + turno.secundario.enlace;
  $("marca-bajada").textContent = 'Desayunos & hamburguesas';
  for (const key of Object.keys(TURNOS)) $("horas-" + key).textContent = horarioTurno(key);
  document.querySelectorAll('[data-turno]').forEach(b => b.setAttribute('aria-pressed', b.dataset.turno === id));
  $("turno-auto").hidden = !turnoManual;
  $("turno-estado").textContent = !estadoActual.activo
    ? `Estamos descansando. Abrimos a las ${horaTexto(TURNOS[estadoActual.siguiente].inicio)}. Puedes explorar la carta.`
    : estadoActual.activo === id ? `Disponible ahora · ${turno.nombre} hasta las ${horaTexto(turno.fin)}.`
    : `Estás explorando ${turno.nombre.toLowerCase()}. Disponible de ${horarioTurno(id)}. Ahora servimos ${TURNOS[estadoActual.activo].nombre.toLowerCase()}.`;
  estadoRecom.paso = 'inicio'; estadoRecom.plato = estadoRecom.platos = null;
  pintarPistas(); pintarCarta(); pintarRecomendador(); pintarPedido(); observarCarta();
}

document.addEventListener("DOMContentLoaded", iniciar);
