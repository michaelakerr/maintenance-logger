import React from "react";
import { CheckboxSVGMap } from "react-svg-map";
import quailValley from "@svg-maps/quailvalley";
import { getLocationName } from "./utils";
import "./RegionalMap.scss";
import {shedNames }from "../../constants";

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pointedLocation: null,
      focusedLocation: null,
      selectedLocations: ["Rimu"],
      error: false,
      initialSelected: [],
    };

    this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
    this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
    this.handleLocationFocus = this.handleLocationFocus.bind(this);
    this.handleLocationBlur = this.handleLocationBlur.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleLocationMouseOver(event) {
    const pointedLocation = getLocationName(event);
    this.setState({ pointedLocation: pointedLocation });
  }

  handleLocationMouseOut() {
    this.setState({ pointedLocation: null, tooltipStyle: { display: "none" } });
  }

  handleLocationFocus(event) {
    const focusedLocation = getLocationName(event);
    this.setState({ focusedLocation: focusedLocation });
  }

  handleLocationBlur() {
    this.setState({ focusedLocation: null });
  }

  handleOnChange(selectedNodes) {
    this.setState((prevState) => {
      return {
        ...prevState,
        selectedLocations: selectedNodes.map(
          (node) => node.attributes.name.value
        ),
      };
    });
  }

  handleListQueries(selectedNodes) {
    this.setState((prevState) => {
      return {
        ...prevState,
        selectedLocations: selectedNodes.map((node) => node),
      };
    });
  }

  componentDidMount() {
    var shedsWithFaults = this.props.shedsWithFaults.current;
    var svg = document.getElementsByClassName("svgMap");
    var nodeList = [];
    if (svg !== undefined && shedsWithFaults) {
      for (let i = 0; i < shedsWithFaults.length; i++) {
        svg[0].childNodes.forEach((node) => {
          if (node.ariaLabel === shedNames[shedsWithFaults[i]]) {
            node.ariaChecked = true;
            nodeList.push(node);
            //get updated node, add to list, return to on change
          }
        });
      }
    }
    this.handleOnChange(nodeList);
  }

  render() {
    return (
      <article className="regional-map-container">
        <h2>Quail Valley</h2>
        <div className="svg-container">
          <CheckboxSVGMap
            className={"svgMap"}
            map={quailValley}
            childrenBefore={this.handleOnChange}
            onLocationMouseOver={this.handleLocationMouseOver}
            onLocationMouseOut={this.handleLocationMouseOut}
            onLocationFocus={this.handleLocationFocus}
            onLocationBlur={this.handleLocationBlur}
            onChange={this.handleOnChange}
          />
        </div>
      </article>
    );
  }
}

export default Map;
