import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SessionsService } from '../sessions/sessions.service';

interface ClientData {
  userId: string;
  sessionId: string;
  deviceInfo?: {
    type: string;
    model: string;
    os: string;
    browser: string;
  };
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private sessionsService: SessionsService) {}

  handleConnection(client: Socket) {
    console.log(`Sweven Games client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Sweven Games client disconnected: ${client.id}`);
  }

  @SubscribeMessage('initialize_connection')
  handleInitializeConnection(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId: string; deviceInfo: any }
  ) {
    // Store client information
    client.data = {
      userId: data.userId,
      sessionId: null,
      deviceInfo: {
        type: data.deviceInfo.type || 'unknown',
        model: data.deviceInfo.model || 'unknown',
        os: data.deviceInfo.os || 'unknown',
        browser: data.deviceInfo.browser || 'unknown'
      }
    };

    console.log(`Connection initialized for user ${data.userId} with device:`, data.deviceInfo);
  }

  @SubscribeMessage('join_session')
  handleJoinSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; userId: string },
  ) {
    const clientData = client.data as ClientData;
    client.join(data.sessionId);
    clientData.sessionId = data.sessionId;
    clientData.userId = data.userId;
    
    // Notify others in the session
    client.to(data.sessionId).emit('user_joined', {
      userId: data.userId,
      sessionId: data.sessionId,
      deviceInfo: clientData.deviceInfo
    });
    
    console.log(`User ${data.userId} joined session ${data.sessionId} from ${clientData.deviceInfo.os} ${clientData.deviceInfo.browser}`);
  }

  @SubscribeMessage('webrtc_offer')
  handleWebRTCOffer(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; offer: any },
  ) {
    client.to(data.sessionId).emit('webrtc_offer', { 
      offer: data.offer,
      senderId: client.id
    });
  }

  @SubscribeMessage('webrtc_answer')
  handleWebRTCAnswer(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; answer: any },
  ) {
    client.to(data.sessionId).emit('webrtc_answer', { 
      answer: data.answer,
      senderId: client.id
    });
  }

  @SubscribeMessage('webrtc_ice_candidate')
  handleWebRTCICECandidate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; candidate: any },
  ) {
    client.to(data.sessionId).emit('webrtc_ice_candidate', { 
      candidate: data.candidate,
      senderId: client.id
    });
  }

  @SubscribeMessage('leave_session')
  handleLeaveSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string },
  ) {
    const clientData = client.data as ClientData;
    client.leave(data.sessionId);
    
    // Notify others in the session
    client.to(data.sessionId).emit('user_left', {
      userId: clientData.userId,
      sessionId: data.sessionId,
      deviceId: client.id
    });
    
    console.log(`User ${clientData.userId} from ${clientData.deviceInfo.os} left session ${data.sessionId}`);
  }
}