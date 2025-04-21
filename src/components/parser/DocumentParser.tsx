
import { useState, useRef } from 'react';
import { FileText, FileUp, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const DocumentParser = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [parseProgress, setParseProgress] = useState(0);
  const [parsedData, setParsedData] = useState<Record<string, any> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setParsedData(null);
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          simulateParsing();
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const simulateParsing = () => {
    setIsParsing(true);
    setParseProgress(0);
    
    const interval = setInterval(() => {
      setParseProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsParsing(false);
          displayResults();
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const displayResults = () => {
    // Simulated parsed data - this would come from actual NLP processing
    const mockParsedData = {
      title: "Pregão Eletrônico Nº 45/2023",
      organization: "Prefeitura Municipal de São Paulo",
      bidType: "Pregão Eletrônico",
      bidNumber: "45/2023",
      openingDate: "15/12/2023",
      closingDate: "30/12/2023",
      budget: "R$ 540.000,00",
      contactEmail: "licitacoes@prefeiturasp.gov.br",
      contactPhone: "(11) 3333-4444",
      requirements: [
        "Experiência prévia em projetos similares",
        "Certificação ISO 9001",
        "Equipe técnica com no mínimo 5 profissionais certificados"
      ],
      deliverables: [
        "Software implementado e configurado",
        "Treinamento para equipe técnica",
        "Documentação técnica completa",
        "Suporte técnico por 12 meses"
      ]
    };
    
    setParsedData(mockParsedData);
    toast({
      title: "Documento analisado com sucesso!",
      description: "Os dados foram extraídos e estão prontos para uso.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    simulateUpload();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-mac">
        <h2 className="text-xl font-semibold mb-4">Analisador de Documentos</h2>
        <p className="text-gray-600 mb-6">
          Faça upload de editais (PDF ou DOCX) para que o CotAI extraia automaticamente as informações relevantes.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange} 
              accept=".pdf,.docx,.doc" 
              className="hidden" 
            />
            
            {!file ? (
              <div className="flex flex-col items-center">
                <FileUp className="h-10 w-10 text-gray-400 mb-3" />
                <p className="text-gray-600">Clique para selecionar ou arraste um arquivo</p>
                <p className="text-sm text-gray-400 mt-1">PDF, DOCX (máx. 10MB)</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <FileText className="h-10 w-10 text-cotai-purple mb-3" />
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-400 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            )}
          </div>
          
          {file && !isUploading && !isParsing && !parsedData && (
            <Button 
              type="submit" 
              className="w-full py-6 bg-cotai-purple hover:bg-cotai-purple/90"
            >
              Analisar Documento
            </Button>
          )}
          
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Enviando arquivo...</span>
                <span className="text-sm font-medium">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
          
          {isParsing && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Processando documento...</span>
                <span className="text-sm font-medium">{parseProgress}%</span>
              </div>
              <Progress value={parseProgress} className="h-2" />
            </div>
          )}
        </form>
      </div>
      
      {parsedData && (
        <Card className="shadow-mac">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Check className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-medium">Dados Extraídos</h3>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Título</p>
                  <p className="font-medium">{parsedData.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Organização</p>
                  <p className="font-medium">{parsedData.organization}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tipo de Licitação</p>
                  <p className="font-medium">{parsedData.bidType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Número</p>
                  <p className="font-medium">{parsedData.bidNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data de Abertura</p>
                  <p className="font-medium">{parsedData.openingDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data de Fechamento</p>
                  <p className="font-medium">{parsedData.closingDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Orçamento</p>
                  <p className="font-medium">{parsedData.budget}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Requisitos</p>
                <ul className="list-disc list-inside space-y-1">
                  {parsedData.requirements.map((req: string, i: number) => (
                    <li key={i} className="text-sm">{req}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Entregáveis</p>
                <ul className="list-disc list-inside space-y-1">
                  {parsedData.deliverables.map((del: string, i: number) => (
                    <li key={i} className="text-sm">{del}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setFile(null)}
              >
                Analisar Outro Documento
              </Button>
              <Button 
                className="bg-cotai-purple hover:bg-cotai-purple/90"
              >
                Usar Estes Dados
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <h4 className="font-medium text-blue-800">Dica para melhores resultados</h4>
            <p className="text-sm text-blue-700 mt-1">
              Para obter resultados mais precisos, use documentos com texto bem formatado e sem tabelas complexas. 
              O CotAI está constantemente melhorando sua capacidade de extração por meio de feedback dos usuários.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentParser;
