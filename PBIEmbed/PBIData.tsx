import * as React from "react";
import { useEffect, useState } from "react";
import {
  service,
  factories,
  Report,
  Embed,
  Dashboard,
  Tile,
  Qna,
  Visual,
  IEmbedSettings,
  IEmbedConfiguration,
  IQnaEmbedConfiguration,
  IVisualEmbedConfiguration,
  IReportEmbedConfiguration,
  IDashboardEmbedConfiguration,
  ITileEmbedConfiguration,
  models,
} from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import "./Style.css";
export interface IPBIData {
  moduleID: string;
  userEmailID: string;
  layoutType: string;
}
const PBIData = (props: IPBIData) => {
  const [embDetails, setEmbDetails] = useState(null);
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    // myHeaders.append("Access-Control-Allow-Origin", "*");
    var urlencoded = new URLSearchParams();
    urlencoded.append("UserPrincipalName", `${props.userEmailID}`);
    // "ramprasad.r@samunnati.com"
    fetch("https://oneapp.samunnati.com/api/Login/GetAppToken", {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
      // mode: "no-cors",
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", JSON.parse(result));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("Module_Id", `${props.moduleID}`);
        // "RPTAPLPLR"
        fetch("https://oneapp.samunnati.com/api/SamRpt/PowerBiReport", {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        })
          .then((response) => response.text())
          .then((EmbResult) => {
            console.log(JSON.parse(JSON.parse(EmbResult)));
            let objEmb = JSON.parse(JSON.parse(EmbResult));
            setEmbDetails(objEmb);
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <>
      {embDetails && (
        <PowerBIEmbed
          embedConfig={{
            type: "report", // Supported types: report, dashboard, tile, visual and qna
            id: embDetails["EmbedReports"][0]["ReportId"],
            embedUrl: embDetails["EmbedReports"][0]["EmbedUrl"],
            accessToken: embDetails["EmbedToken"]["token"],
            tokenType: models.TokenType.Embed,

            settings: {
              layoutType:
                props.layoutType == "MobilePortrait"
                  ? models.LayoutType.MobilePortrait
                  : models.LayoutType.MobileLandscape,
              panes: {
                filters: {
                  expanded: false,
                  visible: false,
                },
              },
              background: models.BackgroundType.Transparent,
            },
          }}
          eventHandlers={
            new Map([
              [
                "loaded",
                function () {
                  console.log("Report loaded");
                },
              ],
              [
                "rendered",
                function () {
                  console.log("Report rendered");
                },
              ],
              [
                "error",
                function (event) {
                  //   console.log(event.detail);
                },
              ],
            ])
          }
          cssClassName={"report-style-class"}
          getEmbeddedComponent={(embeddedReport) => {
            return embeddedReport as Report;
          }}
        />
      )}
    </>
  );
};
export default PBIData;
