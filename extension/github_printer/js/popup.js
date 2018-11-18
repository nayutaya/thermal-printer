
(function() {
  // console.log("js/popup.js");

  const previewButton = $("#preview_button");
  const printButton = $("#print_button");

  previewButton.attr("disabled", true);
  printButton.attr("disabled", true);

  var printTarget = null;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {command: "getPageDetails"}, function(message) {
      // console.log("message:", message);
      if (message == null) return;
      printTarget = message;
      $("#title_plain").val(message.formattedText.plain);
      $("#title_comment").val(message.formattedText.comment);
      $("#title_markdown").val(message.formattedText.markdown);
      previewButton.attr("disabled", false);
    });
  });

  const copy = function(elem) {
    elem.focus();
    elem.select();
    document.execCommand("copy");
  };

  $("#copy_title_plain").click(function() {
    copy($("#title_plain"));
  });

  $("#copy_title_comment").click(function() {
    copy($("#title_comment"));
  });

  $("#copy_title_markdown").click(function() {
    copy($("#title_markdown"));
  });

  var imageBlob = null;
  previewButton.click(function() {
    if (printTarget == null) return;
    // console.log("preview");
    const renderingServiceEndpointUrl = $("#rendering_service_endpoint_url").val();
    const renderActionUrl = renderingServiceEndpointUrl + "/render_html";
    const body = {
      "width": 576,
      "html": "<html><body><div style=\"font-size: 64px;\">Hello World<br/>こんにちは世界</div></body></html>",
      // "project": printTarget.repositoryName,
      // "issue_number": printTarget.number,
      // "title": printTarget.title,
    };
    // console.log("body:", body);
    fetch(renderActionUrl, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)})
      .then(function(response) { return response.blob(); })
      .then(function(blob) {
        imageBlob = blob;
        const imageUrl = window.URL.createObjectURL(blob);
        document.getElementById("preview_image").src = imageUrl;
        printButton.attr("disabled", false);
      })
      .catch(function(error) {
        console.log("error:", error);
      });
  });

  printButton.click(function() {
    if (imageBlob == null) return;
    // console.log("print");
    const printServiceEndpointUrl = $("#printing_service_endpoint_url").val();
    const printActionUrl = printServiceEndpointUrl + "/print";
    fetch(printActionUrl, {method: "POST", headers: {"Content-Type": imageBlob.type}, body: imageBlob})
      .then(function(response) {
        // console.log("response:", response);
      })
      .catch(function(error) {
        console.log("error:", error);
      });
  });
})();
