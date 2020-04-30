process.env.NODE_ENV = "testing";

const chai = require("chai");
const server = require("../server");
const should = require("chai").should();
const chaiHttp = require("chai-http");

const User = require("../models/Users");

describe("POST /api/users", () => {
    it("It should return a 201 status with the new user object", done => {
        chai.request(server)
        .post("/api/users")
        .send(register.good)
        .end((err, res) => {
            if(err) throw err;

            res.should.have.property("status", 201);
            res.body.should.be.a("object");

            done();
        });
    });
});

describe("DELETE /api/users", () => {

});

describe("POST /api/users/access-token", () => {

});

describe("DELETE /api/users/access-token", () => {

});