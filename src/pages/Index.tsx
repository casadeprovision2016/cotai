
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, CheckCircle, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-cotai-purple">CotAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-700 hover:text-cotai-purple">Demonstração</Link>
              <Link to="/login" className="text-gray-700 hover:text-cotai-purple">Entrar</Link>
              <Link to="/register">
                <Button>Começar agora</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-cotai-purple">CotAI</span>
                <span className="block">Licitações Inteligentes</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-md">
                Transforme sua participação em licitações com a nossa plataforma impulsionada por Inteligência Artificial.
              </p>
              <div className="flex space-x-4">
                <Button size="lg" className="rounded-full">
                  Experimentar agora
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg" className="rounded-full">
                    Ver demonstração
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-10 md:mt-0 relative">
              <div className="mac-window h-80 w-full overflow-hidden">
                <div className="mac-header">
                  <div className="mac-button mac-button-red"></div>
                  <div className="mac-button mac-button-yellow"></div>
                  <div className="mac-button mac-button-green"></div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="CotAI em ação" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-cotai-purple text-white p-4 rounded-lg shadow-lg">
                <p className="font-semibold">95% de economia de tempo</p>
                <p className="text-sm">comprovado por nossos clientes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Como o CotAI revoluciona seu processo de licitações</h2>
            <p className="mt-4 text-xl text-gray-600">Nossa plataforma utiliza IA avançada para simplificar cada etapa</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-mac border border-gray-100">
              <div className="bg-cotai-purple/10 p-3 rounded-full inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cotai-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Parser Inteligente</h3>
              <p className="text-gray-600">Extração automática de dados relevantes de editais em segundos, sem erros humanos.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-mac border border-gray-100">
              <div className="bg-cotai-purple/10 p-3 rounded-full inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cotai-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Precificação Preditiva</h3>
              <p className="text-gray-600">Algoritmos inteligentes para sugerir preços competitivos baseados em dados históricos.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-mac border border-gray-100">
              <div className="bg-cotai-purple/10 p-3 rounded-full inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cotai-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestão Visual</h3>
              <p className="text-gray-600">Dashboard Kanban intuitivo para acompanhar o status de todas as suas licitações.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Por que escolher o CotAI?</h2>
              <ul className="space-y-4">
                {[
                  "Processamento local para máxima segurança de dados",
                  "Análise de editais com precisão superior a 98%",
                  "Redução de 95% no tempo de preparação de propostas",
                  "Interface intuitiva inspirada no macOS",
                  "Suporte técnico especializado"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-cotai-purple mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8">Saiba mais</Button>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-mac text-center">
                  <p className="text-4xl font-bold text-cotai-purple">95%</p>
                  <p className="text-gray-600">Redução no tempo</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-mac text-center">
                  <p className="text-4xl font-bold text-cotai-purple">87%</p>
                  <p className="text-gray-600">Taxa de aprovação</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-mac text-center">
                  <p className="text-4xl font-bold text-cotai-purple">45%</p>
                  <p className="text-gray-600">Aumento de receita</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-mac text-center">
                  <p className="text-4xl font-bold text-cotai-purple">3.5x</p>
                  <p className="text-gray-600">ROI médio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Sobre a CotAI</h2>
            <p className="mt-4 text-xl text-gray-600">Unindo Inteligência Artificial e expertise em licitações</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
                alt="Equipe CotAI" 
                className="rounded-lg shadow-mac w-full h-auto"
              />
            </div>
            <div className="flex-1 space-y-4">
              <p className="text-gray-600">
                Fundada em 2022 por especialistas em licitações e tecnologia, a CotAI 
                nasceu da frustração com processos manuais e ineficientes no mercado de licitações.
              </p>
              <p className="text-gray-600">
                Nossa equipe multidisciplinar une conhecimento jurídico, tecnológico e de negócios 
                para criar uma solução que realmente entende as dores das PMEs brasileiras.
              </p>
              <p className="text-gray-600">
                Desenvolvemos algoritmos proprietários que utilizam processamento local de dados, 
                garantindo segurança e conformidade com a LGPD enquanto oferecemos resultados superiores.
              </p>
              <Link to="/about">
                <Button variant="outline" className="mt-4">
                  Conheça nossa história
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cotai-purple py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pronto para revolucionar seus processos de licitação?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de empresas que já transformaram suas operações com o CotAI
          </p>
          <Link to="/login">
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full bg-white text-cotai-purple hover:bg-white/90 hover:text-cotai-purple border-white"
            >
              Começar agora
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CotAI</h3>
              <p className="text-gray-400">Transformando licitações com IA</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">Recursos</Link></li>
                <li><Link to="#" className="hover:text-white">Planos</Link></li>
                <li><Link to="#" className="hover:text-white">Preços</Link></li>
                <li><Link to="#" className="hover:text-white">Casos de uso</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">Sobre nós</Link></li>
                <li><Link to="#" className="hover:text-white">Carreiras</Link></li>
                <li><Link to="#" className="hover:text-white">Blog</Link></li>
                <li><Link to="#" className="hover:text-white">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">Central de ajuda</Link></li>
                <li><Link to="#" className="hover:text-white">Documentação</Link></li>
                <li><Link to="#" className="hover:text-white">Status</Link></li>
                <li><Link to="#" className="hover:text-white">Política de privacidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2023 CotAI. Todos os direitos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
