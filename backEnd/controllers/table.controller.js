const TableInfo = require("../models/table_info.model");
const tableService = require("../services/table.service");

const getAllTables = async (req, res) => {
  try {
    const tables = await TableInfo.findAll();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tables" });
  }
};

const getTableByTableNumber = async (req, res) => {
  const { table_number } = req.params;
  try {
    const table = await tableService.getTableByTableNumber(table_number - 0);
    return res.status(200).json(table);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
const createTable = async (req, res) => {
  console.log(req.body);
  try {
    const { ...tableData } = req.body;
    const newTable = await tableService.createTable({ ...tableData });
    res.status(201).json(newTable);
  } catch (error) {
    res.status(500).json({ error: "Error creating table" });
  }
};

const updateTable = async (req, res) => {
  try {
    const { table_number } = req.params; // Adjust as needed to accept relevant fields
    const table = req.body;
    const tableUpdate = await tableService.updateTable(table_number - 0, table);
    res.status(201).json({
      message: "Account updated successfully!",
      data: tableUpdate,
    });
    // res.json({
    //   status: "SUCCESS",
    //   message: "Table updated successfully!",
    //   Table: updatedTable,
    // });
  } catch (error) {
    res.status(500).json({ error: "Error updating table" });
  }
};

const deleteTable = async (req, res) => {
  try {
    const { table_number } = req.params;
    const table = await tableService.deleteTableByTableNumber(table_number);
    if (table === 1) {
      res.status(200).json({
        message: "Table deleted successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting table" });
  }
};

module.exports = {
  getAllTables,
  createTable,
  updateTable,
  deleteTable,
  getTableByTableNumber,
};
