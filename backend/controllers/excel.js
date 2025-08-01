const ExcelJS = require('exceljs');

const Income = require('../models/IncomeModels');
const Expense = require('../models/ExpenseModels');

const downloadExcel = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user's income and expense data
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    // Add metadata
    workbook.creator = 'Finnancy App';
    workbook.lastModifiedBy = 'Finnancy App';
    workbook.created = new Date();
    workbook.modified = new Date();

    // Create Income worksheet
    const incomeSheet = workbook.addWorksheet('Income', {
      pageSetup: { paperSize: 9, orientation: 'portrait' }
    });

    // Income headers
    incomeSheet.columns = [
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Title', key: 'title', width: 25 },
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Description', key: 'description', width: 30 }
    ];

    // Style headers for income sheet
    incomeSheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4CAF50' } // Green for income
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    // Add income data
    incomes.forEach((income) => {
      incomeSheet.addRow({
        date: income.date.toLocaleDateString(),
        title: income.title,
        category: income.category,
        amount: income.amount,
        description: income.description
      });
    });

    // Format income amount column as currency
    incomeSheet.getColumn('amount').numFmt = '"Rs "#,##0';

    // Add total row for income
    if (incomes.length > 0) {
      const totalIncomeRow = incomeSheet.addRow({
        date: '',
        title: 'TOTAL INCOME',
        category: '',
        amount: { formula: `SUM(D2:D${incomes.length + 1})` },
        description: ''
      });
      totalIncomeRow.eachCell((cell, colNumber) => {
        cell.font = { bold: true };
        if (colNumber === 2 || colNumber === 4) { // Title and Amount columns
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'E8F5E8' }
          };
        }
      });
    }

    // Create Expense worksheet
    const expenseSheet = workbook.addWorksheet('Expenses', {
      pageSetup: { paperSize: 9, orientation: 'portrait' }
    });

    // Expense headers
    expenseSheet.columns = [
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Title', key: 'title', width: 25 },
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Description', key: 'description', width: 30 }
    ];

    // Style headers for expense sheet
    expenseSheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'F44336' } // Red for expenses
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    // Add expense data
    expenses.forEach((expense) => {
      expenseSheet.addRow({
        date: expense.date.toLocaleDateString(),
        title: expense.title,
        category: expense.category,
        amount: expense.amount,
        description: expense.description
      });
    });

    // Format expense amount column as currency
    expenseSheet.getColumn('amount').numFmt = '"Rs "#,##0';

    // Add total row for expenses
    if (expenses.length > 0) {
      const totalExpenseRow = expenseSheet.addRow({
        date: '',
        title: 'TOTAL EXPENSES',
        category: '',
        amount: { formula: `SUM(D2:D${expenses.length + 1})` },
        description: ''
      });
      totalExpenseRow.eachCell((cell, colNumber) => {
        cell.font = { bold: true };
        if (colNumber === 2 || colNumber === 4) { // Title and Amount columns
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFEBEE' }
          };
        }
      });
    }

    // Create Summary worksheet
    const summarySheet = workbook.addWorksheet('Summary');
    summarySheet.columns = [
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Value', key: 'value', width: 20 }
    ];

    // Style summary headers
    summarySheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '2196F3' } // Blue for summary
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // Calculate totals
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const netBalance = totalIncome - totalExpenses;

    // Add summary data
    summarySheet.addRow({ category: 'Total Income', value: totalIncome });
    summarySheet.addRow({ category: 'Total Expenses', value: totalExpenses });
    summarySheet.addRow({ category: 'Net Balance', value: netBalance });

    // Format summary values as currency
    summarySheet.getColumn('value').numFmt = '"Rs "#,##0';

    // Style net balance row based on positive/negative
    const netBalanceRow = summarySheet.getRow(4);
    netBalanceRow.getCell('value').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: netBalance >= 0 ? '4CAF50' : 'F44336' }
    };
    netBalanceRow.getCell('value').font = {
      bold: true,
      color: { argb: 'FFFFFF' }
    };

    // Set response headers for file download
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=finnancy-data-${new Date().toISOString().split('T')[0]}.xlsx`
    );

    // Write to response
    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Excel download error:', error);
    res.status(500).json({ message: 'Failed to generate Excel file' });
  }
};

module.exports = {
  downloadExcel
};