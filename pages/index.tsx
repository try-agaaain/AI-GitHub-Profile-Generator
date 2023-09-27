import React from 'react';
import type { NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import Footer from "../components/Footer";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import MDview from '@/components/mdView';
import { APIKeyInput } from '@/components/APIKeyInput';
import { BPF, BPFSelect, ModelSelect, OpenAIModel } from '@/components/ModelSelect';
import Header from '@/components/Header';

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [additionalContex, setAdditionalContex] = useState("");
  const [generatedUserAnalysis, setGeneratedUserAnalysis] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");

  const contextRef = useRef<null | HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo');
  const [bpfType, setBPF] = useState<BPF>('libbpf');
  
  const scrollToContext = () => {
    if (contextRef.current !== null) {
      contextRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  interface UserAnalysisParam {
    userInput: string;
    additionalContex: string;
    apiKey: string;
    model: OpenAIModel;
    bpfType: BPF;
  }

  const generateAIresponse = async (e: any,
    userAnalysisParam: UserAnalysisParam | null,
    setGenerated: (value: React.SetStateAction<string>) => void) => {
    setGenerated((prev) => "");
    e.preventDefault();
    let response;
    if (userAnalysisParam) {
      console.log("userAnalysisParam");
      response = await fetch("/api/generate_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: userInput,
          additionalContex: additionalContex,
          apiKey: apiKey,
          model: model,
          bpfType: bpfType,
        }),
      });
    } else {
      console.log("no param");
      return;
    }

    if (!response.ok) {
      window.alert("Error: " + response.statusText);
      return;
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const onParse = (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === "event") {
        const data = event.data;
        try {
          const text = JSON.parse(data).text ?? ""
          setGenerated((prev) => prev + text);
        } catch (e) {
          console.error(e);
        }
      }
    }

    // https://web.dev/streams/#the-getreader-and-read-methods
    const reader = data.getReader();
    const decoder = new TextDecoder();
    const parser = createParser(onParse);
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      parser.feed(chunkValue);
    }
    scrollToContext();
  }

  const handleGenerateUserAnalysis = async (e: any) => {
    if (!userInput) {
      window.alert("Please enter natural language command about eBPF program");
      return;
    }
    setLoading(true);
    e.preventDefault();
    try {
      const userAnalysisParam: UserAnalysisParam = {
        userInput: userInput,
        additionalContex: additionalContex,
        apiKey: apiKey,
        model: model,
        bpfType: bpfType,
      };
      generateAIresponse(e, userAnalysisParam, setGeneratedUserAnalysis);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    localStorage.setItem('apiKey', value);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>KEN: Kernel Extensions using Natural Language</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="flex flex-1 w-full flex-col items-center justify-center px-4 mt-4 sm:mt-10">
        <div className="mt-2 flex items-center space-x-2">
          <APIKeyInput apiKey={apiKey} onChange={handleApiKeyChange} />
          <ModelSelect model={model} onChange={(value) => setModel(value)} />
          <BPFSelect bpfType={bpfType} onChange={(value) => setBPF(value)} />
        </div>
        <div className="max-w-xl w-full">

          <div className="block">
            <input
              type="text"
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
              placeholder="Enter natural language command about eBPF program"
            />
            <textarea
              value={additionalContex}
              onChange={(e) => setAdditionalContex(e.target.value)}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-1"
              placeholder={
                "e.g. I am a Full Stack Developer with 9+ years of experience in developing enterprise applications and open-source software."
              }
            />
          </div>
          <MDview
            loading={loading}
            handleGenerateBio={handleGenerateUserAnalysis}
            generatedBios={generatedUserAnalysis}
            buttonText='Let AI analysis Your Github Profile'
            title='Analyze User Profile'
          />

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How the AI Works: 
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li className="text-slate-500">Retrieves the user's repository information to understand their project contributions.</li>
              <li className="text-slate-500">Fetches the user's profile data to gain insights into their professional background and skills.</li>
              <li className="text-slate-500">Analyzes the user's contributions to identify patterns, frequency, and areas of expertise.</li>
              <li className="text-slate-500">Summarizes the user's activities, contributions, and skills into a comprehensive overview.</li>
              <li className="text-slate-500">Generates a new, enriched GitHub profile README that highlights the user's contributions and skills.</li>
            </ol>
          </div>
        </div>
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <Footer />
      </div>

    </div>
  );
};

export default Home;
