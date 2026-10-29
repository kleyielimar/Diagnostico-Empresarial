const CONFIG = {
  bookingUrl: "https://kleyielimar.com/opciones-del-diagnostico/",
  systemeFormAction: "https://systeme.io/embedded/46105223/subscription",
  supabaseUrl: "https://nrbrgovhgrrrwhnavszp.supabase.co",
  supabaseAnonKey: "sb_publishable_bJ_RuYKg4XgORYJXZ3klFA_zLs1BZx9",
  supabaseTable: "diagnostico_orden_leads",
};

const questions = [
  {
    text: "Si mañana no puedes trabajar, ¿qué tan bien sigue funcionando tu negocio?",
    options: [
      ["Se detiene casi todo porque muchas decisiones pasan por mí.", 0],
      ["Algunas cosas siguen, pero varias personas me escribirían para resolver.", 1],
      ["La operación principal puede avanzar con instrucciones claras.", 2],
    ],
  },
  {
    text: "¿Tus procesos más repetidos están documentados?",
    options: [
      ["No. La mayoría vive en mi cabeza o en mensajes sueltos.", 0],
      ["Algunos, pero no están actualizados ni fáciles de encontrar.", 1],
      ["Sí. Están claros, accesibles y se usan de verdad.", 2],
    ],
  },
  {
    text: "Cuando llega un nuevo cliente, ¿existe una ruta clara de bienvenida y seguimiento?",
    options: [
      ["No. Lo voy resolviendo según el caso.", 0],
      ["Tengo pasos, pero todavía dependen mucho de recordatorios manuales.", 1],
      ["Sí. El cliente recibe una experiencia consistente.", 2],
    ],
  },
  {
    text: "¿Qué pasa cuando intentas delegar una tarea?",
    options: [
      ["Termino explicando mucho o corrigiendo casi todo.", 0],
      ["Puedo delegar partes, pero todavía debo supervisar demasiado.", 1],
      ["La persona sabe qué hacer, dónde encontrarlo y cómo reportar avances.", 2],
    ],
  },
  {
    text: "¿Tienes un lugar central para clientes, documentos, pagos y tareas?",
    options: [
      ["No. Todo está repartido entre WhatsApp, Drive, notas y memoria.", 0],
      ["Más o menos, pero todavía hay información dispersa.", 1],
      ["Sí. La información clave está organizada y accesible.", 2],
    ],
  },
  {
    text: "¿Has perdido oportunidades por falta de seguimiento?",
    options: [
      ["Sí, y me preocupa porque ya me está costando dinero.", 0],
      ["A veces. No siempre tengo claridad de qué se quedó pendiente.", 1],
      ["Rara vez. Tengo un sistema para dar seguimiento.", 2],
    ],
  },
  {
    text: "Antes de contratar o pedir ayuda, ¿sabes exactamente qué vas a delegar?",
    options: [
      ["No. Solo sé que necesito ayuda urgente.", 0],
      ["Tengo ideas, pero no están priorizadas ni documentadas.", 1],
      ["Sí. Sé qué delegar, qué documentar y qué conservar conmigo.", 2],
    ],
  },
  {
    text: "¿Tus precios, servicios y entregables están claramente definidos?",
    options: [
      ["No del todo. A veces adapto demasiado según cada cliente.", 0],
      ["Están definidos, pero aún hay excepciones que desordenan la operación.", 1],
      ["Sí. Sé qué vendo, qué incluye y cómo se entrega.", 2],
    ],
  },
  {
    text: "¿Puedes ver rápidamente qué tareas consumen más energía cada semana?",
    options: [
      ["No. Solo siento que estoy ocupada todo el tiempo.", 0],
      ["Tengo una idea, pero no lo mido ni lo reviso con frecuencia.", 1],
      ["Sí. Tengo claridad de los puntos que más pesan.", 2],
    ],
  },
  {
    text: "¿Tu negocio puede crecer sin aumentar proporcionalmente tu cansancio?",
    options: [
      ["No. Si vendo más, siento que también se multiplica el caos.", 0],
      ["Tal vez, pero tendría que ordenar varias cosas primero.", 1],
      ["Sí. Tengo base para sostener más volumen con control.", 2],
    ],
  },
  {
    text: "¿Qué tan clara está la responsabilidad de cada tarea en tu negocio?",
    options: [
      ["Poco clara. Muchas cosas terminan regresando a mí.", 0],
      ["Hay responsables, pero no siempre hay seguimiento claro.", 1],
      ["Clara. Cada tarea importante tiene responsable, fecha y criterio.", 2],
    ],
  },
  {
    text: "¿Cómo se siente tu operación en este momento?",
    options: [
      ["Pesada. Estoy apagando fuegos y sosteniendo demasiado.", 0],
      ["En transición. Ya veo que necesito ordenar para seguir creciendo.", 1],
      ["Más estable. Hay estructura, aunque siempre se puede mejorar.", 2],
    ],
  },
];

const levels = [
  {
    min: 0,
    max: 8,
    title: "Tu negocio depende demasiado de ti",
    label: "Alta dependencia",
    archetype: "La Fundadora Pulpo",
    archetypeText:
      "Sostienes demasiadas decisiones, recordatorios y detalles a la vez. El negocio existe, pero todavía no tiene suficiente estructura para soltar peso sin perder control.",
    buyerSignal: "Necesita orden antes de contratar más ayuda.",
    visualSubtitle: "Mucho movimiento, poca estructura visible.",
    gap: "Procesos en tu cabeza y seguimiento manual.",
    handoff: "Mapear lo repetible antes de delegar.",
    summary:
      "Tu negocio puede estar vendiendo, pero la operación todavía descansa demasiado sobre tu memoria, decisiones y seguimiento diario.",
    meaning:
      "Este nivel suele aparecer cuando hay clientes activos, pero no hay suficiente estructura para sostener más demanda sin aumentar el cansancio.",
    next:
      "Empieza por mapear los procesos que más se repiten: entrada de clientes, seguimiento, cobros, entrega y comunicación. No contrates más ayuda hasta saber qué vas a delegar.",
    review: ["Seguimiento a prospectos y clientes", "Documentos y archivos clave", "Tareas que solo tú sabes hacer"],
  },
  {
    min: 9,
    max: 15,
    title: "Tu negocio está en crecimiento desordenado",
    label: "Orden parcial",
    archetype: "La Operadora en Transición",
    archetypeText:
      "Ya tienes algunas bases, pero todavía hay huecos que te obligan a improvisar. Este es el momento ideal para convertir experiencia en sistema.",
    buyerSignal: "Está lista para priorizar procesos y delegar con criterio.",
    visualSubtitle: "Hay avances, pero todavía falta una ruta clara.",
    gap: "Procesos críticos sin instrucciones simples.",
    handoff: "Priorizar qué se delega, automatiza y documenta.",
    summary:
      "Ya existen algunas bases, pero todavía hay partes importantes que dependen de improvisación, excepciones o recordatorios manuales.",
    meaning:
      "Este es el punto donde muchas dueñas sienten que el negocio crece, pero también crecen los pendientes, las dudas y la supervisión.",
    next:
      "Prioriza 3 procesos críticos y conviértelos en instrucciones simples. Luego decide qué se delega, qué se automatiza y qué necesita seguir bajo tu criterio.",
    review: ["Procesos que se repiten cada semana", "Tareas listas para delegar", "Herramientas que hoy están duplicando trabajo"],
  },
  {
    min: 16,
    max: 21,
    title: "Tu negocio está cerca de delegar con más control",
    label: "Base funcional",
    archetype: "La Delegadora Selectiva",
    archetypeText:
      "Tu operación ya tiene estructura en varias áreas. Ahora toca reforzar responsabilidades, criterios y seguimiento para que el crecimiento no dependa de estar encima de todo.",
    buyerSignal: "Puede avanzar hacia delegación, roles y medición.",
    visualSubtitle: "Existe base; falta convertirla en control repetible.",
    gap: "Responsabilidades y criterios aún incompletos.",
    handoff: "Crear mapa de responsabilidades y seguimiento.",
    summary:
      "Tienes estructura en varias áreas, pero todavía necesitas reforzar documentación, seguimiento y criterios antes de escalar más.",
    meaning:
      "Este nivel indica que no estás empezando desde cero. Ahora el trabajo es fortalecer la operación para que no dependa de estar encima de todo.",
    next:
      "Crea un mapa de responsabilidades y revisa dónde todavía eres el cuello de botella. Ese mapa te dirá qué rol, sistema o proceso debe venir después.",
    review: ["Responsabilidades por área", "Indicadores de seguimiento", "Proceso de onboarding de cliente"],
  },
  {
    min: 22,
    max: 24,
    title: "Tu negocio tiene estructura para crecer con menos fricción",
    label: "Listo para optimizar",
    archetype: "La CEO Optimizadora",
    archetypeText:
      "Tu negocio tiene bases claras. El próximo salto está en medir mejor, optimizar la experiencia del cliente y preparar decisiones con menos fricción.",
    buyerSignal: "Busca optimización, indicadores y escala más fina.",
    visualSubtitle: "La estructura ya sostiene; ahora toca afinar.",
    gap: "Métricas y cuellos de botella finos.",
    handoff: "Auditar experiencia, tiempos e indicadores.",
    summary:
      "Tu operación ya tiene bases claras. El siguiente paso no es ordenar desde cero, sino optimizar, medir y preparar mejor la escala.",
    meaning:
      "Aquí conviene revisar cuellos de botella finos: calidad, tiempos, experiencia del cliente, indicadores y decisiones que aún requieren demasiado de ti.",
    next:
      "Audita la experiencia completa del cliente y define qué indicadores vas a revisar cada semana para sostener crecimiento con control.",
    review: ["Métricas operativas", "Experiencia del cliente", "Decisiones que todavía no tienen criterio claro"],
  },
];

let currentQuestion = 0;
const answers = Array(questions.length).fill(null);

const questionStage = document.getElementById("questionStage");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const liveLevel = document.getElementById("liveLevel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const diagnosticForm = document.getElementById("diagnosticForm");
const capturePanel = document.getElementById("capturePanel");
const resultPanel = document.getElementById("resultPanel");
const leadForm = document.getElementById("leadForm");
const startIntakeBtn = document.getElementById("startIntakeBtn");
const intakePanel = document.getElementById("intakePanel");
const intakeForm = document.getElementById("intakeForm");
const bookingPanel = document.getElementById("bookingPanel");
const bookingLink = document.getElementById("bookingLink");
const copySummaryBtn = document.getElementById("copySummaryBtn");
const downloadCardBtn = document.getElementById("downloadCardBtn");

function postEmbedHeight() {
  const height = Math.ceil(document.querySelector(".shell").getBoundingClientRect().height);

  window.parent.postMessage(
    {
      source: "kleyi-diagnostico-orden",
      height: height + 24,
    },
    "*"
  );
}

const scheduleEmbedHeight = (() => {
  let frame = null;
  return () => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(postEmbedHeight);
  };
})();

function getScore() {
  return answers.reduce((sum, value) => sum + (Number.isInteger(value) ? value : 0), 0);
}

function getAnsweredCount() {
  return answers.filter(Number.isInteger).length;
}

function getLevel(score = getScore()) {
  return levels.find((level) => score >= level.min && score <= level.max) || levels[0];
}

function getLeadPayload(stage, extra = {}) {
  const level = getLevel();
  return {
    stage,
    first_name: document.getElementById("leadName")?.value.trim() || extra.first_name || "",
    email: document.getElementById("leadEmail")?.value.trim() || extra.email || "",
    score: getScore(),
    level: level.label,
    archetype: level.archetype,
    buyer_signal: level.buyerSignal,
    completed_at: new Date().toISOString(),
    ...extra,
  };
}

async function saveLeadRecord(stage, extra = {}) {
  const payload = getLeadPayload(stage, extra);
  const storageKey = stage === "intake" ? "diagnosticoOrdenIntake" : "diagnosticoOrdenLead";
  window.localStorage.setItem(storageKey, JSON.stringify(payload));

  if (!CONFIG.supabaseUrl || !CONFIG.supabaseAnonKey) return payload;

  await fetch(`${CONFIG.supabaseUrl}/rest/v1/${CONFIG.supabaseTable}`, {
    method: "POST",
    headers: {
      apikey: CONFIG.supabaseAnonKey,
      Authorization: `Bearer ${CONFIG.supabaseAnonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  }).catch(() => null);

  return payload;
}

function renderQuestion() {
  const question = questions[currentQuestion];
  const selected = answers[currentQuestion];

  questionStage.innerHTML = `
    <p class="question-number">Pregunta ${currentQuestion + 1} de ${questions.length}</p>
    <h2 class="question-title">${question.text}</h2>
    <ul class="option-list">
      ${question.options
        .map(
          ([label, value], index) => `
            <li>
              <label class="option">
                <input
                  type="radio"
                  name="question"
                  value="${value}"
                  data-index="${index}"
                  ${selected === value ? "checked" : ""}
                />
                <span><strong>${["A", "B", "C"][index]}</strong>${label}</span>
              </label>
            </li>
          `
        )
        .join("")}
    </ul>
  `;

  progressText.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "Terminar" : "Siguiente";
  nextBtn.disabled = selected === null;
  liveLevel.textContent = getAnsweredCount() < 4 ? "En evaluación" : getLevel().label;
  scheduleEmbedHeight();
}

questionStage.addEventListener("change", (event) => {
  if (event.target.name !== "question") return;
  answers[currentQuestion] = Number(event.target.value);
  nextBtn.disabled = false;
  liveLevel.textContent = getAnsweredCount() < 4 ? "En evaluación" : getLevel().label;
  scheduleEmbedHeight();
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion === 0) return;
  currentQuestion -= 1;
  renderQuestion();
});

nextBtn.addEventListener("click", () => {
  if (answers[currentQuestion] === null) return;
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
    return;
  }

  diagnosticForm.classList.add("hidden");
  capturePanel.classList.remove("hidden");
  capturePanel.scrollIntoView({ behavior: "smooth", block: "start" });
  scheduleEmbedHeight();
});

// Use the official embedded form, with a confirmed redirect rather than an opaque fetch.
function registerWithSysteme(action = CONFIG.systemeFormAction, extraFields = {}) {
  return new Promise((resolve, reject) => {
    const nonce = crypto.randomUUID();
    const frame = document.createElement("iframe");
    frame.name = `systeme-registration-${nonce}`;
    frame.hidden = true;
    frame.title = "Confirmación del registro";
    const form = document.createElement("form");
    form.method = "post";
    form.action = action;
    form.target = frame.name;
    form.hidden = true;
    const fields = {
      email: document.getElementById("leadEmail").value.trim(),
      first_name: document.getElementById("leadName").value.trim(),
      ...extraFields,
    };
    for (const [name, value] of Object.entries(fields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.append(input);
    }
    document.body.append(frame, form);
    let timer;
    function cleanup() {
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
      form.remove();
      frame.remove();
    }
    function onMessage(event) {
      if (event.origin !== location.origin || event.source !== frame.contentWindow) return;
      if (event.data?.type !== "systeme-registration-confirmed") return;
      cleanup();
      resolve();
    }
    window.addEventListener("message", onMessage);
    timer = setTimeout(() => {
      cleanup();
      reject(new Error("No pudimos confirmar tu registro. Tus respuestas siguen aquí. Revisa tu conexión e inténtalo de nuevo."));
    }, 45000);
    form.submit();
  });
}

leadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!leadForm.reportValidity()) return;
  const button = leadForm.querySelector('button[type="submit"]');
  const status = document.getElementById("registrationStatus");
  if (button.disabled) return;
  button.disabled = true;
  button.textContent = "Registrando…";
  status.textContent = "Estamos confirmando tu registro. Conservaremos tus respuestas en esta página.";
  scheduleEmbedHeight();
  try {
    await registerWithSysteme();
    const payload = getLeadPayload("lead");
    await saveLeadRecord("lead", payload);
    status.textContent = "Registro confirmado.";
    renderResult();
  } catch (error) {
    status.textContent = error.message || "No pudimos confirmar el registro. Inténtalo de nuevo.";
  } finally {
    button.disabled = false;
    button.textContent = "Ver mi resultado";
    scheduleEmbedHeight();
  }
});

function renderResult() {
  const level = getLevel();
  const score = getScore();
  document.getElementById("result-title").textContent = level.title;
  document.getElementById("resultSummary").textContent = level.summary;
  document.getElementById("resultScore").textContent = `${score}/24`;
  document.getElementById("archetypeLabel").textContent = level.archetype;
  document.getElementById("archetypeText").textContent = level.archetypeText;
  document.getElementById("buyerSignal").textContent = level.buyerSignal;
  document.getElementById("shareArchetype").textContent = level.archetype;
  document.getElementById("shareSubtitle").textContent = level.visualSubtitle;
  document.getElementById("shareScore").textContent = `${score}/24`;
  document.getElementById("shareGap").textContent = level.gap;
  document.getElementById("shareNext").textContent = level.handoff;
  document.getElementById("meaningText").textContent = level.meaning;
  document.getElementById("nextStepText").textContent = level.next;
  document.getElementById("reviewList").innerHTML = level.review
    .map((item) => `<li>${item}</li>`)
    .join("");

  capturePanel.classList.add("hidden");
  resultPanel.classList.remove("hidden");
  resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  scheduleEmbedHeight();
}

function buildSummaryText() {
  const level = getLevel();
  return [
    "Diagnóstico de Orden Empresarial - Kleyi Elimar",
    `Arquetipo: ${level.archetype}`,
    `Puntaje: ${getScore()}/24`,
    `Brecha principal: ${level.gap}`,
    `Siguiente paso: ${level.handoff}`,
  ].join("\n");
}

copySummaryBtn.addEventListener("click", async () => {
  const text = buildSummaryText();
  await navigator.clipboard?.writeText(text).catch(() => null);
  copySummaryBtn.textContent = "Resumen copiado";
  window.setTimeout(() => {
    copySummaryBtn.textContent = "Copiar resumen";
  }, 1800);
});

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 5) {
  const words = text.split(" ");
  let line = "";
  let lines = 0;

  for (let index = 0; index < words.length; index += 1) {
    const testLine = line ? `${line} ${words[index]}` : words[index];
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = words[index];
      y += lineHeight;
      lines += 1;
      if (lines >= maxLines - 1) break;
    } else {
      line = testLine;
    }
  }

  if (line && lines < maxLines) ctx.fillText(line, x, y);
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fill();
}

downloadCardBtn.addEventListener("click", () => {
  const level = getLevel();
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#e9f5f6";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#a3d2d5";
  ctx.globalAlpha = 0.55;
  ctx.beginPath();
  ctx.arc(920, 170, 300, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(150, 1180, 360, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#ffffff";
  drawRoundedRect(ctx, 72, 88, 936, 1174, 28);

  ctx.fillStyle = "#6aa5a9";
  ctx.font = "700 32px Arial";
  ctx.fillText("Kleyi Elimar", 120, 160);

  ctx.fillStyle = "#45625d";
  ctx.font = "900 58px Arial";
  wrapText(ctx, "Diagnóstico de Orden Empresarial", 120, 250, 820, 68, 3);

  ctx.fillStyle = "#6aa5a9";
  ctx.font = "700 28px Arial";
  ctx.fillText("Tu arquetipo operativo", 120, 460);

  ctx.fillStyle = "#45625d";
  ctx.font = "900 74px Arial";
  wrapText(ctx, level.archetype, 120, 550, 820, 82, 3);

  ctx.fillStyle = "#45625d";
  drawRoundedRect(ctx, 120, 760, 270, 180, 22);
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 64px Arial";
  ctx.fillText(`${getScore()}/24`, 158, 845);
  ctx.font = "700 24px Arial";
  ctx.fillText("Orden actual", 158, 890);

  ctx.fillStyle = "#eef8f8";
  drawRoundedRect(ctx, 430, 760, 458, 180, 22);
  ctx.fillStyle = "#6aa5a9";
  ctx.font = "700 24px Arial";
  ctx.fillText("Brecha principal", 470, 820);
  ctx.fillStyle = "#45625d";
  ctx.font = "800 34px Arial";
  wrapText(ctx, level.gap, 470, 870, 360, 42, 2);

  ctx.fillStyle = "#45625d";
  ctx.font = "700 30px Arial";
  ctx.fillText("Siguiente paso", 120, 1040);
  ctx.font = "900 44px Arial";
  wrapText(ctx, level.handoff, 120, 1110, 820, 54, 3);

  ctx.fillStyle = "#6aa5a9";
  ctx.font = "700 24px Arial";
  ctx.fillText("info.kleyielimar.com/diagnóstico-empresarial", 120, 1215);

  const link = document.createElement("a");
  link.download = "diagnóstico-orden-empresarial-kleyi.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

startIntakeBtn.addEventListener("click", () => {
  intakePanel.classList.remove("hidden");
  intakePanel.scrollIntoView({ behavior: "smooth", block: "start" });
  scheduleEmbedHeight();
});

intakeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!intakeForm.reportValidity()) return;
  const button = intakeForm.querySelector('button[type="submit"]');
  if (button.disabled) return;
  const status = document.getElementById("intakeStatus");
  const data = Object.fromEntries(new FormData(intakeForm).entries());
  const lead = getLeadPayload("intake");
  const values = [data.business_type, data.revenue_range, data.main_problem, data.attempted_fix, data.desired_outcome, data.team_status];
  if (values.some(value => !value || value.length > 255) || lead.first_name.length > 100) {
    status.textContent = "Escribe respuestas de hasta 255 caracteres y un nombre de hasta 100 caracteres.";
    return;
  }
  const summary = ["Nombre: " + lead.first_name, "Puntuación: " + lead.score + "/24", "Perfil: " + lead.archetype, "Enviado: " + new Date().toISOString()].join("\n");
  const fields = {diagnostico_ficha: summary};
  values.forEach((value, index) => { fields["diagnostico_r" + (index + 1)] = value; });
  button.disabled = true;
  button.textContent = "Enviando tus respuestas…";
  status.textContent = "Estamos guardando tu contexto para el análisis personal.";
  scheduleEmbedHeight();
  try {
    await registerWithSysteme("https://systeme.io/embedded/46115937/subscription", fields);
    localStorage.setItem("diagnosticoOrdenIntake", JSON.stringify({...lead, ...data}));
    status.textContent = "Contexto recibido. Consulta los detalles del análisis personal opcional de $49.";
    bookingLink.href = CONFIG.bookingUrl;
    bookingPanel.classList.remove("hidden");
    bookingPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    status.textContent = "No pudimos confirmar el envío de tu ficha. Tus respuestas siguen aquí. Revisa tu conexión y vuelve a intentarlo.";
  } finally {
    button.disabled = false;
    button.textContent = "Enviar mi contexto";
    scheduleEmbedHeight();
  }
});

window.addEventListener("load", scheduleEmbedHeight);
window.addEventListener("resize", scheduleEmbedHeight);

if (window.ResizeObserver) {
  new ResizeObserver(scheduleEmbedHeight).observe(document.body);
}

document.documentElement.classList.toggle("is-embedded", window.self !== window.top);
renderQuestion();
scheduleEmbedHeight();

