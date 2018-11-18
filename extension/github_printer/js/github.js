
(function() {
  // console.log("js/github.js");

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // console.log("onMessage:", message);

    if (message.command == "getPageDetails") {
      // MEMO: URLとして $("meta[property='og:url']").attr("content") は使用できない。ページ遷移時に適切に書き換わらないため。
      const userAndRepositoryName = $("meta[name='octolytics-dimension-repository_nwo']").attr("content");
      const userName              = (userAndRepositoryName != null ? userAndRepositoryName.split("/")[0] : null);
      const repositoryName        = (userAndRepositoryName != null ? userAndRepositoryName.split("/")[1] : null);
      if (userAndRepositoryName == null || userName == null || repositoryName == null) return;

      const title  = $("span.js-issue-title").text().trim();
      const number = parseInt($("span.gh-header-number").text().trim().replace(/^#/, ""));
      if (title == "" || number == null) return;

      const selectedLink = $("meta[name='selected-link']").attr("value");
      if (selectedLink == "repo_issues") {
        const url = "https://github.com/" + userName + "/" + repositoryName + "/issues/" + String(number);
        const result = {
          site: "github",
          type: "issue",
          url: url,
          userName: userName,
          repositoryName: repositoryName,
          title: title,
          number: number,
          formattedText: {
            plain: title,
            comment: "Issue #" + String(number) + " " + title,
            markdown: "[Issue#" + String(number) + " " + title + "](" + url + ")",
          },
        };
        // console.log("result:", result);
        sendResponse(result);
      } else if (selectedLink == "repo_pulls") {
        const url = "https://github.com/" + userName + "/" + repositoryName + "/pull/" + String(number);
        const result = {
          site: "github",
          type: "pull_request",
          url: url,
          userName: userName,
          repositoryName: repositoryName,
          title: title,
          number: number,
          formattedText: {
            plain: title,
            comment: "PR #" + String(number) + " " + title,
            markdown: "[PR#" + String(number) + " " + title + "](" + url + ")",
          },
        };
        // console.log("result:", result);
        sendResponse(result);
      }
    }
  });
})();
