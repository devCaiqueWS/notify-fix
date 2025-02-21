import { NextResponse } from "next/server";
import * as NotifyService from "@/services/notifyService";

export async function GET() {
  try {
    const notifications = await NotifyService.listNotifications();
    return NextResponse.json(notifications);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: 'Erro ao listar notificações',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { usuarioId, titulo, mensagem } = await req.json();
    const newNotification = await NotifyService.addNotification(usuarioId, titulo, mensagem);
    return NextResponse.json(newNotification);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: 'Erro ao criar a notificação',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}
