"use client";

import Script from "next/script";

/**
 
 * @page_path page_path: window.location.pathname, Automatically tracks the current page path for reporting.
 
 * @Max_age max-age=7200 Cookie will expire in 2 hours.
 
 * @Secure Ensures cookies are only sent over HTTPS.
 
 * @Samesite samesite=none Allows cookies to be sent in cross-site contexts, which is necessary for Google        Analytics to work across different domains.
 
 * @dangerouslySetInnerHTML : This property allows inserting raw JavaScript into the component. It is required here to include the initialization code directly into the <script> tag.
 
 * @id "gtag-init" : Assigns an identifier to this <Script> component. This helps to track and debug the script if needed.
 *
 */

export const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy="afterInteractive" // load after the user can interact with the page, optimizing performance.
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_G_TAG_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_G_TAG_ID}', {
            page_path: window.location.pathname, 
            cookie_flags: 'max-age=7200;secure;samesite=none'
          });
        `,
        }}
      />
    </>
  );
};
