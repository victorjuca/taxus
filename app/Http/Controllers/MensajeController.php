<?php

namespace Taxuz\Http\Controllers;

use Illuminate\Http\Request;

use Taxuz\Http\Requests;
use Taxuz\Http\Controllers\Controller;
use Taxuz\Mensaje;
use DB;

class MensajeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $mensaje = new Mensaje();

        $mensaje->descripcion = $request->input('descripcion');
        $mensaje->fecha = $request->input('fecha');
        $mensaje->hora = $request->input('hora');
        $mensaje->eventoid = $request->input('eventoid');

        $msj = "";
        $estado = 0;

        $insertado = MensajeController::validaMensajeInsertado( $mensaje->eventoid,$mensaje->descripcion);

        if($insertado){
            $msj = "Ya se registro ese mensaje con anteoridad.";
            $estado = 1;
        }else{
            $msj = "Se registro correctamente el Mensaje.";
            $mensaje->save();    
        }

         $retorno = array(
            "estado"  => $estado,
            "descripcion" => $msj,
            "id" => 0        
            );        

        return compact("retorno");
    }
    /**
     * Store a newly update resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function validaMensajeInsertado($eventoid, $descripcion){
        $lmensaje = DB::table('mensaje')
            ->where('eventoid', '=', $eventoid)
            ->where('descripcion', '=', $descripcion)
            ->get();    

        if(count($lmensaje)>0){
            return true;
        }else{
            return false;
        }
    }    

    public function contvistomensaje(Request $request){

        
        $eventoid = $request->input('eventoid');
        $ldescripcion = $request->input('lmensaje');
        $fecha  = $request->input('fecha');
        $hora = $request->input('hora');

         

        for ($i = 0; $i <= count($ldescripcion); $i++) {
            $descripcion = $ldescripcion[0];

            $lmensajebd = DB::table('mensaje')
                ->where('eventoid', '=', $eventoid)
                ->where('descripcion', '=', $descripcion)
                ->get();    
            for ($j = 0; $j <= count($lmensajebd); $j++) {
                $mensaje = Mensaje::find($lmensajebd[0]->id);
                $mensaje->visto = $mensaje->visto + 1;
                $mensaje->save();
            }         
            
            
        }        

        $lmensajenuevo = DB::table('mensaje')
            ->where('eventoid', '=', $eventoid)
            ->orderBy('vistas')
            ->get();   
        return compact('lmensajenuevo');  
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($eventoid)
    {
        $lmensaje = DB::table('mensaje')->where('eventoid', '=', $eventoid)->orderBy('hora','desc')->get();

        return $lmensaje;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $mensaje = Mensaje::find($id);

        $mensaje->descripcion = $request->input('descripcion');
        $mensaje->fecha = $request->input('fecha');
        $mensaje->hora = $request->input('hora');
        $mensaje->eventoid = $request->input('eventoid');

        $insertado = MensajeController::validaMensajeInsertado( $mensaje->eventoid,$mensaje->descripcion);

        $msj = "";
        $estado = 0;

        if($insertado){
            $msj = "Ya se registro ese mensaje con anteoridad.";
            $estado = 1;
        }else{
            $msj = "Se registro correctamente el Mensaje.";
            $mensaje->save();    
        }


         $retorno = json_encode(array(
            "estado"  => $estado,
            "descripcion" => $msj,
            "id" => 0        
            ));        

         return compact('retorno');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $mensaje = Mensaje::find($id);
        $mensaje->delete();
    }
}
