const bcrypt = require("bcrypt");
const {Op} = require("sequelize");
const Admin = require("../models/admins.model.js");

async function isAdminExists(criteria){
    const conditions = [];
    if(criteria.email){
        conditions.push({email : criteria.email});
    }
    if(criteria.phone){
        conditions.push({phone : criteria.phone});
    }
    if(conditions.length === 0){
        return false;
    }

    const result = await Admin.findAll({
        where: {
            [Op.or] : conditions,
        },
    });

    return result.length > 0;
}

