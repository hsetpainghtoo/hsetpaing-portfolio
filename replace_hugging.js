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

          <div className="relative w-full max-w-7xl mx-auto min-h-[90vh] flex justify-center items-center pointer-events-none z-10 px-4">
             {/* Text Wrapper - Hugs the Huge Text */}
             <div className="relative flex flex-col pointer-events-none">
                
                {/* Top Left Information (ABOVE HSE) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="absolute bottom-full left-0 mb-4 md:mb-8 w-[280px] md:w-[400px] lg:w-[450px] pointer-events-auto"
                >
                  <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-800 dark:text-gray-200 leading-snug drop-shadow-sm text-left">
                    <span className="text-blue-600 dark:text-blue-400 font-bold block mb-1">Passionate Frontend Developer</span>
                    creating seamless digital experiences with modern tools.
                  </p>
                </motion.div>

                {/* Huge Background Text */}
                <motion.h1
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={\`\${anton.className} text-[15vw] lg:text-[18vw] text-gray-200/80 dark:text-white/10 tracking-wider leading-none whitespace-nowrap select-none uppercase\`}
                >
                  Hset Paing
                </motion.h1>

                {/* Bottom Right Information (BELOW AING) */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute top-full right-0 mt-4 md:mt-8 w-[280px] md:w-[400px] lg:w-[450px] pointer-events-auto text-right flex flex-col items-end"
                >
                  <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-snug mb-5 drop-shadow-sm">
                    <span className="font-bold text-gray-900 dark:text-white block mb-1">The Next Step for Brands Ready to Grow.</span>
                    I craft data-driven digital strategies to scale faster.
                  </p>
                  
                  <div className="flex gap-3 justify-end">
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
             </div>
          </div>

          {/* Center Column (Profile Image) */}
          <div className="absolute inset-0 flex justify-center items-end pointer-events-none z-30">
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
