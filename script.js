gsap.from(".animar-titulo", {
    duration: 1,
    y: -30,
    opacity: 0
});
gsap.from(".animar-texto", {
    duration: 1,
    delay: 0.2,
    opacity: 0
});
const formulario = document.getElementById("formulario");
const clienteInput = document.getElementById("cliente");
const proyectoInput = document.getElementById("proyecto");
const paginasInput = document.getElementById("paginas");
const precioPaginaInput = document.getElementById("precioPagina");
const horasInput = document.getElementById("horas");
const precioHoraInput = document.getElementById("precioHora");
const resultadoDiv = document.getElementById("resultado");

function calcularCostoPaginas(paginas, precio) {
    return paginas * precio;
}
function calcularCostoAdicional(horas, precio) {
    return horas * precio;
}
function calcularSubtotal(costoPaginas, costoAdicional) {
    return costoPaginas + costoAdicional;
}
function calcularIVA(subtotal) {
    return subtotal * 0.16;
}
function calcularTotal(subtotal, iva) {
    return subtotal + iva;
}
function mostrarCotizacion(cotizacion) {
    if (!cotizacion) {
        resultadoDiv.innerHTML = "<p>sin cotizaciones</p>";
        return;
    }
    resultadoDiv.innerHTML = `
        <strong><i class="bi bi-person-fill"></i> Cliente: ${cotizacion.cliente}</strong>
        <p><strong>Proyecto:</strong> ${cotizacion.proyecto}</p>
        <p>Costo de páginas: $${cotizacion.costoPaginas.toFixed(2)}</p>
        <p>Costo adicional: $${cotizacion.costoAdicional.toFixed(2)}</p>
        <p>Subtotal: $${cotizacion.subtotal.toFixed(2)}</p>
        <p>IVA (16%): $${cotizacion.iva.toFixed(2)}</p>
        <p style="font-size: 18px; color: #d90429; font-weight: bold;">Total: $${cotizacion.total.toFixed(2)}</p>
    `;
}
function cargarUltimaCotizacion() {
    let ultimaCotizacion = JSON.parse(localStorage.getItem("ultimaCotizacion"));
    mostrarCotizacion(ultimaCotizacion);
}
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    let paginas = Number(paginasInput.value);
    let precioPagina = Number(precioPaginaInput.value);
    let horas = Number(horasInput.value);
    let precioHora = Number(precioHoraInput.value);
    let costoPaginas = calcularCostoPaginas(paginas, precioPagina);
    let costoAdicional = calcularCostoAdicional(horas, precioHora);
    let subtotal = calcularSubtotal(costoPaginas, costoAdicional);
    let iva = calcularIVA(subtotal);
    let total = calcularTotal(subtotal, iva);

    const cotizacion = {
        cliente: clienteInput.value,
        proyecto: proyectoInput.value,
        costoPaginas: costoPaginas,
        costoAdicional: costoAdicional,
        subtotal: subtotal,
        iva: iva,
        total: total
    };

    localStorage.setItem("ultimaCotizacion", JSON.stringify(cotizacion));

    mostrarCotizacion(cotizacion);
    formulario.reset();
});

cargarUltimaCotizacion();