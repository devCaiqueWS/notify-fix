import { NextResponse } from 'next/server';
import * as NotifyService from '@/services/notifyService';

export async function GET({ params }: { params: { id: string } }) {
  const notification = await NotifyService.getNotification(Number(params.id));
  return NextResponse.json(notification);
}

export async function PUT({ params, request }: { params: { id: string }; request: Request }) {
  await NotifyService.markAsRead(Number(params.id));
  return NextResponse.json({ status: 'marked as read' });
}

export async function DELETE({ params }: { params: { id: string } }) {
  await NotifyService.removeNotification(Number(params.id));
  return NextResponse.json({ status: 'deleted' });
}
