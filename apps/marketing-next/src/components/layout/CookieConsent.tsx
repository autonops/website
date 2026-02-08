"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const GA_ID = "G-CKLHH71XSK";

export function CookieConsent() {
  const [consent, setConsent] = useState<"pending" | "accepted" | "declined">("pending");
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (stored === "accepted") {
      setConsent("accepted");
    } else if (stored === "declined") {
      setConsent("declined");
    } else {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setConsent("declined");
    setShowBanner(false);
  };

  return (
    <>
      {/* Only load GA after user accepts */}
      {consent === "accepted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {/* Cookie consent banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
          <div className="max-w-[700px] mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">
              We use cookies to understand how you use our site and improve your experience. See our{" "}
              <a href="/privacy/" className="text-blue-500 hover:underline">Privacy Policy</a> for details.
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
