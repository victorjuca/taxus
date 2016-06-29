<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});
Route::resource('evento', 'EventoController');
Route::get('login', 'UsuarioController@vistalogin');
Route::get('crearusuario', 'UsuarioController@vistacrearusuario');
Route::get('getallevento', 'EventoController@allEvento');
