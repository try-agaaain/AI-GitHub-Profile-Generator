import type { NextApiRequest, NextApiResponse } from 'next';
import generateRepoStats from '../../../../lib/repoStats/repoData';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { owner, repo } = req.query;
  
  try {
    // const data = await generateRepoStats(owner as string, repo as string);
    const data = {
      "html_url": "https://github.com/try-agaaain",
      "type": "User",
      "name": "idea&steps",
      "company": null,
      "blog": "https://team317.gitee.io/",
      "location": null,
      "email": null,
      "hireable": null,
      "bio": null,
      "twitter_username": null,
      "public_repos": 61,
      "public_gists": 0,
      "followers": 6,
      "following": 13,
      "created_at": "2019-07-12T14:14:08Z",
      "updated_at": "2023-09-27T03:31:30Z",
      "totalPRs": 38,
      "totalCommits": 212,
      "totalIssues": 32,
      "totalStars": 18,
      "contributedTo": 26,
      "mostStarredRepos": [
          {
              "name": "func-call-for-command",
              "stargazers": {
                  "totalCount": 9
              },
              "description": "Generate GPT function call API from command-line help info",
              "createdAt": "2023-07-02T10:44:02Z",
              "url": "https://github.com/eunomia-bpf/func-call-for-command",
              "updatedAt": "2023-07-07T09:17:31Z",
              "languages": [
                  "Python",
                  "Shell"
              ],
              "repositoryTopics": [
                  "cmdline",
                  "gpt"
              ]
          },
          {
              "name": "linux-trace-ai-agent",
              "stargazers": {
                  "totalCount": 3
              },
              "description": "An experiment AI agent for automatic monitoring of system performance.",
              "createdAt": "2023-07-15T14:56:54Z",
              "url": "https://github.com/eunomia-bpf/linux-trace-ai-agent",
              "updatedAt": "2023-09-06T08:18:51Z",
              "languages": [
                  "Python"
              ],
              "repositoryTopics": [
                  "ebpf",
                  "gpt",
                  "monitoring",
                  "performance"
              ]
          },
          {
              "name": "login_jxnu",
              "stargazers": {
                  "totalCount": 2
              },
              "description": "网络自动重连工具",
              "createdAt": "2023-08-31T02:33:57Z",
              "url": "https://github.com/try-agaaain/login_jxnu",
              "updatedAt": "2023-09-02T03:04:57Z",
              "languages": [
                  "Python"
              ],
              "repositoryTopics": []
          },
          {
              "name": "phishing_website_decision_system",
              "stargazers": {
                  "totalCount": 2
              },
              "description": "这是一个二分类的决策树系统，用于识别一个网站是否为钓鱼网站",
              "createdAt": "2022-10-06T07:46:04Z",
              "url": "https://github.com/try-agaaain/phishing_website_decision_system",
              "updatedAt": "2023-06-15T08:17:44Z",
              "languages": [
                  "Python"
              ],
              "repositoryTopics": []
          },
          {
              "name": "GPT2Bpftrace",
              "stargazers": {
                  "totalCount": 1
              },
              "description": "Generate bpftrace eBPF programs online with GPT or LLM",
              "createdAt": "2023-09-13T14:04:01Z",
              "url": "https://github.com/eunomia-bpf/GPT2Bpftrace",
              "updatedAt": "2023-09-21T12:47:14Z",
              "languages": [
                  "TypeScript",
                  "JavaScript",
                  "Dockerfile",
                  "CSS"
              ],
              "repositoryTopics": [
                  "bpftrace",
                  "ebpf",
                  "gpt-4",
                  "linux"
              ]
          },
          {
              "name": "ai-func-call-gen",
              "stargazers": {
                  "totalCount": 1
              },
              "description": null,
              "createdAt": "2023-07-02T13:09:10Z",
              "url": "https://github.com/eunomia-bpf/ai-func-call-gen",
              "updatedAt": "2023-07-03T06:33:07Z",
              "languages": [
                  "TypeScript",
                  "JavaScript",
                  "Dockerfile",
                  "CSS"
              ],
              "repositoryTopics": []
          },
          {
              "name": "ai-chatbot",
              "stargazers": {
                  "totalCount": 0
              },
              "description": "A full-featured, hackable Next.js AI chatbot built by Vercel Labs",
              "createdAt": "2023-09-26T03:00:57Z",
              "url": "https://github.com/try-agaaain/ai-chatbot",
              "updatedAt": "2023-09-26T03:00:58Z",
              "languages": [
                  "TypeScript",
                  "JavaScript",
                  "CSS"
              ],
              "repositoryTopics": []
          },
          {
              "name": "AI-GitHub-Profile-Generator",
              "stargazers": {
                  "totalCount": 0
              },
              "description": "AI-Driven GitHub Profile Readme Generation with GPT",
              "createdAt": "2023-09-14T03:33:01Z",
              "url": "https://github.com/try-agaaain/AI-GitHub-Profile-Generator",
              "updatedAt": "2023-09-14T03:33:01Z",
              "languages": [
                  "TypeScript",
                  "JavaScript",
                  "CSS"
              ],
              "repositoryTopics": []
          },
          {
              "name": "Team317",
              "stargazers": {
                  "totalCount": 0
              },
              "description": null,
              "createdAt": "2023-09-13T04:34:48Z",
              "url": "https://github.com/try-agaaain/Team317",
              "updatedAt": "2023-09-13T04:34:49Z",
              "languages": [],
              "repositoryTopics": []
          },
          {
              "name": "hexo-theme-keep",
              "stargazers": {
                  "totalCount": 0
              },
              "description": ":rainbow: A simple and elegant theme for Hexo. It makes you more focused on writing.",
              "createdAt": "2023-09-13T04:04:11Z",
              "url": "https://github.com/try-agaaain/hexo-theme-keep",
              "updatedAt": "2023-09-13T04:04:11Z",
              "languages": [
                  "Stylus",
                  "JavaScript",
                  "EJS",
                  "Shell"
              ],
              "repositoryTopics": []
          }
      ],
      "GitHubContributions": {
          "totalContributions": 70,
          "prCount": 38,
          "issueCount": 32,
          "latestPRs": [
              "add test for ecli",
              "update requirements and fix the pmaa"
          ],
          "repoSet": [
              "langchain-ai/langchainjs",
              "eunomia-bpf/eunomia-bpf",
              "XavierJiezou/PMAA",
              "ksco/rvld",
              "eunomia-bpf/GPTtrace",
              "langchain-ai/langchain",
              "muellerberndt/mini-agi",
              "zhaoxile/SSTC_CR",
              "eunomia-bpf/bpf-developer-tutorial",
              "libbpf/libbpf-bootstrap",
              "jerryjliu/llama_index",
              "openai/openai-python",
              "eunomia-bpf/wasm-bpf",
              "docker/build-push-action",
              "uraimo/run-on-arch-action",
              "rust-lang/rust-bindgen",
              "bytecodealliance/wasm-micro-runtime",
              "WebAssembly/wasm-c-api",
              "Vimux/Mainroad",
              "4paradigm/OpenMLDB",
              "try-agaaain/OpenMLDB",
              "YunxiangLuo/testing",
              "zisianw/FaceBoxes.PyTorch",
              "jhb86253817/PIPNet",
              "DefTruth/torchlm",
              "Soptq/SoptlogBugReport",
              "Erikfather/Decision_tree-python",
              "spyder-ide/spyder",
              "apache/skywalking-cli"
          ]
      }
  } 
    res.status(200).json(data);
  } catch (error: any) {
    res.status(404).json({ error: 'Unexpected error.' + error.message });
  }
}
