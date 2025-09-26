/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$nav = $('#nav'), $nav_links = $nav.children('a');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['361px', '736px'],
		xsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Nav.
	$nav_links
		.on('click', function (event) {

			var href = $(this).attr('href');

			// Not a panel link? Bail.
			if (href.charAt(0) != '#'
				|| $panels.filter(href).length == 0)
				return;

			// Prevent default.
			event.preventDefault();
			event.stopPropagation();

			// Change panels.
			if (window.location.hash != href)
				window.location.hash = href;

		});

	// Panels.

	// Initialize.
	(function () {

		var $panel, $link;

		// Get panel, link.
		if (window.location.hash) {

			$panel = $panels.filter(window.location.hash);
			$link = $nav_links.filter('[href="' + window.location.hash + '"]');

		}

		// No panel/link? Default to first.
		if (!$panel
			|| $panel.length == 0) {

			$panel = $panels.first();
			$link = $nav_links.first();

		}

		// Deactivate all panels except this one.
		$panels.not($panel)
			.addClass('inactive')
			.hide();

		// Activate link.
		$link
			.addClass('active');

		// Reset scroll.
		$window.scrollTop(0);

	})();

	// Hashchange event.
	$window.on('hashchange', function (event) {

		var $panel, $link;

		// Get panel, link.
		if (window.location.hash) {

			$panel = $panels.filter(window.location.hash);
			$link = $nav_links.filter('[href="' + window.location.hash + '"]');

			// No target panel? Bail.
			if ($panel.length == 0)
				return;

		}

		// No panel/link? Default to first.
		else {

			$panel = $panels.first();
			$link = $nav_links.first();

		}

		// Deactivate all panels.
		$panels.addClass('inactive');

		// Deactivate all links.
		$nav_links.removeClass('active');

		// Activate target link.
		$link.addClass('active');

		// Set max/min height.
		$main
			.css('max-height', $main.height() + 'px')
			.css('min-height', $main.height() + 'px');

		// Delay.
		setTimeout(function () {

			// Hide all panels.
			$panels.hide();

			// Show target panel.
			$panel.show();

			// Set new max/min height.
			$main
				.css('max-height', $panel.outerHeight() + 'px')
				.css('min-height', $panel.outerHeight() + 'px');

			// Reset scroll.
			$window.scrollTop(0);

			// Delay.
			window.setTimeout(function () {

				// Activate target panel.
				$panel.removeClass('inactive');

				// Clear max/min height.
				$main
					.css('max-height', '')
					.css('min-height', '');

				// IE: Refresh.
				$window.triggerHandler('--refresh');

				// Unlock.
				locked = false;

			}, (breakpoints.active('small') ? 0 : 500));

		}, 250);

	});

	// IE: Fixes.
	if (browser.name == 'ie') {

		// Fix min-height/flexbox.
		$window.on('--refresh', function () {

			$wrapper.css('height', 'auto');

			window.setTimeout(function () {

				var h = $wrapper.height(),
					wh = $window.height();

				if (h < wh)
					$wrapper.css('height', '100vh');

			}, 0);

		});

		$window.on('resize load', function () {
			$window.triggerHandler('--refresh');
		});

		// Fix intro pic.
		$('.panel.intro').each(function () {

			var $pic = $(this).children('.pic'),
				$img = $pic.children('img');

			$pic
				.css('background-image', 'url(' + $img.attr('src') + ')')
				.css('background-size', 'cover')
				.css('background-position', 'center');

			$img
				.css('visibility', 'hidden');

		});

	}

	/**************************************   Aqui termina el codigo de animaciones   ***************************************/
	// Referencias correctas

	document.addEventListener("DOMContentLoaded", () => {
		const scrapInputs = document.querySelectorAll(".scrap-input");
		const totalScrap = document.getElementById("total-scrap");

		function calcularTotales() {
			let sumaScrap = 0;
			scrapInputs.forEach(input => {
				sumaScrap += parseInt(input.value) || 0;
			});
			totalScrap.textContent = sumaScrap;
		}

		scrapInputs.forEach(input => {
			input.addEventListener("input", calcularTotales);
		});

		calcularTotales(); // inicial
	});

	// Función que muestra/oculta la columna según el valor del input
	function toggleColumnaSinRetrabajo() {
		const valor = parseInt(document.getElementById("piezasSinRetrabajo").value) || 0;
		const mostrar = valor > 0;

		// Ocultar/mostrar TODAS las celdas de la columna
		document.querySelectorAll(".col-sin-retrabajo").forEach(el => {
			el.style.display = mostrar ? "table-cell" : "none";
		});

		// También el encabezado
		const th = document.querySelector("#tablaProduccion thead th.col-sin-retrabajo");
		if (th) th.style.display = mostrar ? "table-cell" : "none";
	}

	// Escuchar cambios en el input piezasSinRetrabajo
	document.getElementById("piezasSinRetrabajo").addEventListener("input", toggleColumnaSinRetrabajo);

	// Ejecutar una vez al inicio
	toggleColumnaSinRetrabajo();

	document.addEventListener("DOMContentLoaded", () => {
		const desdeInput = document.getElementById("desde");
		const hastaInput = document.getElementById("hasta");

		if (desdeInput && hastaInput) {
			const ahora = new Date();
			const hora = ahora.getHours();

			// Turno de día: 7am a 7pm
			if (hora >= 7 && hora < 19) {
				desdeInput.value = "07:00"; // 7:00 AM
				hastaInput.value = "19:00"; // 7:00 PM
			}
			// Turno de noche: 7pm a 7am
			else {
				desdeInput.value = "19:00"; // 7:00 PM
				hastaInput.value = "07:00"; // 7:00 AM
			}
		}
	});

	function validarHoras() {
		const desdeInput = document.getElementById("desde");
		const hastaInput = document.getElementById("hasta");
		const mensaje = document.getElementById("mensajeHoras");
		if (!desdeInput || !hastaInput || !mensaje) return;

		mensaje.textContent = ""; // limpiar mensaje anterior

		const desde = desdeInput.value;
		const hasta = hastaInput.value;
		if (!desde || !hasta) return;

		let inicio = new Date(`1970-01-01T${desde}`);
		let fin = new Date(`1970-01-01T${hasta}`);

		// si la hora final es igual o menor, la pasamos al día siguiente
		if (fin <= inicio) fin.setDate(fin.getDate() + 1);

		const diffHoras = (fin - inicio) / (1000 * 60 * 60);

		if (diffHoras > 12) {
			// calcular la hora máxima permitida (12h después de inicio)
			let limite = new Date(inicio.getTime() + 12 * 60 * 60 * 1000);

			// formatear a "HH:MM"
			let hh = String(limite.getHours()).padStart(2, "0");
			let mm = String(limite.getMinutes()).padStart(2, "0");

			hastaInput.value = `${hh}:${mm}`;

			// mostrar mensaje
			mensaje.textContent = `⏰ El turno no puede durar más de 12 horas. Se ajustó automáticamente a ${hh}:${mm}.`;

			// borrar mensaje después de 4 segundos
			setTimeout(() => {
				mensaje.textContent = "";
			}, 4000);
		}
		return true;
	}

	// conectar la validación
	["desde", "hasta"].forEach(id => {
		const el = document.getElementById(id);
		if (el) el.addEventListener("change", validarHoras);
	});


	// conectar la validación
	["desde", "hasta"].forEach(id => {
		const el = document.getElementById(id);
		if (el) el.addEventListener("change", validarHoras);
	});


	// conectar la validación
	["desde", "hasta"].forEach(id => {
		const el = document.getElementById(id);
		if (el) el.addEventListener("change", validarHoras);
	});


	// arreglo global de paros
	let parosGuardados = [];

	// cuando agregas un paro en la tabla de arriba
	const tablaParos = document.querySelector("#tablaParos tbody");
	const btnAgregarParo = document.querySelector("#btnAgregarParo");

	btnAgregarParo.addEventListener("click", () => {
		const inicio = document.getElementById("paroInicio").value;
		const fin = document.getElementById("paroFin").value;

		if (!inicio || !fin) {
			alert("Por favor selecciona hora de inicio y final.");
			return;
		}

		const inicioDate = new Date(`1970-01-01T${inicio}`);
		const finDate = new Date(`1970-01-01T${fin}`);
		let inicioMin = inicioDate.getHours() * 60 + inicioDate.getMinutes();
		let finMin = finDate.getHours() * 60 + finDate.getMinutes();

		// si el fin es menor o igual → cruza medianoche
		if (finMin <= inicioMin) {
			finMin += 24 * 60;
		}

		const duracion = finMin - inicioMin;
		if (duracion > 720) { // 12 horas máximo
			alert("⏰ El tiempo muerto no puede ser mayor a 12 horas.");
			return;
		}

		// --- VALIDACIONES ---
		let agregar = true;

		for (let p of parosGuardados) {
			let pInicio = p.inicio.getHours() * 60 + p.inicio.getMinutes();
			let pFin = p.fin.getHours() * 60 + p.fin.getMinutes();
			if (p.fin.getDate() > p.inicio.getDate()) pFin += 24 * 60;
			const duracionExist = pFin - pInicio;

			// 1) mismo inicio y fin
			if (pInicio === inicioMin && pFin === finMin) {
				alert("Ya existe un tiempo muerto con la misma hora de inicio y fin.");
				return;
			}

			// 2) mismo inicio, diferente fin
			if (pInicio === inicioMin && pFin !== finMin) {
				if (duracion > duracionExist) {
					document.querySelector(`tr[data-paro-id="${p.id}"]`)?.remove();
					parosGuardados = parosGuardados.filter(x => x.id !== p.id);
				} else {
					alert("Ya existe un tiempo muerto con mayor o igual duración.");
					return;
				}
			}

			// 3) mismo fin, diferente inicio
			if (pFin === finMin && pInicio !== inicioMin) {
				if (duracion > duracionExist) {
					document.querySelector(`tr[data-paro-id="${p.id}"]`)?.remove();
					parosGuardados = parosGuardados.filter(x => x.id !== p.id);
				} else {
					alert("Ya existe un tiempo muerto con mayor o igual duración.");
					return;
				}
			}

			// 4) solapamiento parcial
			if (!(finMin <= pInicio || inicioMin >= pFin)) {
				if (pInicio <= inicioMin && pFin >= finMin) {
					// el existente cubre todo → no agregar
					return;
				} else if (inicioMin < pInicio && finMin > pInicio && finMin <= pFin) {
					finMin = pInicio; // recortar fin
				} else if (inicioMin >= pInicio && inicioMin < pFin && finMin > pFin) {
					inicioMin = pFin; // recortar inicio
				} else if (inicioMin < pInicio && finMin > pFin) {
					// dividir en dos partes
					agregarParo(inicioMin, pInicio);
					inicioMin = pFin; // continuar con la segunda parte
				}
			}
		}

		// --- Agregar lo que quedó válido ---
		if (agregar && finMin > inicioMin) {
			agregarParo(inicioMin, finMin);
		}

		// limpiar inputs
		document.getElementById("paroInicio").value = "";
		document.getElementById("paroFin").value = "";
		calcularProduccion();
	});



	// función auxiliar para agregar un paro y dividir en cortes de hora
	function agregarParo(inicioMin, finMin) {
		let actual = inicioMin;
		while (actual < finMin) {
			let siguienteHora = Math.ceil((actual + 1) / 60) * 60;
			let siguiente = Math.min(siguienteHora, finMin);

			const hInicio = String(Math.floor((actual / 60) % 24)).padStart(2, "0");
			const mInicio = String(actual % 60).padStart(2, "0");
			const hFin = String(Math.floor((siguiente / 60) % 24)).padStart(2, "0");
			const mFin = String(siguiente % 60).padStart(2, "0");

			const paroId = Date.now() + "-" + actual;
			const fila = document.createElement("tr");
			fila.dataset.paroId = paroId;
			fila.innerHTML = `
            <td>${hInicio}:${mInicio}</td>
            <td>${hFin}:${mFin}</td>
            <td>${siguiente - actual}</td>
            <td><span class="icono-eliminar">🗑️</span></td>
        `;
			fila.querySelector(".icono-eliminar").addEventListener("click", () => {
				fila.remove();
				parosGuardados = parosGuardados.filter(p => p.id !== paroId);
				calcularProduccion();
			});
			tablaParos.appendChild(fila);

			let subInicio = new Date(`1970-01-01T${hInicio}:${mInicio}`);
			let subFin = new Date(`1970-01-01T${hFin}:${mFin}`);
			if (subFin <= subInicio) subFin.setDate(subFin.getDate() + 1);
			parosGuardados.push({ id: paroId, inicio: subInicio, fin: subFin });

			actual = siguiente;
		}
	}



	// función auxiliar: minutos trabajados en una hora descontando paros
	function minutosTrabajadosConParos(horaInicioMin, horaFinMin, inicioMin, finMin) {
		// minutos base de esa hora
		let desdeMin = Math.max(inicioMin, horaInicioMin);
		let hastaMin = Math.min(finMin, horaFinMin);
		let minutos = Math.max(0, hastaMin - desdeMin);

		// restar los paros
		parosGuardados.forEach(paro => {
			let pInicio = paro.inicio.getHours() * 60 + paro.inicio.getMinutes();
			let pFin = paro.fin.getHours() * 60 + paro.fin.getMinutes();
			if (paro.fin.getDate() > paro.inicio.getDate()) {
				pFin += 24 * 60; // cruza medianoche
			}

			const desdeP = Math.max(horaInicioMin, pInicio);
			const hastaP = Math.min(horaFinMin, pFin);
			const overlap = Math.max(0, hastaP - desdeP);

			minutos -= overlap;
		});

		return Math.max(0, minutos);
	}

	// función principal de producción
	function calcularProduccion() {
		const ciclo = parseFloat(document.getElementById("ciclo")?.value) || 0;
		const cavidades = parseInt(document.getElementById("cavidades")?.value) || 0;
		const sinRetrabajo = parseInt(document.getElementById("piezasSinRetrabajo")?.value) || 0;
		const desde = document.getElementById("desde")?.value;
		const hasta = document.getElementById("hasta")?.value;
		if (ciclo <= 0 || cavidades <= 0 || !desde || !hasta) return;

		const piezasHora = Math.floor((3600 / ciclo) * cavidades);
		const inicioDate = new Date(`1970-01-01T${desde}`);
		let finDate = new Date(`1970-01-01T${hasta}`);
		if (finDate <= inicioDate) finDate.setDate(finDate.getDate() + 1);
		const inicioMin = inicioDate.getHours() * 60 + inicioDate.getMinutes();
		const finMin = (finDate.getHours() + (finDate.getDate() > 1 ? 24 : 0)) * 60 + finDate.getMinutes();

		const turnoNoche = inicioDate.getHours() >= 19;
		const horas24 = turnoNoche
			? [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
			: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

		const filas = document.querySelectorAll("#tablaProduccion tbody tr:not(.fila-totales)");
		let totalPlan = 0, totalScrap = 0, totalSinRetrabajo = 0, totalConRetrabajo = 0;

		filas.forEach((fila, i) => {
			const planCell = fila.cells[1];
			const scrapInput = fila.querySelector(".scrap-input");
			const sinRetCell = fila.querySelector(".col-sin-retrabajo");
			const conRetCell = fila.cells[fila.cells.length - 1];
			const horaInicio = horas24[i];
			const horaFin = horaInicio + 1;
			const filaInicioMin = horaInicio * 60;
			const filaFinMin = horaFin * 60;

			// minutos de esa hora (sin paros)
			const minutosHora = Math.max(0, Math.min(filaFinMin, finMin) - Math.max(filaInicioMin, inicioMin));
			// minutos efectivos (con paros)
			const minutosTrabajados = minutosTrabajadosConParos(filaInicioMin, filaFinMin, inicioMin, finMin);

			// Plan se calcula con todos los minutos
			let plan = Math.round(piezasHora * (minutosHora / 60));
			planCell.textContent = plan;
			totalPlan += plan;

			// Buenas con paros
			let buenas = Math.round(piezasHora * (minutosTrabajados / 60));

			// Scrap
			const scrap = parseInt(scrapInput?.value) || 0;
			totalScrap += scrap;

			let piezasBuenas = Math.max(0, buenas - scrap);

			if (sinRetrabajo > 0 && cavidades > 0 && sinRetCell) {
				const piezasSin = Math.round(piezasBuenas * (sinRetrabajo / cavidades));
				const piezasCon = piezasBuenas - piezasSin;
				sinRetCell.textContent = piezasSin;
				conRetCell.textContent = piezasCon;
				totalSinRetrabajo += piezasSin;
				totalConRetrabajo += piezasCon;
			} else {
				conRetCell.textContent = piezasBuenas;
				if (sinRetCell) sinRetCell.textContent = "0";
				totalConRetrabajo += piezasBuenas;
			}
		});

		document.getElementById("total-plan").textContent = totalPlan;
		document.getElementById("total-scrap").textContent = totalScrap;
		document.getElementById("total-sin-retrabajo").textContent = totalSinRetrabajo;
		document.getElementById("total-con-retrabajo").textContent = totalConRetrabajo;
	}

	["ciclo", "cavidades", "piezasSinRetrabajo", "desde", "hasta"].forEach(id => {
		const el = document.getElementById(id);
		if (el) el.addEventListener("input", calcularProduccion);
	});
	document.querySelectorAll(".scrap-input").forEach(input => {
		input.addEventListener("input", calcularProduccion);
	});
	document.addEventListener("DOMContentLoaded", () => {
		calcularProduccion();
	});

	// recalcular al cambiar inputs principales
	["ciclo", "cavidades", "piezasSinRetrabajo", "desde", "hasta"].forEach(id => {
		const el = document.getElementById(id);
		if (el) el.addEventListener("input", calcularProduccion);
	});

	// recalcular al cambiar scrap
	document.querySelectorAll(".scrap-input").forEach(input => {
		input.addEventListener("input", calcularProduccion);
	});

	// recalcular cuando cambien inputs
	["ciclo", "cavidades", "piezasSinRetrabajo", "desde", "hasta"].forEach(id => {
		const el = document.getElementById(id);
		if (el) el.addEventListener("input", calcularProduccion);
	});

	// recalcular al cambiar cualquier scrap
	document.querySelectorAll(".scrap-input").forEach(input => {
		input.addEventListener("input", calcularProduccion);
	});


	// recalcular cuando cambien los inputs
	["ciclo", "cavidades", "piezasSinRetrabajo", "desde", "hasta"].forEach(id => {
		const el = document.getElementById(id);
		if (el) el.addEventListener("input", calcularProduccion);
	});



	// ⚡ Recalcular al cambiar cualquier input
	["ciclo", "cavidades", "piezasSinRetrabajo", "desde", "hasta"].forEach(id => {
		const el = document.getElementById(id);
		if (el) el.addEventListener("input", calcularProduccion);
	});

	// ⚡ Ejecutar al inicio
	document.addEventListener("DOMContentLoaded", () => {
		calcularProduccion();
	});

	["ciclo", "cavidades", "piezasSinRetrabajo"].forEach(id => {
		const el = document.getElementById(id);
		if (el) {
			const guardado = localStorage.getItem(id);
			if (guardado !== null) {
				el.value = guardado;
			}

			el.addEventListener("input", () => {
				localStorage.setItem(id, el.value);
				calcularProduccion();
				if (id === "piezasSinRetrabajo") {
					toggleColumnaSinRetrabajo(); // actualizar visibilidad
				}
			});
		}
	});

	// ⚡ Forzar actualización al cargar página
	document.addEventListener("DOMContentLoaded", () => {
		toggleColumnaSinRetrabajo();
	});



	document.addEventListener("DOMContentLoaded", () => {
		const yearSelect = document.getElementById("yearSelect");
		const months = document.querySelectorAll(".months li a");
		const daysContainer = document.querySelector(".days");
		const dateHeader = document.querySelector(".date");

		const monthNames = [
			"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
			"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
		];
		const weekdayNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

		// Rellenar años
		const currentYear = new Date().getFullYear();
		for (let y = currentYear - 50; y <= currentYear + 50; y++) {
			const opt = document.createElement("option");
			opt.value = y;
			opt.textContent = y;
			if (y === currentYear) opt.selected = true;
			yearSelect.appendChild(opt);
		}

		// Estado actual
		let selectedMonth = new Date().getMonth();
		let selectedYear = currentYear;
		const now = new Date();

		// patrón de turnos
		const pattern = ["A/B", "A/B", "A/B", "C/D", "C/D", "A/B", "A/B", "C/D", "C/D", "C/D", "A/B", "A/B", "C/D", "C/D"];
		const startDate = new Date(2025, 8, 21); // septiembre es mes 8 (0-based)


		// Renderizar días
		function renderDays(month, year) {
			daysContainer.innerHTML = "";

			const firstDay = new Date(year, month, 1).getDay(); // 0 = domingo
			const daysInMonth = new Date(year, month + 1, 0).getDate();
			let startDay = firstDay; // ahora arranca en domingo

			// espacios vacíos antes del día 1
			for (let i = 0; i < startDay; i++) {
				const li = document.createElement("li");
				daysContainer.appendChild(li);
			}

			for (let d = 1; d <= daysInMonth; d++) {
				const li = document.createElement("li");
				const a = document.createElement("a");
				a.textContent = d;
				a.href = "#";
				a.setAttribute("data-value", d);

				// Marcar hoy
				if (d === now.getDate() &&
					month === now.getMonth() &&
					year === now.getFullYear()) {
					a.classList.add("selected", "today");
					updateLeftCol(new Date(year, month, d));
				}

				// --- etiqueta de turno ---
				const dayDate = new Date(year, month, d);
				if (dayDate >= startDate) {
					const diffDays = Math.floor((dayDate - startDate) / (1000 * 60 * 60 * 24));
					const turno = pattern[diffDays % pattern.length];

					const label = document.createElement("div");
					label.classList.add("label");
					label.textContent = turno;

					if (turno === "A/B") {
						label.classList.add("ab");
						li.classList.add("ab"); // clase para fondo en número
					} else {
						label.classList.add("cd");
						li.classList.add("cd"); // clase para fondo en número
					}

					li.appendChild(a);
					li.appendChild(label);
				} else {
					li.appendChild(a);
				}

				// click en día
				a.addEventListener("click", e => {
					e.preventDefault();
					daysContainer.querySelectorAll("a").forEach(x => x.classList.remove("selected"));
					a.classList.add("selected");
					updateLeftCol(new Date(year, month, d));
				});

				daysContainer.appendChild(li);
			}
		}



		// Actualizar lado izquierdo
		function updateLeftCol(date) {
			const dayName = weekdayNames[date.getDay()];
			const monthName = monthNames[date.getMonth()];
			const day = date.getDate();

			dateHeader.innerHTML = `${dayName}<span>${monthName} ${day}, ${date.getFullYear()}</span>`;
		}

		// Inicializar
		renderDays(selectedMonth, selectedYear);
		// Marcar el mes actual al iniciar
		months.forEach(x => x.classList.remove("selected"));
		months[selectedMonth].classList.add("selected");


		// Meses
		months.forEach(m => {
			m.addEventListener("click", e => {
				e.preventDefault();
				months.forEach(x => x.classList.remove("selected"));
				m.classList.add("selected");
				selectedMonth = parseInt(m.getAttribute("data-value"));
				renderDays(selectedMonth, parseInt(yearSelect.value));
			});
		});

		// Cambio de año
		yearSelect.addEventListener("change", () => {
			selectedYear = parseInt(yearSelect.value);
			renderDays(selectedMonth, selectedYear);
		});
	});

	/***************************  CACHE CON EXPIRACIÓN 7AM/7PM  ***************************/
	function guardarCache(key, value) {
		const ahora = new Date();
		let expira;

		const horaActual = ahora.getHours();
		if (horaActual >= 19) {
			expira = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1, 7, 0, 0);
		} else if (horaActual >= 7) {
			expira = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), 19, 0, 0);
		} else {
			expira = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), 7, 0, 0);
		}

		const datos = { valor: value, expira: expira.getTime() };
		localStorage.setItem(key, JSON.stringify(datos));
	}

	function obtenerCache(key) {
		const item = localStorage.getItem(key);
		if (!item) return null;
		const datos = JSON.parse(item);
		if (Date.now() > datos.expira) {
			localStorage.removeItem(key);
			return null;
		}
		return datos.valor;
	}

	// Limpiar cache en la próxima 7AM o 7PM
	function programarLimpiezaCache() {
		const ahora = new Date();
		let siguiente;
		if (ahora.getHours() >= 19) {
			siguiente = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1, 7, 0, 0);
		} else if (ahora.getHours() >= 7) {
			siguiente = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), 19, 0, 0);
		} else {
			siguiente = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), 7, 0, 0);
		}
		const tiempo = siguiente.getTime() - ahora.getTime();
		setTimeout(() => {
			localStorage.clear();
		}, tiempo);
	}
	programarLimpiezaCache();

	/***************************  CACHE PARA SCRAP  ***************************/
	document.querySelectorAll(".scrap-input").forEach((input, i) => {
		input.addEventListener("input", () => {
			let scrapData = Array.from(document.querySelectorAll(".scrap-input")).map(inp => inp.value || "0");
			guardarCache("scrapData", scrapData);
		});
	});

	function restaurarScrapDeCache() {
		const scrapData = obtenerCache("scrapData");
		if (scrapData) {
			document.querySelectorAll(".scrap-input").forEach((input, i) => {
				if (scrapData[i] !== undefined) input.value = scrapData[i];
			});
		}
	}
	restaurarScrapDeCache();

	/***************************  CACHE PARA PAROS  ***************************/
	function guardarParosEnCache() {
		const paros = parosGuardados.map(p => ({
			inicio: p.inicio.toISOString(),
			fin: p.fin.toISOString(),
			id: p.id
		}));
		guardarCache("parosData", paros);
	}

	function restaurarParosDeCache() {
		const paros = obtenerCache("parosData");
		if (paros) {
			paros.forEach(p => {
				let inicioDate = new Date(p.inicio);
				let finDate = new Date(p.fin);
				let inicioMin = inicioDate.getHours() * 60 + inicioDate.getMinutes();
				let finMin = finDate.getHours() * 60 + finDate.getMinutes();
				if (finDate.getDate() > inicioDate.getDate()) finMin += 24 * 60;
				agregarParo(inicioMin, finMin);
			});
		}
	}
	restaurarParosDeCache();

	// Guardar en cache cada vez que se agregan/eliminan paros
	const observer = new MutationObserver(guardarParosEnCache);
	observer.observe(document.querySelector("#tablaParos tbody"), { childList: true });







})(jQuery);