import type { Metadata } from "next";
import { ReactQueryProvider } from "@/shared/providers/ReactQuery";
import { UIprovider as ChakraProvider } from "@/shared/providers/UIprovider";

import { SessionProvider } from "@/shared/providers/SessionProvider";

export const metadata: Metadata = {
  title: "DeimosCloud",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          <SessionProvider>
            <ChakraProvider>{children}</ChakraProvider>
          </SessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
