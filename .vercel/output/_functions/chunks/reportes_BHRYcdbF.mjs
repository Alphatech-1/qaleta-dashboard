import { c as createComponent } from './astro-component_Bz1idbRS.mjs';
import 'piccolore';
import { s as renderComponent, v as renderTemplate, q as maybeRenderHead, k as addAttribute } from './entrypoint_BoMskoFd.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_BQnVw-Qk.mjs';
import { s as supabase } from './supabase_BBuPOtL-.mjs';

const $$Reportes = createComponent(async ($$result, $$props, $$slots) => {
  const hoy = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const inicioMes = new Date(
    (/* @__PURE__ */ new Date()).getFullYear(),
    (/* @__PURE__ */ new Date()).getMonth(),
    1
  ).toISOString().split("T")[0];
  const [{ data: ventas }, { data: gastos }] = await Promise.all([
    supabase.from("ventas").select("*"),
    supabase.from("gastos").select("*")
  ]);
  const ventasHoy = ventas?.filter((v) => v.fecha === hoy) || [];
  const gastosHoy = gastos?.filter((g) => g.fecha === hoy) || [];
  const ventasMes = ventas?.filter((v) => v.fecha >= inicioMes) || [];
  const gastosMes = gastos?.filter((g) => g.fecha >= inicioMes) || [];
  const totalVentasHoy = ventasHoy.reduce((acc, v) => acc + Number(v.total), 0);
  const totalGastosHoy = gastosHoy.reduce((acc, g) => acc + Number(g.monto), 0);
  const gananciaHoy = totalVentasHoy - totalGastosHoy;
  const totalVentasMes = ventasMes.reduce((acc, v) => acc + Number(v.total), 0);
  const totalGastosMes = gastosMes.reduce((acc, g) => acc + Number(g.monto), 0);
  const gananciaMes = totalVentasMes - totalGastosMes;
  const margenGananciaMes = totalVentasMes > 0 ? gananciaMes / totalVentasMes * 100 : 0;
  const margenGananciaHoy = totalVentasHoy > 0 ? gananciaHoy / totalVentasHoy * 100 : 0;
  const productosMap = {};
  ventasMes.forEach((venta) => {
    const nombre = venta.producto;
    if (!productosMap[nombre]) {
      productosMap[nombre] = 0;
    }
    productosMap[nombre] += venta.cantidad;
  });
  const topProductos = Object.entries(productosMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const ultimos7Dias = [];
  for (let i = 6; i >= 0; i--) {
    const fecha = /* @__PURE__ */ new Date();
    fecha.setDate(fecha.getDate() - i);
    const fechaStr = fecha.toISOString().split("T")[0];
    const ventasDia = ventas?.filter((v) => v.fecha === fechaStr) || [];
    const totalDia = ventasDia.reduce((acc, v) => acc + Number(v.total), 0);
    ultimos7Dias.push({
      fecha: fechaStr,
      dia: fecha.toLocaleDateString("es-PE", { weekday: "short" }),
      total: totalDia
    });
  }
  const gastosPorCategoria = {};
  gastosMes.forEach((gasto) => {
    const categoria = gasto.categoria;
    if (!gastosPorCategoria[categoria]) {
      gastosPorCategoria[categoria] = 0;
    }
    gastosPorCategoria[categoria] += Number(gasto.monto);
  });
  const topCategorias = Object.entries(gastosPorCategoria).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const totalProductosVendidos = ventasMes.reduce((acc, v) => acc + v.cantidad, 0);
  const ticketPromedio = ventasMes.length > 0 ? totalVentasMes / ventasMes.length : 0;
  const categoriaIconos = {
    "Insumos": { icono: "🥩", color: "bg-orange-500" },
    "Gas": { icono: "🔥", color: "bg-red-500" },
    "Bebidas": { icono: "🥤", color: "bg-blue-500" },
    "Personal": { icono: "👥", color: "bg-purple-500" },
    "Publicidad": { icono: "📢", color: "bg-pink-500" },
    "Otros": { icono: "📦", color: "bg-gray-500" }
  };
  const nombreMes = (/* @__PURE__ */ new Date()).toLocaleDateString("es-PE", { month: "long" });
  const anioActual = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": "Reportes", "data-astro-cid-hdplutls": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6 sm:space-y-8" data-astro-cid-hdplutls> <!-- Encabezado --> <div data-astro-cid-hdplutls> <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2" data-astro-cid-hdplutls>📈 Reportes y análisis</h1> <p class="text-sm sm:text-base text-gray-600" data-astro-cid-hdplutls>Visualiza el rendimiento de tu negocio</p> <p class="text-xs text-gray-500 mt-2" data-astro-cid-hdplutls>${nombreMes} ${anioActual}</p> </div> <!-- Cards de resumen --> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5" data-astro-cid-hdplutls> <!-- Ventas Hoy --> <div class="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-white shadow-lg hover:shadow-xl transition-all" data-astro-cid-hdplutls> <div class="flex items-center justify-between mb-3" data-astro-cid-hdplutls> <p class="text-sm opacity-90" data-astro-cid-hdplutls>Ventas hoy</p> <span class="text-2xl" data-astro-cid-hdplutls>💰</span> </div> <h2 class="text-xl sm:text-2xl font-bold" data-astro-cid-hdplutls>S/ ${totalVentasHoy.toFixed(2)}</h2> <p class="text-xs opacity-75 mt-2" data-astro-cid-hdplutls>${ventasHoy.length} transacciones</p> </div> <!-- Gastos Hoy --> <div class="bg-gradient-to-br from-red-500 to-rose-600 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-white shadow-lg hover:shadow-xl transition-all" data-astro-cid-hdplutls> <div class="flex items-center justify-between mb-3" data-astro-cid-hdplutls> <p class="text-sm opacity-90" data-astro-cid-hdplutls>Gastos hoy</p> <span class="text-2xl" data-astro-cid-hdplutls>🧾</span> </div> <h2 class="text-xl sm:text-2xl font-bold" data-astro-cid-hdplutls>S/ ${totalGastosHoy.toFixed(2)}</h2> <p class="text-xs opacity-75 mt-2" data-astro-cid-hdplutls>${gastosHoy.length} gastos</p> </div> <!-- Ganancia Hoy --> <div${addAttribute(`bg-gradient-to-br rounded-xl sm:rounded-2xl p-4 sm:p-5 text-white shadow-lg hover:shadow-xl transition-all ${gananciaHoy >= 0 ? "from-blue-500 to-indigo-600" : "from-orange-500 to-red-600"}`, "class")} data-astro-cid-hdplutls> <div class="flex items-center justify-between mb-3" data-astro-cid-hdplutls> <p class="text-sm opacity-90" data-astro-cid-hdplutls>Ganancia hoy</p> <span class="text-2xl" data-astro-cid-hdplutls>📈</span> </div> <h2 class="text-xl sm:text-2xl font-bold" data-astro-cid-hdplutls>S/ ${gananciaHoy.toFixed(2)}</h2> <p class="text-xs opacity-75 mt-2" data-astro-cid-hdplutls>Margen: ${margenGananciaHoy.toFixed(1)}%</p> </div> <!-- Ticket Promedio --> <div class="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-white shadow-lg hover:shadow-xl transition-all" data-astro-cid-hdplutls> <div class="flex items-center justify-between mb-3" data-astro-cid-hdplutls> <p class="text-sm opacity-90" data-astro-cid-hdplutls>Ticket promedio</p> <span class="text-2xl" data-astro-cid-hdplutls>🎫</span> </div> <h2 class="text-xl sm:text-2xl font-bold" data-astro-cid-hdplutls>S/ ${ticketPromedio.toFixed(2)}</h2> <p class="text-xs opacity-75 mt-2" data-astro-cid-hdplutls>Por venta</p> </div> </div> <!-- Resumen del mes --> <div class="grid grid-cols-1 lg:grid-cols-3 gap-5" data-astro-cid-hdplutls> <!-- Ventas del mes --> <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-5 sm:p-6 border border-gray-100" data-astro-cid-hdplutls> <div class="flex items-center justify-between mb-4" data-astro-cid-hdplutls> <div data-astro-cid-hdplutls> <p class="text-gray-500 text-sm" data-astro-cid-hdplutls>Ventas del mes</p> <h3 class="text-2xl font-bold text-gray-800" data-astro-cid-hdplutls>S/ ${totalVentasMes.toFixed(2)}</h3> </div> <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center" data-astro-cid-hdplutls> <span class="text-2xl" data-astro-cid-hdplutls>💰</span> </div> </div> <div class="mt-3" data-astro-cid-hdplutls> <div class="h-2 bg-gray-200 rounded-full overflow-hidden" data-astro-cid-hdplutls> <div class="h-full bg-green-500 rounded-full" style="width: 75%" data-astro-cid-hdplutls></div> </div> <p class="text-xs text-gray-500 mt-2" data-astro-cid-hdplutls>${ventasMes.length} ventas realizadas</p> </div> </div> <!-- Gastos del mes --> <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-5 sm:p-6 border border-gray-100" data-astro-cid-hdplutls> <div class="flex items-center justify-between mb-4" data-astro-cid-hdplutls> <div data-astro-cid-hdplutls> <p class="text-gray-500 text-sm" data-astro-cid-hdplutls>Gastos del mes</p> <h3 class="text-2xl font-bold text-gray-800" data-astro-cid-hdplutls>S/ ${totalGastosMes.toFixed(2)}</h3> </div> <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center" data-astro-cid-hdplutls> <span class="text-2xl" data-astro-cid-hdplutls>🧾</span> </div> </div> <div class="mt-3" data-astro-cid-hdplutls> <div class="h-2 bg-gray-200 rounded-full overflow-hidden" data-astro-cid-hdplutls> <div class="h-full bg-red-500 rounded-full" style="width: 60%" data-astro-cid-hdplutls></div> </div> <p class="text-xs text-gray-500 mt-2" data-astro-cid-hdplutls>${gastosMes.length} gastos registrados</p> </div> </div> <!-- Ganancia del mes --> <div${addAttribute(`bg-white rounded-xl sm:rounded-2xl shadow-soft p-5 sm:p-6 border ${gananciaMes >= 0 ? "border-green-200" : "border-red-200"}`, "className")} data-astro-cid-hdplutls> <div class="flex items-center justify-between mb-4" data-astro-cid-hdplutls> <div data-astro-cid-hdplutls> <p class="text-gray-500 text-sm" data-astro-cid-hdplutls>Ganancia neta del mes</p> <h3${addAttribute(`text-2xl font-bold ${gananciaMes >= 0 ? "text-green-600" : "text-red-600"}`, "className")} data-astro-cid-hdplutls>
S/ ${gananciaMes.toFixed(2)} </h3> </div> <div${addAttribute(`w-12 h-12 rounded-xl flex items-center justify-center ${gananciaMes >= 0 ? "bg-green-100" : "bg-red-100"}`, "className")} data-astro-cid-hdplutls> <span class="text-2xl" data-astro-cid-hdplutls>📊</span> </div> </div> <div class="mt-3" data-astro-cid-hdplutls> <div class="flex justify-between text-sm mb-1" data-astro-cid-hdplutls> <span data-astro-cid-hdplutls>Margen de ganancia</span> <span${addAttribute(`font-semibold ${margenGananciaMes >= 0 ? "text-green-600" : "text-red-600"}`, "className")} data-astro-cid-hdplutls> ${margenGananciaMes.toFixed(1)}%
</span> </div> <div class="h-2 bg-gray-200 rounded-full overflow-hidden" data-astro-cid-hdplutls> <div${addAttribute(`h-full rounded-full ${margenGananciaMes >= 0 ? "bg-green-500" : "bg-red-500"}`, "className")}${addAttribute({ width: `${Math.min(Math.abs(margenGananciaMes), 100)}%` }, "style")} data-astro-cid-hdplutls></div> </div> </div> </div> </div> <!-- Gráfico de ventas últimos 7 días --> <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-5 sm:p-6 border border-gray-100" data-astro-cid-hdplutls> <div class="flex items-center justify-between mb-6" data-astro-cid-hdplutls> <div data-astro-cid-hdplutls> <h2 class="text-lg sm:text-xl font-bold text-gray-800" data-astro-cid-hdplutls>📊 Ventas últimos 7 días</h2> <p class="text-xs text-gray-500 mt-1" data-astro-cid-hdplutls>Evolución diaria de ventas</p> </div> <span class="text-2xl" data-astro-cid-hdplutls>📈</span> </div> <div class="flex items-end justify-between gap-2 sm:gap-4 h-48 sm:h-56" data-astro-cid-hdplutls> ${ultimos7Dias.map((dia) => {
    const maxVenta = Math.max(...ultimos7Dias.map((d) => d.total), 1);
    dia.total / maxVenta * 100;
    return renderTemplate`<div${addAttribute(dia.fecha, "key")} class="flex-1 flex flex-col items-center gap-2" data-astro-cid-hdplutls> <div class="w-full bg-green-100 rounded-lg overflow-hidden" style="height: 100px;" data-astro-cid-hdplutls> <div class="bg-green-500 transition-all duration-500 rounded-lg" style="height: \${altura}%; width: 100%;" data-astro-cid-hdplutls></div> </div> <div class="text-center" data-astro-cid-hdplutls> <p class="text-xs sm:text-sm font-semibold text-gray-700" data-astro-cid-hdplutls>${dia.dia}</p> <p class="text-[10px] sm:text-xs text-gray-500" data-astro-cid-hdplutls>S/${dia.total.toFixed(0)}</p> </div> </div>`;
  })} </div> </div> <!-- Top Productos y Top Gastos --> <div class="grid grid-cols-1 lg:grid-cols-2 gap-5" data-astro-cid-hdplutls> <!-- Productos más vendidos --> <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft border border-gray-100 overflow-hidden" data-astro-cid-hdplutls> <div class="px-5 sm:px-6 py-4 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-gray-200" data-astro-cid-hdplutls> <div class="flex items-center gap-2" data-astro-cid-hdplutls> <span class="text-2xl" data-astro-cid-hdplutls>🌭</span> <h2 class="text-lg sm:text-xl font-bold text-gray-800" data-astro-cid-hdplutls>Top productos más vendidos</h2> </div> <p class="text-xs text-gray-500 mt-1" data-astro-cid-hdplutls>Total de productos: ${totalProductosVendidos} unidades</p> </div> <div class="divide-y divide-gray-100" data-astro-cid-hdplutls> ${topProductos.length === 0 ? renderTemplate`<div class="p-8 text-center text-gray-500" data-astro-cid-hdplutls> <div class="text-4xl mb-2" data-astro-cid-hdplutls>📭</div> <p data-astro-cid-hdplutls>No hay ventas registradas este mes</p> </div>` : topProductos.map((producto, index) => {
    const porcentaje = producto[1] / totalProductosVendidos * 100;
    return renderTemplate`<div${addAttribute(producto[0], "key")} class="p-4 sm:p-5 hover:bg-gray-50 transition-colors" data-astro-cid-hdplutls> <div class="flex items-center justify-between mb-2" data-astro-cid-hdplutls> <div class="flex items-center gap-3" data-astro-cid-hdplutls> <div${addAttribute(`w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold ${index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-orange-600" : "bg-gray-300"}`, "class")} data-astro-cid-hdplutls>
#${index + 1} </div> <span class="font-semibold text-gray-800" data-astro-cid-hdplutls>${producto[0]}</span> </div> <span class="text-lg font-bold text-green-600" data-astro-cid-hdplutls>${producto[1]} uds.</span> </div> <div class="h-2 bg-gray-200 rounded-full overflow-hidden" data-astro-cid-hdplutls> <div class="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style="width: \${porcentaje}%" data-astro-cid-hdplutls></div> </div> <p class="text-xs text-gray-500 mt-1" data-astro-cid-hdplutls>${porcentaje.toFixed(1)}% del total</p> </div>`;
  })} </div> </div> <!-- Gastos por categoría --> <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft border border-gray-100 overflow-hidden" data-astro-cid-hdplutls> <div class="px-5 sm:px-6 py-4 bg-gradient-to-r from-red-50 to-rose-50 border-b border-gray-200" data-astro-cid-hdplutls> <div class="flex items-center gap-2" data-astro-cid-hdplutls> <span class="text-2xl" data-astro-cid-hdplutls>📊</span> <h2 class="text-lg sm:text-xl font-bold text-gray-800" data-astro-cid-hdplutls>Distribución de gastos</h2> </div> <p class="text-xs text-gray-500 mt-1" data-astro-cid-hdplutls>Por categoría este mes</p> </div> <div class="divide-y divide-gray-100" data-astro-cid-hdplutls> ${topCategorias.length === 0 ? renderTemplate`<div class="p-8 text-center text-gray-500" data-astro-cid-hdplutls> <div class="text-4xl mb-2" data-astro-cid-hdplutls>📭</div> <p data-astro-cid-hdplutls>No hay gastos registrados este mes</p> </div>` : topCategorias.map(([categoria, monto]) => {
    const porcentaje = monto / totalGastosMes * 100;
    const { icono, color } = categoriaIconos[categoria] || { icono: "📦", color: "bg-gray-500" };
    return renderTemplate`<div${addAttribute(categoria, "key")} class="p-4 sm:p-5 hover:bg-gray-50 transition-colors" data-astro-cid-hdplutls> <div class="flex items-center justify-between mb-2" data-astro-cid-hdplutls> <div class="flex items-center gap-3" data-astro-cid-hdplutls> <div${addAttribute(`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-white`, "className")} data-astro-cid-hdplutls> <span data-astro-cid-hdplutls>${icono}</span> </div> <span class="font-semibold text-gray-800" data-astro-cid-hdplutls>${categoria}</span> </div> <span class="text-base sm:text-lg font-bold text-red-600" data-astro-cid-hdplutls>S/ ${monto.toFixed(2)}</span> </div> <div class="h-2 bg-gray-200 rounded-full overflow-hidden" data-astro-cid-hdplutls> <div${addAttribute(`h-full rounded-full ${color.replace("bg", "bg")}`, "className")} style="width: \${porcentaje}%" data-astro-cid-hdplutls></div> </div> <p class="text-xs text-gray-500 mt-1" data-astro-cid-hdplutls>${porcentaje.toFixed(1)}% del total</p> </div>`;
  })} </div> ${topCategorias.length > 0 && renderTemplate`<div class="px-5 sm:px-6 py-3 bg-gray-50 border-t border-gray-200" data-astro-cid-hdplutls> <div class="flex justify-between items-center" data-astro-cid-hdplutls> <span class="text-sm font-semibold text-gray-700" data-astro-cid-hdplutls>Total gastos</span> <span class="text-lg font-bold text-red-600" data-astro-cid-hdplutls>S/ ${totalGastosMes.toFixed(2)}</span> </div> </div>`} </div> </div> <!-- Indicadores clave de rendimiento --> <div class="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white" data-astro-cid-hdplutls> <h3 class="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2" data-astro-cid-hdplutls> <span data-astro-cid-hdplutls>🎯</span> KPIs del negocio
</h3> <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6" data-astro-cid-hdplutls> <div class="text-center" data-astro-cid-hdplutls> <div class="text-2xl sm:text-3xl mb-2" data-astro-cid-hdplutls>💰</div> <p class="text-sm font-semibold" data-astro-cid-hdplutls>Eficiencia</p> <p class="text-lg sm:text-xl font-bold text-green-400" data-astro-cid-hdplutls>${margenGananciaMes.toFixed(1)}%</p> <p class="text-xs opacity-75" data-astro-cid-hdplutls>Margen de ganancia</p> </div> <div class="text-center" data-astro-cid-hdplutls> <div class="text-2xl sm:text-3xl mb-2" data-astro-cid-hdplutls>📊</div> <p class="text-sm font-semibold" data-astro-cid-hdplutls>Rentabilidad</p> <p class="text-lg sm:text-xl font-bold text-blue-400" data-astro-cid-hdplutls>S/ ${(gananciaMes / (totalGastosMes || 1)).toFixed(2)}</p> <p class="text-xs opacity-75" data-astro-cid-hdplutls>Ganancia por gasto</p> </div> <div class="text-center" data-astro-cid-hdplutls> <div class="text-2xl sm:text-3xl mb-2" data-astro-cid-hdplutls>🎫</div> <p class="text-sm font-semibold" data-astro-cid-hdplutls>Ticket medio</p> <p class="text-lg sm:text-xl font-bold text-purple-400" data-astro-cid-hdplutls>S/ ${ticketPromedio.toFixed(2)}</p> <p class="text-xs opacity-75" data-astro-cid-hdplutls>Por transacción</p> </div> <div class="text-center" data-astro-cid-hdplutls> <div class="text-2xl sm:text-3xl mb-2" data-astro-cid-hdplutls>📈</div> <p class="text-sm font-semibold" data-astro-cid-hdplutls>Volumen</p> <p class="text-lg sm:text-xl font-bold text-orange-400" data-astro-cid-hdplutls>${totalProductosVendidos}</p> <p class="text-xs opacity-75" data-astro-cid-hdplutls>Productos vendidos</p> </div> </div> </div> </div> ` })}`;
}, "C:/Users/Administrador/Desktop/qaleta/src/pages/reportes.astro", void 0);

const $$file = "C:/Users/Administrador/Desktop/qaleta/src/pages/reportes.astro";
const $$url = "/reportes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Reportes,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
