<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
      <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Taxuz</title>
	<!-- BOOTSTRAP STYLES-->
    {!!Html::style('assets/css/bootstrap.css')!!}   
     <!-- FONTAWESOME STYLES-->
    {!!Html::style('assets/css/font-awesome.css')!!}   
    <!-- CUSTOM STYLES-->
    {!!Html::style('assets/css/custom.css')!!}   
     <!-- GOOGLE FONTS-->
</head>
<body>
    <div id="wrapper">
        <nav class="navbar navbar-default navbar-cls-top " role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">Victor Juarez</a> 
            </div>
  <div style="color: white;
padding: 15px 50px 5px 50px;
float: right;
font-size: 16px;"> Last access : 30 May 2014 &nbsp; <a href="#" class="btn btn-danger square-btn-adjust">Salir</a> </div>
        </nav>   
           <!-- /. NAV TOP  -->
                <nav class="navbar-default navbar-side" role="navigation">
            <div class="sidebar-collapse">
                <ul class="nav" id="main-menu">
				<li class="text-center">            
                    {!!HTML::image("assets/img/find_user.png",'' ,['class'=>'user-image img-responsive'])!!}
					</li>
				
					
                    <li>
                        <a  href="/evento"><i class="fa fa-dashboard fa-3x"></i> Evento</a>
                    </li>
                      <li>
                        <a  href="ui.html"><i class="fa fa-desktop fa-3x"></i> Palabras</a>
                    </li>
                    <li>
                        <a  href="tab-panel.html"><i class="fa fa-qrcode fa-3x"></i> Admin. Usuario</a>
                    </li>
						   <li  >
                        <a  href="chart.html"><i class="fa fa-bar-chart-o fa-3x"></i> Parámetros</a>
                    </li>	
					                   
                </ul>
               
            </div>
            
        </nav>  
        <!-- /. NAV SIDE  -->
        <div id="page-wrapper" >
            <div id="page-inner">
               @yield('content')
    </div>
             <!-- /. PAGE INNER  -->
            </div>
         <!-- /. PAGE WRAPPER  -->
        </div>
     <!-- /. WRAPPER  -->
    <!-- SCRIPTS -AT THE BOTOM TO REDUCE THE LOAD TIME-->
    <!-- JQUERY SCRIPTS -->
    {!!Html::script('assets/js/jquery-1.10.2.js')!!}
      <!-- BOOTSTRAP SCRIPTS -->
    {!!Html::script('assets/js/bootstrap.min.js')!!}
    <!-- METISMENU SCRIPTS -->
    {!!Html::script('assets/js/jquery.metisMenu.js')!!}
      <!-- CUSTOM SCRIPTS -->
    {!!Html::script('assets/js/custom.js')!!}
    
</body>
</html>
