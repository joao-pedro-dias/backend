const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class AdminController{
  
  async create(request, response){
    const { name, email, password, phone, address, cep, address_number, district, complement } = request.body;

    const checkUserExist = await knex("admins")
    .where({ email })

    console.log(checkUserExist)

    if(checkUserExist == false){
      let hashPassword = await hash(password, 8);

      await knex("admins").insert({
        name,
        email,
        password: hashPassword,
        phone, 
        address, 
        cep, 
        address_number, 
        district, 
        complement
      })

    } else if(checkUserExist){
      throw new AppError(`Este e-mail já está em uso`);
    }
    
    return response.status(201).json();
  }

  async getAdminById(admin_id) {
    const admin = await knex('admins').where({ id: admin_id }).first();
    return admin;
  }  

  async update(request, response){
    const { email, old_email, name, password, old_password } = request.body;
    const admin_id = request.admin.id;
    const updateObject = {
      email,
      name,
      password
    }

    const admin = (await knex("admins")
    .where({ id: admin_id }))[0];

    if(!admin){
      throw new AppError("Usuário não encontrado!");
    }

    const adminWithSameEmail = await knex("admins")
    .where({ email: email });
    
    if(adminWithSameEmail[0] && adminWithSameEmail[0].id !== admin_id){
      throw new AppError(`O e-mail informado já está em uso`);
    }

    if(password && !old_password){
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha");
    }

    if(password && old_password){
      const checkOldPassword = await compare(old_password, admin.password);
      if(!checkOldPassword) {
        throw new AppError("A senha antiga não confere!");
      }

      let newPassword = await hash(password, 8);

      updateObject.password = newPassword;

    }

    if(email && old_email){
      const checkOldEmail = await compare(old_email, admin.email);
      if(!checkOldEmail) {
        throw new AppError("A senha antiga não confere!");
      }

      updateObject.email;
    }

    await knex("admins")
    .where( { id: admin_id })
    .update(updateObject)

    return response.status(201).json();
  }
}

module.exports = AdminController;
