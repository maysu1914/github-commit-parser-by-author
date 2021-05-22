author_name = 'author'

timeline_bodies = document.getElementsByClassName('TimelineItem-body');

commit_list = [];
for (let timeline of timeline_bodies) {
    commit_bodies = timeline.querySelectorAll("div.flex-auto.min-width-0");
    for (commit_body of commit_bodies) {
        commit = commit_body.querySelectorAll('p.mb-1, div.Details-content--hidden');
        author = commit_body.querySelector('.commit-author');
        if (getText(author) == author_name) {
            commit_message = getText(commit);
            // skip merge commits
            if (!commit_message.includes('Merge remote-tracking') && !commit_message.includes('Merge branch')) {
                commit_list.push(commit_message.split('\n').reverse().join('\n'))
            }
        }
    }
}

console.log(commit_list.reverse().join('\n'))

function getText(element) {
    if (NodeList.prototype.isPrototypeOf(element)) {
        text = '';
        for (el of element) {
            text += el.textContent.replace('↵', '').replace('…', '').replace('…', '').trim();
        }
        return text.split('\n').join('|').replace('||', '|').split('|').join('\n')
    } else {
        return element.textContent;
    }
}