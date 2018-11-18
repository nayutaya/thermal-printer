
(function() {
  // console.log("js/github.js");

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // console.log("js/gitlab.js");

    if (message.command == "getPageDetails") {
      const url            = $("meta[property='og:url']").attr("content");
      const userName       = (url == null ? null : url.split("/")[3]);
      const repositoryName = (url == null ? null : url.split("/")[4]);
      if (url == null || userName == null || repositoryName == null) return;

      const title        = $("h2.title").text().trim();
      const numberString = $("strong.identifier").text().trim();
      if (title == "" || numberString == "") return;

      const issueMatch = numberString.match(/^Issue #(\d+)$/);
      const mrMatch    = numberString.match(/^Merge request !(\d+)/);
      if (issueMatch != null) {
        const number = parseInt(issueMatch[1]);
        const result = {
          site: "gitlab",
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
      } else if (mrMatch != null) {
        const number = parseInt(mrMatch[1]);
        const result = {
          site: "gitlab",
          type: "merge_request",
          url: url,
          userName: userName,
          repositoryName: repositoryName,
          title: title,
          number: number,
          formattedText: {
            plain: title,
            comment: "MR !" + String(number) + " " + title,
            markdown: "[MR!" + String(number) + " " + title + "](" + url + ")",
          },
        };
        // console.log("result:", result);
        sendResponse(result);
      }
    }
  });
})();
