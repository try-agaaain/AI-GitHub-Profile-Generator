import { FC } from "react";
import React from "react";

export type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-4';

interface Props {
  model: OpenAIModel;
  onChange: (model: OpenAIModel) => void;
}

export const ModelSelect: FC<Props> = ({ model, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as OpenAIModel);
  };

  return (
    <select
      className="h-[50px] w-[140px] w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-2 mr-2"
      value={model}
      onChange={handleChange}
    >
      <option value="gpt-3.5-turbo">GPT-3.5</option>
      <option value="gpt-4">GPT-4</option>
    </select>
  );
};