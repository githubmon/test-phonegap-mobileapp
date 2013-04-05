App.View = (function(lng, app, undefined) {

   var listExpHeaderbyDay = '<li class="tip darker round" data-icon="calendar mini">\
                                Day {{ticketDay}}/{{ticketMonth}}/{{ticketYear}}\
                                <small class="onright bubble white">{{sumaTotal}}&nbsp;{{currency}}</small>\
                             </li>';

   var listExpensespByDay =  '<li class="selectable">\
                                <a href="#" id="{{id}}" data-target="section">\
                                  {{description}}\
                                  <small class="onright bubble">{{total}}&nbsp;{{currency}}</small>\
                                </a>\
                              </li>';

    var btnExpensesByDay = '<li>\
                              <table class="wide-table">\
                              <tr>\
                                <td width="43%">\
                                  <a id="btnCloseWeek" href="#back" data-target="section" class="button big"> Close Week </a>\
                                </td>\
                                <td width="6%">&nbsp;</td>\
                                <td width="43%">\
                                   <a id="btnCancel" href="#back" data-target="section" class="button big"> Cancel </a>\
                                </td>\
                              </tr>\
                              </table>\
                            </li>';



   var initTemplate = function(){

     lng.View.Template.create( 'btn-exp-day',  btnExpensesByDay );
     alert('btn-exp-day has been created');
     lng.View.Template.create( 'expense-header-day',  listExpHeaderbyDay );
     alert('expense-header-day has been created');
     lng.View.Template.create( 'expense-by-day', listExpensespByDay );
     alert('expense-by-day has been created');
   }

   return {
     initTemplate:initTemplate
   }
})(LUNGO, App);