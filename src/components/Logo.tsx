
import React from "react";

const Logo = ({ size = "default" }: { size?: "default" | "small" | "large" }) => {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "text-xl";
      case "large":
        return "text-4xl";
      default:
        return "text-2xl";
    }
  };

  return (
    <div className="flex items-center cursor-pointer">
      <div className={`font-bold tracking-wide ${getSizeClasses()} font-small-caps`}>
        {/* S with proper spacing */}
        <span className="text-solar-green-600 font-small-caps mr-[1px]">s</span>
        
        {/* O as a more circular sun */}
        <span className="relative inline-flex items-center justify-center mx-[3px]">
          <span className="w-[0.9em] h-[0.9em] rounded-full bg-solar-yellow-400 absolute"></span>
          <span className="absolute w-[1.2em] h-[1.2em]">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <span 
                key={i}
                className="absolute w-[40%] h-[1.5px] bg-solar-yellow-300 origin-left"
                style={{ 
                  left: '50%', 
                  top: '50%', 
                  transform: `rotate(${deg}deg) translateX(0)` 
                }}
              />
            ))}
          </span>
          <span className="relative z-10 text-transparent select-none">o</span>
        </span>
        
        {/* LCAP with proper spacing */}
        <span className="text-solar-green-600 font-small-caps tracking-wider">
          <span className="mx-[1px]">l</span>
          <span className="mx-[1px]">c</span>
          <span className="mx-[1px]">a</span>
          <span className="mx-[1px]">p</span>
        </span>
      </div>
      
      {/* Tagline */}
      {size !== "small" && (
        <div className={`flex flex-col leading-none ml-3 ${size === "large" ? "mt-1" : ""}`}>
          <span className={`text-solar-green-600 font-medium ${size === "large" ? "text-sm" : "text-xs"} uppercase font-small-caps`}>
            Renewable Finance
          </span>
        </div>
      )}
    </div>
  );
};

// Alternative Capchase-inspired Logo
const AlternativeLogo = ({ size = "default" }: { size?: "default" | "small" | "large" }) => {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "text-xl";
      case "large":
        return "text-4xl";
      default:
        return "text-2xl";
    }
  };

  return (
    <div className="flex items-center cursor-pointer">
      <div className={`font-medium ${getSizeClasses()} font-small-caps`}>
        {/* Modern purple-inspired logo */}
        <span className="bg-gradient-to-r from-solar-green-600 to-[#9b87f5] text-transparent bg-clip-text">sol</span>
        <span className="relative px-[0.15em]">
          <span className="w-[0.9em] h-[0.9em] rounded-full bg-solar-yellow-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
          <span className="relative z-10 text-white">c</span>
        </span>
        <span className="bg-gradient-to-r from-[#9b87f5] to-solar-green-600 text-transparent bg-clip-text">ap</span>
      </div>
      
      {/* Tagline */}
      {size !== "small" && (
        <div className={`flex flex-col leading-none ml-2 ${size === "large" ? "mt-1" : ""}`}>
          <span className={`text-[#9b87f5] font-medium ${size === "large" ? "text-sm" : "text-xs"} uppercase font-small-caps`}>
            Renewable Finance
          </span>
        </div>
      )}
    </div>
  );
};

// Export the original Logo as default
export default Logo;

// Export the alternative design
export { AlternativeLogo };
