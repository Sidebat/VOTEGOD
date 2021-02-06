const run = () => {

   const btnArr = [...document.getElementsByClassName('option')];

   const txtArr = [...document.getElementsByClassName('results')];

   let chartCvs = document.getElementById('r-chart')


   let resultA = 0
   let resultB = 0
   let resultC = 0

   const clickableBtns = () => {
      return btnArr.map(btn => {
         return btn.addEventListener('click', () => updateVote(btn.id.charAt(0)))
      })
   }




   const updateVote = (choice) => {

      if (choice === 'a') resultA++
      if (choice === 'b') resultA++
      if (choice === 'c') resultA++

      txtArr.map(txt => {
         let ch = txt.id.charAt(0)
         if (ch === 'a') return txt.innerHTML = resultA
         if (ch === 'b') return txt.innerHTML = resultB
         if (ch === 'c') return txt.innerHTML = resultC
      })

      newChart.data.datasets[0].data = [resultA]
      newChart.data.datasets[1].data = [resultB]
      newChart.data.datasets[2].data = [resultC]
      newChart.update()
   }

   const newChart = new Chart(chartCvs, {
      type: 'bar',
      data: {
         datasets: [{
            maxBarThickness: 70,
            label: 'Nixon',
            data: [resultA],
            backgroundColor: ['lightblue'],
            borderColor: ['gray'],
            borderWidth: 1
         },
         {
            maxBarThickness: 70,
            label: 'Obama',
            data: [resultB],
            backgroundColor: ['#DB504A'],
            borderColor: ['gray'],
            borderWidth: 1
         },
         {
            maxBarThickness: 70,
            label: 'Kanye East',
            data: [resultC],
            backgroundColor: ['#E3B505'],
            borderColor: ['gray'],
            borderWidth: 1
         }
         ]
      },
      options: {
         title: {
            display: true,
            text: ["Results"]
         },

         tooltips: { enabled: false },
         scales: {
            yAxes: [{
               ticks: {
                  display: true,
                  beginAtZero: true
               }
            }]
         }
      }
   });

   clickableBtns()
}
run()





function getRgba(string) {
   if (!string) {
      return;
   }
   var abbr = /^#([a-fA-F0-9]{3,4})$/i,
      hex = /^#([a-fA-F0-9]{6}([a-fA-F0-9]{2})?)$/i,
      rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
      per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
      keyword = /(\w+)/;

   var rgb = [0, 0, 0],
      a = 1,
      match = string.match(abbr),
      hexAlpha = "";
   if (match) {
      match = match[1];
      hexAlpha = match[3];
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match[i] + match[i], 16);
      }
      if (hexAlpha) {
         a = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
      }
   }
   else if (match = string.match(hex)) {
      hexAlpha = match[2];
      match = match[1];
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
      }
      if (hexAlpha) {
         a = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
      }
   }
   else if (match = string.match(rgba)) {
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = parseInt(match[i + 1]);
      }
      a = parseFloat(match[4]);
   }
   else if (match = string.match(per)) {
      for (var i = 0; i < rgb.length; i++) {
         rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
      }
      a = parseFloat(match[4]);
   }
   else if (match = string.match(keyword)) {
      if (match[1] == "transparent") {
         return [0, 0, 0, 0];
      }
      rgb = colorNames[match[1]];
      if (!rgb) {
         return;
      }
   }

   for (var i = 0; i < rgb.length; i++) {
      rgb[i] = scale(rgb[i], 0, 255);
   }
   if (!a && a != 0) {
      a = 1;
   }
   else {
      a = scale(a, 0, 1);
   }
   rgb[3] = a;
   return rgb;
}

function getHsla(string) {
   if (!string) {
      return;
   }
   var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
   var match = string.match(hsl);
   if (match) {
      var alpha = parseFloat(match[4]);
      var h = scale(parseInt(match[1]), 0, 360),
         s = scale(parseFloat(match[2]), 0, 100),
         l = scale(parseFloat(match[3]), 0, 100),
         a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, s, l, a];
   }
}

function getHwb(string) {
   if (!string) {
      return;
   }
   var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
   var match = string.match(hwb);
   if (match) {
      var alpha = parseFloat(match[4]);
      var h = scale(parseInt(match[1]), 0, 360),
         w = scale(parseFloat(match[2]), 0, 100),
         b = scale(parseFloat(match[3]), 0, 100),
         a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, w, b, a];
   }
}

function getRgb(string) {
   var rgba = getRgba(string);
   return rgba && rgba.slice(0, 3);
}

function getHsl(string) {
   var hsla = getHsla(string);
   return hsla && hsla.slice(0, 3);
}

function getAlpha(string) {
   var vals = getRgba(string);
   if (vals) {
      return vals[3];
   }
   else if (vals = getHsla(string)) {
      return vals[3];
   }
   else if (vals = getHwb(string)) {
      return vals[3];
   }
}

function hexString(rgba, a) {
   var a = (a !== undefined && rgba.length === 3) ? a : rgba[3];
   return "#" + hexDouble(rgba[0])
      + hexDouble(rgba[1])
      + hexDouble(rgba[2])
      + (
         (a >= 0 && a < 1)
            ? hexDouble(Math.round(a * 255))
            : ""
      );
}

function rgbString(rgba, alpha) {
   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
      return rgbaString(rgba, alpha);
   }
   return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
}

function rgbaString(rgba, alpha) {
   if (alpha === undefined) {
      alpha = (rgba[3] !== undefined ? rgba[3] : 1);
   }
   return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2]
      + ", " + alpha + ")";
}

function percentString(rgba, alpha) {
   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
      return percentaString(rgba, alpha);
   }
   var r = Math.round(rgba[0] / 255 * 100),
      g = Math.round(rgba[1] / 255 * 100),
      b = Math.round(rgba[2] / 255 * 100);

   return "rgb(" + r + "%, " + g + "%, " + b + "%)";
}

function percentaString(rgba, alpha) {
   var r = Math.round(rgba[0] / 255 * 100),
      g = Math.round(rgba[1] / 255 * 100),
      b = Math.round(rgba[2] / 255 * 100);
   return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
}

function hslString(hsla, alpha) {
   if (alpha < 1 || (hsla[3] && hsla[3] < 1)) {
      return hslaString(hsla, alpha);
   }
   return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
}

function hslaString(hsla, alpha) {
   if (alpha === undefined) {
      alpha = (hsla[3] !== undefined ? hsla[3] : 1);
   }
   return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, "
      + alpha + ")";
}
function hwbString(hwb, alpha) {
   if (alpha === undefined) {
      alpha = (hwb[3] !== undefined ? hwb[3] : 1);
   }
   return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%"
      + (alpha !== undefined && alpha !== 1 ? ", " + alpha : "") + ")";
}

function keyword(rgb) {
   return reverseNames[rgb.slice(0, 3)];
}

function scale(num, min, max) {
   return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
   var str = num.toString(16).toUpperCase();
   return (str.length < 2) ? "0" + str : str;
}

function PopUp() {
   document.getElementById('ac-wrapper').style.display = "none";
   window.removeEventListener("click", hadit)
}

const almosthadit = new Audio('almosthadit.mp3')
window.addEventListener("click", hadit)

function hadit() {
   almosthadit.play()
}
















