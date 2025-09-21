import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface ShowcaseSectionProps {
  isDarkMode: boolean;
}

const prompts = [
  "An abstract, artistic screenshot of a developer's portfolio website. The design is minimalist and technical, with a dark mode aesthetic. A vaporwave statue of David is a central element. The color palette is black, white, and a vibrant orange accent (#FF4500). The user interface features clean lines, code snippets about Web3 and AI, and glowing interactive elements that respond to a custom cursor. The overall vibe is futuristic and professional.",
  "A bright, minimalist, and artistic representation of a web developer's portfolio. The user interface is laid out on a clean grid with plenty of white space. Key elements include technology logos like React, Ethereum, and Solidity floating around a central image of a surreal, glowing wireframe figure reaching out. The color scheme is light gray (#efeeee), black, and a sharp orange accent (#FF4500). The image should feel like a conceptual UI design, clean and sophisticated.",
  "A dynamic and artistic interpretation of a user interacting with a futuristic portfolio website. Show a custom blended cursor moving across a dark screen, leaving a subtle trail of light. The cursor is hovering over an interactive SVG face whose eyes are following the cursor's movement. In the background, there's a faint grid layout and blurred UI elements with the color orange (#FF4500) highlighting navigation links. The style should be slightly impressionistic but clearly digital and tech-focused.",
];

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ isDarkMode }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const grayTextClasses = `transition-colors duration-300 ease-in-out ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`;
  const borderClasses = isDarkMode ? 'border-[#efeeee]' : 'border-black';
  const buttonClasses = `px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 ease-in-out hover:bg-[#FF4500] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 ${
    isDarkMode ? 'bg-[#efeeee] text-black' : 'bg-black text-[#efeeee]'
  }`;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setImages([]); // Reset images for a new generation sequence
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const currentGenerated: string[] = [];

      for (const prompt of prompts) {
        const response = await ai.models.generateImages({
          model: 'imagen-4.0-generate-001',
          prompt: prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/png',
            aspectRatio: '16:9',
          },
        });
        
        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        currentGenerated.push(`data:image/png;base64,${base64ImageBytes}`);
        
        // Update state progressively as each image is generated
        setImages([...currentGenerated]);
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate images. ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };
  
  const imagePlaceholders = Array(3).fill(null);

  return (
    <section id="showcase" className={`border-t ${borderClasses} py-8`}>
      <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
        <span>05 SHOWCASE</span>
        <span>/05</span>
      </div>
      <div className="flex flex-col items-center justify-center text-center py-12 px-4">
        <h2 className="text-4xl md:text-5xl font-light leading-tight mb-4">
          Artistic Showcase
        </h2>
        <p className={`max-w-2xl mb-8 ${grayTextClasses}`}>
          Instead of static screenshots, here are AI-generated artistic interpretations of this portfolio, capturing its unique aesthetic and technical focus. Click the button to generate a new set.
        </p>
        <button onClick={handleGenerate} disabled={loading} className={buttonClasses}>
          {loading ? 'Generating...' : 'Generate Showcase'}
        </button>

        {error && <p className="mt-8 text-red-500">{error}</p>}

        {(loading || images.length > 0) && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {imagePlaceholders.map((_, index) => (
              <div key={index} className={`border ${borderClasses} p-2 rounded-lg aspect-[16/9] flex items-center justify-center ${images[index] ? '' : 'bg-gray-500/10'}`}>
                {images[index] ? (
                  <img 
                    src={images[index]} 
                    alt={`AI generated showcase image ${index + 1}`} 
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  loading && (
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current"></div>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};