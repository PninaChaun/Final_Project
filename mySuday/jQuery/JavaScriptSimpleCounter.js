

import $ from "jquery";

const rootApp = document.getElementById("root");
rootApp.innerHTML = `<div id="mainArea">
  button count: <span class="counter">0</span>
  <button id="mainButton">Increase</button>
</div>`;

const $counter = $(".counter"),
  $button = $("#mainButton");

$button.click(() => {
  const oldValue = parseInt($counter.text());
  $counter.text(oldValue + 1);
});