export const GOOGLE_SITE_VERIFICATION = 'i_rImxUz8IK5zedSClxerX-sEpZs_T1oRE2S15KqdxA';
export const GA_MEASUREMENT_ID = 'G-S80HSYVQJE';

export const headAnalytics = `    <meta name="google-site-verification" content="${GOOGLE_SITE_VERIFICATION}" />

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}');
    </script>`;
