"use client";

import { useState, useEffect } from 'react';
import { FiBell, FiX } from 'react-icons/fi';

type Notification = {
  id: number;
  usuarioId: number;
  lido: boolean;
  titulo: string;
  mensagem: string;
  createdAt: string;
};

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/notify')
      .then((response) => response.json())
      .then((data: Notification[]) => {
        const unreadNotifications = data.filter(notification => !notification.lido);
        setNotifications(unreadNotifications);
      });
  }, []);

  const markAsRead = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/notify/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lido: true }),
      });

      if (response.ok) {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
      } else {
        console.error('Erro ao atualizar notificação');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="relative p-2 rounded-full focus:outline-none"
      >
        <FiBell className="w-6 h-6 text-amber-500" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[#0a0e27] border border-gray-700 rounded-lg shadow-lg z-50" style={{width: '15rem', textAlign: 'end'}}>
          <div className="flex items-center justify-between p-4 border-b border-gray-700" style={{display: 'flex', justifyContent: 'space-between', padding: '1rem 0'}}>
            <h3 className="text-lg font-semibold text-white">Notificações</h3>
            <button onClick={toggleNotifications} className="focus:outline-none">
              <FiX className="w-6 h-6 text-amber-500" />
            </button>
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {notifications.map((notification) => (
              <li key={notification.id} className="p-4 hover:bg-[#1c2240]">
                <hr />
                <h4 className="font-bold text-white">{notification.titulo}</h4>
                <p className="text-sm text-gray-300">{notification.mensagem}</p>
                <span className="text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
                <div className="mt-2">
                  <button
                    className="text-amber-500 hover:text-amber-300"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Marcar como lida
                  </button>
                </div>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
