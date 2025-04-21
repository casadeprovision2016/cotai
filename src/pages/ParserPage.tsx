
import AppShell from "@/components/layout/AppShell";
import DocumentParser from "@/components/parser/DocumentParser";

const ParserPage = () => {
  return (
    <AppShell title="Analisador de Documentos">
      <DocumentParser />
    </AppShell>
  );
};

export default ParserPage;
