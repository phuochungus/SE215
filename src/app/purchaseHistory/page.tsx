"use client";

// frontend/components/ShoppingHistoryPage.tsx
import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, IconButton, LinearProgress } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

const ShoppingHistoryPage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLimitDialogOpen, setIsLimitDialogOpen] = useState(false);
  const [bills, setBills] = useState<Record<string, { item: string; price: number; category: string; quantity: number }[]>>({});
  const [currentItems, setCurrentItems] = useState<{ item: string; price: number; category: string; quantity: number }[]>([{ item: '', price: 0, category: '', quantity: 1 }]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0, 10));
  const [monthlyLimit, setMonthlyLimit] = useState(10000000);

  useEffect(() => {
    const storedBills = localStorage.getItem('shoppingBills');
    const storedMonthlyLimit = localStorage.getItem('monthlyLimit');
    if (storedBills) {
      setBills(JSON.parse(storedBills));
    }
    if (storedMonthlyLimit) {
      setMonthlyLimit(parseInt(storedMonthlyLimit, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shoppingBills', JSON.stringify(bills));
  }, [bills]);

  useEffect(() => {
    localStorage.setItem('monthlyLimit', monthlyLimit.toString());
  }, [monthlyLimit]);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleLimitDialogOpen = () => {
    setIsLimitDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentItems([{ item: '', price: 0, category: '', quantity: 1 }]);
  };

  const handleLimitDialogClose = () => {
    setIsLimitDialogOpen(false);
  };

  const handleAddItem = () => {
    setCurrentItems([...currentItems, { item: '', price: 0, category: '', quantity: 1 }]);
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...currentItems];
    (newItems[index] as any)[field] = value;
    setCurrentItems(newItems);
  };

  const calculateTotal = () => {
    return Object.values(bills)
      .flat()
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculatePercentageOfLimit = () => {
    const total = calculateTotal();
    return (total / monthlyLimit) * 100;
  };

  const calculatePreviousMonthTotal = () => {
    return 2300000; // Static value for previous month's spending
  };

  const calculatePercentageChange = () => {
    const previousMonthTotal = calculatePreviousMonthTotal();
    const currentMonthTotal = calculateTotal();
    return ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;
  };

  const handleSaveBill = () => {
    if (selectedDate) {
      const newBills = { ...bills, [selectedDate]: [...(bills[selectedDate] || []), ...currentItems] };
      setBills(newBills);
      handleDialogClose();
    }
  };

  const handleSaveLimit = () => {
    setMonthlyLimit(monthlyLimit);
    handleLimitDialogClose();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4E4C67] text-white p-4 h-full overflow-y-auto">
        <nav className="space-y-4">
          <a href="/purchaseplan" className="block py-2 px-4 hover:bg-gray-600">Quản lý danh mục mua sắm</a>
          <a  href="/purchaseplan" className="block py-2 px-4 hover:bg-gray-600">Kế hoạch mua sắm</a>
          <a href="/purchaseHistory" className="block py-2 px-4 bg-gray-700 rounded">Lịch sử mua sắm</a>
          <a href="/purchaseManage" className="block py-2 px-4 hover:bg-gray-600">Thống kê</a>
        </nav>
        <div className="mt-8 space-y-4">
          <a href="/settings" className="block py-2 px-4 hover:bg-gray-600">Cài đặt</a>
          <a href="/blocklist" className="block py-2 px-4 hover:bg-gray-600">BlockList</a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4" style={{ color: '#4E4C67' }}>Lịch sử mua sắm</h1>

        {/* Statistics */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Chi Tiêu Tháng Trước</h2>
              <p className="text-2xl font-bold text-blue-600">{calculatePreviousMonthTotal().toLocaleString()}đ</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Chi Tiêu Tháng Này</h2>
              <p className="text-2xl font-bold text-green-600">{calculateTotal().toLocaleString()}đ</p>
              <p className={`text-sm ${calculatePercentageChange() >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                {calculatePercentageChange() >= 0 ? 'Tăng' : 'Giảm'} {Math.abs(calculatePercentageChange()).toFixed(2)}%
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Hạn Mức Tháng</h2>
              <LinearProgress
                variant="determinate"
                value={calculatePercentageOfLimit()}
                className="w-48 h-2 rounded"
                style={{ backgroundColor: '#e0e0e0', color: '#f44336' }}
              />
              <p className="text-sm text-gray-600 mt-1">{calculatePercentageOfLimit().toFixed(2)}%</p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="contained" style={{ backgroundColor: '#4E4C67', color: '#fff', marginRight: '10px' }} onClick={handleLimitDialogOpen}>Đặt Hạn Mức</Button>
            <Button variant="contained" style={{ backgroundColor: '#4E4C67', color: '#fff' }} onClick={handleDialogOpen}>Thêm hóa đơn</Button>
          </div>
        </div>

        {/* Bills by Date */}
        {Object.keys(bills).map((day) => (
          <div key={day} className="bg-[#F6EDED] shadow-lg rounded-md overflow-hidden mb-4">
            <div className="flex justify-between p-4 border-b bg-[#E3CFCF]">
              <h3 className="text-lg font-semibold text-gray-700">{day}</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-2 border-b">Tên món hàng</th>
                  <th className="p-2 border-b">Giá</th>
                  <th className="p-2 border-b">Danh mục</th>
                  <th className="p-2 border-b">Số lượng</th>
                  <th className="p-2 border-b">Tổng cộng</th>
                </tr>
              </thead>
              <tbody>
                {bills[day].map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-2 border-b text-black">{item.item}</td>
                    <td className="p-2 border-b">{item.price.toLocaleString()}đ</td>
                    <td className="p-2 border-b">{item.category}</td>
                    <td className="p-2 border-b">{item.quantity}</td>
                    <td className="p-2 border-b">{(item.price * item.quantity).toLocaleString()}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* Dialogs */}
        <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
          <DialogTitle style={{ backgroundColor: '#4E4C67', color: 'white' }}>Thêm hóa đơn</DialogTitle>
          <DialogContent>
            <div className="mb-4">
              <label htmlFor="date-picker" className="block text-gray-700 font-medium mb-2">Chọn ngày:</label>
              <TextField
                id="date-picker"
                type="date"
                fullWidth
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            {currentItems.map((item, index) => (
              <div className="flex items-center mb-4 space-x-2" key={index}>
                <TextField
                  fullWidth
                  placeholder="Tên món hàng"
                  value={item.item}
                  onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                />
                <TextField
                  fullWidth
                  placeholder="Giá (VND)"
                  type="number"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                />
                <TextField
                  fullWidth
                  placeholder="Danh mục"
                  value={item.category}
                  onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                />
                <div className="flex items-center space-x-2">
                  <IconButton onClick={() => handleItemChange(index, 'quantity', Math.max((item.quantity || 1) - 1, 1))}><Remove /></IconButton>
                  <span>{item.quantity}</span>
                  <IconButton onClick={() => handleItemChange(index, 'quantity', (item.quantity || 1) + 1)}><Add /></IconButton>
                </div>
              </div>
            ))}
            <Button onClick={handleAddItem} style={{ backgroundColor: '#4E4C67', color: 'white' }}>+ Thêm món hàng</Button>
          </DialogContent>
          <div className="flex justify-end p-4">
            <Button onClick={handleDialogClose}>Hủy</Button>
            <Button variant="contained" style={{ backgroundColor: '#4E4C67', color: 'white' }} onClick={handleSaveBill}>Lưu hóa đơn</Button>
          </div>
        </Dialog>

        <Dialog open={isLimitDialogOpen} onClose={handleLimitDialogClose} fullWidth maxWidth="sm">
          <DialogTitle style={{ backgroundColor: '#4E4C67', color: 'white' }}>Đặt Hạn Mức</DialogTitle>
          <DialogContent>
            <div className="mb-4">
              <label htmlFor="monthly-limit" className="block text-gray-700 font-medium mb-2">Hạn mức tổng:</label>
              <TextField
                id="monthly-limit"
                type="number"
                fullWidth
                value={monthlyLimit}
                onChange={(e) => setMonthlyLimit(parseInt(e.target.value, 10) || 0)}
              />
            </div>
          </DialogContent>
          <div className="flex justify-end p-4">
            <Button onClick={handleLimitDialogClose}>Hủy</Button>
            <Button variant="contained" style={{ backgroundColor: '#4E4C67', color: 'white' }} onClick={handleSaveLimit}>Lưu hạn mức</Button>
          </div>
        </Dialog>
      </main>
    </div>
  );
};

export default ShoppingHistoryPage;
