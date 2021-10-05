var apimock = (function () {

    var mockdata = [];

    mockdata["JhonConnor"] = [
        {
            author: "JhonConnor",
            name: "house",
            points: [
                {
                    x: 200,
                    y: 100
                },
                {
                    x: 100,
                    y: 200
                },
                {
                    x: 100,
                    y: 300
                },
                {
                    x: 300,
                    y: 300
                },
                {
                    x: 300,
                    y: 200
                },
                {
                    x: 100,
                    y: 200
                },
                {
                    x: 300,
                    y: 200
                },
                {
                    x: 200,
                    y: 100
                }
            ]
        },
        {
            author: "JhonConnor",
            name: "bike",
            points: [
                {
                    x: 30,
                    y: 35
                },
                {
                    x: 40,
                    y: 45
                }
            ]
        },
        {
            author: "JhonConnor",
            name: "car",
            points: [
                {
                    x: 300,
                    y: 100
                },
                {
                    x: 600,
                    y: 100
                },
                {
                    x: 600,
                    y: 200
                },
                {
                    x: 500,
                    y: 200
                },
                {
                    x: 500,
                    y: 100
                },
                {
                    x: 600,
                    y: 100
                },
                {
                    x: 600,
                    y: 200
                },
                {
                    x: 800,
                    y: 200
                },
                {
                    x: 800,
                    y: 300
                },
                {
                    x: 700,
                    y: 300
                },
                {
                    x: 700,
                    y: 400
                },
                {
                    x: 600,
                    y: 400
                },
                {
                    x: 600,
                    y: 300
                },
                {
                    x: 700,
                    y: 300
                },
                {
                    x: 400,
                    y: 300
                },
                {
                    x: 400,
                    y: 400
                },
                {
                    x: 300,
                    y: 400
                },
                {
                    x: 300,
                    y: 300
                },
                {
                    x: 400,
                    y: 300
                },
                {
                    x: 100,
                    y: 300
                },
                {
                    x: 100,
                    y: 200
                },
                {
                    x: 300,
                    y: 200
                },
                {
                    x: 300,
                    y: 100
                }
            ]
        }
    ]

    mockdata['LexLuthor'] = [
        {
            author: 'LexLuthor',
            name: 'kryptonite',
            points: [
                {
                    x: 60,
                    y: 65
                },
                {
                    x: 70,
                    y: 75
                }
            ]
        }
    ]

    return {
        getBlueprintsByAuthor: function(author, callback) {
            callback(null, mockdata[author] || [] );
        },

        getBlueprintsByNameAndAuthor: function(name, author, callback) {
            if( mockdata[author] === null ) return;
            blueprint = mockdata[author].find(function(blueprint) {
                return blueprint.name == name
            });
            callback(null, [blueprint] || []);
        },
        getMockaData: ()=>{
            return mockdata;
        }
    }

})();