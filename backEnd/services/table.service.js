const TableInfo = require("../models/table_info.model");

async function createTable(tableData) {
  const newTable = new TableInfo({
    ...tableData,
  });
  return newTable.save();
}

const getTableByTableNumber = async (table_number) => {
    try{
        const table = await TableInfo.findOne({
            where : {table_number : table_number}
        });
        console.log(table['dataValues']);
        return table;
    }catch(error){
        throw new Error("FAILED: " + error.message);
    }
}
const updateTable = async (table_number, updatedTable) => {
  
  try{
    const table = await TableInfo.findOne({ where: { table_number } });

    if (!table) {
      throw new Error("Table not found");
    }

    await table.update({
        capacity: updatedTable.capacity || table.capacity,
    });
    return {
        message: "Table updated successfully",
        data: table,
    };
  }catch (error) {
      return {
          message: "Error updating table",
          error: error.message,
      };
  }
  
};
const deleteTableByTableNumber = async (table_number) =>{
  try{
        const table = await TableInfo.findOne({
            where : {table_number : table_number}
        });
        if(!table){
            throw new Error("Table not found");
        }
        await TableInfo.destroy({
          where: { table_number : table_number },
        });
        return 1;
    }catch (error) {
        console.log("Error deleting table: ", error);
        throw new Error("An error occurred while deleting the table.");
    }
}
// async function getTableByTableNumber(table_number) {
//   try {
//     // Truy vấn cơ sở dữ liệu để tìm bản ghi có table_number tương ứng
//     const table = await TableInfo.findOne({
//       where: { table_number: table_number },
//     });

//     // Nếu không tìm thấy, trả về thông báo hoặc null
//     if (!table) {
//       return `Không tìm thấy bàn với số bàn: ${table_number}`;
//     }

//     // Trả về đối tượng table (TableInfo)
//     return table;
//   } catch (error) {
//     // Xử lý lỗi nếu có
//     console.error("Lỗi khi truy vấn:", error);
//     throw error; // Ném lỗi ra ngoài
//   }
// }

module.exports = {
  createTable,
  updateTable,
  getTableByTableNumber,
  deleteTableByTableNumber,
};
