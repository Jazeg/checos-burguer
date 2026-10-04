/* ============================================================
   "¿No sabes qué pedir?": pasos del cuestionario y resultados.
   La lógica de selección vive en recomendador.js.
   ============================================================ */

/* ---------- "¿no sabes qué pedir?" ---------- */
const estadoRecom = { paso: "inicio", modo: null, personas: null, saciedad: null, picante: null, plato: null, platos: null };

const CHIP = "inline-flex min-h-11 items-center rounded-full border-2 border-ink px-4 font-bold text-ink transition-colors hover:bg-mustard active:scale-95";
const ENLACE = "inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-wider text-muted underline hover:text-ink";
const PASO_LABEL = { "casa-personas": "Pregunta 1 de 2", "casa-saciedad": "Pregunta 2 de 2", "gustos-saciedad": "Pregunta 1 de 2", "gustos-picante": "Pregunta 2 de 2" };

/* envuelve cada estado del widget en su propia animación de entrada;
   la key fuerza a reiniciar la animación aunque el contenido cambie poco */
function envolverRecom(html) {
  return `<div class="recom-entrada">${html}</div>`;
}

function pasoPreguntas(paso, titulo, chips, dataAttr) {
  return envolverRecom(`
    <p class="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">${PASO_LABEL[paso]}</p>
    <h3 class="mb-4 font-display text-2xl font-extrabold uppercase text-ink">${titulo}</h3>
    <div class="flex flex-wrap gap-2">
      ${chips.map(([valor, texto]) => `<button type="button" data-${dataAttr}="${valor}" class="${CHIP}">${texto}</button>`).join("")}
    </div>
    <button type="button" data-recom-reset class="mt-2 ${ENLACE}">Cancelar</button>`);
}

/* tarjeta compacta para el carril de opciones del quiz por gustos */
function tarjetaRecomendada(p, i) {
  return `
    <article class="recom-entrada w-[17rem] shrink-0 snap-start overflow-hidden rounded-2xl border-2 border-ink bg-canvas sm:w-56" style="animation-delay:${i * 90}ms">
      <img src="${p.imagen}" alt="${p.nombre}" class="h-32 w-full border-b-2 border-ink object-cover">
      <div class="p-3.5">
        <h4 class="font-display text-xl font-extrabold uppercase leading-none text-ink">${p.nombre}</h4>
        <p class="mt-1 line-clamp-2 text-xs leading-snug text-muted">${p.desc}</p>
        <div class="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-2 pr-14 sm:pr-0">
          <span class="font-mono text-sm font-medium text-ember">${precioTexto(p)}</span>
          <div class="ml-auto" data-control="${p.id}" data-zona="recom">${controlAgregar(p.id, "recom")}</div>
        </div>
      </div>
    </article>`;
}

function pintarRecomendador() {
  const cuerpo = $("recom-cuerpo");

  if (estadoRecom.paso === "inicio") {
    cuerpo.innerHTML = envolverRecom(`
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-ember">¿No sabes qué pedir?</p>
          <h2 class="font-display text-3xl font-extrabold uppercase leading-none text-ink sm:text-4xl">Te ayudamos a elegir</h2>
        </div>
        <div class="flex flex-wrap gap-3 sm:ml-auto">
          <button type="button" data-recom-casa class="boton-solido rounded-full border-2 border-ink bg-ink px-5 py-2.5 font-bold text-canvas">Deja que decida la casa</button>
          <button type="button" data-recom-gustos class="rounded-full border-2 border-ink px-5 py-2.5 font-bold text-ink hover:bg-hairline">Prefiero elegir por gustos</button>
        </div>
      </div>
      <p class="mt-3 font-mono text-xs text-muted">Guardamos tus gustos y tu dirección solo en este teléfono. Nada se envía a un servidor.</p>`);
    return;
  }

  if (estadoRecom.paso === "casa-personas") {
    cuerpo.innerHTML = pasoPreguntas("casa-personas", "¿Para cuántos pedimos?", [
      ["solo", "Solo yo"], ["dos", "Somos 2"], ["grupo", "Grupo"]
    ], "personas");
    return;
  }

  if (estadoRecom.paso === "casa-saciedad" || estadoRecom.paso === "gustos-saciedad") {
    cuerpo.innerHTML = pasoPreguntas(estadoRecom.paso, "¿Cómo quieres comer hoy?", [
      ["liviano", "Ligero"], ["normal", "Normal"], ["lleno", "Bien lleno"]
    ], "saciedad");
    return;
  }

  if (estadoRecom.paso === "gustos-picante") {
    cuerpo.innerHTML = pasoPreguntas("gustos-picante", "¿Le entras al picante?", [
      ["si", "Sí, dale"], ["no", "Mejor no"], ["indiferente", "Me da igual"]
    ], "picante");
    return;
  }

  if (estadoRecom.paso === "resultado" && estadoRecom.modo === "casa") {
    const plato = estadoRecom.plato;
    if (!plato) {
      cuerpo.innerHTML = envolverRecom(`<p class="text-sm text-muted">Por ahora no queda nada nuevo por recomendarte. <button type="button" data-recom-reset class="${ENLACE}">Volver a intentar</button></p>`);
      return;
    }
    cuerpo.innerHTML = envolverRecom(`
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img src="${plato.imagen}" alt="${plato.nombre}" class="h-28 w-full shrink-0 rounded-xl border-2 border-ink object-cover sm:h-32 sm:w-32">
        <div class="min-w-0 flex-1">
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-ember">La casa recomienda</p>
          <h3 class="font-display text-2xl font-extrabold uppercase leading-none text-ink">${plato.nombre}</h3>
          <p class="mt-1 text-sm text-muted">${plato.desc}</p>
          <div class="mt-3 flex flex-wrap items-center gap-3 pr-14 sm:pr-0">
            <span class="font-mono text-lg font-medium text-ember">${precioTexto(plato)}</span>
            <div data-control="${plato.id}" data-zona="recom">${controlAgregar(plato.id, "recom")}</div>
            <button type="button" data-recom-otra class="${ENLACE}">Prefiero otra</button>
            <button type="button" data-recom-reset class="${ENLACE}">Empezar de nuevo</button>
          </div>
        </div>
      </div>`);
    return;
  }

  if (estadoRecom.paso === "resultado" && estadoRecom.modo === "gustos") {
    const platos = estadoRecom.platos || [];
    if (!platos.length) {
      cuerpo.innerHTML = envolverRecom(`<p class="text-sm text-muted">Por ahora no queda nada nuevo con ese filtro. <button type="button" data-recom-reset class="${ENLACE}">Volver a intentar</button></p>`);
      return;
    }
    cuerpo.innerHTML = envolverRecom(`
      <p class="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ember">Según lo que buscas — agrega las que quieras</p>
      <div class="carril-recom flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory">
        ${platos.map(tarjetaRecomendada).join("")}
      </div>
      <div class="mt-4 flex flex-wrap gap-4">
        <button type="button" data-recom-otra class="${ENLACE}">Ver otras opciones</button>
        <button type="button" data-recom-reset class="${ENLACE}">Empezar de nuevo</button>
      </div>`);
    return;
  }
}

function siguienteRecomendacion() {
  if (estadoRecom.modo === "casa") {
    estadoRecom.plato = recomendarCasa(estadoRecom.personas, estadoRecom.saciedad);
  } else {
    estadoRecom.platos = recomendarListaPorGustos(estadoRecom.saciedad, estadoRecom.picante);
  }
  estadoRecom.paso = "resultado";
  pintarRecomendador();
}
