$(function () {
  // Initialize time picker
  $('#timePicker').datetimepicker({
        format: 'LT',
        datepicker:false,
        stepping: 30,
        enabledHours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
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
          start: '08:00', // a start time (08am)
          end: '18:00', // End time (6pm)
          dow: [ 1, 2, 3, 4, 5 ], // Monday - Friday
        },
        select: function (start, end,allDay) {
            var check =$.fullCalendar.formatDate(start, "YYYY-MM-DD");
            var today= moment().format('YYYY-MM-DD');
            if(check < today){
                alert("You Can't Select Past Date");
            }
            else{
                $('#date').val(check);
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
            } 
            else {
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
        events: []
    });
});