const knex = require("./knex")

function createBourbon(bourbon){
    return knex("bourbon").insert(bourbon)
}

function getAllBourbon(){
    return knex("bourbon").select("oid", "*")
}

function deleteBourbon(id){
    return knex("bourbon").where("oid", id).del()
}

function updateBourbon(id, bourbon){
    return knex("bourbon").where("oid", id).update(bourbon)
}

function getAllById(){
    return knex("bourbon").select("oid", id)
}

module.exports = {
    createBourbon,
    getAllBourbon,
    deleteBourbon,
    updateBourbon,
    getAllById,
}