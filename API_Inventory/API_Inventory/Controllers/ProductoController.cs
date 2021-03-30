using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace API_Inventory.Controllers
{
    public class ProductoController : Controller
    {
        // GET: Product
        public ActionResult ProductoView()
        {
            return View();
        }
    }
}