const express = require('express')

const app = express();

app.use(express.json());

app.get("/conections", (request, response) => {
    const query = request.query
    console.log(query)
    return response.json(
        [{
            address: '123.45.67.89:1337',
            username: `DOMAIN\Teste`,
            password: 'thepassword'
        }]
    );
})

app.post("/conections", (request, response) => {
    const body = request.body
    console.log(body)
    return response.json(
        [{
            address: '123.45.67.89:1337',
            username: `DOMAIN\Teste`,
            password: 'thepassword'
        },
        {
            address: '123.45.67.89:1337',
            username: `DOMAIN\Teste2`,
            password: '21231'
        },

        ]
    );
})

app.put("/conections/:id", (request, response) => {
    const {id} = request.params;
    console.log(id)
    return response.json(
        [{
            address: '123.45.67.89:1337',
            username: `DOMAIN\Teste`,
            password: 'thepassword'
        },
        {
            address: '123.45.67.89:1337',
            username: `DOMAIN\Teste2`,
            password: '21231'
        },

        ]
    );
})

app.patch("/conections/:id", (request, response) => {
    return response.json(
        [{
            address: '123.45.67.89:1337',
            username: `DOMAIN\Teste`,
            password: 'thepassword'
        },
        {
            address: '123.45.67.89:1337',
            username: `DOMAIN\Teste2`,
            password: '21231'
        },

        ]
    );
})

app.delete("/conections/:id", (request, response) => {
    return response.json(
        [{
            address: '123.45.67.89:1337',
            username: `DOMAIN\Teste`,
            password: 'thepassword'
        },
        {
            address: '123.45.67.89:1337',
            username: `DOMAIN\Teste2`,
            password: '21231'
        },

        ]
    );
})

app.listen(8000)