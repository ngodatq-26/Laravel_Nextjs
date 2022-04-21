module.exports = {
  
  important: true,
  // Active dark mode on class basis
  darkMode: "class",
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  purge: {
    content: [
      "./pages/index.jsx",
      "./pages/Login.jsx",
      "./pages/Register.jsx",
      "./pages/Home.jsx",
      "./modules/auth/components/RegisterForm.jsx",
      "./modules/auth/components/SignInForm.jsx",
      "./modules/common/components/CustomButtonLoading.jsx",
      "./modules/home/components/HeaderCustom.jsx",
      "./modules/home/components/Footer.jsx",
      "./modules/home/components/PostComponent.jsx"
    ],
  },
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        check: "url('/icons/check.svg')",
        landscape: "url('https://thumbs.dreamstime.com/b/social-media-icon-background-wallpaper-white-background-social-media-background-icons-vector-ai-file-version-116684698.jpg')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"],
    },
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
  },
};

