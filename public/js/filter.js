$(document).ready(function() {
    function applyFilter(filterString) {
        const appointments = $('.list');
        console.log("appointments "+appointments);
            if ('G'===filterString) {
                $('.G').show();
                $('.G2').hide(); 
            } 
            else  if ('G2'===filterString){
                $('.G2').show();
                $('.G').hide();
            }
            else{
                $('.G2').show();
                $('.G').show();
            }
     }
    $('#g2Filter').on('click', function() {
        let filter = $(this).html();
        console.log("filter"+filter);
        applyFilter(filter);
    });
    $('#gFilter').on('click', function() {
        let filterString = $(this).html();
        console.log("filter"+filterString);
        applyFilter(filterString);
    });

    $('#showAll').on('click', function() {
        let filterString = $(this).html();
        console.log("filter"+filterString);
        applyFilter(filterString);
    });
   
});