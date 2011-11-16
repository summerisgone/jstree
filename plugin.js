;
(function ($) {
/**
 * Extended jQuery :contains selector (http://stackoverflow.com/questions/2196641/how-do-i-make-jquery-contains-case-insensitive)
 */
jQuery.expr[':'].Contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};
$.Controller('Tree',
/*@Static*/
{
    defaults: {treshold: 1}
},
/*@Prototype*/
{
    init: function(){
        this.element.find('ul').parent('li').addClass('opened');
        this.element.before('<form id="tree_search" action="#"><input type="search" placeholder="Enter state name"/></form>');
        this.delegate(document.documentElement, 'form#tree_search', 'keyup', this.callback('onSearch'));
    },
    'li.opened click': function(el, ev) {
        // Check if click was on [-] sign
        if ($(ev.target).hasClass('opened')) {
            $(ev.target).removeClass('opened').addClass('closed');
        }
        ev.stopPropagation();
    },
    'li.closed click': function(el, ev) {
        // Check if click was on [-] sign
        if ($(ev.target).hasClass('closed')) {
            $(ev.target).removeClass('closed').addClass('opened');
        }
        ev.stopPropagation();
    },
    onSearch: function(ev) {
        ev.preventDefault();
        var query = $(ev.target).val();
        if (query.length >= this.options.treshold) {
            this.filter(query);
        } else {
            this.filter('');
        }
    },
    filter: function(query) {
        if (query.length < this.options.treshold) {
            this.element.find('li').removeClass('filtered');
            this.element.find('span.highlight').each(function(index, el){
                $(el).parent().html($(el).parent().text());
            });
        } else {
            this.element.find('li').addClass('filtered');
            this.element.find('li:Contains("'+query+'")').removeClass('filtered');
            this.element.find('label:Contains("'+query+'")').each(function(index, el) {
                    var text = $(el).text(),
                    splitted = text.split(query),
                    hightlighted = '';

                for (var i=0; i<splitted.length-1;i++) {
                    hightlighted += splitted[i] + '<span class="highlight">' + query + '</span>';
                }
                hightlighted += splitted[splitted.length-1];
                $(el).html(hightlighted);
            });
        }
    }
});

$(function(){
    $('#tree').tree();
});
})(jQuery);