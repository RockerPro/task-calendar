'use strict';
var base_url=location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
var app = angular.module('app', []);
    app.controller('CalendarController', function($scope, $http)
    {
           
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
            // scheduler.config.fix_tab_position = false;
            scheduler.config.details_on_create=true;
            scheduler.config.details_on_dblclick=true;
            scheduler.config.xml_date="%Y-%m-%d";


            //===============
            //Configuration
            //===============
            // scheduler.templates.event_class = function(start, end, event) {
            //     event.color = (event.important) ? "red" : "";
            //     return "";
            // };

            var sections = [
                {key: 1, label: "James Smith"},
                {key: 2, label: "John Williams"},
                {key: 3, label: "David Miller"},
                {key: 4, label: "Linda Brown"}
            ];

          
             
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
                render:"bar",
                round_position: true
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
            
            var block_id = null; 
        var startDate = new Date(); 
        scheduler.attachEvent("onBeforeViewChange", function(old_mode,old_date,mode,date){
            if(block_id)
            scheduler.deleteMarkedTimespan(block_id);   
            var from = scheduler.date[mode + "_start"](new Date(date));
            var to = new Date(Math.min(new Date(startDate), + scheduler.date.add(from, 0, mode)));
            // scheduler.config.drag_move = false;
            block_id = scheduler.addMarkedTimespan({
              start_date: from, 
              end_date:to,
              type:"dhx_time_block"
            });
              
            return true;
        });
        startDate.setDate(startDate.getDate()-1); 
        
        scheduler.config.limit_start = new Date(startDate);
        scheduler.config.limit_end = new Date(9999, 1,1);
        setInterval(function(){     
           scheduler.config.limit_start = new Date(startDate);
        }, 1000*60);

       
            scheduler.parse([
               { start_date: "2016-05-26", end_date: "2016-05-26", ruta: "lol", text:"Task A-12458", section_id:1},
            { start_date: "2016-05-26", end_date: "2016-05-26", ruta: "lol2", text:"Task A-89411", section_id:1},
            { start_date: "2016-05-26", end_date: "2016-05-26", ruta: "lol3", text:"Task A-64168", section_id:1},
            { start_date: "2016-05-26", end_date: "2016-05-26", ruta: "lol4", text:"Task A-46598", section_id:1},
            { start_date: "2016-05-27", end_date: "2016-05-28", ruta: "lol5", text:"tarea xddd", section_id:1},
            
            { start_date: "2016-05-26", end_date: "2016-05-26", ruta: "lol6", text:"Task B-48865", section_id:2},
            { start_date: "2016-05-26", end_date: "2016-05-26", ruta: "lol7", text:"Task B-44864", section_id:2},
            { start_date: "2016-05-26", end_date: "2016-05-26", ruta: "lol8", text:"Task B-46558", section_id:2},
            { start_date: "2016-05-26", end_date: "2016-05-26", ruta: "lol9", text:"Task B-45564", section_id:2},
            
            { start_date: "2016-05-26", end_date: "2016-05-26", ruta: "lol10", text:"Task C-32421", section_id:3},
            { start_date: "2016-05-26", end_date: "2016-05-26", ruta: "lol11", text:"Task C-14244", section_id:3},
            
            { start_date: "2016-05-26", end_date: "2016-05-26", ruta: "lol12", text:"Task D-52688", section_id:4},
            { start_date: "2016-05-26", end_date: "2016-05-26", ruta: "lol13", text:"Task D-46588", section_id:4},
            { start_date: "2016-05-31", end_date: "2016-05-31", ruta: "lol14", text:"lool", section_id:4}
            ], "json");

 
         var html = function(id) { return document.getElementById(id); }; //just a helper
        scheduler.attachEvent("onDblClick", function (id, e){
               var ev = scheduler.getEvent(id);
               var star_date_ev = ev.start_date;
               var today = new Date();
               var today_f = today.toISOString().substring(0, 10);
               var start_date_f = star_date_ev.toISOString().substring(0, 10);
               if(start_date_f < today_f){
                    scheduler.startLightbox(id, html("my_form"));
                    html("task").innerHTML  = ev.text;
                    html("ruta").innerHTML  = ev.ruta;    
                    html("fecha").innerHTML  = start_date_f;       
               }
               return true;               
          });
        
        $scope.close_form = function () {
            scheduler.endLightbox(false, html("my_form"));
        }
    }
    $scope.init();
    });