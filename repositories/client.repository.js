import {connect} from "./db.js"

async function insertClient(client){
    const conn = await connect();
    try {
        const sql = "INSERT INTO clients (name, cpf, phone, email, adress) VALUES ($1, $2, $3, $4, $5)"
        const values = [client.name, client.cpf, client.phone, client.email, client.adress];
        const res = await conn.query(sql,values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }finally{ //finally sempre será execultado, por isso que quando temrinar a conexão, dando tudo ou certo ou não, essa conexão será encerrada
        conn.release(); //encerra a conexão
    }
    
     
}
async function getClients(){
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM clients");
        return res.rows;
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function getClient(id){
    const conn = await connect();
    try {
    const res = await conn.query("SELECT * FROM clients WHERE client_id = $1", [id]);
    return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function deleteClient(id){
    const conn = await connect();
    try {
     await conn.query("DELETE FROM clients WHERE client_id = $1", [id]);
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function updateClient(client){
    const conn = await connect();
    try {
    const sql = "UPDATE clients SET name = $1, cpf = $2, phone = $3 , email = $4, adress = $5 WHERE client_id = $6 RETURNING *";
    const values = [client.name, client.cpf, client.phone, client.email,client.adress, client.client_id];
    const res = await conn.query(sql,values);
    return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}



export default{
    insertClient,
    getClients,
    getClient,
    updateClient,
    deleteClient
}