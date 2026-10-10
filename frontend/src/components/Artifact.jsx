import {
  Check,
  Code2,
  Copy,
  Eye,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import Editor from "@monaco-editor/react";

function Artifact() {
  const [collapsed, setCollapsed] = useState(false);
  const [tab, setTab] = useState("code");
  const [activeFile, setActiveFile] = useState(0);
  const [copied, setCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { artifacts = [] } = useSelector((state) => state.message);

  const artifact = artifacts[0];
  const files = artifact?.files ?? [];

  useEffect(() => {
    setActiveFile(0);
    setTab("code");
  }, [artifact]);

  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  if (!artifact || files.length === 0) return null;

  const file = files[activeFile] ?? files[0];

  const htmlFile = files.find((f) => f.name === "index.html");
  const cssFile = files.find((f) => f.name === "style.css");
  const jsFile = files.find((f) => f.name === "script.js");

  const canPreview = Boolean(htmlFile);

  const previewDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${cssFile?.content ?? ""}</style>
</head>
<body>
  ${htmlFile?.content ?? ""}
  <script>${jsFile?.content ?? ""}<\/script>
</body>
</html>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(file?.content ?? "");
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy file:", error);
    }
  };

  const detectLanguage = (fileName = "") => {
    const name = fileName.toLowerCase();

    if (name.endsWith(".html")) return "html";
    if (name.endsWith(".css")) return "css";
    if (name.endsWith(".js")) return "javascript";
    if (name.endsWith(".jsx")) return "javascript";
    if (name.endsWith(".ts")) return "typescript";
    if (name.endsWith(".tsx")) return "typescript";
    if (name.endsWith(".json")) return "json";
    if (name.endsWith(".py")) return "python";
    if (name.endsWith(".java")) return "java";
    if (name.endsWith(".cpp")) return "cpp";
    if (name.endsWith(".c")) return "c";

    return "plaintext";
  };

  const PanelContent = ({ mobile = false } = {}) => (
    <>
      {!collapsed || mobile ? (
        <div className="flex h-full flex-col bg-[#0d0f14]">
          <div className="flex h-14 shrink-0 items-center gap-3 border-b border-white/6 px-4">
            <button
              type="button"
              aria-label="Collapse artifact panel"
              className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-slate-500 transition-colors duration-150 hover:bg-white/5 hover:text-slate-200"
              onClick={() => {
                if (mobile) {
                  setMobileOpen(false);
                } else {
                  setCollapsed(true);
                }
              }}
            >
              <PanelRightClose size={16} />
            </button>

            <div className="flex min-w-0 flex-1 items-center gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-indigo-500/20 bg-indigo-500/10">
                <Code2 className="text-indigo-400" size={12} />
              </div>
              <div className="truncate text-[13px] font-medium text-slate-200">
                {artifact.title}
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy current file"
              title="Copy code"
              className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border-none bg-transparent px-2.5 py-1.5 text-[11px] font-medium text-slate-400 transition-colors duration-150 hover:bg-white/5 hover:text-slate-200"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>

            {canPreview && (
              <div className="flex items-center gap-1 rounded-lg border border-white/6 bg-white/4 p-1">
                <button
                  type="button"
                  onClick={() => setTab("code")}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors duration-150 ${
                    tab === "code"
                      ? "bg-indigo-500 text-white"
                      : "text-slate-500 hover:text-slate-200"
                  }`}
                >
                  <Code2 size={11} /> Code
                </button>

                <button
                  type="button"
                  onClick={() => setTab("preview")}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors duration-150 ${
                    tab === "preview"
                      ? "bg-indigo-500 text-white"
                      : "text-slate-500 hover:text-slate-200"
                  }`}
                >
                  <Eye size={11} /> Preview
                </button>
              </div>
            )}
          </div>

          {tab === "code" && (
            <div className="flex shrink-0 overflow-x-auto border-b border-white/6 [&::-webkit-scrollbar]:hidden">
              {files.map((f, index) => (
                <button
                  key={`${f.name}-${index}`}
                  type="button"
                  onClick={() => setActiveFile(index)}
                  className={`relative cursor-pointer whitespace-nowrap border-r border-white/5 bg-transparent px-4 py-2.5 text-[11px] font-medium transition-colors duration-150 ${
                    activeFile === index
                      ? "text-indigo-400"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {f.name}
                  {activeFile === index && (
                    <div className="absolute right-0 bottom-0 left-0 h-0.5 rounded-t-full bg-indigo-500" />
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="min-h-0 flex-1 overflow-hidden">
            {tab === "preview" && canPreview ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full w-full"
              >
                <iframe
                  title="Artifact preview"
                  srcDoc={previewDoc}
                  sandbox="allow-scripts"
                  className="h-full w-full bg-white"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full w-full"
              >
                <Editor
                  theme="vs-dark"
                  language={detectLanguage(file?.name)}
                  value={file?.content ?? ""}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 13,
                    wordWrap: "on",
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: { top: 16 },
                    lineNumbers: "on",
                    renderLineHighlight: "none",
                  }}
                />
              </motion.div>
            )}
          </div>
        </div>
      ) : (
        <div className="hidden h-full shrink-0 flex-col items-center gap-3 border-l border-white/6 bg-[#0d0f14] py-4 lg:flex">
          <button
            type="button"
            aria-label="Expand artifact panel"
            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-slate-500 transition-colors duration-150 hover:bg-white/5 hover:text-slate-200"
            onClick={() => setCollapsed(false)}
          >
            <PanelRightOpen size={16} />
          </button>

          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div
              className="whitespace-nowrap text-[10px] font-medium tracking-widest text-slate-600 uppercase"
              style={{ writingMode: "vertical-lr" }}
            >
              {artifact.title}
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-24 right-4 z-40 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[12px] font-medium shadow-lg shadow-indigo-500/20 border-none cursor-pointer transition-colors duration-150"
      >
        <Code2 size={13} />
        View Code
      </button>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed inset-y-0 right-0 z-50 w-[88vw] max-w-[420px] border-l border-white/[0.06] overflow-hidden"
            >
              {PanelContent({ mobile: true })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ width: collapsed ? 48 : 400 }}
        transition={{ duration: 0.25, ease: easeInOut }}
        className="hidden h-full shrink-0 overflow-hidden lg:block"
      >
        {PanelContent()}
      </motion.div>
    </>
  );
}

export default Artifact;
