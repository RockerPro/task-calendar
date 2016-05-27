'use strict';
var base_url=location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
var app = angular.module('app', []);
    app.controller('CalendarController', function($scope, $http)
    {
        //  moment().format();

          
        //   var date = moment();
          
        //   var  begin2= moment(date).endOf('day');
        //   if(parseInt(begin2.format('D')) == 1){
        //     var  begin = moment(date).endOf('week').isoWeekday(1);
        //     var pos = (parseInt(begin2.format('D')) - parseInt(begin.format('D')))-5;
        // }else if(parseInt(begin2.format('D')) > 1 && parseInt(begin2.format('D')) < 9){
        //     var  begin = moment(date).startOf('week').isoWeekday(1);
        //     var pos = (parseInt(begin.format('D')) - parseInt(begin2.format('D')));
        // }
        // else if(parseInt(begin2.format('D')) > 8 && parseInt(begin2.format('D')) < 15){
        //     var  begin = moment(date).endOf('week').isoWeekday(1);
        //     var pos = (parseInt(begin.format('D')) - parseInt(begin2.format('D')));
        // }
        //   console.log(parseInt(begin.format('D')));
        //   console.log(parseInt(begin2.format('D')));
        //   console.log(pos);
           
        $scope.modSchedHeight = function (){
            var headHeight = 100;
            var sch = document.getElementById("scheduler_here");
            sch.style.height = (parseInt(document.body.offsetHeight)-headHeight)+"px";
        }
        $scope.init = function() {
            $scope.modSchedHeight();
            window.resizeTo(950,700);
            scheduler.locale.labels.timeline_tab = "Timeline";
            scheduler.locale.labels.section_custom = "Section";
            scheduler.locale.labels.section_important = "Important";
            scheduler.config.fix_tab_position = false;
            scheduler.config.details_on_create=true;
            scheduler.config.details_on_dblclick=true;
            scheduler.config.xml_date="%Y-%m-%d";

            //===============
            //Configuration
            //===============
            scheduler.templates.event_class = function(start, end, event) {
                event.color = (event.important) ? "red" : "";
                return "";
            };

            var sections = [
                {key: 1, label: "James Smith"},
                {key: 2, label: "John Williams"},
                {key: 3, label: "David Miller"},
                {key: 4, label: "Linda Brown"}
            ];

            var basicSort = function(a, b) {
                if (+a.start_date == +b.start_date) {
                    return a.id > b.id ? 1 : -1;
                }
                return a.start_date > b.start_date ? 1 : -1;
            };
            var prioritySort = function(a, b) {
                // here we can define sorting logic, what event should be displayed at the top
                if (a.important && !b.important) {
                    // display a before b
                    return -1;
                } else {
                    if (!a.important && b.important) {
                        // display a after b
                        return 1;
                    } else {
                        return basicSort(a, b);
                    }
                }
            };

            // this function is not universal and should be changed depending on your timeline configuration
            // var timeframeSort = function(a, b) {
            //     a_timeframe_start = scheduler.date.date_part(new Date(a.start_date));
            //     a_timeframe_end = scheduler.date.date_part(new Date(a.end_date));
            //     if (+a.end_date != +a_timeframe_end) {
            //         a_timeframe_end = scheduler.date.add(a_timeframe_end, 1, "day");
            //     }

            //     b_timeframe_start = scheduler.date.date_part(new Date(b.start_date));

            //     if (a_timeframe_start < b.end_date && a_timeframe_end > b.start_date && +a_timeframe_start == +b_timeframe_start) {
            //         return prioritySort(a, b);
            //     } else {
            //         return (a_timeframe_start < b_timeframe_start) ? -1 : 1;
            //     }
            // };


            scheduler.createTimelineView({
                name:   "timeline",
                x_unit: "day",
                x_date: "%d %l",
                x_step: 1,
                x_size: 7,
                x_start: 1,
                x_length: 7,
                y_unit: sections,
                y_property: "section_id",
                render:"bar"
            });
            // Working week
            scheduler.date.timeline_start = scheduler.date.week_start;
            scheduler.date.add_timeline = function(date, step, something) {
                return scheduler.date.add(date, step * 7, "day");
            };

            //===============
            //Data loading
            //===============
            scheduler.config.lightbox.sections=[    
            {name:"description", height:130, map_to:"text", type:"textarea" , focus:true},
            {name:"custom", height:23, type:"select", options:sections, map_to:"section_id" },
            {name:"time", height:72, type:"time", map_to:"auto"}
        ]

            scheduler.init('scheduler_here', new Date(), "timeline");
            scheduler.parse([
               { start_date: "2016-05-26", end_date: "2016-05-26", text:"Task A-12458", section_id:1},
            { start_date: "2016-05-26", end_date: "2016-05-26", text:"Task A-89411", section_id:1},
            { start_date: "2016-05-26", end_date: "2016-05-26", text:"Task A-64168", section_id:1},
            { start_date: "2016-05-26", end_date: "2016-05-26", text:"Task A-46598", section_id:1},
            { start_date: "2016-05-27", end_date: "2016-05-28", text:"tarea xddd", section_id:1},
            
            { start_date: "2016-05-26", end_date: "2016-05-26", text:"Task B-48865", section_id:2},
            { start_date: "2016-05-26", end_date: "2016-05-26", text:"Task B-44864", section_id:2},
            { start_date: "2016-05-26", end_date: "2016-05-26", text:"Task B-46558", section_id:2},
            { start_date: "2016-05-26", end_date: "2016-05-26", text:"Task B-45564", section_id:2},
            
            { start_date: "2016-05-26", end_date: "2016-05-26", text:"Task C-32421", section_id:3},
            { start_date: "2016-05-26", end_date: "2016-05-26", text:"Task C-14244", section_id:3},
            
            { start_date: "2016-05-26", end_date: "2016-05-26", text:"Task D-52688", section_id:4},
            { start_date: "2016-05-26", end_date: "2016-05-26", text:"Task D-46588", section_id:4},
            { start_date: "2016-05-26", end_date: "2016-05-26", text:"Task D-12458", section_id:4}
            ], "json");
    }
    $scope.init();
    });