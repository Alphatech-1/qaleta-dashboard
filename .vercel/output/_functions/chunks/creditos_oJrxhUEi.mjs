import { c as createComponent } from './astro-component_Bz1idbRS.mjs';
import 'piccolore';
import { s as renderComponent, v as renderTemplate, q as maybeRenderHead, d as Fragment, k as addAttribute } from './entrypoint_BoMskoFd.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_BQnVw-Qk.mjs';
import { s as supabase } from './supabase_BBuPOtL-.mjs';

const prerender = false;
const $$Creditos = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Creditos;
  const clienteId = Astro2.url.searchParams.get("cliente");
  const editId = Astro2.url.searchParams.get("edit");
  let cliente = null;
  let creditoEditar = null;
  let mensaje = "";
  if (clienteId) {
    const { data } = await supabase.from("clientes").select("*").eq("id", clienteId).single();
    cliente = data;
  }
  if (editId) {
    const { data } = await supabase.from("creditos").select("*").eq("id", editId).single();
    creditoEditar = data;
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const deleteId = formData.get("deleteId");
    const updateId = formData.get("updateId");
    const pagoId = formData.get("pagoId");
    if (deleteId) {
      await supabase.from("creditos").delete().eq("id", deleteId);
      return Astro2.redirect(`/creditos?cliente=${clienteId}`);
    }
    if (pagoId) {
      const monto = Number(formData.get("monto"));
      const fecha = formData.get("fecha")?.toString();
      const metodoPago = formData.get("metodo_pago")?.toString();
      const { data: credito } = await supabase.from("creditos").select("*").eq("id", pagoId).single();
      if (credito) {
        const nuevoPagado = (credito.pagado || 0) + monto;
        const nuevoSaldo = credito.total - nuevoPagado;
        const nuevoEstado = nuevoSaldo <= 0 ? "pagado" : "parcial";
        const { error: pagoError } = await supabase.from("pagos_creditos").insert([{
          credito_id: pagoId,
          fecha,
          monto,
          metodo_pago: metodoPago,
          descripcion: `Pago de crédito - ${credito.producto}`
        }]);
        if (pagoError) {
          mensaje = "Error al registrar pago: " + pagoError.message;
        } else {
          await supabase.from("creditos").update({
            pagado: nuevoPagado,
            saldo: nuevoSaldo,
            estado: nuevoEstado
          }).eq("id", pagoId);
          await supabase.from("ventas").insert([{
            fecha,
            producto: `PAGO CRÉDITO - ${credito.producto}`,
            cantidad: 1,
            precio: monto,
            total: monto,
            tipo_pago: "efectivo",
            // Esto es efectivo real que entra
            cliente_id: credito.cliente_id,
            es_pago_credito: true
            // Marcador para identificar que es pago de crédito
          }]);
        }
      }
      return Astro2.redirect(`/creditos?cliente=${clienteId}`);
    }
    if (updateId) {
      const cantidad2 = Number(formData.get("cantidad"));
      const precio2 = Number(formData.get("precio"));
      const total2 = cantidad2 * precio2;
      const pagadoActual = creditoEditar?.pagado || 0;
      const nuevoSaldo = total2 - pagadoActual;
      await supabase.from("creditos").update({
        fecha: formData.get("fecha")?.toString(),
        producto: formData.get("producto")?.toString(),
        cantidad: cantidad2,
        precio_unitario: precio2,
        total: total2,
        saldo: nuevoSaldo,
        estado: nuevoSaldo <= 0 ? "pagado" : nuevoSaldo < total2 ? "parcial" : "pendiente"
      }).eq("id", updateId);
      return Astro2.redirect(`/creditos?cliente=${clienteId}`);
    }
    const cantidad = Number(formData.get("cantidad"));
    const precio = Number(formData.get("precio"));
    const total = cantidad * precio;
    const { error: creditoError } = await supabase.from("creditos").insert([{
      cliente_id: clienteId,
      fecha: formData.get("fecha")?.toString(),
      producto: formData.get("producto")?.toString(),
      cantidad,
      precio_unitario: precio,
      total,
      pagado: 0,
      saldo: total,
      estado: "pendiente",
      afecta_caja: false
    }]);
    if (creditoError) {
      mensaje = "Error al crear crédito: " + creditoError.message;
    } else {
      await supabase.from("ventas").insert([{
        fecha: formData.get("fecha")?.toString(),
        producto: formData.get("producto")?.toString(),
        cantidad,
        precio,
        total,
        tipo_pago: "credito",
        cliente_id: clienteId,
        es_pago_credito: false
      }]);
    }
    return Astro2.redirect(`/creditos?cliente=${clienteId}`);
  }
  const { data: creditos } = clienteId ? await supabase.from("creditos").select("*").eq("cliente_id", clienteId).order("fecha", { ascending: false }) : { data: [] };
  const { data: pagos } = clienteId ? await supabase.from("pagos_creditos").select("*, creditos(*)").in("credito_id", creditos?.map((c) => c.id) || []).order("fecha", { ascending: false }) : { data: [] };
  const totalDeuda = creditos?.reduce((sum, c) => sum + (c.saldo || 0), 0) || 0;
  const totalCreditos = creditos?.reduce((sum, c) => sum + c.total, 0) || 0;
  const totalPagado = creditos?.reduce((sum, c) => sum + (c.pagado || 0), 0) || 0;
  const { data: productos } = await supabase.from("productos").select("*").eq("activo", true);
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": cliente ? `Créditos - ${cliente.nombre}` : "Créditos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6 sm:space-y-8">  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"> <div> <div class="flex items-center gap-2"> <a href="/clientes" class="text-blue-600 hover:text-blue-700">← Volver</a> <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">💰 Créditos</h1> </div> ${cliente && renderTemplate`<p class="text-gray-600 mt-1">Cliente: <span class="font-semibold">${cliente.nombre}</span></p>`} </div> ${cliente && renderTemplate`<div class="bg-blue-50 rounded-xl p-4"> <p class="text-sm text-gray-600">Deuda total</p> <p class="text-2xl font-bold text-red-600">S/ ${totalDeuda.toFixed(2)}</p> </div>`} </div>  ${mensaje && renderTemplate`<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg"> <p class="text-red-700">${mensaje}</p> </div>`} ${cliente ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`<div class="bg-white rounded-xl sm:rounded-2xl shadow-soft p-4 sm:p-6 border border-gray-100"> <div class="flex items-center gap-3 mb-4"> <div class="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center"> <span class="text-white text-xl">📝</span> </div> <h2 class="text-xl font-bold text-gray-800">${creditoEditar ? "Editar crédito" : "Nuevo crédito"}</h2> </div> <form method="POST" class="space-y-4"> ${creditoEditar && renderTemplate`<input type="hidden" name="updateId"${addAttribute(creditoEditar.id, "value")}>`} <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> <div> <label class="block text-sm font-semibold text-gray-700 mb-2">📅 Fecha</label> <input type="date" name="fecha" required${addAttribute(creditoEditar?.fecha, "value")} class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-2">🥩 Producto</label> <select name="producto" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"> <option value="">Seleccionar</option> ${productos?.map((p) => renderTemplate`<option${addAttribute(p.nombre, "value")}${addAttribute(creditoEditar?.producto === p.nombre, "selected")}>${p.nombre} - S/ ${p.precio}</option>`)} </select> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-2">🔢 Cantidad</label> <input type="number" name="cantidad" required${addAttribute(creditoEditar?.cantidad || 1, "value")} class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-2">💲 Precio unit.</label> <input type="number" step="0.01" name="precio" required${addAttribute(creditoEditar?.precio_unitario, "value")} class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"> </div> </div> <button type="submit" class="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"> ${creditoEditar ? "✓ Actualizar crédito" : "✓ Guardar crédito"} </button> ${creditoEditar && renderTemplate`<a${addAttribute(`/creditos?cliente=${clienteId}`, "href")} class="ml-3 px-6 py-2 bg-gray-500 text-white rounded-lg">✗ Cancelar</a>`} </form> </div> <div class="bg-white rounded-xl sm:rounded-2xl shadow-soft border border-gray-100 overflow-hidden"> <div class="px-4 sm:px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200"> <h2 class="text-xl font-bold text-gray-800">📋 Historial de créditos</h2> </div> ${creditos?.length === 0 ? renderTemplate`<div class="p-8 text-center text-gray-500"> <div class="text-6xl mb-3">📭</div> <p>No hay créditos registrados para este cliente</p> </div>` : renderTemplate`<div class="divide-y divide-gray-100"> ${creditos?.map((credito) => renderTemplate`<div${addAttribute(credito.id, "key")} class="p-5 hover:bg-gray-50 transition-colors"> <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4"> <div class="flex-1"> <div class="flex items-center gap-2 flex-wrap"> <span class="text-sm text-gray-500">${new Date(credito.fecha).toLocaleDateString("es-PE")}</span> <span${addAttribute(`px-2 py-1 text-xs rounded-full ${credito.estado === "pagado" ? "bg-green-100 text-green-700" : credito.estado === "parcial" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`, "class")}> ${credito.estado === "pagado" ? "✓ Pagado" : credito.estado === "parcial" ? "⚠ Parcial" : "❌ Pendiente"} </span> </div> <h3 class="font-semibold text-gray-800 mt-1">${credito.producto}</h3> <p class="text-sm text-gray-600">Cantidad: ${credito.cantidad} | Precio: S/ ${credito.precio_unitario.toFixed(2)}</p> <div class="mt-2 flex gap-3 text-sm"> <span>Total: <strong>S/ ${credito.total.toFixed(2)}</strong></span> <span>Pagado: <strong class="text-green-600">S/ ${(credito.pagado || 0).toFixed(2)}</strong></span> <span>Saldo: <strong${addAttribute(credito.saldo > 0 ? "text-red-600" : "text-green-600", "class")}>S/ ${(credito.saldo || 0).toFixed(2)}</strong></span> </div> </div> <div class="flex gap-2"> ${credito.saldo > 0 && renderTemplate`<button${addAttribute(`document.getElementById('pagoModal-${credito.id}').classList.remove('hidden')`, "onclick")} class="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600">
💵 Registrar pago
</button>`} <a${addAttribute(`/creditos?cliente=${clienteId}&edit=${credito.id}`, "href")} class="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">
✏️ Editar
</a> <form method="POST" onsubmit="return confirm('¿Eliminar este crédito?')"> <input type="hidden" name="deleteId"${addAttribute(credito.id, "value")}> <button type="submit" class="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600">
🗑️ Eliminar
</button> </form> </div> </div>  ${pagos?.filter((p) => p.credito_id === credito.id).length > 0 && renderTemplate`<div class="mt-4 ml-4 pl-4 border-l-2 border-gray-200"> <p class="text-xs font-semibold text-gray-500 mb-2">📝 Historial de pagos:</p> ${pagos.filter((p) => p.credito_id === credito.id).map((pago) => renderTemplate`<div${addAttribute(pago.id, "key")} class="text-xs text-gray-600 flex items-center gap-3 mb-1"> <span>📅 ${new Date(pago.fecha).toLocaleDateString("es-PE")}</span> <span>💰 S/ ${pago.monto.toFixed(2)}</span> <span class="capitalize">💳 ${pago.metodo_pago}</span> </div>`)} </div>`}  <div${addAttribute(`pagoModal-${credito.id}`, "id")} class="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50"> <div class="bg-white rounded-xl p-6 w-full max-w-md"> <h3 class="text-xl font-bold mb-4">Registrar pago</h3> <p class="text-sm text-gray-600 mb-4">
Producto: ${credito.producto}<br>
Saldo pendiente: <strong class="text-red-600">S/ ${(credito.saldo || 0).toFixed(2)}</strong> </p> <form method="POST"> <input type="hidden" name="pagoId"${addAttribute(credito.id, "value")}> <div class="space-y-4"> <div> <label class="block text-sm font-semibold mb-2">📅 Fecha</label> <input type="date" name="fecha" required class="w-full px-4 py-2 border rounded-lg"> </div> <div> <label class="block text-sm font-semibold mb-2">💵 Monto</label> <input type="number" step="0.01" name="monto"${addAttribute(credito.saldo, "max")} required class="w-full px-4 py-2 border rounded-lg"> </div> <div> <label class="block text-sm font-semibold mb-2">💳 Método de pago</label> <select name="metodo_pago" class="w-full px-4 py-2 border rounded-lg"> <option value="efectivo">Efectivo</option> <option value="yape">Yape</option> <option value="plin">Plin</option> <option value="transferencia">Transferencia</option> </select> </div> <div class="bg-blue-50 p-3 rounded-lg"> <p class="text-xs text-blue-800">
💡 Este pago se registrará como ingreso en el dashboard
</p> </div> <div class="flex gap-3"> <button type="submit" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg">Registrar pago</button> <button type="button"${addAttribute(`document.getElementById('pagoModal-${credito.id}').classList.add('hidden')`, "onclick")} class="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg">Cancelar</button> </div> </div> </form> </div> </div> </div>`)} </div>`} </div> ${pagos && pagos.length > 0 && renderTemplate`<div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200"> <h3 class="font-bold text-green-800 mb-3">📊 Resumen de pagos recibidos</h3> <div class="grid grid-cols-2 sm:grid-cols-4 gap-4"> <div> <p class="text-xs text-green-600">Total pagado</p> <p class="text-xl font-bold text-green-700">S/ ${totalPagado.toFixed(2)}</p> </div> <div> <p class="text-xs text-green-600">Deuda restante</p> <p class="text-xl font-bold text-red-600">S/ ${totalDeuda.toFixed(2)}</p> </div> <div> <p class="text-xs text-green-600">Número de pagos</p> <p class="text-xl font-bold text-green-700">${pagos.length}</p> </div> <div> <p class="text-xs text-green-600">% recuperado</p> <p class="text-xl font-bold text-green-700">${totalCreditos > 0 ? (totalPagado / totalCreditos * 100).toFixed(0) : 0}%</p> </div> </div> </div>`}` })}` : renderTemplate`<div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg"> <p class="text-yellow-800">Selecciona un cliente para ver sus créditos</p> <a href="/clientes" class="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Ver clientes →</a> </div>`} </div> ` })}`;
}, "C:/Users/Administrador/Desktop/qaleta/src/pages/creditos.astro", void 0);

const $$file = "C:/Users/Administrador/Desktop/qaleta/src/pages/creditos.astro";
const $$url = "/creditos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Creditos,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
