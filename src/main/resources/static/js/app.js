var app = ( function(){
    //===================== Modules ========================
    var _module = apiclient;
    var _canvas = module_canvas;

    //======================== Vars ========================
    var _listOfBlueprints;
    var _inputNombre;
    var _cBlueprint='';
    
    //===================== DOM ============================
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
        _buttonDeleteBp.addEventListener('click', deleteBlueprint);
        _buttonCreateNewBlueprint.addEventListener('click', createBlueprint);
    }
    
    function getBlueprints( ){
        _cBlueprint = '';
        _canvas.clear();
        readInputData( null );
    }

    // Manda la orden de obtener un blueprint, bien sea solo por autor o por nombre también
    function readInputData( bluePrintName , callback = callB){
        //Limpiamos los datos existentes
        _listOfBlueprints=[];
        
        //Buscamos los blueprints segun el dato ingresado
        _inputNombre = $('#inputNombre').val();
        if (bluePrintName === null) _module.getBlueprintsByAuthor( _inputNombre, callback);
        else _module.getBlueprintsByNameAndAuthor(bluePrintName, _inputNombre, callback);
    }
    
    // Transforma la información recibida del modulo en objetos de tipo data
    function callB (error , mockDataAuthor) {
        if( error !== null  ){ return;}
        _listOfBlueprints = mockDataAuthor.map( blueprint => {
            const data  = {
                name: blueprint.name,
                numberOfPoints: blueprint.points.length
            };
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
    
    function callB3 (error , mockDataAuthor) {
        if( error !== null  ){ return;}
        _listOfBlueprints = [...mockDataAuthor];
        const bp = _listOfBlueprints[0];
        if( bp ){
            var { author, name } = bp;
            _module.deleteBlueprint( name, author, JSON.stringify(bp), readInputData );
        }
    }

    //Coloca la información que se tiene dentro del html
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

    // Actualiza la información a mostrar del autor selecionado
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

    function deleteBlueprint(){
        if (_cBlueprint==='') return;
        _canvas.clear();
        readInputData( _cBlueprint, callB3);        
    }

    function updateName(newName) {
        $('#inputNombre').val(newName);
    }

    function createBlueprint(){
        _canvas.clear();
        _inputNombre = $('#inputNombre').val();
        if (_inputNombre === '') {
            alert("No se puede crear un blueprint sin haber seleccionado un autor.");
            return;
        }
        var bpname = prompt("Nombre del blueprint: ", "Nombre del nuevo blueprint");
        if (bpname === '' || bpname === null){
            alert("No se puede crear un blueprint sin nombre.");
            return;
        }
        var bpnew = {author: _inputNombre, name: bpname, points: []};
        _module.postBlueprint( JSON.stringify(bpnew), readInputData);
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
        },
        createNewBlueprint : () =>{}
    }
})();