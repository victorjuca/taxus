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

        $lmensaje = DB::table('mensaje')
            ->where('eventoid', '=', $mensaje->eventoid)
            ->where('descripcion', '=', $mensaje->descripcion)
            ->get();    



        $msj = "";
        $estado = 0;
        if(count($lmensaje)>0){
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

    public function contvistomensaje(Request $request){

        
        $eventoid = $request->input('eventoid');
        $descripcion = $request->input('descripcion');
        $hora = $request->input('hora');
        $fecha = $request->input('fecha');

        $lmensaje = DB::table('mensaje')
            ->where('eventoid', '=', $eventoid)
            ->where('descripcion', '=', $descripcion)
            ->get();

        for ($i = 0; $i <= count($lmensaje); $i++) {



            $mensaje = $lmensaje[$i];
            $mensaje->visto = ($mensaje->visto + 1) ;
            $mensaje->save();
        }        

        $lmensaje = DB::table('mensaje')
            ->where('eventoid', '=', $eventoid)
            ->where('descripcion', '=', $descripcion)
            ->where('fecha', '>', $fecha)
            ->where('hora', '>', $hora)
            ->get();          
        return compact('lmensaje');  
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

        $mensaje->save();        
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
