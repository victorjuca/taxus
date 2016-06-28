        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header" >
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4></span> Evento</h4>
                    </div>
                    <div class="modal-body" style="padding:40px 50px;">
                        <form role="form" name = 'formEvento'>
                            <div class="form-group">
                                <label for="nombre">Clave</label>
                                <input type="text" class="form-control" id="clave" placeholder="Calve del Evento" ng-model = 'evento.clave'>
                            </div>
                            <div class="form-group">
                                <label for="nombre">Nombre</label>
                                <input type="text" class="form-control" id="nombre" placeholder="Nombre del Evento" ng-model = 'evento.nombre'>
                            </div>
          <div ng-class="estilo" ng-show="showmensaje">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>%%estado%%</strong> %%mensajes%%
          </div>                               
                            <button type="submit" class="btn btn-success btn-block" ng-click="guardarEvento()">%%nombreboton%%</button>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-default btn-default " data-dismiss="modal"></span> Salir</button>
                    </div>
                </div>
            </div>
        </div>