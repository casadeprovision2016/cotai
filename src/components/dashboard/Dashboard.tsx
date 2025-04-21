
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BidStatus, mockBids } from "@/lib/types";
import { Calendar, FileText, Kanban, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Dashboard = () => {
  // Count bids by status
  const bidsCount = {
    draft: mockBids.filter(bid => bid.status === BidStatus.Draft).length,
    inProgress: mockBids.filter(bid => bid.status === BidStatus.InProgress).length,
    review: mockBids.filter(bid => bid.status === BidStatus.Review).length,
    submitted: mockBids.filter(bid => bid.status === BidStatus.Submitted).length,
    won: mockBids.filter(bid => bid.status === BidStatus.Won).length,
    lost: mockBids.filter(bid => bid.status === BidStatus.Lost).length
  };

  // Create data for pie chart
  const bidStatusData = [
    { name: 'Rascunho', value: bidsCount.draft },
    { name: 'Em Progresso', value: bidsCount.inProgress },
    { name: 'Em Revisão', value: bidsCount.review },
    { name: 'Submetidas', value: bidsCount.submitted },
    { name: 'Ganhas', value: bidsCount.won },
    { name: 'Perdidas', value: bidsCount.lost },
  ];

  const COLORS = ['#D6BCFA', '#9B87F5', '#7E69AB', '#33C3F0', '#10B981', '#F87171'];

  const totalBids = mockBids.length;
  
  // Recent bids (top 3)
  const recentBids = [...mockBids].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  ).slice(0, 3);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Quick stats cards */}
        <Card className="shadow-mac">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Licitações Ativas</CardTitle>
            <Kanban className="h-4 w-4 text-cotai-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBids}</div>
            <p className="text-xs text-muted-foreground">
              +2 nas últimas 24h
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-mac">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prazos Próximos</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Nos próximos 7 dias
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-mac">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              2 não lidas
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-mac">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos</CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 pendentes de análise
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overview card with pie chart */}
        <Card className="shadow-mac">
          <CardHeader>
            <CardTitle>Visão Geral das Licitações</CardTitle>
            <CardDescription>Distribuição por status</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bidStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={90}
                    innerRadius={30}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={1}
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {bidStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} licitações`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent bids */}
        <Card className="shadow-mac">
          <CardHeader>
            <CardTitle>Licitações Recentes</CardTitle>
            <CardDescription>Últimas licitações adicionadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentBids.map((bid) => (
                <div key={bid.id} className="space-y-2">
                  <Link to={`/bid/${bid.id}`} className="block">
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2 ${
                        bid.status === BidStatus.InProgress 
                          ? 'bg-blue-500' 
                          : bid.status === BidStatus.Submitted 
                          ? 'bg-green-500' 
                          : 'bg-cotai-purple'
                      }`} />
                      <div className="font-medium hover:text-cotai-purple">{bid.title}</div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{bid.organization}</div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                      <span>Prazo: {bid.deadline.toLocaleDateString('pt-BR')}</span>
                      <span>Status: {
                        bid.status === BidStatus.Draft 
                          ? 'Rascunho' 
                          : bid.status === BidStatus.InProgress 
                          ? 'Em Progresso' 
                          : bid.status === BidStatus.Review 
                          ? 'Em Revisão' 
                          : bid.status === BidStatus.Submitted 
                          ? 'Submetida' 
                          : bid.status === BidStatus.Won 
                          ? 'Ganha' 
                          : 'Perdida'
                      }</span>
                    </div>

                    {/* Progress indicator */}
                    <Progress 
                      value={
                        bid.status === BidStatus.Draft 
                          ? 20 
                          : bid.status === BidStatus.InProgress 
                          ? 40 
                          : bid.status === BidStatus.Review 
                          ? 60 
                          : bid.status === BidStatus.Submitted 
                          ? 80 
                          : 100
                      } 
                      className="h-1.5 mt-1.5" 
                    />
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="shadow-mac">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Atalhos para tarefas comuns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/kanban" className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:bg-cotai-purple hover:text-white hover:border-cotai-purple transition-all shadow-sm hover:shadow-mac flex flex-col items-center justify-center gap-2">
                <Kanban className="h-6 w-6" />
                <span>Quadro Kanban</span>
              </Link>
              <Link to="/parser" className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:bg-cotai-purple hover:text-white hover:border-cotai-purple transition-all shadow-sm hover:shadow-mac flex flex-col items-center justify-center gap-2">
                <FileText className="h-6 w-6" />
                <span>Analisar Documento</span>
              </Link>
              <Link to="/messages" className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:bg-cotai-purple hover:text-white hover:border-cotai-purple transition-all shadow-sm hover:shadow-mac flex flex-col items-center justify-center gap-2">
                <MessageSquare className="h-6 w-6" />
                <span>Nova Mensagem</span>
              </Link>
              <Link to="/calendar" className="bg-white p-4 rounded-lg border border-gray-200 text-center hover:bg-cotai-purple hover:text-white hover:border-cotai-purple transition-all shadow-sm hover:shadow-mac flex flex-col items-center justify-center gap-2">
                <Calendar className="h-6 w-6" />
                <span>Calendário</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
