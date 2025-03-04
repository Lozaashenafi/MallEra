import React from "react";

function Services() {
  const services = [
    {
      title: "Mall Management",
      description:
        "Our company provides mall owners with a comprehensive system to manage their malls, including tenant spaces and payment processing.",
      icon: "🏢", // Replace with an actual icon component
    },
    {
      title: "Rental Promotion",
      description:
        "Our company promotes available mall spaces through a rental management system.",
      icon: "🏡",
    },
    {
      title: "Tenant Engagement",
      description: "Our company allows tenants to make payments seamlessly.",
      icon: "💼",
    },
  ];

  return (
    <section className="text-center py-12 bg-white">
      <h2 className="text-red-600 text-2xl font-bold">Services</h2>
      <p className="text-gray-500 mb-6">what service we provide ?</p>
      <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 w-80 text-center border"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <p className="text-gray-500 text-sm mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
