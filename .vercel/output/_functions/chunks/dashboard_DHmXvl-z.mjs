import { c as createComponent } from './astro-component_DyxCdPd6.mjs';
import 'piccolore';
import { s as renderComponent, v as renderTemplate, q as maybeRenderHead, k as addAttribute } from './entrypoint_5kZAInLD.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_FDUS06cx.mjs';
import { s as supabase } from './supabase_BBuPOtL-.mjs';

const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const hoy = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const inicioMes = new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth(), 1).toISOString().split("T")[0];
  const { data: ventasEfectivo } = await supabase.from("ventas").select("*").eq("tipo_pago", "efectivo");
  const { data: gastosReales } = await supabase.from("gastos").select("*");
  const { data: pagosRecibidos } = await supabase.from("pagos_creditos").select("*").gte("fecha", inicioMes);
  const { data: pagosProveedores } = await supabase.from("pagos_proveedores").select("*").gte("fecha", inicioMes);
  const totalVentasRealesHoy = ventasEfectivo?.filter((v) => v.fecha === hoy).reduce((acc, v) => acc + v.total, 0) || 0;
  const totalGastosRealesHoy = gastosReales?.filter((g) => g.fecha === hoy).reduce((acc, g) => acc + g.monto, 0) || 0;
  const totalPagosRecibidosHoy = pagosRecibidos?.filter((p) => p.fecha === hoy).reduce((acc, p) => acc + p.monto, 0) || 0;
  const totalPagosProveedoresHoy = pagosProveedores?.filter((p) => p.fecha === hoy).reduce((acc, p) => acc + p.monto, 0) || 0;
  const totalVentasRealesMes = ventasEfectivo?.filter((v) => v.fecha >= inicioMes).reduce((acc, v) => acc + v.total, 0) || 0;
  const totalGastosRealesMes = gastosReales?.filter((g) => g.fecha >= inicioMes).reduce((acc, g) => acc + g.monto, 0) || 0;
  const totalPagosRecibidosMes = pagosRecibidos?.filter((p) => p.fecha >= inicioMes).reduce((acc, p) => acc + p.monto, 0) || 0;
  const totalPagosProveedoresMes = pagosProveedores?.filter((p) => p.fecha >= inicioMes).reduce((acc, p) => acc + p.monto, 0) || 0;
  const flujoCajaMes = totalVentasRealesMes + totalPagosRecibidosMes - (totalGastosRealesMes + totalPagosProveedoresMes);
  const { data: creditosPendientes } = await supabase.from("creditos").select("*").neq("estado", "pagado");
  const totalCreditosPendientes = creditosPendientes?.reduce((acc, c) => acc + c.saldo, 0) || 0;
  const { data: deudasPendientes } = await supabase.from("productos_fiados").select("*").eq("pagado", false);
  const totalDeudasPendientes = deudasPendientes?.reduce((acc, d) => acc + (d.total - (d.pagado || 0)), 0) || 0;
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": "Dashboard" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6 sm:space-y-8"> <div> <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">📊 Dashboard financiero</h1> <p class="text-sm text-gray-600">Flujo de caja REAL - Solo efectivo disponible</p> </div> <!-- CAJA REAL - Dinero que realmente tienes --> <div class="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-6 text-white shadow-xl"> <div class="flex items-center justify-between"> <div> <p class="text-sm opacity-90">💰 EFECTIVO EN CAJA</p> <p class="text-3xl sm:text-4xl font-bold mt-1">S/ ${flujoCajaMes.toFixed(2)}</p> <p class="text-xs opacity-75 mt-2">Disponible para operar</p> </div> <div class="text-5xl">💵</div> </div> </div> <!-- Resumen hoy --> <div> <h2 class="text-xl font-bold text-gray-800 mb-4">📅 Movimientos de hoy</h2> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> <div class="bg-white rounded-xl p-5 shadow-soft border-l-4 border-green-500"> <p class="text-gray-500 text-sm">✅ Ingresos (ventas)</p> <p class="text-2xl font-bold text-green-600">S/ ${totalVentasRealesHoy.toFixed(2)}</p> </div> <div class="bg-white rounded-xl p-5 shadow-soft border-l-4 border-blue-500"> <p class="text-gray-500 text-sm">💳 Cobros de créditos</p> <p class="text-2xl font-bold text-blue-600">S/ ${totalPagosRecibidosHoy.toFixed(2)}</p> </div> <div class="bg-white rounded-xl p-5 shadow-soft border-l-4 border-red-500"> <p class="text-gray-500 text-sm">❌ Egresos (gastos)</p> <p class="text-2xl font-bold text-red-600">S/ ${totalGastosRealesHoy.toFixed(2)}</p> </div> <div class="bg-white rounded-xl p-5 shadow-soft border-l-4 border-orange-500"> <p class="text-gray-500 text-sm">📦 Pagos a proveedores</p> <p class="text-2xl font-bold text-orange-600">S/ ${totalPagosProveedoresHoy.toFixed(2)}</p> </div> </div> </div> <!-- Gráfico de flujo de caja mensual --> <div class="bg-white rounded-xl shadow-soft p-6"> <h2 class="text-xl font-bold text-gray-800 mb-4">📈 Flujo de caja del mes</h2> <div class="space-y-3"> <div> <div class="flex justify-between text-sm mb-1"> <span>Ingresos totales</span> <span class="font-semibold text-green-600">S/ ${(totalVentasRealesMes + totalPagosRecibidosMes).toFixed(2)}</span> </div> <div class="h-3 bg-gray-200 rounded-full overflow-hidden"> <div class="h-full bg-green-500 rounded-full" style="width: 70%"></div> </div> </div> <div> <div class="flex justify-between text-sm mb-1"> <span>Egresos totales</span> <span class="font-semibold text-red-600">S/ ${(totalGastosRealesMes + totalPagosProveedoresMes).toFixed(2)}</span> </div> <div class="h-3 bg-gray-200 rounded-full overflow-hidden"> <div class="h-full bg-red-500 rounded-full" style="width: 45%"></div> </div> </div> <div class="pt-3 border-t"> <div class="flex justify-between text-base"> <span class="font-bold">💰 Flujo neto</span> <span${addAttribute(`font-bold text-xl ${flujoCajaMes >= 0 ? "text-green-600" : "text-red-600"}`, "class")}>
S/ ${flujoCajaMes.toFixed(2)} </span> </div> </div> </div> </div> <!-- CUENTAS POR COBRAR Y PAGAR (No afectan caja) --> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"> <!-- Créditos pendientes (nos deben) --> <div class="bg-yellow-50 rounded-xl p-5 border border-yellow-200"> <div class="flex items-center justify-between mb-3"> <h3 class="font-bold text-yellow-800">💰 Cuentas por cobrar</h3> <span class="text-2xl">👥</span> </div> <p class="text-2xl font-bold text-yellow-700">S/ ${totalCreditosPendientes.toFixed(2)}</p> <p class="text-xs text-yellow-600 mt-2">⚠️ Este dinero NO está disponible en caja</p> <a href="/creditos" class="inline-block mt-3 text-sm text-yellow-700 hover:underline">Ver créditos pendientes →</a> </div> <!-- Deudas pendientes (debemos) --> <div class="bg-orange-50 rounded-xl p-5 border border-orange-200"> <div class="flex items-center justify-between mb-3"> <h3 class="font-bold text-orange-800">📦 Cuentas por pagar</h3> <span class="text-2xl">🏪</span> </div> <p class="text-2xl font-bold text-orange-700">S/ ${totalDeudasPendientes.toFixed(2)}</p> <p class="text-xs text-orange-600 mt-2">⚠️ Productos fiados que debes pagar</p> <a href="/productos-fiados" class="inline-block mt-3 text-sm text-orange-700 hover:underline">Ver deudas pendientes →</a> </div> </div> <!-- Indicador de salud financiera --> <div class="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white"> <h3 class="font-bold mb-3">📊 Indicadores financieros</h3> <div class="grid grid-cols-2 sm:grid-cols-4 gap-4"> <div> <p class="text-xs opacity-75">Liquidez inmediata</p> <p class="text-xl font-bold">${flujoCajaMes > 0 ? "👍 Buena" : "⚠️ Baja"}</p> </div> <div> <p class="text-xs opacity-75">Ratio de cobro</p> <p class="text-xl font-bold">${totalCreditosPendientes > 0 ? (totalPagosRecibidosMes / (totalCreditosPendientes + totalPagosRecibidosMes) * 100).toFixed(0) : 0}%</p> </div> <div> <p class="text-xs opacity-75">Días de caja</p> <p class="text-xl font-bold">${Math.floor(flujoCajaMes / ((totalGastosRealesMes + totalPagosProveedoresMes) / 30 || 1))}</p> </div> <div> <p class="text-xs opacity-75">Saldo real</p> <p class="text-xl font-bold">S/ ${flujoCajaMes.toFixed(0)}</p> </div> </div> </div> </div> ` })}`;
}, "C:/Users/Administrador/Desktop/qaleta/src/pages/dashboard.astro", void 0);

const $$file = "C:/Users/Administrador/Desktop/qaleta/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
