"ui";

let ui_colors = {
  background: "#303030",
  text: "#fdd835",
};

ui.statusBarColor(ui_colors.background);

ui.layout(
    <vertical bg="{{ui_colors.background}}">
      <text text="Lux Light Meter" textSize="48" textColor="{{ui_colors.text}}" padding="10 10 10 10"/>

      <horizontal gravity="center">
        <vertical padding="10 10 10 10" >
          <text text="min" textColor="{{ui_colors.text}}" textSize="16"/>
          <text id="light_min" textColor="{{ui_colors.text}}" textSize="24"/>
        </vertical>
        <vertical padding="10 10 10 10" >
          <text text="avg" textColor="{{ui_colors.text}}" textSize="16"/>
          <text id="light_avg" textColor="{{ui_colors.text}}" textSize="24" />
        </vertical>
        <vertical padding="10 10 10 10">
          <text text="max" textColor="{{ui_colors.text}}" textSize="16"/>
          <text id="light_max" textColor="{{ui_colors.text}}" textSize="24"/>
        </vertical>

      </horizontal>

      <text id="light" textColor="{{ui_colors.text}}" textSize="96dp" gravity="center" padding="10 10 10 20"/>
      <button id="reset" text="reset" textColor="{{ui_colors.background}}" bg="{{ui_colors.text}}"/>
    </vertical>
)

let light = 0;
let light_values = Array()

sensors.register("light", sensors.delay.ui).on("change", (event, l) => {
  light = l;
  ui.light.setText(util.format("%d", light));
});

setInterval(() => {
  light_values.push(light)

  ui.light_min.setText(util.format("%d", arrMinNum(light_values)));
  ui.light_avg.setText(util.format("%d", arrAverageNum(light_values)));
  ui.light_max.setText(util.format("%d", arrMaxNum(light_values)));
}, 500);

function arrMaxNum(arr){
    return Math.max.apply(null,arr);
}
function arrMinNum(arr){
    return Math.min.apply(null,arr);
}
function arrAverageNum(arr){
    var sum = eval(arr.join("+"));
    return ~~(sum/arr.length*100)/100;
}

ui.reset.click(() => {
  light_values = Array();
  ui.light.setText(util.format("%d", 0));
  ui.light_min.setText(util.format("%d", 0));
  ui.light_avg.setText(util.format("%d", 0));
  ui.light_max.setText(util.format("%d", 0));
});
