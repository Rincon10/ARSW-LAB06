const url = 'http://localhost:8080/blueprints/';
var apiclient = (function () {
    // Esto funciona dando dos click, ya que la info se guarda en temp
    var temp=[]
    return {
        getBlueprintsByAuthor:  (name, callback)=> {
            $.get(url+name,(data)=>{
                temp=data;
            });
            return callback(null,temp);
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
