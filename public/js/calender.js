$(function () {
    // Initialize time picker
    $('#timePicker').datetimepicker({
        format: 'LT',
        datepicker:false,
        closeOnTime: true,
        stepping: 30,
        enabledHours: [9, 10, 11, 12, 13, 14],
    });

    // Initialize calendar
    $('#calendar').fullCalendar({
        selectable: true,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
        showNonCurrentDates: false,
        selectConstraint:'businessHours',
        businessHours: {
            dow: [ 1, 2, 3, 4, 5 ], // Monday - Friday
            start: '09:00', // a start time (10am in this example)
            end: '14:00', // an end time (6pm in this example)
        },
        select: function (start, end,allDay) {
            var check =$.fullCalendar.formatDate(start, "YYYY-MM-DD");
            console.log("typeof(check)"+check);
            var today= moment().format('YYYY-MM-DD');
            console.log("typeof(today)"+today);
            console.log("check");
            if(check < today){
                alert("You can't select a date in the past");
            }
            else{
                $('#date').val(check);
                console.log($("#date").val());
            }
        },
        viewRender: function (view, element) {
            var d = new Date();
            var start = new Date(d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate());
            var end = new Date().setFullYear(d.getFullYear() + 1);
            $("#calendar .fc-past").addClass('fc-nonbusiness');
            if (end < view.end) {
                $("#calendar .fc-next-button").hide();
                
                
                $("#calendar .fc-next-button").hide();

                return false;
            } else {
                $("#calendar .fc-next-button").show();
            }
    
            if (view.start < start) {
                $("#calendar .fc-prev-button").hide();
                return false;
            } else {
                $("#calendar .fc-prev-button").show();
            }
        },
        navLinks: true,
        editable: false,
        eventLimit: true,
        events: '/g2_test'
    });

    // Handle date selection
    // $('#calendar').on('select', function (start, end) {
    //     var date = moment(start).format('YYYY-MM-DD');
    //     $('#date').val(date);
    //     console.log("date"+date);
    //     //$('#showTime').val(date);

    //     $('#calendar').fullCalendar('unselect');
    // });
});