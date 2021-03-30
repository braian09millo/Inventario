using System.Web;
using System.Web.Optimization;

namespace API_Inventory
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));
            
            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                      "~/Scripts/jquery-ui.js"));
            
            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                      "~/Scripts/app.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/Site.css",
                      "~/Content/jquery-ui.css"));

            bundles.Add(new StyleBundle("~/bundles/font-awesome/css").Include(
                      "~/node_modules/@fortawesome/fontawesome-free/css/all.min.css", new CssRewriteUrlTransform()));

            bundles.Add(new ScriptBundle("~/bundles/font-awesome/js").Include(
                      "~/node_modules/@fortawesome/fontawesome-free/js/all.min.js"));
        }
    }
}
