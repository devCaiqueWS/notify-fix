import * as NotifyRepo from '@/repositories/notifyRepository';

export const listNotifications = async () => {
  return await NotifyRepo.getAllNotifications();
};

export const getNotification = async (id: number) => {
  return await NotifyRepo.getNotificationById(id);
};

export const addNotification = async (usuarioId: number, titulo: string, mensagem: string) => {
  return await NotifyRepo.createNotification({ usuarioId, titulo, mensagem });
};

export const markAsRead = async (id: number) => {
  return await NotifyRepo.updateNotification(id, { lido: true });
};

export const removeNotification = async (id: number) => {
  return await NotifyRepo.deleteNotification(id);
};
