//VARIABLES GLOBALES
var accion;

//DATEPICKER EN ESPAÑOL
$.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '< Ant',
    nextText: 'Sig >',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};

$.datepicker.setDefaults($.datepicker.regional['es']);

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

function guardarProductoDesdeLista(elemento) {

    let inputValor = $(elemento).parent().parent().find('.inputProducto').val().toUpperCase();

    let xoProducto = {
        ProductoID: 0,
        Descripcion: inputValor
    }

    $.ajax({

        method: 'POST',
        url: '/api/Producto/AddProducto',
        data: xoProducto,
        success: function (result) {
            alert('Producto agregado correctamente');
        },
        complete: function (result) {

            cargarProductos('LM');
        }
    });

}


 //LISTA DE MERCADO METODOS
function agregarItem() {

    var html = '<div class="form-group">' +
        '<div class="col-sm-8 col-xs-6">' +
        '<div class="input-group">' +
        '<span class="input-group-addon" id="basic-addon1"><i class="fas fa-barcode"></i></span>' +
        '<input type="text" class="form-control inputProducto" placeholder="Producto" aria-describedby="basic-addon1" />' +
        '</div>' +
        '</div >' +
        '<div class="col-sm-2 col-xs-3">' +
        '<input type="text" class="form-control inputCantidad" placeholder="Cantidad" />' +
        '</div>' +
        '<div class="col-sm-2 col-xs-3">' +
        '<button class="btn btn-success btn-add" onclick="agregarItem()"><i class="fas fa-plus"></i></button> ' +
        '<button class="btn btn-danger btnAddProducto" onclick="guardarProductoDesdeLista(this)" title="Agregar producto nuevo"><i class="fas fa-cart-plus"></i></button> ' +
        '<button class="btn btn-danger" onclick="eliminarItem(this)"><i class="fas fa-trash"></i></button>' + 
        '</div>' +
        '</div>' +
        '<script>$(".inputProducto").autocomplete({ source: arrProductos.map(x => x.Descripcion) });</script>'

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
