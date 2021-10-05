var module_canvas = (( )=>{
    //======================== Var ========================
    var _cBlueprint;
    var _lBlueprint;
    var _points = [];
    //======================== Elements ========================
    var _canvas = $('#canvas')[0]
    var _context = _canvas.getContext("2d");
    

    function loadEventListeners() {  
        if (window.PointerEvent){
            _canvas.addEventListener("pointerdown", ( event ) => {
                _cBlueprint = app.getCurrentBlueprint();
                if( !_cBlueprint ) return;  
                if( _cBlueprint !== _lBlueprint) _points = [];
                
                var { pageX, pageY } = event;
                _lBlueprint = _cBlueprint;
                pageX-= _canvas.offsetLeft;
                pageY-= _canvas.offsetTop;

                const point = {
                    x: pageX,
                    y: pageY
                }
                _points.push( point );
                app.drawBlueprint( _cBlueprint );
            } );
        }else{
            CanvasGradient.addEventListener("mousedown", function(event){
                alert('mousedown at '+event.clientX+ ', ' + event.clientY);
            });
        }
    }
    return {
        init : ()=>{
            loadEventListeners();
        },
        drawCanvas : (currentPoints = []) =>{    
            if( _canvas.getContext ){        
                _cBlueprint = app.getCurrentBlueprint();
                if( _cBlueprint !== _lBlueprint) _points = [];

                const points = [ ...currentPoints, ..._points];
                //Limpiando canvas
                _canvas.width = _canvas.width;

                _context.moveTo(points[0].x, points[0].y);
                points.forEach( point=>{
                    const {x,y} = point;
                    _context.lineTo(x,y);
                });
                _context.stroke();
            }
        },
        updatePoints : () =>{
            if( _points.length !==0){
                //Actualizar puntos
                _points = [];
            }
        },
        clear : ()=>{
            _points = [];
            _canvas.width = _canvas.width;
        },
        deletePoints : () =>{
            _points = [];
            app.drawBlueprint( _cBlueprint);
        },
        getCurrentPoints: ()=>{
            return _points;
        }

    }
})(); 