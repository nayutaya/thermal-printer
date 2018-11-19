import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import PageviewIcon from "@material-ui/icons/Pageview";
import PrintIcon from "@material-ui/icons/Print";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const html =
      '<!DOCTYPE html>' + "\n" +
      '<html>' + "\n" +
      '  <head>' + "\n" +
      '    <meta charset="utf-8">' + "\n" +
      '    <title></title>' + "\n" +
      '  </head>' + "\n" +
      '  <body style="margin: 0; padding: 0;">' + "\n" +
      '    <div style="margin: 0em 0em 0.2em 0em; padding: 0; font-family: IPAexゴシック; font-size: 72px;">テキスト</div>' + "\n" +
      '  </body>' + "\n" +
      '</html>' + "\n";

    this.state = {
      renderingServiceEndpointUrl: "http://raspi-3bp.local:3031",
      printingServiceEndpointUrl: "http://raspi-3bp.local:3030",
      html: html,
      imageBlob: null,
      imageUrl: null,
    }
  }

  onPreviewClick() {
    const url = this.state.renderingServiceEndpointUrl + "/render_html";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        width: 576,
        html: this.state.html,
      }),
    };
    fetch(url, options)
      .then((response) => response.blob())
      .then((imageBlob) => {
        const imageUrl = window.URL.createObjectURL(imageBlob);
        this.setState({imageBlob, imageUrl});
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }

  onPrintClick() {
    const url = this.state.printingServiceEndpointUrl + "/print";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.state.imageBlob.type,
      },
      body: this.state.imageBlob,
    };
    fetch(url, options)
      .then(function(response) {
        // console.log("response:", response);
      })
      .catch(function(error) {
        console.log("error:", error);
      });
  }

  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar variant="dense">
            <Typography variant="title" color="inherit">Thermal Printing</Typography>
          </Toolbar>
        </AppBar>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Settings</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <TextField
                id="rendering_service_endpoint_url"
                label="Rendering Service Endpoint URL"
                value={this.state.renderingServiceEndpointUrl}
                onChange={(e) => this.setState({renderingServiceEndpointUrl: e.target.value})} />
            </div>
            <div>
              <TextField
                id="printing_service_endpoint_url"
                label="Printing Service Endpoint URL"
                value={this.state.printingServiceEndpointUrl}
                onChange={(e) => this.setState({printingServiceEndpointUrl: e.target.value})} />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <div style={{marginTop: "20px"}}>
          <TextField multiline fullWidth
            id="html"
            label="HTML"
            value={this.state.html}
            onChange={(e) => this.setState({html: e.target.value})} />
        </div>

        <div style={{marginTop: "20px"}}>
          <Button
              variant="outlined"
              color="primary"
              style={{marginRight: "10px"}}
              onClick={() => this.onPreviewClick()}>
            <PageviewIcon />
            Preview
          </Button>
          <Button
              disabled={this.state.imageBlob == null}
              variant="outlined"
              color="primary"
              onClick={() => this.onPrintClick()}>
            <PrintIcon />
            Print
          </Button>
        </div>

        {this.state.imageUrl == null ? null : (
          <div style={{marginTop: "20px", border: "1px black solid"}}>
            <img src={this.state.imageUrl} />
          </div>
        )}
      </div>
    );
  }
}
