import { useState } from "react";
import { Link } from "react-router-dom";
import properties from "../data/properties";

const PropertyCard = ({ property }) => {
  const [activeImage, setActiveImage] = useState(property.images[0]);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300">
      {/* Main (large) Image */}
      <Link to={`/properties/${property.id}`}>
        <img
          src={activeImage}
          alt={property.title}
          className="w-full h-56 object-cover"
          loading="lazy" // ✅ Lazy load main image
        />
      </Link>

      {/* Thumbnails */}
      <div className="flex gap-2 p-3 overflow-x-auto">
        {property.thumbnails.map((thumb, index) => (
          <img
            key={index}
            src={thumb}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setActiveImage(property.images[index])}
            loading="lazy" // ✅ Lazy load thumbnails
            className={`w-16 h-16 object-cover rounded-md cursor-pointer border transition ${
              activeImage === property.images[index]
                ? "border-green-600"
                : "border-gray-200 hover:border-green-600"
            }`}
          />
        ))}
      </div>

      {/* Details */}
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">
          {property.title}
        </h2>
        <p className="text-gray-600 mb-2">{property.address}</p>
        <p className="text-green-700 font-semibold mb-4">
          Land Area: {property.landArea} sqm
        </p>

        {/* View Details Button */}
        <Link
          to={`/properties/${property.id}`}
          className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg font-medium transition"
        >
          View Property Details →
        </Link>
      </div>
    </div>
  );
};

const PropertyList = () => {
  return (
    <div className="pt-24 pb-16 px-6 min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Sticky Header */}
      <div className="sticky top-16 z-10 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 py-4">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          🏡 Properties for Sale
        </h1>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
