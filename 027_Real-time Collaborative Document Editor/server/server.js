const WebSocket = require('ws');
const { nanoid } = require('nanoid');

const wss = new WebSocket.Server({ port: 3001 });
const connections = new Map();
const documents = new Map();

// Default document
documents.set('default-doc', {
  id: 'default-doc',
  content: '# Welcome to Collaborative Editor!\n\nStart typing here...',
  users: new Set(),
  createdAt: new Date()
});

wss.on('connection', (ws) => {
  const userId = nanoid();
  const user = {
    id: userId,
    ws,
    name: `User-${userId.slice(0, 4)}`,
    color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
    cursorPosition: 0,
    documentId: 'default-doc'
  };

  connections.set(userId, user);
  console.log(`User connected: ${user.name}`);

  // Join default document
  joinDocument(user, 'default-doc');

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      handleMessage(user, message);
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    console.log(`User disconnected: ${user.name}`);
    leaveDocument(user);
    connections.delete(userId);
    broadcastUserList(user.documentId);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  // Send initial data
  ws.send(JSON.stringify({
    type: 'init',
    userId,
    user,
    document: documents.get('default-doc')
  }));
});

function handleMessage(user, message) {
  switch (message.type) {
    case 'edit':
      handleEdit(user, message);
      break;
    case 'cursor':
      handleCursor(user, message);
      break;
    case 'rename':
      user.name = message.name || user.name;
      broadcastUserList(user.documentId);
      break;
    case 'join':
      joinDocument(user, message.documentId);
      break;
  }
}

function handleEdit(user, message) {
  const doc = documents.get(user.documentId);
  if (doc) {
    doc.content = message.content;
    doc.updatedAt = new Date();
    
    // Broadcast to all users in the same document except sender
    const usersInDoc = doc.users;
    usersInDoc.forEach(userId => {
      const otherUser = connections.get(userId);
      if (otherUser && otherUser.id !== user.id) {
        otherUser.ws.send(JSON.stringify({
          type: 'edit',
          content: message.content,
          userId: user.id,
          user
        }));
      }
    });
  }
}

function handleCursor(user, message) {
  user.cursorPosition = message.position;
  
  // Broadcast cursor position to other users in the same document
  const doc = documents.get(user.documentId);
  if (doc) {
    doc.users.forEach(userId => {
      const otherUser = connections.get(userId);
      if (otherUser && otherUser.id !== user.id) {
        otherUser.ws.send(JSON.stringify({
          type: 'cursor',
          userId: user.id,
          position: message.position,
          user
        }));
      }
    });
  }
}

function joinDocument(user, documentId) {
  // Leave current document
  leaveDocument(user);
  
  // Join new document
  user.documentId = documentId;
  
  if (!documents.has(documentId)) {
    documents.set(documentId, {
      id: documentId,
      content: '',
      users: new Set(),
      createdAt: new Date()
    });
  }
  
  const doc = documents.get(documentId);
  doc.users.add(user.id);
  
  // Send document content to user
  user.ws.send(JSON.stringify({
    type: 'document',
    document: doc
  }));
  
  broadcastUserList(documentId);
}

function leaveDocument(user) {
  const doc = documents.get(user.documentId);
  if (doc) {
    doc.users.delete(user.id);
    broadcastUserList(user.documentId);
  }
}

function broadcastUserList(documentId) {
  const doc = documents.get(documentId);
  if (!doc) return;

  const users = Array.from(doc.users)
    .map(userId => connections.get(userId))
    .filter(user => user)
    .map(({ id, name, color }) => ({ id, name, color }));

  doc.users.forEach(userId => {
    const user = connections.get(userId);
    if (user) {
      user.ws.send(JSON.stringify({
        type: 'users',
        users
      }));
    }
  });
}

console.log('WebSocket server running on ws://localhost:3001');