import CalculatorClient from "@/components/calculator/calculator-client";

export default function CostCalculatorPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 md:px-12">
      <div className="bg-gradient-to-r from-chocolate-50/50 to-green-50/50 rounded-2xl p-8">
        <div>
          <h1 className="text-3xl tracking-wide font-bold text-chocolate-800 mb-2">
            Calculateur de coût
          </h1>
          <p className="text-gray-700 tracking-wide leading-6">
            Calculez les quantités et coûts en fonction du nombre de chocolats.
          </p>
        </div>
      </div>

      <CalculatorClient />
    </div>
  );
}
