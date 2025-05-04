// callrestapi.js
// Ajusta el host/puerto si tu servidor corre en otro sitio
const url = "https://pg-restapi-minecraft-zallix-1074346283359.us-central1.run.app/api/blocks";
let blocksList = [];

// Crea un bloque
function postBlock() {
  const payload = {
    bloque:        $("#bloque").val(),
    tipoBloque:    $("#tipoBloque").val(),
    bioma:         $("#bioma").val(),
    uso:           $("#uso").val(),
    crafteo:       $("#crafteo").val(),
    herramienta:   $("#herramienta").val(),
    color:         $("#color").val(),
  };

  $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(payload),
    success: function(data) {
      $('#resultado').html("Creado: " + JSON.stringify(data.bloque));
      getBlocks();
    },
    error: function(xhr) {
      $('#resultado').html("Error: " + xhr.responseText);
    }
  });
}

// Lee todos los bloques y arma la tabla
function getBlocks() {
  $.getJSON(url, function(json) {
    blocksList = json.bloques;
    let html = `
      <table class="mc-table">
        <tr>
          <th>ID</th><th>Bloque</th><th>Tipo</th><th>Bioma</th>
          <th>Uso</th><th>Crafteo</th><th>Herramienta</th><th>Color</th>
          <th>Acciones</th>
        </tr>`;

    blocksList.forEach(b => {
      html += `
        <tr>
          <td>${b.id}</td>
          <td>${b.bloque}</td>
          <td>${b.tipoBloque}</td>
          <td>${b.bioma}</td>
          <td>${b.uso}</td>
          <td>${b.crafteo}</td>
          <td>${b.herramienta}</td>
          <td>${b.color}</td>
          <td>
            <button class="mc-btn" onclick="populateForm(${b.id})">Editar</button>
            <button class="mc-btn-del" onclick="deleteBlock(${b.id})">Eliminar</button>
          </td>
        </tr>`;
    });

    html += `</table>`;
    $('#resultado').html(html);
  });
}

// Rellena el formulario con los datos seleccionados
function populateForm(id) {
  const b = blocksList.find(x => x.id === id);
  if (!b) return alert("Bloque no encontrado");

  $("#blockId").val(b.id);
  $("#bloque").val(b.bloque);
  $("#tipoBloque").val(b.tipoBloque);
  $("#bioma").val(b.bioma);
  $("#uso").val(b.uso);
  $("#crafteo").val(b.crafteo);
  $("#herramienta").val(b.herramienta);
  $("#color").val(b.color);
}

// Actualiza el bloque cuyo ID está en el campo oculto
function updateBlock() {
  const id = $("#blockId").val();
  if (!id) return alert("Primero haz click en 'Editar' en la tabla");

  const payload = {
    bloque:      $("#bloque").val(),
    tipoBloque:  $("#tipoBloque").val(),
    bioma:       $("#bioma").val(),
    uso:         $("#uso").val(),
    crafteo:     $("#crafteo").val(),
    herramienta: $("#herramienta").val(),
    color:       $("#color").val(),
  };

  $.ajax({
    url: `${url}/${id}`,
    type: 'PUT',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(payload),
    success: function(data) {
      $('#resultado').html("Actualizado: " + JSON.stringify(data.bloque));
      getBlocks();
    },
    error: function(xhr) {
      $('#resultado').html("Error: " + xhr.responseText);
    }
  });
}

// Elimina el bloque con el ID dado
function deleteBlock(id) {
  if (!confirm("¿Seguro que quieres borrar el bloque " + id + "?")) return;

  $.ajax({
    url: `${url}/${id}`,
    type: 'DELETE',
    success: function() {
      $('#resultado').html("Bloque eliminado.");
      getBlocks();
    },
    error: function(xhr) {
      $('#resultado').html("Error: " + xhr.responseText);
    }
  });
}