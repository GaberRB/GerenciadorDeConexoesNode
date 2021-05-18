const express = require('express')
const { v4: uuidv4 } = require("uuid")
const rdp = require('node-rdp');
const os = require('os');



const app = express();

app.use(express.json());


const conections = [];

function rpd_conection(address, domain, username, password) {
    rdp({
        address: address,
        username: `${domain}\\${username}`,
        password: password
    })
    
}

function openConect(request, response, next){
    const {client, conection_name } = request.headers;
    const conection = conections.find(conection => conection.conection_name === conection_name && conection.client === client);
    const {address, domain, username, password} = conection

    try {
        rpd_conection(address, domain, username, password)
    } catch (error) {
        return response.status(400).json({error}) 
    }
    
    request.conection = conection

    return next();
}

function verifyIfConectionExists(request, response, next){
    const {client, conection_name } = request.headers;
    const conection = conections.find(conection => conection.conection_name === conection_name && conection.client === client);
    
    if(!conection){
        return response.status(400).json({error: "Conection not found"})
    }
    request.conection = conection

    return next();
}


app.post("/conection", (request, response) => {
    const { client, conection_name, address, domain, username, password } = request.body;
    const conectionAlreadyExists = conections.some((conection) =>
        conection.address === address && conection.username === username
    );

    const conection_nameAlreadyExists = conections.some((conection) =>
        conection.conection_name === conection_name
    );

    if (conectionAlreadyExists) {
        return response.status(400).json({ error: "Conection Alread Exists" })
    }

    if (conection_nameAlreadyExists) {
        return response.status(400).json({ error: "Conection name Alread Exists" })
    }

    conections.push({
        id: uuidv4(),
        client,
        conection_name,
        address,
        domain,
        username,
        password
    })
    return response.status(201).send();
})

app.get("/conection",verifyIfConectionExists, openConect, (request, response) => {
    const { conection } = request
    return response.status(200).json({Success: 'Conection Estabilized', conection: conection, userConect: os.userInfo().username, date: Date()});
})

app.get("/conections", (request, response) => {
    
    return response.status(200).json({conections});
})

app.get("/desconection",verifyIfConectionExists, (request, response) => {
    const { conection } = request
    return response.status(200).json({Success: 'Desconection Estabilized', conection: conection, userConect: os.userInfo().username, date: Date()});
})

app.put("/conection", verifyIfConectionExists, (request, response) =>{
    const {conection_name, address, domain, username, password} = request.body
    const {conection} = request;

    conection.conection_name = conection_name;
    conection.address = address;
    conection.domain = domain;
    conection.username = username;
    conection.password = password;

    return response.status(201).json({conection: conection});
})

app.delete("/conection", verifyIfConectionExists, (request, response) => {
    const { conection } = request;

    conections.splice(conection, 1);

    return response.status(200).json(conections);
})


app.listen(8000)