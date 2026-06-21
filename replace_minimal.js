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

          {/* Huge Background Text (Layer 1 - Solid) */}
          <div className="absolute inset-0 max-md:hidden flex justify-center items-center z-10 pointer-events-none overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={\`\${anton.className} text-[16vw] md:text-[22vw] text-gray-200/50 dark:text-white/5 tracking-wider leading-none whitespace-nowrap select-none uppercase\`}
            >
              Hset Paing
            </motion.h1>
          </div>

          <div className="relative w-full max-w-7xl mx-auto h-[90vh] min-h-[600px] pointer-events-none z-20">
            {/* Top Left Information (Over HSE) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-[15%] md:top-[25%] left-6 md:left-12 lg:left-20 max-w-xs md:max-w-md pointer-events-auto z-30"
            >
              <p className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed drop-shadow-sm">
                <span className="text-blue-600 dark:text-blue-400 font-bold block mb-2">Passionate Frontend Developer</span>
                creating seamless, engaging digital experiences with modern tools and frameworks.
              </p>
            </motion.div>

            {/* Bottom Right Information (Below AING) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-[10%] md:bottom-[20%] right-6 md:right-12 lg:right-20 max-w-xs md:max-w-md pointer-events-auto z-30 text-right flex flex-col items-end"
            >
              <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 drop-shadow-sm">
                <span className="font-bold text-gray-900 dark:text-white block mb-2">The Next Step for Brands Ready to Grow.</span>
                I craft data-driven digital strategies to scale faster.
              </p>
              
              <div className="flex gap-4 justify-end">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 md:px-8 py-6 text-base md:text-lg shadow-xl shadow-blue-600/20 transition-all hover:scale-105 border-none"
                >
                  <Link href="/projects">
                    View My Work
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-white/80 dark:hover:bg-gray-800 rounded-xl px-6 md:px-8 py-6 text-base md:text-lg bg-white/60 dark:bg-black/60 backdrop-blur-md transition-all hover:scale-105 shadow-sm"
                >
                  <Link href="/contact">Let's Talk</Link>
                </Button>
              </div>
            </motion.div>

            {/* Center Column (Profile Image) */}
            <div className="absolute inset-0 flex justify-center items-end md:items-center pointer-events-none z-20">
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
          </div>
`;
  
  content = content.substring(0, startIndex) + newContent + content.substring(endIndex);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully replaced layout.');
} else {
  console.log('Could not find tags.');
}
