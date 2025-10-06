import { useState } from "react";

const properties = [
  {
    title: "Residential Lot for Sale",
    address: "Purok 5, Valencia City, Bukidnon",
    landArea: 250,
    price: 1500000,
    images: [
      "/images/property1-main.jpg",
      "/images/property1-1.jpg",
      "/images/property1-2.jpg",
      "/images/property1-3.jpg",
    ],
  },
  {
    title: "Commercial Land",
    address: "Sayre Highway, Valencia City",
    landArea: 500,
    price: 3500000,
    images: [
      "/images/property2-main.jpg",
      "/images/property2-1.jpg",
      "/images/property2-2.jpg",
    ],
  },
];

const PropertyList = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
    {properties.map((prop, index) => (
      <PropertyCard key={index} property={prop} />
    ))}
  </div>
);


const PropertyCard = ({ property }) => {
  const [activeImage, setActiveImage] = useState(property.images[0]);

  return (
    <div className="bg-black rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition p-4 w-full max-w-sm">
      {/* Main Image */}
      <div className="relative w-full h-56 rounded-lg overflow-hidden">
        <img
          src={activeImage}
          alt="Property"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-2 mt-3 justify-center">
        {property.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
              activeImage === img ? "border-green-600" : "border-transparent"
            }`}
            onClick={() => setActiveImage(img)}
          />
        ))}
      </div>

      {/* Property Info */}
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {property.title}
        </h3>
        <p className="text-gray-600 text-sm">{property.address}</p>
        <p className="text-gray-700 font-medium">
          Land Area: <span className="text-green-700">{property.landArea} sqm</span>
        </p>
        {property.price && (
          <p className="text-xl font-bold text-green-700">
            ₱ {property.price.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
