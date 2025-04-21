
import { useState } from 'react';
import { Message, mockMessages, mockUsers } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, User, Send, Paperclip, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MessageCenter = () => {
  const [messages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyContent, setReplyContent] = useState('');

  const filteredMessages = messages.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mockUsers.find((user) => user.id === message.sender)?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendReply = () => {
    if (replyContent.trim() === '') return;
    
    // In a real app, this would send the reply to a backend
    console.log('Sending reply:', replyContent);
    
    // Clear the reply field
    setReplyContent('');
  };

  return (
    <div className="h-full flex">
      {/* Messages list */}
      <div className="w-1/3 border-r border-gray-200 pr-4 overflow-y-auto">
        <div className="pb-4 mb-2 sticky top-0 bg-white z-10">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar mensagens..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="w-full bg-cotai-purple hover:bg-cotai-purple/90">
            Nova Mensagem
          </Button>
        </div>
        
        <div className="space-y-2">
          {filteredMessages.length === 0 ? (
            <Card className="p-4 text-center text-gray-500">
              Nenhuma mensagem encontrada
            </Card>
          ) : (
            filteredMessages.map((message) => {
              const sender = mockUsers.find((user) => user.id === message.sender);
              return (
                <div
                  key={message.id}
                  className={cn(
                    "p-3 rounded-md cursor-pointer hover:bg-gray-100 transition",
                    !message.read && "bg-blue-50 hover:bg-blue-100",
                    selectedMessage?.id === message.id && "bg-cotai-purple/10 hover:bg-cotai-purple/20"
                  )}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium truncate flex-1">
                      {!message.read && (
                        <span className="inline-block w-2 h-2 bg-cotai-purple rounded-full mr-2"></span>
                      )}
                      {sender?.name || 'Unknown User'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(message.createdAt, 'dd MMM', { locale: ptBR })}
                    </div>
                  </div>
                  <div className="font-medium text-sm truncate">{message.subject}</div>
                  <div className="text-sm text-gray-500 truncate mt-1">
                    {message.content.substring(0, 60)}...
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Message detail */}
      <div className="flex-1 pl-4 flex flex-col">
        {selectedMessage ? (
          <>
            <div className="mb-4 border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold">{selectedMessage.subject}</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Marcar como não lida</DropdownMenuItem>
                    <DropdownMenuItem>Arquivar</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center mt-2">
                {(() => {
                  const sender = mockUsers.find((user) => user.id === selectedMessage.sender);
                  return (
                    <>
                      {sender?.avatar ? (
                        <img src={sender.avatar} alt={sender.name} className="w-8 h-8 rounded-full mr-3" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{sender?.name || 'Unknown User'}</div>
                        <div className="text-xs text-gray-500">
                          {format(selectedMessage.createdAt, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
                            locale: ptBR,
                          })}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto mb-4">
              <div className="prose max-w-none">
                <p>{selectedMessage.content}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-4">
                <Textarea
                  placeholder="Digite sua resposta..."
                  className="flex-1"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
              </div>
              <div className="flex justify-between mt-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button 
                  className="bg-cotai-purple hover:bg-cotai-purple/90"
                  onClick={handleSendReply}
                  disabled={replyContent.trim() === ''}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Resposta
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <MailIcon className="h-16 w-16 mb-4" />
            <p className="text-xl font-medium">Selecione uma mensagem</p>
            <p className="text-sm">Clique em uma mensagem à esquerda para visualizar</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Custom Mail icon for the empty state
const MailIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
      />
    </svg>
  );
};

// Import cn function directly to avoid missing import error
function cn(...inputs: (string | boolean | undefined | null)[]) {
  return inputs.filter(Boolean).join(" ");
}

export default MessageCenter;
