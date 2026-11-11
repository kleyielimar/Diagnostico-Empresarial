const CONFIG = {
  startFormAction: "https://systeme.io/embedded/46375374/subscription",
  bookingUrl: "https://kleyielimar.com/1-2-01-diagnostico-estrategico-360/",
  systemeFormAction: "https://systeme.io/embedded/46105223/subscription",
  supabaseUrl: "https://nrbrgovhgrrrwhnavszp.supabase.co",
  supabaseAnonKey: "sb_publishable_bJ_RuYKg4XgORYJXZ3klFA_zLs1BZx9",
  supabaseTable: "diagnostico_orden_leads",
  // Nombres de campos personalizados en Systeme para el formulario principal.
  // Deja un valor vacío ("") para no enviar ese dato a Systeme.
  systemeLeadFields: {
    revenue: "diagnostico_facturacion",
    archetype: "diagnostico_arquetipo",
    score: "diagnostico_puntaje",
    mainGap: "diagnostico_brecha",
  },
};

// Áreas que mide el diagnóstico. Cada pregunta suma a un área.
const areas = {
  dependencia: {
    name: "Dependencia de ti",
    gap: "Demasiadas decisiones pasan por ti.",
    action: "Anota las decisiones que hoy solo tú tomas y marca cuáles podrían seguir una regla simple.",
  },
  procesos: {
    name: "Procesos documentados",
    gap: "Tus procesos viven en tu cabeza.",
    action: "Documenta en pasos simples el proceso que más se repite cada semana.",
  },
  delegacion: {
    name: "Delegación y responsabilidades",
    gap: "Delegas sin responsables ni criterios claros.",
    action: "Asigna a cada tarea importante un responsable, una fecha y un criterio de «terminado».",
  },
  clientes: {
    name: "Clientes y seguimiento",
    gap: "El seguimiento a clientes depende de tu memoria.",
    action: "Define una ruta fija desde la primera consulta hasta la entrega, con recordatorios.",
  },
  digital: {
    name: "Orden digital",
    gap: "Tu información está repartida en muchos lugares.",
    action: "Elige un solo lugar central para clientes, documentos, pagos y tareas.",
  },
  oferta: {
    name: "Oferta y precios",
    gap: "Tus servicios cambian según cada cliente.",
    action: "Define qué incluye cada servicio, cuánto cuesta y cómo se entrega.",
  },
  medicion: {
    name: "Prioridades y energía",
    gap: "No ves qué tareas te consumen más energía.",
    action: "Durante una semana, anota qué tareas te quitan más tiempo y cuáles se repiten.",
  },
};

// Área de cada pregunta, en el mismo orden que `questions`.
const questionAreas = [
  "dependencia",
  "procesos",
  "clientes",
  "delegacion",
  "digital",
  "clientes",
  "delegacion",
  "oferta",
  "medicion",
  "dependencia",
  "delegacion",
  "dependencia",
];

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
      ["No. Solo siento que no paro en todo el día.", 0],
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
    archetype: "Modo Pulpo",
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
    archetype: "Operación en Transición",
    archetypeText:
      "Ya tienes algunas bases, pero todavía hay huecos que te obligan a improvisar. Este es el momento ideal para convertir experiencia en sistema.",
    buyerSignal: "Está en el momento de priorizar procesos y delegar con criterio.",
    visualSubtitle: "Hay avances, pero todavía falta una ruta clara.",
    gap: "Procesos críticos sin instrucciones simples.",
    handoff: "Priorizar qué se delega, automatiza y documenta.",
    summary:
      "Ya existen algunas bases, pero todavía hay partes importantes que dependen de improvisación, excepciones o recordatorios manuales.",
    meaning:
      "Este es el punto donde muchas personas dueñas de negocio sienten que el negocio crece, pero también crecen los pendientes, las dudas y la supervisión.",
    next:
      "Prioriza 3 procesos críticos y conviértelos en instrucciones simples. Luego decide qué se delega, qué se automatiza y qué necesita seguir bajo tu criterio.",
    review: ["Procesos que se repiten cada semana", "Tareas listas para delegar", "Herramientas que hoy están duplicando trabajo"],
  },
  {
    min: 16,
    max: 21,
    title: "Tu negocio está cerca de delegar con más control",
    label: "Base funcional",
    archetype: "Delegación Selectiva",
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
    archetype: "Modo CEO",
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

let diagnosticSource = "web";
let completionRecorded = false;
let contextAccepted = false;
const SESSION_KEY = "ke-diagnostic-session-v2";
function persistSession(completed = false) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({name:document.getElementById("leadName").value,email:document.getElementById("leadEmail").value,answers,currentQuestion,source:diagnosticSource,completed,at:Date.now()})); } catch {}
}
function beginWithContext(lead, source = "podcast") {
  if (contextAccepted || !lead || typeof lead.email !== "string" || typeof lead.first_name !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || !lead.first_name.trim()) return;
  contextAccepted = true;
  diagnosticSource = source === "podcast" ? "podcast" : "web";
  document.getElementById("leadName").value = lead.first_name.slice(0,100);
  document.getElementById("leadEmail").value = lead.email;
  document.getElementById("followupConsent").checked = true;
  document.getElementById("startPanel").classList.add("hidden");
  document.querySelector(".diagnostic-layout").classList.remove("hidden");
  document.querySelector(".tool-header").classList.add("is-started");
  persistSession();
  scheduleEmbedHeight();
}
window.addEventListener("message", event => {
  if (event.origin !== "https://info.kleyielimar.com" || event.source !== window.parent) return;
  if (event.data?.type === "ke-lead-context") beginWithContext(event.data.lead,event.data.source);
});
function requestLeadContext() {
  if (window.parent !== window) window.parent.postMessage({type:"ke-diagnostic-ready"},"https://info.kleyielimar.com");
}
async function recordCompletion() {
  if(completionRecorded)return;
  completionRecorded = true;
  const status = document.getElementById("resultSaveStatus");
  status.textContent = "Tu resultado ya está listo. Puedes guardarlo abajo.";
  try { await saveLeadRecord("lead"); }
  catch { status.textContent = "Tu resultado está disponible aquí, pero no pudimos guardarlo en el servidor. Descarga el resumen para conservarlo."; }
  registerWithSysteme(CONFIG.systemeFormAction,getSystemeLeadFields(),false).catch(() => {
    // A delayed external confirmation never hides or blocks the result.
    trackStep("registro_resultado_sin_confirmacion");
  });
}
function renderAreaMap() {
  const totals = {};
  questionAreas.forEach((key,i) => {if(!Number.isInteger(answers[i]))return; const t=totals[key] ||= {sum:0,count:0};t.sum+=answers[i];t.count++;});
  document.getElementById("areaMap").innerHTML = Object.entries(areas).map(([key,area]) => {
    const t=totals[key],avg=t?t.sum/t.count:0;
    const state=avg===2?"Base sólida":avg>=1?"En desarrollo":"Prioridad de atención";
    const explanation=avg===2?"Tus respuestas señalan prácticas claras en esta área. Mantén su seguimiento.":area.action;
    return `<article class="area-tile ${avg===2?'solid':avg>=1?'developing':'priority'}"><span class="area-state">${state}</span><h4>${area.name}</h4><p>${explanation}</p></article>`;
  }).join("");
}
function downloadDetailedReport() {
  const canvas=document.createElement("canvas");canvas.width=1080;canvas.height=1900;const ctx=canvas.getContext("2d");
  ctx.fillStyle="#E6F1EE";ctx.fillRect(0,0,1080,1900);ctx.fillStyle="#FFFFFF";drawRoundedRect(ctx,48,48,984,1804,30);
  ctx.fillStyle="#45625D";ctx.font="700 30px Arial";ctx.fillText("Kleyi Elimar · Tu resultado",96,118);
  ctx.font="700 48px Arial";wrapText(ctx,"Autodiagnóstico de orden empresarial",96,200,870,58,2);
  ctx.font="700 54px Arial";wrapText(ctx,getLevel().archetype,96,370,870,64,2);
  ctx.font="700 36px Arial";ctx.fillText(`${getScore()}/24 · Orden actual según tus respuestas`,96,550);
  ctx.font="28px Arial";wrapText(ctx,getLevel().summary,96,620,870,39,4);
  ctx.font="700 34px Arial";ctx.fillText("Tus prioridades y primeras acciones",96,830);
  const weak=getWeakAreas();
  (weak.length?weak:[{name:"Mantener tu base",action:"Revisa tiempos, calidad y carga de trabajo cada semana para conservar la estructura que ya funciona."}]).forEach((area,i)=>{const y=910+i*240;ctx.fillStyle="#E6F1EE";drawRoundedRect(ctx,80,y-45,920,215,18);ctx.fillStyle="#45625D";ctx.font="700 30px Arial";wrapText(ctx,`${i+1}. ${area.name}`,104,y,850,38,2);ctx.font="27px Arial";wrapText(ctx,area.action,104,y+70,850,38,3);});
  ctx.fillStyle="#45625D";ctx.font="700 30px Arial";ctx.fillText("¿Quieres que revise tu negocio personalmente?",96,1685);ctx.font="26px Arial";wrapText(ctx,"Diagnóstico empresarial 360 · Informe, video y plan de trabajo · $49 USD",96,1740,870,34,2);
  ctx.font="22px Arial";ctx.fillText("kleyielimar.com · Orientación basada en tus respuestas",96,1820);
  const a=document.createElement("a");a.download="mi-resultado-kleyi-elimar.png";a.href=canvas.toDataURL("image/png");a.click();
}

function postEmbedHeight() {
  // Mide solo el contenido (no la ventana), para que la página que lo inserta
  // pueda ajustar la altura sin que crezca en bucle.
  const shell = document.querySelector(".shell");
  const height = Math.ceil(shell ? shell.getBoundingClientRect().height : document.body.offsetHeight);

  window.parent.postMessage(
    {
      source: "kleyi-diagnostico-orden",
      height: height + 8,
    },
    "*"
  );
}

const scheduleEmbedHeight = (() => {
  let frame = null;
  return () => {
    // setTimeout (no requestAnimationFrame): el navegador pausa las animaciones
    // de un iframe fuera de pantalla y la altura nunca se enviaría.
    if (frame) clearTimeout(frame);
    frame = setTimeout(postEmbedHeight, 60);
  };
})();

// Marca pasos del embudo en Microsoft Clarity (no envía datos personales).
function trackStep(eventName, tags = {}) {
  try {
    if (typeof window.clarity !== "function") return;
    window.clarity("event", eventName);
    Object.entries(tags).forEach(([key, value]) => window.clarity("set", key, String(value)));
  } catch (error) {
    // La medición nunca debe interrumpir el diagnóstico.
  }
}

function getScore() {
  return answers.reduce((sum, value) => sum + (Number.isInteger(value) ? value : 0), 0);
}

function getAnsweredCount() {
  return answers.filter(Number.isInteger).length;
}

function getLevel(score = getScore()) {
  return levels.find((level) => score >= level.min && score <= level.max) || levels[0];
}

// Devuelve hasta 3 áreas con menor puntaje promedio (las brechas reales de esta persona).
function getWeakAreas(limit = 3) {
  const totals = {};
  questionAreas.forEach((key, index) => {
    if (!Number.isInteger(answers[index])) return;
    totals[key] = totals[key] || { key, sum: 0, count: 0, first: index };
    totals[key].sum += answers[index];
    totals[key].count += 1;
  });
  return Object.values(totals)
    .map((item) => ({ ...item, avg: item.sum / item.count }))
    .filter((item) => item.avg < 2)
    .sort((a, b) => a.avg - b.avg || a.first - b.first)
    .slice(0, limit)
    .map((item) => ({ key: item.key, ...areas[item.key] }));
}

function getMainGap() {
  const [first] = getWeakAreas(1);
  return first ? first.gap : "Tus respuestas muestran una base organizada en todas las áreas evaluadas.";
}

function getRevenue() {
  return document.getElementById("leadRevenue")?.value || "";
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
    revenue_range: getRevenue(),
    completed_at: new Date().toISOString(),
    payload: { source: diagnosticSource, weak_areas: getWeakAreas().map((area) => area.name), answers: [...answers] },
    ...extra,
  };
}

function getSystemeLeadFields() {
  const names = CONFIG.systemeLeadFields;
  const values = {
    revenue: getRevenue(),
    archetype: getLevel().archetype,
    score: String(getScore()),
    mainGap: getMainGap(),
  };
  const fields = {};
  for (const [key, name] of Object.entries(names)) {
    if (name) fields[name] = values[key];
  }
  return fields;
}

async function saveLeadRecord(stage, extra = {}) {
  const payload = getLeadPayload(stage, extra);
  const storageKey = stage === "intake" ? "diagnosticoOrdenIntake" : "diagnosticoOrdenLead";
  window.localStorage.setItem(storageKey, JSON.stringify(payload));

  if (!CONFIG.supabaseUrl || !CONFIG.supabaseAnonKey) return payload;

  const response = await fetch(`${CONFIG.supabaseUrl}/rest/v1/${CONFIG.supabaseTable}`, {
    method: "POST",
    headers: {
      apikey: CONFIG.supabaseAnonKey,
      Authorization: `Bearer ${CONFIG.supabaseAnonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("No pudimos guardar tu resultado en el servidor.");
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
  persistSession();
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
    persistSession();
    renderQuestion();
    return;
  }

  document.querySelector(".diagnostic-layout").classList.add("hidden");
  trackStep("diagnostico_completo");
  persistSession(true);
  renderResult();
  recordCompletion();
});

// Use the official embedded form, with a confirmed redirect rather than an opaque fetch.
function registerWithSysteme(action = CONFIG.systemeFormAction, extraFields = {}, showConfirmation = false) {
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
    document.body.append(frame);
    document.body.append(form);
    let timer;
    function cleanup() {
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
      form.remove();
      if (!showConfirmation) frame.remove();
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


const startPanel = document.getElementById("startPanel");
const startForm = document.getElementById("startForm");
if (startForm) startForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!startForm.reportValidity()) return;
  const button = startForm.querySelector('button[type="submit"]');
  if (button.disabled) return;
  button.disabled = true;
  const status = document.getElementById("startStatus");
  status.textContent = "Guardando tu registro…";
  try {
    await registerWithSysteme(CONFIG.startFormAction);
    startPanel.classList.add("hidden");
    document.querySelector(".diagnostic-layout").classList.remove("hidden");
    document.querySelector(".diagnostic-layout").scrollIntoView({behavior:"smooth",block:"start"});
    document.querySelector(".tool-header").classList.add("is-started");
    persistSession();
    trackStep("diagnostico_iniciado");
  } catch (error) {
    status.textContent = "No pudimos confirmar tu registro. Revisa tu conexión y vuelve a pulsar Empezar; tus datos siguen aquí.";
  } finally {
    button.disabled = false;
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
  document.getElementById("buyerSignal").textContent = getWeakAreas()[0]?.action || "Mantén las prácticas que ya funcionan y revisa tus tiempos e indicadores periódicamente.";
  renderAreaMap();
  document.getElementById("shareArchetype").textContent = level.archetype;
  document.getElementById("shareSubtitle").textContent = level.visualSubtitle;
  document.getElementById("shareScore").textContent = `${score}/24`;
  document.getElementById("shareGap").textContent = getMainGap();
  document.getElementById("shareNext").textContent = level.handoff;
  document.getElementById("nextStepText").textContent = getWeakAreas()[0]?.action || "Elige un indicador de calidad o tiempo de entrega y revísalo cada semana para detectar cambios antes de que generen problemas.";
  const weakAreas = getWeakAreas();
  document.getElementById("reviewList").innerHTML = weakAreas.length
    ? weakAreas
        .map((area) => `<li><strong>${area.name}.</strong> ${area.gap} <span>${area.action}</span></li>`)
        .join("")
    : "<li><strong>Conserva lo que funciona.</strong> Tus respuestas no señalan áreas por debajo del máximo. Revisa periódicamente tiempos, calidad y carga de trabajo para comprobar que esa base se mantiene.</li>";

  capturePanel?.classList.add("hidden");
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
    `Brecha principal: ${getMainGap()}`,
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

downloadCardBtn.addEventListener("click", downloadDetailedReport);
startIntakeBtn.addEventListener("click", () => {
  trackStep("beneficios_diagnostico_360");
  window.open(CONFIG.bookingUrl, "_blank", "noopener,noreferrer");
});

window.addEventListener("load", scheduleEmbedHeight);
window.addEventListener("resize", scheduleEmbedHeight);

if (window.ResizeObserver) {
  new ResizeObserver(scheduleEmbedHeight).observe(document.body);
}

document.documentElement.classList.toggle("is-embedded", window.self !== window.top);
renderQuestion();
scheduleEmbedHeight();
// La página que lo inserta puede tardar en escuchar; se reenvía la altura al inicio.
[600, 1500, 3000, 6000].forEach((ms) => setTimeout(scheduleEmbedHeight, ms));



requestLeadContext();
[500,1200,2500].forEach(ms => setTimeout(requestLeadContext,ms));
try {
  const saved=JSON.parse(sessionStorage.getItem(SESSION_KEY)||"null");
  if(saved && Date.now()-saved.at<7200000 && saved.email && saved.name){
    beginWithContext({first_name:saved.name,email:saved.email},saved.source);
    if(Array.isArray(saved.answers)&&saved.answers.length===questions.length){saved.answers.forEach((v,i)=>answers[i]=[0,1,2].includes(v)?v:null);currentQuestion=Math.max(0,Math.min(11,saved.currentQuestion||0));renderQuestion();}
    if(saved.completed && getAnsweredCount()===12){document.querySelector(".diagnostic-layout").classList.add("hidden");renderResult();persistSession(true);}
  }
} catch {}
