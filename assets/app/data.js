App.Data = (function(lng, App, undefined) {

    //CONFIG: Data.Sql
    lng.Data.Sql.init({
        name: 'ExpensesDB',
        version: '1.0',
        schema: [
            { name: 'tblExpense', drop: false, fields: {
                id: 'INTEGER PRIMARY KEY',
                project: 'STRING',
                ticketImage: 'STRING',
                ticketDay: 'STRING',
                ticketMonth: 'STRING',
                ticketYear: 'STRING',
                total: 'INTEGER DEFAULT 0',
                currency: 'STRING',
                description: 'STRING',
                created_at: 'DATETIME'
                }
            }
        ]
    });
    


    var refresh = function() {
        getExpenses();
    };

    var insertExpense = function(data) {
        lng.Data.Sql.insert('tblExpense', data);
    };

    var removeExpense = function(id) {
        lng.Data.Sql.drop('tblExpense', {id:id});
    };

    var updateTodo = function(id, data) {
        lng.Data.Sql.update('tblExpense', data, {id:id});
        refresh();
    };

    var expenseID = function() {
        lng.Data.Sql.update('tblExpense', {done:1}, {id:id});
    };

    var getExpense = function() {
        lng.Data.Sql.select('tblExpense', {id:id}, function(result) {
            App.View.list('#formExpenses', 'expense-tmp', result);
        });
    };

//
    var getExpenses = function() {
       var res = [];   
       var sqlCode='SELECT id,ticketDay,ticketMonth,ticketYear,total,currency,description,(SELECT SUM(total) FROM tblExpense t2 WHERE t2.ticketDay = t1.ticketDay and t2.ticketMonth=t1.ticketMonth and t2.ticketYear=t1.ticketYear) sumaTotal FROM tblExpense t1 order by ticketDay desc, ticketMonth desc, ticketYear desc';
       var param = { el: '#ExpensesList' };
       var curDay=0;
       var curMonth=0;
       var curYear=0;

       App.View.initTemplate();

       lng.Data.Sql.execute(sqlCode,
         function(result) {
          console.log("Resultados: " + result);
          for (var i = 0, len = result.rows.length; i < len; i++) {

             param.data = result.rows.item(i);

	     if ( curDay   != result.rows.item(i)['ticketDay']   ||
                  curMonth != result.rows.item(i)['ticketMonth'] ||
                  curYear  != result.rows.item(i)['ticketYear']){
               // Comparar fechas - expense-header-day
               param.template = 'expense-header-day';
             }else if (i==len-1){
               //Botones Finales - btn-exp-day
               param.template = 'btn-exp-day';
             }else{
               //Mostrar expense - expense-by-day
               param.template = 'expense-by-day';
             }
            
             if (param.template == 'expense-header-day') {
               lng.View.Template.List.append(param);
               param.template = 'expense-by-day';
             }

             lng.View.Template.List.append(param);

             curDay = result.rows.item(i)['ticketDay'];
             curMonth = result.rows.item(i)['ticketMonth'];
             curYear = result.rows.item(i)['ticketYear'];

          }

            //lng.View.Template.render('#ExpensesList', 'expense-by-day', res);
         })
     };


    return {
        refresh: refresh,
        insertExpense: insertExpense,
        removeExpense: removeExpense,
        getExpenses: getExpenses,
        updateTodo: updateTodo
    }

})(LUNGO, App);