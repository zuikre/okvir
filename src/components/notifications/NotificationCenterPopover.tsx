import React, { useState, useRef, useEffect } from 'react';
import { useOkvirStore } from '../../lib/store';
import { audio } from '../../lib/audio';
import type { AppNotificationRecord } from '../../lib/types';

import { Flame, Brain, Award, Zap, Bell, CheckCheck, Trash2 } from 'lucide-react';

interface NotificationCenterPopoverProps {
  className?: string;
}

export const NotificationCenterPopover: React.FC<NotificationCenterPopoverProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const {
    language,
    notificationsHistory,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotificationHistory,
    setCurrentView,
  } = useOkvirStore();

  const isRtl = language === 'ar';
  const unreadCount = notificationsHistory.filter((n) => !n.read).length;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    audio.playClick(1.2);
    setIsOpen(!isOpen);
  };

  const handleItemClick = (record: AppNotificationRecord) => {
    audio.playClick(1.4);
    markNotificationAsRead(record.id);
    if (record.actionView) {
      setCurrentView(record.actionView);
      setIsOpen(false);
    }
  };

  const renderCategoryIcon = (category: AppNotificationRecord['category']) => {
    switch (category) {
      case 'daily_streak':
        return <Flame size={16} className="text-amber-400 shrink-0" />;
      case 'fsrs_reviews':
        return <Brain size={16} className="text-sky-400 shrink-0" />;
      case 'milestone':
        return <Award size={16} className="text-emerald-400 shrink-0" />;
      case 'updater':
        return <Zap size={16} className="text-purple-400 shrink-0" />;
      default:
        return <Bell size={16} className="text-zinc-400 shrink-0" />;
    }
  };

  const formatRelativeTime = (timestamp: number) => {
    const diffSec = Math.floor((Date.now() - timestamp) / 1000);
    if (diffSec < 60) return isRtl ? 'الآن' : 'Just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return isRtl ? `منذ ${diffMin} د` : `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return isRtl ? `منذ ${diffHours} س` : `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return isRtl ? `منذ ${diffDays} ي` : `${diffDays}d ago`;
  };

  return (
    <div className={`relative inline-block ${className}`} ref={popoverRef}>
      {/* Bell Action Button */}
      <button
        onClick={toggleOpen}
        aria-label={isRtl ? 'مركز الإشعارات' : 'Notification Center'}
        className={`relative p-1.5 rounded-lg border transition-all flex items-center justify-center ${
          isOpen
            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
            : 'bg-zinc-900/60 hover:bg-zinc-800/80 border-zinc-700/60 text-zinc-300 hover:text-zinc-100'
        }`}
        title={isRtl ? 'مركز الإشعارات' : 'Notification Center'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>

        {/* Unread Pill Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-black text-white shadow-md shadow-rose-950/60 animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Flyout Popover */}
      {isOpen && (
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className={`absolute top-full mt-2 w-80 sm:w-96 rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/80 shadow-2xl shadow-black/80 z-50 overflow-hidden flex flex-col ${
            isRtl ? 'left-0' : 'right-0'
          }`}
          style={{ maxHeight: '420px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60 bg-zinc-900/40">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-zinc-100">
                {isRtl ? 'مركز الإشعارات' : 'Notification Center'}
              </span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {unreadCount} {isRtl ? 'جديد' : 'new'}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              {unreadCount > 0 && (
                <button
                  onClick={() => {
                    audio.playClick();
                    markAllNotificationsAsRead();
                  }}
                  className="text-zinc-400 hover:text-emerald-400 transition-colors font-medium"
                >
                  {isRtl ? 'تحديد الكل كمقروء' : 'Mark all read'}
                </button>
              )}
              {notificationsHistory.length > 0 && (
                <button
                  onClick={() => {
                    audio.playClick();
                    clearNotificationHistory();
                  }}
                  className="text-zinc-500 hover:text-rose-400 transition-colors"
                >
                  {isRtl ? 'مسح' : 'Clear'}
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1 divide-y divide-zinc-900/80">
            {notificationsHistory.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                <Bell size={28} className="text-zinc-600/60" />
                <p className="text-xs text-zinc-400 font-medium">
                  {isRtl ? 'لا توجد إشعارات حالياً' : 'No notifications yet'}
                </p>
                <p className="text-[11px] text-zinc-600 max-w-xs">
                  {isRtl
                    ? 'ستظهر هنا تذكيرات السلاسل اليومية وتنبيهات المراجعة الفاصلة FSRS.'
                    : 'Daily streak reminders and FSRS review thresholds will appear here.'}
                </p>
              </div>
            ) : (
              notificationsHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`p-3.5 transition-colors cursor-pointer flex items-start gap-3 ${
                    item.read
                      ? 'bg-transparent hover:bg-zinc-900/40 text-zinc-400'
                      : 'bg-emerald-500/5 hover:bg-emerald-500/10 text-zinc-200 border-s-2 border-emerald-500'
                  }`}
                >
                  <div className="mt-0.5 p-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                    {renderCategoryIcon(item.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4
                        className={`text-xs font-semibold truncate ${
                          item.read ? 'text-zinc-300' : 'text-zinc-100 font-bold'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-zinc-500 whitespace-nowrap">
                        {formatRelativeTime(item.timestamp)}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                      {item.body}
                    </p>
                    {item.actionView && (
                      <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                        <span>{isRtl ? 'انتقل إلى' : 'Go to'}</span>
                        <span className="font-bold underline uppercase">{item.actionView}</span>
                        <span>→</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
