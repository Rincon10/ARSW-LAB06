const url = 'http://localhost:8080/blueprints/';
var apiclient = (function () {
    // Esto funciona dando dos click, ya que la info se guarda en temp
    // Intentamos usar async y await pero no nos funciono
    return {
        getBlueprintsByAuthor:  (author, callback)=> {
            jQuery.ajax({
                type:'GET',
                url: url+author,
                success:  (result) =>{
                    callback(null,result);
                },
                async: true
            });
        },
        getBlueprintsByNameAndAuthor: (name, author, callback)=> {
            jQuery.ajax({
                url: url+author+"/"+name,
                success:  (result) =>{
                    callback(null,[result]);
                },
                async: true
            });
        }
    };
})();
