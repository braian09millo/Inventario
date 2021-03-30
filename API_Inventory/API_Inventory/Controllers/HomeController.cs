using API_Inventory.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace API_Inventory.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        [HttpGet]
        public ActionResult ImprimirLista(string xoItems)
        {
            var _nombre = "rptListaMercado.rdlc";
            var _nombreDs = "ListaMercadoDS";
            var _path = HttpContext.Server.MapPath("~/Reportes/" + _nombre);
            var _lista = JsonConvert.DeserializeObject<List<Producto>>(xoItems);

            var bytes = Reporting.GenerarInforme(_lista, _path, _nombre, _nombreDs, "PDF", null);

            return File(bytes, "application/pdf", "ListaMercado_" + DateTime.Today.ToString() + ".pdf");
        }
    }
}
