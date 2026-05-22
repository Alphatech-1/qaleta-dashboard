import { c as createComponent } from './astro-component_DyxCdPd6.mjs';
import 'piccolore';
import { s as renderComponent, v as renderTemplate, q as maybeRenderHead, k as addAttribute } from './entrypoint_5kZAInLD.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_FDUS06cx.mjs';
import { s as supabase } from './supabase_BBuPOtL-.mjs';

const prerender = false;
const $$Gastos = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Gastos;
  let mensaje = "";
  const editId = Astro2.url.searchParams.get("edit");
  let gastoEditar = null;
  if (editId) {
    const { data } = await supabase.from("gastos").select("*").eq("id", editId).single();
    gastoEditar = data;
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const deleteId = formData.get("deleteId");
    const updateId = formData.get("updateId");
    if (deleteId) {
      const { error } = await supabase.from("gastos").delete().eq("id", deleteId);
      if (error) {
        mensaje = error.message;
      } else {
        return Astro2.redirect("/gastos");
      }
    } else if (updateId) {
      const categoria = formData.get("categoria")?.toString();
      const descripcion = formData.get("descripcion")?.toString();
      const monto = Number(formData.get("monto"));
      const fecha = formData.get("fecha")?.toString();
      const { error } = await supabase.from("gastos").update({ categoria, descripcion, monto, fecha }).eq("id", updateId);
      if (error) {
        mensaje = error.message;
      } else {
        return Astro2.redirect("/gastos");
      }
    } else {
      const categoria = formData.get("categoria")?.toString();
      const descripcion = formData.get("descripcion")?.toString();
      const monto = Number(formData.get("monto"));
      const fecha = formData.get("fecha")?.toString();
      const { error } = await supabase.from("gastos").insert([{ categoria, descripcion, monto, fecha }]);
      if (error) {
        mensaje = error.message;
      } else {
        return Astro2.redirect("/gastos");
      }
    }
  }
  const { data: gastos } = await supabase.from("gastos").select("*").order("fecha", { ascending: false });
  const totalGastos = gastos?.reduce((sum, g) => sum + g.monto, 0) || 0;
  const categoriasIconos = {
    "Insumos": "🥩",
    "Gas": "🔥",
    "Bebidas": "🥤",
    "Personal": "👥",
    "Publicidad": "📢",
    "Otros": "📦"
  };
  const getCategoriaColor = (categoria) => {
    const colores = {
      "Insumos": "bg-orange-100 text-orange-700",
      "Gas": "bg-red-100 text-red-700",
      "Bebidas": "bg-blue-100 text-blue-700",
      "Personal": "bg-purple-100 text-purple-700",
      "Publicidad": "bg-pink-100 text-pink-700",
      "Otros": "bg-gray-100 text-gray-700"
    };
    return colores[categoria] || "bg-gray-100 text-gray-700";
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": "Control de gastos", "data-astro-cid-m6fnanly": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-8" data-astro-cid-m6fnanly> <!-- Encabezado de sección --> <div class="mb-8" data-astro-cid-m6fnanly> <h1 class="text-3xl font-bold text-gray-800 mb-2" data-astro-cid-m6fnanly>🧾 Control de gastos</h1> <p class="text-gray-600" data-astro-cid-m6fnanly>Administra todos los gastos del negocio</p> </div> <!-- Mensaje de error --> ${mensaje && renderTemplate`<div class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" data-astro-cid-m6fnanly> <div class="flex items-center gap-2" data-astro-cid-m6fnanly> <span class="text-xl" data-astro-cid-m6fnanly>⚠️</span> <p class="font-medium" data-astro-cid-m6fnanly>${mensaje}</p> </div> </div>`} <!-- Formulario de gastos --> <div class="bg-white rounded-2xl shadow-soft p-8 border border-gray-100" data-astro-cid-m6fnanly> <div class="flex items-center gap-3 mb-6" data-astro-cid-m6fnanly> <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center" data-astro-cid-m6fnanly> <span class="text-white text-xl" data-astro-cid-m6fnanly> ${gastoEditar ? "✏️" : "➕"} </span> </div> <h2 class="text-2xl font-bold text-gray-800" data-astro-cid-m6fnanly> ${gastoEditar ? "Editar gasto" : "Nuevo gasto"} </h2> </div> <form method="POST" class="space-y-6" data-astro-cid-m6fnanly> ${gastoEditar && renderTemplate`<input type="hidden" name="updateId"${addAttribute(gastoEditar.id, "value")} data-astro-cid-m6fnanly>`} <div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-astro-cid-m6fnanly> <!-- Fecha --> <div data-astro-cid-m6fnanly> <label class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-m6fnanly>
📅 Fecha
</label> <input type="date" name="fecha" required${addAttribute(gastoEditar?.fecha, "value")} class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none" data-astro-cid-m6fnanly> </div> <!-- Categoría --> <div data-astro-cid-m6fnanly> <label class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-m6fnanly>
🏷️ Categoría
</label> <select name="categoria" required class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none bg-white" data-astro-cid-m6fnanly> <option value="Insumos"${addAttribute(gastoEditar?.categoria === "Insumos", "selected")} data-astro-cid-m6fnanly>
🥩 Insumos
</option> <option value="Gas"${addAttribute(gastoEditar?.categoria === "Gas", "selected")} data-astro-cid-m6fnanly>
🔥 Gas
</option> <option value="Bebidas"${addAttribute(gastoEditar?.categoria === "Bebidas", "selected")} data-astro-cid-m6fnanly>
🥤 Bebidas
</option> <option value="Personal"${addAttribute(gastoEditar?.categoria === "Personal", "selected")} data-astro-cid-m6fnanly>
👥 Personal
</option> <option value="Publicidad"${addAttribute(gastoEditar?.categoria === "Publicidad", "selected")} data-astro-cid-m6fnanly>
📢 Publicidad
</option> <option value="Otros"${addAttribute(gastoEditar?.categoria === "Otros", "selected")} data-astro-cid-m6fnanly>
📦 Otros
</option> </select> </div> <!-- Descripción --> <div class="md:col-span-2" data-astro-cid-m6fnanly> <label class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-m6fnanly>
📝 Descripción
</label> <input type="text" name="descripcion" placeholder="Ej: Compra de pan para la semana" required${addAttribute(gastoEditar?.descripcion, "value")} class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none" data-astro-cid-m6fnanly> </div> <!-- Monto --> <div data-astro-cid-m6fnanly> <label class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-m6fnanly>
💲 Monto
</label> <div class="relative" data-astro-cid-m6fnanly> <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" data-astro-cid-m6fnanly>S/</span> <input type="number" step="0.01" name="monto" placeholder="0.00" required${addAttribute(gastoEditar?.monto, "value")} class="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none" data-astro-cid-m6fnanly> </div> </div> </div> <!-- Botones --> <div class="flex gap-3 pt-4" data-astro-cid-m6fnanly> <button type="submit" class="px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-rose-700 transition-all shadow-md hover:shadow-lg" data-astro-cid-m6fnanly> ${gastoEditar ? "✓ Actualizar gasto" : "✓ Guardar gasto"} </button> ${gastoEditar && renderTemplate`<a href="/gastos" class="px-6 py-2.5 bg-gray-500 text-white font-semibold rounded-xl hover:bg-gray-600 transition-all" data-astro-cid-m6fnanly>
✗ Cancelar
</a>`} </div> </form> </div> <!-- Tabla de gastos --> <div class="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden" data-astro-cid-m6fnanly> <div class="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200" data-astro-cid-m6fnanly> <div class="flex items-center justify-between flex-wrap gap-4" data-astro-cid-m6fnanly> <div data-astro-cid-m6fnanly> <h2 class="text-2xl font-bold text-gray-800" data-astro-cid-m6fnanly>📋 Historial de gastos</h2> <p class="text-sm text-gray-500 mt-1" data-astro-cid-m6fnanly>Total de registros: ${gastos?.length || 0}</p> </div> <div class="bg-red-50 px-6 py-3 rounded-xl" data-astro-cid-m6fnanly> <p class="text-sm text-red-600 font-semibold" data-astro-cid-m6fnanly>Total gastado</p> <p class="text-2xl font-bold text-red-700" data-astro-cid-m6fnanly>S/ ${totalGastos.toFixed(2)}</p> </div> </div> </div> <div class="overflow-x-auto" data-astro-cid-m6fnanly> <table class="w-full" data-astro-cid-m6fnanly> <thead class="bg-gray-50 border-b border-gray-200" data-astro-cid-m6fnanly> <tr data-astro-cid-m6fnanly> <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" data-astro-cid-m6fnanly>Fecha</th> <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" data-astro-cid-m6fnanly>Categoría</th> <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" data-astro-cid-m6fnanly>Descripción</th> <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider" data-astro-cid-m6fnanly>Monto</th> <th class="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" data-astro-cid-m6fnanly>Acciones</th> </tr> </thead> <tbody class="divide-y divide-gray-100" data-astro-cid-m6fnanly> ${gastos?.length === 0 ? renderTemplate`<tr data-astro-cid-m6fnanly> <td colspan="5" class="px-6 py-12 text-center text-gray-500" data-astro-cid-m6fnanly> <div class="text-6xl mb-3" data-astro-cid-m6fnanly>📭</div> <p class="text-lg" data-astro-cid-m6fnanly>No hay gastos registrados</p> <p class="text-sm" data-astro-cid-m6fnanly>Comienza agregando tu primer gasto</p> </td> </tr>` : gastos?.map((gasto) => renderTemplate`<tr${addAttribute(gasto.id, "key")} class="hover:bg-gray-50 transition-colors" data-astro-cid-m6fnanly> <td class="px-6 py-4 text-sm text-gray-700 font-medium" data-astro-cid-m6fnanly> ${new Date(gasto.fecha).toLocaleDateString("es-PE")} </td> <td class="px-6 py-4" data-astro-cid-m6fnanly> <span${addAttribute(`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getCategoriaColor(gasto.categoria)}`, "class")} data-astro-cid-m6fnanly> <span data-astro-cid-m6fnanly>${categoriasIconos[gasto.categoria] || "📦"}</span> ${gasto.categoria} </span> </td> <td class="px-6 py-4 text-sm text-gray-800" data-astro-cid-m6fnanly> ${gasto.descripcion} </td> <td class="px-6 py-4 text-sm font-bold text-gray-900 text-right" data-astro-cid-m6fnanly> <span class="bg-red-50 text-red-700 px-3 py-1 rounded-lg" data-astro-cid-m6fnanly>
S/ ${gasto.monto.toFixed(2)} </span> </td> <td class="px-6 py-4 text-center" data-astro-cid-m6fnanly> <div class="flex gap-2 justify-center" data-astro-cid-m6fnanly> <form method="GET" class="inline" data-astro-cid-m6fnanly> <input type="hidden" name="edit"${addAttribute(gasto.id, "value")} data-astro-cid-m6fnanly> <button type="submit" class="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1" title="Editar" data-astro-cid-m6fnanly>
✏️ Editar
</button> </form> <form method="POST" class="inline" onsubmit="return confirm('¿Estás seguro de eliminar este gasto?')" data-astro-cid-m6fnanly> <input type="hidden" name="deleteId"${addAttribute(gasto.id, "value")} data-astro-cid-m6fnanly> <button type="submit" class="px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1" title="Eliminar" data-astro-cid-m6fnanly>
🗑️ Eliminar
</button> </form> </div> </td> </tr>`)} </tbody> ${gastos && gastos.length > 0 && renderTemplate`<tfoot class="bg-gray-50 border-t border-gray-200" data-astro-cid-m6fnanly> <tr data-astro-cid-m6fnanly> <td colspan="3" class="px-6 py-4 text-right font-bold text-gray-800" data-astro-cid-m6fnanly>Total general:</td> <td class="px-6 py-4 text-right" data-astro-cid-m6fnanly> <span class="text-lg font-bold text-red-700" data-astro-cid-m6fnanly>
S/ ${totalGastos.toFixed(2)} </span> </td> <td data-astro-cid-m6fnanly></td> </tr> </tfoot>`} </table> </div> </div> <!-- Resumen por categorías --> ${gastos && gastos.length > 0 && renderTemplate`<div class="bg-white rounded-2xl shadow-soft p-6 border border-gray-100" data-astro-cid-m6fnanly> <h3 class="text-lg font-bold text-gray-800 mb-4" data-astro-cid-m6fnanly>📊 Resumen por categorías</h3> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" data-astro-cid-m6fnanly> ${Object.entries(
    gastos.reduce((acc, gasto) => {
      acc[gasto.categoria] = (acc[gasto.categoria] || 0) + gasto.monto;
      return acc;
    }, {})
  ).map(([categoria, total]) => renderTemplate`<div${addAttribute(categoria, "key")} class="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-shadow" data-astro-cid-m6fnanly> <div class="text-3xl mb-2" data-astro-cid-m6fnanly>${categoriasIconos[categoria] || "📦"}</div> <p class="text-sm font-semibold text-gray-700" data-astro-cid-m6fnanly>${categoria}</p> <p class="text-lg font-bold text-red-600" data-astro-cid-m6fnanly>S/ ${total.toFixed(2)}</p> </div>`)} </div> </div>`} </div> ` })}`;
}, "C:/Users/Administrador/Desktop/qaleta/src/pages/gastos.astro", void 0);

const $$file = "C:/Users/Administrador/Desktop/qaleta/src/pages/gastos.astro";
const $$url = "/gastos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Gastos,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
