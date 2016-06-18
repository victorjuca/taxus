@extends('layouts.principal')
@section('content')
<div  ng-app="eventoModule">
	<div ng-controller="eventoAdmonController">
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
				<div class="col-md-4">
					<div class="panel panel-back noti-box">
						<a href="#" class="btn btn-primary btn-xs btn-block">Ver</a>
						<br/>	
						<span class="icon-box bg-color-green set-icon">
							<i class="fa fa-desktop"></i>
						</span>
						<div class="text-box" >
							<p class="main-text">Boda de Dolores</p>
							<p class="text-muted">25 mensajes mostrados</p>
							<textarea class="form-control" rows="3"></textarea>
							<br/>
							<a href="#" class="btn btn-success btn-xs">Agregar</a>
						</div>
					</div>
					<div class="panel panel-back noti-box">
						<span class="icon-box bg-color-green set-icon">
							<i class="fa fa-desktop"></i>
						</span>
						<div class="text-box" >
							<p class="main-text">Display</p>
							<p class="text-muted">Looking Good</p>
						</div>
					</div>
				</div>
				<div class="col-md-8 ">
					
					<div class="chat-panel panel panel-default chat-boder chat-panel-head" >
						<div class="panel-heading">
							<i class="fa fa-comments fa-fw"></i>
							Mensajes
							<div class="btn-group pull-right">
								<button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
								<i class="fa fa-chevron-down"></i>
								</button>
								<ul class="dropdown-menu slidedown">
									<li>
										<a href="#">
											<i class="fa fa-refresh fa-fw"></i>Refrescar
										</a>
									</li>
									<li>
										<a href="#">
											<i class="fa fa-check-circle fa-fw"></i>Eliminar
										</a>
									</li>
									<li>
										<a href="#">
											<i class="fa fa-times fa-fw"></i>Actualizar
										</a>
									</li>
									<li>
										<a href="#">
											<i class="fa fa-clock-o fa-fw"></i>Enviar Mensajes
										</a>
									</li>
									<li class="divider"></li>
									<li>
										<a href="#">
											<i class="fa fa-clock-o fa-fw"></i>Desactivar
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div class="panel-body">
							<ul class="chat-box">
								<li class="left clearfix">
									<span class="chat-img pull-left">
										<img src="assets/img/1.png" alt="User" class="img-circle" />
									</span>
									<div class="corhat-body">
										<strong >Jack Sparrow</strong>
										<small class="pull-right text-muted">
										<i class="fa fa-clock-o fa-fw"></i>12 mins ago del 2016-12-02
										</small>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.
										</p>
										<br/>
										<a href="#" class="btn btn-primary btn-xs">Actulizar</a>
										<a href="#" class="btn btn-danger btn-xs">Eliminar</a>
									</div>
								</li>
							</ul>
						</div>
					</div>
					
				</div>
				
			</div>
		</div>
	</div>
	{!!Html::script('app/lib/angular/angular.min.js')!!}
	{!!Html::script('app/controller/evento.js')!!}
	@stop