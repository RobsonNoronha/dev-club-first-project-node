const express = require("express")
const uuid = require("uuid")

const port = 3000

const app = express()
app.use(express.json())



const users = []

const myFirstMiddleware = (request, response, next) => {

    next()
}
app.use(myFirstMiddleware)


app.get("/users", (request, response) => {
    return response.json(users)
})


app.post("/users/", (request, response) => {
    const { name, age } = request.body

    const user = { id:uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(users)
})

app.put("/users/:id", (request, response) => {
   const { id } = request.params
   const { name, age } = request.body

   const updateUser = { id, name, age }

   const index = users.findIndex( user => user.id === id)

   if(index < 0 ){
    return response.status(404).json( { message: "Nao localizado"})
   }

   
   users[index] = updateUser

    return response.json(updateUser)
})

app.delete("/users/:id", (request, response) => {
    const { id} = request.params

    const index = users.findIndex( user => user.id === id)

    if(index < 0 ){
        return response.status(404).json( { message: "Nao localizado"})
       }

       users.splice(index,1)

    
    return response.status(204).json(users)
})










app.listen(port, () =>{
    console.log(`🥹  Server started on port ${port}`)
})

/* Query paramans => meusite.com/users?nome=robson&age=28
- Route params => /users/2  BUSCAR DELETAR OU ATUALIZAR ALGO ESPECIFICO
*/

