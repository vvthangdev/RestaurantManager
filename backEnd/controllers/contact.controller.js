const Contact = require("../models/contact.model");

const createContact = async (req, res) => { 
    try {
        const contact = new Contact({...req.body});
        await contact.save();
        return res.status(200).json( {
            status: "SUCCESS",
            contact,
        } );
    } catch(e) {
        console.log(e);
        return res.status(500).json( {
            error: "Error when create contact"
        } );
    }
};
const getAllContacts = async (req, res) => { 
    try { 
        const contacts = await Contact.findAll();
        return res.status(200).json( {
            status: "SUCCESS",
            contacts,
        } );
    } catch(e) { 
        return res.status(500).json( {
            error: "Error when get all contacts"
        });
    }
}

const getContactById = async (req, res) => {
    const {contactId} = req.params;
    try {
        const contact = await Contact.findAll({where : {
            id : contactId,
        }});
        return res.status(200).json(contact);
    }catch (error){
        console.log(error);
        return res.status(500).json({message : "Server Error"})
    }
}

const deleteContactById = async (req, res) => {
    try {
        const {contactId} = req.params;
        console.log(contactId);
        const contact = await Contact.findOne({where : {
            id : contactId,
        }});
        if(contact){
            await Contact.destroy({
                where : {id : contactId}
            });
            
                res.status(200).json({
                message: "Contact deleted successfully!",
                });
            return;
        }else {

            throw new Error("Contact not found");
        }
    }catch (error) {
        res.status(500).json({
            message: "Error deleting account",
            error: error.message,
        });
    }
}
module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    deleteContactById,
}