'use client';
import Head from 'next/head';
import Button from '@/components/button';
import Sidebar from '@/components/sidebar';
import UserCard from '@/components/usercard';
import Calendar from '@/components/calendar';
import Input from '@/components/input';
import { Event } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import React, {  useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CalendarPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDuration, setNewDuration] = useState('');

  const openModal = (time: string) => {
       setSelectedTime(time)
      setIsModalOpen(true);
  };
  const closeModal = () => {
      setIsModalOpen(false);
      setNewTitle('')
      setNewDescription('')
      setNewDuration('')
     setSelectedTime(null);
  };
  const addEvent = () => {
      if (selectedTime && newTitle && newDescription && newDuration) {
         const newEvent: Event = {
             id: uuidv4(),
              time: selectedTime,
              title: newTitle,
              description: newDescription,
              duration: newDuration,
              avatarSrc: '/images/owl-avatar.svg'
          };
           setEvents([...events, newEvent]);
          closeModal();
      } else {
          alert('Please fill all the fields')
      }
  };
  const renderEvent = (time: string) => {
      const event = events.find((e) => e.time === time);
      if (event) {
         return (
              <div className="relative">
                 <div className="bg-purple-100 border-l-4 border-primary rounded-md p-3 absolute w-full z-10">
                     <div className="flex items-center mb-2">
                         <img src={event.avatarSrc} alt="avatar" className="w-6 h-6 rounded-full mr-2" />
                          <span className="font-semibold text-gray-800">14/2/2025</span>
                     </div>
                     <h4 className="font-semibold text-gray-800">{event.title}</h4>
                    <p className="text-gray-500">{event.description}</p>
                    <div className="flex items-center mt-2 text-gray-500">
                        <img src="/images/clock-blue-icon.svg" alt="clock" className="w-4 h-4 mr-1" />
                        <span>{event.duration}</span>
                    </div>
                 </div>
             </div>
         );
     }
     return  <div onClick={() => openModal(time)} className="flex justify-end p-2 cursor-pointer hover:bg-gray-200">
          <img src="/images/plus-icon.svg" alt="add" className="w-4 h-4" />
        </div>
 };
   const timeSlots = [
      "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];
  const sidebarItems = [
      { text: "Quản lý lịch trình", href: "/calendar", icon: <img src="/images/list-icon.svg" alt="calendar" className="w-5 h-5" /> },
      { text: "Quản lý lịch trình", href: "/calendar" },
      { text: "Cài đặt", href: "/calendarsettings" },
  ];
  return (
      <div>
          <div className="flex h-screen">
              {/* Sidebar */}
            <Sidebar items={sidebarItems} />
              {/* Main Content */}
              <main className="flex-1 p-6 overflow-y-auto bg-gray-100 mt-14">
                  {/* Navbar */}
                  <header className="flex justify-between items-center mb-6">
                       <h2 className="text-3xl font-semibold text-gray-800">Lịch trình chung</h2>
                      <div className="flex items-center space-x-4">
                          <div className="border rounded-md p-2 px-4 text-gray-600 flex items-center justify-between" style={{borderWidth: '1px'}}>
                              <span>February</span>
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                          </div>
                          <Button className="whitespace-nowrap">Add new</Button>
                      </div>
                  </header>
                <div className="flex items-center justify-between mb-8">
                 {/* Calendar */}
                  <div className="bg-white p-6 rounded-lg shadow-md mb-8 relative">
                      <div className="flex justify-between items-center mb-4">
                           <div className="text-gray-600">February, 14-20</div>
                      </div>
                      {/* <div className="grid grid-cols-7 gap-4 mb-4">
                         <div className="text-center font-semibold text-gray-600">Week</div>
                          <div className="text-center font-medium text-gray-600">14<br/><span className="text-sm font-normal">Sun</span></div>
                          <div className="text-center font-medium text-gray-600">15<br/><span className="text-sm font-normal">Mon</span></div>
                           <div className="text-center font-medium text-gray-800 bg-purple-100 rounded-md px-2 py-1">16<br/><span className="text-sm font-normal">Tue</span></div>
                          <div className="text-center font-medium text-gray-600">17<br/><span className="text-sm font-normal">Wed</span></div>
                          <div className="text-center font-medium text-gray-600">18<br/><span className="text-sm font-normal">Thu</span></div>
                          <div className="text-center font-medium text-gray-600">19<br/><span className="text-sm font-normal">Fri</span></div>
                           <div className="text-center font-medium text-gray-600">20<br/><span className="text-sm font-normal">Sat</span></div>
                      </div>
                      <div className="grid grid-cols-7 gap-4 border-t border-gray-200 relative">
                          {timeSlots.map(time => (
                              <React.Fragment key={time}>
                               <div className="text-right text-gray-500 py-2">{time}</div>
                              <div className="py-2 relative">
                                  {renderEvent(time)}
                              </div>
                              <div className="py-2 relative"></div>
                                  <div className="py-2 relative"></div>
                                 <div className="py-2 relative"></div>
                                  <div className="py-2 relative"></div>
                                  <div className="py-2 relative"></div>
                                   <div className="py-2 relative"></div>
                            </React.Fragment>
                          ))}
                      </div> */}
                      <Calendar></Calendar>

                  </div>
                  {/* User List */}
                  <div className="flex flex-col gap-4 w-2/12">
                      <UserCard
                          name="Bố"
                         status="Last online"
                         avatarSrc="/images/avatar1.png" 
                         
                      />
                      <UserCard
                           name="Mẹ"
                          status="Online"
                         avatarSrc="/images/avatar2.png"
                      />
                       <UserCard
                          name="Con gái"
                         status="Online"
                          avatarSrc="/images/avatar3.png"
                      />
                 </div>
                 </div>
              </main>
                 {/* Modal */}
               {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className=" bg-white p-6 rounded-lg shadow-xl w-fit">
                          <h2 className="text-xl  text- font-bold mb-4">Thêm Lịch Trình</h2>
                          <div className="mb-4">
                              <span className="mr-2 text-gray-600">Ngày dự tính:</span>
                              <span className="font-semibold text-gray-800">14/2/2025</span>
                          </div>
                          <div className="text-gray-600 mb-2">Danh sách Việc cần làm</div>
                         <div className="flex gap-4 mb-4">
                             <Input
                                placeholder="Tiêu đề"
                                value={newTitle}
                                 onChange={(e) => setNewTitle(e.target.value)}
                              />
                              <Input
                                  placeholder="Công việc cụ thể"
                                  value={newDescription}
                                 onChange={(e) => setNewDescription(e.target.value)}
                              />
                              <Input
                                 placeholder="Thời gian"
                                 value={newDuration}
                                 onChange={(e) => setNewDuration(e.target.value)}
                              />
                          </div>
                          <button className="text-gray-500 hover:text-gray-700 flex items-center">
                              <img src="/images/plus-icon.svg" alt="plus" className="w-4 h-4 mr-1" />
                              <span>Thêm người tham gia</span>
                          </button>
                          <div className="flex justify-end mt-4">
                               <button onClick={closeModal} className="px-4 py-2 rounded-md text-gray-600 border border-gray-300 mr-2 hover:bg-gray-100">Hủy</button>
                              <Button onClick={addEvent}>Thêm kế hoạch</Button>
                          </div>
                      </div>
                 </div>
             )}
          </div>
      </div>
  );
};

export default CalendarPage;