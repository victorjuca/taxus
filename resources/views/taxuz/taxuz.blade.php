{!!Html::style('assets/css/jquerysctipttop.css')!!}

<style type="text/css">
#txtlzr {
text-align: center;
font-size: 85px;
width: auto; /* Ancho del Background */
height: 500px; /* Altura de Backgroud */
margin-left: 100px;
margin-top: 50px;
position: absolute;
top:0;
left:50;
right:50;
bottom:0;
margin: auto;
/**background: #83C24A;*/
}
</style>
{!!Html::script('assets/js/jquery_1.9.1.min.js')!!}
<div  ng-app="taxuzModule">
  <div ng-controller="taxuzController">
    <input type="hidden" name="" id="eventoid" value="{{$eventoid}}" ng-model = "eventoid">

        
        <div id="fullscreen">
                  <a href="#" class="requestfullscreen">Click to open it in fullscreen</a>
          <a href="#" class="exitfullscreen" style="display: none">Click to exit fullscreen</a>.</p>
           <button type="button" class="btn btn-success pull-lefth"  ng-click="siguiente()">Siguiente</button>
           <input type="hidden" name="_token" value="{{csrf_token()}}" id="token" ng-model="token"/>
        <div id="txtlzr">
        </div>
        </div>
        <script type="text/javascript">
          $(function() {
            // check native support
            $('#support').text($.fullscreen.isNativelySupported() ? 'supports' : 'doesn\'t support');
            // open in fullscreen
            $('#fullscreen .requestfullscreen').click(function() {            
              $('#fullscreen').fullscreen();
              return false;
            });
            // exit fullscreen
            $('#fullscreen .exitfullscreen').click(function() {
              $.fullscreen.exit();
              return false;
            });
            // document's event
            $(document).bind('fscreenchange', function(e, state, elem) {
              // if we currently in fullscreen mode
              if ($.fullscreen.isFullScreen()) {
                $('#fullscreen .requestfullscreen').hide();
                $('#fullscreen .exitfullscreen').show();
              } else {
                $('#fullscreen .requestfullscreen').show();
                $('#fullscreen .exitfullscreen').hide();
              }
              $('#state').text($.fullscreen.isFullScreen() ? '' : 'not');
            });
          });
        </script>
      </div>
    </div>


{!!Html::script('assets/js/jquery.fullscreen-0.4.1.min.js')!!}
{!!Html::script('app/lib/angular/angular.min.js')!!}
{!!Html::script('assets/js/textualizer.js')!!}
{!!Html::script('app/controller/taxuz.js')!!}
