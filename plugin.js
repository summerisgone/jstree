;
(function ($) {
$.Controller('Tree',
/*@Static*/
{

},
/*@Prototype*/
{
    init: function(){
        this.element.find('ul').parent('li').addClass('opened');
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
    }
});

$(function(){
    $('#tree').tree();
});
})(jQuery);