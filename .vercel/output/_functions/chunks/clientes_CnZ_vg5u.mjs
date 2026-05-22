import { c as createComponent } from './astro-component_Bz1idbRS.mjs';
import 'piccolore';
import { s as renderComponent, v as renderTemplate, q as maybeRenderHead, k as addAttribute } from './entrypoint_BoMskoFd.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_BQnVw-Qk.mjs';
import { s as supabase } from './supabase_BBuPOtL-.mjs';

const prerender = false;
const $$Clientes = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Clientes;
  const { data: clientes } = await supabase.from("clientes").select("*").order("nombre");
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const deleteId = formData.get("deleteId");
    if (deleteId) {
      await supabase.from("clientes").delete().eq("id", deleteId);
      return Astro2.redirect("/clientes");
    }
    const nombre = formData.get("nombre")?.toString();
    const telefono = formData.get("telefono")?.toString();
    const direccion = formData.get("direccion")?.toString();
    if (nombre) {
      await supabase.from("clientes").insert([{ nombre, telefono, direccion }]);
      return Astro2.redirect("/clientes");
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": "Clientes" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6 sm:space-y-8"> <div> <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">👥 Clientes</h1> <p class="text-sm sm:text-base text-gray-600">Gestiona tus clientes y sus créditos</p> </div> <!-- Formulario para agregar cliente --> <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 border border-gray-100"> <div class="flex items-center gap-3 mb-4"> <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center"> <span class="text-white text-xl">➕</span> </div> <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Nuevo cliente</h2> </div> <form method="POST" class="space-y-4"> <div class="grid grid-cols-1 sm:grid-cols-3 gap-4"> <div> <label class="block text-sm font-semibold text-gray-700 mb-2">📝 Nombre completo</label> <input type="text" name="nombre" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-2">📞 Teléfono</label> <input type="text" name="telefono" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-2">📍 Dirección</label> <input type="text" name="direccion" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"> </div> </div> <button type="submit" class="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
✓ Guardar cliente
</button> </form> </div> <!-- Lista de clientes --> <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft border border-gray-100 overflow-hidden"> <div class="px-4 sm:px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200"> <h2 class="text-xl font-bold text-gray-800">📋 Lista de clientes</h2> </div> <div class="divide-y divide-gray-100"> ${clientes?.map((cliente) => renderTemplate`<div${addAttribute(cliente.id, "key")} class="p-4 sm:p-5 hover:bg-gray-50 transition-colors"> <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"> <div> <div class="flex items-center gap-2"> <span class="text-xl">👤</span> <h3 class="font-semibold text-gray-800">${cliente.nombre}</h3> </div> ${(cliente.telefono || cliente.direccion) && renderTemplate`<div class="text-sm text-gray-500 mt-1 ml-7"> ${cliente.telefono && renderTemplate`<span>📞 ${cliente.telefono}</span>`} ${cliente.direccion && renderTemplate`<span class="ml-3">📍 ${cliente.direccion}</span>`} </div>`} </div> <div class="flex gap-2 ml-7 sm:ml-0"> <a${addAttribute(`/creditos?cliente=${cliente.id}`, "href")} class="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors">
💰 Ver créditos
</a> <form method="POST" onsubmit="return confirm('¿Eliminar este cliente?')"> <input type="hidden" name="deleteId"${addAttribute(cliente.id, "value")}> <button type="submit" class="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors">
🗑️ Eliminar
</button> </form> </div> </div> </div>`)} </div> </div> </div> ` })}`;
}, "C:/Users/Administrador/Desktop/qaleta/src/pages/clientes.astro", void 0);

const $$file = "C:/Users/Administrador/Desktop/qaleta/src/pages/clientes.astro";
const $$url = "/clientes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Clientes,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
