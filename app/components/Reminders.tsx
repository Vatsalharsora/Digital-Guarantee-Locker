import { useState } from 'react';
import { motion } from "framer-motion";

interface RemindersProps {
  onBack: () => void;
}

interface Reminder {
  id: number;
  productName: string;
  type: 'expiry' | 'maintenance' | 'renewal';
  date: string;
  daysLeft: number;
  priority: 'high' | 'medium' | 'low';
  message: string;
  isRead: boolean;
}

export const Reminders = ({ onBack }: RemindersProps) => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data - in real app, this would come from an API
  const reminders: Reminder[] = [
    {
      id: 1,
      productName: 'LG Refrigerator 260L',
      type: 'expiry',
      date: '2025-03-20',
      daysLeft: 45,
      priority: 'high',
      message: 'Warranty expires in 45 days. Consider service check or extended warranty.',
      isRead: false
    },
    {
      id: 2,
      productName: 'Samsung Galaxy S24',
      type: 'maintenance',
      date: '2025-02-15',
      daysLeft: 12,
      priority: 'medium',
      message: 'Recommended service check-up for optimal performance.',
      isRead: false
    },
    {
      id: 3,
      productName: 'Dell Inspiron Laptop',
      type: 'renewal',
      date: '2025-02-28',
      daysLeft: 25,
      priority: 'medium',
      message: 'Consider renewing extended warranty for continued protection.',
      isRead: true
    },
    {
      id: 4,
      productName: 'Sony Headphones',
      type: 'expiry',
      date: '2024-12-15',
      daysLeft: -49,
      priority: 'high',
      message: 'Warranty has expired. Product is no longer covered.',
      isRead: false
    },
    {
      id: 5,
      productName: 'Godrej Steel Almirah',
      type: 'maintenance',
      date: '2025-03-01',
      daysLeft: 26,
      priority: 'low',
      message: 'Annual maintenance recommended for locks and hinges.',
      isRead: true
    }
  ];

  const filters = [
    { id: 'all', label: 'All Reminders', count: reminders.length },
    { id: 'unread', label: 'Unread', count: reminders.filter(r => !r.isRead).length },
    { id: 'expiry', label: 'Expiring Soon', count: reminders.filter(r => r.type === 'expiry' && r.daysLeft > 0).length },
    { id: 'expired', label: 'Expired', count: reminders.filter(r => r.daysLeft < 0).length }
  ];

  const filteredReminders = reminders.filter(reminder => {
    switch (activeFilter) {
      case 'unread':
        return !reminder.isRead;
      case 'expiry':
        return reminder.type === 'expiry' && reminder.daysLeft > 0;
      case 'expired':
        return reminder.daysLeft < 0;
      default:
        return true;
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'expiry':
        return '⏰';
      case 'maintenance':
        return '🔧';
      case 'renewal':
        return '🔄';
      default:
        return '📋';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'expiry':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800';
      case 'renewal':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const markAsRead = (id: number) => {
    // In real app, this would update the backend
    console.log(`Marking reminder ${id} as read`);
  };

  const deleteReminder = (id: number) => {
    // In real app, this would delete from backend
    console.log(`Deleting reminder ${id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reminders & Notifications</h1>
        <p className="text-gray-600">Stay on top of your warranty expirations and maintenance schedules</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {filteredReminders.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No reminders found</h3>
            <p className="text-gray-600">
              {activeFilter === 'all' 
                ? "You're all caught up! No pending reminders."
                : `No ${activeFilter} reminders at the moment.`
              }
            </p>
          </div>
        ) : (
          filteredReminders.map(reminder => (
            <motion.div
              key={reminder.id}
              layout
              className={`bg-white rounded-lg border border-gray-200 p-6 ${
                !reminder.isRead ? 'border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{getTypeIcon(reminder.type)}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{reminder.productName}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(reminder.type)}`}>
                          {reminder.type.charAt(0).toUpperCase() + reminder.type.slice(1)}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(reminder.priority)}`}>
                          {reminder.priority.toUpperCase()} PRIORITY
                        </span>
                        {!reminder.isRead && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            NEW
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{reminder.message}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>📅 {formatDate(reminder.date)}</span>
                    <span>
                      {reminder.daysLeft > 0 
                        ? `⏳ ${reminder.daysLeft} days left`
                        : reminder.daysLeft === 0
                        ? '🔴 Due today'
                        : `❌ Overdue by ${Math.abs(reminder.daysLeft)} days`
                      }
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {!reminder.isRead && (
                    <button
                      onClick={() => markAsRead(reminder.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      ✓
                    </button>
                  )}
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete reminder"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {reminder.type === 'expiry' && reminder.daysLeft > 0 && (
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      Extend Warranty
                    </button>
                  )}
                  {reminder.type === 'maintenance' && (
                    <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                      Schedule Service
                    </button>
                  )}
                  {reminder.type === 'renewal' && (
                    <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                      Renew Now
                    </button>
                  )}
                  <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                    View Product
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                    Snooze
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center transition-colors">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-medium text-gray-900">Notification Settings</div>
            <div className="text-sm text-gray-600">Customize reminder preferences</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center transition-colors">
            <div className="text-2xl mb-2">📧</div>
            <div className="font-medium text-gray-900">Email Reminders</div>
            <div className="text-sm text-gray-600">Set up email notifications</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center transition-colors">
            <div className="text-2xl mb-2">📱</div>
            <div className="font-medium text-gray-900">SMS Alerts</div>
            <div className="text-sm text-gray-600">Enable mobile notifications</div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};