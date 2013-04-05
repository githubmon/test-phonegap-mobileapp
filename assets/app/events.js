App.Events = (function(lng, app, undefined) {
        //View List
    lng.dom('#btnListExpenses').tap(function(event) {
        
        App.Data.getExpenses();
    });

    lng.dom('#btnSaveExpense').tap(function(event) {
      var preID = new Date();

      var id = preID.getTime() ;
      var project= lng.dom('#tktProject');
      var ticketImage= document.getElementById('largeImage');
      var ticketDay =lng.dom('#tktDay');
      var ticketMonth=lng.dom('#tktMonth');
      var ticketYear= lng.dom('#tktYear');
      var total= lng.dom('#tktTotal');
      var currency = lng.dom('#tktCurrency');
      var description= lng.dom('#tktDesc');

      App.Data.insertExpense({
          id: id,
          project: project.val(),
          ticketImage:ticketImage.src,
          ticketDay: ticketDay.val(),
          ticketMonth: ticketMonth.val(),
          ticketYear: ticketYear.val(),
          total: total.val(),
          currency: currency.val(),
          description: description.val(),
          created_at: Date('now')
      });

      var chkTktDate = function(pTktDate) {

      };
      



//      App.View.returnToMain('ToDo created', 'check');
    });

})(LUNGO, App);