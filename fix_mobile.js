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

          {/* DESKTOP LAYOUT */}
          <div className="relative w-full max-w-7xl mx-auto min-h-[90vh] hidden md:flex justify-center items-center pointer-events-none z-10 px-4">
             {/* Text Wrapper - Hugs the Huge Text */}
             <div className="relative flex flex-col pointer-events-none">
                
                {/* Top Left Information (ABOVE HSE) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="absolute bottom-full left-0 mb-4 md:mb-8 w-full max-w-2xl pointer-events-auto"
                >
                  <div className="inline-flex items-center gap-2 mb-4 bg-white/60 dark:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="text-xs md:text-sm font-medium text-gray-800 dark:text-gray-200">
                      Available for new projects
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-800 dark:text-gray-200 leading-snug drop-shadow-sm text-left max-w-[280px] md:max-w-[320px]">
                      <span className="text-blue-600 dark:text-blue-400 font-bold block mb-1">Passionate Frontend Developer</span>
                      creating seamless digital experiences with modern tools.
                    </p>
                    <div className="flex gap-3">
                      <Button
                        asChild
                        size="default"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-4 shadow-lg shadow-blue-600/20 transition-all hover:scale-105 border-none"
                      >
                        <Link href="/projects">View My Work</Link>
                      </Button>
                      <Button
                        variant="outline"
                        asChild
                        size="default"
                        className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-white/80 dark:hover:bg-gray-800 rounded-xl px-5 py-4 bg-white/60 dark:bg-black/60 backdrop-blur-md transition-all hover:scale-105 shadow-sm"
                      >
                        <Link href="/contact">Let's Talk</Link>
                      </Button>
                    </div>
                  </div>
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
                  <p className="text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-snug drop-shadow-sm">
                    <span className="font-bold text-gray-900 dark:text-white block mb-1">The Next Step for Brands Ready to Grow.</span>
                    I craft data-driven digital strategies to scale faster.
                  </p>
                </motion.div>
             </div>
          </div>

          {/* DESKTOP Profile Image */}
          <div className="absolute inset-0 hidden md:flex justify-center items-center pointer-events-none z-30 translate-x-4 md:translate-x-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0 }}
              className="relative w-[450px] h-[550px] lg:w-[500px] lg:h-[600px] pointer-events-auto"
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

          {/* MOBILE LAYOUT */}
          <div className="flex md:hidden flex-col items-center w-full min-h-[90vh] z-10 px-4 pt-20 relative pointer-events-none">
             {/* Mobile Image & Huge Text */}
             <div className="relative w-full flex justify-center items-start mb-6">
                <motion.h1
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={\`\${anton.className} absolute top-10 text-[26vw] text-gray-200/80 dark:text-white/10 tracking-wider leading-none whitespace-nowrap select-none uppercase z-10\`}
                >
                  Hset Paing
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0 }}
                  className="relative w-[300px] h-[380px] z-20 pointer-events-auto"
                >
                  <Image
                    src="/profile_me_transparent.png"
                    alt="Hset Paing"
                    fill
                    className="object-contain drop-shadow-2xl [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
                    priority
                    quality={100}
                  />
                </motion.div>
             </div>

             {/* Mobile Content Block */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="flex flex-col items-center text-center w-full z-30 pointer-events-auto pb-10"
             >
                <div className="inline-flex items-center gap-2 mb-4 bg-white/60 dark:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                    Available for new projects
                  </span>
                </div>

                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 leading-snug drop-shadow-sm px-2 mb-8">
                  <span className="text-blue-600 dark:text-blue-400 font-bold block mb-1">Passionate Frontend Developer</span>
                  creating seamless, engaging digital experiences with modern tools and frameworks.
                </p>

                <div className="flex flex-col w-full gap-3 max-w-[320px] mb-8">
                  <Button asChild size="default" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 shadow-lg shadow-blue-600/20 border-none group">
                    <Link href="/projects" className="flex items-center justify-center gap-2 text-base">
                      View My Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild size="default" className="w-full border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl py-6 bg-white/60 dark:bg-black/60 backdrop-blur-md text-base">
                    <Link href="/contact">Let's Talk</Link>
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Follow me:</span>
                  {[
                    { icon: Github, href: "https://github.com/hsetpainghtoo" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/hset-paing-htoo-91b997314/" },
                    { icon: MessageCircle, href: "https://m.me/hset.htoo.35" },
                  ].map((social, i) => (
                    <Link key={i} href={social.href} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <social.icon className="w-5 h-5" />
                    </Link>
                  ))}
                </div>
             </motion.div>
          </div>
`;
  
  content = content.substring(0, startIndex) + newContent + content.substring(endIndex);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully fixed mobile layout.');
} else {
  console.log('Could not find tags.');
}
