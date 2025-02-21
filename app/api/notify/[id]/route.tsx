import { NextResponse } from 'next/server';
import * as NotifyService from '@/services/notifyService';

export async function GET({ params }: { params: { id: string } }) {
  try {
    const notification = await NotifyService.getNotification(Number(params.id));
    if (!notification) {
      return NextResponse.json(
        { error: 'Notificação não encontrada' },
        { status: 404 }
      );
    }
    return NextResponse.json(notification);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: 'Erro ao buscar notificação',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}

export async function PUT({ params }: { params: { id: string } }) {
  try {
    await NotifyService.markAsRead(Number(params.id));
    return NextResponse.json({ status: 'marked as read' });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: 'Erro ao marcar notificação como lida',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    await NotifyService.removeNotification(Number(params.id));
    return NextResponse.json({ status: 'deleted' });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: 'Erro ao deletar notificação',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}
