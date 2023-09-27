import React from "react";

interface Props {
    apiKey: string;
    onChange: (apiKey: string) => void;
  }
  
  export const APIKeyInput: React.FC<Props> = ({ apiKey, onChange }) => {
    return (
      <input
        className="h-[50px] w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-2 mr-2"
        type="password"
        placeholder="OpenAI API Key"
        value={apiKey}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };