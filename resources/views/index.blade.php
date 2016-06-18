@extends('layouts.principal')
@section('content')
                <div class="row">
                    <div class="col-md-12">
                     <h2>Evento</h2>   
                        <h5>Crea tu nuevo evento. </h5>
                       
                    </div>
                </div>
                 <!-- /. RO W  -->
                     <!--    Hover Rows  -->

                     <div class="containter">
                     	<button type="button" class="btn btn-default btn-circle"><i class="fa fa-check"></i>
                     </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Hover Rows
                        </div>
                        
                        <div class="panel-body">
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1456</td>
                                            <td>XV AñosAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</td>
                                            <td><a href="http://www.w3schools.com/html/">Admin</a></td>                                           
                                            <td><a href="http://www.w3schools.com/html/" target="_blank">Ver</a></td>                                           
                                            <td>
                    <a href="#" class="btn btn-primary">Actualizar</a>
                    <a href="#" class="btn btn-danger">Eliminar</a>                                           	
                                            </td>                                            
                                        </tr>
                                                                   
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- End  Hover Rows  -->

{!!Html::script('app/lib/angular/angular.min.js')!!}                    
{!!Html::script('app/controller/evento.js')!!}
@stop               