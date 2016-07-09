<div class="modal fade" id="modalCrudMensaje" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header" >
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4></span> Mensaje</h4>
        </div>
        <div class="modal-body" style="padding:40px 50px;">
            <form role="form">
                <div class="form-group">
                    <textarea class="form-control" id="mensajeActualiza" rows="3" ng-model = 'mensaje.descripcion' ></textarea>
                </div>
                <span class="form-help">%%200-mensaje.descripcion.length%% Caractere(s)</span>
                <button type="submit" class="btn btn-success btn-block" ng-click = 'actualizaMensaje()'>Actualiza</button>
            </form>
        </div>
        <div class="modal-footer">
        <button type="submit" class="btn btn-default btn-default " data-dismiss="modal"></span> Salir</button>
    </div>
</div>
</div>
</div>