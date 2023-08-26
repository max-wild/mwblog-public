(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['blog_content_portion'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"blog_content_portion\">\r\n\r\n    <select name=\"portion_type\" class=\"portion_type\">\r\n        <option value=\"text\">Text</option>\r\n        <option value=\"divider\">Divider</option>\r\n        <option value=\"image\">Image</option>\r\n        <option value=\"yt_link\">YT Link</option>\r\n        <option value=\"audio\">Audio</option>\r\n    </select>\r\n\r\n    <div class=\"portion_vert_divider\"></div>\r\n\r\n    <textarea name=\"portion_filling\" class=\"portion_filling\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"portion_filling") || (depth0 != null ? lookupProperty(depth0,"portion_filling") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"portion_filling","hash":{},"data":data,"loc":{"start":{"line":13,"column":61},"end":{"line":13,"column":80}}}) : helper)))
    + "</textarea>\r\n\r\n    <div class=\"portion_vert_divider\"></div>\r\n\r\n    <button class=\"portion_delete\" type=\"button\"><i class=\"las la-trash-alt\"></i></button>\r\n\r\n</div>";
},"useData":true});
})();