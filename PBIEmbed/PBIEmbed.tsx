import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { IPBIEmbedProps } from "./IPBIEmbedProps";
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
import PBIData from "./PBIData";
export default class App extends React.Component<IPBIEmbedProps, {}> {
  report: Report;

  public render(): React.ReactElement<IPBIEmbedProps> {
    return (
      <section className="testpbidashboard">
        <PBIData
          moduleID={this.props.moduleID}
          userEmailID={this.props.userProperty}
          layoutType={this.props.layoutType}
        />
      </section>
    );
  }
}
// const App = (props: IPBIEmbedProps) => {
//   return <div>Hi {props.userProperty}</div>;
// };
// export default App;
