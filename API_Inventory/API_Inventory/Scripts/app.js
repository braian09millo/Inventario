function cargarProductos(origen) {

    $.ajax({

        method: 'GET',
        url: '/api/Producto/GetProductos',
        success: function (result) {

            arrProductos = result;
        },
        complete: function (result) {

            switch (origen) {

                case 'LM':
                    $('.inputProducto').autocomplete({ source: arrProductos });
                    break;
                case 'P':
                    inicializarListaProductos();
                    break;
            }
        }
    });
}

function agregarItem() {

    var html = '<div class="form-group">' +
        '<div class="col-sm-8 col-xs-6">' +
        '<div class="input-group input-group-lg">' +
        '<span class="input-group-addon" id="basic-addon1"><i class="fas fa-barcode"></i></span>' +
        '<input type="text" class="form-control inputProducto" placeholder="Producto" id="txtProducto" aria-describedby="basic-addon1" />' +
        '</div>' +
        '</div >' +
        '<div class="col-sm-2 col-xs-3">' +
        '<input type="text" class="form-control input-lg inputCantidad" placeholder="Cantidad" id="txtCantidad"/>' +
        '</div>' +
        '<div class="col-sm-2 col-xs-3">' +
        '<button class="btn btn-success btn-lg btn-add" onclick="agregarItem()"><i class="fas fa-plus"></i></button> ' +
        '<button class="btn btn-danger btn-lg" onclick="eliminarItem(this)"><i class="fas fa-trash"></i></button>' +
        '</div>' +
        '</div>'

    $('#formBody').append(html);
}

function eliminarItem(element) {

    var formGroupParent = $(element).parent().parent();
    $(formGroupParent).remove();
}

function inicializarListaProductos() {

    var tbodyProductos = $('#tblProductos > tbody');    
    var html = '';

    for (var i = 0; i < arrProductos.length; i++) {

        let producto = arrProductos[i];
        html += '<tr><td>' + producto + '</td><td><button class="btn btn-info btn-sm" title="Editar"><i class="fas fa-pencil-alt"></i></button> <button class="btn btn-danger btn-sm" title="Eliminar"><i class="fas fa-trash-alt"></i></button></td></tr>';
    }

    tbodyProductos.append(html);
}