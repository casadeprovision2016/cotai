
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    empresa: "",
    nome: "",
    sobrenome: "",
    dataNascimento: "",
    email: "",
    emailConfirmacao: "",
    login: "",
    senha: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const emailConfirmacaoRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailConfirmacao = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    toast({
      title: "Ação bloqueada",
      description: "Por favor, digite o email novamente para confirmação",
      variant: "destructive",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.email !== formData.emailConfirmacao) {
      toast({
        title: "Emails não conferem",
        description: "Por favor, verifique se os emails digitados são iguais",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      // Simular envio para API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const formDataWithImage = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataWithImage.append(key, value);
      });
      
      if (profileImage) {
        formDataWithImage.append('profileImage', profileImage);
      }
      
      // Aqui seria integrado com a API de registro
      console.log("Dados enviados:", Object.fromEntries(formDataWithImage));
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você será redirecionado para a página de login",
      });
      
      // Simula redirecionamento
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Erro no cadastro:", error);
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível completar seu cadastro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-cotai-purple mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Link>
            <h1 className="text-3xl font-bold text-cotai-purple">CotAI</h1>
            <h2 className="mt-2 text-2xl font-semibold text-gray-900">Crie sua conta</h2>
            <p className="mt-2 text-gray-600">
              Preencha os campos abaixo para se cadastrar
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cadastro</CardTitle>
              <CardDescription>
                Preencha seus dados para criar uma conta
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {/* Upload de imagem */}
                <div className="flex flex-col items-center justify-center">
                  <div 
                    className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer mb-2"
                    onClick={triggerFileInput}
                  >
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-full w-full object-cover" 
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                        <Upload className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={triggerFileInput}
                  >
                    {imagePreview ? "Alterar imagem" : "Carregar imagem"}
                  </Button>
                </div>

                {/* Dados da empresa */}
                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    placeholder="Nome da sua empresa"
                    required
                  />
                </div>
                
                {/* Nome e Sobrenome */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sobrenome">Sobrenome</Label>
                    <Input
                      id="sobrenome"
                      name="sobrenome"
                      value={formData.sobrenome}
                      onChange={handleChange}
                      placeholder="Seu sobrenome"
                      required
                    />
                  </div>
                </div>
                
                {/* Data de nascimento */}
                <div className="space-y-2">
                  <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                  <Input
                    id="dataNascimento"
                    name="dataNascimento"
                    type="date"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                
                {/* Confirmação de Email */}
                <div className="space-y-2">
                  <Label htmlFor="emailConfirmacao">Confirme seu Email</Label>
                  <Input
                    id="emailConfirmacao"
                    name="emailConfirmacao"
                    type="email"
                    ref={emailConfirmacaoRef}
                    value={formData.emailConfirmacao}
                    onChange={handleChange}
                    onPaste={handleEmailConfirmacao}
                    placeholder="Digite seu email novamente"
                    required
                  />
                </div>
                
                {/* Login */}
                <div className="space-y-2">
                  <Label htmlFor="login">Nome de usuário</Label>
                  <Input
                    id="login"
                    name="login"
                    value={formData.login}
                    onChange={handleChange}
                    placeholder="Escolha um nome de usuário"
                    required
                  />
                </div>
                
                {/* Senha */}
                <div className="space-y-2">
                  <Label htmlFor="senha">Senha</Label>
                  <div className="relative">
                    <Input
                      id="senha"
                      name="senha"
                      type={showPassword ? "text" : "password"}
                      value={formData.senha}
                      onChange={handleChange}
                      placeholder="Crie uma senha forte"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    A senha deve ter pelo menos 8 caracteres
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Processando..." : "Cadastrar"}
                </Button>
                
                <div className="text-center text-sm">
                  <span className="text-gray-500">Já possui uma conta?</span>{" "}
                  <Link to="/login" className="text-cotai-purple hover:underline">
                    Faça login
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
