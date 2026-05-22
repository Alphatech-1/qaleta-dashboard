import { c as createComponent } from './astro-component_Bz1idbRS.mjs';
import 'piccolore';
import { s as renderComponent, v as renderTemplate, q as maybeRenderHead, k as addAttribute, d as Fragment } from './entrypoint_BoMskoFd.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_BQnVw-Qk.mjs';
import { s as supabase } from './supabase_BBuPOtL-.mjs';

const prerender = false;
const $$ProductosFiados = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProductosFiados;
  let mensaje = "";
  const { data: productosFiados } = await supabase.from("productos_fiados").select("*").order("fecha", { ascending: false });
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const deleteId = formData.get("deleteId");
    const marcarPagado = formData.get("marcarPagado");
    const pagoProveedorId = formData.get("pagoProveedorId");
    if (deleteId) {
      await supabase.from("productos_fiados").delete().eq("id", deleteId);
      return Astro2.redirect("/productos-fiados");
    }
    if (pagoProveedorId) {
      const monto = Number(formData.get("monto"));
      const fecha = formData.get("fecha")?.toString();
      const metodoPago = formData.get("metodo_pago")?.toString();
      const { data: productoFiado } = await supabase.from("productos_fiados").select("*").eq("id", pagoProveedorId).single();
      if (productoFiado) {
        const { error: pagoError } = await supabase.from("pagos_proveedores").insert([{
          producto_fiado_id: pagoProveedorId,
          fecha,
          monto,
          metodo_pago: metodoPago,
          descripcion: `Pago a proveedor - ${productoFiado.producto}`
        }]);
        if (pagoError) {
          mensaje = "Error al registrar pago: " + pagoError.message;
        } else {
          const { error: gastoError } = await supabase.from("gastos").insert([{
            categoria: "Insumos",
            descripcion: `Pago a proveedor - ${productoFiado.proveedor} - ${productoFiado.producto}`,
            monto,
            fecha,
            metodo_pago: metodoPago,
            es_pago_fiado: true
            // Marcador para identificar
          }]);
          if (gastoError) {
            mensaje = "Error al registrar gasto: " + gastoError.message;
          } else {
            const nuevoPagado = (productoFiado.pagado_monto || 0) + monto;
            const estaPagado = nuevoPagado >= productoFiado.total;
            await supabase.from("productos_fiados").update({
              pagado: estaPagado,
              pagado_monto: nuevoPagado,
              fecha_pago: estaPagado ? fecha : null,
              saldo_pendiente: productoFiado.total - nuevoPagado
            }).eq("id", pagoProveedorId);
          }
        }
      }
      return Astro2.redirect("/productos-fiados");
    }
    if (marcarPagado) {
      const fechaHoy = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const { data: productoFiado } = await supabase.from("productos_fiados").select("*").eq("id", marcarPagado).single();
      if (productoFiado) {
        await supabase.from("gastos").insert([{
          categoria: "Insumos",
          descripcion: `Pago a proveedor - ${productoFiado.proveedor} - ${productoFiado.producto}`,
          monto: productoFiado.total,
          fecha: fechaHoy,
          metodo_pago: "efectivo",
          es_pago_fiado: true
        }]);
        await supabase.from("productos_fiados").update({
          pagado: true,
          fecha_pago: fechaHoy,
          pagado_monto: productoFiado.total,
          saldo_pendiente: 0
        }).eq("id", marcarPagado);
      }
      return Astro2.redirect("/productos-fiados");
    }
    const cantidad = Number(formData.get("cantidad"));
    const precio = Number(formData.get("precio"));
    const total = cantidad * precio;
    await supabase.from("productos_fiados").insert([{
      proveedor: formData.get("proveedor")?.toString(),
      producto: formData.get("producto")?.toString(),
      cantidad,
      precio_unitario: precio,
      total,
      fecha: formData.get("fecha")?.toString(),
      pagado: false,
      pagado_monto: 0,
      saldo_pendiente: total
    }]);
    return Astro2.redirect("/productos-fiados");
  }
  const totalDeudaFiados = productosFiados?.reduce((sum, p) => sum + (p.saldo_pendiente || (p.pagado ? 0 : p.total)), 0) || 0;
  const totalPagadoFiados = productosFiados?.reduce((sum, p) => sum + (p.pagado_monto || 0), 0) || 0;
  const totalProductosFiados = productosFiados?.reduce((sum, p) => sum + p.total, 0) || 0;
  const { data: pagosProveedores } = await supabase.from("pagos_proveedores").select("*").order("fecha", { ascending: false });
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": "Productos Fiados" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6 sm:space-y-8"> <div> <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">📦 Productos fiados</h1> <p class="text-sm sm:text-base text-gray-600">Control de productos que debes a proveedores</p> </div>  ${mensaje && renderTemplate`<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg"> <p class="text-red-700">${mensaje}</p> </div>`}  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4"> <div class="bg-gradient-to-br from-red-500 to-rose-600 rounded-xl p-5 text-white"> <p class="text-sm opacity-90">💰 Deuda pendiente</p> <h2 class="text-2xl font-bold">S/ ${totalDeudaFiados.toFixed(2)}</h2> <p class="text-xs opacity-75">Por pagar a proveedores</p> </div> <div class="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white"> <p class="text-sm opacity-90">✓ Total pagado</p> <h2 class="text-2xl font-bold">S/ ${totalPagadoFiados.toFixed(2)}</h2> <p class="text-xs opacity-75">Ya registrado en gastos</p> </div> <div class="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-5 text-white"> <p class="text-sm opacity-90">📦 Total fiado</p> <h2 class="text-2xl font-bold">S/ ${totalProductosFiados.toFixed(2)}</h2> <p class="text-xs opacity-75">Valor total de productos</p> </div> </div>  <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 border border-gray-100"> <div class="flex items-center gap-3 mb-4"> <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center"> <span class="text-white text-xl">➕</span> </div> <h2 class="text-xl font-bold text-gray-800">Registrar producto fiado</h2> </div> <form method="POST" class="space-y-4"> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"> <div> <label class="block text-sm font-semibold text-gray-700 mb-2">📅 Fecha</label> <input type="date" name="fecha" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-2">🏪 Proveedor</label> <input type="text" name="proveedor" placeholder="Ej: Carnes Pérez" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-2">🥩 Producto</label> <input type="text" name="producto" placeholder="Ej: Chorizo x kg" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-2">🔢 Cantidad</label> <input type="number" name="cantidad" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-2">💲 Precio unit.</label> <input type="number" step="0.01" name="precio" required class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"> </div> </div> <div class="bg-yellow-50 p-3 rounded-lg"> <p class="text-xs text-yellow-800">
⚠️ Esto NO afecta tus gastos hasta que registres el pago al proveedor
</p> </div> <button type="submit" class="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
✓ Guardar registro
</button> </form> </div>  <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft border border-gray-100 overflow-hidden"> <div class="px-4 sm:px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200"> <h2 class="text-xl font-bold text-gray-800">📋 Historial de productos fiados</h2> </div> ${productosFiados?.length === 0 ? renderTemplate`<div class="p-8 text-center text-gray-500"> <div class="text-6xl mb-3">📭</div> <p>No hay productos fiados registrados</p> </div>` : renderTemplate`<div class="divide-y divide-gray-100"> ${productosFiados?.map((item) => renderTemplate`<div${addAttribute(item.id, "key")} class="p-5 hover:bg-gray-50 transition-colors"> <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"> <div class="flex-1"> <div class="flex items-center gap-2 flex-wrap"> <span class="text-sm text-gray-500">${new Date(item.fecha).toLocaleDateString("es-PE")}</span> <span${addAttribute(`px-2 py-1 text-xs rounded-full ${item.pagado ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`, "class")}> ${item.pagado ? "✓ Pagado" : "❌ Pendiente"} </span> ${item.fecha_pago && renderTemplate`<span class="text-xs text-gray-500">Pagado: ${new Date(item.fecha_pago).toLocaleDateString("es-PE")}</span>`} </div> <h3 class="font-semibold text-gray-800 mt-1">${item.producto}</h3> <p class="text-sm text-gray-600">Proveedor: ${item.proveedor} | Cantidad: ${item.cantidad}</p> <div class="mt-2 flex gap-3 text-sm"> <span>Total: <strong${addAttribute(item.pagado ? "text-green-600" : "text-red-600", "class")}>S/ ${item.total.toFixed(2)}</strong></span> ${!item.pagado && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <span>Pagado: <strong class="text-green-600">S/ ${(item.pagado_monto || 0).toFixed(2)}</strong></span> <span>Saldo: <strong class="text-red-600">S/ ${(item.saldo_pendiente || item.total).toFixed(2)}</strong></span> ` })}`} </div> </div> <div class="flex gap-2"> ${!item.pagado && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <button${addAttribute(`document.getElementById('pagoProveedorModal-${item.id}').classList.remove('hidden')`, "onclick")} class="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600">
💵 Pagar
</button> <form method="POST" onsubmit="return confirm('¿Marcar como pagado completo? Esto registrará el gasto automáticamente.')" class="inline"> <input type="hidden" name="marcarPagado"${addAttribute(item.id, "value")}> <button type="submit" class="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">
✓ Pagar todo
</button> </form> ` })}`} <form method="POST" onsubmit="return confirm('¿Eliminar este registro?')"> <input type="hidden" name="deleteId"${addAttribute(item.id, "value")}> <button type="submit" class="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600">
🗑️ Eliminar
</button> </form> </div> </div>  <div${addAttribute(`pagoProveedorModal-${item.id}`, "id")} class="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50"> <div class="bg-white rounded-xl p-6 w-full max-w-md"> <h3 class="text-xl font-bold mb-4">Registrar pago a proveedor</h3> <p class="text-sm text-gray-600 mb-4">
Producto: ${item.producto}<br>
Proveedor: ${item.proveedor}<br>
Total: <strong>S/ ${item.total.toFixed(2)}</strong><br>
Saldo pendiente: <strong class="text-red-600">S/ ${(item.saldo_pendiente || item.total).toFixed(2)}</strong> </p> <form method="POST"> <input type="hidden" name="pagoProveedorId"${addAttribute(item.id, "value")}> <div class="space-y-4"> <div> <label class="block text-sm font-semibold mb-2">📅 Fecha</label> <input type="date" name="fecha" required class="w-full px-4 py-2 border rounded-lg"> </div> <div> <label class="block text-sm font-semibold mb-2">💵 Monto a pagar</label> <input type="number" step="0.01" name="monto"${addAttribute(item.saldo_pendiente || item.total, "max")} required class="w-full px-4 py-2 border rounded-lg"> </div> <div> <label class="block text-sm font-semibold mb-2">💳 Método de pago</label> <select name="metodo_pago" class="w-full px-4 py-2 border rounded-lg"> <option value="efectivo">Efectivo</option> <option value="yape">Yape</option> <option value="plin">Plin</option> <option value="transferencia">Transferencia</option> </select> </div> <div class="bg-orange-50 p-3 rounded-lg"> <p class="text-xs text-orange-800">
⚠️ Este pago se registrará como GASTO en el dashboard
</p> </div> <div class="flex gap-3"> <button type="submit" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg">Registrar pago</button> <button type="button"${addAttribute(`document.getElementById('pagoProveedorModal-${item.id}').classList.add('hidden')`, "onclick")} class="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg">Cancelar</button> </div> </div> </form> </div> </div> </div>`)} </div>`} </div>  ${pagosProveedores && pagosProveedores.length > 0 && renderTemplate`<div class="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden"> <div class="px-4 sm:px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200"> <h2 class="text-xl font-bold text-gray-800">📋 Historial de pagos a proveedores</h2> <p class="text-xs text-gray-500">Estos pagos ya afectan tus gastos</p> </div> <div class="divide-y divide-gray-100"> ${pagosProveedores.map((pago) => renderTemplate`<div${addAttribute(pago.id, "key")} class="p-4 flex justify-between items-center"> <div> <p class="text-sm text-gray-600">${new Date(pago.fecha).toLocaleDateString("es-PE")}</p> <p class="font-medium text-gray-800">${pago.descripcion || "Pago a proveedor"}</p> </div> <div class="text-right"> <p class="text-lg font-bold text-red-600">- S/ ${pago.monto.toFixed(2)}</p> <p class="text-xs text-gray-500 capitalize">${pago.metodo_pago}</p> </div> </div>`)} </div> </div>`} </div> ` })}`;
}, "C:/Users/Administrador/Desktop/qaleta/src/pages/productos-fiados.astro", void 0);

const $$file = "C:/Users/Administrador/Desktop/qaleta/src/pages/productos-fiados.astro";
const $$url = "/productos-fiados";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ProductosFiados,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
