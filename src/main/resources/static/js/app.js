var app = ( function(){

    var _module = apimock;
    var _listOfBlueprints;
    var _inputNombre;
    var _table = $('#blueprintsTable tbody');
    var _buttonBlueprints = document.getElementById('buttonBlueprints');
    var _totalPointsLabel = $('#totalPoints');
    var _bluePrintsAuthor = $('#bluePrintsAuthor');
    var _currentBlueprint= $('#currentBluePrint');

    loadEventListeners();
    function loadEventListeners(){
        if( !_buttonBlueprints ){
            console.log('No lo encontre');
            return;
        }
        _buttonBlueprints.addEventListener('click', getBlueprints);
    }

    function  updateData( totalOfPoints ){
        _totalPointsLabel.text(`Total Points: ${totalOfPoints}`);
        _bluePrintsAuthor.text(`${_inputNombre} blueprint's`);
        _currentBlueprint.text(`Current Blueprint:`);
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
        console.log(_listOfBlueprints,'1');
    }

    function getBlueprints(event){
        readInputData(null);
    }


    function readInputData(bluePrintName){
        //Limpiamos los datos existentes
        _listOfBlueprints=[];
        _inputNombre = $('#inputNombre').val();
        //Buscamos los blueprints segun el dato ingresado
        if (bluePrintName === null) _module.getBlueprintsByAuthor( _inputNombre, callB);
        else _module.getBlueprintsByNameAndAuthor(bluePrintName, _inputNombre, callB);
        _totalOfPoints = _listOfBlueprints.reduce( (total, {numberOfPoints}) => total + numberOfPoints, 0);
        console.log(_listOfBlueprints,'3');
        //Lo pasamos a html
        bluePrintsHTML(_totalOfPoints);
    }

    function draw( bluePrintName){
        //Actualizamos el blueprint seleccionado
        _currentBlueprint.text(`Current Blueprint: ${bluePrintName}`);

        _module.getBlueprintsByNameAndAuthor(bluePrintName, _inputNombre, (error , mockDataAuthor)=>{
            if(error) return;
            var _canvas = $('#canvas')[0];
            const { points } = mockDataAuthor[0];
            if( _canvas.getContext ){
                const context = _canvas.getContext('2d');
                //context.clearRect(0, 0, canvas.width, canvas.height);
                //Limpiando canvas
                canvas.width=canvas.width;
                context.moveTo(points[0].x, points[0].y);
                points.forEach( point=>{
                    const {x,y} = point;
                    context.lineTo(x,y);
                });
                context.stroke();
            }
        });


    }

    function bluePrintsHTML(totalOfPoints){
        updateData(totalOfPoints);
        // Limpiamos el contenido de la tabla HTML
        _table.empty();
        console.log(_listOfBlueprints,'2');
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

    function updateName(newName) {
        $('#inputNombre').val(newName);
    }

    return {
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
        drawBlueprint : (name) =>{
            draw(name);
        },
        setModule : (module = apimock)=>{
            _module = module;
        }
    }
})();
