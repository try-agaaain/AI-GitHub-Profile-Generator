import React, { useEffect } from 'react';
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import { APIKeyInput } from '@/components/APIKeyInput';
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import MDview from '@/components/mdView';
import { ModelSelect, OpenAIModel } from "@/components/ModelSelect";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [generatedUserAnalysis, setGeneratedUserAnalysis] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [model, setModel] = useState<OpenAIModel>('gpt-3.5-turbo');

  const [githubProfileData, setGithubProfileData] = useState<string>("");
  const [githubStatsData, setGithubStatsData] = useState<string>("");
  const [githubRawData, setGithubRawData] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>('');
  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  // if (!apiKey) {
  //   window.alert('Please enter an API key.');
  //   return;
  // }
  const handleApiKeyChange = (value: string) => {
    setApiKey(value);

    localStorage.setItem('apiKey', value);
  };

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey');

    if (apiKey) {
      setApiKey(apiKey);
    }
  }, []);
  // get github user info from api/github/[username]
  async function getUserStats(username: string): Promise<string> {
    const response = await fetch(`/api/github/${username}`);
    if (!response.ok) {
      window.alert("Error: " + response.statusText);
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return JSON.stringify(data);
  }

  async function getUserPage(username: string): Promise<string> {
    const url = `/api/scrape_url?username=${username}`;
    const response = await fetch(url);
    if (!response.ok) {
      window.alert("Error: " + response.statusText);
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return JSON.stringify(data);
  }

  interface UserAnalysisParam {
    userStats: string;
    userProfile: string;
  }

  interface ProfileGeneratorParam {
    userAnalysis: string;
    requirements: string;
  }

  const generateAIresponse = async (e: any,
    profileGeneratorParam: ProfileGeneratorParam | null,
    userAnalysisParam: UserAnalysisParam | null,
    setGenerated: (value: React.SetStateAction<string>) => void) => {
    setGenerated((prev) => "");
    e.preventDefault();
    let response;
    if (profileGeneratorParam) {
      console.log("profileGeneratorParam");
      response = await fetch("/api/generate_profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          insight: profileGeneratorParam.userAnalysis,
          requirements: profileGeneratorParam.requirements,
        }),
      });
    } else if (userAnalysisParam) {
      console.log("userAnalysisParam");
      response = await fetch("/api/generate_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userStats: userAnalysisParam.userStats,
          userProfile: userAnalysisParam.userProfile,
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
    scrollToBios();
  }

  const handleGenerateUserAnalysis = async (e: any) => {
    if (!userName) {
      window.alert("Please enter a valid GitHub username");
      return;
    }
    setLoading(true);
    e.preventDefault();
    try {
      // get user state and analysis user first
      setGeneratedBios(`Getting user stats for ${userName}...`);
      const userStats: string = await getUserStats(userName);
      console.log(userStats);
      setGithubStatsData(userStats);

      setGeneratedBios(`Getting user profile for ${userName}...`);
      const userPage: string = await getUserPage(userName);
      console.log(userPage);
      setGithubProfileData(userPage);
    
      setGeneratedBios("");
      const userAnalysisParam: UserAnalysisParam = {
        userStats: userStats,
        userProfile: userPage,
      };
      generateAIresponse(e, null, userAnalysisParam, setGeneratedUserAnalysis);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  // const handleGenerateBio = async (e: any) => {
  //   if (!generatedUserAnalysis) {
  //     window.alert("Please do step 1 first");
  //     return;
  //   }
  //   setLoading(true);
  //   e.preventDefault();

  //   const profileGeneratorParam: ProfileGeneratorParam = {
  //     userAnalysis: generatedUserAnalysis,
  //     requirements: bio,
  //   };
  //   generateAIresponse(e, profileGeneratorParam, null, setGeneratedBios);
  //   setLoading(false);
  // };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>GitHub Profile AI Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="flex flex-1 w-full flex-col items-center justify-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/yunwei37/AI-GitHub-Profile-Generator"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <h1 className="sm:text-1xl text-4xl max-w-[708px] font-bold text-slate-900 text-center">
          Generate Bpftrace Program with GPT
        </h1>
        <p className="text-slate-500 mt-5">14,456 Profile generated so far.</p>
        <div className="max-w-xl w-full">
          <div className="flex  items-center space-x-3">
            <Image src="/1-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Let AI Summary your Github Activity and repo with One click.</p>
          </div>

          <div className="block" style={{ display: 'flex', alignItems: 'center' }}>
            <APIKeyInput apiKey={apiKey} onChange={handleApiKeyChange} />
            <ModelSelect model={model} onChange={(value) => setModel(value)} />
          </div>
          <div className="block" style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5 mr-2"
              placeholder="Enter your github username"
            />
          </div>
          <MDview
            loading={loading}
            handleGenerateBio={handleGenerateUserAnalysis}
            generatedBios={generatedUserAnalysis}
            buttonText='Let AI analysis Your Github Profile'
            title='Analyze User Profile'
          />


          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/2-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Write a few sentences about yourself{" "}
              <span className="text-slate-500">
                (or leave it blank and we'll generate something for you!)
              </span>
              .
            </p>
          </div>
          {/* <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. I am a Full Stack Developer with 9+ years of experience in developing enterprise applications and open-source software."
            }
          />
          <MDview loading={loading} handleGenerateBio={handleGenerateBio} generatedBios={generatedBios}
            buttonText='Generate GitHub Profile README'
            title='Your GitHub Profile README'
          /> */}
          {/* <div className="flex flex-row py-2">
            <p
              onClick={() => setGeneratedBios((prev) => prev ? "" : exampleBios[0])}
            >
              Click to show generated example
            </p>
          </div> */}
          
          {/* <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/2-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Write a few sentences about yourself{" "}
              <span className="text-slate-500">
                (or leave it blank and we'll generate something for you!)
              </span>
              .
            </p>
          </div> */}
          {/* <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. I am a Full Stack Developer with 9+ years of experience in developing enterprise applications and open-source software."
            }
          />
          <MDview loading={loading} handleGenerateBio={handleGenerateBio} generatedBios={generatedBios}
            buttonText='Generate GitHub Profile README'
            title='Your GitHub Profile README'
          /> */}
          {/* <div className="flex flex-row py-2">
            <p
              onClick={() => setGeneratedBios((prev) => prev ? "" : exampleBios[0])}
            >
              Click to show generated example
            </p>
          </div> */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How the AI Works: 
            </h2>
            <p>(click to see the intermediate steps data)</p>
            <ol className="list-decimal list-inside space-y-2">
              <li className="text-slate-500" onClick={() => setGithubRawData(githubStatsData)}>Retrieves the user's repository information to understand their project contributions.</li>
              <li className="text-slate-500" onClick={() => setGithubRawData(githubProfileData)}>Fetches the user's profile data to gain insights into their professional background and skills.</li>
              <li className="text-slate-500" onClick={() => setGithubRawData(githubStatsData)}>Analyzes the user's contributions to identify patterns, frequency, and areas of expertise.</li>
              <li className="text-slate-500">Summarizes the user's activities, contributions, and skills into a comprehensive overview.</li>
              <li className="text-slate-500">Generates a new, enriched GitHub profile README that highlights the user's contributions and skills.</li>
            </ol>
            <p>{githubRawData}</p>
          </div>
        </div>
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <Footer />
      </div>

    </div>
  );
};

export default Home;
