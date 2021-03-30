using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Datos;

namespace API_Inventory.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ApiProductController : ApiController
    {
        private InventarioEntities BDEntities = new InventarioEntities();

        [HttpGet]
        [Route("api/Producto/GetProductos")]
        public List<string> GetProductos()
        {
            var loListaProductos = BDEntities.PRODUCTO.Select(x => x.Descripcion).ToList();
            return loListaProductos;
        }
    }
}
