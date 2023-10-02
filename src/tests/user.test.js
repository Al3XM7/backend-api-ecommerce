const request = require("supertest")
const app = require("../app")
let id;
let token;

test("/POST /users debe crear un usuario",async () => {
    const body = {
        firstName:"ana",
        lastName:"anab",
        email:"ana@ana",
        password:"ana1234",
        phone:123
    }
    const response = await request(app).post("/users").send(body)
    id = response.body.id
    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty("id")
    expect(response.body.firstName).toBe(body.firstName)
    expect(response.body.password).toBeFalsy()
})

test("/POST /users/login debe loguear un usuario", async () => {
    const body = {
        email:"ana@ana",
        password:"ana1234"
    }
    const response = await request(app).post("/users/login").send(body)
    token = response.body.accessToken
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty("accessToken")
})
test("/PUT /users/:id debe actualizar un usuario", async () => {
    const body = {
        firstName:"tom",
        lastName:"tomb",
        phone:123
    }
    const response = await request(app).put(`/users/${id}`).set("Authorization", `Bearer ${token}`).send(body)
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty("id")
    expect(response.body.firstName).toBe(body.firstName)
})

test("/GET /users debe retornar todos los usuarios", async () => {
    const response = await request(app).get("/users").set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
})

test("/DELETE /users/:id debe eliminar un usuario", async () => {
    const response = await request(app).delete(`/users/${id}`).set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(204)
})