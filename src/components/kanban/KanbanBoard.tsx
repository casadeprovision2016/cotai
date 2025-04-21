
import { useState } from 'react';
import { Bid, BidStatus, mockBids } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface KanbanColumnProps {
  title: string;
  bids: Bid[];
  status: BidStatus;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onDrop: React.DragEventHandler<HTMLDivElement>;
}

const KanbanColumn = ({ title, bids, status, onDragOver, onDrop }: KanbanColumnProps) => {
  return (
    <div 
      className="kanban-column"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e)}
      data-status={status}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{title}</h3>
        <Badge variant="outline" className="text-xs">{bids.length}</Badge>
      </div>
      <div className="space-y-2 min-h-[100px]">
        {bids.map((bid) => (
          <div 
            key={bid.id} 
            draggable 
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', bid.id);
            }}
            className="kanban-card"
          >
            <div className="font-medium">{bid.title}</div>
            <div className="text-sm text-gray-500 mt-1 truncate">{bid.organization}</div>
            <div className="flex justify-between mt-2 text-xs text-gray-500 items-center">
              <div className="flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1" />
                <span>{bid.deadline.toLocaleDateString('pt-BR')}</span>
              </div>
              <div>
                <Badge className="text-xs" variant="secondary">{bid.budget.estimatedValue.toLocaleString('pt-BR')} {bid.budget.currency}</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const KanbanBoard = () => {
  const [bids, setBids] = useState<Bid[]>(mockBids);

  const getBidsByStatus = (status: BidStatus) => {
    return bids.filter((bid) => bid.status === status);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: BidStatus) => {
    e.preventDefault();
    
    const bidId = e.dataTransfer.getData('text/plain');
    
    setBids((prevBids) => 
      prevBids.map((bid) => 
        bid.id === bidId 
          ? { ...bid, status, updatedAt: new Date() } 
          : bid
      )
    );
  };

  const columns = [
    { title: "Rascunho", status: BidStatus.Draft },
    { title: "Em Progresso", status: BidStatus.InProgress },
    { title: "Em Revisão", status: BidStatus.Review },
    { title: "Submetidas", status: BidStatus.Submitted },
    { title: "Ganhas", status: BidStatus.Won },
    { title: "Perdidas", status: BidStatus.Lost }
  ];

  return (
    <div className="h-full overflow-x-auto">
      <div className="flex gap-6 min-w-max pb-6">
        {columns.map((column) => (
          <KanbanColumn 
            key={column.status}
            title={column.title}
            status={column.status}
            bids={getBidsByStatus(column.status)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.status)}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
