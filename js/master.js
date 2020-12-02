const preloader = document.querySelector(".preloader");
const fadeEffect = setInterval(() => {
  if (!preloader.style.opacity) {
    preloader.style.opacity = 1;
  }
  if (preloader.style.opacity > 0) {
    preloader.style.opacity -= 0.1;
  } else {
    startAnimation();
    clearInterval(fadeEffect);
    preloader.style.display = "none";
    setTimeout(() => {
      document.querySelector(`#app`).style.opacity = 1;
      rand();
    }, 500);
  }
}, 100);
let config = {
  "github-username": "SGezha",
  description: "Full Stack Developer",
  status: "",
  "social-media": [
    {
      fa_icon: "fab fa-github ",
      url: "https://github.com/SGezha",
      color: "black"
    },
    {
      fa_icon: "far fa-money-bill-alt ",
      url: "https://qiwi.me/66bd80aa-f73e-4fef-89f1-656adfd7c659",
      color: "black"
    },
    { fa_icon: "fab fa-vk ", url: "https://vk.com/4ffun", color: "black" },
    {
      fa_icon: "fab fa-telegram ",
      url: "https://t.me/FuNSasha",
      color: "black"
    },
    {
      fa_icon: "fab fa-twitch ",
      url: "https://www.twitch.tv/4funsasha",
      color: "black"
    },
    {
      fa_icon: "fab fa-youtube ",
      url: "https://www.youtube.com/channel/UCJ1HJIEN5B_Aabm941F0zjQ",
      color: "black"
    },
    {
      fa_icon: "fab fa-discord ",
      url: "https://discord.gg/Wsa3944",
      color: "black"
    },
    { fa_icon: "fas fa-qrcode ", url: "img/social.png", color: "black" }
  ]
};

start();

window.onload = () => fadeEffect;

async function start() {
  let user_data = await axios.get(
    "https://api.github.com/users/" + config["github-username"]
  );
  user_data = user_data.data;
  let repos = await axios.get(user_data["repos_url"]);
  repos = user_data.data;

  let user = {
    id: user_data["id"],
    username: user_data["login"],
    avatar: user_data["avatar_url"],
    href: "https://github.com/" + user_data["username"],
    name: user_data["name"],
    followers_count: user_data["followers"],
    location: user_data["location"],
    repos: repos
  };

  let title = new Vue({
    el: "#title",
    data: {
      username: user.username
    }
  });

  let favicon = new Vue({
    el: "#favicon",
    data: {
      favicon: user.avatar
    }
  });

  let latest_repo = await get_latest_repo(user.username);
  let latest_commit = await get_latest_commit(user.username);
  let latest_follower = await get_latest_follower(
    user.followers_count,
    user.username
  );

  let app = new Vue({
    el: "#app",
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
      social_media: config["social-media"],
      description: config["description"],
      status: config["status"],
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
