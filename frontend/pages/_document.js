// Importing necessary components from 'next/document' module
import { Html, Head, Main, NextScript } from "next/document";

// Defining the default function component named 'Document'
export default function Document() {
  return (
    // HTML root element with 'lang' attribute set to "en" for English language
    <Html lang="en">
      {/* Empty 'Head' element for adding meta tags, stylesheets, etc. */}
      <Head />

      {/* Body of the HTML page */}
      <body>
        {/* The 'Main' component that holds the main content of the page */}
        <Main />

        {/* The 'NextScript' component that contains the necessary scripts for Next.js */}
        <NextScript />
      </body>
    </Html>
  );
}
