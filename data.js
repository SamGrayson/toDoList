var templates = {

};

templates.postmain = [
  '<div class="post" data-id="<%= _id %>" rel="<%= completed %>" >',
    '<% if (completed === "no") { %>',
    '<span class="fa-stack fa-lg">',
      '<i class="fa fa-circle-thin fa-stack-2x check"></i>',
      '<i class="fa fa-circle-thin fa-stack-2x check" id="checkMark"></i>',
    '</span>',
    '<h2><%= title %></h2>',
    '<% } %>',
    '<% if (completed === "yes") { %>',
    '<span class="fa-stack fa-lg">',
      '<i class="fa fa-circle-thin fa-stack-2x check"></i>',
      '<i class="fa fa-check fa-stack-2x check id="checkMark"></i>',
    '</span>',
    '<h2><strike><%= title %></strike></h2>',
    '<% } %>',
    '<i class="fa fa-times deleteButton"></i>',
  '</div>'
].join('');
