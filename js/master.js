const preloader = document.querySelector('.preloader');
const fadeEffect = setInterval(() => {
  if (!preloader.style.opacity) {
    preloader.style.opacity = 1;
  }
  if (preloader.style.opacity > 0) {
    preloader.style.opacity -= 0.1;
  } else {
    clearInterval(fadeEffect);
    preloader.style.display = "none";
    setTimeout(() => {
      document.querySelector(`#app`).style.opacity = 1;
    }, 500)
  }
}, 100);
let config = {
  "github-username": "SGezha",
  "description": "Full Stack Developer",
  "status": "",
  "social-media": [
    { "fa_icon": "fab fa-github ", "url": "https://github.com/SGezha", "color": "black" },
    { "fa_icon": "far fa-money-bill-alt ", "url": "https://qiwi.me/66bd80aa-f73e-4fef-89f1-656adfd7c659", "color": "black" },
    { "fa_icon": "fab fa-telegram ", "url": "https://t.me/FuNSasha", "color": "black" },
    { "fa_icon": "fab fa-youtube ", "url": "https://www.youtube.com/channel/UCJ1HJIEN5B_Aabm941F0zjQ", "color": "black" },
    { "fa_icon": "fab fa-discord ", "url": "https://discord.gg/Wsa3944", "color": "black" },
    { "fa_icon": "fab fa-vk ", "url": "https://vk.com/4ffun", "color": "black" },
    { "fa_icon": "fas fa-qrcode ", "url": "img/social.png", "color": "black" }
  ]
};

start();

window.onload = () => fadeEffect; 

async function start() {
  let user_data = await axios.get('https://api.github.com/users/' + config['github-username']);
  user_data = user_data.data;
  let repos = await axios.get(user_data['repos_url']);
  repos = user_data.data;

  let user = {
    id: user_data['id'],
    username: user_data['login'],
    avatar: user_data['avatar_url'],
    href: 'https://github.com/' + user_data['username'],
    name: user_data['name'],
    followers_count: user_data['followers'],
    location: user_data['location'],
    repos: repos
  };


  let title = new Vue({
    el: '#title',
    data: {
      username: user.username
    }
  });

  let favicon = new Vue({
    el: '#favicon',
    data: {
      favicon: user.avatar
    }
  });

  let latest_repo = await get_latest_repo(user.username);
  let latest_commit = await get_latest_commit(user.username);
  let latest_follower = await get_latest_follower(user.followers_count, user.username);

  let app = new Vue({
    el: '#app',
    created: function () {
      this.getRandomStatus();
    },
    methods: {
      getRandomStatus() {
        this.status = status[Math.floor(Math.random() * status.length)];
      }
    },
    data: {
      username: user.username,
      avatar: user.avatar,
      location: user.location,
      name: user.name,
      user_url: user.href,
      social_media: config['social-media'],
      description: config['description'],
      status: config['status'],
      latest_commit_url: latest_commit.commit.url,
      latest_commit_repo_url: latest_commit.repo.url,
      latest_commit_repo: latest_commit.repo.name,
      latest_commit_date: latest_commit.date,
      latest_commit_message: latest_commit.commit.message,
      latest_repo_url: latest_repo.url,
      latest_repo_date: latest_repo.date,
      latest_repo_name: latest_repo.name,
      latest_follower_url: latest_follower.url,
      latest_follower_avatar: latest_follower.avatar,
      latest_follower_username: latest_follower.username,
      user_followers_count: user.followers_count
    }
  });
}

let status = ["Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.", "All computers wait at the same speed.", "A misplaced decimal point will always end up where it will do the greatest damage.", "A good programmer looks both ways before crossing a one-way street.", "A computer program does what you tell it to do, not what you want it to do.", "\"Intel Inside\" is a Government Warning required by Law.", "Common sense gets a lot of credit that belongs to cold feet.", "Chuck Norris doesn’t go hunting. Chuck Norris goes killing.", "Chuck Norris counted to infinity... twice.", "C is quirky, flawed, and an enormous success.", "Beta is Latin for still doesn’t work.", "ASCII stupid question, get a stupid ANSI!", "Artificial Intelligence usually beats natural stupidity.", "Any fool can use a computer. Many do.", "Hey! It compiles! Ship it!", "Hate cannot drive out hate; only love can do that.", "Guns don’t kill people. Chuck Norris kills people.", "God is real, unless declared integer.", "First, solve the problem. Then, write the code.", "Experience is the name everyone gives to their mistakes.", "Every piece of software written today is likely going to infringe on someone else’s patent.", "Computers make very fast, very accurate mistakes.", "Computers do not solve problems, they execute solutions.", "I have NOT lost my mind—I have it backed up on tape somewhere.", "If brute force doesn’t solve your problems, then you aren’t using enough.", "It works on my machine.", "Java is, in many ways, C++??.", "Keyboard not found...Press any key to continue.", "Life would be so much easier if we only had the source code.", "Mac users swear by their Mac, PC users swear at their PC.", "Microsoft is not the answer. Microsoft is the question. \"No\" is the answer.", "MS-DOS isn’t dead, it just smells that way.", "Only half of programming is coding. The other 90% is debugging.", "Pasting code from the Internet into production code is like chewing gum found in the street.", "Press any key to continue or any other key to quit.", "Profanity is the one language all programmers know best.", "The best thing about a boolean is even if you are wrong, you are only off by a bit.", "The nice thing about standards is that there are so many to choose from.", "There are 3 kinds of people: those who can count and those who can’t.", "There is no place like 127.0.0.1", "There is nothing quite so permanent as a quick fix.", "There’s no test like production.", "To err is human, but for a real disaster you need a computer.", "Ubuntu is an ancient African word, meaning \"can’t configure Debian\"", "UNIX is the answer, but only if you phrase the question very carefully.", "Usenet is a Mobius strand of spaghetti.", "Weeks of coding can save you hours of planning.", "When your computer starts falling apart, stop hitting it with a Hammer!", "Who is General Failure? And why is he reading my disk?", "You can stand on the shoulders of giants OR a big enough pile of dwarfs, works either way.", "You start coding. I’ll go find out what they want.", "I love deadlines. I like the whooshing sound they make as they fly by.", "I think we agree, the past is over.", "In order to be irreplaceable, one must always be different.", "In the future everyone will be famous for fifteen minutes.", "In three words I can sum up everything I’ve learned about life: it goes on.", "It is a mistake to think you can solve any major problems just with potatoes.", "It’s kind of fun to do the impossible.", "Java is to JavaScript what Car is to Carpet.", "Judge a man by his questions rather than by his answers.", "Just don’t create a file called -rf.", "Knowledge is power.", "Let’s call it an accidental feature.", "Linux is only free if your time has no value.", "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", "Never trust a computer you can’t throw out a window.", "Nobody expects the Spanish inquisition.", "On the Internet, nobody knows you’re a dog.", "One man’s constant is another man’s variable.", "People that hate cats will come back as mice in their next life.", "Perl - The only language that looks the same before and after RSA encryption.", "PHP – Yeah, you know me.", "The future is here. It is just not evenly distributed yet.", "The greatest performance improvement of all is when a system goes from not-working to working.", "Software is like sex: It’s better when it’s free.", "Sour, sweet, bitter, pungent, all must be tasted.", "Stay hungry, stay foolish.", "The artist belongs to his work, not the work to the artist.", "The only \"intuitive\" interface is the nipple. After that it’s all learned.", "The only completely consistent people are the dead.", "The problem with troubleshooting is that trouble shoots back.", "The three great virtues of a programmer: laziness, impatience, and hubris.", "Time is an illusion. Lunchtime doubly so.", "When debugging, novices insert corrective code; experts remove defective code.", "When in doubt, leave it out.", "Walking on water and developing software from a specification are easy if both are frozen.", "We cannot learn without pain.", "We have always been shameless about stealing great ideas.", "You can kill a man but you can’t kill an idea.", "You can never underestimate the stupidity of the general public.", "You must have chaos in your soul to give birth to a dancing star.", "Without requirements or design, programming is the art of adding bugs to an empty \"text\" file.", "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code.", "You miss 100 percent of the shots you never take.", "One of the biggest problems that software developers face is that technology changes rapidly. It is very hard to stay current.", "Ideas want to be ugly.", "Developer: an organism that turns coffee into code.", "One man´s crappy software is another man´s full time job.", "It´s okay to figure out murder mysteries, but you shouldn´t need to figure out code. You should be able to read it.", "Programming languages, like pizzas, come in only two sizes: too big and too small.", "Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the universe trying to produce bigger and better idiots. So far, the universe is winning.", "Plan to throw one (implementation) away; you will, anyhow.", "Every good work of software starts by scratching a developer´s personal itch", "Perfection (in design) is achieved not when there is nothing more to add, but rather when there is nothing more to take away.", "Prolific programmers contribute to certain disaster.", "Programming can be fun, so can cryptography; however they should not be combined.", "It´s better to wait for a productive programmer to become available than it is to wait for the first available programmer to become productive.", "An organization that treats its programmers as morons will soon have programmers that are willing and able to act like morons only.", "Real programmers can write assembly code in any language.", "The key to performance is elegance, not battalions of special cases.", "Inside every large program, there is a program trying to get out.", "Why do we never have time to do it right, but always have time to do it over?", "The goal of Computer Science is to build something that will last at least until we´ve finished building it. ", "A good way to stay flexible is to write less code.", "No matter what the problem is, it´s always a people problem.", "Every big computing disaster has come from taking too many ideas and putting them in one place.", "Adding manpower to a late software project makes it later!", "The best way to get a project done faster is to start sooner", "Even the best planning is not so omniscient as to get it right the first time.", "All you need is love. But a new pair of shoes never hurt anybody.", "The best revenge is massive success.", "Reality itself is too obvious to be true.", "Be yourself; everyone else is already taken.", "Let me just change this one line of code…", "Fast, Good, Cheap. Pick two.", "Did you know? The collective noun for a group of programmers is a merge-conflict.", "If there is no struggle, there is no progress.", "You have to learn the rules of the game. And then you have to play better than anyone else.", "Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.", "Insanity: doing the same thing over and over again and expecting different results.", "A person who never made a mistake never tried anything new.", "Logic will get you from A to B. Imagination will take you everywhere.", "When the solution is simple, God is answering.", "If you can´t explain it simply, you don´t understand it well enough.", "If the facts don´t fit the theory, change the facts.", "It is a miracle that curiosity survives formal education.", "I only believe in statistics that I doctored myself.", "Men and nations behave wisely when they have exhausted all other resources.", "If you´re going through hell, keep going.", "Success is not forever and failure isn´t fatal.", "I have never let my schooling interfere with my education.", "The secret of getting ahead is getting started.", "Get your facts first, then you can distort them as you please.", "Apparently there is nothing that cannot happen today.", "Plans are worthless, but planning is everything.", "Before you marry a person you should first make them use a computer with slow Internet to see who they really are.", "I just invent, then wait until man comes around to needing what I´ve invented.", "The best way to make your dreams come true is to wake up.", "If you can't write it down in English, you can't code it.", "Suspicion is healthy. It’ll keep you alive.", "People that hate cats will come back as mice in their next life.", "If your parents never had children, chances are you won’t, either.", "Sometimes I think we´re alone in the universe & sometimes I think we´re not. In either case the idea is quite staggering", "Talk is cheap, show me the code!", "They did not know it was impossible, so they did it!", "You are what you share.", "You want it in one line? Does it have to fit in 80 columns?", "The Internet? Is that thing still around?", "The journey is the destination.", "OO programming offers a sustainable way to write spaghetti code. It lets you accrete programs as a series of patches.", "Ruby is rubbish! PHP is phpantastic!", "So long and thanks for all the fish!", "If I had more time, I would have written a shorter letter.", "The best reaction to \"this is confusing, where are the docs\" is to rewrite the feature to make it less confusing, not write more docs.", "The older I get, the more I believe that the only way to become a better programmer is by not programming.", "\"That hardly ever happens\" is another way of saying \"it happens\".", "Hello, PHP, my old friend.", "Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations.", "In design, complexity is toxic.", "Good is the enemy of great, but great is the enemy of shipped.", "Don't make the user provide information that the system already knows.", "You're bound to be unhappy if you optimize everything.", "If the programmers like each other, they play a game called 'pair programming'. And if not then the game is called 'peer review'.", "Simplicity is prerequisite for reliability.", "Focus on WHY instead of WHAT in your code will make you a better developer", "The best engineers I know are artists at heart. The best designers I know are secretly technicians as well.", "Poor management can increase software costs more rapidly than any other factor.", "If you can't deploy your services independently then they aren't microservices.", "If you can't deploy your services independently then they aren't microservices.", "No one hates software more than software developers.", "The proper use of comments is to compensate for our failure to express ourself in code.", "Code is like humor. When you have to explain it, it's bad.", "Fix the cause, not the symptom.", "Programmers are constantly making things more complicated than they need to be BECAUSE FUTURE. Fuck the future. Program for today.", "People will realize that software is not a product; you use it to build a product.", "Design is choosing how you will fail.", "Focus is saying no to 1000 good ideas.", "Code never lies, comments sometimes do.", "Be careful with each other, so you can be dangerous together.", "When making a PR to a major project, you have to \"sell\" that feature / contribution. You have to be convincing on why it belongs there. The maintainer is going to be the one babysitting that code forever.", "Be the change you wish was made. Share the lessons you wish you'd been taught. Make the sacrifices you wish others had made.", "The only way to achieve flexibility is to make things as simple and easy to change as you can."];