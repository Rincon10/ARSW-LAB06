const module_canvas = (( )=>{
    var _canvas = $('#canvas')[0]
    var _context = _canvas.getContext("2d");
    var _points = [];
    var _currentBlueprint;
    var _lastBlueprint;
        
    function loadEventListeners() {
        
        if (window.PointerEvent){
            _canvas.addEventListener("pointerdown", ( event ) => {
                _currentBlueprint = app.getCurrentBlueprint();
                if( !_currentBlueprint ) return;  
                if ( _currentBlueprint !== _lastBlueprint) _points = [];
                _lastBlueprint = _currentBlueprint; 
                var { pageX, pageY } = event;
                pageX-= _canvas.offsetLeft;
                pageY-= _canvas.offsetTop;

                const point = {
                    x: pageX,
                    y: pageY
                }
                
                _points.push( point );
                app.drawBlueprint( _currentBlueprint, _points );
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
        updatePoints : () =>{
            if( _points.length !==0){
                //Actualizar puntos
                _points = [];
            }
        },
        deletePoints : () =>{
            _points = [];
            app.drawBlueprint( _currentBlueprint);
        }

    }
})(); 