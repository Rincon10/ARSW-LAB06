const url = 'http://localhost:8080/blueprints/';
var apiclient = (function () {

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
                type:'GET',
                url: url+author+"/"+name,
                success:  (result) =>{
                    callback(null,[result]);
                },
                async: true
            });
        },
        putBlueprint: (name, author, data, callback)=> {
            jQuery.ajax({
                url: url+author+"/"+name,
                type:'PUT',
                data: data,
                contentType: "application/json",
                async: true,
                success:  () =>{
                    callback(null);
                }
            });
        },
        postBlueprint: ( data, callback ) => {
            jQuery.ajax({
                url: url,
                type:'POST',
                data: data,
                contentType: "application/json",
                async: true,
                success:  () =>{
                    callback(null);
                }
            });
        },
        deleteBlueprint: (name, author, data, callback) => {
            jQuery.ajax({
                url: url+author+"/"+name,
                type:'DELETE',
                data: data,
                contentType: "application/json",
                async: true,
                success:  () =>{
                    callback(null);
                }
            });
        }
    };
})();
