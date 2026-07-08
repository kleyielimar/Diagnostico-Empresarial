const CONFIG = {
  diagnosticUrl: "https://info.kleyielimar.com/diagnostico-empresarial",
};

const calculatorForm = document.getElementById("calculatorForm");
const calculatorPanel = document.getElementById("calculatorPanel");
const capturePanel = document.getElementById("capturePanel");
const leadForm = document.getElementById("leadForm");
const resultPanel = document.getElementById("resultPanel");
const copySummaryBtn = document.getElementById("copySummaryBtn");
const downloadCardBtn = document.getElementById("downloadCardBtn");

let latestResult = null;

function postEmbedHeight() {
  const height = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight
  );

  window.parent.postMessage(
    {
      source: "kleyi-calculadora-horas-perdidas",
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

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, value));
}

function hours(value) {
  return `${Math.round(value)} h`;
}

function getNumber(data, key) {
  return Number(data.get(key) || 0);
}

function getLevel(monthlyHours) {
  if (monthlyHours < 10) {
    return {
      title: "Tu fuga operativa todavia es ligera",
      label: "Fuga ligera",
      line: "Hay pequenos escapes de tiempo, pero estas a tiempo de corregirlos antes de que se vuelvan rutina.",
      fix: "Elige un proceso repetido y conviertelo en una instruccion clara esta semana.",
      next: "Haz el diagnostico completo para confirmar si el problema esta en seguimiento, documentacion o delegacion.",
    };
  }

  if (monthlyHours < 25) {
    return {
      title: "Tu negocio tiene desorden silencioso",
      label: "Desorden silencioso",
      line: "El caos no siempre se ve como emergencia. A veces aparece como pequeñas fugas semanales que te quitan enfoque.",
      fix: "Centraliza informacion y define una ruta simple para seguimiento de clientes y prospectos.",
      next: "El diagnostico completo te ayudara a saber que ordenar primero antes de contratar o automatizar.",
    };
  }

  if (monthlyHours < 45) {
    return {
      title: "Tu desorden ya tiene costo visible",
      label: "Costo visible",
      line: "La operacion esta consumiendo horas que podrian estar en ventas, entrega, estrategia o descanso real.",
      fix: "Documenta los 3 procesos que mas se repiten y decide que se delega, que se automatiza y que sigue contigo.",
      next: "El diagnostico completo es el siguiente paso natural para convertir este numero en un plan de orden.",
    };
  }

  return {
    title: "Tu negocio tiene una fuga operativa seria",
    label: "Fuga operativa seria",
    line: "El desorden ya no es solo incomodidad. Probablemente esta afectando capacidad, energia y oportunidades de crecimiento.",
    fix: "Antes de agregar mas clientes, equipo o herramientas, necesitas mapear procesos criticos y reducir dependencia de tu memoria.",
    next: "Haz el diagnostico completo para identificar tu arquetipo operativo y preparar una conversacion con contexto.",
  };
}

function getMainLeak(values) {
  const leaks = [
    ["buscar informacion, archivos o mensajes", values.search_hours],
    ["seguimiento manual a clientes o prospectos", values.followup_hours],
    ["repetir explicaciones e instrucciones", values.repeat_hours],
    ["corregir o rehacer tareas delegadas", values.rework_hours],
  ];

  leaks.sort((a, b) => b[1] - a[1]);
  return leaks[0][0];
}

function calculate(data) {
  const values = {
    search_hours: getNumber(data, "search_hours"),
    followup_hours: getNumber(data, "followup_hours"),
    repeat_hours: getNumber(data, "repeat_hours"),
    rework_hours: getNumber(data, "rework_hours"),
    missed_leads: getNumber(data, "missed_leads"),
    hour_value: getNumber(data, "hour_value"),
    client_value: getNumber(data, "client_value"),
    close_rate: getNumber(data, "close_rate"),
  };

  const weeklyHours =
    values.search_hours + values.followup_hours + values.repeat_hours + values.rework_hours;
  const monthlyHours = weeklyHours * 4.33;
  const timeCost = monthlyHours * values.hour_value;
  const opportunityCost = values.missed_leads * values.client_value * values.close_rate;
  const monthlyImpact = timeCost + opportunityCost;
  const annualImpact = monthlyImpact * 12;
  const level = getLevel(monthlyHours);
  const mainLeak = getMainLeak(values);

  return {
    ...values,
    weeklyHours,
    monthlyHours,
    timeCost,
    opportunityCost,
    monthlyImpact,
    annualImpact,
    level,
    mainLeak,
  };
}

calculatorForm.addEventListener("submit", (event) => {
  event.preventDefault();
  latestResult = calculate(new FormData(calculatorForm));
  window.localStorage.setItem("calculadoraHorasDraft", JSON.stringify(latestResult));
  capturePanel.classList.remove("hidden");
  capturePanel.scrollIntoView({ behavior: "smooth", block: "start" });
  scheduleEmbedHeight();
});

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!latestResult) latestResult = calculate(new FormData(calculatorForm));

  const lead = {
    first_name: document.getElementById("leadName").value.trim(),
    email: document.getElementById("leadEmail").value.trim(),
    result: latestResult,
    completed_at: new Date().toISOString(),
  };

  window.localStorage.setItem("calculadoraHorasLead", JSON.stringify(lead));
  renderResult();
});

function renderResult() {
  const result = latestResult;
  document.getElementById("result-title").textContent = result.level.title;
  document.getElementById("resultSummary").textContent = result.level.line;
  document.getElementById("monthlyHours").textContent = hours(result.monthlyHours);
  document.getElementById("timeCost").textContent = money(result.timeCost);
  document.getElementById("opportunityCost").textContent = money(result.opportunityCost);
  document.getElementById("annualCost").textContent = money(result.annualImpact);
  document.getElementById("mainLeak").textContent = `Tu mayor fuga parece estar en ${result.mainLeak}.`;
  document.getElementById("firstFix").textContent = result.level.fix;
  document.getElementById("nextMove").textContent = result.level.next;
  document.getElementById("shareLevel").textContent = result.level.label;
  document.getElementById("shareLine").textContent = result.level.line;
  document.getElementById("shareHours").textContent = hours(result.monthlyHours);
  document.getElementById("shareLeak").textContent = result.mainLeak;

  capturePanel.classList.add("hidden");
  resultPanel.classList.remove("hidden");
  resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  scheduleEmbedHeight();
}

function buildSummaryText() {
  const result = latestResult;
  return [
    "Calculadora de Horas Perdidas - Kleyi Elimar",
    `Resultado: ${result.level.label}`,
    `Horas perdidas al mes: ${hours(result.monthlyHours)}`,
    `Costo mensual en tiempo: ${money(result.timeCost)}`,
    `Oportunidad posible sin seguimiento: ${money(result.opportunityCost)}`,
    `Impacto anual estimado: ${money(result.annualImpact)}`,
    `Mayor fuga: ${result.mainLeak}`,
  ].join("\n");
}

copySummaryBtn.addEventListener("click", async () => {
  if (!latestResult) return;
  await navigator.clipboard?.writeText(buildSummaryText()).catch(() => null);
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
  if (!latestResult) return;

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#e9f5f6";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#a3d2d5";
  ctx.globalAlpha = 0.55;
  ctx.beginPath();
  ctx.arc(910, 150, 300, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(130, 1190, 340, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#ffffff";
  drawRoundedRect(ctx, 72, 88, 936, 1174, 28);

  ctx.fillStyle = "#6aa5a9";
  ctx.font = "700 32px Arial";
  ctx.fillText("Kleyi Elimar", 120, 160);

  ctx.fillStyle = "#45625d";
  ctx.font = "900 58px Arial";
  wrapText(ctx, "Calculadora de Horas Perdidas", 120, 250, 820, 68, 3);

  ctx.fillStyle = "#6aa5a9";
  ctx.font = "700 28px Arial";
  ctx.fillText("Tu resultado", 120, 450);

  ctx.fillStyle = "#45625d";
  ctx.font = "900 72px Arial";
  wrapText(ctx, latestResult.level.label, 120, 540, 820, 82, 3);

  ctx.fillStyle = "#45625d";
  drawRoundedRect(ctx, 120, 745, 340, 190, 22);
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 74px Arial";
  ctx.fillText(hours(latestResult.monthlyHours), 158, 835);
  ctx.font = "700 24px Arial";
  ctx.fillText("Horas perdidas al mes", 158, 885);

  ctx.fillStyle = "#eef8f8";
  drawRoundedRect(ctx, 500, 745, 388, 190, 22);
  ctx.fillStyle = "#6aa5a9";
  ctx.font = "700 24px Arial";
  ctx.fillText("Impacto anual", 540, 815);
  ctx.fillStyle = "#45625d";
  ctx.font = "900 48px Arial";
  ctx.fillText(money(latestResult.annualImpact), 540, 875);

  ctx.fillStyle = "#45625d";
  ctx.font = "700 30px Arial";
  ctx.fillText("Mayor fuga", 120, 1040);
  ctx.font = "900 44px Arial";
  wrapText(ctx, latestResult.mainLeak, 120, 1110, 820, 54, 3);

  ctx.fillStyle = "#6aa5a9";
  ctx.font = "700 24px Arial";
  ctx.fillText("info.kleyielimar.com/diagnostico-empresarial", 120, 1215);

  const link = document.createElement("a");
  link.download = "calculadora-horas-perdidas-kleyi.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

window.addEventListener("load", scheduleEmbedHeight);
window.addEventListener("resize", scheduleEmbedHeight);

if (window.ResizeObserver) {
  new ResizeObserver(scheduleEmbedHeight).observe(document.body);
}

scheduleEmbedHeight();
