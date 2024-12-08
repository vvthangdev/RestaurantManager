const bcrypt = require("bcrypt");
const {Op} = require("sequelize");
const Admin = require("../models/admins.model.js");
const jwt = require("jsonwebtoken");
const PASSWORD_HASH_SALT_ROUNDS = 10;
const getAllAdmins = async () => {
    try{
        const admins = await Admin.findAll({
            attributes : ['id', 'name', 'role', 'email', 'phone'],
            where : {"role" : "STAFF"},
        });
        return admins;
    }catch (error){
        throw new Error("FAILED: " + error.message); 
    }
}

const searchAdmins = async (words) => {
    try{
        const admins = await Admin.findAll({
            attributes : ['id', 'name', 'role', 'email', 'phone'],
            where : {
                
                name : {
                    [Op.like] : `%${words}%`
                },
                role : "STAFF",
            },
        });
        console.log(1)
        return admins;
    }catch (error){
        throw new Error("FAILED: " + error.message);
    }
}

const getAdminByID = async (adminId) => {
    try{
        const admin = await Admin.findOne({
            where : {id : adminId}
        });
        console.log(admin['dataValues']);
        return admin['dataValues'];
    }catch(error){
        throw new Error("FAILED: " + error.message);
    }
}
const createNewAdmin = async (admin) => {
    try {
        const isExists = await isAdminExists(admin.email);
        if(isExists){
            return {
                status : 0,
                message: "Email đã tồn tại!",
            };
        }
        const hashedPassword = await bcrypt.hash(
            admin.password,
            PASSWORD_HASH_SALT_ROUNDS
        );
        console.log(hashedPassword);
        admin.password = hashedPassword;
        const newAdmin = await Admin.create(admin);
        return newAdmin;

    }catch (error){
        throw new Error("FAILED to create admin: " + error.message);
    }
}

const deleteAdminById = async (adminId) => {
    try{
        const admin = await Admin.findOne({
            where : {id : adminId}
        });
        if(!admin){
            throw new Error("Admin not found");
        }
        await Admin.destroy({
          where: { id : adminId },
        });
        return 1;
    }catch (error) {
        console.log("Error deleting admin: ", error);
        throw new Error("An error occurred while deleting the admin.");
    }
}

const updateAdmin = async (adminId, admin) => {
    try {
        console.log(adminId)
        const adminUpdate = await Admin.findOne({
            where : {id : adminId}
        });
        if(!adminUpdate){
            throw new Error("Admin not found"); 
        }
        if(adminUpdate.role === "MANAGER"){
            return false;
        }
        console.log(adminUpdate);
        await adminUpdate.update({
            name: admin.name || adminUpdate.name,
            avatar: admin.avatar || adminUpdate.avatar,
            role: admin.role || adminUpdate.role,
            email: admin.email || adminUpdate.email,
            phone: admin.phone || adminUpdate.phone,
            password: admin.password || adminUpdate.password,
            refresh_token: admin.refresh_token || adminUpdate.refresh_token,
        });
        return {
            message: "Account updated successfully",
            data: adminUpdate,
        };
    }catch (error) {
        return {
            message: "Error updating admin",
            error: error.message,
        };
    }
}

const isAdminExists = async (email) => {
    
    const result = await Admin.findAll({
        where: {
            email : email,
        },
    });
    
    return result.length > 0;
}

const login = async (email, password) => {
    try{
        const admin = await Admin.findOne({
            where: {
                email : email,
            }
        });
        if(admin && (await bcrypt.compare(password, admin.password))){
            return generateTokenResponse(admin);
        }
        
        throw new Error("Invalid email or password");
    }catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            status: "FAILED",
            message: "Invalid email or password",
        });
    }
}

const generateTokenResponse = admin => {
  const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );

  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    token,
  };
};

module.exports = {
    getAllAdmins : getAllAdmins,
    searchAdmins : searchAdmins,
    getAdminByID : getAdminByID,
    isAdminExists : isAdminExists,
    login : login,
    updateAdmin : updateAdmin,
    createNewAdmin : createNewAdmin,
    deleteAdminById : deleteAdminById,
};