import { Layout } from "@/components/Layout";
import { ProductList } from "@/components/ProductList";
import { SEO as Meta } from "@/components/SEO";

const Products = () => {
  return (
    <>
      <Meta 
        title="Produtos — Mercado Copilot" 
        description="Listagem, análise e otimização de produtos com IA."
        canonical="/products"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Smartphone Samsung Galaxy A54 128GB 5G" }
          ]
        }}
      />
      <Layout>
        <ProductList />
      </Layout>
    </>
  );
};

export default Products;