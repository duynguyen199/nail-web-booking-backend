import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class NotificationGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log('🔗 Client connected:', client.id);
  }

  // 🔥 Auto-listens when service emits 'notification.created'
  @OnEvent('notification.created')
  handleNotificationCreated(notification: any) {
    this.server.emit(`notification:${notification.userId}`, notification);
  }

  // Optionally emit manually (still supported)
  emitNotification(userId: string, notification: any) {
    this.server.to(userId).emit('notification', notification);
  }
}
