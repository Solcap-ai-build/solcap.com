
import { Check } from "lucide-react";

const Features = () => {
  const featuresList = [
    {
      title: "Flexible Upgrades",
      description: "Upgrade your device whenever you want with no long-term commitments."
    },
    {
      title: "Trade-In Value",
      description: "Get the best value for your current device with our trade-in program."
    },
    {
      title: "Device Protection",
      description: "Keep your devices protected with our comprehensive coverage plans."
    },
    {
      title: "Easy Management",
      description: "Manage all your devices in one place with our intuitive dashboard."
    }
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Features that make life easier</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform provides everything you need to manage your devices efficiently
            without the complexity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresList.map((feature, index) => (
            <div key={index} className="p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
