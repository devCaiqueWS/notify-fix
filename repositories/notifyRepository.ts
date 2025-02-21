import prisma from '@/lib/prisma';

export const getAllNotifications = async () => {
  return await prisma.notify.findMany();
};

export const getNotificationById = async (id: number) => {
  return await prisma.notify.findUnique({ where: { id } });
};

export const createNotification = async (data: {
  usuarioId: number;
  titulo: string;
  mensagem: string;
}) => {
  return await prisma.notify.create({ data });
};

export const updateNotification = async (id: number, data: { lido: boolean }) => {
  return await prisma.notify.update({
    where: { id },
    data,
  });
};

export const deleteNotification = async (id: number) => {
  return await prisma.notify.delete({ where: { id } });
};
