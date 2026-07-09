const SUPABASE_URL = "https://nrbrgovhgrrrwhnavszp.supabase.co";
const SUPABASE_KEY = "sb_publishable_bJ_RuYKg4XgORYJXZ3klFA_zLs1BZx9";
const REFRESH_MS = 30000;

const SOURCES = [
  {
    table: "calculadora_horas_leads",
    label: "Calculadora",
    stage: "Calculadora completada",
  },
  {
    table: "diagnostico_orden_leads",
    label: "Diagnostico",
    stage: "Diagnostico completado",
  },
];

const $ = (id) => document.getElementById(id);

async function fetchTable(table) {
  const endpoint = `${SUPABASE_URL}/rest/v1/${table}?select=*&order=created_at.desc&limit=1000`;
  const response = await fetch(endpoint, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`${table}: ${response.status} ${details}`);
  }

  return response.json();
}

async function fetchPublicDashboardRows() {
  const endpoint = `${SUPABASE_URL}/rest/v1/rpc/dashboard_funnel_public_rows`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    },
    body: "{}",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`dashboard_funnel_public_rows: ${response.status} ${details}`);
  }

  const rows = await response.json();
  if (!Array.isArray(rows)) return [];

  return rows.map((row) => ({
    ...row,
    _source: row.source || "Fuente",
    _stage: row.stage || row.source || "Registro",
    _date: getDate(row),
    _email: "",
    _name: row.contact_label || "",
    _weeklyHours: getNumeric(row, ["weekly_hours"]),
    _monthlyCost: getNumeric(row, ["monthly_cost"]),
    _level: row.level || "Sin clasificar",
    _signal: row.signal || "Registro recibido",
  }));
}

function getFirstValue(record, keys) {
  for (const key of keys) {
    if (record && record[key] !== undefined && record[key] !== null && record[key] !== "") {
      return record[key];
    }
  }
  return null;
}

function getDate(record) {
  const raw = getFirstValue(record, [
    "created_at",
    "createdAt",
    "submitted_at",
    "completed_at",
    "updated_at",
    "fecha",
    "date",
  ]);
  const date = raw ? new Date(raw) : new Date();
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function getEmail(record) {
  return getFirstValue(record, ["email", "correo", "lead_email", "contact_email"]) || "";
}

function getName(record) {
  return getFirstValue(record, ["first_name", "name", "nombre", "lead_name", "full_name"]) || "";
}

function maskEmail(email) {
  if (!email || !email.includes("@")) return "Contacto sin correo visible";
  const [name, domain] = email.split("@");
  const visibleName = name.length <= 2 ? `${name[0] || "*"}*` : `${name.slice(0, 2)}***`;
  return `${visibleName}@${domain}`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("es-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatMoney(value) {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, value || 0));
}

function getNumeric(record, keys) {
  const value = getFirstValue(record, keys);
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function getWeeklyHours(record) {
  const direct = getNumeric(record, [
    "weekly_hours_lost",
    "total_weekly_hours",
    "total_hours",
    "hours_lost",
    "horas_perdidas",
    "horas_semanales",
    "total_horas",
  ]);
  if (direct) return direct;

  return Object.entries(record || {}).reduce((sum, [key, value]) => {
    const normalized = key.toLowerCase();
    const isHourField = normalized.includes("hora") || normalized.includes("hour");
    const isMoneyOrRate = normalized.includes("rate") || normalized.includes("costo") || normalized.includes("cost");
    const number = Number(value);
    return isHourField && !isMoneyOrRate && Number.isFinite(number) ? sum + number : sum;
  }, 0);
}

function getMonthlyCost(record) {
  const direct = getNumeric(record, [
    "monthly_cost",
    "estimated_monthly_cost",
    "costo_mensual",
    "fuga_mensual",
    "monthly_loss",
  ]);
  if (direct) return direct;

  const hours = getWeeklyHours(record);
  const rate = getNumeric(record, ["hourly_rate", "rate", "valor_hora", "costo_hora"]);
  return hours && rate ? hours * rate * 4 : 0;
}

function getLevel(record) {
  const direct = getFirstValue(record, [
    "level",
    "nivel",
    "resultado",
    "result",
    "archetype",
    "arquetipo",
    "diagnostic_level",
  ]);
  if (direct) return String(direct);

  const score = getNumeric(record, ["score", "puntaje", "total_score"]);
  if (!score && score !== 0) return "Sin clasificar";
  if (score <= 8) return "Alta dependencia";
  if (score <= 15) return "Orden parcial";
  if (score <= 21) return "Base funcional";
  return "Listo para optimizar";
}

function getMainSignal(record) {
  const text = getFirstValue(record, [
    "main_pain",
    "pain",
    "dolor",
    "mayor_desorden",
    "biggest_problem",
    "resultado",
    "result",
    "level",
    "nivel",
  ]);
  if (text) return String(text);

  const hours = getWeeklyHours(record);
  if (hours) return `${hours.toFixed(1)} horas perdidas por semana`;
  return "Registro recibido";
}

function normalizeRows(rawBySource) {
  return rawBySource.flatMap(({ source, rows }) =>
    rows.map((record) => ({
      ...record,
      _source: source.label,
      _stage: source.stage,
      _date: getDate(record),
      _email: getEmail(record),
      _name: getName(record),
      _weeklyHours: getWeeklyHours(record),
      _monthlyCost: getMonthlyCost(record),
      _level: getLevel(record),
      _signal: getMainSignal(record),
    }))
  );
}

function countRecent(rows, days = 7) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return rows.filter((row) => row._date >= cutoff).length;
}

function setConnectionState(type, message) {
  const status = $("connectionStatus");
  status.classList.toggle("is-live", type === "live");
  status.classList.toggle("is-error", type === "error");
  status.innerHTML = `<span class="status-dot"></span>${message}`;
}

function renderKpis(rows, calculatorRows, diagnosticRows) {
  const weeklyHours = calculatorRows.reduce((sum, row) => sum + row._weeklyHours, 0);
  const monthlyCost = calculatorRows.reduce((sum, row) => sum + row._monthlyCost, 0);

  $("totalLeads").textContent = rows.length;
  $("recentLeads").textContent = countRecent(rows);
  $("weeklyHours").textContent = `${Math.round(weeklyHours)}h`;
  $("monthlyCost").textContent = formatMoney(monthlyCost);

  const conversion = calculatorRows.length
    ? Math.round((diagnosticRows.length / calculatorRows.length) * 100)
    : 0;
  $("conversionRate").textContent = `${conversion}% avanza al diagnostico`;
}

function renderFunnel(calculatorRows, diagnosticRows) {
  const stages = [
    ["Acceso al recurso", Math.max(calculatorRows.length, diagnosticRows.length)],
    ["Calculadora completada", calculatorRows.length],
    ["Diagnostico completado", diagnosticRows.length],
    ["Listas para conversacion", diagnosticRows.length],
  ];
  const max = Math.max(...stages.map((stage) => stage[1]), 1);

  $("funnelChart").innerHTML = stages
    .map(([label, count]) => {
      const width = Math.max((count / max) * 100, count ? 6 : 2);
      return `
        <div class="funnel-row">
          <span class="funnel-label">${label}</span>
          <div class="funnel-track">
            <div class="funnel-fill" style="width:${width}%"></div>
          </div>
          <span class="funnel-count">${count}</span>
        </div>
      `;
    })
    .join("");
}

function renderPainSignals(calculatorRows) {
  if (!calculatorRows.length) {
    $("painSignals").innerHTML = `
      <div class="empty-state">
        Cuando entren registros de la calculadora, aqui veremos que dolor operativo aparece con mas fuerza.
      </div>
    `;
    return;
  }

  const signals = [
    {
      label: "Horas perdidas por semana",
      value: calculatorRows.reduce((sum, row) => sum + row._weeklyHours, 0),
      suffix: "h",
    },
    {
      label: "Fuga mensual estimada",
      value: calculatorRows.reduce((sum, row) => sum + row._monthlyCost, 0),
      money: true,
    },
    {
      label: "Promedio por lead",
      value:
        calculatorRows.reduce((sum, row) => sum + row._weeklyHours, 0) / Math.max(calculatorRows.length, 1),
      suffix: "h",
    },
  ];
  const max = Math.max(...signals.map((signal) => signal.value), 1);

  $("painSignals").innerHTML = signals
    .map((signal) => {
      const formatted = signal.money ? formatMoney(signal.value) : `${signal.value.toFixed(1)}${signal.suffix}`;
      return `
        <div class="signal-item">
          <strong>${signal.label}</strong>
          <p>${formatted}</p>
          <div class="meter"><span style="width:${Math.max((signal.value / max) * 100, 4)}%"></span></div>
        </div>
      `;
    })
    .join("");
}

function renderDailyChart(rows) {
  const days = Array.from({ length: 14 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - index));
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const counts = days.map((date) => {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    return rows.filter((row) => row._date >= date && row._date < next).length;
  });
  const max = Math.max(...counts, 1);

  $("dailyChart").innerHTML = days
    .map((date, index) => {
      const height = Math.max((counts[index] / max) * 210, counts[index] ? 12 : 4);
      return `
        <div class="bar" title="${counts[index]} registros">
          <span style="height:${height}px"></span>
          <small>${date.getDate()}</small>
        </div>
      `;
    })
    .join("");
}

function renderLevelChart(diagnosticRows) {
  if (!diagnosticRows.length) {
    $("levelChart").innerHTML = `
      <div class="empty-state">
        Cuando alguien complete el diagnostico, aqui se agruparan sus niveles de orden.
      </div>
    `;
    return;
  }

  const groups = diagnosticRows.reduce((map, row) => {
    map.set(row._level, (map.get(row._level) || 0) + 1);
    return map;
  }, new Map());
  const max = Math.max(...groups.values(), 1);

  $("levelChart").innerHTML = [...groups.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([level, count]) => `
      <div class="level-row">
        <strong>${level}</strong>
        <p>${count} registro${count === 1 ? "" : "s"}</p>
        <div class="meter"><span style="width:${Math.max((count / max) * 100, 4)}%"></span></div>
      </div>
    `)
    .join("");
}

function renderInsights(rows, calculatorRows, diagnosticRows) {
  if (!rows.length) {
    $("insightOne").textContent =
      "La conexion esta lista; falta que haya registros visibles para empezar a leer comportamiento real.";
    $("insightTwo").textContent =
      "Cuando entre un lead nuevo, el panel lo reflejara sin editar la pagina.";
    $("insightThree").textContent =
      "El siguiente paso es hacer una prueba desde el formulario publico y confirmar que aparece aqui.";
    return;
  }

  const recent = countRecent(rows);
  const hours = calculatorRows.reduce((sum, row) => sum + row._weeklyHours, 0);
  const conversion = calculatorRows.length
    ? Math.round((diagnosticRows.length / calculatorRows.length) * 100)
    : 0;

  $("insightOne").textContent = `${recent} registro${recent === 1 ? "" : "s"} entraron en los ultimos 7 dias. Esto muestra si el recurso esta moviendo demanda reciente.`;
  $("insightTwo").textContent = calculatorRows.length
    ? `La calculadora ya esta mostrando una fuga acumulada de ${Math.round(hours)} horas por semana. Ese es el dolor que alimenta la secuencia de correos.`
    : "Aun no hay calculadoras visibles; cuando entren, esta lectura mostrara la fuga operativa.";
  $("insightThree").textContent = diagnosticRows.length
    ? `Hay ${diagnosticRows.length} persona${diagnosticRows.length === 1 ? "" : "s"} con diagnostico visible. La prioridad es llevarlas a una conversacion de orden empresarial.`
    : `La prioridad es convertir a diagnostico: hoy el avance estimado esta en ${conversion}%.`;
}

function renderTable(rows) {
  const recentRows = [...rows].sort((a, b) => b._date - a._date).slice(0, 10);

  if (!recentRows.length) {
    $("recentTable").innerHTML = `
      <tr>
        <td colspan="5">No hay registros visibles todavia. Haz una prueba desde el formulario y actualiza el panel.</td>
      </tr>
    `;
    return;
  }

  $("recentTable").innerHTML = recentRows
    .map((row) => `
      <tr>
        <td>${formatDate(row._date)}</td>
        <td>${row._source}</td>
        <td>${row._name || maskEmail(row._email)}</td>
        <td>${row._level}</td>
        <td>${row._signal}</td>
      </tr>
    `)
    .join("");
}

function renderDashboard(rows) {
  const calculatorRows = rows.filter((row) => row._source === "Calculadora");
  const diagnosticRows = rows.filter((row) => row._source === "Diagnostico");

  renderKpis(rows, calculatorRows, diagnosticRows);
  renderFunnel(calculatorRows, diagnosticRows);
  renderPainSignals(calculatorRows);
  renderDailyChart(rows);
  renderLevelChart(diagnosticRows);
  renderInsights(rows, calculatorRows, diagnosticRows);
  renderTable(rows);
}

async function refreshDashboard() {
  $("refreshButton").disabled = true;
  setConnectionState("loading", "Consultando Supabase");

  try {
    let rows;
    try {
      rows = await fetchPublicDashboardRows();
    } catch (safeViewError) {
      console.info("Usando lectura directa porque el resumen publico aun no existe.", safeViewError);
      const rawBySource = await Promise.all(
        SOURCES.map(async (source) => ({
          source,
          rows: await fetchTable(source.table),
        }))
      );
      rows = normalizeRows(rawBySource);
    }

    renderDashboard(rows);
    $("lastUpdated").textContent = `Actualizado ${new Intl.DateTimeFormat("es-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date())}`;
    setConnectionState("live", "Conectado en vivo");
  } catch (error) {
    console.error(error);
    setConnectionState("error", "Revisar conexion de datos");
    $("recentTable").innerHTML = `
      <tr>
        <td colspan="5">No pude leer Supabase: ${error.message}</td>
      </tr>
    `;
  } finally {
    $("refreshButton").disabled = false;
  }
}

$("refreshButton").addEventListener("click", refreshDashboard);
refreshDashboard();
window.setInterval(refreshDashboard, REFRESH_MS);
