
import AppShell from "@/components/layout/AppShell";
import KanbanBoard from "@/components/kanban/KanbanBoard";

const KanbanPage = () => {
  return (
    <AppShell title="Quadro Kanban">
      <KanbanBoard />
    </AppShell>
  );
};

export default KanbanPage;
