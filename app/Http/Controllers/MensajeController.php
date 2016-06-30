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

        $mensaje->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($eventoid)
    {
        $lmensaje = DB::table('mensaje')->where('eventoid', '>=', $eventoid)->orderBy('hora','desc')->get();

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
