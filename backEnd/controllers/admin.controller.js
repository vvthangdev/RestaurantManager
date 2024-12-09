const Admin = require("../models/admins.model");
const {Op, Model} = require("sequelize");
require("dotenv").config();
const adminService = require("../services/admin.service.js");
const getAllAdmins = async (req, res) => {
    try{
        const admins = await adminService.getAllAdmins();

        res.json({
            admins : admins,
        });
    }catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const searchAdmins = async (req, res) => {
    const {words} = req.params;
    try {
        admins = await adminService.searchAdmins(words);
        if(admins.length === 0){
            return res.status(200).json(admins)
        }
        //.log(admins)
        return res.status(200).json(admins);
    }catch (error){
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
const getAdminById = async (req, res) => {
    const {adminId} = req.params;
    try {
        const admin = await adminService.getAdminByID(adminId - 0);
        return res.status(200).json(admin);
    }catch (error){
        console.log(error);
        return res.status(500).json({message : "Server Error"})
    }
}

const createNewAdmin = async (req, res) => {
    try {
        const admin = req.body;
        const newAdmin = await adminService.createNewAdmin(admin);
        if(newAdmin.status === 0){
            
            return res.status(200).json(newAdmin);
        }
        res.status(201).send(newAdmin);
    } catch (error){
        res.status(500).json({
            message: "Error creating account",
            error: error.message,
        });
    }
}

const deleteAdminById = async (req, res) => {
    try {
        const {adminId} = req.params;
        const result = await adminService.deleteAdminById(adminId - 0);
        if(result === 1) {
            res.status(200).json({
            message: "Account deleted successfully!",
            });
        }
    }catch (error) {
        res.status(500).json({
            message: "Error deleting account",
            error: error.message,
        });
    }
}
const updateAdminById = async (req, res) => {
  try{
        const {adminId} = req.params;
        const admin = req.body;
        const adminUpdate = await adminService.updateAdmin(adminId, admin);
        res.status(201).json({
            message: "Account updated successfully!",
            data: adminUpdate,
        });

  } catch (error) {
        res.status(500).json({
            message: "Error Updating Account",
            error: error.message,
        });
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        console.log(email, password)
        const result = await adminService.login(email, password);
        console.log(result);
        return res.status(200).json(result);
    } catch (error){
        if (error.message === "Mật khẩu hoặc Email không đúng") {
            return res.status(401).json({
                success: false,
                status: "FAILED",
                message: error.message, 
            });
        }
        res.status(500).json({
            message: "Error sign in account",
            error: error.message,
        });
    }
}
module.exports = {
    getAllAdmins,
    searchAdmins,
    getAdminById,
    deleteAdminById,
    createNewAdmin,
    updateAdminById,
    login,
}