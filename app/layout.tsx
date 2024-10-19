import type { Metadata } from "next";

import { SocketProvider } from "@/context/VideoSocketContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SocketProvider>
        {children}
        </SocketProvider>
        
      </body>
    </html>
  );
}
