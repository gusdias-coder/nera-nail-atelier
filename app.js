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
  nextButton.innerHTML = index === 3 ? `${hasSalonNumber ? "Abrir WhatsApp" : "Compartilhar no WhatsApp"} <span aria-hidden="true">↗</span>` : 'Continuar <span aria-hidden="true">↗</span>';
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
const mobileMenu = $("#mobile-menu");
function closeMenu() {
  mobileMenu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}
menuToggle.addEventListener("click", () => {
  const open = mobileMenu.hidden;
  mobileMenu.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});
mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

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

