{!!Html::style('assets/css/textualizer.css')!!}
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<link href="http://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">
{!!Html::script('assets/js/textualizer.js')!!}
<style type="text/css">

#txtlzr {
text-align: center;
font-size: 40px;
width: auto;
height: 300px;
margin-left: 100px;
margin-top: 50px;
}
</style>
<div id="txtlzr">
	<p>Textualizer is a jQuery plug-in that allows you to transition through blurbs of text. </p>
	<p>Este es mi texto de prueba para que lo verifiques.</p>
	<p>Textualize: verb - to put into text, set down as concrete and unchanging.  Use Textualizer to transition through blurbs of text.</p>
	<p>Blurb: noun - a short summary or some words of praise accompanying a creative work.  A promotional description.</p>
	<p>JavaScript (abreviado comúnmente "JS") es un lenguaje de programación interpretado, dialecto del estándar ECMAScript. Se define como orientado a objetos,3</p>
</div>
  <script type="text/javascript">
  $(function() {
  var txt = $('#txtlzr');
  txt.textualizer();
  txt.textualizer('start');
  })
  </script>