$(function () {
    // Initialize time picker
    $('#timePk').datetimepicker({
        format: 'LT',
        datepicker:false,
        closeOnTime: true,
        stepping: 30,
        enabledHours: [9, 10, 11, 12, 13, 14],
    });
    // $('.dropdown-toggle').dropdown('toggle');
    // Initialize calendar
    $('#calendarPK').fullCalendar({
        selectable: true,
        contentHeight: 500,
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
        editable: true,
        eventLimit: true,
        events:{
            url: '/getAppointments',
            type: 'GET',
            success: function(data) {
                var events=[];
                data.forEach(function(appointment){
                    events.push({
                        id: appointment.id,
                        title: appointment.time,
                        start: appointment.date
                    });
                });
            }
        } ,
        eventClick: function (event, jsEvent, view) {
            var eventId = event.id;
            console.log("eventId"+eventId);
            $.ajax({
            url: '/events/' + eventId,
            type: 'GET',
            success: function(data) {
                console.log("data"+data._id);
                $('#editAppointment').removeAttr('hidden');
               $('#appointmentId').val(data._id);
               $('#time').val(data.time);
            }
            });
            console.log("event"+ event.id);
            console.log("event"+jsEvent);
            $('.cont').show().data('event',event);
        },
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