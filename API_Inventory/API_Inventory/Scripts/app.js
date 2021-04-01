//VARIABLES GLOBALES
var accion;

//AJAX CALLS
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
                    $('.inputProducto').autocomplete({ source: arrProductos.map(x => x.Descripcion) });
                    break;
                case 'P':
                    inicializarListaProductos();
                    break;
            }
        }
    });
}

function guardarProducto() {

    let xoProducto = {
        ProductoID: accion === 'E' ? parseInt($('#txtID').val()) : 0,
        Descripcion: $('#txtDescripcion').val().toUpperCase()
    }

    $.ajax({

        method: 'POST',
        url: '/api/Producto/AddProducto',
        data: xoProducto,
        success: function (result) {

            limpiarDatos();
            $('#modalProducto').modal('hide');
        },
        complete: function (result) {

            cargarProductos('P');
        }
    });

}

 //LISTA DE MERCADO METODOS
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

//PRODUCTOS
function inicializarListaProductos() {

    var tbodyProductos = $('#tblProductos > tbody');    
    var html = '';

    for (var i = 0; i < arrProductos.length; i++) {

        let producto = arrProductos[i];
        html += '<tr data-id="' + producto.ProductoID + '" data-desc="' + producto.Descripcion + '"><td>' + producto.Descripcion + '</td><td><button class="btn btn-info btn-sm" onclick="editarProducto(this)" title="Editar"><i class="fas fa-pencil-alt"></i></button> <button class="btn btn-danger btn-sm" title="Eliminar" onclick="eliminarProducto(this)"><i class="fas fa-trash-alt"></i></button></td></tr>';
    }

    tbodyProductos.empty().append(html);
}

function limpiarDatos() {

    $('#txtID').val('');
    $('#txtDescripcion').val('');
}

function abrirModalProducto(xsAccion) {

    accion = xsAccion;
    $('#modalProducto').modal('show');
}

function editarProducto(element) {

    var rowParent = $(element).parent().parent();
    $('#txtID').val($(rowParent).data('id'));
    $('#txtDescripcion').val($(rowParent).data('desc'));
    abrirModalProducto('E');

}

function eliminarProducto(element) {

    var rowParent = $(element).parent().parent();
    let xoProducto = {
        ProductoID: parseInt($(rowParent).data('id')),
        Descripcion: $(rowParent).data('desc')
    }
    
    $.ajax({

        method: 'POST',
        url: '/api/Producto/DeleteProducto',
        data: xoProducto,
        success: function (result) {
            console.log(result);
        },
        complete: function (result) {

            cargarProductos('P');
        }
    });

}

