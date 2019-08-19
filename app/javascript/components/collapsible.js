function collapsible = () => {
  $("#minimise").on("click", function(){
    $("#cards").removeClass("col-3");
    $("#cards").addClass("col-3");
    $(this).removeClass("col-3");
    $(this).addClass("col-3");
});
}

export { collapsible };
