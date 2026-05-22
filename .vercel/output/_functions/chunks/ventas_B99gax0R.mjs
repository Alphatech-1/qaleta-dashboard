import { c as createComponent } from './astro-component_DyxCdPd6.mjs';
import 'piccolore';
import { s as renderComponent, v as renderTemplate, q as maybeRenderHead, k as addAttribute } from './entrypoint_5kZAInLD.mjs';
import { $ as $$DashboardLayout, r as renderScript } from './DashboardLayout_FDUS06cx.mjs';
import { s as supabase } from './supabase_BBuPOtL-.mjs';

const prerender = false;
const $$Ventas = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Ventas;
  const { data: productos } = await supabase.from("productos").select("*").eq("activo", true);
  const { data: clientes } = await supabase.from("clientes").select("*").order("nombre");
  const editId = Astro2.url.searchParams.get("edit");
  let ventaEditar = null;
  if (editId) {
    const { data } = await supabase.from("ventas").select("*").eq("id", editId).single();
    ventaEditar = data;
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const deleteId = formData.get("deleteId");
    const updateId = formData.get("updateId");
    if (deleteId) {
      const { error } = await supabase.from("ventas").delete().eq("id", deleteId);
      if (!error) {
        return Astro2.redirect("/ventas");
      }
    } else if (updateId) {
      const fecha = formData.get("fecha")?.toString();
      const producto = formData.get("producto")?.toString();
      const cantidad = Number(formData.get("cantidad"));
      const precio = Number(formData.get("precio"));
      const total = cantidad * precio;
      const tipoPago = formData.get("tipo_pago")?.toString();
      const clienteId = formData.get("cliente_id")?.toString();
      const { error } = await supabase.from("ventas").update({ fecha, producto, cantidad, precio, total, tipo_pago: tipoPago, cliente_id: clienteId || null }).eq("id", updateId);
      if (!error) {
        return Astro2.redirect("/ventas");
      }
    } else {
      const fecha = formData.get("fecha")?.toString();
      const producto = formData.get("producto")?.toString();
      const cantidad = Number(formData.get("cantidad"));
      const precio = Number(formData.get("precio"));
      const total = cantidad * precio;
      const tipoPago = formData.get("tipo_pago")?.toString();
      const clienteId = formData.get("cliente_id")?.toString();
      if (tipoPago === "credito" && clienteId) {
        const { data: nuevaVenta, error: ventaError } = await supabase.from("ventas").insert([{ fecha, producto, cantidad, precio, total, tipo_pago: tipoPago, cliente_id: clienteId }]).select();
        if (!ventaError && nuevaVenta) {
          await supabase.from("creditos").insert([{
            cliente_id: parseInt(clienteId),
            fecha,
            producto,
            cantidad,
            precio_unitario: precio,
            total,
            pagado: 0,
            saldo: total,
            estado: "pendiente",
            afecta_caja: false
          }]);
        }
        return Astro2.redirect("/ventas");
      } else {
        const { error } = await supabase.from("ventas").insert([{ fecha, producto, cantidad, precio, total, tipo_pago: tipoPago, cliente_id: null }]);
        if (!error) {
          return Astro2.redirect("/ventas");
        }
      }
    }
  }
  const { data: ventas } = await supabase.from("ventas").select("*").order("fecha", { ascending: false });
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": "Ventas", "data-astro-cid-6tpt4uxi": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6 sm:space-y-8" data-astro-cid-6tpt4uxi> <!-- Encabezado de sección --> <div class="mb-6 sm:mb-8" data-astro-cid-6tpt4uxi> <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2" data-astro-cid-6tpt4uxi>💰 Ventas</h1> <p class="text-sm sm:text-base text-gray-600" data-astro-cid-6tpt4uxi>Gestiona todas las ventas de choripanes</p> </div> <!-- Formulario de ventas --> <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 md:p-8 border border-gray-100" data-astro-cid-6tpt4uxi> <div class="flex items-center gap-3 mb-4 sm:mb-6" data-astro-cid-6tpt4uxi> <div${addAttribute(`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${ventaEditar ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-green-500 to-emerald-600"}`, "class")} data-astro-cid-6tpt4uxi> <span class="text-white text-lg sm:text-xl" data-astro-cid-6tpt4uxi> ${ventaEditar ? "✏️" : "➕"} </span> </div> <h2 class="text-xl sm:text-2xl font-bold text-gray-800" data-astro-cid-6tpt4uxi> ${ventaEditar ? "Editar venta" : "Nueva venta"} </h2> </div> <form method="POST" class="space-y-4 sm:space-y-6" id="ventaForm" data-astro-cid-6tpt4uxi> ${ventaEditar && renderTemplate`<input type="hidden" name="updateId"${addAttribute(ventaEditar.id, "value")} data-astro-cid-6tpt4uxi>`} <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" data-astro-cid-6tpt4uxi> <!-- Fecha --> <div data-astro-cid-6tpt4uxi> <label class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-6tpt4uxi>
📅 Fecha
</label> <input type="date" name="fecha" required${addAttribute(ventaEditar?.fecha, "value")} class="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none text-sm sm:text-base" data-astro-cid-6tpt4uxi> </div> <!-- Producto --> <div data-astro-cid-6tpt4uxi> <label class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-6tpt4uxi>
🥩 Producto
</label> <select name="producto" id="producto" required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none bg-white text-sm sm:text-base" data-astro-cid-6tpt4uxi> <option value="" data-astro-cid-6tpt4uxi>Seleccionar producto</option> ${productos?.map((producto) => renderTemplate`<option${addAttribute(producto.id, "key")}${addAttribute(producto.nombre, "value")}${addAttribute(producto.precio, "data-precio")}${addAttribute(ventaEditar?.producto === producto.nombre, "selected")} data-astro-cid-6tpt4uxi> ${producto.nombre} - S/ ${producto.precio.toFixed(2)} </option>`)} </select> ${(!productos || productos.length === 0) && renderTemplate`<p class="text-xs text-orange-600 mt-1" data-astro-cid-6tpt4uxi>
⚠️ No hay productos activos. Crea productos en Inventario.
</p>`} </div> <!-- Cantidad --> <div data-astro-cid-6tpt4uxi> <label class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-6tpt4uxi>
🔢 Cantidad
</label> <input type="number" name="cantidad" id="cantidad" min="1" step="1" required${addAttribute(ventaEditar?.cantidad || 1, "value")} class="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none text-sm sm:text-base" data-astro-cid-6tpt4uxi> </div> <!-- Precio --> <div data-astro-cid-6tpt4uxi> <label class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-6tpt4uxi>
💲 Precio unitario
</label> <div class="relative" data-astro-cid-6tpt4uxi> <span class="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm sm:text-base" data-astro-cid-6tpt4uxi>S/</span> <input id="precio" type="number" step="0.01" name="precio" required${addAttribute(ventaEditar?.precio || "", "value")} class="w-full pl-7 sm:pl-8 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none text-sm sm:text-base" data-astro-cid-6tpt4uxi> </div> </div> </div> <!-- Tipo de pago --> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" data-astro-cid-6tpt4uxi> <div data-astro-cid-6tpt4uxi> <label class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-6tpt4uxi>
💳 Tipo de pago
</label> <select name="tipo_pago" id="tipo_pago" required class="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none bg-white text-sm sm:text-base" data-astro-cid-6tpt4uxi> <option value="efectivo"${addAttribute(ventaEditar?.tipo_pago === "efectivo" || !ventaEditar, "selected")} data-astro-cid-6tpt4uxi>
💵 Efectivo (afecta caja)
</option> <option value="credito"${addAttribute(ventaEditar?.tipo_pago === "credito", "selected")} data-astro-cid-6tpt4uxi>
📝 Crédito (no afecta caja)
</option> </select> <p class="text-xs text-gray-500 mt-1" id="tipoPagoInfo" data-astro-cid-6tpt4uxi>
Los créditos se registrarán como cuenta por cobrar
</p> </div> <!-- Cliente (solo para créditos) --> <div id="clienteContainer"${addAttribute(!ventaEditar?.cliente_id && ventaEditar?.tipo_pago !== "credito" ? "hidden" : "", "class")} data-astro-cid-6tpt4uxi> <label class="block text-sm font-semibold text-gray-700 mb-2" data-astro-cid-6tpt4uxi>
👤 Cliente
</label> <select name="cliente_id" id="cliente_id" class="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none bg-white text-sm sm:text-base" data-astro-cid-6tpt4uxi> <option value="" data-astro-cid-6tpt4uxi>Seleccionar cliente</option> ${clientes?.map((cliente) => renderTemplate`<option${addAttribute(cliente.id, "key")}${addAttribute(cliente.id, "value")}${addAttribute(ventaEditar?.cliente_id === cliente.id, "selected")} data-astro-cid-6tpt4uxi> ${cliente.nombre} ${cliente.telefono ? `- ${cliente.telefono}` : ""} </option>`)} </select> <div class="flex items-center justify-between mt-1" data-astro-cid-6tpt4uxi> <p class="text-xs text-orange-600" data-astro-cid-6tpt4uxi>
⚠️ Requerido para ventas a crédito
</p> <a href="/clientes" class="text-xs text-blue-600 hover:underline" data-astro-cid-6tpt4uxi>+ Nuevo cliente</a> </div> </div> </div> <!-- Total en tiempo real --> <div class="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200" data-astro-cid-6tpt4uxi> <div class="flex items-center justify-between" data-astro-cid-6tpt4uxi> <span class="text-sm sm:text-base font-semibold text-gray-700" data-astro-cid-6tpt4uxi>💰 Total de la venta:</span> <span id="totalPreview" class="text-xl sm:text-2xl font-bold text-green-600" data-astro-cid-6tpt4uxi>
S/ 0.00
</span> </div> </div> <!-- Botones --> <div class="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4" data-astro-cid-6tpt4uxi> <button type="submit" class="px-4 sm:px-6 py-2.5 sm:py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg text-sm sm:text-base" data-astro-cid-6tpt4uxi> ${ventaEditar ? "✓ Actualizar venta" : "✓ Guardar venta"} </button> ${ventaEditar && renderTemplate`<a href="/ventas" class="px-4 sm:px-6 py-2.5 bg-gray-500 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-gray-600 transition-all text-center text-sm sm:text-base" data-astro-cid-6tpt4uxi>
✗ Cancelar
</a>`} </div> </form> </div> <!-- Tabla de ventas --> <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft border border-gray-100 overflow-hidden" data-astro-cid-6tpt4uxi> <div class="px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200" data-astro-cid-6tpt4uxi> <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" data-astro-cid-6tpt4uxi> <div data-astro-cid-6tpt4uxi> <h2 class="text-xl sm:text-2xl font-bold text-gray-800" data-astro-cid-6tpt4uxi>📋 Historial de ventas</h2> <p class="text-xs sm:text-sm text-gray-500 mt-1" data-astro-cid-6tpt4uxi>Total de registros: ${ventas?.length || 0}</p> </div> <div class="flex gap-2" data-astro-cid-6tpt4uxi> <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded" data-astro-cid-6tpt4uxi>💵 Efectivo</span> <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded" data-astro-cid-6tpt4uxi>📝 Crédito</span> </div> </div> </div> <!-- Versión Desktop - Tabla tradicional --> <div class="hidden md:block overflow-x-auto" data-astro-cid-6tpt4uxi> <table class="w-full" data-astro-cid-6tpt4uxi> <thead class="bg-gray-50 border-b border-gray-200" data-astro-cid-6tpt4uxi> <tr data-astro-cid-6tpt4uxi> <th class="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" data-astro-cid-6tpt4uxi>Fecha</th> <th class="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" data-astro-cid-6tpt4uxi>Producto</th> <th class="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" data-astro-cid-6tpt4uxi>Cantidad</th> <th class="px-4 lg:px-6 py-3 lg:py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider" data-astro-cid-6tpt4uxi>Precio unit.</th> <th class="px-4 lg:px-6 py-3 lg:py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider" data-astro-cid-6tpt4uxi>Total</th> <th class="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" data-astro-cid-6tpt4uxi>Tipo</th> <th class="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" data-astro-cid-6tpt4uxi>Acciones</th> </tr> </thead> <tbody class="divide-y divide-gray-100" data-astro-cid-6tpt4uxi> ${ventas?.length === 0 ? renderTemplate`<tr data-astro-cid-6tpt4uxi> <td colspan="7" class="px-6 py-12 text-center text-gray-500" data-astro-cid-6tpt4uxi> <div class="text-6xl mb-3" data-astro-cid-6tpt4uxi>📭</div> <p class="text-lg" data-astro-cid-6tpt4uxi>No hay ventas registradas</p> <p class="text-sm" data-astro-cid-6tpt4uxi>Comienza agregando tu primera venta</p> </td> </tr>` : ventas?.map((venta) => renderTemplate`<tr${addAttribute(venta.id, "key")} class="hover:bg-gray-50 transition-colors" data-astro-cid-6tpt4uxi> <td class="px-4 lg:px-6 py-3 lg:py-4 text-sm text-gray-700 font-medium" data-astro-cid-6tpt4uxi> ${new Date(venta.fecha).toLocaleDateString("es-PE")} </td> <td class="px-4 lg:px-6 py-3 lg:py-4 text-sm text-gray-800 font-semibold" data-astro-cid-6tpt4uxi> ${venta.producto} </td> <td class="px-4 lg:px-6 py-3 lg:py-4 text-sm text-gray-700 text-center" data-astro-cid-6tpt4uxi> ${venta.cantidad} </td> <td class="px-4 lg:px-6 py-3 lg:py-4 text-sm text-gray-700 text-right" data-astro-cid-6tpt4uxi>
S/ ${venta.precio.toFixed(2)} </td> <td class="px-4 lg:px-6 py-3 lg:py-4 text-sm font-bold text-gray-900 text-right" data-astro-cid-6tpt4uxi> <span class="bg-green-100 text-green-700 px-2 lg:px-3 py-1 rounded-lg text-xs lg:text-sm" data-astro-cid-6tpt4uxi>
S/ ${venta.total.toFixed(2)} </span> </td> <td class="px-4 lg:px-6 py-3 lg:py-4 text-center" data-astro-cid-6tpt4uxi> ${venta.tipo_pago === "credito" ? renderTemplate`<span class="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs" data-astro-cid-6tpt4uxi>
📝 Crédito
</span>` : renderTemplate`<span class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs" data-astro-cid-6tpt4uxi>
💵 Efectivo
</span>`} </td> <td class="px-4 lg:px-6 py-3 lg:py-4 text-center" data-astro-cid-6tpt4uxi> <div class="flex gap-2 justify-center" data-astro-cid-6tpt4uxi> <form method="GET" class="inline" data-astro-cid-6tpt4uxi> <input type="hidden" name="edit"${addAttribute(venta.id, "value")} data-astro-cid-6tpt4uxi> <button type="submit" class="px-2 lg:px-3 py-1 lg:py-1.5 bg-blue-500 text-white text-xs lg:text-sm rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1" title="Editar" data-astro-cid-6tpt4uxi>
✏️ <span class="hidden sm:inline" data-astro-cid-6tpt4uxi>Editar</span> </button> </form> <form method="POST" class="inline" onsubmit="return confirm('¿Estás seguro de eliminar esta venta?')" data-astro-cid-6tpt4uxi> <input type="hidden" name="deleteId"${addAttribute(venta.id, "value")} data-astro-cid-6tpt4uxi> <button type="submit" class="px-2 lg:px-3 py-1 lg:py-1.5 bg-red-500 text-white text-xs lg:text-sm rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1" title="Eliminar" data-astro-cid-6tpt4uxi>
🗑️ <span class="hidden sm:inline" data-astro-cid-6tpt4uxi>Eliminar</span> </button> </form> </div> </td> </tr>`)} </tbody> ${ventas && ventas.length > 0 && renderTemplate`<tfoot class="bg-gray-50 border-t border-gray-200" data-astro-cid-6tpt4uxi> <tr class="bg-gray-50" data-astro-cid-6tpt4uxi> <td colspan="4" class="px-4 lg:px-6 py-3 lg:py-4 text-right font-bold text-gray-800" data-astro-cid-6tpt4uxi>Total general:</td> <td class="px-4 lg:px-6 py-3 lg:py-4 text-right font-bold text-green-700" data-astro-cid-6tpt4uxi>
S/ ${ventas.reduce((sum, v) => sum + v.total, 0).toFixed(2)} </td> <td colspan="2" data-astro-cid-6tpt4uxi></td> </tr> <tr class="bg-gray-100" data-astro-cid-6tpt4uxi> <td colspan="4" class="px-4 lg:px-6 py-3 lg:py-4 text-right font-bold text-gray-800" data-astro-cid-6tpt4uxi>💵 Total efectivo:</td> <td class="px-4 lg:px-6 py-3 lg:py-4 text-right font-bold text-green-700" data-astro-cid-6tpt4uxi>
S/ ${ventas.filter((v) => v.tipo_pago === "efectivo").reduce((sum, v) => sum + v.total, 0).toFixed(2)} </td> <td colspan="2" data-astro-cid-6tpt4uxi></td> </tr> <tr class="bg-gray-100" data-astro-cid-6tpt4uxi> <td colspan="4" class="px-4 lg:px-6 py-3 lg:py-4 text-right font-bold text-gray-800" data-astro-cid-6tpt4uxi>📝 Total créditos:</td> <td class="px-4 lg:px-6 py-3 lg:py-4 text-right font-bold text-yellow-700" data-astro-cid-6tpt4uxi>
S/ ${ventas.filter((v) => v.tipo_pago === "credito").reduce((sum, v) => sum + v.total, 0).toFixed(2)} </td> <td colspan="2" data-astro-cid-6tpt4uxi></td> </tr> </tfoot>`} </table> </div> <!-- Versión Móvil - Cards --> <div class="md:hidden divide-y divide-gray-100" data-astro-cid-6tpt4uxi> ${ventas?.length === 0 ? renderTemplate`<div class="px-6 py-12 text-center text-gray-500" data-astro-cid-6tpt4uxi> <div class="text-6xl mb-3" data-astro-cid-6tpt4uxi>📭</div> <p class="text-lg" data-astro-cid-6tpt4uxi>No hay ventas registradas</p> <p class="text-sm" data-astro-cid-6tpt4uxi>Comienza agregando tu primera venta</p> </div>` : ventas?.map((venta) => renderTemplate`<div${addAttribute(venta.id, "key")} class="p-4 hover:bg-gray-50 transition-colors" data-astro-cid-6tpt4uxi> <div class="flex justify-between items-start mb-2" data-astro-cid-6tpt4uxi> <div data-astro-cid-6tpt4uxi> <div class="flex items-center gap-2" data-astro-cid-6tpt4uxi> <p class="font-bold text-gray-800 text-base" data-astro-cid-6tpt4uxi>${venta.producto}</p> ${venta.tipo_pago === "credito" ? renderTemplate`<span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded" data-astro-cid-6tpt4uxi>📝 Crédito</span>` : renderTemplate`<span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded" data-astro-cid-6tpt4uxi>💵 Efectivo</span>`} </div> <p class="text-xs text-gray-500 mt-1" data-astro-cid-6tpt4uxi>
📅 ${new Date(venta.fecha).toLocaleDateString("es-PE")} </p> </div> <div class="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-bold text-sm" data-astro-cid-6tpt4uxi>
S/ ${venta.total.toFixed(2)} </div> </div> <div class="grid grid-cols-2 gap-2 mt-3 text-sm" data-astro-cid-6tpt4uxi> <div data-astro-cid-6tpt4uxi> <span class="text-gray-500" data-astro-cid-6tpt4uxi>🔢 Cantidad:</span> <p class="font-semibold text-gray-800" data-astro-cid-6tpt4uxi>${venta.cantidad}</p> </div> <div data-astro-cid-6tpt4uxi> <span class="text-gray-500" data-astro-cid-6tpt4uxi>💲 Precio unit.:</span> <p class="font-semibold text-gray-800" data-astro-cid-6tpt4uxi>S/ ${venta.precio.toFixed(2)}</p> </div> </div> <div class="flex gap-2 mt-4" data-astro-cid-6tpt4uxi> <form method="GET" class="flex-1" data-astro-cid-6tpt4uxi> <input type="hidden" name="edit"${addAttribute(venta.id, "value")} data-astro-cid-6tpt4uxi> <button type="submit" class="w-full px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-1" data-astro-cid-6tpt4uxi>
✏️ Editar
</button> </form> <form method="POST" class="flex-1" onsubmit="return confirm('¿Estás seguro de eliminar esta venta?')" data-astro-cid-6tpt4uxi> <input type="hidden" name="deleteId"${addAttribute(venta.id, "value")} data-astro-cid-6tpt4uxi> <button type="submit" class="w-full px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-1" data-astro-cid-6tpt4uxi>
🗑️ Eliminar
</button> </form> </div> </div>`)} ${ventas && ventas.length > 0 && renderTemplate`<div class="p-4 bg-gray-50 border-t border-gray-200 space-y-2" data-astro-cid-6tpt4uxi> <div class="flex justify-between items-center" data-astro-cid-6tpt4uxi> <span class="font-bold text-gray-800" data-astro-cid-6tpt4uxi>Total general:</span> <span class="text-lg font-bold text-green-700" data-astro-cid-6tpt4uxi>
S/ ${ventas.reduce((sum, v) => sum + v.total, 0).toFixed(2)} </span> </div> <div class="flex justify-between items-center text-sm" data-astro-cid-6tpt4uxi> <span class="text-gray-600" data-astro-cid-6tpt4uxi>💵 Efectivo:</span> <span class="font-semibold text-green-600" data-astro-cid-6tpt4uxi>
S/ ${ventas.filter((v) => v.tipo_pago === "efectivo").reduce((sum, v) => sum + v.total, 0).toFixed(2)} </span> </div> <div class="flex justify-between items-center text-sm" data-astro-cid-6tpt4uxi> <span class="text-gray-600" data-astro-cid-6tpt4uxi>📝 Créditos:</span> <span class="font-semibold text-yellow-600" data-astro-cid-6tpt4uxi>
S/ ${ventas.filter((v) => v.tipo_pago === "credito").reduce((sum, v) => sum + v.total, 0).toFixed(2)} </span> </div> </div>`} </div> </div> </div> ` })}  ${renderScript($$result, "C:/Users/Administrador/Desktop/qaleta/src/pages/ventas.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Administrador/Desktop/qaleta/src/pages/ventas.astro", void 0);

const $$file = "C:/Users/Administrador/Desktop/qaleta/src/pages/ventas.astro";
const $$url = "/ventas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ventas,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
