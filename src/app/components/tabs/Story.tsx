import React from "react";

interface StoryProps {
  title: string;
  content: {
    paragraphs: string[];
    highlight?: string;
  };
}

const Story: React.FC<StoryProps> = ({ title, content }) => {
  return (
    <div className="text-white">
      <h2 className="text-2xl mb-6">{title}</h2>
      {content.paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-6 leading-relaxed text-gray-400">
          {paragraph}
        </p>
      ))}
      {content.highlight && (
        <div className="mt-8 p-4 border-l-4 border-secondary italic text-secondary">
          {content.highlight}
        </div>
      )}
    </div>
  );
};

export default Story;
