@extends('layouts.principal')
@section('content')
<div  ng-app="eventoModule">
    <div ng-controller="eventoAdmonController">
        <input type="hidden" name="_token" value="{{csrf_token()}}" id="token" ng-model="token"/>
        <div class="col-md-12  ">
            <div class="panel ">
                <div class="main-temp-back">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-xs-6"> <i class="fa fa-cloud fa-3x"></i> Lista de Eventos </div>
                            <div class="col-xs-6">
                                <div class="text-temp"> 10° </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class=" col-md-4">
                    <select  class="form-control" ng-change="cargaMensajeEvento(evento.id)" ng-model="evento" ng-options="
                        evento as evento.nombre for evento in levento" >
                        <option value="">------------</option>
                    </select>
                </div>
                <div class="col-md-8">
                    <button type="button" class="btn btn-success pull-lefth"  ng-click="lanzamodal()">Agregar</button>
                </div>
            </div>
            <br/>
            <div class="row">
                <div class="col-md-4">
                    <div class="panel panel-back noti-box">
                        
                        <div>
                            <div class="btn-group pull-right">
                                <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-chevron-down"></i>
                                </button>
                                <ul class="dropdown-menu slidedown">
                                    <li>
                                        <a ng-click='cargaMensajeEvento(evento.id)'>
                                            <i class="fa fa-shield fa-rotate-270"></i> Refrescar
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/taxuz/%%evento.id%%" target="_blank" >
                                            <i class="fa fa-flag "></i> Lanzar
                                        </a>
                                    </li>
                                    <li class="divider"></li>
                                    <li>
                                        <a ng-click='modalActualizaEvento(evento)'>
                                            <i class="fa fa-refresh fa-fw"></i>Actualizar
                                        </a>
                                    </li>
                                    <li>
                                        <a ng-click='eliminaEvento()'>
                                            <i class="fa fa-check-circle fa-fw"></i>Eliminar
                                        </a>
                                    </li>
                                    <li>
                                        <a ng-click='reiniciaContMensaje(evento.id)'>
                                            <i class="fa fa-retweet fa-fw"></i> Reinicia Contador
                                        </a>
                                    </li>                                    
                                </ul>
                            </div>
                        </div>
                        <br/>
                        <span class="icon-box bg-color-green set-icon">
                            <i class="fa fa-desktop"></i>
                        </span>
                        <div class="text-box" >
                            <p class="main-text">%%evento.nombre%%</p>
                            <p class="text-muted">25 mensajes mostrados</p>
                            <p class="">Clave del Evento: %%evento.clave%%</p>
                            <form role="form">
                                <div class="form-group" name = 'formAgregarMensaje'>
                                    <textarea class="form-control" id="mensaje" rows="3" ng-model = 'mensaje.descripcion'
                                    ></textarea>
                                     <span class="form-help">%%200-mensaje.descripcion.length%%        
   Characters</span>
                                </div>
                                <button type="submit" class="btn btn-success btn-block" ng-click = 'agregaMensaje(mensaje.descripcion,evento.id,1)'>Agregar</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 ">
                    <div class="chat-panel panel panel-default chat-boder chat-panel-head" >
                        <div class="panel-heading">
                            <i class="fa fa-comments fa-fw"></i>
                            Mensajes
                        </div>
                        <div class="panel-body">
                            <ul class="chat-box">
                                <div ng-repeat="mensaje in lmensaje ">
                                    
                                    <li class="left clearfix">
                                        <span class="chat-img pull-left">
                                            <img src="assets/img/1.png" alt="User" class="img-circle" />
                                        </span>
                                        <div class="corhat-body">
                                            <strong >Vico Show</strong>
                                            <small class="pull-right text-muted">
                                            <i class="fa fa-clock-o fa-fw"></i>%%mensaje.fecha%% --- %%mensaje.hora%%
                                            </small>
                                            <p>
                                                %%mensaje.descripcion%%
                                            </p>
                                            <a href="" ng-click="modalActualizaMensaje(mensaje)"><i class="fa fa-pencil fa-fw " > </i> Edit</a>
                                            <a href="" ng-click="eliminaMensaje(mensaje)"><i class="fa fa-trash-o fa-fw " ></i> Delete</a>
                                            <small class="pull-right text-muted">
                                                <i class="fa fa-eye fa-fw"></i> Visto %%mensaje.visto%%
                                                
                                            </small>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @include('evento.formevento')
        @include('evento.formactualizamensaje')
        <div class="modal fade" id="modalEliminarMensaje" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        Eliminar
                    </div>
                    <div class="modal-body">
                        ¿Estas seguro de eliminar el Mensaje?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                        <a href="#" class="btn btn-danger danger">Eliminar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{!!Html::script('app/lib/angular/angular.min.js')!!}
{!!Html::script('app/controller/evento.js')!!}
@stop