import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import properties from "../data/properties";
import InquiryBookmark from "../components/bookmarks/InquiryBookmark";

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find((prop) => prop.id === id);

  const [activeImage, setActiveImage] = useState(
    property ? property.images[0] : ""
  );
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ✅ Detect scroll to trigger fade-in animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Property not found
        </h2>
        <Link
          to="/properties"
          className="text-green-600 underline hover:text-green-800"
        >
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-[3.5rem]">
      <InquiryBookmark selectedProperty={property.title} />

      {/* Sticky Header Section */}
      <div
        className={`sticky z-30 bg-white border-b border-gray-200 shadow-sm transition-all duration-500 ${
          isVisible ? "opacity-100" : "opacity-95"
        }`}
        style={{
          top: "3.10rem", // 👈 ensures it stays just below the fixed navbar height
          backdropFilter: "blur(4px)",
        }}
      >
        <div className="p-3 flex flex-col space-y-1 text-center md:text-left">
          <Link
            to="/properties"
            className="text-green-700 hover:text-green-900 font-medium w-fit mx-auto md:mx-0 text-sm"
          >
            ← Back to Listings
          </Link>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 leading-tight">
            {property.title}
          </h1>
          <p className="text-gray-600 text-sm">{property.address}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Main Image */}
        <div className="w-full h-96 mb-6 rounded-lg overflow-hidden shadow flex items-center justify-center bg-gray-100">
          <img
            src={activeImage}
            alt="Property"
            className="max-h-full max-w-full object-contain bg-gray-100 rounded-lg transition-all duration-300"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 p-3 overflow-x-auto">
          {property.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`w-10 h-10 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ${
                activeImage === img
                  ? "border-green-600 scale-105"
                  : "border-transparent hover:opacity-80"
              }`}
              onClick={() => setActiveImage(img)}
            />
          ))}
        </div>

        {/* Property Info */}
        <div className="space-y-3 mb-8">
          <p className="text-lg">
            <strong>Land Area:</strong> {property.landArea} sqm
          </p>
          {property.price && (
            <p className="text-2xl font-bold text-green-700">
              ₱ {property.price.toLocaleString()}
            </p>
          )}
          <p className="text-gray-700 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* OpenStreetMap Embed (2 km radius) */}
        {property.coordinates && (
          <div className="mt-8 rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <iframe
              title="Property Location"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                property.coordinates.lng - 0.009
              },${property.coordinates.lat - 0.009},${
                property.coordinates.lng + 0.009
              },${property.coordinates.lat + 0.009}&layer=mapnik&marker=${
                property.coordinates.lat
              },${property.coordinates.lng}`}
            ></iframe>

            <div className="bg-gray-50 p-3 text-center text-sm border-t border-gray-200">
              <a
                href={`https://www.openstreetmap.org/?mlat=${property.coordinates.lat}&mlon=${property.coordinates.lng}&zoom=15`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 font-medium hover:underline"
              >
                🌍 View on OpenStreetMap
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
