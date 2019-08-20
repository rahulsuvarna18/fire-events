const collapsible = () => {
  $("#hide_cards").on("click", function(){
    $("#cards").hide();
    $("#hide_cards").hide();
    $("#show_cards").show();
});
  $("#show_cards").on("click", function(){
    $("#cards").show();
    $("#hide_cards").show();
    $("#show_cards").hide();
});
}

export { collapsible };
