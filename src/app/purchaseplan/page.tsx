"use client";

// frontend/components/ShoppingListPage.tsx
import React, { useState, useEffect } from 'react';
import { Checkbox, Button, Dialog, DialogTitle, DialogContent, TextField, IconButton, Tooltip } from '@mui/material';
import { Add, Remove, Delete, HelpOutline } from '@mui/icons-material';

const ShoppingListPage: React.FC = () => {
  const [openDay, setOpenDay] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [plans, setPlans] = useState<Record<string, { item: string; quantity: number; completed: boolean }[]>>({});
  const [currentItems, setCurrentItems] = useState<{ item: string; quantity: number; completed: boolean }[]>([{ item: '', quantity: 1, completed: false }]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0, 10));
  const [suggestedItem, setSuggestedItem] = useState<string | null>(null);

  useEffect(() => {
    const storedPlans = localStorage.getItem('shoppingPlans');
    if (storedPlans) {
      setPlans(JSON.parse(storedPlans));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shoppingPlans', JSON.stringify(plans));
  }, [plans]);

  const toggleDay = (day: string) => {
    setOpenDay((prev) => (prev === day ? '' : day));
  };

  const handleDialogOpen = (date: string) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentItems([{ item: '', quantity: 1, completed: false }]);
    setSuggestedItem(null);
  };

  const handleAddItem = () => {
    setCurrentItems([...currentItems, { item: '', quantity: 1, completed: false }]);
  };

  const handleItemChange = (index: number, field: string, value: string | number | boolean) => {
    const newItems = [...currentItems];
    (newItems[index] as any)[field] = value;
    setCurrentItems(newItems);
  };

  const handleSuggestedItem = (index: number) => {
    const lastItems = Object.values(plans)
      .flat()
      .map((plan) => plan.item);
    const suggestion = lastItems[lastItems.length - 1] || null;
    setSuggestedItem(suggestion);
    if (suggestion) {
      handleItemChange(index, 'item', suggestion);
    }
  };

  const handleSavePlan = () => {
    if (selectedDate) {
      const newPlans = { ...plans, [selectedDate]: [...(plans[selectedDate] || []), ...currentItems] };
      const sortedPlans = Object.keys(newPlans)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .reduce((acc, key) => {
          acc[key] = newPlans[key];
          return acc;
        }, {} as Record<string, { item: string; quantity: number; completed: boolean }[]>);
      setPlans(sortedPlans);
      handleDialogClose();
    }
  };

  const handleDeleteDay = (day: string) => {
    const newPlans = { ...plans };
    delete newPlans[day];
    setPlans(newPlans);
  };

  const currentMonthYear = `${new Date().toLocaleString('default', { month: 'long' })}, ${new Date().getFullYear()}`;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4E4C67] text-white p-4 h-full overflow-y-auto">
        <nav className="space-y-4">
          <a href="/purchaseplan" className="block py-2 px-4 bg-gray-700 rounded">Quản lý danh mục mua sắm</a>
          <a href="/shopping-plan" className="block py-2 px-4 hover:bg-gray-600">Kế hoạch mua sắm</a>
          <a href="/purchaseHistory" className="block py-2 px-4 hover:bg-gray-600">Lịch sử mua sắm</a>
          <a href="/purchaseManage" className="block py-2 px-4 hover:bg-gray-600">Thống kê</a>
        </nav>
        <div className="mt-8 space-y-4">
          <a href="/settings" className="block py-2 px-4 hover:bg-gray-600">Cài đặt</a>
          <a href="/blocklist" className="block py-2 px-4 hover:bg-gray-600">BlockList</a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4" style={{ color: '#4E4C67' }}>Quản lý danh mục mua sắm</h1>

        {/* Header with Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="border border-gray-300 rounded p-2 bg-white text-gray-700">
            {currentMonthYear}
          </div>
          <Button
            variant="contained"
            style={{ backgroundColor: '#4E4C67', color: '#fff' }}
            onClick={() => handleDialogOpen(new Date().toISOString().substring(0, 10))}
          >
            Thêm kế hoạch mới
          </Button>
        </div>

        {/* Shopping List by Date */}
        {Object.keys(plans).map((day) => (
          <div key={day} className="bg-[#F6EDED] shadow-lg rounded-md overflow-hidden mb-4">
            <div className="flex justify-between p-4 border-b bg-[#E3CFCF]">
              <h3 className="text-lg font-semibold text-gray-700 hover:text-black">{day}</h3>
              <div>
                <Button
                  style={{ marginRight: '10px', backgroundColor: '#4E4C67', color: '#fff' }}
                  onClick={() => handleDialogOpen(day)}
                >
                  Thêm món hàng
                </Button>
                <IconButton onClick={() => handleDeleteDay(day)}><Delete /></IconButton>
              </div>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-2 border-b">Tên món hàng</th>
                  <th className="p-2 border-b">Số lượng</th>
                  <th className="p-2 border-b">Đã mua</th>
                </tr>
              </thead>
              <tbody>
                {plans[day].map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-2 border-b text-black hover:font-bold">{item.item}</td>
                    <td className="p-2 border-b text-black">{item.quantity}</td>
                    <td className="p-2 border-b text-black">
                      <Checkbox
                        checked={item.completed}
                        onChange={(e) => {
                          const updatedPlans = { ...plans };
                          updatedPlans[day][index].completed = e.target.checked;
                          setPlans(updatedPlans);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* Dialog */}
        <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
          <DialogTitle style={{ backgroundColor: '#4E4C67', color: 'white' }}>Thêm kế hoạch</DialogTitle>
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
              <div className="flex items-center mb-4" key={index}>
                <TextField
                  fullWidth
                  placeholder="Tên món hàng"
                  value={item.item}
                  onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                />
                <Tooltip title={suggestedItem ? `Món hàng gợi ý: ${suggestedItem}` : "Không có gợi ý"}>
                  <IconButton onClick={() => handleSuggestedItem(index)}><HelpOutline /></IconButton>
                </Tooltip>
                <IconButton onClick={() => handleItemChange(index, 'quantity', Math.max((item.quantity || 1) - 1, 1))}><Remove /></IconButton>
                <span>{item.quantity}</span>
                <IconButton onClick={() => handleItemChange(index, 'quantity', (item.quantity || 1) + 1)}><Add /></IconButton>
              </div>
            ))}
            <Button onClick={handleAddItem} style={{ backgroundColor: '#4E4C67', color: 'white' }}>+ Thêm món hàng</Button>
          </DialogContent>
          <div className="flex justify-end p-4">
            <Button onClick={handleDialogClose}>Hủy</Button>
            <Button variant="contained" style={{ backgroundColor: '#4E4C67', color: 'white' }} onClick={handleSavePlan}>Thêm kế hoạch</Button>
          </div>
        </Dialog>
      </main>
    </div>
  );
};

export default ShoppingListPage;
