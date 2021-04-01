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
        public List<PRODUCTO> GetProductos()
        {
            var loListaProductos = BDEntities.PRODUCTO.ToList();
            return loListaProductos;
        }

        [HttpPost]
        [Route("api/Producto/AddProducto")]
        public string AgregarProducto(PRODUCTO xoProducto)
        {
            string lsMensajeRespuesta;

            try
            {
                if (xoProducto != null)
                {
                    PRODUCTO loNuevoProducto;

                    if (xoProducto.ProductoID != 0)
                    {
                        loNuevoProducto = BDEntities.PRODUCTO.Find(xoProducto.ProductoID);
                        loNuevoProducto.Descripcion = xoProducto.Descripcion;
                    }
                    else
                    {
                        loNuevoProducto = new PRODUCTO() { Descripcion = xoProducto.Descripcion };                        
                        BDEntities.PRODUCTO.Add(xoProducto);
                    }

                    lsMensajeRespuesta = "PRODUCTO GUARDADO CORRECTAMENTE";

                    BDEntities.SaveChanges();
                }
                else
                    lsMensajeRespuesta = "EL OBJETO PRODUCTO NO PUEDE SER NULO";
            }
            catch (Exception ex)
            {
                lsMensajeRespuesta = ex.Message;
            }

            return lsMensajeRespuesta;
        }

        [HttpPost]
        [Route("api/Producto/DeleteProducto")]
        public string EliminarProducto(PRODUCTO xoProducto)
        {
            string lsMensajeRespuesta;

            try
            {
                PRODUCTO loProductoSeleccionado = BDEntities.PRODUCTO.Find(xoProducto.ProductoID);
                BDEntities.PRODUCTO.Remove(loProductoSeleccionado);
                BDEntities.SaveChanges();

                lsMensajeRespuesta = "PRODUCTO ELIMINADO CORRECTAMENTE";
            }
            catch (Exception ex)
            {
                lsMensajeRespuesta = ex.Message;
            }

            return lsMensajeRespuesta;
        }
    }
}
