import { c as createComponent } from './astro-component_DyxCdPd6.mjs';
import 'piccolore';
import { s as renderComponent, v as renderTemplate, q as maybeRenderHead, k as addAttribute } from './entrypoint_5kZAInLD.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_FDUS06cx.mjs';
import { s as supabase } from './supabase_BBuPOtL-.mjs';

const prerender = false;
const $$Productos = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Productos;
  const editId = Astro2.url.searchParams.get(
    "edit"
  );
  let productoEditar = null;
  if (editId) {
    const { data } = await supabase.from("productos").select("*").eq("id", editId).single();
    productoEditar = data;
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const deleteId = formData.get(
      "deleteId"
    );
    const updateId = formData.get(
      "updateId"
    );
    if (deleteId) {
      await supabase.from("productos").delete().eq(
        "id",
        deleteId
      );
      return Astro2.redirect(
        "/productos"
      );
    } else if (updateId) {
      const nombre = formData.get("nombre")?.toString();
      const precio = Number(
        formData.get(
          "precio"
        )
      );
      const categoria = formData.get(
        "categoria"
      )?.toString();
      await supabase.from("productos").update({
        nombre,
        precio,
        categoria
      }).eq(
        "id",
        updateId
      );
      return Astro2.redirect(
        "/productos"
      );
    } else {
      const nombre = formData.get("nombre")?.toString();
      const precio = Number(
        formData.get(
          "precio"
        )
      );
      const categoria = formData.get(
        "categoria"
      )?.toString();
      await supabase.from("productos").insert([
        {
          nombre,
          precio,
          categoria,
          activo: true
        }
      ]);
      return Astro2.redirect(
        "/productos"
      );
    }
  }
  const {
    data: productos
  } = await supabase.from("productos").select("*").order("id", {
    ascending: false
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$DashboardLayout, { "title": "Productos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-6xl"> <h1 class="
      text-3xl
      font-bold
      mb-6
    ">
📦 Productos
</h1> <!-- FORM --> <div class="
      bg-white
      rounded-2xl
      p-6
      shadow-md
      mb-8
    "> <form method="POST" class="
        grid
        md:grid-cols-4
        gap-4
      "> ${productoEditar && renderTemplate`<input type="hidden" name="updateId"${addAttribute(
    productoEditar.id,
    "value"
  )}>`} <input type="text" name="nombre" placeholder="Producto" required class="
          border
          p-3
          rounded-xl
        "${addAttribute(
    productoEditar?.nombre,
    "value"
  )}> <input type="number" step="0.01" name="precio" placeholder="Precio" required class="
          border
          p-3
          rounded-xl
        "${addAttribute(
    productoEditar?.precio,
    "value"
  )}> <select name="categoria" class="
          border
          p-3
          rounded-xl
        "> <option>
Comida
</option> <option>
Bebida
</option> </select> <button type="submit" class="
          bg-black
          text-white
          rounded-xl
          px-4
          py-3
        "> ${productoEditar ? "Actualizar" : "Agregar"} </button> </form> </div> <!-- TABLA --> <div class="
      bg-white
      rounded-2xl
      shadow-md
      overflow-hidden
    "> <table class="w-full"> <thead class="
          bg-gray-100
        "> <tr> <th class="p-4 text-left">
Producto
</th> <th class="p-4 text-left">
Categoría
</th> <th class="p-4 text-left">
Precio
</th> <th class="p-4 text-left">
Acciones
</th> </tr> </thead> <tbody> ${productos?.map(
    (producto) => renderTemplate`<tr class="
                border-t
              "> <td class="p-4"> ${producto.nombre} </td> <td class="p-4"> ${producto.categoria} </td> <td class="p-4">
S/
${producto.precio} </td> <td class="p-4"> <div class="
                    flex
                    gap-2
                  "> <form method="GET"> <input type="hidden" name="edit"${addAttribute(
      producto.id,
      "value"
    )}> <button class="
                        bg-blue-500
                        text-white
                        px-3
                        py-2
                        rounded-lg
                      ">
Editar
</button> </form> <form method="POST"> <input type="hidden" name="deleteId"${addAttribute(
      producto.id,
      "value"
    )}> <button class="
                        bg-red-500
                        text-white
                        px-3
                        py-2
                        rounded-lg
                      ">
Eliminar
</button> </form> </div> </td> </tr>`
  )} </tbody> </table> </div> </div> ` })}`;
}, "C:/Users/Administrador/Desktop/qaleta/src/pages/productos.astro", void 0);

const $$file = "C:/Users/Administrador/Desktop/qaleta/src/pages/productos.astro";
const $$url = "/productos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Productos,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
