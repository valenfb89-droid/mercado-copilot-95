import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";
import { SEO as Meta } from "@/components/SEO";

const Index = () => {
  return (
    <>
      <Meta 
        title="Mercado Copilot — IA para Mercado Livre" 
        description="Painel com análises, IA e automações para vendedores do Mercado Livre."
        canonical="/"
      />
      <Layout>
        <Dashboard />
      </Layout>
    </>
  );
};

export default Index;
