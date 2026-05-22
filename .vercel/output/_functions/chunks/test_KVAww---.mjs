import { c as createComponent } from './astro-component_DyxCdPd6.mjs';
import 'piccolore';
import { q as maybeRenderHead, v as renderTemplate } from './entrypoint_5kZAInLD.mjs';
import 'clsx';
import { s as supabase } from './supabase_BBuPOtL-.mjs';

const $$Test = createComponent(async ($$result, $$props, $$slots) => {
  const { data: gastos, error } = await supabase.from("gastos").select("*");
  return renderTemplate`${maybeRenderHead()}<h1>Prueba de gastos</h1> ${error && renderTemplate`<p>Error: ${error.message}</p>`} <ul> ${gastos?.map((gasto) => renderTemplate`<li> ${gasto.descripcion} - 
      S/${gasto.monto} </li>`)} </ul>`;
}, "C:/Users/Administrador/Desktop/qaleta/src/pages/test.astro", void 0);

const $$file = "C:/Users/Administrador/Desktop/qaleta/src/pages/test.astro";
const $$url = "/test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Test,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
