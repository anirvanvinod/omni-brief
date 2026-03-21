<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>OMNIBRIEF | Precision Intelligence</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&amp;family=Space+Grotesk:wght@500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-container-lowest": "#ffffff",
              "on-secondary": "#ffffff",
              "on-tertiary-container": "#ffffff",
              "on-primary-container": "#ffffff",
              "error-container": "#ffdad6",
              "primary-fixed-dim": "#930005",
              "on-primary": "#ffdad5",
              "secondary-fixed-dim": "#ababab",
              "on-tertiary-fixed-variant": "#e2e2e2",
              "on-surface": "#1b1b1b",
              "inverse-primary": "#ffb4aa",
              "secondary": "#5e5e5e",
              "surface-container-highest": "#e2e2e2",
              "on-error-container": "#410002",
              "on-background": "#1b1b1b",
              "background": "#f9f9f9",
              "outline-variant": "#c6c6c6",
              "error": "#ba1a1a",
              "surface-container-high": "#e8e8e8",
              "on-secondary-fixed": "#1b1b1b",
              "inverse-surface": "#303030",
              "surface-container": "#eeeeee",
              "primary": "#000000",
              "outline": "#777777",
              "secondary-fixed": "#c6c6c6",
              "secondary-container": "#d4d4d4",
              "on-primary-fixed-variant": "#ffdad5",
              "tertiary-fixed": "#5d5f5f",
              "primary-fixed": "#c0000a",
              "tertiary-container": "#737575",
              "surface-tint": "#c0000a",
              "tertiary": "#3a3c3c",
              "surface-dim": "#dadada",
              "on-secondary-fixed-variant": "#3b3b3b",
              "surface-variant": "#e2e2e2",
              "on-surface-variant": "#474747",
              "surface-bright": "#f9f9f9",
              "tertiary-fixed-dim": "#454747",
              "on-tertiary-fixed": "#ffffff",
              "inverse-on-surface": "#f1f1f1",
              "primary-container": "#7e0004",
              "surface-container-low": "#f3f3f3",
              "on-tertiary": "#e2e2e2",
              "on-primary-fixed": "#ffffff",
              "on-secondary-container": "#1b1b1b",
              "surface": "#f9f9f9",
              "on-error": "#ffffff"
            },
            fontFamily: {
              "headline": ["Inter"],
              "body": ["Inter"],
              "label": ["Space Grotesk"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
</head>
<body class="bg-background text-on-background font-body antialiased">
<!-- TopAppBar -->
<header class="bg-white dark:bg-black text-black dark:text-white border-b-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex flex-col items-center justify-center py-8 px-6 w-full sticky top-0 z-50">
<div class="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-6">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-4xl" data-icon="cloud">cloud</span>
<div class="flex flex-col">
<span class="font-label text-xs uppercase font-bold tracking-widest text-primary-fixed">68°F / TOKYO</span>
<span class="font-label text-[10px] opacity-60">HEAVY DATA FLOW</span>
</div>
</div>
<h1 class="font-['Inter'] font-black uppercase tracking-tighter text-4xl md:text-6xl text-center">
                OMNIBRIEF
            </h1>
<div class="flex items-center gap-4">
<button class="p-3 bg-surface-container border-2 border-black active:translate-x-1 active:translate-y-1 active:shadow-none transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
<span class="material-symbols-outlined" data-icon="light_mode">light_mode</span>
</button>
<button class="p-3 bg-primary text-white border-2 border-black active:translate-x-1 active:translate-y-1 active:shadow-none transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
<span class="material-symbols-outlined" data-icon="cloud">cloud</span>
</button>
</div>
</div>
</header>
<!-- SideNavBar (Hidden on Mobile) -->
<aside class="fixed left-0 top-0 h-full w-64 z-40 hidden md:flex flex-col bg-white dark:bg-black border-r-4 border-black dark:border-white p-6 pt-40">
<div class="space-y-4">
<nav class="flex flex-col gap-4">
<a class="bg-red-500 text-white border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 p-4 font-label font-bold text-lg hover:translate-x-1 hover:translate-y-1 transition-transform" href="#">
<span class="material-symbols-outlined" data-icon="newspaper">newspaper</span>
<span>Brief</span>
</a>
<a class="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center gap-3 p-4 font-label font-bold text-lg hover:translate-x-1 hover:translate-y-1 transition-transform" href="#">
<span class="material-symbols-outlined" data-icon="show_chart">show_chart</span>
<span>Markets</span>
</a>
<a class="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center gap-3 p-4 font-label font-bold text-lg hover:translate-x-1 hover:translate-y-1 transition-transform" href="#">
<span class="material-symbols-outlined" data-icon="bookmark">bookmark</span>
<span>Saved</span>
</a>
<a class="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center gap-3 p-4 font-label font-bold text-lg hover:translate-x-1 hover:translate-y-1 transition-transform" href="#">
<span class="material-symbols-outlined" data-icon="explore">explore</span>
<span>Explore</span>
</a>
<a class="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center gap-3 p-4 font-label font-bold text-lg hover:translate-x-1 hover:translate-y-1 transition-transform" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span>Settings</span>
</a>
</nav>
</div>
</aside>
<!-- Market Ticker -->
<div class="bg-black text-white w-full overflow-hidden whitespace-nowrap py-3 border-b-4 border-black sticky top-0 md:top-[128px] z-30">
<div class="flex animate-marquee font-label text-sm uppercase tracking-widest gap-12">
<span class="flex gap-2">AAPL <span class="text-green-400">$175.50 (+1.2%)</span></span>
<span class="flex gap-2">BTC <span class="text-red-500">$64,200 (-0.5%)</span></span>
<span class="flex gap-2">NVDA <span class="text-green-400">$875.20 (+4.8%)</span></span>
<span class="flex gap-2">ETH <span class="text-green-400">$3,450.00 (+0.8%)</span></span>
<span class="flex gap-2">TSLA <span class="text-red-500">$165.10 (-2.1%)</span></span>
<!-- Duplicates for seamless loop -->
<span class="flex gap-2">AAPL <span class="text-green-400">$175.50 (+1.2%)</span></span>
<span class="flex gap-2">BTC <span class="text-red-500">$64,200 (-0.5%)</span></span>
<span class="flex gap-2">NVDA <span class="text-green-400">$875.20 (+4.8%)</span></span>
</div>
</div>
<!-- Main Content -->
<main class="md:ml-64 p-6 md:p-12 mb-24 max-w-5xl">
<section class="mb-12">
<h2 class="font-headline font-black text-5xl md:text-8xl tracking-tighter uppercase mb-2">
                Your Daily Brief
            </h2>
<p class="font-label font-bold text-xl text-primary-fixed opacity-80 uppercase tracking-tight">MARCH 14, 2024 • THE PRECISION UPDATE</p>
</section>
<!-- Bento Grid News Feed -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
<!-- Large Featured Card -->
<article class="md:col-span-2 bg-surface-container-lowest border-4 border-black rounded-[24px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
<div class="relative h-64 w-full">
<img alt="AI Neural Network Illustration" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" data-alt="Digital blue neural network connections floating in void" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTgcyaWG83ZJZCQFPMHMd9kPpX5-X8coUTDDH2ZyL-TY0EhZiJNIe4PwV_ffpmsy4kKSudcSEm_9nzEWHPryniJTBztu7iNHGZY6s_jAGrzWh8V6NXp98bnWqLH0CH7wLEldUW2btlhglh-gKya-H3o41mfUKnrXdlgTMUlb5PyOIy6RIKVZKWjY239Nbk226zUwcZCEjq0waSzzv77veh93QibFw3uJ6JNiJvTdoItrBte0ggfBJZzdvaWxihPYaZ4pniRKXazOc"/>
<div class="absolute top-4 left-4">
<span class="bg-primary text-white font-label font-bold px-4 py-2 border-2 border-black rounded-full uppercase text-xs">🤖 TECH</span>
</div>
</div>
<div class="p-8">
<h3 class="font-headline font-black text-3xl md:text-5xl leading-none tracking-tighter mb-4">
                        LLM AGENTS ARE NOW MANAGING SMALL VENTURE FUNDS.
                    </h3>
<p class="font-body text-lg text-on-surface-variant mb-8 line-clamp-3">
                        Silicon Valley is witnessing a paradigm shift as autonomous AI agents begin to handle seed-stage capital allocations with higher precision than human analysts.
                    </p>
<button class="w-full bg-white border-4 border-black text-black font-headline font-black py-5 text-xl uppercase tracking-widest hover:bg-black hover:text-white active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                        EXPLAIN LIKE I'M 5
                    </button>
</div>
</article>
<!-- Card 2 -->
<article class="bg-surface-container-lowest border-4 border-black rounded-[24px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
<div class="p-6 flex-grow">
<div class="mb-4">
<span class="bg-primary text-white font-label font-bold px-3 py-1 border-2 border-black rounded-full uppercase text-[10px]">📊 MARKETS</span>
</div>
<h3 class="font-headline font-black text-2xl tracking-tighter mb-4">
                        CRUDE OIL SURGES AMID GLOBAL SUPPLY TIGHTENING.
                    </h3>
<p class="font-body text-on-surface-variant mb-6">
                        Brent crude hits $85 per barrel as manufacturing demand outpaces current refinery capacities.
                    </p>
</div>
<div class="px-6 pb-6">
<button class="w-full bg-white border-2 border-black text-black font-label font-bold py-3 uppercase text-sm hover:bg-black hover:text-white transition-all">
                        Read Analysis
                    </button>
</div>
</article>
<!-- Card 3 -->
<article class="bg-surface-container-lowest border-4 border-black rounded-[24px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
<div class="p-6 flex-grow">
<div class="mb-4">
<span class="bg-primary text-white font-label font-bold px-3 py-1 border-2 border-black rounded-full uppercase text-[10px]">🌐 GEOPOLITICS</span>
</div>
<h3 class="font-headline font-black text-2xl tracking-tighter mb-4">
                        EU PROPOSES NEW DIGITAL PRIVACY FRAMEWORK.
                    </h3>
<p class="font-body text-on-surface-variant mb-6">
                        Stricter regulations on cross-border data processing could reshape the global advertising landscape.
                    </p>
</div>
<div class="px-6 pb-6">
<button class="w-full bg-white border-2 border-black text-black font-label font-bold py-3 uppercase text-sm hover:bg-black hover:text-white transition-all">
                        Read Analysis
                    </button>
</div>
</article>
<!-- Card 4 (Data Centric) -->
<article class="md:col-span-2 bg-surface-container-high border-4 border-black rounded-[24px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
<div class="flex flex-col md:flex-row gap-8 items-center">
<div class="w-full md:w-1/3">
<h4 class="font-label font-bold uppercase text-xs mb-4 opacity-60">PRECISION METRICS</h4>
<div class="space-y-4">
<div class="flex justify-between items-end border-b-2 border-black pb-2">
<span class="font-label font-bold">SENTIMENT INDEX</span>
<span class="font-label font-bold text-2xl">72% <span class="text-xs">BULLISH</span></span>
</div>
<div class="flex justify-between items-end border-b-2 border-black pb-2">
<span class="font-label font-bold">VOLATILITY</span>
<span class="font-label font-bold text-2xl">0.14 <span class="text-xs text-red-600">LOW</span></span>
</div>
</div>
</div>
<div class="flex-grow">
<h3 class="font-headline font-black text-3xl tracking-tighter mb-4">
                            MARKET LIQUIDITY REACHES 24-MONTH HIGH.
                        </h3>
<p class="font-body text-on-surface-variant">
                            Capital inflows into emerging markets have accelerated, creating significant arbitrage opportunities for quantitative traders.
                        </p>
</div>
</div>
</article>
</div>
</main>
<!-- BottomNavBar (Mobile Only) -->
<nav class="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 md:hidden bg-white dark:bg-black border-t-4 border-black dark:border-white z-50">
<a class="flex flex-col items-center justify-center bg-red-500 text-white p-2 rounded-xl border-2 border-black active:scale-95 transition-transform" href="#">
<span class="material-symbols-outlined" data-icon="event_note">event_note</span>
<span class="font-label font-bold text-[10px] uppercase">Daily</span>
</a>
<a class="flex flex-col items-center justify-center text-black dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-900 active:scale-95 transition-transform" href="#">
<span class="material-symbols-outlined" data-icon="trending_up">trending_up</span>
<span class="font-label font-bold text-[10px] uppercase">Ticker</span>
</a>
<a class="flex flex-col items-center justify-center text-black dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-900 active:scale-95 transition-transform" href="#">
<span class="material-symbols-outlined" data-icon="notifications_active">notifications_active</span>
<span class="font-label font-bold text-[10px] uppercase">Alerts</span>
</a>
<a class="flex flex-col items-center justify-center text-black dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-gray-900 active:scale-95 transition-transform" href="#">
<span class="material-symbols-outlined" data-icon="account_circle">account_circle</span>
<span class="font-label font-bold text-[10px] uppercase">Profile</span>
</a>
</nav>
<style>
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            display: flex;
            width: fit-content;
            animation: marquee 20s linear infinite;
        }
    </style>
</body></html>