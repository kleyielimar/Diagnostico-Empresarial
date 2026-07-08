const CONFIG = {
  bookingUrl: "https://calendar.app.google/Dy2h9mcBh4KhMZ5eA",
  systemeFormAction: "",
  supabaseUrl: "",
  supabaseAnonKey: "",
  supabaseTable: "diagnostico_orden_leads",
};

const questions = [
  {
    text: "Si manana no puedes trabajar, que tan bien sigue funcionando tu negocio?",
    options: [
      ["Se detiene casi todo porque muchas decisiones pasan por mi.", 0],
      ["Algunas cosas siguen, pero varias personas me escribirian para resolver.", 1],
      ["La operacion principal puede avanzar con instrucciones claras.", 2],
    ],
  },
  {
    text: "Tus procesos mas repetidos estan documentados?",
    options: [
      ["No. La mayoria vive en mi cabeza o en mensajes sueltos.", 0],
      ["Algunos, pero no estan actualizados ni faciles de encontrar.", 1],
      ["Si. Estan claros, accesibles y se usan de verdad.", 2],
    ],
  },
  {
    text: "Cuando llega un nuevo cliente, existe una ruta clara de bienvenida y seguimiento?",
    options: [
      ["No. Lo voy resolviendo segun el caso.", 0],
      ["Tengo pasos, pero todavia dependen mucho de recordatorios manuales.", 1],
      ["Si. El cliente recibe una experiencia consistente.", 2],
    ],
  },
  {
    text: "Que pasa cuando intentas delegar una tarea?",
    options: [
      ["Termino explicando mucho o corrigiendo casi todo.", 0],
      ["Puedo delegar partes, pero todavia debo supervisar demasiado.", 1],
      ["La persona sabe que hacer, donde encontrarlo y como reportar avances.", 2],
    ],
  },
  {
    text: "Tienes un lugar central para clientes, documentos, pagos y tareas?",
    options: [
      ["No. Todo esta repartido entre WhatsApp, Drive, notas y memoria.", 0],
      ["Mas o menos, pero todavia hay informacion dispersa.", 1],
      ["Si. La informacion clave esta organizada y accesible.", 2],
    ],
  },
  {
    text: "Has perdido oportunidades por falta de seguimiento?",
    options: [
      ["Si, y me preocupa porque ya me esta costando dinero.", 0],
      ["A veces. No siempre tengo claridad de que se quedo pendiente.", 1],
      ["Rara vez. Tengo un sistema para dar seguimiento.", 2],
    ],
  },
  {
    text: "Antes de contratar o pedir ayuda, sabes exactamente que vas a delegar?",
    options: [
      ["No. Solo se que necesito ayuda urgente.", 0],
      ["Tengo ideas, pero no estan priorizadas ni documentadas.", 1],
      ["Si. Se que delegar, que documentar y que conservar conmigo.", 2],
    ],
  },
  {
    text: "Tus precios, servicios y entregables estan claramente definidos?",
    options: [
      ["No del todo. A veces adapto demasiado segun cada cliente.", 0],
      ["Estan definidos, pero aun hay excepciones que desordenan la operacion.", 1],
      ["Si. Se que vendo, que incluye y como se entrega.", 2],
    ],
  },
  {
    text: "Puedes ver rapidamente que tareas consumen mas energia cada semana?",
    options: [
      ["No. Solo siento que estoy ocupada todo el tiempo.", 0],
      ["Tengo una idea, pero no lo mido ni lo reviso con frecuencia.", 1],
      ["Si. Tengo claridad de los puntos que mas pesan.", 2],
    ],
  },
  {
    text: "Tu negocio puede crecer sin aumentar proporcionalmente tu cansancio?",
    options: [
      ["No. Si vendo mas, siento que tambien se multiplica el caos.", 0],
      ["Tal vez, pero tendria que ordenar varias cosas primero.", 1],
      ["Si. Tengo base para sostener mas volumen con control.", 2],
    ],
  },
  {
    text: "Que tan clara esta la responsabilidad de cada tarea en tu negocio?",
    options: [
      ["Poco clara. Muchas cosas terminan regresando a mi.", 0],
      ["Hay responsables, pero no siempre hay seguimiento claro.", 1],
      ["Clara. Cada tarea importante tiene dueno, fecha y criterio.", 2],
    ],
  },
  {
    text: "Como se siente tu operacion en este momento?",
    options: [
      ["Pesada. Estoy apagando fuegos y sosteniendo demasiado.", 0],
      ["En transicion. Ya veo que necesito ordenar para seguir creciendo.", 1],
      ["Mas estable. Hay estructura, aunque siempre se puede mejorar.", 2],
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
      "Sostienes demasiadas decisiones, recordatorios y detalles a la vez. El negocio existe, pero todavia no tiene suficiente estructura para soltar peso sin perder control.",
    buyerSignal: "Necesita orden antes de contratar mas ayuda.",
    visualSubtitle: "Mucho movimiento, poca estructura visible.",
    gap: "Procesos en tu cabeza y seguimiento manual.",
    handoff: "Mapear lo repetible antes de delegar.",
    summary:
      "Tu negocio puede estar vendiendo, pero la operacion todavia descansa demasiado sobre tu memoria, decisiones y seguimiento diario.",
    meaning:
      "Este nivel suele aparecer cuando hay clientes activos, pero no hay suficiente estructura para sostener mas demanda sin aumentar el cansancio.",
    next:
      "Empieza por mapear los procesos que mas se repiten: entrada de clientes, seguimiento, cobros, entrega y comunicacion. No contrates mas ayuda hasta saber que vas a delegar.",
    review: ["Seguimiento a prospectos y clientes", "Documentos y archivos clave", "Tareas que solo tu sabes hacer"],
  },
  {
    min: 9,
    max: 15,
    title: "Tu negocio esta en crecimiento desordenado",
    label: "Orden parcial",
    archetype: "La Operadora en Transicion",
    archetypeText:
      "Ya tienes algunas bases, pero todavia hay huecos que te obligan a improvisar. Este es el momento ideal para convertir experiencia en sistema.",
    buyerSignal: "Esta lista para priorizar procesos y delegar con criterio.",
    visualSubtitle: "Hay avances, pero todavia falta una ruta clara.",
    gap: "Procesos criticos sin instrucciones simples.",
    handoff: "Priorizar que se delega, automatiza y documenta.",
    summary:
      "Ya existen algunas bases, pero todavia hay partes importantes que dependen de improvisacion, excepciones o recordatorios manuales.",
    meaning:
      "Este es el punto donde muchas duenas sienten que el negocio crece, pero tambien crecen los pendientes, las dudas y la supervision.",
    next:
      "Prioriza 3 procesos criticos y conviertelos en instrucciones simples. Luego decide que se delega, que se automatiza y que necesita seguir bajo tu criterio.",
    review: ["Procesos que se repiten cada semana", "Tareas listas para delegar", "Herramientas que hoy estan duplicando trabajo"],
  },
  {
    min: 16,
    max: 21,
    title: "Tu negocio esta cerca de delegar con mas control",
    label: "Base funcional",
    archetype: "La Delegadora Selectiva",
    archetypeText:
      "Tu operacion ya tiene estructura en varias areas. Ahora toca reforzar responsabilidades, criterios y seguimiento para que el crecimiento no dependa de estar encima de todo.",
    buyerSignal: "Puede avanzar hacia delegacion, roles y medicion.",
    visualSubtitle: "Existe base; falta convertirla en control repetible.",
    gap: "Responsabilidades y criterios aun incompletos.",
    handoff: "Crear mapa de responsabilidades y seguimiento.",
    summary:
      "Tienes estructura en varias areas, pero todavia necesitas reforzar documentacion, seguimiento y criterios antes de escalar mas.",
    meaning:
      "Este nivel indica que no estas empezando desde cero. Ahora el trabajo es fortalecer la operacion para que no dependa de estar encima de todo.",
    next:
      "Crea un mapa de responsabilidades y revisa donde todavia eres el cuello de botella. Ese mapa te dira que rol, sistema o proceso debe venir despues.",
    review: ["Responsabilidades por area", "Indicadores de seguimiento", "Proceso de onboarding de cliente"],
  },
  {
    min: 22,
    max: 24,
    title: "Tu negocio tiene estructura para crecer con menos friccion",
    label: "Listo para optimizar",
    archetype: "La CEO Optimizadora",
    archetypeText:
      "Tu negocio tiene bases claras. El proximo salto esta en medir mejor, optimizar la experiencia del cliente y preparar decisiones con menos friccion.",
    buyerSignal: "Busca optimizacion, indicadores y escala mas fina.",
    visualSubtitle: "La estructura ya sostiene; ahora toca afinar.",
    gap: "Metricas y cuellos de botella finos.",
    handoff: "Auditar experiencia, tiempos e indicadores.",
    summary:
      "Tu operacion ya tiene bases claras. El siguiente paso no es ordenar desde cero, sino optimizar, medir y preparar mejor la escala.",
    meaning:
      "Aqui conviene revisar cuellos de botella finos: calidad, tiempos, experiencia del cliente, indicadores y decisiones que aun requieren demasiado de ti.",
    next:
      "Audita la experiencia completa del cliente y define que indicadores vas a revisar cada semana para sostener crecimiento con control.",
    review: ["Metricas operativas", "Experiencia del cliente", "Decisiones que todavia no tienen criterio claro"],
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
  const height = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight
  );

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
  liveLevel.textContent = getAnsweredCount() < 4 ? "En evaluacion" : getLevel().label;
  scheduleEmbedHeight();
}

questionStage.addEventListener("change", (event) => {
  if (event.target.name !== "question") return;
  answers[currentQuestion] = Number(event.target.value);
  nextBtn.disabled = false;
  liveLevel.textContent = getAnsweredCount() < 4 ? "En evaluacion" : getLevel().label;
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

leadForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = getLeadPayload("lead");

  if (CONFIG.systemeFormAction) {
    await fetch(CONFIG.systemeFormAction, {
      method: "POST",
      mode: "no-cors",
      body: new FormData(leadForm),
    }).catch(() => null);
  }

  await saveLeadRecord("lead", payload);
  renderResult();
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
    "Diagnostico de Orden Empresarial - Kleyi Elimar",
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
  wrapText(ctx, "Diagnostico de Orden Empresarial", 120, 250, 820, 68, 3);

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
  ctx.fillText("info.kleyielimar.com/diagnostico-empresarial", 120, 1215);

  const link = document.createElement("a");
  link.download = "diagnostico-orden-empresarial-kleyi.png";
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

  const intakeData = Object.fromEntries(new FormData(intakeForm).entries());
  const storedLead = JSON.parse(window.localStorage.getItem("diagnosticoOrdenLead") || "{}");

  await saveLeadRecord("intake", {
    ...storedLead,
    ...intakeData,
  });

  bookingLink.href = CONFIG.bookingUrl;
  bookingPanel.classList.remove("hidden");
  bookingPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  scheduleEmbedHeight();
});

window.addEventListener("load", scheduleEmbedHeight);
window.addEventListener("resize", scheduleEmbedHeight);

if (window.ResizeObserver) {
  new ResizeObserver(scheduleEmbedHeight).observe(document.body);
}

renderQuestion();
scheduleEmbedHeight();
