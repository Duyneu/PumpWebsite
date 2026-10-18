export interface AuditLogItem {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  title: string;
  detail: string;
  timestamp: string;
}

const STORAGE_KEY = 'voltor_admin_audit_logs';

export function getAuditLogs(): AuditLogItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addAuditLog(action: 'CREATE' | 'UPDATE' | 'DELETE', title: string, detail: string) {
  try {
    const current = getAuditLogs();
    const newLog: AuditLogItem = {
      id: 'log_' + Date.now(),
      action,
      title,
      detail,
      timestamp: new Date().toLocaleString('vi-VN'),
    };
    const updated = [newLog, ...current].slice(0, 50); // Lưu 50 logs gần nhất
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save audit log', e);
  }
}

export function clearAuditLogs() {
  localStorage.removeItem(STORAGE_KEY);
}
