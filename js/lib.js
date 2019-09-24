function convert_time(time) {
    let now = new Date();
    let prev = new Date(time);

    let diff = now - prev;

    let sec_passed = diff / 1000;
    let min_passed = sec_passed / 60;
    let hrs_passed = min_passed / 60;
    let days_passed = hrs_passed / 24;

    let chosen;

    if (sec_passed < 60) {
        chosen = [sec_passed.toFixed(0), 'second'];
    }

    else if (min_passed < 60) {
        chosen = [min_passed.toFixed(0), 'minute']
    }

    else if (hrs_passed < 24) {
        chosen = [hrs_passed.toFixed(0), 'hour']
    }

    else {
        chosen = [days_passed.toFixed(0), 'day']
    }

    let addition = '';

    if (chosen[0] > 1) {addition = 's';}

    return chosen[0].toString() + ' ' + chosen[1] + addition + ' ' + 'ago';
}

async function get_latest_repo(username) {
    let response = await axios.get('https://api.github.com/users/' + username + '/repos?sort=created&per_page=1');
    response = response.data[0];
    // let response = get('https://api.github.com/users/' + username + '/repos?sort=created&per_page=1')[0];

    return {
        date: convert_time(response['created_at']),
        url: response['html_url'],
        name: response['full_name']
    }
}

async function get_latest_commit(username) {
    let response = await axios.get('https://api.github.com/users/' + username + '/events/public');
    response = response.data;
    // let response = get('https://api.github.com/users/' + username + '/events/public');

    for (let i = 0; i < response.length; i++) {
        if (response[i]['type'] === 'PushEvent') {
            let event = response[i];
            let payload = event['payload'];
            let commit = payload['commits'][0];
            let repo = event['repo']['name'];

            return {
                date: convert_time(event['created_at']),
                commit: {
                    url: 'https://github.com/' + repo + '/commit/' + commit['sha'],
                    message: commit['message']
                },
                repo: {
                    name: repo,
                    url: 'https://github.com/' + repo
                }
            };
        }
    }
}

async function get_latest_follower(followers_count, username) {
    let response = await axios.get('https://api.github.com/users/' + username + '/followers?per_page=1&page=' + followers_count.toString());
    response = response.data[0];
    // let response = get('https://api.github.com/users/' + username + '/followers?per_page=1&page=' + followers_count.toString())[0];

    return {
        username: response['login'],
        avatar: response['avatar_url'],
        url: response['html_url'],
    }
}