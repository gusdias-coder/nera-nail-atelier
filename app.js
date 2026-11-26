/* Personalize aqui o número do salão: DDI + DDD + número, somente dígitos.
   Exemplo fictício: "5511999999999". Vazio = demonstração sem destinatário. */
const CONFIG = { salonName: "Aliane Nail Designer", salonWhatsApp: "5547984689177", instagramUrl: "https://www.instagram.com/aliane_nail_designer/", address: "Aliane Nail Designer, Rio Negro - PR" };

const $ = (selector) => document.querySelector(selector);
const steps = [...document.querySelectorAll(".form-step")];
const state = { step: 0, service: "", date: "", time: "", name: "", phone: "", note: "" };
const form = $("#booking-form");
const error = $("#form-error");
const nextButton = $("#next-button");
const backButton = $("#back-button");
const dateInput = $("#booking-date");

$("#year").textContent = new Date().getFullYear();

const localDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const today = new Date();
dateInput.min = localDate(today);
const limit = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 90);
dateInput.max = localDate(limit);

function showError(message) {
  error.textContent = message;
  error.hidden = false;
}
function clearError() {
  error.textContent = "";
  error.hidden = true;
}
function showStep(index, focus = true) {
  state.step = index;
  steps.forEach((step, i) => { step.hidden = i !== index; });
  $("#step-count").textContent = `ETAPA ${String(index + 1).padStart(2, "0")} / 04`;
  $("#progress-fill").style.width = `${(index + 1) * 25}%`;
  backButton.hidden = index === 0;
  const hasSalonNumber = Boolean(CONFIG.salonWhatsApp.replace(/\D/g, ""));
  nextButton.innerHTML = index === 3 ? `${hasSalonNumber ? "Abrir WhatsApp" : "Compartilhar no WhatsApp"} <span aria-hidden="true"><svg class="ui-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></span>` : 'Continuar <span aria-hidden="true"><svg class="ui-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg></span>';
  $("#share-notice").hidden = hasSalonNumber || index !== 3;
  clearError();
  if (index === 3) fillReview();
  if (focus) steps[index].querySelector("h3").focus({ preventScroll: true });
}
steps.forEach((step) => step.querySelector("h3").setAttribute("tabindex", "-1"));

function choose(group, key, value) {
  state[key] = value;
  group.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.value === value));
  });
  clearError();
}
$("#service-choices").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-value]");
  if (button) choose($("#service-choices"), "service", button.dataset.value);
});
$("#time-choices").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-value]");
  if (button) choose($("#time-choices"), "time", button.dataset.value);
});
document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => {
    choose($("#service-choices"), "service", button.dataset.service);
    showStep(0, false);
    $("#agendar").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  });
});

function readFields() {
  state.date = dateInput.value;
  state.name = $("#booking-name").value.trim().replace(/\s+/g, " ");
  state.phone = $("#booking-phone").value.trim();
  state.note = $("#booking-note").value.trim();
}
function validateStep() {
  readFields();
  if (state.step === 0 && !state.service) { showError("Escolha um serviço para continuar."); return false; }
  if (state.step === 1) {
    if (!state.date) { showError("Escolha uma data de preferência."); dateInput.focus(); return false; }
    if (state.date < dateInput.min || state.date > dateInput.max) { showError("Escolha uma data dentro dos próximos 90 dias."); dateInput.focus(); return false; }
    if (!state.time) { showError("Escolha um período ou marque ‘A combinar’."); return false; }
  }
  if (state.step === 2) {
    if (state.name.length < 2) { showError("Informe seu nome para continuar."); $("#booking-name").focus(); return false; }
    const digits = state.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) { showError("Informe um número de WhatsApp com DDD."); $("#booking-phone").focus(); return false; }
  }
  return true;
}
function friendlyDate(value) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(`${value}T12:00:00`));
}
function fillReview() {
  $("#review-service").textContent = state.service;
  $("#review-date").textContent = friendlyDate(state.date);
  $("#review-time").textContent = state.time;
  $("#review-name").textContent = state.name;
  $("#review-phone").textContent = state.phone;
  $("#review-note").textContent = state.note;
  $("#review-note-row").hidden = !state.note;
}
function bookingMessage() {
  return [
    `Olá! Gostaria de consultar um agendamento no ${CONFIG.salonName}.`,
    "",
    `Serviço: ${state.service}`,
    `Data de preferência: ${friendlyDate(state.date)}`,
    `Horário de preferência: ${state.time}`,
    `Meu nome: ${state.name}`,
    `Meu WhatsApp: ${state.phone}`,
    ...(state.note ? [`Observação: ${state.note}`] : []),
    "",
    "Vocês podem confirmar disponibilidade e valor? Obrigada!"
  ].join("\n");
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearError();
  if (state.step < 3) {
    if (validateStep()) showStep(state.step + 1);
    return;
  }
  const number = CONFIG.salonWhatsApp.replace(/\D/g, "");
  const url = `https://wa.me/${number}?text=${encodeURIComponent(bookingMessage())}`;
  window.location.assign(url);
});
backButton.addEventListener("click", () => showStep(Math.max(0, state.step - 1)));

const menuToggle = $(".menu-toggle");
const drawer = $("#mobile-menu");
let drawerCloseTimer;
function finishClose() {
  drawer.close();
  drawer.classList.remove("is-closing");
  document.body.classList.remove("drawer-open");
  menuToggle.setAttribute("aria-expanded", "false");
}
function closeMenu() {
  if (!drawer.open || drawer.classList.contains("is-closing")) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { finishClose(); return; }
  drawer.classList.add("is-closing");
  drawerCloseTimer = setTimeout(finishClose, 360);
}
menuToggle.addEventListener("click", () => {
  clearTimeout(drawerCloseTimer);
  drawer.classList.remove("is-closing");
  drawer.showModal();
  document.body.classList.add("drawer-open");
  menuToggle.setAttribute("aria-expanded", "true");
});
$(".drawer-close").addEventListener("click", closeMenu);
drawer.addEventListener("keydown", event => {
  if (event.key !== "Tab") return;
  const controls = [...drawer.querySelectorAll("a[href], button:not([disabled])")];
  const first = controls[0], last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
drawer.addEventListener("cancel", event => { event.preventDefault(); closeMenu(); });
drawer.addEventListener("click", event => {
  const bounds = drawer.getBoundingClientRect();
  if (event.target === drawer && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) closeMenu();
});
drawer.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
matchMedia("(min-width: 761px)").addEventListener("change", event => {
  if (event.matches && drawer.open) { clearTimeout(drawerCloseTimer); finishClose(); }
});
const sectionLinks = [...document.querySelectorAll(".desktop-nav a, .drawer-nav a")];
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach(link => {
        if (link.hash === "#" + entry.target.id) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-20% 0px -55% 0px", threshold: 0 });
  ["experiencia", "servicos", "inspiracoes", "contato"].forEach(id => sectionObserver.observe(document.getElementById(id)));
}

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reducedMotion || !("IntersectionObserver" in window)) {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px 60px 0px" });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

