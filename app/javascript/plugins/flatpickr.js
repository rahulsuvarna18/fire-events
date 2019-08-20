import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"

const datepickr = () => {
  $("#dropdownMenuButton").flatpickr({mode: "range"});
  var element = document.getElementById('dropdownMenuButton');
  const date = flatpickr(element, {
    mode: "range"
});
}

export {datepickr}
