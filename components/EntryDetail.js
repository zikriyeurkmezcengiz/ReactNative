import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

import { connect } from "react-redux";
import { timeToString, getDailyReminderValue } from "../utils/helpers";
import MetricCard from "./MetricCard";
import { white } from "../utils/colors";
import TextButton from "./TextButton";
import { addEntry } from "../actions";
import { removeEntry } from "../utils/api";

class EntryDetail extends Component {
  componentDidMount() {
    this.setTitle(this.props.route.params.entryId);
  }
  setTitle = (entryId) => {
    if (!entryId) return;

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    this.props.navigation.setOptions({
      title: `${month}/${day}/${year}`,
    });
  };

  reset = () => {
    const { remove, goBack, entryId } = this.props;

    remove();
    goBack();
    removeEntry(entryId);
  };
  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today;
  }

  render() {
    const { entryId } = this.props.route.params;
    const { metrics } = this.props;
    return (
      <View>
        <MetricCard metrics={metrics} />
        <Text>Entry Detail - {JSON.stringify(entryId)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
});

function mapStateToProps(state, { route }) {
  const { entryId } = route.params;
  return {
    entryId,
    metrics: state[entryId],
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { entryId } = !!navigation?.state?.params
    ? navigation?.state?.params
    : undefined;

  return {
    remove: () =>
      dispatch(
        addEntry({
          [entryId]:
            timeToString() === entryId ? getDailyReminderValue() : null,
        })
      ),
    goBack: () => !!navigation && navigation.goBack(),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
