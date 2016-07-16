@extends('layouts.principal')
@section('content')
<div  ng-app="usuarioModule">
    <div ng-controller="crearUsuarioController">
        <div class="row">
            <div class="col-md-12">
                <!-- Form Elements -->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Form Element Examples
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-8">
                                <h3>Datos del Usuario</h3>
                                <form role="form">
                                    <div class="form-group">
                                        <label>Nombre</label>
                                        <input type="text" class="form-control" ng-model="usuario.nombre"/>
                                    </div>
                                    <div class="form-group">
                                        <label>Correo</label>
                                        <input type="text" class="form-control" ng-model="usuario.correo"/>
                                    </div>                                    
                                    <div class="form-group">
                                        <label>Contraseña</label>
                                        <input type="password" class="form-control" ng-model="usuario.contrasena"/>
                                    </div>                                    
                                    <div class="form-group">
                                        <label>Reafirma Contraseña</label>
                                        <input type="password" class="form-control" ng-model="usuario.confirContrasena"/>
                                    </div>  
                                    <button type="submit" class="btn btn-default">Guardar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
{!!Html::script('app/lib/angular/angular.min.js')!!}
{!!Html::script('app/controller/usuario.js')!!}
@stop