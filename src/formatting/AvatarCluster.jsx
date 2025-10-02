import React, { useState, useEffect, useRef } from "react";

const AvatarCluster = ({ images = [] }) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState(320);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerSize(width); // track actual rendered container width
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const avatarSize = containerSize / 4; // scale avatars relative to container
  const radius = (containerSize - avatarSize) / 2;

  const getSrcAndName = (item) => {
    if (!item) return { src: "", name: "" };
    if (typeof item === "string") {
      const src = item;
      const raw = src.split("/").pop().split(".")[0];
      const name = raw.replace(/[-_]/g, " ").replace(/\b\w/g, (s) => s.toUpperCase());
      return { src, name };
    }
    const src = item.img || item.src || "";
    const name = item.name || (src ? src.split("/").pop().split(".")[0].replace(/[-_]/g, " ") : "");
    const nice = name.replace(/\b\w/g, (s) => s.toUpperCase());
    return { src, name: nice };
  };

  const anyActive = activeIndex !== null;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-[320px] aspect-square"
      onMouseLeave={() => setActiveIndex(null)}
    >
      {images.map((item, i) => {
        const { src, name } = getSrcAndName(item);

        const angle = (i / images.length) * 2 * Math.PI;
        const x = Math.round(radius * Math.cos(angle));
        const y = Math.round(radius * Math.sin(angle));

        const isActive = activeIndex === i;

        const left = isActive ? "50%" : `calc(50% + ${x}px)`;
        const top = isActive ? "50%" : `calc(50% + ${y}px)`;

        const transform = isActive
          ? "translate(-50%, -50%) scale(2)"
          : "translate(-50%, -50%) scale(1)";
        const zIndex = isActive ? 40 : 10;
        const opacity = anyActive && !isActive ? 0.28 : 1;

        return (
          <div
            key={i}
            role="button"
            tabIndex={0}
            onMouseEnter={() => setActiveIndex(i)}
            onClick={() => setActiveIndex(isActive ? null : i)}
            onTouchStart={() => setActiveIndex(i)}
            className="absolute flex items-center justify-center"
            style={{
              left,
              top,
              width: avatarSize,
              height: avatarSize,
              transform,
              transition: "all 260ms cubic-bezier(.2,.9,.3,1)",
              zIndex,
              opacity,
              cursor: "pointer",
            }}
          >
            <img
              src={src}
              alt={name || `avatar-${i}`}
              className="w-full h-full rounded-full object-cover border-2 border-white shadow-md"
              draggable={false}
            />

            {isActive && (
              <div
                style={{
                  marginTop: 10,
                  transform: "translateX(-50%)",
                  left: "50%",
                  position: "absolute",
                  whiteSpace: "nowrap",
                }}
                className="absolute left-1/2 mt-2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-white text-[10px] font-medium shadow"
              >
                {name}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AvatarCluster;
