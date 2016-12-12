var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;
//When clicking on control list items
$(".controls").on("click", "li", function(){
  //Deselect sibling elements
  $(this).siblings().removeClass("selected");
  //Select clicked element
  $(this).addClass("selected");
  //cache current color
  color = $(this).css("background-color");
})


//When new color is pressed
$(".addColor").click(function(){
  //Show color select or hide the color select
  changeColor();
  $("#colorSelect").show();

})

  //update the new color span
function chosenColor(){
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#red-span").text(r);
  $("#green-span").text(g);
  $("#blue-span").text(b);
  return "rgb(" + r + "," + g + "," + b + ")";
}

function changeColor(){
  $(".addColor").css("background-color", chosenColor);
}
//When color sliders change
$("input[type=range]").on("input", changeColor);

//When add color is pressed
$("#addNewColor").click(function(){
  //Append the color to the controls ul
  var $newColor = $("<li class='color'></li>");
  $(".addColor").before($newColor.css("background-color", chosenColor));
  //Select the new color
  $newColor.click();
  $("#colorSelect").hide();
});
//On mouse events on the canvas

$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  //Draw lines
  if(mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.stroke();
    lastEvent = e;
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
  $canvas.mouseup();
});
