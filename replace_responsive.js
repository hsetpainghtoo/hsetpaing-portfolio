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

          <div className="relative w-full max-w-7xl mx-auto min-h-[90vh] flex justify-center items-center pointer-events-none z-10 px-4 py-20 lg:py-0">
             {/* Text Wrapper - Mobile: Flex Col Justify Between | Desktop: Relative Hugging Container */}
             <div className="relative flex flex-col justify-between lg:justify-center items-center w-full min-h-[75vh] lg:min-h-0 pointer-events-none">
                
                {/* Top Left Information (ABOVE HSE) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative lg:absolute lg:bottom-full lg:left-0 mb-4 lg:mb-8 flex flex-col lg:flex-row items-center lg:items-end gap-6 md:gap-8 pointer-events-auto w-full lg:w-auto mt-4 lg:mt-0 z-40"
                >
                  <div className="w-full sm:w-[350px] md:w-[400px] lg:w-auto flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 mb-4 bg-white/60 dark:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                      </span>
                      <span className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200">
                        Available for new projects
                      </span>
                    </div>
                    <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-800 dark:text-gray-200 leading-snug drop-shadow-sm text-center lg:text-left">
                      <span className="text-blue-600 dark:text-blue-400 font-bold block mb-1">Passionate Frontend Developer</span>
                      creating seamless digital experiences with modern tools.
                    </p>
                  </div>
                  <div className="flex flex-row gap-3">
                    <Button
                      asChild
                      size="default"
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-5 shadow-lg shadow-blue-600/20 transition-all hover:scale-105 border-none"
                    >
                      <Link href="/projects">View My Work</Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      size="default"
                      className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-white/80 dark:hover:bg-gray-800 rounded-lg px-6 py-5 bg-white/60 dark:bg-black/60 backdrop-blur-md transition-all hover:scale-105 shadow-sm"
                    >
                      <Link href="/contact">Let's Talk</Link>
                    </Button>
                  </div>
                </motion.div>

                {/* Huge Background Text */}
                <motion.h1
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={\`\${anton.className} text-[15vw] lg:text-[18vw] text-gray-200/80 dark:text-white/10 tracking-wider leading-none whitespace-nowrap select-none uppercase absolute lg:relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:transform-none lg:top-auto lg:left-auto lg:translate-x-0 lg:translate-y-0 z-20\`}
                >
                  Hset Paing
                </motion.h1>

                {/* Bottom Right Information (BELOW AING) */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative lg:absolute lg:top-full lg:right-0 mt-4 lg:mt-8 w-full sm:w-[350px] md:w-[400px] lg:w-[450px] pointer-events-auto text-center lg:text-right flex flex-col items-center lg:items-end mb-4 lg:mb-0 z-40"
                >
                  <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-snug drop-shadow-sm text-center lg:text-right">
                    <span className="font-bold text-gray-900 dark:text-white block mb-1">The Next Step for Brands Ready to Grow.</span>
                    I craft data-driven digital strategies to scale faster.
                  </p>
                </motion.div>
             </div>
          </div>

          {/* Center Column (Profile Image) */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-30 lg:translate-x-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0 }}
              className="relative w-[300px] h-[400px] md:w-[450px] md:h-[550px] lg:w-[500px] lg:h-[600px] pointer-events-auto"
            >
              <Image
                src="/profile_me_transparent.png"
                alt="Hset Paing"
                fill
                className="object-contain drop-shadow-2xl [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
                priority
                quality={100}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-blue-500/30 via-indigo-500/20 to-purple-500/30 rounded-full blur-[100px] -z-10 animate-pulse pointer-events-none"></div>
            </motion.div>
          </div>
`;
  
  content = content.substring(0, startIndex) + newContent + content.substring(endIndex);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully replaced layout.');
} else {
  console.log('Could not find tags.');
}
