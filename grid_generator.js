/*************by Shanfan Huang, the visual designer. http://shanfanhuang.com *******
 
                        This work is released under Creative Commons 
                  Attribution-NonCommercial-ShareAlike (CC BY-NC-SA 3.0)
                    http://creativecommons.org/licenses/by-nc-sa/3.0/

***********************************************************************************/



var def = {
    num: 40,
    row: 6,
    column: 6
};

var components = {
    num: {
        type: 'number',
        label: 'Unit Radius'
    },
    row: {
        type: 'number',
        label: 'Rows',
        steppers: true,
        min: 1,
        increment: 1
    },
    column: {
        type: 'number',
        label: 'Columns',
        steppers: true,
        min: 1,
        increment: 1
    },
    
    /**********Equilateral Grid************/
    
    btn1: {
        type: 'button',
        value: 'Make Triangular Grid',
        onClick: function() {
            var r = def.num;            
            
            var center = document.bounds.topLeft;
            
            var myTri = new Path.RegularPolygon(center, 3, r/2);
            var wStep = myTri.bounds.width/2;
            var hStep = myTri.bounds.height/2;
            myTri.position = new Point(wStep, hStep);
            
            var y_count = def.row;
            var x_count = def.column;
            
            for (i=0; i< y_count; i++)
            {      
                for (j=0; j< x_count; j++)
                {
                    var newTri = myTri.clone();
                    newTri.position = new Point(wStep + wStep*j, hStep + hStep*2*i);
                    if ((i+j)%2 != 0){
                        newTri.rotate(180);
                    }
                }   
            } //End of Loop
            
            myTri.remove();
        } //End of function
    },
    
    /********Alternative Triangular Grid ********/
    btn2: {
        type: 'button',
        value: 'Alt. Triangular Grid',
        onClick: function() {
            var r = def.num;
            var start = document.bounds.topLeft;
            var myTri = new Path();
            myTri.add(
                new Point(start),
                new Point(start + r),
                new Point({x:0, y:r})
            );
            myTri.closed = true;
            //End of drawing unit triangle
            
            var y_count = def.row;
            var x_count = def.column;
            
            for (i=0; i<y_count; i++)
            {
                for (j=0; j<x_count; j++)
                {
                   var newTri = myTri.clone();
                    if (j%2 != 0){
                        newTri.rotate(180);
                        newTri.position = new Point(r*(j/2), r*(i+.5));
                    }else{
                        newTri.position = new Point(r*(j/2+.5), r*(i+.5));
                    }
                    
                }
            }
            myTri.remove();
        }
    },
    
    
    /*******Hexagonal Grid**********/
    btn3: {
        type: 'button',
        value: 'Make Hexagonal Grid',
        onClick: function() {
            var r = def.num;            
            
            var center = document.bounds.topLeft;
            
            var myHex = new Path.RegularPolygon(center, 6, r/2);
            var wStep = myHex.bounds.width/2;
            var hStep = myHex.bounds.height/2;
            myHex.position = new Point(wStep, hStep);
            
            var y_count = def.row;
            var x_count = def.column;
            
            for (i=0; i< y_count; i++)
            {      
                for (j=0; j< x_count; j++)
                {
                    var newHex = myHex.clone();
                    if (j%2 != 0){
                        newHex.position = new Point(wStep + wStep*(1+Math.cos(Math.PI/3))*j, hStep*2*i);
                    } else {
                        newHex.position = new Point(wStep + wStep*(1+Math.cos(Math.PI/3))*j, hStep + hStep*2*i);
                    }
                }   
            } //End of Loop
            myHex.remove();
        }
    },
    
    /*************Alternative Hexagonal Grid***********/
    btn4: {
        type: 'button',
        value: 'Alt. Hexagonal Grid',
        onClick: function() {
            var r = def.num;            
            
            var center = document.bounds.topLeft;
            
            var myHex = new Path.RegularPolygon(center, 6, r/2);
            var wStep = myHex.bounds.width/2;
            var hStep = myHex.bounds.height/2;
            myHex.position = new Point(wStep, hStep);
            
            var y_count = def.row;
            var x_count = def.column;
            
            for (i=0; i< y_count; i++)
            {      
                for (j=0; j< x_count; j++)
                {
                    var newHex = myHex.clone();
                    newHex.position = new Point(wStep*(1+2*j), hStep*(2*i+1))
                }   
            } //End of Loop
            myHex.remove();
        }
    }
 
    
};

var palette = new Palette('Grid Generator', components, def);