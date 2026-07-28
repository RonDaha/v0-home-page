import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upspring — MCP",
  description: "A portal for a whole new world of knowledge.",
};

export default function McpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..650;1,9..144,400..650&family=Geist:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
