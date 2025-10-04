import React from "react";
import AvatarCluster from "../formatting/AvatarCluster";

const teamMembers = [
  { name: "Earl", img: "/src/assets/teams/earl.jpg" },
  { name: "Joyce", img: "/src/assets/teams/joyce.jpg" },
  { name: "Kyla", img: "/src/assets/teams/kyla.jpg" },
  { name: "Llorente", img: "/src/assets/teams/llorente.jpg" },
  { name: "Roi", img: "/src/assets/teams/roi.jpg" },
  { name: "Dennis", img: "/src/assets/teams/dennis.jpg" },
  { name: "Cyrill", img: "/src/assets/teams/cyrill.jpg" },
  { name: "Florymay", img: "/src/assets/teams/florymay.jpg" },
];

// Fisher–Yates shuffle for random order
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const TeamAndMap = () => {
  const randomizedMembers = shuffleArray(teamMembers);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-12">
      {/* Team Section */}
      <section className="flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Team</h2>

        {/* Avatar Cluster */}
        <AvatarCluster
          images={randomizedMembers.map((m) => ({ img: m.img, name: m.name }))}
        />
      </section>

      {/* Map Section */}
      <section className="flex flex-col items-center md:items-start justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          Find Us
        </h2>
        <div className="w-full rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1746.9652744657049!2d125.09086045963295!3d7.905736229177349!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ff197d005371db%3A0xc66449328acb4088!2sYusay%20Credit%20and%20Finance%20Corporation!5e1!3m2!1sen!2sph!4v1759499485646!5m2!1sen!2sph"
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default TeamAndMap;
