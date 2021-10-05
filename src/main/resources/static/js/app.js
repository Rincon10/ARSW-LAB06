var app = ( function(){
    //=====================Modules========================
    var _module = apiclient;
    var _canvas = module_canvas;
    //========================Vars========================
    var _listOfBlueprints;
    var _inputNombre;
    var _cBlueprint='';
    //=====================DOM============================
    var _table = $('#blueprintsTable tbody');
    var _buttonBlueprints = document.getElementById('buttonBlueprints');
    var _buttonUpdatePoints = document.getElementById('buttonUpdatePoints');
    var _buttonDeleteBp = document.getElementById('buttonDeleteBp');
    var _buttonCreateNewBlueprint = document.getElementById('buttonCreateNewBlueprint');
    var _totalPointsLabel = $('#totalPointsLabel');
    var _bluePrintsAuthorH2 = $('#bluePrintsAuthorH2');
    var _currentBluePrintH2= $('#currentBluePrintH2');
    
    loadEventListeners();
    function loadEventListeners(){
        if( !_buttonBlueprints ) return;
    
        _buttonBlueprints.addEventListener('click', getBlueprints);
        _canvas.init();
        
        /* _buttonCreateNewBlueprint.addEventListener('click', updateBluePrint); */
        _buttonUpdatePoints.addEventListener('click', updateBluePrint);
        _buttonDeleteBp.addEventListener('click', _canvas.deletePoints);
    }
    
    function getBlueprints( ){
        _cBlueprint = '';
        _canvas.clear();
        readInputData( null );
    }
    
    async function readInputData( bluePrintName , callback = callB){
        //Limpiamos los datos existentes
        _listOfBlueprints=[];
        _inputNombre = $('#inputNombre').val();
        //Buscamos los blueprints segun el dato ingresado
        if (bluePrintName === null) await _module.getBlueprintsByAuthor( _inputNombre, callback);
        else await _module.getBlueprintsByNameAndAuthor(bluePrintName, _inputNombre, callback);
    }
    
    function callB (error , mockDataAuthor) {
        if( error !== null  ){ return;}
        _listOfBlueprints = mockDataAuthor.map( blueprint => {
            const data  = {
                name:blueprint.name,
                numberOfPoints: blueprint.points.length
            };
            //_totalOfPoints+=data.numberOfPoints;
            return data;
        });
        _totalOfPoints = _listOfBlueprints.reduce( (total, {numberOfPoints}) => total + numberOfPoints, 0);
        //Lo pasamos a html
        bluePrintsHTML(_totalOfPoints);
    }

    function callB2 (error , mockDataAuthor) {
        if( error !== null  ){ return;}
        _listOfBlueprints = [...mockDataAuthor];
        const bp = _listOfBlueprints[0];
        if( bp ){
            var { author, name, points } = bp;
            points = [...points, ..._canvas.getCurrentPoints()];

            // Objeto consultado por autor y nombre de plano
            bp.points = points; 
            _module.putBlueprint( name, author, JSON.stringify(bp), readInputData );
        }
    }
    
    function bluePrintsHTML(totalOfPoints){
        updateData(totalOfPoints);
        // Limpiamos el contenido de la tabla HTML
        _table.empty();
        _listOfBlueprints.map(bluePrint => {
            const {name, numberOfPoints } = bluePrint;
            const row = document.createElement('tr');
            const button = `<button class="btn btn-success" onclick="app.drawBlueprint('${name}')"> Open </button>`;
            row.innerHTML=`
                            <td>${name}</td>
                            <td>${numberOfPoints}</td>
                            <td>${button}</td>`;
            //Agregando a la tabla
            _table.append(row);
        });
    }

    function  updateData( totalOfPoints ){
        _totalPointsLabel.text(`Total Points: ${totalOfPoints}`);
        _bluePrintsAuthorH2.text(`${_inputNombre} blueprint's`);
        _currentBluePrintH2.text(`Current Blueprint:`);
    }

    function draw( bluePrintName ){
        //Actualizamos el blueprint seleccionado
        _currentBluePrintH2.text(`Current blueprint: ${bluePrintName}`);
        _cBlueprint = bluePrintName;
        _module.getBlueprintsByNameAndAuthor(bluePrintName, _inputNombre, (error , mockDataAuthor)=>{
            if(error) return;
            var { points } = mockDataAuthor[0];
            _canvas.drawCanvas(points);
        });
    }

    function updateBluePrint() {
        if (_cBlueprint==='') return;
        readInputData( _cBlueprint, callB2);        
    }

    function updateName(newName) {
        $('#inputNombre').val(newName);
    }

    return {
        init:()=>{
            loadEventListeners();
        },

        updateAuthorName : newName => {
            updateName(newName);
        },
        setListBlueprintsByAuthor : author => {
            updateName(author);
            readInputData(null);
        },
        setListBlueprintsByNameAndAuthor : (name,author) => {
            updateName(author);
            readInputData(name);
        },
        drawBlueprint : (name, points = []) =>{
            draw(name, points);
        },
        setModule : (module = apiclient)=>{
            _module = module;
        },
        getCurrentBlueprint: ()=>{
            return _cBlueprint;
        }
    }
})();