// ============================
// Utilidades
// ============================
function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return document.querySelectorAll(sel); }

// ============================
// CONFIG: Enlace a carpeta FDS (PEGA AQUÍ TU LINK DE DRIVE)
// ============================
const FDS_DRIVE_URL = "https://drive.google.com/drive/folders/1Cf2RaN5lxndMCF7OzfBgVfTaPd8Q6ivs?usp=drive_link";

// ============================
// Descarga del reglamento (ajusta ruta si cambias el nombre)
// ============================
function descargarReglamento() {
  window.location.href = "assets/docs/Acuerdo_69_2022_Reglamento_Laboratorios.pdf";
}

// ============================
// Menú móvil (toggle)
// ============================
(function setupMobileNav(){
  const btn = qs("#navToggle");
  const nav = qs(".nav");

  if(!btn || !nav) return;

  const setExpanded = (value) => btn.setAttribute("aria-expanded", value ? "true" : "false");

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    setExpanded(open);
  });

  qsa(".nav__link").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      setExpanded(false);
    });
  });

  document.addEventListener("click", (e) => {
    const clickedInside = nav.contains(e.target) || btn.contains(e.target);
    if(!clickedInside){
      nav.classList.remove("is-open");
      setExpanded(false);
    }
  });
})();

// ============================
// Botón "Ver normativa" del hero
// ============================
(function setupScrollButtons(){
  const btn = qs("#btnScrollNormativa");
  if(btn){
    btn.addEventListener("click", () => {
      const target = qs("#normativa");
      if(target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
})();

// ============================
// Footer: año y fecha simple
// ============================
(function setupFooterDates(){
  const yearEl = qs("#year");
  const lastEl = qs("#lastUpdate");

  const now = new Date();
  if(yearEl) yearEl.textContent = String(now.getFullYear());

  if(lastEl){
    try{
      lastEl.textContent = new Intl.DateTimeFormat("es-CO", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }).format(now);
    } catch {
      lastEl.textContent = now.toLocaleDateString();
    }
  }
})();

// ============================
// Configurar botón FDS
// ============================
(function setupFDSLink(){
  const btn = qs("#btnFDS");
  if(!btn) return;

  if(!FDS_DRIVE_URL || FDS_DRIVE_URL.includes("PEGA_AQUI")){
    btn.setAttribute("href", "#");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Aún no se configuró el enlace de Drive para las FDS. Edita js/main.js y pega el link en FDS_DRIVE_URL.");
    });
    return;
  }

  btn.setAttribute("href", FDS_DRIVE_URL);
})();

// ============================
// Copiar correo (Contacto)
// ============================
(function setupCopyEmail(){
  const btn = qs("#copyEmailBtn");
  const hint = qs("#copyHint");
  if(!btn) return;

  btn.addEventListener("click", async () => {
    const value = btn.getAttribute("data-copy") || "";
    try{
      await navigator.clipboard.writeText(value);
      if(hint) hint.textContent = "Correo copiado al portapapeles ✅";
      setTimeout(() => { if(hint) hint.textContent = ""; }, 2500);
    } catch {
      if(hint) hint.textContent = "No pude copiar automáticamente. Copia manualmente el correo.";
      setTimeout(() => { if(hint) hint.textContent = ""; }, 3000);
    }
  });
})();
