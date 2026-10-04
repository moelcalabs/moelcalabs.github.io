/* =========================================================
   CONFIGURACIÓN · edita solo esta parte para actualizar datos
   ========================================================= */
const CONFIG = {
  correo:     "moisescastillo1605@gmail.com",      // después: contacto@moelca.cl
  whatsapp:   "56972537556",                         // número: 569 + 8 dígitos, sin + ni espacios
  linkedin:   "https://www.linkedin.com/in/moises-castillo-a2a23921a", // URL de tu perfil
  formspree:  "mrpbnwek"                             // ID de Formspree. Vacío = el formulario abre tu correo
};

/* PROYECTOS · para agregar uno, copia un bloque { ... } y cambia los textos.
   tipo: "corporativo" | "landing" | "sistema"
   estado: "Concepto" o "Prototipo" mientras no sea un cliente real con permiso escrito. */
const PROYECTOS = [
  { tipo:"corporativo", estado:"Concepto", rubro:"Industria",
    titulo:"Sitio para empresa de servicios industriales",
    resumen:"Una empresa técnica necesita mostrar sus servicios y recibir solicitudes de cotización sin depender solo del teléfono.",
    incluye:["Catálogo de servicios con fichas","Formulario de cotización por servicio","Sección de certificaciones y contacto"],
    tech:["HTML","CSS","JavaScript"] },
  { tipo:"landing", estado:"Concepto", rubro:"Salud",
    titulo:"Landing para consulta o centro de salud",
    resumen:"Pacientes que buscan en el celular necesitan ver especialidades, horarios y pedir hora en pocos toques.",
    incluye:["Especialidades y equipo","Botón directo a WhatsApp","Mapa, horarios y previsiones"],
    tech:["HTML","CSS","JavaScript"] },
  { tipo:"sistema", estado:"Prototipo", rubro:"Servicios",
    titulo:"Sistema de reservas en línea",
    resumen:"Un negocio que agenda por mensajes (taller, peluquería, cancha) pierde horas y tiene choques de horario.",
    incluye:["Calendario de horas disponibles","Confirmación automática al cliente","Panel del dueño con la agenda del día"],
    tech:["React","JavaScript"] },
  { tipo:"sistema", estado:"Prototipo", rubro:"Comercio",
    titulo:"Panel de inventario para pyme",
    resumen:"Una tienda controla su stock en planillas y se entera tarde cuando un producto se agota.",
    incluye:["Registro de entradas y salidas","Alertas de stock bajo","Resumen de productos más vendidos"],
    tech:["React","JavaScript"] },
  { tipo:"corporativo", estado:"Concepto", rubro:"Educación",
    titulo:"Sitio para academia o centro de capacitación",
    resumen:"Una academia necesita publicar sus cursos con fechas y recibir inscripciones ordenadas.",
    incluye:["Catálogo de cursos con filtros","Ficha de cada curso","Formulario de inscripción"],
    tech:["HTML","CSS","JavaScript"] },
  { tipo:"landing", estado:"Concepto", rubro:"Gastronomía",
    titulo:"Menú digital con pedidos por WhatsApp",
    resumen:"Un local de comida quiere un menú que se actualice fácil y que permita pedir para retiro desde el celular.",
    incluye:["Menú por categorías con precios","Carro simple de pedido","Envío del pedido armado por WhatsApp"],
    tech:["HTML","CSS","JavaScript"] }
];

/* ===================== No necesitas editar desde aquí ===================== */
const $ = s => document.querySelector(s);
const TIPOS = { corporativo:"Sitio corporativo", landing:"Landing page", sistema:"Sistema web" };

function thumb(tipo){
  if (tipo === "landing") return `<div class="bar" style="width:30%"></div>
    <div class="row" style="grid-template-columns:1.3fr 1fr;flex:1"><div class="row"><div class="box" style="height:14px;width:85%"></div><div class="box" style="height:8px;width:65%"></div><div class="box acc" style="height:14px;width:40%;margin-top:6px"></div></div><div class="box"></div></div>`;
  if (tipo === "sistema") return `<div class="row" style="grid-template-columns:22% 1fr;height:100%"><div class="box" style="opacity:.7"></div>
    <div class="row" style="grid-template-rows:auto auto 1fr"><div class="row" style="grid-template-columns:repeat(3,1fr)"><div class="box" style="height:26px"></div><div class="box" style="height:26px"></div><div class="box acc" style="height:26px"></div></div><div class="bar" style="width:50%"></div><div class="box"></div></div></div>`;
  return `<div class="row" style="grid-template-columns:20% 1fr 12%"><div class="bar"></div><span></span><div class="bar"></div></div>
    <div class="box" style="height:42%"></div>
    <div class="row" style="grid-template-columns:repeat(3,1fr)"><div class="box" style="height:30px"></div><div class="box" style="height:30px"></div><div class="box acc" style="height:30px"></div></div>`;
}

function render(filtro){
  const lista = PROYECTOS.filter(p => filtro === "todos" || p.tipo === filtro);
  $("#projectList").innerHTML = lista.map(p => `
    <article class="card">
      <div class="thumb" aria-hidden="true">${thumb(p.tipo)}<span class="stamp">${p.estado}</span></div>
      <div class="body">
        <span class="tag">${p.estado} · ${p.rubro} · ${TIPOS[p.tipo]}</span>
        <h3>${p.titulo}</h3>
        <p>${p.resumen}</p>
        <ul>${p.incluye.map(i => `<li>${i}</li>`).join("")}</ul>
        <div class="chips">${p.tech.map(t => `<span class="chip">${t}</span>`).join("")}</div>
      </div>
    </article>`).join("");
}

/* Animación al hacer scroll, hacia abajo y hacia arriba.
   Cuando un elemento sale de la pantalla se oculta otra vez, recordando por dónde salió,
   para volver a entrar desde ese lado. */
const io = "IntersectionObserver" in window
  ? new IntersectionObserver(es => es.forEach(e => {
      const el = e.target;
      if (e.isIntersecting) { el.classList.add("in"); }
      else {
        el.dataset.from = e.boundingClientRect.top < 0 ? "top" : "bottom";
        el.classList.remove("in");
      }
    }), { threshold: .15, rootMargin: "0px 0px -40px 0px" })
  : null;
function revelar(els, paso = .08){
  els.forEach((el, i) => {
    el.classList.add("reveal"); el.style.setProperty("--d", (i * paso) + "s");
    io ? io.observe(el) : el.classList.add("in");
  });
}

document.querySelectorAll(".filters button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".filters button").forEach(x => x.setAttribute("aria-pressed", x === b));
  render(b.dataset.filter);
  revelar([...document.querySelectorAll("#projectList .card")], .06);
}));
render("todos");

document.querySelectorAll(".sec-head, .notice, .filters").forEach(el => revelar([el], 0));
revelar([...document.querySelectorAll(".svc")]);
revelar([...document.querySelectorAll("#projectList .card")]);
if (matchMedia("(max-width:640px)").matches) revelar([$("#projectList")], 0);
revelar([...document.querySelectorAll(".steps li")], .12);
revelar([...document.querySelectorAll(".portrait, .about .text")], .12);
revelar([...document.querySelectorAll(".channel, #contactForm")], .08);
const steps = document.querySelector(".steps");
io ? io.observe(steps) : steps.classList.add("in");

/* Celular: puntos del carrusel de proyectos */
const list = $("#projectList"), dotsNav = $("#dotsNav");
function pintarPuntos(){
  const cards = [...list.children];
  dotsNav.innerHTML = cards.map(() => "<i></i>").join("");
  marcarPunto();
}
function marcarPunto(){
  const cards = [...list.children]; if (!cards.length) return;
  const centro = list.scrollLeft + list.clientWidth / 2;
  let idx = 0, mejor = Infinity;
  cards.forEach((c, i) => { const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - centro); if (d < mejor) { mejor = d; idx = i; } });
  [...dotsNav.children].forEach((d, i) => d.classList.toggle("on", i === idx));
}
list.addEventListener("scroll", marcarPunto, { passive: true });
document.querySelectorAll(".filters button").forEach(b => b.addEventListener("click", () => { list.scrollLeft = 0; pintarPuntos(); }));
pintarPuntos();

/* Celular: botón flotante de WhatsApp, se oculta cuando ya se ve la sección Contacto */
const fab = $("#fab");
fab.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent("Hola Moisés, vi tu sitio MOELCA LABS y quiero conversar sobre un proyecto.");
if (io) new IntersectionObserver(es => es.forEach(e => fab.classList.toggle("hide", e.isIntersecting)), { threshold: .1 }).observe($("#contacto"));

/* Cerrar el menú al tocar fuera de él */
document.addEventListener("click", e => {
  if (nav.dataset.open === "true" && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
    nav.dataset.open = "false"; menuBtn.setAttribute("aria-expanded", "false");
  }
});

/* Sombra de la cabecera al bajar */
addEventListener("scroll", () => document.querySelector(".top").classList.toggle("scrolled", scrollY > 8), { passive: true });

/* Contacto */
$("#chMail").href = "mailto:" + CONFIG.correo;
$("#txtMail").textContent = CONFIG.correo;
$("#chWa").href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent("Hola Moisés, vi tu sitio MOELCA LABS y quiero conversar sobre un proyecto.");
$("#txtWa").textContent = "+" + CONFIG.whatsapp.replace(/^(\d{2})(\d)(\d{4})(\d{4})$/, "$1 $2 $3 $4");
$("#chIn").href = CONFIG.linkedin;

$("#contactForm").addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target, msg = $("#formMsg");
  if (!f.checkValidity()) { msg.textContent = "Completa tu nombre, un correo válido y tu mensaje."; f.reportValidity(); return; }
  const d = Object.fromEntries(new FormData(f));
  if (CONFIG.formspree) {
    msg.textContent = "Enviando…";
    try {
      const datos = new FormData(f);
      datos.set("email", d.correo);                       // Formspree usa "email" para "Responder a"
      datos.set("_subject", "Nuevo contacto desde moelcalabs.github.io: " + d.tipo);
      const r = await fetch("https://formspree.io/f/" + CONFIG.formspree, { method:"POST", headers:{ "Accept":"application/json" }, body:datos });
      if (!r.ok) throw new Error();
      f.reset(); msg.textContent = "¡Mensaje enviado! Te responderé a tu correo.";
    } catch { msg.textContent = "No se pudo enviar. Escríbeme directo a " + CONFIG.correo; }
  } else {
    const cuerpo = `Nombre: ${d.nombre}\nEmpresa: ${d.empresa || "-"}\nCorreo: ${d.correo}\nNecesito: ${d.tipo}\n\n${d.mensaje}`;
    location.href = "mailto:" + CONFIG.correo + "?subject=" + encodeURIComponent("Proyecto: " + d.tipo) + "&body=" + encodeURIComponent(cuerpo);
    msg.textContent = "Se abrió tu programa de correo con el mensaje listo para enviar.";
  }
});

/* Menú móvil */
const nav = $("#nav"), menuBtn = $("#menuBtn");
menuBtn.addEventListener("click", () => {
  const open = nav.dataset.open !== "true";
  nav.dataset.open = open; menuBtn.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { nav.dataset.open = "false"; menuBtn.setAttribute("aria-expanded", "false"); }));

/* Modo claro / oscuro */
const root = document.documentElement, themeBtn = $("#themeBtn");
const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
function paintBtn(){ const dark = isDark(); themeBtn.innerHTML = `<svg width="20" height="20"><use href="#i-${dark ? "sun" : "moon"}"/></svg>`; themeBtn.setAttribute("aria-label", dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"); }
try { const t = localStorage.getItem("moelca-theme"); if (t) root.dataset.theme = t; } catch {}
themeBtn.addEventListener("click", () => {
  root.dataset.theme = isDark() ? "light" : "dark";
  try { localStorage.setItem("moelca-theme", root.dataset.theme); } catch {}
  paintBtn();
});
paintBtn();
$("#year").textContent = new Date().getFullYear();
