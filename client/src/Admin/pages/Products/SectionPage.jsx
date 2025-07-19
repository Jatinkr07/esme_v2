import { useState } from "react";
import ProductPage from "./ProductPage";
import VariantPage from "./VariantPage";

const SectionPage = () => {
  const [currentView, setCurrentView] = useState("products");
  const [selectedProductId, setSelectedProductId] = useState(null);

  const navigateToVariants = (productId) => {
    setSelectedProductId(productId);
    setCurrentView("variants");
  };

  const navigateToProducts = () => {
    setCurrentView("products");
    setSelectedProductId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "products" ? (
        <ProductPage onNavigateToVariants={navigateToVariants} />
      ) : (
        <VariantPage
          productId={selectedProductId}
          onNavigateBack={navigateToProducts}
        />
      )}
    </div>
  );
};

export default SectionPage;
