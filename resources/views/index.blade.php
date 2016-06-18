@extends('layouts.principal')
@section('content')
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<div  ng-app="eventoModule">
    <div ng-controller="eventoCRUDController">
        <div class="row">
            <div class="col-md-12">
                <h2>Evento</h2>
                <h5>Crea tu nuevo evento. </h5>
                
            </div>
        </div>
        <!-- /. RO W  -->
        <!--    Hover Rows  -->
        <div class="row">
            <div class="containter">
                <button type="button" class="btn btn-success btn-circle pull-right "  ng-click="lanzamodal()"><i class="fa fa-check"/></i>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                Lista de Eventos
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
                                <td><a class="btn btn-default" href="http://www.w3schools.com/html/">Admin</a></td>
                                <td><a class="btn btn-info" href="http://www.w3schools.com/html/" target="_blank">Ver</a></td>
                                <td>
                                    <a href="#" class="btn btn-primary" ng-click="lanzamodal()">Actualizar</a>
                                    <a href="#" class="btn btn-danger">Eliminar</a>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- End  Hover Rows  -->
        <!-- Modal -->
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
                
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header" >
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4></span> Evento</h4>
                </div>
                <div class="modal-body" style="padding:40px 50px;">
                    <form role="form">
                        <div class="form-group">
                            <label for="nombre">Clave</label>
                            <input type="text" class="form-control" id="clave" placeholder="Calve del Evento">
                        </div>                    
                        <div class="form-group">
                            <label for="nombre">Nombre</label>
                            <input type="text" class="form-control" id="nombre" placeholder="Nombre del Evento">
                        </div>
                        <button type="submit" class="btn btn-success btn-block">Guardar</button>
                    </form>
                </div>
                <div class="modal-footer">
                <button type="submit" class="btn btn-default btn-default " data-dismiss="modal"></span> Salir</button>
                
            </div>
        </div>
        
    </div>
</div>
</div>
</div>
{!!Html::script('app/lib/angular/angular.min.js')!!}
{!!Html::script('app/controller/evento.js')!!}
@stop