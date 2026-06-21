const fs = require('fs');
const file = 'app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const startTag = '          {/* Background Elements */}';
const endTag = '        </section>';

const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = `          {/* Background Elements */}
          <div className="absolute inset-0 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 z-0"></div>

          {/* Huge Background Text (Layer 1 - Solid) - z-10 so it's between Left (z-20) and Right (z-5) */}
          <div className="absolute inset-0 max-md:hidden flex justify-center items-center z-10 pointer-events-none overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={\`\${anton.className} text-[16vw] md:text-[22vw] text-gray-200/80 dark:text-white/5 tracking-wider leading-none whitespace-nowrap select-none uppercase\`}
            >
              Hset Paing
            </motion.h1>
          </div>

          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pointer-events-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column (Bio/Intro) - OVER HSET (z-20) */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-3 order-2 lg:order-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left relative z-20 pointer-events-auto"
              >
                <div className="inline-flex items-center gap-2 mb-6 bg-white/60 dark:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Available for new projects
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight drop-shadow-sm">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                    Passionate <br/> Frontend Developer
                  </span>
                </h2>

                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-lg font-medium bg-white/30 dark:bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/20 dark:border-white/10">
                  creating seamless, engaging digital experiences with modern tools and frameworks.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
                  <Button
                    asChild
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-6 text-lg shadow-xl shadow-blue-500/25 border-none transition-all hover:scale-105"
                  >
                    <Link href="/projects">
                      View My Work <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    size="lg"
                    className="border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-gray-800 rounded-xl px-8 py-6 text-lg bg-white/60 dark:bg-black/60 backdrop-blur-md transition-all hover:scale-105 shadow-sm"
                  >
                    <Link href="/contact">Let&apos;s Talk</Link>
                  </Button>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-semibold drop-shadow-sm">
                    Follow me:
                  </span>
                  <div className="flex gap-3">
                    {[
                      { icon: Github, href: "https://github.com/hsetpainghtoo", label: "GitHub" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/hset-paing-htoo-91b997314/", label: "LinkedIn" },
                      { icon: MessageCircle, href: "https://m.me/hset.htoo.35", label: "Messenger" },
                    ].map((social) => (
                      <Link
                        key={social.label}
                        href={social.href}
                        className="p-3 rounded-full bg-white/60 dark:bg-black/60 backdrop-blur-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 hover:border-blue-500/50 transition-all shadow-sm"
                      >
                        <social.icon className="w-5 h-5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Center Column (Profile Image) - OVER EVERYTHING (z-30) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0 }}
                className="lg:col-span-6 order-1 lg:order-2 flex justify-center relative z-30 pointer-events-none"
              >
                <div className="relative w-[300px] h-[400px] md:w-[450px] md:h-[550px] lg:w-[500px] lg:h-[600px] pointer-events-auto">
                  <Image
                    src="/profile_me_transparent.png"
                    alt="Hset Paing"
                    fill
                    className="object-contain drop-shadow-2xl [-webkit-mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
                    priority
                    quality={100}
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-blue-500/30 via-indigo-500/20 to-purple-500/30 rounded-full blur-[100px] -z-10 animate-pulse pointer-events-none"></div>
                </div>
              </motion.div>

              {/* Right Column (Stats/Bio) - BELOW PAING (z-5) */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-3 order-3 flex flex-col gap-8 text-center lg:text-left items-center lg:items-start relative z-[5] pointer-events-auto"
              >
                <div className="bg-white/40 dark:bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/30 dark:border-white/10 shadow-lg w-full">
                  <h4 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 drop-shadow-sm">
                    The Next Step for <br />
                    Brands <span className="text-blue-600 dark:text-blue-400">Ready to Grow</span>
                  </h4>
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                    I help businesses craft{" "}
                    <span className="font-bold text-blue-700 dark:text-blue-300">
                      data-driven digital strategies
                    </span>{" "}
                    to increase visibility, improve conversions, and scale
                    faster.
                  </p>
                </div>

                <div className="relative w-full">
                  <div className="bg-white/60 dark:bg-black/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-xl text-center hover:border-blue-500/50 transition-all hover:scale-105">
                    <div className="text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-1 tracking-tighter">
                      100%
                    </div>
                    <p className="text-xs uppercase tracking-widest text-gray-700 dark:text-gray-300 font-bold">
                      Client Satisfaction
                    </p>
                    <svg
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-2 text-blue-500 opacity-60"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 5 Q 50 10 100 5"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
`;
  
  content = content.substring(0, startIndex) + newContent + content.substring(endIndex);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully replaced layout.');
} else {
  console.log('Could not find tags.');
}
