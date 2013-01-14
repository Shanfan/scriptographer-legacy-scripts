/*************by Shanfan Huang, the visual designer. http://shanfanhuang.com *******
                                        VARIATOR
                        This work is released under Creative Commons 
                  Attribution-NonCommercial-ShareAlike (CC BY-NC-SA 3.0)
                    http://creativecommons.org/licenses/by-nc-sa/3.0/

***********************************************************************************/
var def = {
    fillColor: true,
    strokeColor: false,
    hue: 0,
    saturation: 0,
    brightness: 0,
    varyO: false,
    oMin: 100,
    oMax: 100,
    decrease: false,
    increase: false,
    size: 0
};

var components = {
  decrease: {type: 'boolean', label: 'Decrease Size randomly?'},
  increase: {type: 'boolean', label: 'Increase Size randomly?'},
  size: {
    type: 'slider', label: 'Size Randomness',
    range: [0,1], fullSize: true
  },
  
  division1: {
    type: 'text', 
    label: '::::::::::::::::::::::::'
  },
  
  fillColor: {
    type: 'boolean', label: 'Vary Fill Color?'
  },
  strokeColor: {
    type: 'boolean', label: 'Vary Stroke Color?'
  },
  hue: {
    type: 'slider', label: 'Hue Randomness',
    range: [0,1], length: 200
  },
  
  saturation: {
    type: 'slider', label: 'Saturation Randomness',
    range: [0,1], fullSize: true
  },
  
  brightness: {
    type: 'slider', label: 'Brightness Randomness',
    range: [0,1], fullSize: true
  },
  division2: {
    type: 'text', 
    label: '::::::::::::::::::::::::'
  },
  varyO: {
    type: 'boolean', label: 'Vary Opacity?'
  },
  
  oMin: {
    type: 'number', label: 'Min Opacity',
    units: 'percent', range: [1, 100],
    steppers: true
  },
  oMax: {
    type: 'number', label: 'Max Opacity',
    units: 'percent', range: [1, 100],
    steppers: true   
  },

  rulera: {
    type: 'ruler'
  },

  btn: {
    type: 'button',
    value: 'Vary!',
    fullSize: true,
    onClick: function(){
        var paths = document.getItems({
            type: Path,
            selected: true
        });
        
        if(paths.length >0){
            for(var i=0; i<paths.length; i++) {
                var path = paths[i];
                
                /******* Size Variation ************
                 * Known Issue: Stop playing with the Vary! button!
                 * ********************************/
                var newScale=1;
                if (def.decrease == true && def.increase == false) {newScale = 1 - Math.random()*def.size;}
                else if (def.increase == true && def.decrease == false) {newScale = 1 + Math.random()*def.size;}
                else if (def.decrease == true && def.increase == true) {newScale = 1 + (Math.random()*2 -1)*def.size;}
                if(newScale != 0){ //if newScale is 0, don't take any action.
                    path.scale(newScale);
                    }
                
                //Color Variation
                if (def.fillColor == true && path.fillColor != null) { //Fill color is to be varied
                    //Convert RGB color to HSV color
                    var hsvCol = rgb2hsv(path.fillColor.red, path.fillColor.green, path.fillColor.blue);
                    //Vary
                    var newH = hsvCol.h + (Math.random()*2-1)*def.hue*360,
                        newS = hsvCol.s + (Math.random()*2-1)*def.saturation*100,
                        newB = hsvCol.v + (Math.random()*2-1)*def.brightness*100;
                    if (newS >100) {newS = 100;}else if (newS < 0) {newS = 0;};
                    if ( newB > 100){newB= 100;}else if (newB < 0){newB = 0;}
                    path.fillColor = new RGBColor(hsv2rgb(newH, newS, newB));
                    
                };
                if (def.strokeColor == true && path.strokeColor != null) { //Stroke color to be varied
                    var hsvCol = rgb2hsv(path.strokeColor.red, path.strokeColor.green, path.strokeColor.blue);
                    var newH = hsvCol.h + (Math.random()*2-1)*def.hue*360,
                        newS = hsvCol.s + (Math.random()*2-1)*def.saturation*100,
                        newB = hsvCol.v + (Math.random()*2-1)*def.brightness*100;
                    if (newS >100) {newS = 100;}else if (newS < 0) {newS = 0;};
                    if ( newB > 100){newB= 100;}else if (newB < 0){newB = 0;}
                    path.strokeColor = new RGBColor(hsv2rgb(newH, newS, newB));
                };
                // Opacity Variation
                if (def.varyO == true) {
                    if (def.oMin > def.oMax) {
                        def.oMax = def.oMin;
                    }else if (def.oMin == def.oMax){
                        path.opacity = def.oMin;
                    }
                    else{
                        path.opacity = (def.oMin + Math.random()*(def.oMax-def.oMin))/100;
                    };
                }
            }
        }else{
            Dialog.alert('Please select at least one path.');
        };
    }
  }  
};

var palette = new Palette('Variator',components, def);


/*******Convert Color between RGB and HSB*******
    These functions are written by PixelWit
    http://www.pixelwit.com/blog/
    Originally in ActionScript, modified by Shanfan Huang
***********************************************/

function hsv2rgb(hue, sat, val) {
    var red, grn, blu, i, f, p, q, t;
    hue= (hue+360)%360; //add 360 to avoid negative numbers
    if(val==0) { return ([0, 0, 0]); }
    sat/=100;
    val/=100;
    hue/=60;
    i = Math.floor(hue);
    f = hue-i;
    p = val*(1-sat);
    q = val*(1-(sat*f));
    t = val*(1-(sat*(1-f)));
    if (i==0) {red=val; grn=t; blu=p;}
    else if (i==1) {red=q; grn=val; blu=p;}
    else if (i==2) {red=p; grn=val; blu=t;}
    else if (i==3) {red=p; grn=q; blu=val;}
    else if (i==4) {red=t; grn=p; blu=val;}
    else if (i==5) {red=val; grn=p; blu=q;}
    return ([red, grn, blu]);
}
//
function rgb2hsv(red, grn, blu) { //input numbers are between 0 and 1
    var x, val, f, i, hue, sat, val;
    x = Math.min(Math.min(red, grn), blu);
    val = Math.max(Math.max(red, grn), blu);
    if (x==val){
        return({h:0, s:0, v:val*100});
    }
    f = (red == x) ? grn-blu : ((grn == x) ? blu-red : red-grn);
    i = (red == x) ? 3 : ((grn == x) ? 5 : 1);
    hue = Math.floor((i-f/(val-x))*60)%360;
    sat = Math.floor(((val-x)/val)*100);
    val = Math.floor(val*100);
    return({h:hue, s:sat, v:val});
}

